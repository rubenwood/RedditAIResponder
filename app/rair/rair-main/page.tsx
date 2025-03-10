"use client"
import { useEffect, useState } from "react";
import RAIRTopPosts from './top-posts-component';

export default function RAIR(){
    const [isAuthed, setIsAuthed] = useState(false);
    const [accessToken, setAccessToken] = useState<any>();

    const loginClicked = async () =>{
        // redirect to auth endpoint
        window.location.href = '/api/reddit/auth';
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            let tokenObj = JSON.parse(token);
            setAccessToken(tokenObj);
            setIsAuthed(true);
        } else {
            setIsAuthed(false);
        }
    }, [])

    return (
        <div id='main'>
            <h1>Reddit AI Responder</h1><br/>
            {!isAuthed ? <button onClick={loginClicked}>Click Here to login with Reddit</button> : ''}
            {isAuthed ? <RAIRTopPosts token={accessToken} />: ''}
            
        </div>
    )
}