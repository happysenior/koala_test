export default (boardId, boardsList) => {
    return boardsList.filter((board) => board.id === boardId)[0]
}