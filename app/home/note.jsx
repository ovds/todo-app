import {useState} from "react";

const Note = (props) => {
    const title = props.title
    const content = props.content
    const [selectedNote, setSelectedNote] = useState(null)

    return (
        <div>
            <h1>Note</h1>
        </div>
    )
}

export default Note