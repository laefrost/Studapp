function createUserPie() {
    console.log("createUserPie")
    var saveArray = generateData();
    if (saveArray == null || (saveArray[0] == 0 && saveArray[1] == 0)) {
      document.getElementById("pUserData").style.display = "block";
    } else {
      new Chart(document.getElementById("chart_Student"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#90CDF4", "#800000"],
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
  }
  
  function generateData() {
    console.log("generateData")
    var saveArray = JSON.parse(localStorage.getItem("statArray"));
    if (saveArray == undefined || saveArray == null || (saveArray != undefined && saveArray.length == 0) || (saveArray[0] == 0 && saveArray[1] == 0)) {
      console.log("saveArray stimmt nicht/ nicht vorhanden, saveArray: " + saveArray)
      return null;
    } else {
      var arr = saveArray;
      var result = [0, 0];
  
      for (var i = 0; i < arr.length; i++) {
        result[0] = result[0] + arr[i][3];
        result[1] = result[1] + arr[i][4];
      }
      return result;
    }
  }
  
  async function loadAvPie() {
    console.log("loadAvPie")
    var json = [0, 0];
    const result = await $.ajax({
      type: 'GET',
      url: 'https://projektseminarlfrb.herokuapp.com/stats',
      dataType: 'json',
      success: function (data) {
        return data;
      },
      error: function (result) {
        return null;
      }
    });
  
    for (var i = 0; i < result.length; i++) {
      json[0] = json[0] + result[i].aCorr;
      json[1] = json[1] + result[i].aFalse;
    }
    return json;
  }
  
  
  async function createAvPie() {
    console.log("createAvPie")
    var avData = await loadAvPie();
    if (avData == null || avData == undefined | (avData[0] == 0 && avData[1] == 0)) {
      console.log("avPie kann nicht dargestellt werden " + avData);
      document.getElementById("pAvData").style.display = "block";
    } else {
      new Chart(document.getElementById("chart_Av"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#90CDF4", "#800000"],
            data: avData
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Durchschnittsperformance'
          }
        }
      });
    }
  }
  
  