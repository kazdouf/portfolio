var selectedEFP
$(".gsrio-container__ville__efp").on("click", e => {
    selectedEFP = ($(e.target).hasClass("gsrio-container__ville__efp")) ?
        e.target : e.target.parentElement

    if($(selectedEFP).find("#add").length > 0){
        $("#validFormatBtn").val("Ajouter")
        $(".add-message-box__title").text("Ajouter un établissement")
        $("#EFPId").val("")
        $("#EFPNom").val("")
        $(".add-message-box__form__row:last-child").addClass("flex-jc-fe")
        $(".add-message-box__form__row:last-child").removeClass("flex-jc-sb")
        $("#EFPOverlay").show(function(){
            document.body.addEventListener("click", EFPBoxCloser, false)
        })
    }else{
        $.post("../app/php/GSRegionale.php", { type: "GSRHome", codeEFP: $(selectedEFP).find("#codeEFP").text()}, function (data) {
            $("#content").html(data)
            GSHome()
        })
    }
})

$("#validEFPBtn").on("click", () =>{
    $.post("../app/php/GSRegionale.php", { type: "addEFP", 
        codeEFP : $("#EFPId").val(),
        nomEFP : $("#EFPNom").val(),
        ville: $(selectedEFP).find("#add").text()}, function (data) {
            if(data.substring(0, 3) == "err"){
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find("#msg").html(data.substring(4))
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener("click", infoBoxCloser, false)
                })
                $("#EFPOverlay").hide()
            }else{
                GSRHome()
                $.post("../app/php/server.php", { type: "log", ope: "Ajout d\'un établissement du code " + $("#EFPId").val()}, (data) => {})
            }
    })
})

$(".gsrio-container__ville__title").on("click", e => {
    var city = ($(e.target).hasClass("gsrio-container__ville__title")) ? e.target : e.target.parentElement
    $(city).next().toggle()
    $(city).toggleClass("arrow")
})


$("#infoMessageBox").find("input[type=\'button\']").on("click", e => {
    $("#infoMessageBox").hide()
})

function EFPBoxCloser(e){
    if(e.target.id == "EFPOverlay"){
        document.body.removeEventListener("click", EFPBoxCloser, false)
        $("#EFPOverlay").hide()
    }
}

function infoBoxCloser(e){
    if(e.target.id == "infoMessageBox"){
        document.body.removeEventListener("click", infoBoxCloser, false)
        $("#infoMessageBox").hide()
    }
}