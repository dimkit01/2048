document.addEventListener("DOMContentLoaded", () => {
	let data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		],
		score = 0,
		gameOver = false;

	const cells = document.querySelectorAll('.cell');
		
	function start() {
		score = 0;
		updateScore();
		gameOver = false;
		data = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		
		generateRandomNumber();
		generateRandomNumber();
		updateColor();
		dataView();
	}
	start();

	function generateRandomNumber() {
		let num = Math.random() < 0.5 ? 2 : 4;

		let rand1 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
		let rand2 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

		if (data[rand1][rand2] === 0) {
			data[rand1][rand2] = num;
		} else generateRandomNumber();
	}

	function dataView() {
		cells.forEach((e, i) => {
			e.innerHTML = data.flat()[i];
		});
	}

	// Moves 

	function moveRight() {
		for (let i = 0; i < data.length; i++) {
			let values = data[i].filter(value => value);
			for (let j = values.length - 1; j >= 0; j--) {
				if (values[j] === values[j - 1]) {
					values[j] = values[j] * 2;
					score+= values[j];
					values[j - 1] = 0; 
				}
			}
			values = values.filter(value => value);
			while (values.length !== 4) {
				values.unshift(0);
			}
			data[i] = values;
		}

		isGameOver();
	}

	function moveLeft() {
		for (let i = 0; i < data.length; i++) {
			let values = data[i].filter(value => value);
			for (let j = 0; j <= values.length - 1; j++) {
				if (values[j] === values[j + 1]) {
					values[j] = values[j] * 2;
					score+= values[j];
					values[j + 1] = 0; 
				}
			}
			values = values.filter(value => value);
			while (values.length !== 4) {
				values.push(0);
			}
			data[i] = values;
		}

		isGameOver();
	}

	function moveUp() {
		let newArray = [[],[],[],[]];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				newArray[j][i] = data[i][j];
			}
		}

		for (let i = 0; i < newArray.length; i++) {
			let values = newArray[i].filter(value => value);
			for (let j = 0; j <= values.length - 1; j++) {
				if (values[j] === values[j + 1]) {
					values[j] = values[j] * 2;
					score+= values[j];
					values[j + 1] = 0; 
				}
			}
			values = values.filter(value => value);
			while (values.length !== 4) {
				values.push(0);
			}
			newArray[i] = values;
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				data[j][i] = newArray[i][j];
			}
		}

		isGameOver();
	}

	function moveDown() {
		let newArray = [[],[],[],[]];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				newArray[j][i] = data[i][j];
			}
		}

		for (let i = 0; i < newArray.length; i++) {
			let values = newArray[i].filter(value => value);
			for (let j = values.length - 1; j >= 0; j--) {
				if (values[j] === values[j - 1]) {
					values[j] = values[j] * 2;
					score+= values[j];
					values[j - 1] = 0; 
				}
			}
			values = values.filter(value => value);
			while (values.length !== 4) {
				values.unshift(0);
			}
			newArray[i] = values;
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				data[j][i] = newArray[i][j];
			}
		}

		isGameOver();
	}

	function updateScore() {
		const scoreWrapper = document.querySelector('#score01');
		scoreWrapper.innerHTML = score;
	}

	function action() {
		checkMoves();
		generateRandomNumber();
		updateScore();
		updateColor();
		dataView();
	}

	function checkMoves() {
		let check = 0;
		for (let i = 0; i < 4 ; i++) {
			for (let j = 0; j < 4 ; j++) {
				if (data[i][j] === data[i][j + 1] || data[i][j] === 0) {
					check = 1;
				} 
			}
		}

		let newArray = [[],[],[],[]];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				newArray[j][i] = data[i][j];
			}
		}

		for (let i = 0; i < 4 ; i++) {
			for (let j = 0; j < 4 ; j++) {
				if (newArray[i][j] === newArray[i][j + 1]  || data[i][j] === 0) {
					check = 1;
				} 
			}
		}

		if (check === 0) {
			gameOver = true;
		}

	}

	function isGameOver() {
		try {
			action();
		  }
		  catch (e) {
			if (e instanceof RangeError) {

				if (gameOver) {
					const gameOverDisplay = document.querySelector('.gameover'),
					finalScore = document.querySelector('#score02'),
					restartGame = gameOverDisplay.querySelector('a');

			 		gameOverDisplay.style.display = 'block';
			 		finalScore.innerHTML = score;
			 		restartGame.addEventListener('click', () => {
				  		gameOverDisplay.style.display = 'none';
				  		start();	
			 		});
					restartGame.addEventListener("touchend", () => {
						gameOverDisplay.style.display = 'none';
				  		start();
					}, false);
				}
			}
		  }
	}

	function updateColor() {
		let newArray = data.flat();
		newArray.forEach((e,i) => {
			if (e === 0){
				cells[i].classList.remove('n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n0');
			} else if (e === 2) {
				cells[i].classList.remove('n0','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n2');
			} else if (e === 4) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n4');
			} else if (e === 8) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n8');
			} else if (e === 16) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n16');
			} else if (e === 32) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n32');
			} else if (e === 64) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n64');
			} else if (e === 128) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n128');
			} else if (e === 256) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n256');
			} else if (e === 512) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n512');
			} else if (e === 1024) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n1024');
			} else if (e === 2048) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n2048');
			} else if (e === 4096) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n4096');
			} else if (e === 8192) {
				cells[i].classList.remove('n0','n2','n4','n8','n16','n32','n64','n128','n256','n512','n1024','n2048','n4096','n8192');
				cells[i].classList.add('n8192');
			}
		});
	}
	// Keys events

	document.onkeydown = checkKey;

	function checkKey(e) {
	
		e = e || window.event;
	
		if (e.keyCode === 38) {
			moveUp();
		}
		else if (e.keyCode === 40) {
			moveDown();
		}
		else if (e.keyCode === 37) {
		   moveLeft();
		}
		else if (e.keyCode === 39) {
		   moveRight();
		}
	
	}

	// Touch events

	let initialPoint;
	let finalPoint;
	document.addEventListener('touchstart', function(event) {
	event.preventDefault();
	event.stopPropagation();
	initialPoint=event.changedTouches[0];
	}, false);
	document.addEventListener('touchend', function(event) {
	event.preventDefault();
	event.stopPropagation();
	finalPoint=event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (xAbs > 20 || yAbs > 20) {
	if (xAbs > yAbs) {
	if (finalPoint.pageX < initialPoint.pageX){
	/*СВАЙП ВЛЕВО*/
		moveLeft();
	} else{
	/*СВАЙП ВПРАВО*/
		moveRight();	
	}
	}
	else {
	if (finalPoint.pageY < initialPoint.pageY){
	/*СВАЙП ВВЕРХ*/
		moveUp();
	}
	else{
	/*СВАЙП ВНИЗ*/
		moveDown();
	}
	}
	}
	}, false);
});
