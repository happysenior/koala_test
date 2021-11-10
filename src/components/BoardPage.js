import React, { useEffect, useRef, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import history from "../history"
import BoardHeader from "./BoardHeader"
import NotesList from "./NotesList"
import { useDispatch, useSelector } from "react-redux"
import { startFetchNotes, resetNotesReducers } from "../actions/notes"
import { startFetchBoardDetails, resetDeleteBoard, resetFetchBoardDetails, resetClearBoard } from "../actions/boards"
import { Link } from "react-router-dom"
import "./boardPage.css"

const defaultProps = {
    onChange: null,
    loadTimeOffset: 0,
    lazyRadius: 0,
    brushRadius: 2,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 25,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false,
    enablePanAndZoom: false,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
}

const BoardPage = (props) => {
    const [disabledValue, setDisabledValue] = useState(true)

    const saveableCanvas = useRef(null)

    const boardId = props.match.params.id
    const dispatch = useDispatch()
    const boardDetails = useSelector(state => state.boardDetails)
    const boardDelete = useSelector(state => state.boardDelete)
    const boardClear = useSelector(state => state.boardClear)
    const notesList = useSelector(state => state.notesList)
    const { loading: loadingBoardDetails, board: currentBoard, error: errorBoardDetails} = boardDetails
    const { loading: loadingNotes, error: errorNotes } = notesList
    const { success: successBoardDelete} = boardDelete
    const { success: successBoardClear} = boardClear

    useEffect(() => {
        dispatch(startFetchBoardDetails(boardId))
        dispatch(startFetchNotes(boardId))
        setTimeout(loadCanvas, 1000)

        return () => {
            dispatch(resetNotesReducers())
            dispatch(resetFetchBoardDetails())
        }
    }, [])

    useEffect(() => {
        if (successBoardDelete) {
            dispatch(resetDeleteBoard())
            history.push("/boards")
        }    
    }, [successBoardDelete])

    useEffect(() => {
        if (successBoardClear) {
            dispatch(resetClearBoard())
            dispatch(startFetchNotes(boardId))
            saveableCanvas.current.clear()
            saveCanvas()
        }    
    }, [successBoardClear])

    const saveCanvas = () => {
        localStorage.setItem(
            boardId,
            saveableCanvas.current.getSaveData()
        )
    }

    const loadCanvas = () => {
        const canvasData = localStorage.getItem(boardId)
        canvasData && canvasData.length > 0 && saveableCanvas.current.loadSaveData(canvasData)
        setDisabledValue(false)
    }

    return (
        <div>
            <CanvasDraw
                ref={saveableCanvas}
                {...defaultProps}
                disabled={disabledValue}
            />
            <Link to="/boards" className="back" onClick={saveCanvas}>Back to Main</Link>
            {
                loadingBoardDetails || loadingNotes ? <p>Loading</p> :
                errorBoardDetails ? <p>Error Board Loading : {errorBoardDetails} </p> :
                errorNotes ? <p>{currentBoard.name} - Failed to Load Notes</p> :
                <>
                    <BoardHeader />
                    <NotesList />
                </>
            }
        </div>
    )
}

export default BoardPage