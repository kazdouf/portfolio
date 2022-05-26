var contacts = document.querySelectorAll(".listcontacts__contact")
for (var i = 0; i < contacts.length; i++) {
    contacts[i].addEventListener("click", showMessages)
}

function showMessages(){
    mat = $(this).find("#matricule").text()
    $.post("../app/php/server.php", { type: "coversation", dest : mat}, function (data) {
        $("#lastMessages").html(data)
        $.post("../app/php/server.php", { type: "listcontacts", dest : mat}, function (data) {
            $("#listcontacts").html(data)
        })
    })
    $(".listcontacts").toggleClass("msg-hide")
    $(".listcontacts").removeClass("msg-show")
    $(".messages").toggleClass("msg-show")
    $(".messages").removeClass("msg-hide")
}