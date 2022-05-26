$.each($(".param-delete"), (key, element) => {
    element.addEventListener("click", e => {
        codeGrp = e.target.parentElement.getElementsByTagName("td")[0].innerText
        $(".delete-message-box__title").text("Supprimer " + codeGrp + "?")
        $(".delete-message-box__target").text("groupe")
        $(".delete-message-box__code").text(codeGrp)
        $("#deleteOverlay").show()
    })
})

$("#groupeTableBody tr td:not(:last-child)").on("click", e => {
    var selectedRow = e.target.parentElement
    $("#upGroupeCode").val($(selectedRow).find("#codeGrp").text())
    $("#upGroupeAnnee").val($(selectedRow).find("#annee").text())
    $("#upSelectFiliere").val($(selectedRow).find("td:nth-child(2)").attr("id"))

    $("#updateGrpOverlay").show(function(){
        document.body.addEventListener("click", upGrpBoxCloser, false)
    })
})