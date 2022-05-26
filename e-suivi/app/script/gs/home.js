//var etat

$('.grid__row__carte__valid').on('click', e => {
    
    var cart = (e.target.classList.contains('grid__row__carte__valid')) ? e.target : e.target.parentElement
    /* etat = $(cart).find('.grid__row__carte__etat').text()

    if(etat == 'Validée'){ */
        $.post("../app/php/gestionStg.php", 
            { type: "lstAbsAjustif", seance : $(cart).find('#sc').text(),
            matricule: $(cart).find('#mat').text()}, 
            function (data) {
                if(data == 'err') alert('err')
                else {
                    $('.list-sanctions-message-box').html(data)
                    $('#scVAbsencesOverlay').show(function(){
                        document.body.addEventListener('click', ScVAbsencesBoxCloser, false)
                    })
                }
            }
        )
    /* } */
})

function ScVAbsencesBoxCloser(e){
    if(e.target.id == 'scVAbsencesOverlay'){
        document.body.removeEventListener('click', ScVAbsencesBoxCloser, false)
        $('#scVAbsencesOverlay').hide()
    }
}