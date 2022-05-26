$("#suivant").on("click", () => {
    $.post("../app/php/server.php", { type: "doc", 
    date: $("#date").val(),
    hdebut: $("#hdebut").val(),
    hfin: $("#hfin").val(),
    grp: $("#groupe").val(),
    choix: id,
    module: $("#module :selected").text() }, function (data) {
        $(container).html(data)
    })
})

getDetail()

function getDetail(){
    $.post("../app/php/server.php", { type: "modulesGrp", grp: $("#groupe :selected").val() }, function (data) {
        $("#module").html(data)
    })
}