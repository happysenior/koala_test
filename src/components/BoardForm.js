import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import history from '../history'
import { startCreateBoard } from "../actions/boards"
import "./boardForm.css"

const BoardForm = () => {
    const [boardName, setBoardName] = useState("")
    const [error, setError] = useState("")

    const boardCreate = useSelector(state => state.boardCreate)
    const { board: createdBoard, success: boardCreateSuccess } = boardCreate

    const dispatch = useDispatch()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError("")
        if (!boardName.trim()) {
            setError("board name can't be empty")
        } else {
            dispatch(startCreateBoard({ name: boardName }))
            setBoardName("")
        }
    }

    const handleOnChange = (e) => {
        setBoardName(e.target.value)
    }
    
    useEffect(() => {
        boardCreateSuccess && history.push(`/boards/${createdBoard.id}`)
    }, [boardCreateSuccess, createdBoard.id])

    return (
        <div>
            <form className="boardForm" onSubmit={handleOnSubmit}>
                {error && <p>{error}</p>}
                <input className="boardForm__input" type="text" placeholder="Board Name" onChange={handleOnChange} value={boardName}></input>
                <button className="button button--create">Create</button>
            </form>
        </div>
    )
}

export default BoardForm