export async function getAccessToken(userCode: string, redirectURI: string){
    const url='/api/reddit/complete-auth';
    try{
        const resp = await fetch(url,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ code:userCode, redirectURI })
            });
        const response = await resp.json();
        console.log(response);
        return response;
    }catch(e){
        console.error(e);
    }
}