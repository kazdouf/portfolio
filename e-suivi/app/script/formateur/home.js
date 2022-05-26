$(".content__groupe").on("click", e => {
    var groupe = ($(e.target).hasClass("content__groupe")) ? e.target : e.target.parentElement
    $(groupe).next().toggle()
    $(groupe).toggleClass("arrow")
})

var tableRows = document.querySelectorAll(".content__table__row")
if(tableRows){
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].addEventListener("click", showProfile)
    }

    function showProfile(){
        let mat = this.querySelector(".content__table__row__column").innerText
        $.post("../app/php/server.php", { type: "profile", matStg: mat }, function (data) {
            $(container).html(data)
        })
    }
}