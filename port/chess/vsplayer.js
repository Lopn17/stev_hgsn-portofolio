document.addEventListener('DOMContentLoaded', () =>{
    let board = null; //initialize the chessboard
    const game = new Chess(); // create new chess.js game instance
    const moveHistory = document.getElementById('move-history'); // get move history container
    let moveCount = 1; // initialize the move count
    let userColor = 'w'; // initialize the user's color as white

    // function to make a random move for the computer
    const makeRandomMove = () =>{
        const possibleMoves = game.moves();

        if(game.game_over()){
            alert("Checkmate!");
        }else{
            const randomIdx = Math.floor(Math.random() * 
        possibleMoves.length);
        const move = possibleMoves[randomIdx];
        game.move(move);
        board.position(game.fen());
        recordMove(move, moveCount); // Record and display the move with move count
        moveCount++; // increasement the move count
        }
    };
    // function to record and display a move in the move history
    const recordMove = (move, count) =>{
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight; //autoscroll to the lattest move


    };
    //function to handle the start of a drag position
    const onDragStart = (source, piece) =>{
        return !game.game_over() && piece.search(userColor) === 0;
    }
    //function to handle a piece drop on the board
    const onDrop = (source, target) =>{
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });
        if(move === null) return 'snapback';
        // Update user color based on move count and alternate on each move
        userColor = moveCount % 2 === 1 ? 'w' : 'b';
        
        // klo mau main tanpa fitur flipboard: vvv
        //userColor = userColor === 'w' ? 'b' : 'w';
        // karena akan ada bug di fitur flip board yaitu pionnya
        // gabisa digerakan , karena urutan gerakan menjadi sesuai sisi yang seharusnya gerak
        
        recordMove(move.san, moveCount);
        moveCount++;

    }

    //function to handle the end of a piece snap animation
    const onSnapEnd = () =>{
        board.position(game.fen());
    };

    //configuration options for the chessboard
    const boardConfig = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapSpeed: 100,
    };
    // initialize the chessboard
    board = Chessboard('board', boardConfig);

    // Event listener for the "Play Again" button
    document.querySelector('.play-again').addEventListener
    ('click', () =>{
        game.reset();
        board.start();
        moveHistory.textContent = '';
        moveCount = 1;
        userColor = 'w';
    });

    // Event listener for the "Set Position" button
    document.querySelector('.set-pos').addEventListener
    ('click', () =>{
        const fen = prompt("Enter the FEN notation for the desired position!")
        if(fen !== null){
            board.position(fen);
            moveHistory.textContent = '';
            moveCount = 1;
            userColor = 'w';
        }else{
            alert("Invalid FEN notation. Please try again.");

        }
        
    });

    // Event listener for the "Flip Board" button
    document.querySelector('.flip-board').addEventListener
    ('click', () =>{
        board.flip();
        // toggle user's color after flipping the baord
        userColor = userColor === 'w' ? 'b' : 'w';
    });


});