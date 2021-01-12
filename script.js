(function Manager() {
	//DOM
	const board = Array.from(document.querySelectorAll('.cell p'));
	const restart = document.getElementById('reset');
	const playAgain = document.getElementById('pa');
	const win = document.querySelector('.win')

	// List of 25 to begin with, can continue to be added to
	var phrases = [
		'Hi, who just joined?',
		'Can you email that to everyone?',
		'___, are you there?',
		"Uh, ___, you're still sharing",
		'Hey, guys, I have to jump to another call',
		'*Sound of someone typing, possibly with a hammer*',
		'*Loud painful echo/feedback*',
		'*Child or animal noises*',
		'Hi, can you hear me?',
		"No, it's still loading",
		'Next slide please',
		'Can everyone go on mute?',
		"I'm sorry I was on mute.",
		'(For overtalkers) Sorry, go ahead.',
		'Hello..? Hello..?',
		'So (faded out) I can (uninteligable) by (cuts out) ok?',
		"Sorry I'm late (insert lame excuse)",
		'I have a hard stop at...',
		"I'm sorry, you cut out there",
		'Can we take this offline?',
		"I'll have to get back to you",
		'Can everyone see my screen?',
		'Sorry, I was having connection issues',
		'I think theres a lag',
		"Sorry, didn't catch that. Can you repeat?",
		'(cough cough) sorry, not the rona',
		'whats the SOP on that?',
		'(unmuted sighing)',
		'Are you on the VPN?',
	];

	var ownedSpots = []

	function randomPhrase(array) {
		// to not affect source array
		let temp = array;

		for (let i = temp.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[temp[i], temp[j]] = [temp[j], temp[i]];
		}
		return temp;
	}

	// Helperfunction to clear spaces and reset game state
	const reset = () => {
		let phrase = randomPhrase(phrases);

		board.forEach((cell, index) => {
			cell.innerText = phrase[index];
			cell.parentNode.style.backgroundColor = '';
			cell.style.color = '#000';
			ownedSpots=[]
			win.style.visibility = "hidden"
		});
	};
	reset();

	//Event Listneners

	// Event listener to color cells and add to the stored spaces, Checks for Win criterea after turns
	board.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			e.target.style.cssText = 'color: #fff;';
			e.target.parentNode.style.cssText =
				'background-color: #0e71eb; border-top: 1px solid black; border-left: 1px solid black;';
				//Add contained spaces to list
			if (!ownedSpots.includes(board.indexOf(e.target))) {
				ownedSpots.push(board.indexOf(e.target))
				console.log(ownedSpots)
				checkWin()
			}
		});
	});

	//Resets the game if play again button is chosen
	playAgain.addEventListener('click', () => {
		reset()
	})

	//Resets the game if new board button is clicked
	restart.addEventListener('click', () => {
		reset();
	});

	// Helper functions
	//im really lazy and this just makes the code a little cleaner for checking my match conditions
	//Could it be cleaner? Sure, is it repetetive? Sure. Do I care enough to change it?
	//Yes, but not today 🤣
	const matchCheck = (arr,a,b,c,d,e) => {
		if (arr.includes(a) && arr.includes(b) && arr.includes(c) && arr.includes(d) && arr.includes(e)) {return true}
	}

	const gameWin = () => {
		win.style.visibility = "visible"
	}

	const checkWin = () => {
		if (ownedSpots.length > 4){
			//Rows
			if (matchCheck(ownedSpots,0,1,2,3,4)){gameWin()}	
			if (matchCheck(ownedSpots,5,6,7,8,9)){gameWin()}	
			if (matchCheck(ownedSpots,10,11,12,13,14)){gameWin()}	
			if (matchCheck(ownedSpots,15,16,17,18,19)){gameWin()}	
			if (matchCheck(ownedSpots,20,21,22,23,24)){gameWin()}	

			//Columns
			if (matchCheck(ownedSpots,0,5,10,15,20)){gameWin()}	
			if (matchCheck(ownedSpots,1,6,11,16,21)){gameWin()}	
			if (matchCheck(ownedSpots,2,7,12,27,22)){gameWin()}	
			if (matchCheck(ownedSpots,3,8,12,18,23)){gameWin()}	
			if (matchCheck(ownedSpots,4,9,13,19,24)){gameWin()}
			
			//Diagonals
			if (matchCheck(ownedSpots,0,6,12,18,24)){gameWin()}	
			if (matchCheck(ownedSpots,4,8,12,16,20)){gameWin()}	
		}
	}

})();
