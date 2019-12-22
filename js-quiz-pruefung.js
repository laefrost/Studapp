

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
		checkAnswers(questions[questionNumber], "answer"); 
		questionNumber++;
		var finish = checkButton(btnForth, btnBack, questionNumber, maxQuestion); 
    	if(finish){
    		window.location.href = '/studentPerformance.html';
    	} else{
    		loadNextQuestion(questions, questionNumber, maxQuestion);
    	}
	}

	btnBack.onclick = function() { 
		questionNumber--;
    	checkButton(btnForth, btnBack, questionNumber, maxQuestion)
    	loadNextQuestion(questions, questionNumber, maxQuestion);
	}
}

function checkAnswers(question, htmlEl, category_name, subcategory_name) {
	var aButtons = document.getElementsByClassName(htmlEl); 
	var statArray = localStorage.getItem("statArray"); 
	var ansArray = localStorage.getItem("saveArrayPruefung"); 
	var stats = JSON.parse(statArray); 
	var ans = JSON.parse(ansArray); 
	console.log("answers " + ans); 

	index = stats.findIndex(x => x.category_name ===question.category_name && x.subcategory_name === question.subcategory_name)
	//console.log(index); 
	if (index != -1) {
	for (var i = 0; i < aButtons.length; i++) {
		if (aButtons[i].getAttribute("selected") == 'selected' && question.answers[i].trueOrFalse == true || aButtons[i].getAttribute("selected") == 'not_selected' && question.answers[i].trueOrFalse == false) {
			//aButtons[i].setAttribute("selected", "correctly_selected");
			//console.log(stats[index]); 
			var temp = stats[index].aCorr; 
			//console.log("value aCorr before " + temp); 
			stats[index].aCorr = Number(temp) + Number(1); 
			//console.log("value aCorr after " + stats[index].aCorr); 
			ans[0] = ans[0]+1; 
		
		} else if (aButtons[i].getAttribute("selected") == 'selected' && question.answers[i].trueOrFalse == false || aButtons[i].getAttribute("selected") == 'not_selected' && question.answers[i].trueOrFalse == true) {
			//aButtons[i].setAttribute("selected", "wrongly_selected"); 
			var temp = stats[index].aFalse; 
			//console.log("value aFalse before " + temp); 
			stats[index].aFalse = Number(temp) + Number(1); 
			//console.log("value aFalse after " + stats[index].aFalse); 
			ans[1] = ans[1] +1; 
		}
	}
	localStorage.setItem("statArray", JSON.stringify(stats)); 
	localStorage.setItem("saveArrayPruefung", JSON.stringify(ans)); 
} else {
	for (var i = 0; i < aButtons.length; i++) {
		if (aButtons[i].getAttribute("selected") == 'selected' && question.answers[i].trueOrFalse == true || aButtons[i].getAttribute("selected") == 'not_selected' && question.answers[i].trueOrFalse == false) {
			ans[0] = ans[0]+1; 
		
		} else if (aButtons[i].getAttribute("selected") == 'selected' && question.answers[i].trueOrFalse == false || aButtons[i].getAttribute("selected") == 'not_selected' && question.answers[i].trueOrFalse == true) {
			ans[1] = ans[1] +1; 
		}
	}
	localStorage.setItem("saveArrayPruefung", JSON.stringify(ans)); 
}

}

function setColor() {
	if (this.getAttribute("selected") === "not_selected") {
		this.setAttribute("selected", "selected"); 
	} else if (this.getAttribute("selected") === "selected") {
		this.setAttribute("selected", "not_selected"); 
	}
}

function loadNextQuestion(questions, questionNumber, maxQuestion){
	fillAnswers('div_answer', questions, questionNumber, maxQuestion);
}

async function createStatArray() {
	var statArray = await getStat();  
	localStorage.setItem("statArray", JSON.stringify(statArray)); 
}

async function getStat() {
	const result = await $.ajax({
		type: 'GET',
		url: 'https://projektseminarlfrb.herokuapp.com/stats',
		dataType: 'json',
		success: function (data) {
			console.log(JSON.stringify(data)); 
			return data; 
		},
		error: function (result){ 
			return null; 
		}
	});
	return result; 
}

function createArrayPruefung() {
	var arr = [0,0]; 
	localStorage.setItem("saveArrayPruefung", JSON.stringify(arr)); 
}