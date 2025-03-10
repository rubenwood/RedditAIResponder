import { NextResponse } from "next/server";

export async function POST(req: Request){
    const{ code, redirectURI } = await req.json();
    const resp = await getAccessToken(code, redirectURI);
    return NextResponse.json(resp);
}

export async function getAccessToken(userCode: string, redirectURI: string){
    const url='https://www.reddit.com/api/v1/access_token';
    try{
        const auth = Buffer.from(`${process.env.RAIR_CLIENT_ID}:${process.env.RAIR_SECRET}`).toString('base64');
        const formData = new URLSearchParams();
        formData.append("grant_type", "authorization_code");
        formData.append("code", userCode);
        formData.append("redirect_uri", redirectURI);

        const resp = await fetch(url,
            {
                method:'POST',
                headers:{
                    'Authorization':`Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });
        const response = await resp.json();
        console.log(response);
        return response;
    }catch(e){
        console.error(e);
    }
}