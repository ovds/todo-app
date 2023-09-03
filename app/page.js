'use client'

import {Button, ChakraProvider} from '@chakra-ui/react'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {useRouter} from 'next/navigation'

export default function Home() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/home')
    }

    return (
        <ChakraProvider>
            <div className={'h-screen w-screen bg-slate-200'}>
                <div className={'flex flex-col items-center justify-center h-full space-y-6'}>
                    <h1 className={'text-6xl font-bold text-slate-900'}>Todo App</h1>
                    <Button variant={'outline'} colorScheme={'blue'} size={'lg'} rightIcon={<ArrowForwardIcon />}>Go to home page</Button>
                </div>
            </div>
        </ChakraProvider>
    )
}
