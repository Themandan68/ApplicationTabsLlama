let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let displayValue = '';


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('Service worker registered:', registration);
        })
        .catch((error) => {
            console.error('Error registering service worker:', error);
        });
}
// Tic-Tac-Toe
function openTab(event, tabName) {
    let tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    event.target.classList.add('active');

    let tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');

    if (tabName === 'notes') {
        renderNotes();
    }
}

function cellClicked(index) {
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] &&
            gameBoard[combination[1]] === gameBoard[combination[2]] &&
            gameBoard[combination[0]] !== '') {
            document.getElementById('game-result').innerText = `Player ${gameBoard[combination[0]]} wins!`;
            disableCells();
            return;
        }
    }
}

function disableCells() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).style.pointerEvents = 'none';
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).innerText = '';
        document.getElementById(`cell-${i}`).style.pointerEvents = 'auto';
    }
    document.getElementById('game-result').innerText = '';
}

document.getElementById('restart-button').addEventListener('click', restartGame);

for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener('click', () => cellClicked(i));
}

// Notes
function renderNotes() {
    let notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <span class="note-content" ondblclick="editNote(${i})">${note.substring(0, 10)}...</span>
        `;
        notesContainer.appendChild(noteElement);
    }
}

function newNote() {
    let note = prompt('Enter new note:');
    if (note) {
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function editNote(index) {
    let note = prompt('Edit note:', notes[index]);
    if (note) {
        notes[index] = note;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

document.getElementById('new-note-button').addEventListener('click', newNote);

// Calculator
function appendNumber(number) {
    displayValue += number.toString();
    document.getElementById('display').value = displayValue;
}

function appendOperator(operator) {
    displayValue += operator.toString();
    document.getElementById('display').value = displayValue;
}

function calculate() {
    try {
        let result = eval(displayValue.replace('^', '**').replace('sqrt', 'Math.sqrt'));
        displayValue = result.toString();
        document.getElementById('display').value = displayValue;
    } catch (error) {
        document.getElementById('display').value = 'Error';
        displayValue = '';
    }
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}
