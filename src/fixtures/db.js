var reduxState = {
    boards : [
        {
            id: "board1",
            name: "board first",
            //notes: ["note1", "note2"]
        },
        {
            id: "board2",
            name: "board second",
            //notes: ["note3", "note4"]
        },
    ],
    notes : [
        {
            id: "note1",
            board: "board1",
            title: "bleble",
            body: "ebe ebe",
            backgroundColor: "#2A9D8F",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            },
            size: {
                width: 200,
                height: 200
            }
        },
        {
            id: "note2",
            board: "board1",
            title: "ebe",
            body: "ebe",
            backgroundColor: "#2A9D8F",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            },
            size: {
                width: 200,
                height: 200
            }
        },
        {
            id: "note3",
            board: "board2",
            title: "aha",
            body: "ehe",
            backgroundColor: "#2A9D8F",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            },
            size: {
                width: 200,
                height: 200
            }
        },
        {
            id: "note4",
            board: "board2",
            title: "ehe",
            body: "haha",
            backgroundColor: "#2A9D8F",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            },
            size: {
                width: 200,
                height: 200
            }
        }
    ]
}

export default reduxState