"use client"

export default function RAIR(){
    const loginClicked = async () =>{
        console.log("login clicked");
        // redirect to auth endpoint
        window.location.href = '/api/reddit/auth';
    }

    return (
        <div id='main'>
            <h1>Reddit AI Responder</h1>
            <button onClick={loginClicked}>Click Here to login with Reddit</button>
        </div>
    )
}