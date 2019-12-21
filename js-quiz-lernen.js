var saveArrayTemp;

function startQuestion(answerDiv, questions, saveArray){
	var questionNumber = 0;
	//saveArrayTemp = saveArray;
	replace_question_text(questions[questionNumber].question);
	//console.log(questions[questionNumber][0]);
	question_number('questionCount', questionNumber, questions.length);

	fillAnswers(answerDiv, questions, questionNumber);
}

function fillAnswers(answerDiv, questions, questionNumber){ 
	var answer = null;
	for(var i = 0; i < questions[questionNumber].answers.length; i++){
		answer = answer + '<div class="w-full mb-4 bg-gray-500 answer" selected="not_selected">'+
	    				'<p id="u2499-2">' + questions[questionNumber].answers[i].aText + '</p>' +
						'</div>';
		console.log(questions[questionNumber].answers[i]); 
	}
	document.getElementById(answerDiv).innerHTML = answer;
	var aButtons = document.getElementsByClassName("answer"); 

   	for (var j = 0; j < aButtons.length; j++) {
			aButtons[j].onclick =  setColor;
	}
	   

	/*$(".answer").each(function() { 
		$(this).click(function() {
			console.log($(this)); 
			if($(this).attr('selected') === 'not_selected'){
				console.log("aender not selected"); 
				$(this).attr('selected', 'selected'); 
			} else if ($(this).attr('selected') === 'selected')  {
				$(this).attr('selected', 'not_selected'); 
				console.log("aender  selected");
			}
		})
	}) */

	var button_test = document.getElementById('btn_weiter'); 
	var btn_Abgeben = document.getElementById('nextButtonText'); 
	console.log(button_test)
	button_test.onclick = function () {
		//alert(button_test.innerHTML); 
		if (btn_Abgeben.innerHTML == "Abgeben") {
			console.log("Abgeben clicked"); 

		for (var i = 0; i < aButtons.length; i++) {
			if (aButtons[i].getAttribute("selected") == 'selected' && questions[questionNumber].answers[i].trueOrFalse == true || aButtons[i].getAttribute("selected") == 'not_selected' && questions[questionNumber].answers[i].trueOrFalse == false) {
				aButtons[i].setAttribute("selected", "correctly_selected");
				console.log(i + aButtons[i].getAttribute("selected"));  
			}
			else if (aButtons[i].getAttribute("selected") == 'selected' && questions[questionNumber].answers[i].trueOrFalse == false || aButtons[i].getAttribute("selected") == 'not_selected' && questions[questionNumber].answers[i].trueOrFalse == true) {
				aButtons[i].setAttribute("selected", "wrongly_selected");
				console.log(i + aButtons[i].getAttribute("selected")); 
			}
		}
			btn_Abgeben.innerHTML = "Weiter"; 
		} else if (btn_Abgeben.innerHTML == 'Weiter'){
			questionNumber++;
			if(questionNumber == questions.length){
				window.location.href = './index.html';
			}else{
				question_number('questionCount', questionNumber, questions.length);
				loadNextQuestion(questions, questionNumber);
			}
		}
	} 
	/*button_test.addEventListener("click", function() {
	console.log('buttonAbgabeClick');

	var button = document.getElementById('btn_weiter'); 
	var i = 0; 

		$(".answer").each(function() {
			console.log("answer " + i ); 
			if($(this).attr('selected') === 'not_selected') {
				console.log(questions[questionNumber].answers[i].trueOrFalse); 
			} else if ($(this).attr('selected') === 'selected') {
					$(this).attr('selected', 'wrongly_selected');
					console.log("case1");
					console.log(questions[questionNumber].answers[i].trueOrFalse);  

			}
			i++; 
		})
	}); */

}

function setColor() {
	alert("Onclick"); 

		if (this.getAttribute("selected") === "not_selected") {
				this.setAttribute("selected", "selected"); 
		} else if (this.getAttribute("selected") === "selected") {
				this.setAttribute("selected", "not_selected"); 
		}

}

/*function buttonAbgabeClick() {
	var aButtons = document.getElementsByClassName("answer"); 

	for (var i = 0; i < aButtons.length; i++) {
		if (aButtons[i].getAttribute("selected") == 'selected' && questions[questionNumber])
	}
}*/

/*function buttonAbgabeClick(questions, questionNumber) {
	console.log('buttonAbgabeClick');
	var button = document.getElementById('btn_weiter'); 
	var i = 0; 

	if (button.innerHTML ==='Abgeben') {
		$(".answer").each(function() {
			if($(this).attr('selected') === 'false' && questions[questionNumber].answers[i].trueOrFalse === false) {
				$(this).atrr('selected', 'correctly_selected');
			} else if ($(this).attr('selected') === 'true' && questions[questionNumber].answers[i].trueOrFalse === false) {
					$(this).atrr('selected', 'wrongly_selected');
			}
		})
	}
} */

