import React, { useEffect, useState, useRef } from "react"
import EditNoteForm from "./NoteForm"
import NotesContext from "../context/notes-context"
import { useDispatch, useSelector } from "react-redux"
import { startEditNote, startDeleteNote } from "../actions/notes"

const Note = ({ note }) => {
    const [editMode, setEditMode] = useState(false)
    // const [top, setTop] = useState(0)
    // const [left, setLeft] = useState(0)

    let grabPointX = useRef()
    let grabPointY = useRef()

    const mystyle = {
        position: "absolute",
        background: "yellow",
        left: "0",
        top: "0"
    }

    useEffect(() => {
        noteDiv.current.style.transform = `translateX(400px) translateY(100px)`
    }, [])
    // const noteDetails = useSelector(state => state.noteDetails)
    // const {note: noteData, success: noteDetailsSuccess } = noteDetails
    const noteDiv = useRef()
    const dispatch = useDispatch()

    const onSubmit = (noteUpdate) => {
        dispatch(startEditNote(note.id, noteUpdate))
        setEditMode(false)
    } 

    const handleDelete = (noteId) => {
        dispatch(startDeleteNote(noteId))
    }

    const handleOnDragStart = (e) => {
        // e.preventDefault()
        e.dataTransfer.setDragImage(new Image(), 0, 0)
        const boundingClientRect = noteDiv.current.getBoundingClientRect()
        grabPointY = boundingClientRect.top - e.clientY
        grabPointX = boundingClientRect.left - e.clientX

        // console.log(e.clientX + "  " + e.clientY)
    }

    const handleOnDrag = (e) => {
        e.preventDefault()
        
        let posX = e.clientX + grabPointX
        let posY = e.clientY + grabPointY

        if (posX < 0) {
            posX = 0
        } 

        if (posY < 0) {
            posY = 0
        }

        noteDiv.current.style.transform = `translateX(${posX}px) translateY(${posY}px)`
        // if(e.clientX !== 0 && e.clientY !== 0) {
        //     noteDiv.current.style.transform = `translateX(${posX}px) translateY(${posY}px)`
        // }
        
        // setTop(e.clientY)
        // setLeft(e.clientX)
        // console.log(e.clientX + "  " + e.clientY)
    }

    const handleOnDragEnd = (e) => {
        grabPointX = null
        grabPointY = null
    }
    
    const handleOnDragOver = (e) => {
        e.preventDefault()
    }

    return (
        <div onDragEnd={handleOnDragEnd} onDragOver={handleOnDragOver} onDragStart = {handleOnDragStart} onDrag = {(e) => handleOnDrag(e)} ref={noteDiv} style={mystyle} draggable="true" onClick={()=> {console.log(noteDiv.current)}}>
            {editMode ? <EditNoteForm note={note} onSubmit={onSubmit} /> :
            <>
                <h3>
                    { note.title }
                </h3>
                <p>
                    { note.body }
                </p>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
            </>
            }
        </div>

    )
}

export default Note