var id = 'cc'   

$.post("../app/php/server.php", { type: "printContent"}, function (data) {
    $(".print-content").html(data)
})


$('.content-param__head__btn').on('click', e => {
    id = e.target.id
    if(id == "cc"){
        Active(id)
    }
    if(e.target.id == "efm" || e.target.id == "efm"){
        $.post('../app/php/server.php', { type: 'printContent'}, function (data) {
            $('.print-content').html(data)
        })
    }
    if(e.target.id == "efm"){
        Active(id)
    }
    if(e.target.id == "upload"){
        Active(id)
        $.post("../app/php/server.php", { type: "docUpload"}, function (data) {
            $(".print-content").html(data)
        })
    }
})

function Active(id){
    $.each($('.content-param__head__btn'), (key, elem) =>{
        if(elem.id == id) elem.classList.add('active')
        else elem.classList.remove('active')
    })
}

