$.each($(".param-delete"), (key, element) => {
    element.addEventListener("click", e => {
        mat = e.target.parentElement.getElementsByTagName("td")[0].innerText
        n = e.target.parentElement.getElementsByTagName("td")[1].innerText
        $(".delete-message-box__title").text("Supprimer " + n + "?")
        $(".delete-message-box__target").text("gs")
        $(".delete-message-box__code").text(mat)
        $("#deleteOverlay").show()
    })
})

$("#formatTableBody tr td:not(:last-child)").on("click", e => {
    //console.log($(e.target.parentElement).find("#mat").text())
    $.post("../app/php/gestionStg.php", { type: "formateurInfos", matricule: $(e.target.parentElement).find("#mat").text()}, function (data) {
        var formateur = JSON.parse(data)
        $("#formatId").val(formateur.matricule)
        $("#formatNom").val(formateur.nom)
        $("#formatPrenom").val(formateur.prenom)
        $("#formatSpec").val(formateur.specialite)
        $("#ResetBtn").show()
        $(".add-message-box__form__row:last-child").addClass("flex-jc-sb")
        $(".add-message-box__form__row:last-child").removeClass("flex-jc-fe")
        $(".add-message-box__title").text("Modifier le gestionnaire des stagiaires")
        $("#validFormatBtn").val("Modifier")
    })
    $("#formatOverlay").show(function(){
        document.body.addEventListener("click", boxCloser, false)
    })
})