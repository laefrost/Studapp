function createUserPie() {
    var saveArray = localStorage.getItem("saveArrayPruefung");
    console.log(JSON.parse(saveArray))
    
    new Chart(document.getElementById("chart_Student"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
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
          backgroundColor: ["#3e95cd", "#8e5ea2"],
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
    var json = [0,0]; 

    const result = await $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/stats',
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

function updateSeverData() {
    var saveArray = localStorage.getItem("statArray");
    var arr = JSON.parse(saveArray); 
    console.log(arr.length)

    for (var i = 0; i < arr.length; i++) {
        console.log((arr[i]).aCorr);
        var id = (arr[i])._id; 
        var data = {
            'aCorr':arr[i].aCorr,
            'aFalse':arr[i].aFalse
        }
        console.log(data); 

        $.ajax({
            type: 'PATCH',
            url: 'https://projektseminarlfrb.herokuapp.com/stats' +'/' + id,
            dataType: 'json',
            data : JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                console.log("test" + JSON.stringify(result)); 
            return data; 
            },
            error: function (result){ 
                console.log("error" + result); 
                return null; 
            }
    })
}
}

   /* $.ajax({
        type: 'PATCH',
        url: 'https://projektseminarlfrb.herokuapp.com/stats',
        dataType: 'json',
        success: function (data) {
            console.log(data); 
        return data; 
        },
        error: function (result){ 
            console.log("error" + error); 
            return null; 
        }
    }); */