$(".etatCheck").on("change", e => {
    var row = e.target.parentElement.parentElement
    var action = (e.target.checked) ? "activer" : "desactiver"
    
    $.post("../app/php/gestionStg.php", { type: "etatDesSeances", 
        hdebut: $(row).find("#hdebut").text(),
        matricule: $(row).find("#mat").text(),
        hfin: $(row).find("#hfin").text(),
        action: action}, function (data) {
            updateValue()
    })
})