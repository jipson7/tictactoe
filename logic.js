/**
 *@author Caleb Phillips 
 */

//Global Variables

var squareFilled;
var squareContents;
var winScenario;
var playerTurn = 0;
var elementName;
var gameOver = false;

/**
 *@brief Basically this is a constructor. It assigns some data to the arrays and tells the first
 *player to make a move
 *
 *
 */

window.onload = function(){

	squareFilled = new Array();
	squareContents = new Array();
	winScenario = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


	for (var i = 0; i < 9; i++){
		squareFilled[i] = false;
		squareContents[i] = '';
	}
	printMessage("messages", "Player 1's Turn (X)");
}

/**
 *@brief The main game logic, it checks to see if the box that was clicked is already full
 * It also fills arrays as it goes to keep track of passed moves. 
 *@param boxNumber Is the box indice from 0 - 8 that was clicked.
 *
 */
function boxClicked(boxNumber){
	

	elementName = "box" + boxNumber;

	if(!squareFilled[boxNumber]){
		if((playerTurn % 2) == 0){
			printMessage(elementName, "X");
			squareContents[boxNumber] = "X";
			printMessage("messages", "Player 2's Turn (O)");
		} else {
			printMessage(elementName, "O");
			squareContents[boxNumber] = "O";
			printMessage("messages", "Player 1's Turn (X)");
		}
		winState();
		playerTurn++;
		squareFilled[boxNumber] = true;
		if(playerTurn == 9) {
			printMessage("messages", "Nobody won, you're both terrible.");
			restartGame();
		}
	}

	gameOverMessage();

}

/**
 *@brief winState is called every time by the main loop to check the conditions for either player winning
 */

function winState(){
	
	for (var j = 0; j < winScenario.length; j++){
		if(playerTurn%2 == 0){
			if((squareContents[winScenario[j][0]] == 'X')&&(squareContents[winScenario[j][1]] == 'X')&&(squareContents[winScenario[j][2]] == 'X')){
				printMessage("messages", "Player 1 (X) has won the game!");
				fillSpaces();
				restartGame();
			}
		} else {
			if((squareContents[winScenario[j][0]] == 'O')&&(squareContents[winScenario[j][1]] == 'O')&&(squareContents[winScenario[j][2]] == 'O')){
				printMessage("messages", "Player 2 (O) has won the game!");
				fillSpaces();
				restartGame();
			}
		}
	}

}

/**
 *@brief asks the user if they would like to play another game by editing the html elements
 */

function restartGame(){
	printMessage("playAgainMessage", "Would You Like to Play Again?");
	printMessage("yes", "YES");
	printMessage("no", "NO");
}

/**
 *@brief uses the value from restart game to either reload the page or declare game over
 */

function playAgain(replayValue){
	if(replayValue == 1){
		location.reload(true);
	} else {
		fillSpaces();
		gameOver = true;
		gameOverMessage();
	}
}



function gameOverMessage(){
	if (gameOver){
		printMessage("messages", "Game Over.");
	}
}

/**
 *@brief fills spaces of the gameboard to ensure no further moves can be made.
 */

function fillSpaces(){
	for (var i = 0; i < squareFilled.length; i++){
			squareFilled[i] = true;
		}
}


/**
 *@brief simple line to change html elements, usually used in this program to print messages to user
 *@param elmnt the element to be changed
 *@param newOutput the message to be displayer
 */
function printMessage(elmnt, newOutput){
	document.getElementById(elmnt).innerHTML = newOutput;
}


