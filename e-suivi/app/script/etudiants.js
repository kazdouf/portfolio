$.post("../app/php/server.php", { type: "listeEtdGroupe", groupe: "tous"}, function (data) {
    $(".content__table").html(data)
})

$("#groupe").on("change", updateValue)

$("#search").on("input", updateValue)

$(".content__table__etdrow").on("click", showProfile)

$("#printAbs").on("click", e => {
    $.post("../app/php/server.php", { type: "absDoc", 
        date: new Date(),
        groupe: $("#groupe").val(),
        key: $("#search").val()}, function (data) {
            $(container).html(data)
    })
})
    
function updateValue() {
    $.post("../app/php/server.php", { type: "listeEtdGroupe", groupe: $("#groupe :selected").val(), key: $("#search").val()}, function (data) {
        $(".content__table").html(data)
    })
}

function showProfile(){
    $.post("../app/php/server.php", { type: "profile", matStg: $(this).find(".content__table__etdrow__column").text() }, function (data) {
        $(container).html(data)
    })
}