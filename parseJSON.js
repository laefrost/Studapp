var prueQuestions = new Array(); 

function loadJSON(callback) {   

    /*var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'dummy_JSON_Quiz.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            console.log('JSON geladen');
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  */
	
	console.log(sessionStorage.getItem("quiz-lernen-selected")); 
 }


 /*async function generateExamQuestions(jsonFile, maxQuestions, callback) {
	var questions = new Array();
	var json; 
	
	  check: for (var i = 0; i < maxQuestions; i++) {
		  //choose rnd Category
		var rndCat = Math.floor(Math.random() * jsonFile.length);
		console.log(jsonFile[rndCat].sub_categories.length);
		//choose rnd subCat
		var subCatLength = jsonFile[rndCat].sub_categories.length;
		var rndSubCat = Math.floor(Math.random() * subCatLength);
		var cValue = jsonFile[rndCat].category_name; 
		var sValue = jsonFile[rndCat].sub_categories[rndSubCat].subcategory_name; 
		
		json = await doAjax(cValue, sValue,i); 
		
		if(json.length === 0) {
			i--; 
			continue check; 
		} else {
		
		var questLength = json.length;
			var rndQuest =  Math.floor(Math.random() * questLength);
			console.log(json); 
			console.log(rndQuest);

 }*/
async function parseTestQuestions(jsonFile, maxQuestions, callback){

var questions = []; 
var json; 

console.log("JsonFile : " + jsonFile); 

  check: for (var i = 0; i < maxQuestions; i++) {
  	//choose rnd Category
    var rndCat = Math.floor(Math.random() * jsonFile.length);
    //console.log(jsonFile[rndCat].sub_categories.length);
    //choose rnd subCat
    var subCatLength = jsonFile[rndCat].sub_categories.length;
    var rndSubCat = Math.floor(Math.random() * subCatLength);
	var cValue = jsonFile[rndCat].category_name; 
	var sValue = jsonFile[rndCat].sub_categories[rndSubCat].subcategory_name; 
	questions[i] = new Array(); 
	
	json = await doAjax(cValue, sValue,i); 
	
	if(json.length === 0) {
		i--; 
		continue check; 
	} else {
	
	var questLength = json.length;
		var rndQuest =  Math.floor(Math.random() * questLength);
		//console.log(json); 
		//console.log(rndQuest);
		/*var question = json[rndQuest]; 

		questions.push({
			q:question,
			category_name:cValue, 
			subcategory_name:sValue
		})*/

		var countAnswers = json[rndQuest].answers.length;
		questions[i][0] = json[rndQuest].question;
		questions[i][1] = new Array(); 
		questions[i][2] = json[rndQuest].category_name;
		questions[i][3] = json[rndQuest].subcategory_name;  

		for (var j = 0; j < countAnswers; j++){	
			questions[i][1][j] = new Array();
			questions[i][1][j][0] = j;
			questions[i][1][j][1] = json[rndQuest].answers[j].aText;
			var questToF = json[rndQuest].answers[j].trueOrFalse;
			if(questToF){
				questions[i][1][j][2] = true;
			} else{
				questions[i][1][j][2] = false;
			}
				questions[i][1][j][4] = false;
		}
		
    
		/*questions[i] = new Array();
		questions[i][0] = json[rndQuest].question;
		questions[i][1] = new Array();

		var countAnswers = json[rndQuest].answers.length;

		for (var j = 0; j < countAnswers; j++){	
			questions[i][1][j] = new Array();
			questions[i][1][j][0] = j;
			questions[i][1][j][1] = json[rndQuest].answers[j].aText;
			var questToF = json[rndQuest].answers[j].trueOrFalse;
			if(questToF){
				questions[i][1][j][2] = true;
			} else{
				questions[i][1][j][2] = false;
			}
				questions[i][1][j][4] = false;
		}*/
	}
}
console.log(questions);
callback(questions);
}

function fillQuestions(aQuestions, i) {
	if (aQuestions.length == 0) {
		console.log("aQue is null"); 
		alert("Fragen ist null"); 
	} else {
	console.log("fillQuestions"); 
	console.log(aQuestions);
		
		var questLength = aQuestions.length;
		console.log(questLength);
		var rndQuest =  Math.floor(Math.random() * questLength);
		console.log(rndQuest);
		console.log(aQuestions); 
    
		prueQuestions[i] = new Array();
		//question text 
		prueQuestions[i][0] = aQuestions[rndQuest].question;
		//array to save answers
		prueQuestions[i][1] = new Array();

		var countAnswers = aQuestions[rndQuest].answers.length;

		for (var j = 0; j < countAnswers; j++){	
			prueQuestions[i][1][j] = new Array();
			prueQuestions[i][1][j][0] = j;
			//saves answers
			prueQuestions[i][1][j][1] = aQuestions[rndQuest].answers[j].aText;
			var questToF = aQuestions[rndQuest].answers[j].trueOrFalse;
			//checks wether answer is wrong or false
			if(questToF){
				prueQuestions[i][1][j][2] = true;
			} else{
				prueQuestions[i][1][j][2] = false;
			}
				prueQuestions[i][1][j][4] = false;
		}
	}
}
	


