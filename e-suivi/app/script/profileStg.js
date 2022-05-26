Chart.elements.Rectangle.prototype.draw = function() {
    var ctx = this._chart.ctx
    var vm = this._view
    var left, right, top, bottom, signX, signY, borderSkipped, radius
    var borderWidth = vm.borderWidth
    var cornerRadius = 20

    if (!vm.horizontal) {
        left = vm.x - vm.width / 2
        right = vm.x + vm.width / 2
        top = vm.y
        bottom = vm.base
        signX = 1
        signY = bottom > top? 1: -1
        borderSkipped = vm.borderSkipped || 'bottom'
    } else {
        left = vm.base
        right = vm.x
        top = vm.y - vm.height / 2
        bottom = vm.y + vm.height / 2
        signX = right > left? 1: -1
        signY = 1
        borderSkipped = vm.borderSkipped || 'left'
    }

    if (borderWidth) {
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
        borderWidth = borderWidth > barSize? barSize: borderWidth
        var halfStroke = borderWidth / 2
        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0)
        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0)
        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0)
        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0)
        if (borderLeft !== borderRight) {
            top = borderTop
            bottom = borderBottom
        }
        if (borderTop !== borderBottom) {
            left = borderLeft
            right = borderRight
        }
    }

    ctx.beginPath()
    ctx.fillStyle = vm.backgroundColor
    ctx.strokeStyle = vm.borderColor
    ctx.lineWidth = borderWidth
    var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ]

    var borders = ['bottom', 'left', 'top', 'right']
    var startCorner = borders.indexOf(borderSkipped, 0)
    if (startCorner === -1) {
        startCorner = 0
    }

    function cornerAt(index) {
        return corners[(startCorner + index) % 4]
    }

    var corner = cornerAt(0)
    ctx.moveTo(corner[0], corner[1])

    for (var i = 1; i < 4; i++) {
        corner = cornerAt(i)
        nextCornerId = i+1
        if(nextCornerId == 4){
            nextCornerId = 0
        }

        nextCorner = cornerAt(nextCornerId)

        width = corners[2][0] - corners[1][0]
        height = corners[0][1] - corners[1][1]
        x = corners[1][0]
        y = corners[1][1]
        
        var radius = cornerRadius
        
        if(radius > height/2){
            radius = height/2
        }if(radius > width/2){
            radius = width/2
        }

        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width - radius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
    }

    ctx.fill()
    if (borderWidth) {
        ctx.stroke()
    }
}

var sanct
var points
var nbrJrs
var todo
var operation

$.post("../app/php/server.php", { type: "profileStgNotes", matStg: $('#matriculeEtudiant').text().substring(2) }, function (data) {
    $("#profileStgNotes").html(data)
})


$('.etatAbs__sanction').on('click', e => {
    if(e.target.id == 'ajSanc'){
        $('#ajoutSanctionOverlay').show(function(){
            document.body.addEventListener('click', ajScBoxCloser, false)
        })
    }else{
        $.post("../app/php/server.php", { type: "listeSanctionOverlay", matStg: $('#matriculeEtudiant').text().substring(2) }, function (data) {
            $("#listeSanctionOverlay").html(data)
        })
        $('#listeSanctionOverlay').show(function(){
            document.body.addEventListener('click', listScBoxCloser, false)
        })
    }
})

$('#validerSanction').on('click', e => {
    if($('.ajout-sanctions-message-box__table input[type=radio]:checked').parent().parent().attr('id') == 'excln')
        sanct = 'excl' + $('#nbrJours').val()
    else
        sanct = $('.ajout-sanctions-message-box__table input[type=radio]:checked').parent().parent().attr('id')
    
        if(sanct == '1mg') {sanct = '1ère mise en garde'; points=1;}
        if(sanct == '2mg') {sanct = '2ème mise en garde'; points=2;}
        if(sanct == '1av') {sanct = '1ère avertissement'; points=3;}
        if(sanct == '2av') {sanct = '2ème avertissement'; points=4;}
        if(sanct == 'blam') {sanct = 'Blâme'; points=5;}
        if(sanct.substring(0, 4) == 'excl'){
            nbrJrs = (sanct.substring(4) == '') ? 0 : sanct.substring(4);
            if(!isNaN(nbrJrs))
                {sanct = 'Exclusion de ' + nbrJrs + ' jours'; points= ($('#pointsAdeduire').val() == '') ? 0 : $('#pointsAdeduire').val();}
        }
        if(sanct == 'excd') {sanct = 'Exclusion définitive'; $points=10;}
    
    $.post("../app/php/gestionStg.php", 
        { type: "ajoutSanction", 
        matriculeEtudiant: $('#matriculeEtudiant').text().substring(2),
        Sanctions: sanct,
        ptsDeduire: points}, 
        function (data) {
            if(data == 'err') alert('insere le nombre des jours')
            else {
                $.post("../app/php/server.php", { type: "profileStgNotes", matStg: $('#matriculeEtudiant').text().substring(2) }, function (data) {
                    $("#profileStgNotes").html(data)
                })
                $('#ajoutSanctionOverlay').hide()
                $.post("../app/php/server.php", { type: "log", ope: "Sanction de "+$('#fullname').text()+" par " + sanct }, (data) => {})
                //console.log(data)
            }
        }
    )
})

$('.justifCheck').on('change', e => {
    todo = (e.target.checked) ? 'justif' : 'nonjustif'
    $.post("../app/php/gestionStg.php", 
        { type: "justification", seance : e.target.id, action : todo, 
        matriculeEtd: $('#matriculeEtudiant').text().substring(2)}, 
        function (data) {
            if(data == 'err') alert('err')
            else {
                $.post("../app/php/server.php", { type: "profileStgNotes", matStg: $('#matriculeEtudiant').text().substring(2) }, function (data) {
                    $("#profileStgNotes").html(data)
                })
                if(todo == 'justif')
                    operation = "Justification d'absence"
                else operation = "Annule la justification d'absence"
                operation += " du "+$('#fullname').text()+" pour la seance N: " + e.target.id
                $.post("../app/php/server.php", { type: "log", ope: operation}, (data) => {})
            }
        }
    )
})

function ajScBoxCloser(e){
    if(e.target.id == 'ajoutSanctionOverlay'){
        document.body.removeEventListener('click', ajScBoxCloser, false)
        $('#ajoutSanctionOverlay').hide()
        $('.checkSanction').prop('checked', false); 
    }
}

function listScBoxCloser(e){
    if(e.target.id == 'listeSanctionOverlay'){
        document.body.removeEventListener('click', listScBoxCloser, false)
        $('#listeSanctionOverlay').hide()
    }
}