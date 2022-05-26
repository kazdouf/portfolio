$("#valider").on("click", () => {
    const tableRows = document.querySelectorAll(".grpList__row__column:first-child")
    const checkBox = document.querySelectorAll("input[type=checkbox]")
    const groupe = document.querySelector("#groupe")
    const module = document.querySelector("#module")
    const heurD = document.querySelector("#hdebut")
    const heurF = document.querySelector("#hfin")
    var checkedStagiaires = []

    for (var i = 0; i < tableRows.length; i++) {
        if(tableRows[i].innerText != ""){
            if(checkBox[i].checked)
                checkedStagiaires.push({"mat" : tableRows[i].innerText})
        }
    }

    values()
    
    $.post("../app/php/server.php", 
        { type: "valider", jour : date, hdebut: heurD.value, hfin: heurF.value, codeGrp : groupe.value, 
        codeMod : module.value , checked : checkedStagiaires}, function (data) {
        if(data == "inserted"){
            $.post("../app/php/server.php", { 
              type: "listeAbsences", 
              jour: date, 
              codeGrp: groupe.value, 
              codeMod: module.value, 
              hdebut: heurD.value, 
              hfin: heurF.value}, 
              function (data) {
                $(".datasection").html(data)
            })
            $.post("../app/php/server.php", { type: "log", ope: "Validation d'absence pour le groupe " + groupe.value }, (data) => {})
        }else{
            $("#infoMessageBox").find("#title").text("Erreur")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
            $("#infoMessageBox").find('#msg').html(data)
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
            $(".datasection").html('')
        }
    })
})