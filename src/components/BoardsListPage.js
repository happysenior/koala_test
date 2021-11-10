import React, { useEffect } from "react"
import BoardForm from "./BoardForm"
import BoardList from "./BoardsList"
import { resetCreateBoard } from "../actions/boards"
import { useDispatch } from "react-redux"
import "./boardsListPage.css"


const BoardsPage = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(resetCreateBoard())
        }
    }, [])
// MOVE START CREATE BOARD TO BOARD FORM
    return (
        <div className="container__boardsPage">
            <BoardForm />
            <BoardList />
        </div>
    )
}

export default BoardsPage