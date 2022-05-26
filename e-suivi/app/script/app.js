var user
var container

$(function() {
    var menuOpen = false
    
    $.post('../app/php/server.php', { type: 'logInfo' }, function (data) {
        if(data == "notConnected")
            $('body').html('<div class="err"><strong>Oops!</strong> Connectez-vous pour accéder a cette page.</div>')
        else{
            user = JSON.parse(data)
            container  = (user.titre == 'CSRIO') ? '#gsrioContent' : '#content'
            $('.nav-link__user__name, .nav-link__user__dropname, .gsrio-nav-link__user__name').text(user.nom + ' ' + user.prenom)
            $('.nav-link__user__titre, .nav-link__user__droptitre, .gsrio-nav-link__user__titre').text(user.titre)
            $('.nav-link__img, .gsrio-nav-link__img').css({'background-image' : 'url(../img/personnelProfiles/' + user.image + ')'})
        }
    })
    
    if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $('link[rel="icon"]').attr('href', '../img/assets/logo-light.svg')
    }
    
    $(document).on('contextmenu', () => { return false })

    $(document).on('keydown', e => {
        /* if(e.keyCode == 123) return false
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false */
    })

    $('.menu-btn').on('click', () => {
        if(!menuOpen) {
            $('.menu-btn').addClass('open')
            $('.slide-bar').addClass('slide-in').removeClass('slide-out')
            menuOpen = true
        } else{
            $('.menu-btn').removeClass('open')
            $('.slide-bar').addClass('slide-out').removeClass('slide-in')
            menuOpen = false
        }
    })

    $('.link').first().addClass('active')

    $('.link').on('click', e => {
        $('.link').removeClass('active')
        e.target.classList.add('active')
    })

    
    // Profile Hide and show drop down functionality
    $('#detailsProfile').hide()
    $('#profile').on('click', () => {
        $('#detailsProfile').show(function(){
            document.body.addEventListener('click', boxProfileCloser, false)
        })
    })

    // newMessages Hide and show drop down functionality
    $('#newMessages').hide()
    $('#messages').on('click', function(){
        $('#messages').toggleClass('active')
        if($('#notifications').hasClass('active'))
            $('#notifications').toggleClass('active')
        $('#newMessages').show(function(){
            document.body.addEventListener('click', boxMessagesCloser, false)
        })
    })

    // newNotifications Hide and show drop down functionality
    $('#newNotifications').hide()
    $('#notifications').on('click', function(){
        $('#notifications').toggleClass('active')
        if($('#messages').hasClass('active'))
            $('#messages').toggleClass('active')
        $('#newNotifications').show(function(){
            document.body.addEventListener('click', boxNotifCloser, false)
        })
    })
    
    //------------------------------------------------------------------------

    $('#profileSettings').on('click', () => {
        //.log(container)
        $.post('../app/php/server.php', { type: 'profileSettings' }, function (data) {
            $(container).html(data)
        })
    })

    $('#deconnection').on('click', () => {
        $.post("../app/php/server.php", { type: "log", ope: "Déconnexion" }, (data) => {})
        window.location.href = '../app/php/deconnection.php'
    })
    
    $.post("../app/php/server.php", { type: "MessagesNotif"}, function (data) {
        $("#newMessages").html(data)
    })

    $.post("../app/php/server.php", { type: "newNotif"}, function (data) {
        $("#newNotifications").html(data)
    })
    
    window.setInterval(sessionData, 1000);
    function sessionData() {
        $.post("../app/php/server.php", function (data) {
            if(data == 'notConnected'){
                $('body').html('<div class="err"><strong>Oops!</strong> Connectez-vous pour accéder à cette page.</div>')
            }else if(data == "session ech"){
                $('body').html('<div class="err"><strong>Oops!</strong> Votre sesion est expirée. Veuillez vous reconnecter !<div class="err__revAcc" id="revAcc"> Cliquer ici pour revenir à la page d\'accueil.</div></div>')
                $('#revAcc').on('click', e => {window.location.href = '../app/php/deconnection.php'})
            }
        })
        
        $.post("../app/php/server.php", { type: "newMessageCount" }, function (data) {
            if(data > 0 ){
                msgNbr = data
                $("#messages").html("<div class='notifNumber'>"+data+"</div>")
                $.post("../app/php/server.php", { type: "MessagesNotif"}, function (data) {
                    $("#newMessages").html(data)
                })
            }else $("#messages").html('')
        })

        $.post("../app/php/server.php", { type: "newNotifCount" }, function (data) {
            if(data > 0){
                notifNbr = data
                $("#notifications").html("<div class='notifNumber'>"+data+"</div>")
                $.post("../app/php/server.php", { type: "newNotif"}, function (data) {
                    $("#newNotifications").html(data)
                })
            }else $("#notifications").html('')
        })
    }
   
    $('#detailsProfile').hide()
    $('#profile').click(function(){
        $('#detailsProfile').show(function(){
            document.body.addEventListener('click', boxProfileCloser, false)
        })
    })
})



function Absence(){
    $.post('../app/php/server.php', { type: 'absence' }, function (data) {
        $(container).html(data)
    })
}

function Etudiants(){
    $.post('../app/php/server.php', { type: 'etudiants'}, function (data) {
        $(container).html(data)
    })
}

function Messagerie(){
    $.post('../app/php/server.php', { type: 'messagerie' },function (data) {
        $(container).html(data)
    })
}

function Imprimer(){
    $.post('../app/php/server.php', { type: 'imprimer'}, function (data) {
        $(container).html(data)
    })
}

function Notes(){
    $.post('../app/php/gestionStg.php', { type: 'notes'}, function (data){
        $(container).html(data)
    })
}

function Parametre(){
    $.post('../app/php/gestionStg.php', { type: 'param'}, function (data) {
        $(container).html(data)
    })
}

function GSHome(){
    $.post('../app/php/gestionStg.php', { type: 'home' }, function (data) {
        if(data == "notGS"){
            $('body').html('<div class="err"><strong> Attention!</strong>Vous n\'êtes pas un Gestionnaire de Stagiaires.</div>')
        }else if(data == "notConnected"){
            $('body').html('<div class="err"><strong>Oops!</strong> Connectez-vous pour accéder à cette page.</div>')
        }else if(data == "session ech"){
            $('body').html('<div class="err"><strong>Oops!</strong> Votre sesion est expirée. Veuillez vous reconnecter !<div class="err__revAcc" id="revAcc"> Cliquer ici pour revenir à la page d\'accueil.</div></div>')
            $('#revAcc').on('click', e => {window.location.href = '../app/php/deconnection.php'})
        }else
            $(container).html(data)
    })
}

function boxProfileCloser(e){
    if(e.target.parentElement.parentElement.id != 'detailsProfile' && e.target.parentElement.id != 'detailsProfile'){
        document.body.removeEventListener('click', boxProfileCloser, false)
        $('#detailsProfile').hide()
    }
}

function boxNotifCloser(e){
    document.body.removeEventListener('click', boxNotifCloser, false)
    $('#newNotifications').hide()
    if($('#notifications').hasClass('active'))
        $('#notifications').toggleClass('active')
}

function boxMessagesCloser(e){
    document.body.removeEventListener('click', boxMessagesCloser, false)
    $('#newMessages').hide()
    if($('#messages').hasClass('active'))
        $('#messages').toggleClass('active')
}