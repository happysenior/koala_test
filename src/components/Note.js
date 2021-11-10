import React, { useState } from "react"
import { Rnd } from "react-rnd"
import EditNoteForm from "./EditNoteForm"
import { useDispatch } from "react-redux"
import { startEditNote, startDeleteNote } from "../actions/notes"
import "./note.css"

// maybe put note size to env

const Note = ({ note }) => {
    const [editMode, setEditMode] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor) // add some fallback?
    const [position, setPosition] = useState({ x: note.position.x, y: note.position.y })

    const [size, setSize] = useState({ width: note.size.width ? note.size.width : 200, 
                                    height: note.size.height ? note.size.height : 200})
    const dispatch = useDispatch()
    
    const onSubmit = (noteUpdate) => {
        // store backgroundColor as state in EditForm and pass it together? But we have to pass it to Note anywas so not sure
        dispatch(startEditNote(note.id, { ...noteUpdate, backgroundColor } )) 
        setEditMode(false)
    } 

    const handleDelete = (noteId) => {
        setDeleting(true)
        dispatch(startDeleteNote(noteId))
        // on error set deleting to false and display error on the page component or somewhere here
    }

    const handleOnDragStop = (e, d) => {
        // change position only if it was moved by at least 0.5
        if (Math.abs(position.x - d.x) > 0.5 || Math.abs(position.y - d.y) > 0.5) {
            setPosition({ x: d.x, y: d.y })

            dispatch(startEditNote(note.id, {
                position: {x: d.x, y: d.y}
            }))
        }
    }

    const handleOnResize = (ref) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight })

        dispatch(startEditNote(note.id, {
            size: { width: ref.offsetWidth, height: ref.offsetHeight }
        }))
    }

    const handleColorChange = (color) => {
        setBackgroundColor(color)
    }

    return (
        <Rnd className="note--instance" 
            position={{ x: position.x, y: position.y}}
            bounds="body"
            cancel=".cancelDrag"
            minWidth={150} minHeight={150}
            size={{ width: size.width, height: size.height}}
            onDragStop={(e, d) => handleOnDragStop(e, d)}
            onResize={(e, direction, ref) => handleOnResize(ref)}
            style={{backgroundColor}}
        >
            <div className="note">
                {editMode ? <EditNoteForm note={note} changeBackgroundColor={handleColorChange} onSubmit={onSubmit} /> :
                <>
                    <div className="note-content">
                        <h3 className="note-header">
                            { note.title }
                        </h3>
                        <p className="note-body">
                            { note.body }
                        </p>
                    </div>

                    <div className="note__buttons">
                        <button className="btnIcon note__button cancelDrag" onClick={() => setEditMode(true)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btnIcon note__button cancelDrag" onClick={() => handleDelete(note.id)}>
                            { deleting ? <img className="loader" src="/images/loader.gif" alt="loader" /> : <i className="fa fa-trash-o"></i>}
                        </button>
                    </div>
                </>
                }
            </div>
        </Rnd>
    )
}

export default Note