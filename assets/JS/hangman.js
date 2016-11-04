console.log("Hello!");

var currentWord = "";
	var userInput = "";
	var guesses = 0;
	var misses = 8;
	var letterButton = [];
	var dashes = [];
	var remainingLetters = 0;
	var spaces = 0;
	var didFindLetter = false;
	var escapePicture = 0;
	var endingPicture = 0;
	
					/*Create an array with the alphabet letters*/

	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];

					/*Creates an array of random words*/

	var horror = [	"BLAIR WITCH PROJECT", 
					"RESIDENT EVIL", 
					"AMITYVILLE HORROR", 
					"STRANGERS", 
					"CLOWN STATUE", 
					"VANISHING HITCHHIKER",
					"HELLO KITTY MURDER"	];

	function startGame(){
		escapePicture = Math.floor(Math.random() * 5) + 1;
		endingPicture = Math.floor(Math.random() * 5) + 1;
		currentWord = horror[Math.floor(Math.random() * (1 + horror.length - 1))];
		spaces = (currentWord.split(" ").length - 1);
		remainingLetters = (currentWord.length - spaces);
		
		playAnimation();

		$('#Misses').html(misses);

	};

	/******This renders all the elements on the page to start game******/
	function renderDashes(){
		for(index = 0; index < currentWord.length; index++){
			if(currentWord[index] === ' '){
				dashes.push(' ');
			} else if (currentWord[index]){
			dashes.push(' _ ');
			}
		}
		$('#word').append(dashes);
	};

	function renderButtons(slideInRight){
		for(index = 0; index < alphabet.length - 1; index++){
			letterButton = $('<button>', {
				class: "btn btn-default",
				class: "buttonMargin",
				value: alphabet[index],
				id: "boton"
			})

			letterButton.append(alphabet[index]);
		
			$("#alphabetContainer").append(letterButton);
		}
		slideInRight();
	};

	function slideInRight(callback){
		$('#animateTitle').addClass('animated slideInRight');
		callback();
	};

	function playAnimation(){
		renderButtons(function(){
			slideInRight(function(){
				renderDashes();
			})
		})
	};

	/*************************************************************/

	// This renders animation when user looses
	function runEnding(misses){
		if(misses < 1){
			playViolinPsycho();
			$('#ending').empty();
			$('#ending').append('<img id="endingHanged" class="animated zoomIn" src="assets/images/animate/picture1.gif"/>');
			$('#ending').append('<img id="endingHanged" class="animated zoomIn" src="assets/images/animate/end' + endingPicture + '.gif"/>');
		}
	};

	// This renders the animations when user wins
	function runEscape(remainingLetters){
		if(remainingLetters < 1){
			playIwillKillYou();
			$('#ending').empty();
			$('#ending').append('<img id="escaped" class="animated zoomIn" src="assets/images/animate/escapedLetters.gif"/>');
			$('#ending').append('<img id="escaped" class="animated zoomIn" src="assets/images/animate/escaped' + escapePicture + '.gif"/>');
		}
	};

	/************************Audio Functions***************************/
	function playDarkLaugh(){
		var audio = new Audio('assets/sounds/darkLaugh.mp3');
		audio.play();
	};

	function playViolinPsycho(){
		var audio = new Audio('assets/sounds/violinNoise.mp3');
		audio.play();
	};

	function playIwillKillYou(){
		var audio = new Audio('assets/sounds/Iwillkillyou.mp3');
		audio.play();
	}

	/*********************************************************************/

	startGame();

		$('#reset').on('click', function() {
			window.location.reload();
		});

		$(':button').on('click', function(callback){
			userInput = this.value;
			didFindLetter = false;
			$('#lettersEntered').append(userInput);
				for(i = 0; i < currentWord.length; i++){
					if(userInput === currentWord[i]){
						didFindLetter = true; 
						// After letter found, remove dash from iterated index
						dashes.splice(i, 0);
						// Then insert letter inputed by user
						dashes.splice(i, 1, userInput);
						$('#word').empty();
						$('#word').append(dashes);
						remainingLetters--;
						guesses++;
						} 
					} 
					
				if(!didFindLetter === true){
					//Play sound here whenever wrong letter is clicked
					playDarkLaugh();
					misses--;
					$('#Misses').html(misses);
				}
				this.disabled = true;
				runEnding(misses);
				runEscape(remainingLetters);
		});