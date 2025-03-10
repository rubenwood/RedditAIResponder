"use client"
import { useEffect, useState } from 'react';
import {getTopPosts} from '../rair-fetch/rair-fetch';

function TopPost(props: any){
    return (
        <div>
            <b>Title:</b>{props.data.title}<br/>
            <b>Subreddit:</b>{props.data.subreddit_name_prefixed}<br/>
            <b>Up votes:</b>{props.data.ups}<br/>
            <b>Author:</b>{props.data.author}<br/>
            <br/>
        </div>
    )
}

function TopPostList(props: any){
    const renderTopPosts = () =>{
        let postList = [];
        for(let i = 0; i < props.count; i++){
            let post = props.posts[i];
            postList.push(<TopPost key={`top-post-${i}`} data={post.data} />);
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
            {topPosts ? <TopPostList count={5} posts={topPosts.data.children} /> : ''}
        </div>
    )
}