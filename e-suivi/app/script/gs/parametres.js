var visibility = false
var mat, n

$.post('../app/php/gestionStg.php', { type: 'paramFormateurs'}, function (data) {
    $('.datasection').html(data)
})

$('#paramControlsText').text('Liste des formateurs')

$('.content-param__head__btn').on('click', e => {
    if(e.target.id == 'format'){
        Active(e.target.id)
        $('.controls-param').show()
        $('#paramControlsText').text('Liste des formateurs')
        $.post('../app/php/gestionStg.php', { type: 'paramFormateurs'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'grp'){
        Active(e.target.id)
        $('.controls-param').show()
        $('#paramControlsText').text('Liste des groupes')
        $.post('../app/php/gestionStg.php', { type: 'paramGroupes'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'stg'){
        Active(e.target.id)
        $('.controls-param').show()
        $('#paramControlsText').text('Liste des stagiaires')
        $.post('../app/php/gestionStg.php', { type: 'paramStagiaires'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'affect'){
        Active(e.target.id)
        $('.controls-param').hide()
        $.post('../app/php/gestionStg.php', { type: 'affectation'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'seances'){
        Active(e.target.id)
        $('.controls-param').hide()
        $.post('../app/php/gestionStg.php', { type: 'paramSeances'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'log'){
        Active(e.target.id)
        $('.controls-param').hide()
        $.post('../app/php/gestionStg.php', { type: 'loglist'}, function (data) {
            $('.datasection').html(data)
        })
    }
    if(e.target.id == 'gs'){
        Active(e.target.id)
        $('.controls-param').show()
        $('#paramControlsText').text('Liste des gestionnaires des stagiaires')
        $.post('../app/php/GSRegionale.php', { type: 'paramGS'}, function (data) {
            $('.datasection').html(data)
        })
    }
})

$('#annuleSupp').on('click', () => {
    $('#deleteOverlay').hide()
    $('.param-delete').hide()
    visibility = false
})

$('#confirmSupp').on('click', e => {           
    if($('.delete-message-box__target').text() == 'groupe'){
        $.post('../app/php/gestionStg.php', { type: 'deleteG', grp: $('.delete-message-box__code').text()}, function (data) {
            if(data == 'success delete'){
                $.post('../app/php/gestionStg.php', { type: 'paramGroupes'}, function (data) {
                    $('.datasection').html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Suppression du groupe " + $('.delete-message-box__code').text() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }
    if($('.delete-message-box__target').text() == 'gs') {
        $.post('../app/php/GSRegionale.php', { type: 'deleteGS', mat: $('.delete-message-box__code').text()}, function (data) {
            if(data == 'success delete'){
                $.post('../app/php/GSRegionale.php', { type: 'paramGS'}, function (data) {
                    $('.datasection').html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Suppression du gestionnaire " + $('.delete-message-box__code').text() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }
    if($('.delete-message-box__target').text() == 'formateur') {
        $.post('../app/php/gestionStg.php', { type: 'deleteF', mat: $('.delete-message-box__code').text()}, function (data) {
            if(data == 'success delete'){
                $.post('../app/php/gestionStg.php', { type: 'paramFormateurs'}, function (data) {
                    $('.datasection').html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Suppression du formateur " + $('.delete-message-box__code').text() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }
    if($('.delete-message-box__target').text() == 'stagiaire') {
        $.post('../app/php/gestionStg.php', { type: 'deleteStg', mat: $('.delete-message-box__code').text()}, function (data) {
            if(data == 'success delete'){
                $.post('../app/php/gestionStg.php', { type: 'paramStagiaires'}, function (data) {
                    $('.datasection').html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Suppression du stagiaire " + $('.delete-message-box__code').text() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }
    
    $('#deleteOverlay').hide()
    $('.param-delete').hide()
    visibility = false
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

// add formateur form show hide functionality
$('#ajout').on('click', e => {
    if(e.target.parentElement.parentElement.innerText.includes('formateurs')){
        $("#validFormatBtn").val("Ajouter")
        $(".add-message-box__title").text("Ajouter un formateur")
        $("#formatId").val('')
        $("#formatNom").val('')
        $("#formatPrenom").val('')
        $("#formatSpec").val('')
        $("#ResetBtn").hide()
        $(".add-message-box__form__row:last-child").addClass("flex-jc-fe")
        $(".add-message-box__form__row:last-child").removeClass("flex-jc-sb")
        $('#formatOverlay').show(function(){
            document.body.addEventListener('click', boxCloser, false)
        })
    }
    if(e.target.parentElement.parentElement.innerText.includes('groupes')){
        $("#ValiderGrpBtn").val("Ajouter")
        $(".add-message-box__title").text("Ajouter un groupe")
        $("#GroupeCode").val('')
        $("#GroupeAnnee").val('')
        $("#selectFiliere").val('')
        $('#addGrpOverlay').show(function(){
            document.body.addEventListener('click', grpBoxCloser, false)
        })
    }
    if(e.target.parentElement.parentElement.innerText.includes('Liste des stagiaires')){
        $("#ValiderStgBtn").val("Ajouter")
        $(".add-message-box__title").text("Ajouter un stagiaire")
        $("#matriculestg").prop('disabled', false)
        $("#matriculestg").val('')
        $("#nomstg").val('')
        $("#prenomstg").val('')
        $("#telstg").val('')
        $('#stgOverlay').show(function(){
            document.body.addEventListener('click', stgBoxCloser, false)
        })
    }
    if(e.target.parentElement.parentElement.innerText.includes('gestionnaires')){
        $("#validFormatBtn").val("Ajouter")
        $(".add-message-box__title").text("Ajouter un gestionnaire")
        $("#formatId").val('')
        $("#formatNom").val('')
        $("#formatPrenom").val('')
        $("#formatSpec").val('')
        $("#ResetBtn").hide()
        $(".add-message-box__form__row:last-child").addClass("flex-jc-fe")
        $(".add-message-box__form__row:last-child").removeClass("flex-jc-sb")
        $('#formatOverlay').show(function(){
            document.body.addEventListener('click', boxCloser, false)
        })
    }
})


$('#validFormatBtn').on('click', () =>{
    var title = $('#formatOverlay').find('.add-message-box__title').text()
    if(title.includes('formateur')){
        if($("#validFormatBtn").val() == 'Ajouter'){
            $.post('../app/php/gestionStg.php', { 
              type: 'addF', 
              mat: $('#formatId').val(),
              nom: $("#formatNom").val(),
              prenom: $("#formatPrenom").val(),
              spec: $("#formatSpec").val()}, function (data) {
                if(data == 'success add'){
                    $.post('../app/php/gestionStg.php', { type: 'paramFormateurs'}, function (data) {
                        $('.datasection').html(data)
                    })
                    $.post("../app/php/server.php", { type: "log", ope: "Ajout formateur " + $($('.add-message-box__form__row__input')[0]).val() }, (data) => {})
                }else{
                    $("#infoMessageBox").find("#title").text("Erreur")
                    $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                    $("#infoMessageBox").find('#msg').html(data)
                    $("#infoMessageBox").show(function(){
                        document.body.addEventListener('click', infoBoxCloser, false)
                    })
                }
                $('#formatOverlay').hide()
            })
        }else{
            $.post('../app/php/gestionStg.php', { 
              type: 'updateF',
              oldMat : $('#formatMat').val(),
              newMat : $('#formatId').val(),
              nom: $("#formatNom").val(),
              prenom: $("#formatPrenom").val(),
              spec: $("#formatSpec").val()}, function (data) {
                if(data == 'success'){
                    $.post('../app/php/gestionStg.php', { type: 'paramFormateurs'}, function (data) {
                        $('.datasection').html(data)
                    })
                    $.post("../app/php/server.php", { type: "log", ope: "Modification du formateur " +  $('#formatId').val() }, (data) => {})
                }else{
                    $("#infoMessageBox").find("#title").text("Erreur")
                    $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                    $("#infoMessageBox").find('#msg').html(data)
                    $("#infoMessageBox").show(function(){
                        document.body.addEventListener('click', infoBoxCloser, false)
                    })
                }
                $('#formatOverlay').hide()
            })
        }
    }
    if(title.includes('gestionnaire')){
        if($("#validFormatBtn").val() == 'Ajouter'){
            $.post('../app/php/GSRegionale.php', { 
              type: 'addGS', 
              mat: $($('.add-message-box__form__row__input')[0]).val(),
              nom: $($('.add-message-box__form__row__input')[1]).val(),
              prenom: $($('.add-message-box__form__row__input')[2]).val(),
              spec: $($('.add-message-box__form__row__input')[3]).val()}, function (data) {
                if(data == 'success add'){
                    $.post('../app/php/GSRegionale.php', { type: 'paramGS'}, function (data) {
                        $('.datasection').html(data)
                    })
                    $.post("../app/php/server.php", { type: "log", ope: "Ajout du gestionnaire " +  $($('.add-message-box__form__row__input')[0]).val() }, (data) => {})
                }else{
                    $("#infoMessageBox").find("#title").text("Erreur")
                    $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                    $("#infoMessageBox").find('#msg').html(data)
                    $("#infoMessageBox").show(function(){
                        document.body.addEventListener('click', infoBoxCloser, false)
                    })
                }
                $('#formatOverlay').hide()
            })
        }else{
            $.post('../app/php/GSRegionale.php', { 
              type: 'updateGS',
              mat : $('#formatId').val(),
              nom: $("#formatNom").val(),
              prenom: $("#formatPrenom").val(),
              spec: $("#formatSpec").val()}, function (data) {
                if(data == 'success'){
                    $.post('../app/php/GSRegionale.php', { type: 'paramGS'}, function (data) {
                        $('.datasection').html(data)
                    })
                    $.post("../app/php/server.php", { type: "log", ope: "Modification du gestionnaire " +  $('#formatId').val() }, (data) => {})
                }else{
                    $("#infoMessageBox").find("#title").text("Erreur")
                    $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                    $("#infoMessageBox").find('#msg').html(data)
                    $("#infoMessageBox").show(function(){
                        document.body.addEventListener('click', infoBoxCloser, false)
                    })
                }
                $('#formatOverlay').hide()
            })
        }
    }
})

$('#ResetBtn').on('click', () =>{
    $.post('../app/php/gestionStg.php', { type: 'paramResetPass', mat : $('#formatId').val()}, function (data) {
        if(data == 'success'){
            $("#infoMessageBox").find("#title").text("Confirmation")
            $("#infoMessageBox").find("#title").css({"color":"#2D3368"})
            $("#infoMessageBox").find('#msg').text('Mot de passe réinitialisée avec succès')
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
            $.post("../app/php/server.php", { type: "log", ope: "Réinitialisation du mot de passe de " +  $('#formatId').val() }, (data) => {})
        }else{
            $("#infoMessageBox").find("#title").text("Erreur")
            $("#infoMessageBox").find("#title").css({"color":"#D03425"})
            $("#infoMessageBox").find('#msg').html(data)
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
        }
        $('#formatOverlay').hide()
    })
})

$('#ValiderGrpBtn').on('click', () =>{
    if($("#ValiderGrpBtn").val() == 'Ajouter'){
        $.post('../app/php/gestionStg.php', { 
          type: 'addG', 
          codeGrp: $('#GroupeCode').val(),
          annee: $('#GroupeAnnee').val(),
          filiere: $('#selectFiliere').val()}, function (data) {
            if(data == 'success add'){
                $.post('../app/php/gestionStg.php', { type: 'paramGroupes'}, function (data) {
                    $('.datasection').html(data)
                })
                $('#addGrpOverlay').hide()
                $.post("../app/php/server.php", { type: "log", ope: "Ajout du groupe " + $('#GroupeCode').val() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }else{
        $.post('../app/php/gestionStg.php', { 
            type: 'updateG', 
            codeGrp: $('#GroupeCode').val(),
            annee: $('#GroupeAnnee').val(),
            filiere: $('#selectFiliere').val()}, function (data) {
              if(data == 'success'){
                  $.post('../app/php/gestionStg.php', { type: 'paramGroupes'}, function (data) {
                      $('.datasection').html(data)
                  })
                  $('#addGrpOverlay').hide()
                  $.post("../app/php/server.php", { type: "log", ope: "Modification du groupe " + $('#GroupeCode').val() }, (data) => {})
              }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                  $("#infoMessageBox").find('#msg').html(data)
                  $("#infoMessageBox").show(function(){
                      document.body.addEventListener('click', infoBoxCloser, false)
                  })
              }
          })
    }
})

$('#ValiderStgBtn').on('click', () =>{
    if($("#ValiderStgBtn").val() == 'Ajouter'){
        $.post('../app/php/gestionStg.php', { 
          type: 'addStg', 
          mat: $("#matriculestg").val(),
          nom: $("#nomstg").val(),
          prenom: $("#prenomstg").val(),
          genre: $("#genrestg").val(),
          naissance: $("#dateNaissancestg").val(),
          tel: $("#telstg").val(),
          groupe: $('#groupestg').val()}, function (data) {
            if(data == 'success add'){
                $.post('../app/php/gestionStg.php', { type: 'paramStagiaires'}, function (data) {
                    $('.datasection').html(data)
                })
                $('#stgOverlay').hide()
                $.post("../app/php/server.php", { type: "log", ope: "Ajout du stagiaire " + $('#GroupeCode').val() }, (data) => {})
            }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
            }
        })
    }else{
        $.post('../app/php/gestionStg.php', { 
            type: 'updateStg', 
            mat: $("#matriculestg").val(),
            nom: $("#nomstg").val(),
            prenom: $("#prenomstg").val(),
            genre: $("#genrestg").val(),
            naissance: $("#dateNaissancestg").val(),
            tel: $("#telstg").val(),
            groupe: $('#groupestg').val()}, function (data) {
              if(data == 'success'){
                $.post('../app/php/gestionStg.php', { type: 'paramStagiaires'}, function (data) {
                    $('.datasection').html(data)
                })
                $.post("../app/php/server.php", { type: "log", ope: "Modification du stagiaire " + $('#GroupeCode').val() }, (data) => {})
              }else{
                $("#infoMessageBox").find("#title").text("Erreur")
                $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                $("#infoMessageBox").find('#msg').html(data)
                $("#infoMessageBox").show(function(){
                    document.body.addEventListener('click', infoBoxCloser, false)
                })
              }
              $('#stgOverlay').hide()
          })
    }
})

$('#inporterStgs').on('change', e => {
    var file = e.target.files[0]
    var name = file.name
    var form_data = new FormData()
    var ext = name.split('.').pop().toLowerCase()
    if(jQuery.inArray(ext, ['xls','xlsx']) == -1){
        $("#infoMessageBox").find("#title").text("Erreur")
        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        $("#infoMessageBox").find('#msg').text('Type de fichier invalide, Sélectionner un fichier Excel s\'il vous plaît')
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
            $("#infoMessageBox").find('#msg').text('La taille du fichier doit être inférieur a 2 Mo')
            $("#infoMessageBox").show(function(){
                document.body.addEventListener('click', infoBoxCloser, false)
            })
        }
        else{
            form_data.append('file', file)
            form_data.append('grp', $('#GroupeCode').val())
            form_data.append('annee', $('#GroupeAnnee').val())
            form_data.append('type', 'listStgUpload')
            $.ajax({
                url:'../app/php/gestionStg.php',
                method:'POST',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success:function(data){
                    if(data != 'success'){
                        $('#addGrpOverlay').hide()
                        $("#infoMessageBox").find('#title').text('Confirmation')
                        $("#infoMessageBox").find("#title").css({"color":"#2D3368"})
                        $("#infoMessageBox").find('#msg').text('Données importée avec succes')
                        $("#infoMessageBox").show(function(){
                            document.body.addEventListener('click', infoBoxCloser, false)
                        })
                        $.post("../app/php/server.php", { type: "log", ope: "Importation de la liste des stagiaires du groupe " + $('#GroupeCode').val() }, (data) => {})
                    }
                }
            })
        }
    }
})

$("#infoMessageBox").find('input[type="button"]').on('click', e => {
    $('#infoMessageBox').hide()
})

function infoBoxCloser(e){
    if(e.target.id == 'infoMessageBox'){
        document.body.removeEventListener('click', infoBoxCloser, false)
        $('#infoMessageBox').hide()
    }
}

function boxCloser(e){
    if(e.target.id == 'formatOverlay'){
        document.body.removeEventListener('click', boxCloser, false)
        $('#formatOverlay').hide()
    }
}

function grpBoxCloser(e){
    if(e.target.parentElement.parentElement.id != 'addMessageBox' && 
    e.target.parentElement.parentElement.parentElement.id != 'addMessageBox' && 
    e.target.parentElement.id != 'addMessageBox' && e.target.id != 'addMessageBox'){
        document.body.removeEventListener('click', grpBoxCloser, false)
        $('#addGrpOverlay').hide()
    }
}

function upGrpBoxCloser(e){
    if(e.target.id == 'updateGrpOverlay'){
        document.body.removeEventListener('click', upGrpBoxCloser, false)
        $('#updateGrpOverlay').hide()
    }
}

function stgBoxCloser(e){
    if(e.target.id == 'stgOverlay'){
        document.body.removeEventListener('click', stgBoxCloser, false)
        $('#stgOverlay').hide()
    }
}
//-------------------------------------------------------

function Active(id){
    $.each($('.content-param__head__btn'), (key, elem) =>{
        if(elem.id == id) elem.classList.add('active')
        else elem.classList.remove('active')
    })
}