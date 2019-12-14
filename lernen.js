function getAllMenuItems(menuItemName, catItemName, buttonClassR){
  var menuItems = elements = document.getElementsByClassName(menuItemName);
  var catItem = document.getElementsByClassName(catItemName);  

  var menuItemsArray = new Array();

  for (var i = 0; i < menuItems.length; i++) {
    menuItemsArray[i] = new Array();
    menuItemsArray[i][0] = menuItems[i];
    menuItemsArray[i][1] = menuItems[i].innerHTML;
    //is selected or not
    menuItemsArray[i][2] = false;
	menuItemsArray[i][3] = menuItems[i].getAttribute("cat"); 
	//console.log(menuItemsArray[i][3]);
    menuItemsArray[i][0].style.cursor = 'pointer';
    menuItems[i].onclick = function() {
    	for (var i = 0; i < menuItemsArray.length; i++) {
    		if(this == menuItemsArray[i][0]){
		    	if(!menuItemsArray[i][2]){
		    		menuItemsArray[i][2] = true;
		    	}else{
		    		menuItemsArray[i][2] = false;
		    	}
		    	transformItems(menuItemsArray[i]);
		    }
    	}
    }
  }

  //register BUtton Start Regulär
  var buttonStartR = document.getElementsByClassName(buttonClassR);
  	for(var i = 0; i < buttonStartR.length; i++){
	  buttonStartR[i].onclick = function(){
	  	var selectedArray = new Array();
		var category; 
		var index = 0; 
		var counter = 0; 
	  	for (var i = 0; i < menuItemsArray.length; i++) {
	  		if(menuItemsArray[i][2]){
				index = i; 
				counter ++;
	  			selectedArray[i] = menuItemsArray[i][1];
				category = menuItemsArray[i][3]; 
				//alert(category); 
	  		}
	  	}
		//nicht sicher ob noetig
		if (counter > 1) {
			alert("Bitte wählen Sie nur eine Kategorie aus.");
		}
	  	else if(selectedArray.length > 0){
		  	sessionStorage.setItem("scat", selectedArray[index]);
			sessionStorage.setItem("cat", category); 
			//alert(sessionStorage.getItem("scat") + sessionStorage.getItem("cat")); 
		  	window.location.href = 'lernen_quiz.html';
		}else{
			alert("Bitte wählen Sie mindestens eine Kategorie aus.");
		}
	  }
	}



}

function transformItems(menuItemSelected){
		if(menuItemSelected[2]){
			menuItemSelected[0].style.backgroundColor = "rgb(200, 200, 200)";
		}else{
			menuItemSelected[0].style.backgroundColor = "transparent";
		}
}

