import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

export async function POST(req: Request){
    const{ redditPostData } = await req.json();    
    const resp = await getCompletionForPost(redditPostData);
    return NextResponse.json(resp);
}

async function getCompletionForPost(redditPostData: any){
    console.log(redditPostData);

    const roleContent = `You are a helpful assistant who will analyse social media posts and suggest responses. 
                        You responses should take into account the nature of the post and platform too. 
                        i.e; a response reddit post, might be quite different to a response / comment 
                        you'd leave on instagram.
                        You should also stick to the response type, 
                        i.e; if the response type is "funny" your should make a funny, comedic response, 
                        if the response type is "factual" it should be serious and factual.`;

    const userContent = `Please suggest a good response for this reddit post:
                        Title: ${redditPostData.title}
                        Subreddit: ${redditPostData.subreddit_name_prefixed}
                        Response type: factual`;

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
        store: true,
    });
    
    console.log(completion.choices[0].message);
    return completion.choices[0].message;
}

