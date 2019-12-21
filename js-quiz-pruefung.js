

function replace_question_text(string){
	document.getElementById('p_question').innerHTML = string;
}


function start_countdown(clockid ,time_in_minutes){
	//start the countdown
	var current_time = Date.parse(new Date());
	var deadline = new Date(current_time + time_in_minutes*60*1000);
	run_clock(clockid ,deadline);
}

function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = t.minutes+':'+t.seconds;
		if(t.total<=0){ 
			localStorage.setItem("Quiz", JSON.stringify(questions));
    		window.location.href = '/ergebnis.php';
		}
	}
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
} 

function question_number(questionId, currentQuestion, maxQuestion){
	var question = document.getElementById(questionId);
	var nmb = currentQuestion + 1; 
	question.innerHTML = 'Frage ' + nmb + '/' + maxQuestion;
} 

/*function buttonClick(questionId, currentQuestion, maxQuestion, questions){
	//define next button
	question_number(questionId, currentQuestion, maxQuestion)
	var nextButton = document.getElementById('btn_prue');
	var nextButtontext = document.getElementById('nextButtonText');
	nextButton.style.cursor = 'pointer';
	nextButton.onclick = function() {
    	currentQuestion++;
    	var finish = checkButton(nextButtonText, backButton, currentQuestion, maxQuestion)
    	if(finish){
    		localStorage.setItem("Quiz", JSON.stringify(questions));
    		window.location.href = '/ergebnis.php';
    	}else{
    		question_number('div_questionCount', currentQuestion, maxQuestion);
    		loadNextQuestion(questions, currentQuestion);
    	}

	};
	//define back button
	var backButton = document.getElementById('btn_back');
	backButton.style.cursor = 'pointer';
	backButton.onclick = function() {
    	currentQuestion--;
    	question_number('questionCount', currentQuestion, maxQuestion);
    	checkButton(nextButtonText, backButton, currentQuestion, maxQuestion)
    	loadNextQuestion(questions, currentQuestion);
	};
	checkButton(nextButtonText, backButton, currentQuestion, maxQuestion);
} */

function checkButton(nextButtonText, backButton, currentQuestion, maxQuestion){
	//Button Text
	if(currentQuestion == 0){
		backButton.style.display = 'none';
	}else{
		backButton.style.display = 'block';
	}
	if(currentQuestion == (maxQuestion-1)){
		nextButtonText.innerHTML = 'Fertig';
	}else{
		nextButtonText.innerHTML = 'Weiter';
	}

	if(currentQuestion > (maxQuestion-1)){
		return true;
	}
	return false;
}

function fillAnswers(divID, questions, questionNumber, maxQuestion){
	console.log("fillAnswers"); 
	question_number('div_questionCount', questionNumber, maxQuestion);
	console.log("questionNumber : " + questionNumber); 
	//console.log("currentQuestion " + currentQuestion); 
	var answer;
	replace_question_text(questions[questionNumber].question);
	//fill answers divs with html code
	for(var i = 0; i < questions[questionNumber].answers.length; i++){
		//console.log(countAnswers); 
		answer = answer + '<div class="w-full mb-4 bg-gray-500 answer" selected="not_selected">'+
    				'<p id="u2009-2">' + questions[questionNumber].answers[i].aText + '</p>' +
    				'</div>';
	}

	//get answers as objects
   	document.getElementById(divID).innerHTML = answer;
	var aButtons = document.getElementsByClassName("answer");
	   
   	for (var j = 0; j < aButtons.length; j++) {
	aButtons[j].onclick =  setColor;
	}

	var btnBack = document.getElementById("btn_back"); 
	var btnForth = document.getElementById("btn_prue"); 

	btnForth.onclick = function() {
		questionNumber++;
		var finish = checkButton(btnForth, btnBack, questionNumber, maxQuestion); 
    	if(finish){
    		//localStorage.setItem("Quiz", JSON.stringify(questions));
    		window.location.href = '/ergebnis.php';
    	}else{
    		loadNextQuestion(questions, questionNumber, maxQuestion);
    	}
	}

	btnBack.onclick = function() {
		alert("btnBack clicked"); 
		questionNumber--;
    	//question_number('questionCount', questionNumber, maxQuestion);
    	checkButton(btnForth, btnBack, questionNumber, maxQuestion)
    	loadNextQuestion(questions, questionNumber, maxQuestion);
	}

	



/*   	for (var i = 0; i < aButtons.length; i++) {

   		questions[questionNumber][1][i][3] = aButtons[i];
   		questions[questionNumber][1][i][3].style.cursor = 'pointer';
		questions[questionNumber][1][i][3].onclick = function() {
			for (var i = 0; i < questions[questionNumber][1].length; i++) {
				if(this == questions[questionNumber][1][i][3]){
					if(questions[questionNumber][1][i][4] == false){
						questions[questionNumber][1][i][4] = true;
					}else{
						questions[questionNumber][1][i][4] = false;
					}
					transformButtonsSelected(questions, questionNumber);
				}
			}
		}
   	}

   	transformButtonsSelected(questions, questionNumber); */
}

function setColor() {
	alert("Onclick"); 

		if (this.getAttribute("selected") === "not_selected") {
				this.setAttribute("selected", "selected"); 
		} else if (this.getAttribute("selected") === "selected") {
				this.setAttribute("selected", "not_selected"); 
		}
}

function transformButtonsSelected(questions, questionNumber){
	//transform selected buttons
	for (var i = 0; i < questions[questionNumber][1].length; i++) {
		if (questions[questionNumber][1][i][4] == true){
			questions[questionNumber][1][i][3].style.background = "#fff";
		}else if(questions[questionNumber][1][i][4] == false){
			questions[questionNumber][1][i][3].style.background = "#A2A2A2";
		}
	}
}

function loadNextQuestion(questions, questionNumber, maxQuestion){
	fillAnswers('div_answer', questions, questionNumber, maxQuestion);
}
