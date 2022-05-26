var tableRows = document.querySelectorAll(".content__table__etdrow")
if(tableRows){
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].addEventListener("click", showProfile)
    }

    function showProfile(){
        var mat = this.querySelector("#mat").innerText
        $.post("../app/php/server.php", { type: "profile", matStg: mat }, function (data) {
            $(container).html(data)
        })
    }
}