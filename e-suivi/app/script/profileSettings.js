var visibility = false

$('#modifierImgBtn').on('change', e =>{
    var file = e.target.files[0]
    var name = file.name
    var form_data = new FormData()
    var ext = name.split('.').pop().toLowerCase()
    if(jQuery.inArray(ext, ['png','jpg','jpeg']) == -1){
        $("#infoMessageBox").find("#title").text("Erreur")
        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        $("#infoMessageBox").find('#msg').html('Type d\'image invalide')
        $("#infoMessageBox").show(function(){
            document.body.addEventListener('click', infoBoxCloser, false)
        })
        $('#modifierImgBtn').val('')
    }
    else{
        /* var oFReader = new FileReader()
        oFReader.readAsDataURL(file) */
        var fsize = file.size || file.fileSize
        console.log(fsize)
        if(fsize > 2000000){
            $("#infoMessageBox").find("#title").text("Erreur")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
            $("#infoMessageBox").find('#msg').text('La taille de l\'image doit être inférieur à 2 Mo')
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
            $('#modifierImgBtn').val('')
        }
        else{
            form_data.append('file', file)
            form_data.append('type', 'imageUpload')
            $.ajax({
                url:'../app/php/server.php',
                method:'POST',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success:function(data){
                    if(data == 'success'){
                        $.post('../app/php/server.php', { type: 'profileSettings' }, function (data) {
                            refraishPic()
                            $(container).html(data)
                            window.location.reload()
                        })
                        $.post("../app/php/server.php", { type: "log", ope: "Mise à jour de l'image de profil" }, (data) => {})
                    }else {
                        $("#infoMessageBox").find("#title").text("Erreur")
                        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                        $("#infoMessageBox").find('#msg').html(data)
                        $("#infoMessageBox").show(function(){
                            document.body.addEventListener('click', infoBoxCloser, false)
                        })
                    }
                }
            })
        }
    }
})

$('.profile-container__form__row__eye-icon').css({'background-image' : 'url(../img/assets/eye-hidden-icon.svg)'})
$('.profile-container__form__row__eye-icon').on('click', passeVisibility)

function passeVisibility (e){
    if($('#pass').attr('type') == 'password'){
        $('#pass').attr('type', 'text')
        e.target.style.backgroundImage = 'url(../img/assets/eye-visible-icon.svg)'
        visibility = true
    }else{
        $('#pass').attr('type', 'password')
        e.target.style.backgroundImage = 'url(../img/assets/eye-hidden-icon.svg)'
        visibility = false
    }
}

$('#modifierInfosBtn').on('click', e => {
    //console.log($('#nom').val() + ' ' + $('#prenom').val() + ' ' + $('#spec').val() + ' ' + $('#pass').val())
    $.post('../app/php/server.php', { type: 'profileEnreg', 
            nom: $('#nom').val(), prenom: $('#prenom').val(), 
            spec: $('#spec').val(), pass: $('#pass').val()}, function (data) {
            if(data == 'succes'){
                $.post('../app/php/server.php', { type: 'profileSettings' }, function (data) {
                    $(container).html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Mise à jour les informations personnelles" }, (data) => {})
            }
            else {
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser)
                })
            }
        }) 
})

$("#infoMessageBox").find('input[type="button"]').on('click', e => {
    $('#infoMessageBox').hide()
    document.body.removeEventListener('click', infoBoxCloser)
})

function infoBoxCloser(e){
    if(e.target.id == 'infoMessageBox'){
        $('#infoMessageBox').hide()
        document.body.removeEventListener('click', infoBoxCloser)
    }
}
refraishPic()
function refraishPic(){
    $.post('../app/php/server.php', { type: 'logInfo' }, function (data) {
        data = JSON.parse(data)
        $('#profileSettingsPic').attr('src', '../img/personnelProfiles/'+data.image)
        $('#navLinkPic').attr('src', '../img/personnelProfiles/'+data.image)
    })
}