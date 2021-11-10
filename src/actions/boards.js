import { SET_CURRENT_BOARD, CREATE_BOARD_BEGIN, CREATE_BOARD_SUCCESS, FETCH_BOARD_DETAILS_BEGIN, FETCH_BOARD_DETAILS_SUCCESS, FETCH_BOARD_DETAILS_ERROR
    , RESET_FETCH_BOARD_DETAILS, FETCH_BOARDS_BEGIN, FETCH_BOARDS_SUCCESS, FETCH_BOARDS_ERROR
    , EDIT_BOARD_BEGIN, EDIT_BOARD_SUCCESS, DELETE_BOARD_BEGIN, DELETE_BOARD_SUCCESS, CREATE_BOARD_ERROR
    , CLEAR_BOARD_BEGIN, CLEAR_BOARD_SUCCESS, CLEAR_BOARD_ERROR, RESET_CLEAR_BOARD
    , DELETE_BOARD_ERROR, RESET_DELETE_BOARD, EDIT_BOARD_ERROR, RESET_CREATE_BOARD } from "../constants/boardsConstants"
import database from "../fixtures/db"
import { v1 as uuid } from "uuid"

export const setCurrentBoard = (board = {}) => ({
    type: SET_CURRENT_BOARD,
    payload: {
        board
    }
})

export const fetchBoardDetailsBegin = () => ({
    type: FETCH_BOARD_DETAILS_BEGIN
})

export const fetchBoardDetailsSuccess = (board) => ({
    type: FETCH_BOARD_DETAILS_SUCCESS,
    payload: board
})

export const fetchBoardDetailsError = (error) => ({
    type: FETCH_BOARD_DETAILS_ERROR,
    payload: error
})

export const resetFetchBoardDetails = () => ({
    type: RESET_FETCH_BOARD_DETAILS
})

export const startFetchBoardDetails = (boardId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchBoardDetailsBegin())
            const boardSnapshot = database.boards.filter((board) => board.id === boardId)
            if (boardSnapshot && boardSnapshot.length > 0) {
                dispatch(fetchBoardDetailsSuccess({
                    ...boardSnapshot[0]
                }))
            } else {
                console.log(`Board with id ${boardId} not found`)
                dispatch(fetchBoardDetailsError(`Board with id ${boardId} not found`))
            }

        } catch (error) {
            console.log(error)
            dispatch(fetchBoardDetailsError(error.message))
        }
    }
}

export const createBoardBegin = () => ({
    type: CREATE_BOARD_BEGIN,
})

export const createBoardSuccess = (board, id) => ({
    type: CREATE_BOARD_SUCCESS,
    payload: {
        id,
        ...board
    }
})

export const createBoardError = (error) => ({
    type: CREATE_BOARD_ERROR,
    payload: error
})

export const resetCreateBoard = () => ({
    type: RESET_CREATE_BOARD
})

export const startCreateBoard = (board) => {
    return async (dispatch, getState) => {
        try {
            dispatch(createBoardBegin())
            const boardRef = {...board, id: uuid()}
            database.boards.push(boardRef)
            dispatch(createBoardSuccess(board, boardRef.id))
        } catch (error) {
            console.log(error)
            dispatch(fetchBoardsError(error.message))
        }
    }
}

export const fetchBoardsBegin = () => ({
    type: FETCH_BOARDS_BEGIN
})

export const fetchBoardsSuccess = (boardsList) => ({
    type: FETCH_BOARDS_SUCCESS,
    payload: boardsList
})

export const fetchBoardsError = (error) => ({
    type: FETCH_BOARDS_ERROR,
    payload: error
})

export const startFetchBoards = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchBoardsBegin())
            const boardsSnap = database.boards

            let boards = []

            boardsSnap.forEach((childSnapshot) => {
                boards.push({
                    ...childSnapshot
                })
            })
            dispatch(fetchBoardsSuccess(boards))
        } catch (error) {
            console.log(error)
            dispatch(fetchBoardsError(error.message))
        }
    }
}

export const editBoardBegin = () => ({
    type: EDIT_BOARD_BEGIN
})

export const editBoardSuccess = (id, updates) => ({
    type: EDIT_BOARD_SUCCESS,
    payload: {
        id,
        updates
    }
})

export const editBoardError = (error) => ({
    type: EDIT_BOARD_ERROR,
    payload: error
})

export const startEditBoard = (id, updates) => {
    return async (dispatch, getState) => {
        try {
            dispatch(editBoardBegin())
            const idx = database.boards.findIndex((board) => board.id === id)

            if (idx > -1) {
                database.boards[idx] = { id, ...updates }
                dispatch(editBoardSuccess(id, updates)) 
            } else {
                console.log(`Board with id ${id} not found`)
                dispatch(editBoardError(`Board with id ${id} not found`))
            }
        } catch (error) {
            console.log(error)
            dispatch(editBoardError(error.message))
        }
    }
}

export const deleteBoardBegin = () => ({
    type: DELETE_BOARD_BEGIN
})

export const deleteBoardSuccess = (id) => ({
    type: DELETE_BOARD_SUCCESS,
    payload: id
})

export const deleteBoardError = (error) => ({
    type: DELETE_BOARD_ERROR,
    payload: error
})

export const clearBoardBegin = () => ({
    type: CLEAR_BOARD_BEGIN
})

export const clearBoardSuccess = (id) => ({
    type: CLEAR_BOARD_SUCCESS,
    payload: id
})

export const clearBoardError = (error) => ({
    type: CLEAR_BOARD_ERROR,
    payload: error
})

export const resetDeleteBoard = () => ({
    type: RESET_DELETE_BOARD
})

export const resetClearBoard = () => ({
    type: RESET_CLEAR_BOARD
})

// this will also remove assigned notes
export const startDeleteBoard = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(deleteBoardBegin())
            const idx = database.boards.findIndex((board) => board.id === id)
            if (idx > -1)
                database.boards.splice(idx, 1)

            dispatch(deleteBoardSuccess(id))
        } catch (error) {
            console.log(error)
            dispatch(deleteBoardError(error.message))
        }

        try {
            database.notes = database.notes.filter(note => note.board !== id)
        } catch (error) {
            console.log(error)
        }
    }
}

export const startClearBoard = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(clearBoardBegin())
            database.notes = database.notes.filter(note => note.board !== id)
            dispatch(clearBoardSuccess())
        } catch (error) {
            console.log(error)
            dispatch(clearBoardError())
        }
    }
}