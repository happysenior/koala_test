const obj = {
    // boards reducer
    boards : { allBoards: [ // won't be modified - only to store downloaded data to present - use local storage as db
            {
                id: "board1",
                name: "board first",
                //notes: ["note1", "note2"]
            },
            {
                id: "board2",
                name: "board second",
                //notes: ["note3", "note4"]
            }
        ],
        // it will be used for making a calls for note ids, display name and 
        currentBoard: {
            id: "board1",
            name: "board first",
            //notes: ["note1", "note2"]
        }
    },
    notes : {
        currentNotes: [ "fetch data, on modify export by Id" ]
    }
}