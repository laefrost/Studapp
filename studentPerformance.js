function createUserPie() {
    var saveArray = localStorage.getItem("saveArrayPruefung");
    console.log(JSON.parse(saveArray))
    
    var chart = new Chartist.Pie('#chart_Student', {
        labels: ['right', 'wrong'],
        series: JSON.parse(saveArray)
      }, {
        donut: true,
        donutWidth: 42,
        showLabel: true
      });
        

}

async function createAvPie() {
    var avData = await loadAvPie(); 
    console.log(avData); 
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