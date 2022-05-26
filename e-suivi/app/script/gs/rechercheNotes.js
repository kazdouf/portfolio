var tableRows = document.querySelectorAll(".content__table__etdrow")
if(tableRows){
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].addEventListener("click", showProfile)
    }

    function showProfile(e){
        var selected = (e.target.classList.contains("content__table__etdrow")) ? e.target :
            (e.target.parentElement.classList.contains("content__table__etdrow")) ? e.target.parentElement : e.target.parentElement.parentElement
        $.post("../app/php/server.php", { type: "profile", matStg: $(selected).find(".mat").text() }, function (data) {
            $(container).html(data)
        })
    }
}