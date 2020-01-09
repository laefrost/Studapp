function createUserPie() {
    var saveArray = localStorage.getItem("saveArrayLernen");
    console.log(JSON.parse(saveArray)); 
        
    var chartArea= document.getElementById("chart_Student"); 

    new Chart(document.getElementById("chart_Student"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#56b988", "#800000"],
            data: JSON.parse(saveArray)
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Deine Performance'
          }
        }
    });
}

async function createAvPie() {
    var avData = await loadAvPie(); 
      new Chart(document.getElementById("chart_Av"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#56b988", "#800000"],
            data: avData
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Durchschnittsperformance'
          }
        }
    });

}

async function loadAvPie() {
    var cValue = sessionStorage.getItem("cat"); 
    var sValue = sessionStorage.getItem("scat"); 

    var json = [0,0]; 

    console.log(cValue+sValue); 

    const result = await $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/stats',
        data: { 
        "category_name": cValue, 
        "subcategory_name": sValue
        },
        dataType: 'json',
        success: function (data) {
            console.log(data); 
        return data; 
        },
        error: function (result){ 
            console.log("error" + error); 
            return null; 
        }
    });
    
    for (var i = 0; i < result.length; i++){
        json[0] = json[0] + result[i].aCorr; 
        json[1] = json[1] + result[i].aFalse; 
    }
    //var json = [result.aCorr, result.aFalse]; 
    console.log(json);
    return json; 

}