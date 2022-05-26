var opt = {
    importCSS: false,
    importStyle: true,
    printContainer: false,
    loadCSS: "dist/style.css",
    base: "http://e-suivi.ofppt.ma"
    // base: "http://localhost/e-suivi/"
}

$.post("../app/php/server.php", { type: "listeStg", grp: $("#grp").text().substring(2) }, function (data) {
    $("#tablecontent").html(data)
})

$("#imprimer").on("click", () => {
    $(".to-print").printThis(opt)
    $.post("../app/php/server.php", { type: "log", ope: "Impression de la fiche d\'absence " + "'.$choix.'" + " pour le groupe" + "'.$_POST['grp'].'" }, (data) => {})
})