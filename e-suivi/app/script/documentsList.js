$(".param-delete").on("click", e => {
    var code = $(e.target.parentElement.parentElement).find("#codeDoc").text()
    var doc = $(e.target.parentElement).find("a").text()
    $(".delete-message-box__title").text("Supprimer le document?")
    $(".delete-message-box__code").text(code)
    $(".delete-message-box__doc").text(doc)
    $("#deleteOverlay").show()
})