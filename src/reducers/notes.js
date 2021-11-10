// import { combineReducers } from "redux"

import { FETCH_NOTES_BEGIN, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR, RESET_FETCH_NOTES, CREATE_NOTE_SUCCESS, CREATE_NOTE_ERROR, RESET_CREATE_NOTE, DELETE_NOTE_BEGIN, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR, RESET_DELETE_NOTE, EDIT_NOTE_BEGIN, EDIT_NOTE_SUCCESS, EDIT_NOTE_ERROR, CREATE_NOTE_BEGIN, RESET_EDIT_NOTE } from "../constants/notesConstants"

// id for placeholder note (until success is dispatched)
const tempNoteId = "temp"

const notesListReducer = (state = { notes: [], loading: false, error: null }, action) => {
    switch(action.type) { 
        case FETCH_NOTES_BEGIN:
            return {
                loading: true
            }
        case FETCH_NOTES_SUCCESS:
            return {
                loading: false,
                notes: action.payload,
                success: true
            }
        case FETCH_NOTES_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_FETCH_NOTES:
            return {
                notes: [],
                loading: false,
                error: null,
            }
        case CREATE_NOTE_BEGIN:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.payload
                ]
            }
        case CREATE_NOTE_SUCCESS:
            // remove placeholder note
            const filteredNotes = state.notes.filter(note => note.id !== tempNoteId )
            return {
                ...state,
                notes: [
                    ...filteredNotes,
                    action.payload
                ]
            }
        // on create note error delete? notification?
        case EDIT_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload.id) {
                        return {
                            ...note,
                            ...action.payload.updates
                        } 
                    } else {
                        return note
                    }
                })
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter((note) => {
                    return note.id !== action.payload
                })
            }
        default:
            return state
    }
}

const noteCreateReducer = (state = { note: {}, loading: false, error: null }, action) => {
    switch(action.type) { 
        case CREATE_NOTE_BEGIN:
            return {
                loading: true
            }
        case CREATE_NOTE_SUCCESS:
            return {
                loading: false,
                note: action.payload,
                success: true
            }
        case CREATE_NOTE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_CREATE_NOTE:
            return {
                note: {},
                loading: false,
                error: null
            }
        default:
            return state
    }
}

const noteDeleteReducer = (state = { noteId: null, loading: false, error: null }, action) => {
    switch(action.type) { 
        case DELETE_NOTE_BEGIN:
            return {
                loading: true
            }
        case DELETE_NOTE_SUCCESS:
            return {
                loading: false,
                noteId: action.payload,
                success: true
            }
        case DELETE_NOTE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_DELETE_NOTE:
            return {
                noteId: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

const noteDetailsReducer = (state = { note: {}, loading: false, error: null }, action) => {
    switch(action.type) { 
        case FETCH_NOTES_BEGIN:
            return {
                loading: true
            }
        case FETCH_NOTES_SUCCESS:
            return {
                loading: false,
                note: {...action.payload},
                success: true
            }
        case FETCH_NOTES_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const noteEditReducer = (state = { note: {}, loading: false, error: null}, action) => {
    switch(action.type) { 
        case EDIT_NOTE_BEGIN:
            return {
                loading: true
            }
        case EDIT_NOTE_SUCCESS:
            return {
                loading: false,
                note: action.payload,
                success:true
            }
        case EDIT_NOTE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_EDIT_NOTE:
            return {
                note: {}, loading: false, error: null
            }
        default:
            return state
        }
}

//delete below
// export default (state = initialState, action) => {
//     switch (action.type) {
//         case EDIT_NOTE_BEGIN:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case EDIT_NOTE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 notesList: state.notesList.map((note) => {
//                     if (note.id === action.payload.id) {
//                         return {
//                             ...note,
//                             ...action.payload.updates
//                         } 
//                     } else {
//                             return note
//                     }
//                 })
//             }
//         case DELETE_NOTE_BEGIN:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case DELETE_NOTE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 notesList: state.notesList.filter((note) => {
//                     return note.id !== action.payload.id
//                 })
//             }
//         case FETCH_NOTES_BEGIN:
//             return {
//                 ...state,
//                 loading: true,
//                 notesList: [], //get rid of that?
//             }
//         case FETCH_NOTES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 notesList: action.payload.notesList
//             }
//         default:
//             return state
//     }
// }

export { notesListReducer, noteCreateReducer, noteEditReducer, noteDeleteReducer, noteDetailsReducer }