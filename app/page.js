import Home from "@/app/home";
import {Redis} from "@upstash/redis";

export default async function Page() {
    const redis = new Redis({
        url: 'https://wanted-mustang-44005.upstash.io',
        token: 'AavlASQgYzZjMjYxZTMtNzEzZC00NzVmLWE0MGYtNjAyMTgzZDVhM2U4NjM0Y2E0NmI2NGEzNDliMThmOWMxYjQ2NDVhMTZhMzU=',
    })

    const exists = await redis.exists('data');
    if (!exists) {
        await redis.set('data', JSON.stringify({data: []}));
    }

    const data = await redis.get('data');

    return (
        <Home data={data.data}/>
    )
}