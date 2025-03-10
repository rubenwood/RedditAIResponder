
import { useEffect, useState } from 'react';
import { getTopPosts, getPostAndComments, getChatCompletionForPost } from '../rair-fetch/rair-fetch';
import { RAIRCommentsBlock } from './comments-block-component';

function TopPost(props: any){
    const [postAndComments, setPostAndComments]= useState<any>(null);
    const [commentsData, setCommentsData]= useState<any>(null);
    const [replySuggestion, setReplySuggestion] = useState<string>('');
    const [replyLoading, setReplyLoading] = useState(false);

    const callGetPostAndComments = async () => {
        const postAndComm = await getPostAndComments(props.data.id, props.token.access_token);
        let commentObj = {postId:props.data.id, comments:postAndComm[1].data.children}
        
        setPostAndComments(postAndComm);
        setCommentsData(commentObj);
    }    
    
    const getReplySuggestion = async () =>{
        setReplyLoading(true);
        const completion = await getChatCompletionForPost(props.data, commentsData);
        setReplyLoading(false);
        //console.log(completion);
        setReplySuggestion(completion.content);
    }

    useEffect(() => {
        callGetPostAndComments();
    }, [])

    return (
        <div>
            <b>Id:</b>{props.data.id}<br/>
            <b>Title:</b>{props.data.title}<br/>
            <b>Subreddit:</b>{props.data.subreddit_name_prefixed}<br/>
            <b># Comments:</b>{props.data.num_comments}<br/>
            <b>Up votes:</b>{props.data.ups}<br/>
            <b>Up votes:</b>{props.data.upvote_ratio}<br/>
            <b>Author:</b>{props.data.author}<br/>
            <button className='button' onClick={getReplySuggestion}>Get Reply Suggestion</button><br/>
            <br/>
            <div className='replyContainer'>{replyLoading ? 'generating...' : replySuggestion}</div>
            <br/>
            <br/>
            <b>Comments:</b>{commentsData != null ? <RAIRCommentsBlock 
                                                        postId={props.data.id} 
                                                        commentsData={commentsData} /> : ''}
            <br/>
            <br/>
            <br/>
        </div>
    )
}

function TopPostList(props: any){
    const renderTopPosts = () =>{
        let postList = [];
        for(let i = 0; i < props.count; i++){
            let post = props.posts[i];
            postList.push(<TopPost key={`top-post-${i}`} data={post.data} token={props.token} />);
        }
        return postList;
    }

    return (
        <div>
            {renderTopPosts()}
        </div>
    )
}

export default function RAIRTopPosts(props: any){
    const [topPosts, setTopPosts] = useState<any>(null);

    const callTopPosts = async () => {
        const topPosts = await getTopPosts(props.token.access_token);
        console.log(topPosts);
        setTopPosts(topPosts);
    }

    useEffect(() => {
        callTopPosts();
    }, []);

    return (
        <div id='top-posts'>
            <h2>Top posts shown here:</h2><br/>
            {topPosts ? <TopPostList count={3} posts={topPosts.data.children} token={props.token} /> : ''}
        </div>
    )
}