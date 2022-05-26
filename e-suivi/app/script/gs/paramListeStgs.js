$.each($(".param-delete"), (key, element) => {
    element.addEventListener("click", e => {
        var mat = $(e.target.parentElement).find("#mat").text()
        var fullname = $(e.target.parentElement).find("#fullname").text()
        $(".delete-message-box__title").text("Supprimer " + fullname + "?")
        $(".delete-message-box__target").text("stagiaire")
        $(".delete-message-box__code").text(mat)
        $("#deleteOverlay").show()
    })
})

$("#stgTableBody tr td:not(:last-child)").on("click", e => {
    var selectedRow = e.target.parentElement
    $("#ValiderStgBtn").val("Modifier")
    $(".add-message-box__title").text("Modifier le stagiaire "+$(selectedRow).find("#fullname").text())
    $("#matriculestg").prop("disabled", true)
    $("#matriculestg").val($(selectedRow).find("#mat").text())
    $("#nomstg").val($(selectedRow).find("#nom").text())
    $("#prenomstg").val($(selectedRow).find("#prenom").text())
    $("#genrestg").val($(selectedRow).find("#genre").text())
    $("#dateNaissancestg").val($(selectedRow).find("#date").text())
    $("#telstg").val($(selectedRow).find("#tel").text())
    $("#groupestg").val($(selectedRow).find("#groupe").text())

    $("#stgOverlay").show(function(){
        document.body.addEventListener("click", stgBoxCloser, false)
    })
})