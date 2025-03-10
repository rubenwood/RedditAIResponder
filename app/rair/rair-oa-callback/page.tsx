"use client"
import {getAccessToken} from '../rair-fetch/rair-fetch';

export default function RAIROACallback(){
    const completeLogin = async () => {
        let params = new URLSearchParams(document.location.search);
        let redirectURI = window.location.href.split('?')[0];
        console.log(redirectURI);
        let codeParam = params.get("code");
        console.log(codeParam);
        if(codeParam != null){
            const accToken = await getAccessToken(codeParam, redirectURI);
            console.log(accToken);
        }
        
    }

    return (
        <div>
            <h1>It worked!</h1>
            <button onClick={completeLogin}>COMPLETE LOGIN</button>
        </div>
    )
}