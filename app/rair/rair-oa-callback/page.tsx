"use client"
import {getAccessToken} from '../rair-fetch/rair-fetch';

export default function RAIROACallback(){
    const completeLogin = async () => {
        let params = new URLSearchParams(document.location.search);
        let redirectURI = window.location.href.split('?')[0];
        let codeParam = params.get("code");
        if(codeParam != null){
            const accToken = await getAccessToken(codeParam, redirectURI);
            console.log(accToken);
            // storing in local for now, just for development
            // TODO: remove this and use API endpoints to retrieve token
            localStorage.setItem('accessToken', JSON.stringify(accToken));
            window.location.href = '/rair/rair-main';
        }
    }

    return (
        <div>
            <h1>It worked!</h1>
            <button onClick={completeLogin}>COMPLETE LOGIN</button>
        </div>
    )
}