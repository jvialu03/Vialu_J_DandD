(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				gameBoard = document.querySelector('.puzzle-board'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				zonePieces = document.querySelector('.puzzle-pieces');;

	const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {
		//change all the image elements on the page -> draggable image sources
		// change the image elements on the left to match the selection puzzle
		pieceName.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			puzzlePieces[index].id = `${piece + this.dataset.puzzleref}`;
		});

		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		//debugger;
	}

	function allowDrag(event) {
		console.log('started dragging an image');
		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragging over an image');
	}

	function allowDrop(event) {
		// if a drop zone already has 1 or more puzzle piece, this function will immediately stop
		if (this.children.length >= 1) {
			return;
		}

		//event.preventDefault();
		console.log('dropped an image');

		// go and get the dragged element's ID from the data transfer
		let currentImage = event.dataTransfer.getData("text/plain");

		// add that image to whatever drop zone we're dropping our image on
		event.target.appendChild(document.querySelector(`#${currentImage}`));
	}

	// resets the puzzle pieces when clicking the thumbs to change pieces
	// when this function is called, a for loop will execute and append each child back to the parent node
	function resetPuzzlePieces() {
		for (let i = 0; i < puzzlePieces.length; i++) {
			zonePieces.appendChild(puzzlePieces[i]);
		}
	}

	// add event handling here -> how is the user going to use our app?
	// what triggers do we need

	// click on the bottom buttons to change the puzzle image we're working with and to reset the drop zone
	puzzleButtons.forEach(button => {
		button.addEventListener('click', changeImageSet);
		button.addEventListener('click', resetPuzzlePieces);
	});

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the function and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[2]);
})();
