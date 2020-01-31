(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				gameBoard = document.querySelector('.puzzle-board'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img');

	const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {
		//change all the image elements on the page -> draggable image sources
		// change the image elements on the left to match the selection puzzle
		pieceName.forEach((piece, index) => puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`);

		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		//debugger;
	}


	// add event handling here -> how is the user going to use our app?
	// what triggers do we need

	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));


	// call the function and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[2]);
})();
