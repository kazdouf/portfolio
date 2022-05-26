getDetail()
                        
$("#validerAffectation").on("click", e =>{
    var operation = "Affectation du groupe " + $("#groupe").val() + " au formateur " + 
    $("#formateur :selected").text() + " pour le module " + $("#module :selected").text()
    $.post("../app/php/gestionStg.php", { type: "affecterGroupe", 
        format: $("#formateur").val(), 
        grp: $("#groupe").val(), 
        mod: $("#module").val() }, function (data) {
        if(data.substring(0, 5) == "INFOS"){
            $.post("../app/php/server.php", { type: "log", ope: operation}, (data) => {
                console.log(data);
            })
            $("#infoMessageBox").find("#title").text("Confirmation")
            $("#infoMessageBox").find("#title").css({"color":"#2D3368"})
        }else{
            $("#infoMessageBox").find("#title").text("Error")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        }
        $("#infoMessageBox").find("#msg").text(data.substring(6))
        $("#infoMessageBox").show(function(){
            document.body.addEventListener("click", infoBoxCloser, false)
        })
    })
})

function getDetail(){
    $.post("../app/php/server.php", { type: "modulesGrp", grp: $("#groupe :selected").val() }, function (data) {
        $("#module").html(data)
    })
}