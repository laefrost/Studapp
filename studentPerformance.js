function createUserPie() {
    var saveArray = generateData(); 

    
    new Chart(document.getElementById("chart_Student"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#56b988", "#800000"],
            data: saveArray
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

function generateData() {
  var saveArray = localStorage.getItem("statArray");
  var arr = JSON.parse(saveArray);
  console.log(arr);  
  var result = [0,0]; 

  for (var i =0; i < arr.length; i++) {
    result[0] = result[0] + arr[i][3]; 
    result[1] = result[1] + arr[i][4]; 
  }
  console.log(result); 
  return result; 
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
        responsive:true,
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

async function loadData() {
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
  console.log(result); 

  var saveArray = localStorage.getItem("statArray");
  var arr = JSON.parse(saveArray);
  console.log(arr);  

  for (var i=0; i < arr.length; i++) {
    index = result.findIndex(x => x.category_name ===arr[i][1] && x.subcategory_name === arr[i][2])
    console.log(index); 
    if (index != -1) {
      result[index].aCorr = result[index].aCorr + arr[i][3]; 
      result[index].aFalse = result[index].aFalse + arr[i][4];
    }
  }
  console.log(result); 
  updateSeverData(result); 
}




function updateSeverData(arr) {
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