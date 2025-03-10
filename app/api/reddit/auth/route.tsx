import {v4 as uuid4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function GET(){
    const authURL = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.RAIR_CLIENT_ID}&response_type=code&state=${uuid4()}&redirect_uri=${process.env.RAIR_CALLBACK}&duration=${process.env.RAIR_DURATION}&scope=read`;
    console.log(authURL);

    return NextResponse.redirect(authURL);
}