import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunk from "redux-thunk"
import { notesListReducer, noteCreateReducer, noteEditReducer, noteDeleteReducer } from "../reducers/notes"
import { boardEditReducer, boardsListReducer, boardCreateReducer, boardDetailsReducer, boardDeleteReducer, boardClearReducer } from "../reducers/boards"

const composeEnhancers = 
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) :
    compose
    
// const composeEnhancers = compose

const rootReducer = combineReducers({
    notesList: notesListReducer,
    noteCreate: noteCreateReducer,
    noteEdit: noteEditReducer,
    noteDelete: noteDeleteReducer,
    boardDetails: boardDetailsReducer,
    boardsList: boardsListReducer,
    boardCreate: boardCreateReducer,
    boardEdit: boardEditReducer,
    boardDelete: boardDeleteReducer,
    boardClear: boardClearReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return { store }
}
