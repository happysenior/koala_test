import React, { useRef, useState } from "react"
import { Rnd } from "react-rnd"
import { GithubPicker } from 'react-color';
import { useDispatch, useSelector } from "react-redux"
import { startCreateNote } from "../actions/notes"
import colors from "../fixtures/notesColors"
import "./notesStack.css"

const NoteStack = () => {
    const popoverPickerRef = useRef()

    const boardId = useSelector(state => state.boardDetails.board.id)

    const [showColorPicker, setShowColorPicker] = useState(false)
    const [initPosition, setInitPosition] = useState({ x: 0, y: 0 })
    const [backgroundColor, setBackgroundColor] = useState(colors[1]) // maybe random color here?

    const width = 200
    const height = 200
    const size = { width, height}

    const dispatch = useDispatch()

    const popover = {
        position: 'absolute',
        top: '95%',
        zIndex: '2',
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    const handleOnClick = () => {
        setShowColorPicker(prev => !prev);
    }

    const handleHideColorPicker= () => {
        setShowColorPicker(false)
    }
    
    const handleOnColorChangeComplete = (color, event) => {
        setBackgroundColor(color.hex)
        setShowColorPicker(false)
    }

    const handleOnDragStop = (e, d) => {
        // create note only if it was moved more than size of NotesStack
        if (Math.abs(initPosition.x - d.x) > width || Math.abs(initPosition.y - d.lastY) > height) {
            const newNote = {
                title: "Note Tile",
                body: "Note Body",
                backgroundColor,
                position: { x: d.x, y: d.y },
                flagged: false,
                size
            }
            dispatch(startCreateNote(newNote, boardId))
        }
    }

    const handleOnDragStart = (e, d) => {
        //get init position to compare on drag stop if note should be created
        setInitPosition({ x: d.x, y: d.y})
    }

    return (
        <Rnd id="noteStack" 
            bounds="body"
            cancel=".cancelDrag"
            enableResizing={false}
            onDragStart={(e,d) => handleOnDragStart(e,d)}
            onDragStop={(e, d) => handleOnDragStop(e, d)}
            position={{x: 0, y: 0}}
            size={size}
            style={{backgroundColor}}
        >
            <div className="note">
                <p className="note__info">
                    Drag to create
                </p>
                <button className="pickerButton cancelDrag" onClick={handleOnClick}>Pick Color</button>
                {
                    showColorPicker &&
                    <div className="cancelDrag popoverPicker" style={ popover } ref={popoverPickerRef}>
                        <div id="pickerContainer" className="cancelDrag" onClick={handleHideColorPicker} style={ cover } />
                        <GithubPicker className="cancelDrag" colors={colors} onChangeComplete={handleOnColorChangeComplete}/>
                    </div>
                }
            </div>
        </Rnd>
    )
}

export default NoteStack