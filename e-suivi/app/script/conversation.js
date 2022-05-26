var msgContact = document.querySelector(".messages__last__contact")
msgContact.addEventListener("click", () => {
    $(".listcontacts").toggleClass("msg-show")
    $(".listcontacts").removeClass("msg-hide")
    $(".messages").toggleClass("msg-hide")
    $(".messages").removeClass("msg-show")
})
$("#lastMessages").scrollTop($("#lastMessages").get(0).scrollHeight)