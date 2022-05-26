var visibility = false
var file
var form_data

getDetail()

$.post('../app/php/server.php', { type: 'listDocs', grp: 'tous' }, function (data) {
    $('.datasection').html(data)
})

$('#groupefilter').on('change', e => {
    $.post('../app/php/server.php', { type: 'listDocs', grp: e.target.value }, function (data) {
        $('.datasection').html(data)
    })
})

$('#ajout').on('click', e => {
    $('#addDocOverlay').show(function(){
        document.body.addEventListener('click', boxCloser, false)
    })
})

$("#infoMessageBox").find('input[type="button"]').on('click', e => {
    $('#infoMessageBox').hide()
})

$('#supp').on('click', () => {
    if (!visibility) {
        $('.param-delete').show()
        visibility = true
    } else {
        $('.param-delete').hide()
        visibility = false
    }
})

$('#confirmSupp').on('click', e => {
    $.post('../app/php/server.php', { type: 'deleteDoc', 
        code: $('.delete-message-box__code', ).text(), 
        doc:$('.delete-message-box__doc', ).text()}, function (data) {
        if(data == 'success delete'){
            $.post('../app/php/server.php', { type: 'listDocs', grp: 'tous' }, function (data) {
                $('.datasection').html(data)
            })
        }else {
            $("#infoMessageBox").find("#title").text("Erreur")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
            $("#infoMessageBox").find('#msg').html(data.substring(6))
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
        }
    })
    $('#deleteOverlay').hide()
    $('.param-delete').hide()
    visibility = false
})

$('#annuleSupp').on('click', () => {
    $('#deleteOverlay').hide()
    $('.param-delete').hide()
    visibility = false
})

$('#uploadDocBtn').on('change', e => {
    file = e.target.files[0]
    var name = file.name
    form_data = new FormData()
    var ext = name.split('.').pop().toLowerCase()
    if(jQuery.inArray(ext, ['png','jpg','jpeg']) == -1){
        $("#infoMessageBox").find("#title").text("Erreur")
        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        $("#infoMessageBox").find('#msg').html('Type d\'image invalide')
        $("#infoMessageBox").show(function(){
            document.body.addEventListener('click', infoBoxCloser, false)
        })
    }
    else{
        var oFReader = new FileReader()
        oFReader.readAsDataURL(file)
        var fsize = file.size || file.fileSize
        if(fsize > 2000000){
            $("#infoMessageBox").find("#title").text("Erreur")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
            $("#infoMessageBox").find('#msg').html('La taille de l\'image doit être inférieur a 2 Mo')
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
        }
    }
})

$('#ValiderDocBtn').on('click', () =>{
    
    $('#addDocOverlay').hide()
    if($('#uploadDocBtn').val() != ""){
        form_data.append('file', file)
        form_data.append('type', 'insertDoc')
        form_data.append('docType', $('#Doctype').val())
        form_data.append('date', $('#date').val())
        form_data.append('groupe', $('#groupe').val())
        form_data.append('module', $('#addmodule').val())
        $.ajax({
            url:'../app/php/server.php',
            method:'POST',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success:function(data){
                if(data == 'success'){
                    $.post('../app/php/server.php', { type: 'listDocs', grp: 'tous' }, function (data) {
                        $('.datasection').html(data)
                    })
                    $.post("../app/php/server.php", { type: "log", ope: "Importation de la fiche d'absence "+$('#Doctype').val()+" pour " + $('#groupe').val() }, (data) => {})
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
    }else {
        $("#infoMessageBox").find("#title").text("Erreur")
        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        $("#infoMessageBox").find('#msg').html('vous devez telecharger un fichier dabord')
        $("#infoMessageBox").show(function(){
            document.body.addEventListener('click', infoBoxCloser, false)
        })
    }
})

function infoBoxCloser(e){
    if(e.target.id == 'infoMessageBox'){
        document.body.removeEventListener('click', infoBoxCloser, false)
        $('#infoMessageBox').hide()
    }
}

function getDetail(){
    $.post('../app/php/server.php', { type: 'modulesGrp', grp: $("#groupe :selected").val() }, function (data) {
        $('#addmodule').html(data)
    })
}

function boxCloser(e){
    if(e.target.parentElement.parentElement.id != 'addMessageBox' && 
    e.target.parentElement.parentElement.parentElement.id != 'addMessageBox' && 
    e.target.parentElement.id != 'addMessageBox' && e.target.id != 'addMessageBox'){
        document.body.removeEventListener('click', boxCloser, false)
        $('#addDocOverlay').hide()
    }
}