

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
	question.innerHTML = 'Frage ' + currentQuestion + '/' + maxQuestion;
} 

function buttonClick(questionId, currentQuestion, maxQuestion, questions){
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
}

function checkButton(nextButtonText, backButton, currentQuestion, maxQuestion){
	//Button Text
	if(currentQuestion == 1){
		backButton.style.display = 'none';
	}else{
		backButton.style.display = 'block';
	}
	if(currentQuestion == maxQuestion){
		nextButtonText.innerHTML = 'Fertig';
	}else{
		nextButtonText.innerHTML = 'Weiter';
	}

	if(currentQuestion > maxQuestion){
		return true;
	}
	return false;
}

function fillAnswers(divID, countAnswers, questions, questionNumber){

	var answer;
	replace_question_text(questions[questionNumber][0]);
	//fill answers divs with html code
	for(var i = 0; i < countAnswers; i++){
		answer = answer + '<div class="w-full mb-4 bg-gray-500 answer">'+
    				'<p id="u2009-2">' + questions[questionNumber][1][i][1] + '</p>' +
    				'</div>';
	}

	//get answers as objects
   	document.getElementById(divID).innerHTML = answer;
   	var aButtons = document.getElementsByClassName("answer");

   	for (var i = 0; i < aButtons.length; i++) {

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

   	transformButtonsSelected(questions, questionNumber);
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

function loadNextQuestion(questions, questionNumber){
	fillAnswers('div_answer', questions[questionNumber-1][1].length, questions, questionNumber-1);
}
