import {useState} from "react";
import {Checkbox, IconButton, Stack} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'


const Note = (props) => {
    const title = props.title
    const content = props.content
    const [selected, setSelected] = useState(props.selected)
    const toast = useToast()

    const handleSelect = () => {
        setSelected(!selected)
        props.onSelect(props.id)
    }

    const handleDelete = () => {
        props.onDelete(props.id);
        toast({
            title: "Note " + title + " has been deleted",
            description: "Sadly you can't get it back :(",
            status: "error",
            duration: 3000,
            isClosable: true,
        })
    }
    // TODO: Make colour grey when selected
    return (
        <div className={'rounded-2xl border-2 bg-slate-100 h-fit w-full'}>
            <div className={'flex justify-between pl-4 py-2 pr-7'}>
                <Stack direction={'column'} spacing={1}>
                    <h2 className={'text-xl font-bold'}>{title}</h2>
                    <p className={'text-md'}>{content}</p>
                </Stack>
                <Stack direction={'row'} spacing={4} className={'flex items-center'}>
                    <IconButton aria-label={'delete'} colorScheme={'red'} icon={<DeleteIcon/>} className={'scale-75'} onClick={handleDelete}></IconButton>
                    <Checkbox onChange={handleSelect} isChecked={selected} size={'lg'} className={'scale-150'}></Checkbox>
                </Stack>
            </div>

        </div>
    )
}

export default Note