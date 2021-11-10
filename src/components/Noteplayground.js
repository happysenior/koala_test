import React, { useEffect, useState, useRef } from "react"
import EditNoteForm from "./NoteForm"
import NotesContext from "../context/notes-context"
import { useDispatch, useSelector } from "react-redux"
import { startEditNote, startDeleteNote } from "../actions/notes"

const Note = ({ note }) => {
    const [editMode, setEditMode] = useState(false)
    const [isDragged, setIsDragged] = useState(false)
    const noteDiv = useRef()
    // let isDragged = useRef()

    let grabPointX = useRef()
    let grabPointY = useRef()

    let posX = useRef()
    let posY = useRef()

    const mystyle = {
        position: "absolute",
        background: "yellow",
        left: "0",
        top: "0",
        minHeigth: "200px",
        minWidth: "200px",
        transform: `translate(${posX.current}px, ${posY.current}px)`
    }
    useEffect(() => {
        
    }, [posX, posY])
    useEffect(() => {
        noteDiv.current.style.transform = `translateX(400px) translateY(100px)`
    }, [])
    // const noteDetails = useSelector(state => state.noteDetails)
    // const {note: noteData, success: noteDetailsSuccess } = noteDetails
    
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
        // e.dataTransfer.setDragImage(new Image(), 0, 0)
        setIsDragged(true)
        console.log(isDragged)
        const boundingClientRect = noteDiv.current.getBoundingClientRect()
        grabPointY.current = boundingClientRect.top - e.clientY
        grabPointX.current = boundingClientRect.left - e.clientX
        // e.stopPropagation()
        // e.preventDefault()
        // console.log(e.clientX + "  " + e.clientY)
    }

    const handleOnDrag = (e) => {
        // console.log(isDragged)
        if (!isDragged) {
            // console.log("entered")
            return
        }
        posX.current = e.clientX + grabPointX.current
        posY.current = e.clientY + grabPointY.current
        console.log("lalal" + grabPointX.current)
        if (posX.current < 0) {
            posX = 0
        } 

        if (posY.current < 0) {
            posY = 0
        }

        // noteDiv.current.style.transform = `translateX(${posX}px) translateY(${posY}px)`
        // e.stopPropagation()
        e.preventDefault()
    }

    const handleOnDragEnd = (e) => {
        setIsDragged(false)
        // grabPointX = null
        // grabPointY = null
    }
    
    return (
        <div onMouseDown={handleOnDragStart} onMouseMove={handleOnDrag} onMouseUp={handleOnDragEnd} ref={noteDiv} style={mystyle}>
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