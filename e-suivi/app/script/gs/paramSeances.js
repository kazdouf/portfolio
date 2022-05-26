$.post("../app/php/gestionStg.php", { type: "paramListeSeances", formateur: "tous"}, function (data) {
    $("#seanceTableBody").html(data)
})

$("#formateur").on("change", updateValue)

$("#search").on("input", updateValue)

function updateValue() {
    $.post("../app/php/gestionStg.php", { type: "paramListeSeances", formateur: $("#formateur :selected").val()}, function (data) {
        $("#seanceTableBody").html(data)
    })
}