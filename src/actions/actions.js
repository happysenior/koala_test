import { v1 as uuid } from "uuid"

const addNote = (boardId, note) => ({
    type: "ADD_NOTE",
    payload: {
        noteId: uuid(),
        note,
        boardId
    }
})