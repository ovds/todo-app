import {NextResponse} from "next/server";
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
})

export async function GET(request) {
    const exists = await redis.exists('data');
    if (exists) {
        const data = await redis.get('data');
        return NextResponse.json({ data: data }, { status: 200 })
    }
    redis.set('data', []);
    return NextResponse.json({ data: [] }, { status: 200 })
}

export async function POST(request) {
    const jsonData = await request.json();
    console.log(jsonData)
    await redis.set('data', jsonData);

    return NextResponse.json({ data: jsonData.data }, { status: 200 })
}

export async function DELETE(request) {
    const jsonData = await request.json();
    console.log(jsonData)
    await redis.set('data', jsonData);

    return NextResponse.json({ data: jsonData }, { status: 200 })
}