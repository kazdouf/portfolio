var logedPersonnel

$('#matricule, #motdepass').on('keypress', e => {
    if(e.which == 13){
        login()
     }
})

$('#submit').on('click', login)

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $('link[rel="icon"]').attr('href', './img/assets/logo-light.svg')
}

$(document).on('contextmenu', e => { return false })

$(document).on('keydown', e => {
    if(e.keyCode == 123) return false
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false
})

var onloadCallback = function() {
    grecaptcha.render('html_element', {
        //Atmane site key
        // 'sitekey' : '6LfWzH0aAAAAAHx_1W4X86Cuo1a14uGidBNLvlN9'

        //Ay kz site key
        // 'sitekey' : '6Leju3waAAAAALwlHW2e-IK3U9AqZNN00bYiIm07'

        //test site key
        'sitekey' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    })
}

function login(){
    $.post('app/php/identification.php', 
        {   matricule: $('#matricule').val(), 
            motdepass: $('#motdepass').val() ,
            captcha: grecaptcha.getResponse()
        }, 
    function (data){
        if (data.substring(0,3) == 'err'){
            grecaptcha.reset()
            $('#err').text(data.substring(4))
        }
        else{
            $.post("../app/php/server.php", { type: "log", ope: "Connexion" }, () => {})
            logedPersonnel = JSON.parse(data)
            if (logedPersonnel.titre == 'Formateur')
                window.location.replace('formateur')
            if (logedPersonnel.titre == 'GS')
                window.location.replace('gs')
            if (logedPersonnel.titre == 'CSRIO')
                window.location.replace('gsr')
        }
    })
}