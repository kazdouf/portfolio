var opt = {
    importCSS: false,
    importStyle: true,
    printContainer: false,
    loadCSS: "dist/style.css",
    base: "http://e-suivi.ofppt.ma"
}

$.post("../app/php/server.php", { type: "listeEtdGroupe", groupe: $('.to-print #groupe').text(), key: $('.to-print #key').text(), for: "table"}, function (data) {
    $("#tablecontent").html(data)
})

$("#imprimer").on("click", () => {
    $.post("../app/php/server.php", { type: "log", ope: "Impression d\'un historique des absences" }, (data) => {})
    $(".to-print").printThis(opt)
})