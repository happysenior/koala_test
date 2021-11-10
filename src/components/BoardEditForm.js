import React, { useState } from "react"

//decide if should be te same as board form or not
const BoardEditForm = ({ onSubmit, board }) => {

    const [boardName, setBoardName] = useState(board.name)
    const [error, setError] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError("")
        if (!boardName.trim()) {
            setError("board name can't be empty")
        } else {
            onSubmit({ name: boardName })
            setBoardName("")
        }
    }

    const handleOnChange = (e) => {
        setBoardName(e.target.value)
    }

    return (
        <div>
            <form className="form--boardEdit" onSubmit={handleOnSubmit}>
                {error && <p>{error}</p>}
                <input type="text" placeholder="Board Name" onChange={handleOnChange} value={boardName}></input>
                <button className="btnIcon">
                    <i className="fa fa-floppy-o"></i>
                </button>
            </form>
        </div>
    )
}

export default BoardEditForm