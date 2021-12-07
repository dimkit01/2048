document.addEventListener("DOMContentLoaded", () => {
    let data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let score = 0;
    let gameStatus = false;
    let winStatus = false;
    let fieldSize = 4;
    let cells = document.querySelectorAll('.cell');
    const gameField = document.querySelector('.game_field');
    const input = document.querySelector(".field_size__input");
    const output = document.querySelector(".field_size__output");
    const winningBlock = document.querySelector('.winning_game');
    const lostBlock = document.querySelector('.game_over');
    const colors = ['n2', 'n4', 'n8', 'n16', 'n32', 'n64', 'n128', 'n256', 'n512', 'n1024', 'n2048', 'n4096', 'n8192', 'n9999'];

    input.addEventListener("input", () => {
        if (+input.value === 1) {
            output.innerHTML = '4*4';
            fieldSize = 4;
            reloadGame();
        } else if (+input.value === 2) {
            output.innerHTML = '6*6';
            fieldSize = 6;
            reloadGame();
        } else if (+input.value === 3) {
            output.innerHTML = '8*8';
            fieldSize = 8;
            reloadGame();
        } else if (+input.value === 4) {
            output.innerHTML = '16*16';
            fieldSize = 16;
            reloadGame();
        }
    });

    function reloadGame() {
        score = 0;
        updateScore();
        createField();
        dataFilling();
        generateRandomNumber();
        generateRandomNumber();
        updateColor();
        viewData();
    }

    function startField() {
        generateRandomNumber();
        generateRandomNumber();
        updateColor();
        viewData();
    }

    startField();

    function viewData() {
        cells.forEach((e, i) => {
            e.innerHTML = `${data.flat()[i]}`;
        });
    }

    function dataFilling() {
        data = [];
        for (let i = 0; i < fieldSize; i++) {
            data.push([]);

        }
        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize; j++) {
                data[i].push(0);
            }
        }
    }

    function createField() {
        gameField.innerHTML = '';
        cells = [];
        for (let i = 1; i <= fieldSize * fieldSize; i++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            gameField.append(div);
            cells.push(div);
            if (fieldSize !== 4) {
                gameField.classList.add('big_game_field');
            } else {
                gameField.classList.remove('big_game_field');
            }

            if (fieldSize === 8) {
                div.style.width = '60px';
                div.style.height = '60px';
                div.style.margin = '13px 0 0 13px';
                div.style.lineHeight = '60px';
                div.style.fontSize = '25px';
            } else if (fieldSize === 16) {
                div.style.width = '32px';
                div.style.height = '32px';
                div.style.margin = '5px 0 0 5px';
                div.style.lineHeight = '35px';
                div.style.fontSize = '15px';
            }
        }
    }

    function generateRandomNumber() {
        let num = Math.random() < 0.5 ? 2 : 4;

        let rand1 = Math.floor(Math.random() * fieldSize);
        let rand2 = Math.floor(Math.random() * fieldSize);

        if (data[rand1][rand2] === 0) {
            data[rand1][rand2] = num;
        } else generateRandomNumber();
    }

    function updateScore() {
        const scoreWrapper = document.querySelector('#score01');
        scoreWrapper.innerHTML = `${score}`;
    }

    function checkMoves(move) {
        let dataClone = [].concat(data);
        let check = false;

        move();

        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize; j++) {
                if (dataClone[i][j] !== data[i][j]) {
                    check = true;
                    break;
                }
            }
        }

        return check;
    }

    function isGameWinning() {
        const winButton = winningBlock.querySelector('a');
        data.flat().forEach((e) => {
            if (e === 2048) {
                winningBlock.style.display = 'block';
                winStatus = true;
            }
        })
        winButton.addEventListener('click', () => {
            winningBlock.style.display = 'none';
        })
        winButton.addEventListener('touchend', () => {
            winningBlock.style.display = 'none';
        })
    }

    function checkColumnNeighbors() {
        for (let i = 0; i < fieldSize - 1; i++) {
            for (let j = 0; j < fieldSize; j++) {
                if (data[i][j] === data[i + 1][j]) {
                    gameStatus = false;
                    break;
                }
            }
        }
    }

    function checkRowsNeighbor() {
        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize - 1; j++) {
                if (data[i][j] === data[i][j + 1]) {
                    gameStatus = false;
                    break;
                }
            }
        }
    }

    function checkByZero() {
        data.flat().forEach((e) => {
            if (e === 0) {
                gameStatus = false;
            }
        })
    }

    function isGameOver() {
        gameStatus = true;
        checkRowsNeighbor();
        checkColumnNeighbors();
        checkByZero();

        if (gameStatus) {
            lostBlock.style.display = 'block';
            const loseButton = lostBlock.querySelector('a');
            const loseScore = lostBlock.querySelector('#score02')
            loseScore.innerHTML = `${score}`;
            loseButton.addEventListener('click', () => {
                lostBlock.style.display = 'none';
                reloadGame();
            })
            loseButton.addEventListener('touchend', () => {
                lostBlock.style.display = 'none';
                reloadGame();
            })
        }

    }

    function action() {
        updateScore();
        generateRandomNumber();
        updateColor();
        viewData();
        isGameOver();
        if (!winStatus) {
            isGameWinning();
        }
    }

    function updateColor() {
        let newArray = data.flat();
        newArray.forEach((e, i) => {
            cells[i].classList.remove(...colors);
            if (e > 8192) {
                cells[i].classList.add('n9999');
            } else {
                cells[i].classList.add(`n${e}`);
            }
        });
    }


    // Movements

    function moveRight() {
        for (let i = 0; i < data.length; i++) {
            let values = data[i].filter(value => value > 0);
            for (let j = values.length - 1; j >= 0; j--) {
                if (values[j] === values[j - 1]) {
                    values[j] = values[j] * 2;
                    score += values[j];
                    values[j - 1] = 0;
                }
            }
            values = values.filter(value => value > 0);
            while (values.length !== fieldSize) {
                values.unshift(0);
            }
            data[i] = values;
        }
    }

    function moveLeft() {
        for (let i = 0; i < data.length; i++) {
            let values = data[i].filter(value => value > 0);
            for (let j = 0; j <= values.length - 1; j++) {
                if (values[j] === values[j + 1]) {
                    values[j] = values[j] * 2;
                    score += values[j];
                    values[j + 1] = 0;
                }
            }
            values = values.filter(value => value > 0);
            while (values.length !== fieldSize) {
                values.push(0);
            }
            data[i] = values;
        }
    }

    function transpose(array) {
        let copy = [];
        for (let i = 0; i < array.length; ++i) {
            for (let j = 0; j < array[i].length; ++j) {
                if (copy[j] === undefined) copy[j] = [];
                copy[j][i] = array[i][j];
            }
        }
        return copy;
    }


    function moveUp() {
        let newArray = transpose(data);

        for (let i = 0; i < newArray.length; i++) {
            let values = newArray[i].filter(value => value > 0);
            for (let j = 0; j <= values.length - 1; j++) {
                if (values[j] === values[j + 1]) {
                    values[j] = values[j] * 2;
                    score += values[j];
                    values[j + 1] = 0;
                }
            }
            values = values.filter(value => value > 0);
            while (values.length !== fieldSize) {
                values.push(0);
            }
            newArray[i] = values;
        }

        data = transpose(newArray);
    }


    function moveDown() {
        let newArray = transpose(data);

        for (let i = 0; i < newArray.length; i++) {
            let values = newArray[i].filter(value => value > 0);
            for (let j = values.length - 1; j >= 0; j--) {
                if (values[j] === values[j - 1]) {
                    values[j] = values[j] * 2;
                    score += values[j];
                    values[j - 1] = 0;
                }
            }
            values = values.filter(value => value > 0);
            while (values.length !== fieldSize) {
                values.unshift(0);
            }
            newArray[i] = values;
        }

        data = transpose(newArray);
    }


    // Keys events

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (checkMoves(moveUp)) {
                action();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (checkMoves(moveDown)) {
                action();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (checkMoves(moveLeft)) {
                action();
            }
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (checkMoves(moveRight)) {
                action();
            }
        }
    });

    // Touch events

    let initialPoint;
    let finalPoint;
    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function (event) {
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    /*СВАЙП ВЛЕВО*/
                    if (checkMoves(moveLeft)) {
                        action();
                    }
                } else {
                    /*СВАЙП ВПРАВО*/
                    if (checkMoves(moveRight)) {
                        action();
                    }
                }
            } else {
                if (finalPoint.pageY < initialPoint.pageY) {
                    /*СВАЙП ВВЕРХ*/
                    if (checkMoves(moveUp)) {
                        action();
                    }
                } else {
                    /*СВАЙП ВНИЗ*/
                    if (checkMoves(moveDown)) {
                        action();
                    }
                }
            }
        }
    }, false);

});
