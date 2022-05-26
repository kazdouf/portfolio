$(".dropdown-menu-messages__message").on("click", e => {
    var selectedRow = (e.target.id == "messageNotifLine") ?
        e.target : (e.target.parentElement.id == "messageNotifLine") ?
        e.target.parentElement : e.target.parentElement.parentElement

    console.log($(selectedRow).find("#matr").text())
    $.post("../app/php/server.php", { type: "messagerie" }, function (data) {
        $(container).html(data)
        $.post("../app/php/server.php", { type: "coversation", dest : $(selectedRow).find("#matr").text()}, function (data) {
            $("#lastMessages").html(data)
        })
    })
})