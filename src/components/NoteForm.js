import React, { useState } from "react"

const NoteForm = ({ note, onSubmit }) => {

    const [title, setTitle] = useState(note ? note.title : "")
    const [body, setBody] = useState(note ? note.body : "")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, body })
        setTitle("")
        setBody("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <textarea onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NoteForm