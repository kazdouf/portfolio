$.post("../app/php/gestionStg.php", { type: "listeNotesEtdGroupe", groupe: "tous"}, function (data) {
    $("#notesStg").html(data)
})

$("#groupe").on("change", updateValue)

$("#search").on("input", updateValue)

function updateValue() {
    $("#exportForm input[name='groupe']").val($("#groupe :selected").val())
    $("#exportForm input[name='key']").val($("#search").val())
    $.post("../app/php/gestionStg.php", { type: "listeNotesEtdGroupe", groupe: $("#groupe :selected").val(), key: $("#search").val()}, function (data) {
        $("#notesStg").html(data)
    })
}