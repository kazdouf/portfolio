<?php
    include 'connection.php';
    session_start();
  
    if(isset($_SESSION['LAST_ACTIVITY'])){

        if(time() - $_SESSION['LAST_ACTIVITY'] < 900){
            $personnel = $_SESSION['logedPersonnel'];

            if($personnel['titre'] == 'CSRIO'){

                if($_POST['type'] == "listEFP"){
                    
                    echo '
                        <header class="gsrio-header">
                            <nav class="flex flex-ai-c flex-jc-sb">
                                <div class="gsrio-header__logo flex flex-ai-c">Gestion des Absences</div>
                                <div id="profile" class="gsrio-nav-link flex" title="profile">
                                    <div id="navLinkPic" class="gsrio-nav-link__img"></div>
                                    <div class="gsrio-nav-link__user flex flex-dc flex-jc-c">
                                        <div id="username" class="gsrio-nav-link__user__name"></div>
                                        <div id="title" class="gsrio-nav-link__user__titre"></div>
                                    </div>
                                    <img src="../img/assets/arrow-down.svg" alt="arrow" />
                                </div>
                            </nav>
                        </header>

                        <div id="detailsProfile" class="dropdown-menu flex flex-dc flex-jc-c" title="profile details" hidden>
                            <div class="dropdown-menu__infos flex flex-dc flex-jc-c">
                                <div id="username" class="nav-link__user__dropname"></div>
                                <div id="title" class="nav-link__user__droptitre"></div>
                            </div>
                            <div class="dropdown-menu__controls flex flex-dc flex-jc-c">
                                <input id="profileSettings" class="dropdown-menu__controls__profile" type="button" value="Profile">
                                <input id="deconnection" class="dropdown-menu__controls__deconnect" type="button" value="Se Déconnecter">
                            </div>
                        </div>

                        <!--<div id="infoMessageBox" class="overlay" hidden>
                            <div class="info-message-box">
                                <div class="info-message-box__title">Erreur</div>
                                <div id="msg" class="info-message-box__message hide-scrollbar"></div>
                                <div class="info-message-box__btns flex">
                                    <input class="info-message-box__btn" type="button" value="OK">
                                </div>
                            </div>
                        </div>-->

                        <div id="EFPOverlay" class="overlay" hidden>
                            <div id = "addMessageBox" class="add-message-box">

                                <div class="add-message-box__title"></div>

                                <div class="add-message-box__form flex flex-jc-sb flex-dc">
                            
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Code</div>
                                        <input id="EFPId" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Nom</div>
                                        <input id="EFPNom" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-ai-c flex-jc-sb">
                                        <div class="add-message-box__form__row__label"></div>
                                        <input id="validEFPBtn" class="add-message-box__formbtn" type="button" value="Valider">
                                    </div>
                    
                                </div>
                            </div>
                        </div>

                        <section class="gsrio-content flex flex-dc" id="gsrioContent">

                            <div class="entry-blocks filters__search">
                                <input class="entry" type="text" placeholder="Recherche" id="search">
                            </div>
                            <div class="gsrio-container flex flex-dc"></div>
                        </section>
                        
                        
                        <script defer type="text/javascript" src="../app/script/app.js"></script>
                        <script defer type="text/javascript" src="../app/script/gsr/gsr.js"></script>
                    ';
                }

                if($_POST['type'] == 'listEFPsearch'){
                    $sql = "SELECT DISTINCT ville, COUNT(*) AS nbr FROM etablissement 
                    WHERE codeDR = (SELECT codeDR FROM personnel WHERE codeEFP=? LIMIT 1) GROUP BY ville ORDER BY ville";
                    if(isset($_POST['key'])){
                        $key = $_POST['key'];
                        $sql = "SELECT DISTINCT ville, COUNT(*) AS nbr FROM etablissement 
                        WHERE codeDR = (SELECT codeDR FROM personnel WHERE codeEFP=? LIMIT 1) 
                        AND ville LIKE '%$key%' OR codeEFP LIKE '%$key%' GROUP BY ville ORDER BY ville";
                    }
                    $req = $connection->prepare($sql);
                    $req->execute(array($personnel['codeEFP']));

                    while($result = $req->fetch()) {
                        echo '
                            <div class="gsrio-container__ville__title flex flex-ai-c flex-jc-sb">' . $result['ville'] . ' (' . $result['nbr'] . ')</div>
                                <div class="gsrio-container__ville">';

                        $req1 = $connection->prepare("SELECT DISTINCT * FROM etablissement WHERE ville=?");
                        $req1->execute(array($result['ville']));
                        
                        while($result1 = $req1->fetch()) {
                            echo '
                                <div class="gsrio-container__ville__efp flex flex-ai-c">
                                    <img class="gsrio-container__ville__efp__img" src="../img/assets/efp-icon.svg">
                                    <div class="gsrio-container__ville__efp__infos">
                                        <div id="codeEFP" class="gsrio-container__ville__efp__infos__code">' . $result1['codeEFP'] . '</div>
                                        <div class="gsrio-container__ville__efp__infos__code">' .$result1['ville'] . '</div>
                                    </div>
                                </div>
                            ';
                        }

                        echo '<div>
                                <div class="gsrio-container__ville__efp flex flex-dc flex-ai-c flex-jc-c">
                                    <img class="gsrio-container__ville__efp__plus__img" src="../img/assets/plus-thick-icon.svg">
                                    <div class="gsrio-container__ville__efp__plus">ajouter un établissement</div>
                                    <div id="add" hidden>' .$result['ville'] . '</div>
                                </div>
                            </div>
                        </div>
                        ';
                    }
                    echo '<script src="../app/script/gsr/rechercheListeEfp.js"></script>';
                }

                if($_POST['type'] == 'GSRHome'){
                    $_SESSION['codeEFP'] = $_POST['codeEFP'];
                    echo '
                        <div class="slide-bar flex flex-dc">
                            <div class="flex flex-ai-c" onclick="javascript:GSRHome()">Gestion des Absences</div>
                            <div class="link" onclick="javascript:GSHome()">Accueil</div>
                            <div class="link" onclick="javascript:Absence()">Absences</div>
                            <div class="link" onclick="javascript:Etudiants()">Stagiaires</div>
                            <div class="link" onclick="javascript:Messagerie()">Messagerie</div>
                            <div class="link" onclick="javascript:Imprimer()">Imprimer</div>
                            <div class="link" onclick="javascript:Notes()">Notes</div>
                            <div class="link" onclick="javascript:Parametre()">Paramètres</div>
                        </div>
                        <header class="header">
                            <nav class="flex flex-ai-c">
                                <div class="menu-btn flex flex-jc-c flex-ai-c">
                                    <div class="menu-btn__burger"></div>
                                </div>
                                <div id="messages" class="nav-link" title="messages"></div>
                                <div id="notifications" class="nav-link" title="notifications"></div>
                                <div id="profile" class="nav-link flex" title="profile">
                                    <div id="navLinkPic" class="nav-link__img"></div>
                                    <div class="nav-link__user flex flex-dc flex-jc-c">
                                        <div id="username" class="nav-link__user__name"></div>
                                        <div id="title" class="nav-link__user__titre"></div>
                                    </div>
                                    <img src="../img/assets/arrow-down.svg" alt="arrow" />
                                </div>
                            </nav>
                        </header>
                        
                        <div id="detailsProfile" class="dropdown-menu flex flex-dc flex-jc-c" title="profile details">
                            <div class="dropdown-menu__infos flex flex-dc flex-jc-c">
                                <div id="username" class="nav-link__user__dropname"></div>
                                <div id="title" class="nav-link__user__droptitre"></div>
                            </div>
                            <div class="dropdown-menu__controls flex flex-dc flex-jc-c">
                                <input id="profileSettings" class="dropdown-menu__controls__profile" type="button" value="Profile">
                                <input id="deconnection" class="dropdown-menu__controls__deconnect" type="button" value="Se Déconnecter">
                            </div>
                        </div>
                    
                        <div id="newMessages" class="dropdown-menu-messages hide-scrollbar flex flex-dc"></div>
                    
                        <div id="newNotifications" class="dropdown-menu-notifications hide-scrollbar flex flex-dc"></div>

                        <section id="gsrioContent" class="content">
                        </section>

                        <script defer type="text/javascript" src="../app/script/app.js"></script>
                    ';
                }

                if($_POST['type'] == "paramGS"){
                    
                    $req = $connection->prepare("SELECT p.*, CONCAT(p.nom, ' ', p.prenom) AS `fullname` 
                    FROM personnel p WHERE codeEFP=? AND titre='GS'");
                    $req->execute(array($_SESSION['codeEFP']));
                    
                    echo '
                        <table class="datasection__datatable" style="table-layout: auto">
                            <thead class="datasection__datatable__head">
                                <th>Matricule</th>
                                <th>Nom et Prénom</th>
                                <th>Spécialité</th>
                            </thead>
                        <tbody id="formatTableBody">';
                    while($result = $req->fetch()){
                        echo '<tr>
                            <td id="mat">' . $result['matricule'] . '</td>
                            <td>' . $result['fullname'] . '</td>
                            <td>' . $result['specialite'] . '</td>
                            <td class="param-delete"></td>
                        </tr>';
                    }
                    echo '</tbody>
                    </table>
                    <script src="../app/script/gsr/paramGS.js"></script>';
                }

                if($_POST['type'] == "addEFP"){
                    $req = $connection->prepare("SELECT * FROM etablissement WHERE codeEFP=?");
                    $req->execute(array($_POST['codeEFP']));
                    if($req->rowCount() > 0){
                        echo 'err Code établissement déjà existant; veuillez choisir un autre code !!';
                    }else{
                        $req = $connection->prepare("SELECT codeDR FROM etablissement WHERE codeEFP=?");
                        $req->execute(array($personnel['codeEFP']));
                        $result = $req->fetch();
                        $codeDr = $result['codeDR'];
                        $req = $connection->prepare("INSERT INTO etablissement VALUES (?,?,?,?)");
                        $req->execute(array($_POST['codeEFP'], $_POST['nomEFP'], $_POST['ville'], $codeDr));
                        echo 'succes';
                    }
                }

                if($_POST['type'] == "addGS"){
                    if(isset($_POST['mat']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['spec'])){
                        $mat = $_POST['mat'];
                        $nom = $_POST['nom'];
                        $prenom = $_POST['prenom'];
                        $spec = $_POST['spec'];
                        if($mat != "" && $nom != "" && $prenom != "" && $spec != ""){
                            $req = $connection->prepare("INSERT INTO personnel(matricule, nom, prenom, titre, specialite, motdepass, codeEFP) VALUES (?,?,?,?,?,?,?)");
                            if($personnel['titre'] == 'CSRIO'){
                                $req->execute(array($mat,$nom, $prenom, "GS", $spec, $mat, $_SESSION['codeEFP']));
                            }
                            echo 'success add';
                        }else echo 'ERROR: Veuillez remplir tous les champs';
                    }else echo 'not set';
                }

                if($_POST['type'] == "updateGS"){
                    if($_POST['matricule'] != '' && $_POST['nom'] != '' && $_POST['prenom'] != '' && $_POST['spec'] != ''){
                        $req = $connection->prepare("UPDATE personnel SET matricule=?, nom=?, prenom=?, specialite=? WHERE matricule=?");
                        if($req->execute(array($_POST['matricule'], $_POST['nom'], $_POST['prenom'], $_POST['spec'])))
                            echo 'success';
                        else echo 'modification échouée';
                    }else
                        echo 'ERROR: Veuillez remplir tous les champs';
                }

                if($_POST['type'] == "deleteGS"){
                    if(isset($_POST['mat'])){
                        $mat = $_POST['mat'];
                        $req = $connection->prepare("DELETE FROM personnel WHERE matricule=?");
                        $req->execute(array($mat));
                        echo 'success delete';
                    }else echo 'ERROR: not set';
                }

            } else
                echo 'notGSR';

            $_SESSION['LAST_ACTIVITY'] = time();
        }else echo 'session ech';
    }else
        echo 'notConnected';
    