function formateurHome(){
    $.post('../app/php/formateur.php', { type: 'home' }, function (data) {
        if(data == "notConnected"){
            data = '<div class="err"><strong>Oops!</strong> Connectez-vous pour accéder a cette page.</div>'
            $('body').html(data)
        }else if(data == "notFormateur"){
            data = '<div class="err"><strong>Attention!</strong> Vous n\'êtes pas un Formateur.</div>'
            $('body').html(data)
        }else if(data == "session ech"){
            $('body').html('<div class="err"><strong>Oops!</strong> Votre sesion est expirée. Veuillez vous reconnecter !<div class="err__revAcc" id="revAcc"> Cliquer ici pour revenir à la page d\'accueil.</div></div>')
            $('#revAcc').on('click', e => {window.location.href = '../app/php/deconnection.php'})
        }else
            $('#content').html(data)
    })
}