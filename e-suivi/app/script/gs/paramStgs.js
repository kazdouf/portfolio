$.post("../app/php/gestionStg.php", { type: "paramListeStg", groupe: "tous"}, function (data) {
    $("#stgTableBody").html(data)
})

$("#groupe").on("change", e => {
    $.post("../app/php/gestionStg.php", { type: "paramListeStg", groupe: e.target.value}, function (data) {
        $("#stgTableBody").html(data)
    })
})

$("#search").on("input", e => {
    $.post("../app/php/gestionStg.php", { type: "paramListeStg", key: e.target.value}, function (data) {
        $("#stgTableBody").html(data)
    })
})