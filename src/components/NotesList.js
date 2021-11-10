import React from "react"
import Note from "./Note"
import { useSelector } from "react-redux"
import NotesStack from "./NotesStack"

const NotesList = () => {
    const notesList = useSelector(state => state.notesList)
    const { notes } = notesList

    return (
        <div className="canvas">
            <div>
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
            <NotesStack />
        </div>
    )
}
// wyjebac przekazywanie boardid
export default NotesList