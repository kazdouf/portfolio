$.post("../app/php/GSRegionale.php", { type: "listEFPsearch"}, function (data) {
    $(".gsrio-container").html(data)
})

$(".gsrio-header__logo").on("click", e => {
    GSRHome()
})

$("#search").on("input", e => {
    $.post("../app/php/GSRegionale.php", { type: "listEFPsearch", key: e.target.value}, function (data) {
        $(".gsrio-container").html(data)
    }) 
})

function GSRHome(){
    $.post('../app/php/GSRegionale.php', { type: 'listEFP'}, function (data) {
        if(data == "notGSR"){
            $('body').html('<div class="err"><strong>Attention!</strong> Vous n\'êtes pas CSRIO !!</div>')
        }else if(data == "notConnected"){
            $('body').html('<div class="err"><strong>Oops!</strong> Connectez-vous pour accéder a cette page.</div>')
        }else if(data == "session ech"){
            $('body').html('<div class="err"><strong>Oops!</strong> Votre sesion est expirée. Veuillez vous reconnecter !<div class="err__revAcc" id="revAcc"> Cliquer ici pour revenir à la page d\'accueil.</div></div>')
            $('#revAcc').on('click', e => {window.location.href = '../app/php/deconnection.php'})
        }else
            $('#content').html(data)
    })
}
