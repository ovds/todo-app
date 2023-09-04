'use client'

import {useState} from "react";
import {
    Button,
    Center,
    ChakraProvider, Input,
    Modal, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import Note from "@/app/note";
import {Redis} from "@upstash/redis";

export default function Home(props) {
    const [notes, setNotes] = useState(props.data)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [noteId, setNoteId] = useState(notes.length);

    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const redis = new Redis({
        url: 'https://wanted-mustang-44005.upstash.io',
        token: 'AavlASQgYzZjMjYxZTMtNzEzZC00NzVmLWE0MGYtNjAyMTgzZDVhM2U4NjM0Y2E0NmI2NGEzNDliMThmOWMxYjQ2NDVhMTZhMzU=',
    })

    const handleAdd = () => {
        setNotes([...notes, {
            id: noteId,
            title: noteTitle,
            text: noteText,
            selected: false
        }]);
        setNoteId(noteId + 1);
        onClose();
        // add to database
        redis.set('data', JSON.stringify({
            data: [...notes, {
                id: noteId,
                title: noteTitle,
                text: noteText,
                selected: false
            }]
        }))
    };

    const handleDelete = (index) => {
        setNotes(notes.filter((note) => note.id !== index));
        // delete from database

        redis.set('data', JSON.stringify({
            data: notes.filter((note) => note.id !== index)
        }))
    }

    const handleSelect = (id) => {
        let newNotes = notes;
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i].id === id) {
                newNotes[i].selected = !newNotes[i].selected;
            }
        }
        setNotes(newNotes);
        redis.set('data', JSON.stringify({
            data: newNotes
        }))
    }

    return (
        <ChakraProvider>
            <div className={'h-screen w-screen bg-slate-400 flex justify center items-center'}>
                <Center className={'h-full w-full'}>
                    <div className={'flex flex-col items-center space-y-6 w-2/3 bg-slate-200 rounded-2xl h-2/3 max-h-2/3 pt-10'}>
                        <Button rightIcon={<AddIcon />} colorScheme={'blue'} onClick={onOpen} variant={'outline'} className={'min-h-max'}>Add Note</Button>
                        <div className={'h-4/5 overflow-auto w-full flex justify-center'}>
                            <Stack spacing={8} direction={'column'} className={'w-2/3'}>
                                {notes.map((note, index) => {
                                    return (
                                        <Note key={index} id={note.id} title={note.title} content={note.text} onDelete={handleDelete} onSelect={handleSelect} selected={note.selected} />
                                    )
                                })}
                            </Stack>
                        </div>
                        <div>
                            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'2xl'}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Add a note</ModalHeader>
                                    <ModalCloseButton />
                                    <Stack spacing={4} direction={'column'} className={'mx-5'}>
                                        <Input placeholder={'Title'} onChange={(e) => setNoteTitle(e.target.value)} />
                                        <Input placeholder={'Description'} onChange={(e) => setNoteText(e.target.value)} />
                                    </Stack>
                                    <ModalFooter>
                                        <Button variant={'outline'} mr={3} onClick={handleAdd}>Add</Button>
                                        <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                </Center>
            </div>
        </ChakraProvider>
    )
}