/*function fillAnswers(answerDiv, questions, questionNumber, saveArray){
	var answer = null;
	for(var i = 0; i < questions[questionNumber][1].length; i++){
		answer = answer + '<div class="w-full mb-4 bg-gray-500 answer">'+
	    				'<p id="u2499-2">' + questions[questionNumber][1][i][1] + '</p>' +
	    				'</div>';
	}
	//get Answers as object
	document.getElementById(answerDiv).innerHTML = answer;
   	var aButtons = document.getElementsByClassName("answer");

   	for (var i = 0; i < aButtons.length; i++) {

   		//get next button as object
		var nextButton = document.getElementById('btn_weiter');

   		//add answers to array
   		//define onclick function
   		questions[questionNumber][1][i][3] = aButtons[i];
   		questions[questionNumber][1][i][3].style.cursor = 'pointer';
		questions[questionNumber][1][i][3].onclick = function() {
			console.log("Option clicked"); 
			for (var i = 0; i < questions[questionNumber][1].length; i++) {
				if(this == questions[questionNumber][1][i][3]){
					if(questions[questionNumber][1][i][4] == false){
						console.log("Not marked"); 
						questions[questionNumber][1][i][4] = true;
					}else{
						console.log("Marked"); 
						questions[questionNumber][1][i][4] = false;
					}
					//only transform answers if user should select them
					if(nextButtonText.innerHTML == 'Abgeben'){
						transformButtonsSelected(questions, questionNumber);
					}
				}
			}
		}
   	}
   	transformButtonsSelected(questions, questionNumber);
   	buttonAbgabeClick(questionNumber, questions);
} */

function transformButtonsSelected(questions, questionNumber){
	//transform buttons if selected or not
	for (var i = 0; i < questions[questionNumber][1].length; i++) {
		if (questions[questionNumber][1][i][4] == true){
			console.log("marked"); 
			questions[questionNumber][1][i][3].style.background = "#fff";
		}else if(questions[questionNumber][1][i][4] == false){
			questions[questionNumber][1][i][3].style.background = "#A2A2A2";
			console.log("marked");
		}
	}
} 

function replace_question_text(qString){
	//replace the text of the question
	var test = document.getElementById('p_question'); 
	console.log(qString); 
	if ( test !== null) {
		test.innerHTML = qString; 
	} else {
		console.log("question is null"); 
	}
}

function question_number(questionId, questionNumber, maxQuestion){
	//var question = document.getElementById(questionId);
	questionNumber++;
	//question.innerHTML = 'Frage ' + questionNumber + '/' + maxQuestion;
}

/*function buttonAbgabeClick(questionNumber, questions){
	//define button next
	var nextButton = document.getElementById('btn_weiter');
	var nextButtontext = document.getElementById('nextButtonText');
	nextButtonText.innerHTML = 'Abgeben';
	nextButton.style.cursor = 'pointer';
	nextButton.onclick = function() {
		if(nextButtonText.innerHTML == 'Abgeben'){
			//check if user answer is right
			for(var i = 0; i<questions[questionNumber][1].length; i++){
				if(questions[questionNumber][1][i][2] && questions[questionNumber][1][i][4]){
					//user selected answer & answer is true
					tranformAnswers(questions, questionNumber, i, true);
					//saveArrayTemp[questions[questionNumber][2]] = 2;
				}else if(questions[questionNumber][1][i][2] && !questions[questionNumber][1][i][4]){
					//user didnt selected answer & answer is true
					tranformAnswers(questions, questionNumber, i, true);
					//saveArrayTemp[questions[questionNumber][2]] = 1;
				}else if(!questions[questionNumber][1][i][2] && questions[questionNumber][1][i][4]){
					//user selected answer & answer is false
					tranformAnswers(questions, questionNumber, i, false);
					//saveArrayTemp[questions[questionNumber][2]] = 1;
				}
			}
			nextButtonText.innerHTML = 'Weiter';
			//localStorage.setItem("saveArrayQuiz", JSON.stringify(saveArrayTemp));
		}else if(nextButtonText.innerHTML == 'Weiter'){
			questionNumber++;
			if(questionNumber == questions.length){
    			window.location.href = './index.html';
			}else{
				question_number('questionCount', questionNumber, questions.length);
	    		loadNextQuestion(questions, questionNumber);
    		}
		}
	}
}*/

function tranformAnswers(questions, questionNumber, answerID, rf){
	//mark right answers green and wrong red
		if (rf){
			questions[questionNumber][1][answerID][3].style.background = "green";
		}else if(!rf){
			questions[questionNumber][1][answerID][3].style.background = "red";
		}	
}

function loadNextQuestion(questions, questionNumber){
	console.log("Fraaaaaaagen" + questions[questionNumber].question); 
	replace_question_text(questions[questionNumber].question);
	fillAnswers('div_answer', questions, questionNumber);
}