$("#ajoutSeance").on("click", () =>{
    if($("#filtersAjSc").hasClass("slideup")){
        $("#filtersAjSc").removeClass("slideup").addClass("slidedown")
        $("#suivant1").removeClass("fade-in").addClass("fade-out")
        $("#ajoutSeance").css({'background-image': 'url(../img/assets/minus-icon.svg)'})
        $("#seance").prop('selectedIndex', 4)
    }
    else{
        $("#filtersAjSc").removeClass("slidedown").addClass("slideup")
        $("#suivant1").removeClass("fade-out").addClass("fade-in")
        $("#ajoutSeance").css({'background-image': 'url(../img/assets/plus-icon.svg)'})
        $("#seance").prop('selectedIndex', 0)
    }
})

date = new Date()
date = date.getFullYear() + '-' 
+ String(date.getMonth() + 1).padStart(2, '0') + '-' 
+ String(date.getDate()).padStart(2, '0')
$("#date").attr("max", date)

$(".suivant").on("click", () => {

    values()
    if(Date.parse("1-1-2000 " + $("#hdebut").val()) < Date.parse("1-1-2000 " + $("#hfin").val())){
        $.post("../app/php/server.php", 
            { type: "listeAbsences", jour: date, codeGrp: $("#groupe").val(), 
            codeMod: $("#module").val(), hdebut: $("#hdebut").val(), 
            hfin: $("#hfin").val()}, data => {
                if(data.slice(0,5) == "ERROR"){
                    $("#infoMessageBox").find("#title").text("Erreur")
                    $("#infoMessageBox").find("#title").css({"color":"#D03425"})
                    $("#infoMessageBox").find('#msg').html(data)
                    $("#infoMessageBox").show(function(){
                        document.body.addEventListener('click', infoBoxCloser, false)
                    })
                    $(".datasection").html('')
                }
                else{
                    $(".datasection").html(data)
                }
            }
        )
    }else {
        $("#infoMessageBox").find("#title").text("Erreur")
        $("#infoMessageBox").find("#title").css({"color":"#D03425"})
        $("#infoMessageBox").find('#msg').html('intervale du temp est incorrecte')
        $("#infoMessageBox").show(function(){
            document.body.addEventListener('click', infoBoxCloser, false)
        })
        $(".datasection").html('')
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

$("#seance").on("change", () => {
    if($("#seance").val() == "new"){
        $("#filtersAjSc").removeClass("plus")
        $("#ajoutSeance").css({'background-image': 'url(../img/assets/minus-icon.svg)'})
    }else{
        $("#filtersAjSc").addClass("plus")
        $("#ajoutSeance").css({'background-image': 'url(../img/assets/plus-icon.svg)'})
    }
})

getDetail($("#groupe").val())

$('#groupe').on('change', e => {
    getDetail()
})

function getDetail(){
    values()
    $.post("../app/php/server.php", { type: "modulesGrp", 
      grp: $("#groupe :selected").val() }, function (data) {
        $("#module").html(data)
    })
}

function values(){
    if($("#seance").val() == "1"){
        $("#hdebut").val("08:30")
        $("#hfin").val("11:00")
    }
    if($("#seance").val() == "2"){
        $("#hdebut").val("11:00")
        $("#hfin").val("13:30")
    }
    if($("#seance").val() == "3"){
        $("#hdebut").val("13:30")
        $("#hfin").val("16:00")
    }
    if($("#seance").val() == "4"){
        $("#hdebut").val("16:00")
        $("#hfin").val("18:30")
    }
    if($("#seance").val() == "new")
        date = $("#date").val()
    else {
        date = new Date()
        date = date.getFullYear() + '-' 
        + String(date.getMonth() + 1).padStart(2, '0') + '-' 
        + String(date.getDate()).padStart(2, '0')
    }
}