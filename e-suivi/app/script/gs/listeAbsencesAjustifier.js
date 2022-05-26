var todo
var operation
$(".justifCheck").on("change", e => {
    todo = (e.target.checked) ? "justif" : "nonjustif"
    $.post("../app/php/gestionStg.php", 
        { type: "justification", seance : e.target.id, action : todo, 
        matriculeEtd: $(e.target.parentElement.parentElement).find("#matEtd").text()}, 
        function (data) {
            if(data == "err") {
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find("#msg").html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener("click", infoBoxCloser, false)
                })
            }
            else {
                operation = (todo == "justif") ? "Justification d\'absence" : "Annule la justification d\'absence"
                operation += " du "+$("#fullname").text()+" pour la seance N: " + e.target.id
                $.post("../app/php/server.php", { type: "log", ope: operation }, (data) => {})
            }
        }
    )
})