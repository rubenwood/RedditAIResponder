import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionTool } from "openai/resources/index.mjs";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});


export async function POST(req: Request){
    const{ redditPostData, redditPostCommentData } = await req.json();    
    const resp = await getCompletionForPost(redditPostData, redditPostCommentData);
    return NextResponse.json(resp);
}

async function getCompletionForPost(redditPostData: any, redditPostCommentData: any){
    //let commentBodies = [];
    let commentsString = '';
    for(const commentData of redditPostCommentData.comments){
        //console.log(commentData.data.body);
        //commentBodies.push(commentData.data.body);
        commentsString += `Comment: ${commentData.data.body}\n`;
    }

    const roleContent = `You are a helpful assistant who will analyse social media posts and suggest responses. 
                        You responses should take into account the nature of the post and platform too. 
                        i.e; a response reddit post, might be quite different to a response / comment 
                        you'd leave on instagram.
                        You should also stick to the response type, 
                        i.e; if the response type is "funny" your should make a funny, comedic response, 
                        if the response type is "factual" it should be serious and factual.
                        You will also receive some comments from each post, use this to gain extra context 
                        and tailor your response more accurately to the current tone and discussions`;

    const userContent = `Please suggest a good response for this reddit post:
                        Title: ${redditPostData.title}
                        Subreddit: ${redditPostData.subreddit_name_prefixed}
                        ${commentsString}
                        Response type: topical & witty`;

    console.log(userContent);

    const tools: ChatCompletionTool[] = [{
        "type": "function",
        "function": {
            "name": "getNews",
            "description": "Get relevant news",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "A subject of interest to search for e.g. Google, Politics, Ukraine"
                    }
                },
                "required": [
                    "query"
                ],
                "additionalProperties": false
            },
            "strict": true
        }
    }];    

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { 
                role: "system",
                content: roleContent
            },
            {
                role: "user",
                content: userContent,
            },
        ],
        tools,
        store: true,
    });
    getNews('War in Ukraine');
    console.log(completion.choices[0].message);
    return completion.choices[0].message;
}

async function getNews(query: string){
    //All articles mentioning Apple from yesterday, sorted by popular publishers first
    console.log("getting news...");
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate()-1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=${query}&from=${yesterdayStr}&to=${todayStr}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
    const resp = await fetch(url);
    //console.log(resp);
    const respData = await resp.json();
    console.log(respData);
}


