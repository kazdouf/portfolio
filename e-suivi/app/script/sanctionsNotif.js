$(".dropdown-menu-notifications__notif").on("click", e => {
    var selectedNotif = (e.target.id == "notifRow") ? e.target : 
        (e.target.parentElement.id == "notifRow") ? e.target.parentElement : 
        e.target.parentElement.parentElement
    
    $.post("../app/php/server.php", { type: "profile", matStg: $(selectedNotif).find("#matr").text()}, function (data) {
        $(container).html(data)
        $.post("../app/php/server.php", { type: "Vunotification", codeNotif : $(selectedNotif).find("#codenotif").text()}, function (data) {
            console.log(data)
        })
    })
})