async function doAjax(cValue, sValue, i) {
		const result = await $.ajax({
            type: 'GET',
			url: 'https://projektseminarlfrb.herokuapp.com/questions',
			data: { 
			"category_name": cValue, 
			"subcategory_name": sValue
			},
			dataType: 'json',
			/*beforeSend: function(){
			$('#img_load').show();
			},
			complete: function(){
			$('#img_load').hide();
			},*/
			success: function (data) {
				//console.log("ajax done"); 
				//console.log(data); 
				/*if (data !== null || data !== undefined || data.length == 0) {
					fillQuestions(data, i); 
				} else {
					doAjax(cValue, sValue, i); 
				}*/
			//return data;
			},
			error: function (result){ 
				return null; 
			}
        });
		return result; 
} 

/*async function createQuestions(cValue, sValue, callback) {

	try {
		const aQuestions = await doAjax(cValue, sValue)
		console.log(res)
		
		var questLength = aQuestions.length;
		var rndQuest =  Math.floor(Math.random() * questLength);
		console.log(aQuestions); 
		console.log(rndQuest);
    
		questions[i] = new Array();
		questions[i][0] = aQuestions[rndQuest].question;
		questions[i][1] = new Array();

		var countAnswers = aQuestions[rndQuest].answers.length;

		for (var j = 0; j < countAnswers; j++){	
			questions[i][1][j] = new Array();
			questions[i][1][j][0] = j;
			questions[i][1][j][1] = aQuestions[rndQuest].answers[j].aText;
			var questToF = aQuestions[rndQuest].answers[j].trueOrFalse;
			if(questToF){
				questions[i][1][j][2] = true;
			} else{
				questions[i][1][j][2] = false;
			}
				questions[i][1][j][4] = false;
		}
		console.log(questions);
		callback(questions);
		
	} catch(err) {
		console.log(err);
	}	 
} */

function parseLearningQuestions(jsonFile, callback){

  var questions = new Array();
  var questionNumber = 0;
  console.log(jsonFile);
  //get all questions from specific categories
  //var selectedItems = JSON.parse(sessionStorage.getItem("quiz-lernen-selected"));
  for (var i = 0; i < jsonFile.length; i++) {
	  //console.log(jsonFile[questionNumber]); 
	  questions[questionNumber] = new Array(); 
		questions[questionNumber][0] = jsonFile[questionNumber].question; 
		questions[questionNumber][1] = new Array();
		questions[questionNumber][2] = jsonFile[questionNumber]._id; 
	  for (var j = 0; j < jsonFile[i].answers.length; j++) {
			questions[questionNumber][1][j] = new Array();
            questions[questionNumber][1][j][0] = j;
            questions[questionNumber][1][j][1] = jsonFile[i].answers[j].aText;
			
			var questToF = jsonFile[i].answers[j].trueOrFalse;
                if(questToF){
                  questions[questionNumber][1][j][2] = true;
                } else{
                  questions[questionNumber][1][j][2] = false;
                }
				//selected Or not
                questions[questionNumber][1][j][4] = false;
		  
	  }
	  questionNumber++;
  }
  console.log(questions);
  callback(questions);  
}
  /*if(selectedItems !== null){
    for(var i = 0; i < jsonFile.length; i++){
      for(var main = 0; main < jsonFile['categories'].length; main++){
        for (var sub = 0; sub < jsonFile['categories'][main]['sub_categories'].length; sub++) {
          if(jsonFile['categories'][main]['sub_categories'][sub]['sub_category_name'] == selectedItems[i]){
            for(var q = 0; q < jsonFile['categories'][main]['sub_categories'][sub]['questions'].length; q++){

              questions[questionNumber] = new Array();
              questions[questionNumber][0] = jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['q'];
              questions[questionNumber][1] = new Array();
              questions[questionNumber][2] = jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['id'];
              
			  var countAnswers = jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['answers'].length;

              for (var j = 0; j < countAnswers; j++){
                questions[questionNumber][1][j] = new Array();
                questions[questionNumber][1][j][0] = j;
                questions[questionNumber][1][j][1] = jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['answers'][j]['aText'];
                var questToF = jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['answers'][j]['trueOrFalse'];
                if(questToF){
                  questions[questionNumber][1][j][2] = true;
                } else{
                  questions[questionNumber][1][j][2] = false;
                }
                questions[questionNumber][1][j][4] = false;
              }

              questionNumber++;
            } 
          }
        }
      }
    }
  }

  //shuffle array
  var tmp, rand;
  for(var i =0; i < questions.length; i++){
    rand = Math.floor(Math.random() * questions.length);
    tmp = questions[i]; 
    questions[i] = questions[rand]; 
    questions[rand] =tmp;
  } */


function generateSaveArray(jsonFile, callback){
  //generate the array to safe the answers if it does not exist
  var saveArray = new Array();
  for(var main = 0; main<jsonFile.length; main++){
    saveArray[jsonFile[main]['category_id']] = jsonFile['categories'][main]['category_name'];
    for(var sub = 0; sub < jsonFile['categories'][main]['sub_categories'].length; sub++){
      saveArray[jsonFile['categories'][main]['sub_categories'][sub]['sub_category_id']] = jsonFile['categories'][main]['sub_categories'][sub]['sub_category_name'];
      for(var q = 0; q < jsonFile['categories'][main]['sub_categories'][sub]['questions'].length; q++){
        saveArray[jsonFile['categories'][main]['sub_categories'][sub]['questions'][q]['id']] = 0;
      }
    }
  }
  callback(saveArray);
}





