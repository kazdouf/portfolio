$.post("../app/php/server.php", { type: "listcontacts" }, function (data) {
    $("#listcontacts").html(data)
})

var mat
var envoyer = document.querySelector("#envoyer")
envoyer.addEventListener("click", envoyerMessages)

function envoyerMessages(){
    var msg = document.querySelector(".messages__new__text")
    if(msg.value == ""){
        $("#infoMessageBox").find("#msg").text("Veuillez insérer un message d\'abord")
        $("#infoMessageBox").show(function(){
            document.body.addEventListener("click", infoBoxCloser, false)
        })
    }else{
        if(typeof(mat) != "undefined" && mat != null){
            //console.log(mat)
            $.post("../app/php/server.php", { type: "envoiMsg", dest: mat, msgAenvoyer: msg.value }, function (data) {
                if(data == "ok"){
                    $.post("../app/php/server.php", { type: "coversation", dest : mat}, function (data) {
                        $("#lastMessages").html(data)
                    })
                    msg.value = ""
                }
            })
        }else{
            $("#infoMessageBox").find("#msg").text("vous devez sélectionner une conversation pour envoyer un message")
            $("#infoMessageBox").show(function(){
                document.body.addEventListener("click", infoBoxCloser, false)
            })
        }
    }
}

$("#infoMessageBox").find("input[type=\"button\"]").on("click", e => {
    $("#infoMessageBox").hide()
})

function infoBoxCloser(e){
    if(e.target.id == "infoMessageBox"){
        document.body.removeEventListener("click", infoBoxCloser, false)
        $("#infoMessageBox").hide()
    }
}