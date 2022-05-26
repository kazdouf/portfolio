<?php
    include 'connection.php';
    session_start();
    
    if(isset($_SESSION['LAST_ACTIVITY'])){
        
        if((time() - $_SESSION['LAST_ACTIVITY']) < 900){
            $personnel = $_SESSION['logedPersonnel'];
            $codeEFP = ($personnel['titre'] == 'CSRIO') ? (isset($_SESSION['codeEFP'])) ? $_SESSION['codeEFP'] : $personnel['codeEFP'] : $personnel['codeEFP'];

            if(isset($_POST['type'])){

                if($_POST['type'] == "logInfo"){
                    $req = $connection->prepare("SELECT * FROM personnel WHERE matricule=?");
                    $req->execute([$_SESSION['logedPersonnel']['matricule']]);
                    $result = $req->fetch();            
                    if($result) {
                        $_SESSION['logedPersonnel'] = $result;
                        echo json_encode($result);
                    }
                }

                if($_POST['type'] == "profileSettings"){

                    echo '
                        <div class="overlay" hidden>
                            <div class="update-message-box">
                                <div class="update-message-box__title">Enregistrer les modifications</div>
                                <div class="update-message-box__btns flex flex-jc-sb">
                                    <input class="update-message-box__btn" type="button" value="Annuler" id="confirmSupp">
                                    <input class="update-message-box__btn" type="button" value="Enregistrer" id="annuleSupp">
                                </div>
                            </div>
                        </div>

                        <div class="content__title profile-container__content__title">Paramètres du compte</div>

                        <section class="profile-container">
                
                            <img id="profileSettingsPic" class="profile-container__photo"/>
                            
                            <label for="modifierImgBtn" class="profile-container__photobtn">Changer la photo de profile</label>
                            <input id="modifierImgBtn" type="file" name="file" accept="image/x-png,image/jpg,image/jpeg" hidden>
                
                            <div class="profile-container__form">
                
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Nom</div>
                                    <input id="nom" type="text" class="profile-container__form__row__input" value="'.$personnel['nom'].'">
                                </div>
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Prénom</div>
                                    <input id="prenom"  type="text" class="profile-container__form__row__input" value="'.$personnel['prenom'].'">
                                </div>
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Titre</div>
                                    <input id="titre"  type="text" class="profile-container__form__row__input" value="'.$personnel['titre'].'" disabled>
                                </div>
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Spécialité</div>
                                    <input id="spec" type="text" class="profile-container__form__row__input" value="'.$personnel['specialite'].'">
                                </div>
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Matricule</div>
                                    <input id="mat" type="text" class="profile-container__form__row__input" value="'.$personnel['matricule'].'" disabled>
                                </div>
                                <div class="profile-container__form__row flex flex-jc-sb flex-ai-c">
                                    <div class="profile-container__form__row__label">Mot de passe</div>
                                    <input id="pass" type="password" class="profile-container__form__row__input" value="'.$personnel['motdepass'].'">
                                    <i class="profile-container__form__row__eye-icon"></i>
                                </div>
                
                            </div>
                            <div  class="profile-container__formbtn-container flex flex-ai-c flex-jc-c">
                                <input  class="profile-container__formbtn" id="modifierInfosBtn" name="save" type="button" value="Modifier les information du profile">
                            </div>
                            
                        </section>

                        <script src="../app/script/profileSettings.js"></script>
                    ';
                }

                if($_POST['type'] == "imageUpload"){
                    //upload.php
                    if($_FILES["file"]["name"] != ''){

                        try{
                            $image = $_FILES["file"];
                            $imageName = $image['name'];
                            $imageTmpName = $image['tmp_name'];
                            $explodeName = explode('.', $imageName);
                            $ext = end($explodeName);
                            $name = $personnel['matricule'] . '.' . $ext;
                            $location = '../../img/personnelProfiles/' . $name;  
                            move_uploaded_file($imageTmpName, $location);

                            $req = $connection->prepare("UPDATE `personnel` SET `image`=? WHERE `matricule` = ?");
                            $req->execute(array($name, $personnel['matricule']));

                            echo 'success';
                        }catch(Exception $ex){
                            echo 'ERROR: ' . $ex->getMessage();
                        }

                    }else echo 'Fichier vide';
                }

                if($_POST['type'] == "profileEnreg"){
                    if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['spec']) && isset($_POST['pass'])){
                        try{
                            $req = $connection->prepare("UPDATE `personnel` SET nom=?, prenom=?, specialite=?, motdepass=? WHERE `matricule` = ?");
                            $req->execute(array($_POST['nom'], $_POST['prenom'], $_POST['spec'], $_POST['pass'], $personnel['matricule']));
                            echo 'succes';
                        }catch(Exception $e){
                            echo 'ERROR: ' . $e->getMessage();
                        }
                    }
                }

                if($_POST['type'] == "absence"){
                    echo '
                        <div class="content__title">Ajouter Absences</div>

                        <section class="filters">
                
                            <div class="filters__primary">
                
                                <div class="entry-blocks filters__groupe">
                                    <div class="labels">Groupe</div>
                                    <select class="entry" name="groupe" id="groupe">';

                                        if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                            $req = $connection->prepare("SELECT codeGroupe FROM groupe WHERE codeEFP=?");
                                            $req->execute(array($codeEFP));
                                        }
                                        if($personnel['titre'] == "Formateur"){
                                            $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ?");
                                            $req->execute(array($personnel['matricule']));
                                        }
                                        while($result = $req->fetch()) {
                                            echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                        }
                    
                                    echo '</select>
                                </div>
                                <div class="entry-blocks filters__seance">
                                    <div class="labels">Séance</div>
                                    <select class="entry" name="seance" id="seance">
                                        <option value="1">1ère  de 08:30 à 11:00</option>
                                        <option value="2">2ème de 11:00 à 13:30</option>
                                        <option value="3">3ème de 13:30 à 16:00</option>
                                        <option value="4">4ème de 16:00 à 18:30</option>
                                        <option value="new">nouvelle séance</option>
                                    </select>
                                </div>
                                <div class="entry-blocks filters__module">
                                    <div class="labels">Module</div>
                                    <select class="entry" name="module" id="module"></select>
                                </div>
                
                            </div>
                            
                            <div class="flex flex-ai-c flex-jc-sb">
                                <div id="ajoutSeance" class="filters__seancebtn">Ajouter une séance</div>
                                <input class="entry suivant" id="suivant1" type="button" value="suivant"/>
                            </div>
                            
                            <div id="filtersAjSc" class="filters__ajseance slideup">
                
                                <div class="entry-blocks filters__ajseance__date">
                                    <div class="labels">Date</div>
                                    <input class="entry" type="date" name="dateSeance" id="date">
                                </div>
                
                                <div class="entry-blocks filters__ajseance__hdebut">
                                    <div class="labels">Heure Debut</div>
                                    <input class="entry" type="time" name="hdebut" id="hdebut">
                                </div>
                
                                <div class="entry-blocks filters__ajseance__hfin">
                                    <div class="labels">Heure Fin</div>
                                    <input class="entry" type="time" name="hfin" id="hfin">
                                </div>
                                <!-- la place de deuxieme module -->
                                <input class="entry suivant" id="suivant2" type="button" value="suivant"/>
                            
                            </div>
                
                        </section>
                
                        <section class="datasection">
                            
                        </section>
                        
                        <script src="../app/script/absences.js"></script>
                    ';
                }

                if($_POST['type'] == "modulesGrp"){
                    
                    if($personnel['titre'] == "GS" || $personnel['titre'] == "CSRIO"){
                        $req = $connection->prepare("SELECT * FROM module m JOIN module_filiere mf ON (m.codeModule=mf.codeModule) 
                        WHERE mf.codeFiliere=(SELECT codeFiliere FROM groupe WHERE codeGroupe=?)");
                        $req->execute(array($_POST['grp']));
                    }

                    if($personnel['titre'] == "Formateur"){
                        $req = $connection->prepare("SELECT DISTINCT * FROM affectation a JOIN module m ON (a.codeModule = m.codeModule) 
                        WHERE a.codeGroupe=? AND a.matricule = ?");
                        $req->execute(array($_POST['grp'], $personnel['matricule']));
                    }

                    while($result = $req->fetch()) {
                        echo '<option value="'.$result['codeModule'].'">'.$result['nomModule'].'</option>';
                    }
                    
                }

                if($_POST['type'] == "listeAbsences"){

                    if(isset($_POST['jour']) && isset($_POST['codeGrp']) && isset($_POST['hdebut']) && isset($_POST['hfin'])){

                        if($_POST['jour'] != "" && $_POST['codeGrp'] != "" && $_POST['hdebut'] != "" && $_POST['hfin'] != ""){

                            $intersect = false;
                            $req = $connection->prepare("SELECT * FROM seance s JOIN affectation af ON (s.codeAffectation=af.codeAffectation) 
                            WHERE jour=? AND codeGroupe=? AND active=b'1'");
                            $req->execute(array($_POST['jour'], $_POST['codeGrp']));
                            while($result = $req->fetch()) {
                                $intersect = ((strtotime($result['heurDebut']) < strtotime($_POST['hdebut']) && strtotime($_POST['hdebut']) < strtotime($result['heurFin'])) || 
                                (strtotime($_POST['hfin']) > strtotime($result['heurDebut']) && strtotime($_POST['hfin']) < strtotime($result['heurFin']))) ? true : false;
                            }

                            if(!$intersect){
                                echo '
                                <div class="grpList">

                                    <div class="grpList__head">
                                        <div class="grpList__head__infos">
                                            <div class="grpList__head__column">CEF</div>
                                            <div class="grpList__head__column">Nom et Prénom</div>
                                            <div class="grpList__head__column">Absence</div>
                                        </div>
                                    </div>
                                ';
                                
                                $sql = "SELECT * FROM seance s JOIN affectation aff ON (s.codeAffectation=aff.codeAffectation) 
                                WHERE codeGroupe = ? AND (jour = ? AND heurDebut = ? AND heurFin = ?) ";

                                if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                    $sql .= "AND matricule IN (SELECT matricule FROM personnel WHERE codeEFP=?)";
                                    $req = $connection->prepare($sql);
                                    $req->execute(array($_POST['codeGrp'], $_POST['jour'], $_POST['hdebut'], $_POST['hfin'],$codeEFP));
                                }
                                
                                if($personnel['titre'] == "Formateur"){
                                    $sql .= "AND matricule = ?";
                                    $req = $connection->prepare($sql);
                                    $req->execute(array($_POST['codeGrp'], $_POST['jour'], $_POST['hdebut'], $_POST['hfin'], $personnel['matricule']));
                                }
                                
                                if($req->rowCount() > 0){
                                    $result = $req->fetch();
                                    $req = $connection->prepare("SELECT matriculeEtudiant, concat(nom, ' ', prenom) AS `fullName`,
                                    (SELECT COUNT(*) FROM absence a JOIN seance s ON (a.codeSeance=s.codeSeance) WHERE matriculeEtd = matriculeEtudiant AND s.codeSeance = ?) AS `absent`
                                    FROM stagiaire WHERE codeGroupe = ?");
                                    $req->execute(array($result['codeSeance'], $_POST['codeGrp']));
                                    while($result = $req->fetch()) {
                                        echo '
                                            <div class="grpList__row">
                                                <div class="grpList__row__infos">
                                                    <div class="grpList__row__column">' . $result['matriculeEtudiant'] . '</div>
                                                    <div class="grpList__row__column">' . $result['fullName'] . '</div>
                                                    <div class="grpList__row__column flex flex-ai-c">';
                                                    if($result['absent'] > 0)
                                                        echo '<input id="check" type="checkbox" name="absence" checked>';
                                                    else
                                                        echo '<input id="check" type="checkbox" name="absence">';
                                                    echo '<label for="check"> Absent(e)</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ';
                                    }

                                    if($personnel['titre'] == "Formateur"){
                                        echo '</div><script>
                                            $(".grpList").css({ opacity: .7})
                                            $(".grpList__row, .grpList__head").css({ "border-color": "rgba(240,241,243,1)"})
                                            $("#valider").css({ display: "none"})
                                        </script>';
                                    }
                                    
                                }else{
                                    $req = $connection->prepare("SELECT *, concat(nom, ' ', prenom) AS `fullName` FROM stagiaire WHERE codeGroupe = ?");
                                    $req->execute(array($_POST['codeGrp']));
                                    while($result = $req->fetch()) {
                                        echo '<div class="grpList__row">
                                                <div class="grpList__row__infos">
                                                    <div class="grpList__row__column">' . $result['matriculeEtudiant'] . '</div>
                                                    <div class="grpList__row__column">' . $result['fullName'] . '</div>
                                                    <div class="grpList__row__column flex flex-ai-c">
                                                        <input id="check" type="checkbox" name="absence">
                                                        <label for="check"> Absent(e)</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ';
                                    }
                                }
                                echo '
                                    <div colspan="3"><input class="entry" type="button" value="Valider" id="valider"></div>
                                </div>
                                <script src="../app/script/listeAbsences.js"></script>';
                            }else echo 'ERROR: intersect';

                        }else echo 'ERROR: veuillez remplir tous les champs';

                    }else echo 'ERROR: post data';
                }

                if($_POST['type'] == "valider"){
                    
                    if(isset($_POST['jour']) && isset($_POST['hdebut']) && isset($_POST['hfin']) && isset($_POST['codeGrp']) && isset($_POST['codeMod'])){
                        
                        $error = true;
                        if($personnel['titre'] == 'Formateur'){
                            $req = $connection->prepare("SELECT * FROM seance s JOIN affectation aff ON (s.codeAffectation=aff.codeAffectation) 
                            WHERE (jour = ? AND heurDebut = ? AND heurFin = ?) AND codeGroupe = ?");
                            $req->execute(array($_POST['jour'], $_POST['hdebut'], $_POST['hfin'], $_POST['codeGrp']));
                            if($req->rowCount() == 0){
                                $req = $connection->prepare("SELECT codeAffectation FROM affectation WHERE matricule=? AND codeGroupe=? AND codeModule=?");
                                $req->execute(array($personnel['matricule'], $_POST['codeGrp'], $_POST['codeMod']));
                                $result = $req->fetch();
                                $codeAffectation = $result['codeAffectation'];

                                $req = $connection->prepare("INSERT INTO seance (jour, heurDebut, heurFin, codeAffectation) VALUES (?,?,?,?)");
                                if($req->execute(array($_POST['jour'], $_POST['hdebut'], $_POST['hfin'], $codeAffectation))){
                                    if(isset($_POST['checked'])){
                                        $req = $connection->prepare("SELECT * FROM seance 
                                        WHERE  jour = ? AND heurDebut = ? AND heurFin = ? AND codeAffectation = ?");
                                        $req->execute(array($_POST['jour'], $_POST['hdebut'], $_POST['hfin'], $codeAffectation));
                                        $result = $req->fetch();
                                        if($req->rowCount() > 0){
                                            $sql = "INSERT INTO absence (codeSeance, matriculeEtd) VALUES ";
                                            foreach ($_POST['checked'] as $value) {
                                                $sql .= "( " . $result['codeSeance'] . "," . $value['mat'] . "),";
                                            }
                                            $sql = rtrim($sql, ',');
                                            if($connection->exec($sql)) {$error=false; echo 'inserted';}
                                            else echo 'insert error';
                                        } else echo 'seance inconnue';
                                    }
                                }
                            }else echo 'La séance a été déjà validé';
                        }

                        if($personnel['titre'] == 'GS'){
                            $req = $connection->prepare("SELECT codeAffectation FROM affectation 
                            WHERE matricule IN(SELECT matricule FROM personnel WHERE codeEFP=?) AND codeGroupe=? AND codeModule=? LIMIT 1");
                            $req->execute(array($codeEFP, $_POST['codeGrp'], $_POST['codeMod']));
                            if($req->rowCount() == 0){
                                echo 'Veuillez affecter la séance à un formateur avant insèrent les absences';
                            }else{
                                $result = $req->fetch();
                                $codeAffectation = $result['codeAffectation'];
        
                                $req = $connection->prepare("SELECT * FROM seance WHERE jour = ? AND heurDebut = ? AND heurFin = ? AND codeAffectation = ?");
                                $req->execute(array($_POST['jour'], $_POST['hdebut'], $_POST['hfin'], $codeAffectation));
                                $result = $req->fetch();
                                $codeSeance = $result['codeSeance'];

                                if(isset($_POST['checked'])){
                                    //delete the old absence records
                                    $req = $connection->prepare("DELETE FROM absence WHERE codeSeance=?");
                                    $req->execute(array($codeSeance));
                                            
                                    //addin all the new checked students
                                    foreach ($_POST['checked'] as $value) {
                                        $req = $connection->prepare("SELECT * FROM absence WHERE (matriculeEtd=? AND codeSeance=?)");
                                        $req->execute(array($value['mat'], $codeSeance));
                                        if($req->rowCount() == 0){
                                            $sql = "INSERT INTO absence (codeSeance, matriculeEtd) VALUES ";
                                            foreach ($_POST['checked'] as $value) {
                                                $sql .= "( " . $codeSeance . "," . $value['mat'] . "),";
                                            }
                                            $sql = rtrim($sql, ',');
                                            if($connection->exec($sql)) {$error=false; echo 'inserted';}
                                            else echo 'insert error';
                                        }
                                    } 
                                }else echo 'seance inconnue';
                            }
                        }

                        if(!$error){
                            foreach ($_POST['checked'] as $value) {
                                $req = $connection->prepare("SELECT * FROM absence WHERE matriculeEtd=?");
                                $req->execute(array($value['mat']));
                                $nbabs = $req->rowCount();
                                if($nbabs >= 2 && $nbabs < 4) $notif = '1ère mise en garde';
                                if($nbabs >= 4 && $nbabs < 6) $notif = '2ème mise en garde';
                                if($nbabs >= 6 && $nbabs < 8) $notif = '1ère avertissement';
                                if($nbabs >= 8 && $nbabs < 10) $notif = '2ème avertissement';
                                if($nbabs >= 10 && $nbabs < 12) $notif = 'Blâme';
                                if($nbabs >= 12 && $nbabs < 14) $notif = 'exclusion de 2 jours';
                                if($nbabs >= 14 && $nbabs < 20) $notif = 'conseil discipline';
                                if($nbabs >= 20) $notif = 'exclusion définitive';
                                if($nbabs >= 2){
                                    $req = $connection->prepare("SELECT * FROM `notification` WHERE matriculeEtd=? AND `notification`=?");
                                    $req->execute(array($value['mat'], $notif));
                                    if($req->rowCount() == 0){
                                        $req = $connection->prepare("INSERT INTO `notification`(`notification`, matriculeEtd) VALUES (?,?)");
                                        $req->execute(array($notif, $value['mat']));
                                    }
                                }
                            }
                        }

                    }else echo 'veuillez remplir tous les champs obligatoires'; 

                }
            

                if($_POST['type'] == "etudiants"){
                    echo '
                        <div class="flex flex-ai-c flex-jc-sb">
                            <div class="content__title">Liste des stagiaires</div>
                            <div class="content-param__head__btns flex flex-jc-fe">
                                <input class="content-param__head__btn" type="button" id="printAbs" value="Imprimer">
                            </div>
                        </div>

                        <div class="filters filters__etd">
                            <div class="entry-blocks filters__groupe">
                            <div class="filters__labels">Groupe</div>
                            <select class="entry" name="groupe" id="groupe">';

                                echo '<option value="tous">-----------------</option>';
                                if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                    $req = $connection->prepare("SELECT * FROM groupe WHERE codeEFP=?");
                                    $req->execute(array($codeEFP));
                                }
                                if($personnel['titre'] == "Formateur"){
                                    $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ?");
                                    $req->execute(array($personnel['matricule']));
                                }
                                while($result = $req->fetch()) {
                                    echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                }

                            echo '</select>
                            </div>
                            <div class="entry-blocks filters__search">
                                <div class="filters__labels">Recherche</div>
                                <input class="entry" type="text" placeholder="CEF ou nom et prénom" id="search">
                            </div>
                        </div>

                        <div class="content__table__etdhead">
                            <div class="content__table__etdhead__infos">
                                <div class="content__table__etdhead__column">Nom et Prénom</div>
                                <div class="content__table__etdhead__column">Groupe</div>
                                <div class="content__table__etdhead__column">Numéro Téléphone</div>
                                <div class="content__table__etdhead__column">Année</div>
                                <div class="content__table__etdhead__column">Absence</div>
                            </div>
                        </div>
                
                        <div class="content__table">
                        
                        </div>
                        <script src="../app/script/etudiants.js"></script>
                    ';
                }

                
                if($_POST['type'] == "listeEtdGroupe"){

                    $ind = 0;
                    $sql = "SELECT matriculeEtudiant, CONCAT(nom, ' ', prenom) AS fullName, g.codeGroupe, g.annee, st.numTel,
                    (SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(s.duree))), \"%H:%i\") FROM seance s JOIN absence a ON (s.codeSeance=a.codeSeance) 
                    WHERE a.matriculeEtd = st.matriculeEtudiant) AS `cumul`
                    FROM stagiaire st JOIN groupe g ON (g.codeGroupe=st.codeGroupe) ";

                    if(isset($_POST['key']) && $_POST['key'] != ''){
                        $key = $_POST['key'];
                        if($personnel['titre'] == "Formateur"){
                            $sql .= "JOIN affectation aff ON (aff.codeGroupe=g.codeGroupe) 
                            WHERE aff.matricule = ? AND ";
                            $ind = 1;
                        }else $sql.="WHERE ";
                        $sql .= "(matriculeEtudiant LIKE '%$key%' OR st.nom LIKE '%$key%' OR prenom LIKE '%$key%') AND codeEFP=? 
                        GROUP BY matriculeEtudiant, fullName, g.codeGroupe, g.annee, st.numTel ORDER BY st.codeGroupe";
                        
                        $req = $connection->prepare($sql);

                    }else{
                        if($personnel['titre'] == "Formateur"){
                            $sql .= "JOIN affectation aff ON (aff.codeGroupe=g.codeGroupe) WHERE aff.matricule = ? ";$ind = 1;
                            if($_POST['groupe'] != "tous"){
                                $sql .= "AND g.codeGroupe = ? ";
                                $ind = 2;
                            }
                        }
                        if(($personnel['titre'] == "GS" || $personnel['titre'] == "CSRIO") && $_POST['groupe'] != "tous"){
                            $sql .= "WHERE g.codeGroupe = ? ";
                            $ind = 3;
                        }
                        $sql .= "AND codeEFP=? GROUP BY matriculeEtudiant, fullName, g.codeGroupe, g.annee, st.numTel ORDER BY st.codeGroupe";
                        $req = $connection->prepare($sql);
                    }

                    if($ind == 0)
                        $req->execute(array($codeEFP));
                    if($ind == 1)
                        $req->execute(array($personnel['matricule'], $codeEFP));
                    if($ind == 2)
                        $req->execute(array($personnel['matricule'], $_POST['groupe'], $codeEFP));
                    if($ind == 3)
                        $req->execute(array($_POST['groupe'], $codeEFP));

                    if(isset($_POST['for']) && $_POST['for'] == 'table'){
                        while($result = $req->fetch()){
                            echo '
                                <tr>
                                    <td>' . $result['matriculeEtudiant'] . '</td>
                                    <td>' . $result['fullName']. '</td>
                                    <td style="text-align:center">' . $result['codeGroupe'] . '</td>
                                    <td style="text-align:center">' . $result['numTel'] . '</td>';
                                    if($result['cumul'] != "")
                                        echo '<td style="text-align:center">' . $result['cumul'] . ' h</td>';
                                    else
                                        echo '<td style="text-align:center">00:00 h</td>';
                                    echo '
                                </tr>
                            ';
                        }
                    }else{
                        while($result = $req->fetch()){
                            echo '
                                <div class="content__table__etdrow">
                                    <div class="content__table__etdrow__infos">
                                        <div id="mat" hidden>' . $result['matriculeEtudiant'] . '</div>
                                        <div>' . $result['fullName']. '</div>
                                        <div>' . $result['codeGroupe'] . '</div>
                                        <div>' . $result['numTel'] . '</div>
                                        <div>' . $result['annee'] . '</div>';
                                        if($result['cumul'] != "")
                                            echo '<div>' . $result['cumul'] . ' h</div>';
                                        else
                                            echo '<div>00:00 h</div>';
                                        echo '
                                    </div>
                                </div>
                            ';
                        }
        
                        echo '<script src="../app/script/etudiantsRecherche.js"></script>';
                    }
                }

                if($_POST['type'] == "messagerie"){
                    echo '
                        <div class="content__title">Boite de messages</div>

                        <div class="container container-msg">
                
                            <div class="messages hide-scrollbar">
                
                                <div id="lastMessages" class="messages__last">
                
                                </div>
                
                                <div class="messages__new flex flex-ai-c">
                                    <input class="messages__new__text" type="text" placeholder="entrer un message">
                                    <input id="envoyer" class="messages__new__btn" type="button" value="envoyer">
                                </div>
                
                            </div>
                
                            <div id="listcontacts" class="listcontacts hide-scrollbar">
                            
                            </div>

                        </div>
                        
                        <script src="../app/script/messagerie.js"></script>
                    ';
                }

                if($_POST['type'] == "newMessageCount"){
                    $req = $connection->prepare("SELECT * FROM `message` WHERE (lu = b'0' AND `matriculeDestinataire` = ?)");
                    $req->execute(array($personnel['matricule']));
                    echo $req->rowCount();
                }

                if($_POST['type'] == "newNotifCount"){
                    $req = $connection->prepare("SELECT  DISTINCT n.* FROM `notification` n JOIN stagiaire st ON(st.matriculeEtudiant=n.matriculeEtd) 
                    JOIN groupe g ON(st.codeGroupe=g.codeGroupe) 
                    JOIN affectation af ON(g.codeGroupe=af.codeGroupe)
                    JOIN personnel p ON(af.matricule=p.matricule) WHERE p.codeEFP=? AND vu = b'0'");
                    $req->execute(array($codeEFP));
                    echo $req->rowCount();
                }
                
                if($_POST['type'] == "MessagesNotif"){
                    $req = $connection->prepare("SELECT m.*, matricule, CONCAT(nom, ' ', prenom) AS `fullName`, `image` FROM `message` m 
                    JOIN personnel p ON (m.matriculeExpediteur=p.matricule) WHERE `matriculeDestinataire` = ? 
                    ORDER BY `date` DESC LIMIT 50");
                    $req->execute(array($personnel['matricule']));

                    if($req->rowCount() > 0){
                        while($result = $req->fetch()){
                            echo '
                                <div id="messageNotifLine" class="dropdown-menu-messages__message flex flex-ai-c ';if($result['lu'] == 0) echo 'new'; echo '">
                                    <div hidden id="matr">' . $result['matricule'] . '</div>
                                    <div class="dropdown-menu-messages__message__img" style="background-image: url(../img/personnelProfiles/' . $result['image'] . ')"></div>
                                    <div class="dropdown-menu-messages__message__row">
                                        <div class="dropdown-menu-messages__message__row__name">' . $result['fullName'] . '</div>
                                        <div class="dropdown-menu-messages__message__row__msg">' . $result['message'] . '</div>
                                        <div class="dropdown-menu-messages__message__row__date">' . date('d M h:i', strtotime($result['date'])) . '</div>
                                    </div>
                                </div>
                            ';
                        }

                        echo '
                            <script src="../app/script/messageNotif.js"></script>
                        ';

                    }else echo '
                        <div id="messageNotifLine" class="dropdown-menu-messages__message flex flex-ai-c">
                            <div class="dropdown-menu-messages__message__row">
                                <div class="dropdown-menu-messages__message__row__name">Aucun message</div>
                                <div class="dropdown-menu-messages__message__row__msg"></div>
                                <div class="dropdown-menu-messages__message__row__date"></div>
                            </div>
                        </div>
                    ';
                    
                }

                if($_POST['type'] == "newNotif"){
                    
                    $req = $connection->prepare("SELECT DISTINCT st.matriculeEtudiant, CONCAT(st.nom, ' ', st.prenom) AS `fullName`, n.date, n.notification, n.vu, n.codeNotification
                    FROM `notification` n JOIN stagiaire st ON(st.matriculeEtudiant=n.matriculeEtd) 
                    JOIN groupe g ON(st.codeGroupe=g.codeGroupe) 
                    JOIN affectation af ON(g.codeGroupe=af.codeGroupe)
                    JOIN personnel p ON(af.matricule=p.matricule) WHERE p.codeEFP=? ORDER BY n.date DESC LIMIT 50");
                    $req->execute(array($codeEFP));
                    if($req->rowCount() > 0){
                        while($result = $req->fetch()){
                            echo '
                                <div id="notifRow" class="dropdown-menu-notifications__notif flex flex-ai-c';if($result['vu'] == 0)echo' new'; echo'">
                                    <div hidden id="codenotif">' . $result['codeNotification'] . '</div>
                                    <div hidden id="matr">' . $result['matriculeEtudiant'] . '</div>
                                    <div class="dropdown-menu-notifications__notif__row">
                                        <div class="dropdown-menu-notifications__notif__row__action">' . $result['fullName'] . ' a dépassé le seuil pour ' . $result['notification'] . '</div>
                                        <div class="dropdown-menu-notifications__notif__row__passedtime">Il y\'a ' . humanTiming(strtotime($result['date'])) . '</div>
                                    </div>
                                </div>
                            ';
                        }

                        echo '
                            <script src="../app/script/sanctionsNotif.js"></script>
                        ';
                    }else echo '
                        <div class="dropdown-menu-notifications__notif flex flex-ai-c">
                            <div class="dropdown-menu-notifications__notif__row">
                                <div class="dropdown-menu-notifications__notif__row__action">Aucune notification</div>
                                <div class="dropdown-menu-notifications__notif__row__passedtime"></div>
                            </div>
                        </div>
                    ';
                }

                if($_POST['type'] == "Vunotification"){
                    $req = $connection->prepare("UPDATE `notification` SET vu=b'1' WHERE codeNotification=?");
                    $req->execute(array($_POST['codeNotif']));
                }

                if($_POST['type'] == "listcontacts"){
                    
                    $req = $connection->prepare("SELECT matricule, CONCAT(nom, ' ', prenom) AS `fullName`, titre, `image`
                    FROM personnel WHERE codeEFP = ?");
                    $req->execute(array($codeEFP));
                    while($result = $req->fetch()){
                        if($result['matricule'] != $personnel['matricule']){
                            
                            echo '<div id="contactName" class="listcontacts__contact flex flex-ai-c';
                            if(isset($_POST['dest']) && $_POST['dest'] != ''){
                                if($_POST['dest'] == $result['matricule']) echo ' active';
                            }
                            echo '">
                                <div hidden id="matricule">' . $result['matricule'] . '</div>
                                <div class="listcontacts__contact__img" style="background-image: url(../img/personnelProfiles/' . $result['image'] . ')"></div>
                                <div class="listcontacts__contact__row">
                                    <div id="username" class="listcontacts__contact__row__name">' . $result['fullName'] . '</div>
                                    <div id="title" class="listcontacts__contact__row__titre">' . $result['titre'] . '</div>
                                </div>';
                                $req1 = $connection->prepare("SELECT COUNT(*) AS `nbrNonLu`
                                FROM `message` WHERE lu = b'0' AND (`matriculeDestinataire` = ? AND `matriculeExpediteur` = ?)");
                                $req1->execute(array($personnel['matricule'], $result['matricule']));
                                $result1 = $req1->fetch();
                                if($req1->rowCount() > 0){
                                    if($result1['nbrNonLu'] > 0)
                                        echo '<div class="listcontacts__contact__nonlu">' . $result1['nbrNonLu'] . '</div>';
                                    if($result1['nbrNonLu'] > 9) echo '<script>$(".listcontacts__contact__nonlu").css({"font-size":".5rem"})</script>';
                                }
                            echo '</div>';
                        }
                    }

                    echo '<script src="../app/script/contactlist.js"></script>';
                }
                if($_POST['type'] == "coversation"){
                    
                    $req = $connection->prepare("SELECT titre, concat(nom, ' ', prenom) AS `fullName` FROM personnel WHERE matricule = ?");
                    $req->execute(array($_POST['dest']));
                    $result = $req->fetch();
                    echo '<div class="messages__last__contact">
                        <div id="username" class="listcontacts__contact__row__name">'.$result['fullName'].'</div>
                        <div id="title" class="listcontacts__contact__row__titre">'.$result['titre'].'</div>
                    </div>';
                    
                    $req = $connection->prepare("SELECT * FROM `message` WHERE  lu = b'0' AND (`matriculeDestinataire` =? AND `matriculeExpediteur` =?)");
                    $req->execute(array($personnel['matricule'], $_POST['dest']));
                    while($result = $req->fetch()){
                        $req1 = $connection->prepare("UPDATE `message` SET lu = b'1' WHERE codeMessage=?");
                        $req1->execute(array($result['codeMessage']));
                    }
                    

                    $req = $connection->prepare("SELECT * FROM `message` 
                    WHERE (`matriculeDestinataire`=? OR `matriculeDestinataire`=?) 
                    AND (`matriculeExpediteur`=? OR `matriculeExpediteur`=?)
                    ORDER BY `date` ASC");
                    
                    $req->execute(array($_POST['dest'], $personnel['matricule'], $_POST['dest'], $personnel['matricule']));
                    while($result = $req->fetch()){
                        if($_POST['dest'] == $result['matriculeDestinataire']){
                            echo '<div class="messages__last__msgdes">'.$result['message'].'</div>';
                        }else{
                            echo '<div class="messages__last__msgexp">'.$result['message'].'</div>';
                        }
                    }

                    echo '<script src="../app/script/conversation.js"></script>';
                }

                if($_POST['type'] == "envoiMsg"){
                    
                    $req = $connection->prepare("INSERT INTO `message` (`message`, `matriculeDestinataire`, `matriculeExpediteur`) VALUES (?,?,?)");
                    if($req->execute(array($_POST['msgAenvoyer'], $_POST['dest'], $personnel['matricule']))){
                        echo 'ok';
                    }
                }

                if($_POST['type'] == "listeSanctionOverlay"){
                    echo '<div class="list-sanctions-message-box">
                            <div class="list-sanctions-message-box__title">Liste des sanctions</div>
                            <div class="list-sanctions-message-box__table hide-scrollbar">
                                <table class="datasection__datatable">
                                    <colgroup>
                                        <col class="datasection__datatable__short">
                                        <col class="datasection__datatable__medium">
                                        <col class="datasection__datatable__short">
                                    </colgroup>
                                    <thead class="datasection__datatable__head">
                                        <th>Date</th>
                                        <th>Sanction</th>
                                        <th>points à déduire</th>
                                    </thead>
                                    <tbody>';

                                        $req = $connection->prepare("SELECT * FROM indiscipline WHERE matriculeEtudiant=?");
                                        $req->execute(array($_POST['matStg']));
                                        if($req->rowCount() > 0){
                                            while($result = $req->fetch()){
                                                echo '<tr>
                                                    <td>' . date('d/m/Y', strtotime($result['date'])) . '</td>
                                                    <td>' . $result['sanction'] . '</td>
                                                    <td>' . $result['points'] . '</td>
                                                </tr>';
                                            }
                                        }else echo '<tr>
                                                    <td colspan="3" style="text-align: center">aucune sanction</td>
                                                </tr>';
                                    echo '</tbody>
                                </table>
                            </div>
                        </div>
                    ';
                }

                if($_POST['type'] == "profile"){
                    echo '
                    <div id="listeSanctionOverlay" class="overlay" hidden>
                        
                    </div>
            
                    <div id="ajoutSanctionOverlay" class="overlay" hidden>
                        <div class="ajout-sanctions-message-box">
                            <div class="list-sanctions-message-box__title">Ajouter une sanction</div>
                            <div class="ajout-sanctions-message-box__table">
                                <table class="datasection__datatable">
                                    <colgroup>
                                        <col class="datasection__datatable__short">
                                        <col class="datasection__datatable__long">
                                    </colgroup>
                                    <tr id="1mg">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>1ère mise en garde</td>
                                    </tr>
                                    <tr id="2mg">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>2ème mise en garde</td>
                                    </tr>
                                    <tr id="1av">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>1ère avertissement</td>
                                    </tr>
                                    <tr id="2av">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>2ème avertissement</td>
                                    </tr>
                                    <tr id="blam">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>Blâme</td>
                                    </tr>
                                    <tr id="excl2">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>Exclusion de 2 jours</td>
                                    </tr>
                                    <tr id="excln">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>Exclusion de <input class="entry" style="width: 2rem;max-height: 1.5rem;" type="number" id="nbrJours"> jours 
                                        et déduire <input class="entry" style="width: 2rem;max-height: 1.5rem;" type="number" id="pointsAdeduire"> points</td> 
                                    </tr>
                                    <tr id="excd">
                                        <td><input type="radio" name="checkSanction" class="checkSanction"></td>
                                        <td>Exclusion définitive</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><input id="validerSanction" type="button" class="ajout-sanctions-message-box__btn" value="Valider"></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                        <div class="content__title">Profile du stagiaire</div>';
                        
                        $req = $connection->prepare("CALL getStg(?)");
                        $req->execute(array($_POST['matStg']));
                        $result = $req->fetch();

                        echo '<div class="container container-profile">
                            <div class="personal">
                                <div class="personal__infos hide-scrollbar">
                                    <table class="datasection__datatable personal__infos__table">
                                        <tr>
                                            <td>CEF</td>
                                            <td id="matriculeEtudiant">: '.$result['matriculeEtudiant'].'</td>
                                        </tr>
                                        <tr>
                                            <td>Nom et Prenom</td>
                                            <td id="fullname">: '.$result['fullName'].'</td>
                                        </tr>
                                        <tr>
                                            <td>CIN</td>
                                            <td>: '.$result['cin'].'</td>
                                        </tr>
                                        <tr>
                                            <td>Groupe</td>
                                            <td>: '.$result['codeGroupe'].'</td>
                                        </tr>
                                        <tr>
                                            <td>Tel</td>
                                            <td>: '.$result['numTel'].'</td>
                                        </tr>
                                        <tr>
                                            <td>Adresse</td>
                                            <td>: '.$result['adresse'].'</td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div class="personal__diagram">
                                    <div class="personal__diagram__title">Absences du dernier mois</div>
                                    <canvas id="myChart" class="personal__diagram__chart"></canvas>
                                </div>
                            </div>';

                            $req = $connection->prepare("CALL cumulAbsences(?)");
                            $req->execute(array($_POST['matStg']));
                            $result = $req->fetch();
                            
                            echo '
                            <div class="etatAbs">
                                <div class="etatAbs__cumul">
                                    <div>Cumul des Absences</div>';
                                    if($result['cumul'] != "")
                                        echo '<div class="etatAbs__cumul__nombre" id="nbrAbs">' . $result['cumul'] . ' h</div>';
                                    else
                                        echo '<div class="etatAbs__cumul__nombre" id="nbrAbs">00:00 h</div>';
                                    echo '
                                </div>

                                <div class="etatAbs__sanction" id="profileStgNotes">
                                    
                                </div>

                                <div class="etatAbs__liste">

                                    <div class="etatAbs__liste__title">Historique des Absences</div>
                                    
                                    <div class="etatAbs__liste__table hide-scrollbar">
                                        <table class="datasection__datatable">
                                            <colgroup>
                                                <col class="datasection__datatable__short">
                                                <col class="datasection__datatable__medium">
                                                <col class="datasection__datatable__short">';
                                                if($personnel['titre'] == 'GS' || $personnel['titre'] == 'CSRIO')
                                                    echo '<col class="datasection__datatable__short">';
                                            echo '</colgroup>
                                            <thead class="datasection__datatable__head">
                                                <th>Date</th>
                                                <th>Module</th>
                                                <th>Nombre</th>';
                                                if($personnel['titre'] == 'GS' || $personnel['titre'] == 'CSRIO')
                                                    echo '<th>justification</th>';
                                            echo '</thead>
                                            <tbody>';

                                                $req = $connection->prepare("CALL absences1Stg(?)");
                                                $req->execute(array($_POST['matStg']));
                                                while($result = $req->fetch()){
                                                    echo '<tr>
                                                        <td title="' . date('d/m/Y', strtotime($result['jour'])) . '">' . date('d/m/Y', strtotime($result['jour'])) . '</td>
                                                        <td title="' . $result['nomModule'] . '">' . $result['nomModule'] . '</td>
                                                        <td>' . $result['duree'] . ' h</td>';
                                                        if($personnel['titre'] == 'GS' || $personnel['titre'] == 'CSRIO'){
                                                            echo '<td><input type="checkbox" class="justifCheck" id="' . $result['codeSeance'] . '"';
                                                            if($result['justifiee'] == 1) echo 'checked';
                                                            echo '></td>';
                                                        }
                                                    echo '</tr>';
                                                }
                                            
                                            echo '</tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ';
                        
                        $start = strtotime("-1 months");
                        $end = strtotime("+0 day");

                        //echo '<script>console.log("'.$start.'")</script>';
                        $currentDate = $start;
                        
                        while($currentDate <= $end){
                            $formatted = date("Y-m-d", $currentDate);
                            $labels[] =  date("d", $currentDate);

                            $req = $connection->prepare("SELECT COUNT(*) AS `nbrAbs` FROM absence a JOIN seance s ON (a.codeSeance=s.codeSeance) 
                            WHERE a.matriculeEtd = ? AND s.jour = ?");
                            $req->execute(array($_POST['matStg'], $formatted));
                            $result = $req->fetch();
                            $data[] = ($req->rowCount() > 0) ? $result['nbrAbs'] : 0 ;
                            $currentDate = strtotime("+1 day", $currentDate);
                        }

                        echo '<script src="../app/script/lib/chart.js"></script>
                            <script src="../app/script/profileStg.js"></script>
                            <script>
                                var myChart = document.getElementById("myChart")
                                var ctx = myChart.getContext("2d")
                                var chart = new Chart(ctx, {
                                    type: "bar",
                                    data: {
                                        labels: '.json_encode($labels).',
                                        datasets: [{
                                                data: '.json_encode($data).',
                                                backgroundColor: "rgb(45, 51, 104)"
                                            }
                                        ]
                                    },
                                
                                    // Configuration options go here
                                    options: {
                                        legend: {
                                            display : false
                                        },
                                        scales: {
                                            yAxes : [{
                                                ticks: {
                                                    beginAtZero: true,
                                                    stepSize: 1,
                                                    stacked: true,
                                                    max: 4
                                                },
                                                gridLines:{
                                                    borderDash:[2],
                                                    lineWidth: 1
                                                }
                                            }],
                                            xAxes : [{
                                                ticks: {
                                                    stacked: true,
                                                    autoSkip: false,
                                                    fontSize: 9
                                                },
                                                gridLines: {
                                                    display : false
                                                }
                                            }]
                                        }
                                    }
                                })
                            </script>
                        ';
                }

                
                if($_POST['type'] == "profileStgNotes"){
                    $req = $connection->prepare("SELECT noteDiscipline FROM stagiaire WHERE matriculeEtudiant=?");
                    $req->execute(array($_POST['matStg']));
                    $result = $req->fetch();
                    echo '<div id="noteDisciplineTitle">Note de dicsipline</div>
                        <div class="etatAbs__sanction__note" id="noteDiscipline">'.$result['noteDiscipline'].'/20</div>';
                        if($personnel['titre'] == 'GS' || $personnel['titre'] == 'CSRIO')
                            echo '<div id="ajSanc" class="etatAbs__sanction__ajSanc">Ajouter une sanction</div>';
                    
                    if($result['noteDiscipline'] >= 10)
                        echo '<script>$(".etatAbs__sanction").css({"background-color":"#17AC70"})</script>';
                    else
                        echo '<script>$(".etatAbs__sanction").css({"background-color":"#D03425"})</script>';

                    if($personnel['titre'] == 'Formateur')
                        echo '<script>$("#noteDisciplineTitle").css({"padding-top":".9rem"})</script>';
                }

                if($_POST['type'] == "imprimer"){
                    echo '
                        <div class="content-param__head flex flex-ai-c flex-jc-sb">
                            <div class="content__title">Imprimer</div>
                            <div class="content-param__head__btns flex flex-jc-fe">
                                <input class="content-param__head__btn active" type="button" id="cc" value="Contrôle continu">
                                <input class="content-param__head__btn" type="button" id="efm" value="Examen de fin module">
                                <input class="content-param__head__btn" type="button" id="upload" value="Importer & Liste">
                            </div>
                        </div>

                        <section class="print-content"></section>

                        <script src="../app/script/print.js"></script>
                    ';
                }

                if($_POST['type'] == "printContent"){
                    echo '
                        <div class="filters">
                            <div class="filters__print">
                
                                <div class="entry-blocks filters__print__date">
                                    <div class="labels">Date</div>
                                    <input class="entry" type="date" name="dateSeance" id="date">
                                </div>
                
                                <div class="entry-blocks filters__print__hdebut">
                                    <div class="labels">Heure Debut</div>
                                    <input class="entry" type="time" name="hdebut" id="hdebut">
                                </div>
                
                                <div class="entry-blocks filters__print__hfin">
                                    <div class="labels">Heure Fin</div>
                                    <input class="entry" type="time" name="hfin" id="hfin">
                                </div>
                
                                
                                <div class="entry-blocks filters__groupe">
                                    <div class="labels">Groupe</div>
                                    <select class="entry" name="groupe" id="groupe" onchange="getDetail()">';

                                        if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                            $req = $connection->prepare("SELECT * FROM groupe WHERE codeEFP=?");
                                            $req->execute(array($codeEFP));
                                        }
                                        if($personnel['titre'] == "Formateur"){
                                            $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ?");
                                            $req->execute(array($personnel['matricule']));
                                        }
                                        while($result = $req->fetch()) {
                                            echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                        }
            
                                    echo '</select>
                                </div>
                                <div class="entry-blocks filters__module">
                                    <div class="labels">Module</div>
                                    <select class="entry" name="module" id="module"></select>
                                </div>

                                <input type="button" class="entry" id="suivant" value="suivant"/>
                            </div>
                        </div>
                        <script src="../app/script/printContent.js"></script>
                    ';
                }

                if($_POST['type'] == "doc"){
                    $req = $connection->prepare("SELECT efp.ville, dr.nom AS nomdr, efp.nom AS nomefp 
                    FROM directionregionale dr JOIN etablissement efp ON (dr.codeDR=efp.codeDR) WHERE codeEFP=?");
                    $req->execute(array($codeEFP));
                    $result = $req->fetch();
                    if($_POST['choix'] == 'cc') $choix = 'Contrôle continu';
                    if($_POST['choix'] == 'efm') $choix = 'Examen de fin de module';
                    echo '
                        <div class="content__title">Fiche de présence ' . $choix . '</div>

                        <div class="to-print">

                            <div class="to-print__header flex flex-ai-c flex-jc-c">
                                <img class="to-print__logo" src="/img/assets/ofppt_logo.svg" alt="ofppt LOGO">
                                <div class="to-print__header-cap flex flex-dc flex-jc-c flex-ai-c">
                                    <img class="to-print__slogan" src="/img/assets/ofppt_slogan.png" alt="ofppt Slogan">
                                    <div class="to-print__header__text">Office de la Formation Professionnelle
                                        Et de la Promotion du Travail <br>
                                        <span id="direction">' . $result['nomdr'] . '</span><br>
                                        <span id="efp">' . $result['nomefp'] . '</span>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="to-print__title">Fiche de présence</div>
                            <div id="choix" class="to-print__choix">' . $choix . '</div>';
                            
                            $req = $connection->prepare("SELECT * FROM groupe WHERE codeGroupe=?");
                            $req->execute(array($_POST['grp']));
                            $result = $req->fetch();

                            echo '<div class="to-print__head-infos">
                                <div class="to-print__head-infos__label">Date</div>
                                <div>: ' . $_POST['date'] . '</div>
                                <div class="to-print__head-infos__label">Filiere</div>
                                <div>: ' . $result['codeFiliere'] . '</div>
                                <div class="to-print__head-infos__label">Heure de Debut</div>
                                <div>: ' . $_POST['hdebut'] . '</div>
                                <div class="to-print__head-infos__label">Groupe</div>
                                <div id="grp">: ' . $_POST['grp'] . '</div>
                                <div class="to-print__head-infos__label">Heure de fin</div>
                                <div>: ' . $_POST['hfin'] . '</div>
                                <div class="to-print__head-infos__label">Module</div>
                                <div>: ' . $_POST['module'] . '</div>
                            </div>

                            <table class="to-print__datatable">
                                <thead>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Emargement avant remise de copie</th>
                                    <th>Emargement après remise de copie</th>
                                    <th>Observations</th>
                                </thead>
                                <tbody id="tablecontent">
                                    
                                </tbody>
                            </table>

                            <div class="to-print__footer flex">
                                <p>Formateur(s) surveillant(s) :</p>
                                <p>Emargement :</p>
                            </div>
                        </div>

                        <input class="entry" type="button" value="Imprimer" id="imprimer">

                        <script src="../app/script/printThisBtn.js"></script>
                    ';
                }

                if($_POST['type'] == "absDoc"){
                    $req = $connection->prepare("SELECT efp.ville, dr.nom AS nomdr, efp.nom AS nomefp 
                    FROM directionregionale dr JOIN etablissement efp ON (dr.codeDR=efp.codeDR) WHERE codeEFP=?");
                    $req->execute(array($codeEFP));
                    $result = $req->fetch();
                    echo '
                        <div class="content__title">Cumul des absences</div>

                        <div class="to-print">

                            <div class="to-print__header flex flex-ai-c flex-jc-c">
                                <img class="to-print__logo" src="/img/assets/ofppt_logo.svg" alt="ofppt LOGO">
                                <div class="to-print__header-cap flex flex-dc flex-jc-c flex-ai-c">
                                    <img class="to-print__slogan" src="/img/assets/ofppt_slogan.png" alt="ofppt Slogan">
                                    <div class="to-print__header__text">Office de la Formation Professionnelle
                                        Et de la Promotion du Travail <br>
                                        <span id="direction">' . $result['nomdr'] . '</span><br>
                                        <span id="efp">' . $result['nomefp'] . '</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="groupe" hidden>'.$_POST['groupe'].'</div>
                            <div id="key" hidden>'.$_POST['key'].'</div>
                            <div class="to-print__title">Historique des absences</div>';
                            
                            $req = $connection->prepare("SELECT * FROM groupe WHERE codeGroupe=?");
                            $req->execute(array($_POST['groupe']));
                            $result = $req->fetch();

                            echo '

                            <table class="to-print__datatable">
                                <thead>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>groupe</th>
                                    <th>Numéro Téléphone</th>
                                    <th>Absence</th>
                                </thead>
                                <tbody id="tablecontent">
                                    
                                </tbody>
                            </table>
                        </div>

                        <input class="entry" type="button" value="Imprimer" id="imprimer">

                        <script src="../app/script/absencesPrint.js"></script>
                    ';
                }

                
                if($_POST['type'] == "listeStg"){
                    
                    $req = $connection->prepare("SELECT * FROM stagiaire WHERE codeGroupe=?");
                    $req->execute(array($_POST['grp']));
                    while($result = $req->fetch()) {
                        echo '
                            <tr>
                                <td>'.$result['nom'].'</td>
                                <td>'.$result['prenom'].'</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ';
                    }
                }
                
                if($_POST['type'] == "docUpload"){
                    echo '
                        <div id="deleteOverlay" class="overlay" hidden>
                            <div class="delete-message-box">
                                <div class="delete-message-box__title"></div>
                                <div class="delete-message-box__code" hidden></div>
                                <div class="delete-message-box__doc" hidden></div>
                                <div class="delete-message-box__btns flex flex-jc-sb">
                                    <input class="delete-message-box__btn" type="button" value="Supprimer" id="confirmSupp">
                                    <input class="delete-message-box__btn" type="button" value="Annuler" id="annuleSupp">
                                </div>
                            </div>
                        </div>

                        <div id="addDocOverlay" class="overlay" hidden>
                            <div id = "addMessageBox" class="add-message-box">

                                <div class="add-message-box__title">Ajouter un document</div>

                                <div class="add-message-box__form flex flex-jc-sb flex-dc">
                            
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Date</div>
                                        <input id="date" type="date" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Type</div>
                                        <select id="Doctype" class="add-message-box__form__row__input">
                                            <option value="cc">Controle continue</option>
                                            <option value="efm">Examen de fin module</option>
                                        </select>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Groupe</div>
                                        <select id="groupe" class="add-message-box__form__row__input" onchange="getDetail()">';

                                            if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                                $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation a JOIN personnel p ON (a.matricule=p.matricule) WHERE codeEFP=?");
                                                $req->execute(array($codeEFP));
                                            }
                                            if($personnel['titre'] == "Formateur"){
                                                $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ?");
                                                $req->execute(array($personnel['matricule']));
                                            }
                                            while($result = $req->fetch()) {
                                                echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                            }
                
                                        echo '</select>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Module</div>
                                        <select id="addmodule" class="add-message-box__form__row__input"></select>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Document</div>
                                        <label for="uploadDocBtn" class="add-message-box__form__row__input">importer document</label>
                                        <input id="uploadDocBtn" type="file" class="add-message-box__form__row__input" accept="image/x-png,image/jpg,image/jpeg" hidden>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label"></div>
                                        <input id="ValiderDocBtn" class="add-message-box__formbtn" type="button" value="Valider">
                                    </div>
                    
                                </div>
                            </div>
                        </div>

                        <section class="controls-param flex flex-ai-c flex-jc-sb">
                            <div class="flex flex-ai-c filters__groupe">
                                <!--<div class="filters__labels" style="margin:0rem .5rem">Groupe</div>-->
                                <select class="entry" id="groupefilter">';

                                    echo '<option value="tous">Groupe</option>';
                                    if($personnel['titre'] == "CSRIO" || $personnel['titre'] == "GS"){
                                        $req = $connection->prepare("SELECT * FROM groupe WHERE codeEFP=?");
                                        $req->execute(array($codeEFP));
                                    }
                                    if($personnel['titre'] == "Formateur"){
                                        $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ?");
                                        $req->execute(array($personnel['matricule']));
                                    }
                                    while($result = $req->fetch()) {
                                        echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                    }

                                echo '</select>
                            </div>
                            <div class="controls-param__btns flex">
                                <input class="controls-param__btns__btn" type="button" id="ajout" value="Ajouter">
                                <input class="controls-param__btns__btn" type="button" id="supp" value="Supprimer">
                            </div>
                        </section>

                        <section class="datasection">
                        
                        </section>
                        <script src="../app/script/uploadDocument.js"></script>
                    ';
                }

                if($_POST['type'] == "insertDoc"){

                    if(isset($_POST['docType']) && isset($_POST['date']) && isset($_POST['groupe']) && isset($_POST['module'])){
                        if($_POST['docType'] != "" && $_POST['date'] != "" && $_POST['groupe'] != "" && $_POST['module'] != ""){
                            if ($_FILES['file']['size'] != 0 && $_FILES['file']['error'] == 0){
                                try{
                                    $doc = $_FILES["file"];
                                    $docName = $doc['name'];
                                    $docTmpName = $doc['tmp_name'];
                                    $explodeName = explode('.', $docName);
                                    $ext = end($explodeName);
                                    $name =  $_POST['docType']. '_' . $_POST['date']. '_' . $_POST['groupe']. '_' . $_POST['module'] . '.' . $ext;
                                    $location = '../../img/fichesDabsence/' . $name;  
                                    move_uploaded_file($docTmpName, $location);
                                    
                                    $req = $connection->prepare("SELECT codeAffectation FROM affectation WHERE matricule=? AND codeGroupe=? AND codeModule=?");
                                    $req->execute(array($personnel['matricule'], $_POST['groupe'], $_POST['module']));
                            
                                    if($personnel['titre'] == "GS" && $req->rowCount() == 0){
                                    /*  $req = $connection->prepare("INSERT INTO affectation(matricule, codeGroupe, codeModule) VALUES (?,?,?)");
                                        $req->execute(array($personnel['matricule'], $_POST['groupe'], $_POST['module']));
                                        $req = $connection->prepare("SELECT codeAffectation FROM affectation WHERE matricule=? AND codeGroupe=? AND codeModule=?");
                                        $req->execute(array($personnel['matricule'], $_POST['groupe'], $_POST['module'])); */
                                        echo 'err Veuillez affecter la séance à un formateur avant insèrent le document';
                                    }else{
                                        $result = $req->fetch();
                                        $codeAffectation = $result['codeAffectation'];
                                    }

                                    $req = $connection->prepare("SELECT * FROM document WHERE `type`=? AND `image`=? AND `codeAffectation`=?");
                                    $req->execute(array($_POST['docType'], $name, $codeAffectation));

                                    if($req->rowCount() == 0){
                                        $req = $connection->prepare("INSERT INTO document(`type`,`image`,`codeAffectation`) VALUES (?,?,?)");
                                        $req->execute(array($_POST['docType'], $name, $codeAffectation));
                                        echo 'success';
                                    }else echo 'existant';
                                }catch(Exception $e){
                                    echo 'ERROR: ' . $e->getMessage();
                                }
                            }else echo 'fichier indifini';
                        }else echo 'veuillez remplire tous les champs';
                    }else echo 'not post';
                        
                }

                if($_POST['type'] == "deleteDoc"){
                    try{
                        $req = $connection->prepare("SELECT matricule FROM document d JOIN affectation a ON(d.codeAffectation=a.codeAffectation) WHERE codeDocument=? LIMIT 1");
                        $req->execute(array($_POST['code']));
                        if($req->fetch()['matricule'] == $personnel['matricule']){
                            $req = $connection->prepare("DELETE FROM document WHERE codeDocument=?");
                            $req->execute(array($_POST['code']));
                            unlink('../../img/fichesDabsence/'.$_POST['doc']);
                            echo 'success delete';
                        }else{
                            echo 'ERROR: Vous n\'avez pas le droit de supprimer ce fichier';
                        }                    
                    }catch(Exception $e){
                        echo 'ERROR: ' . $e->getMessage();
                    }
                }

                if($_POST['type'] == "listDocs"){

                    $ind = 0;
                    $sql = "SELECT d.*,m.nomModule FROM document d JOIN affectation aff ON (d.codeAffectation=aff.codeAffectation) 
                    JOIN personnel p ON (aff.matricule=p.matricule) JOIN module m ON (m.codeModule=aff.codeModule) WHERE codeEFP=? ";

                    if($_POST['grp'] != "tous"){
                        $sql .= "AND codeGroupe = ? ";$ind = 1;
                    }

                    $sql .= "ORDER BY `date` DESC";
                    $req = $connection->prepare($sql);

                    if($ind == 0)
                        $req->execute(array($codeEFP));
                    if($ind == 1)
                        $req->execute(array($codeEFP, $_POST['grp']));
                    echo '
                        <div class="import-docs-list">

                        <div class="import-docs-list__head">
                            <div class="import-docs-list__head__infos">
                                <div class="import-docs-list__head__column">Date</div>
                                <div class="import-docs-list__head__column">Type</div>
                                <div class="import-docs-list__head__column">Module</div>
                                <div class="import-docs-list__head__column">Document</div>
                                <div class="import-docs-list__head__column"></div>
                            </div>
                        </div>';
                            if($req->rowCount() == 0){
                                echo '<tr>
                                    <td>aucun document</td>
                                </tr>';
                            }else{
                                while($result = $req->fetch()){
                                    echo '
                                        <div class="import-docs-list__row">
                                            <div id="codeDoc" hidden>' . $result['codeDocument'] . '</div>
                                            <div class="import-docs-list__row__infos">
                                                <div class="import-docs-list__row__column">' . date('d/m/Y', strtotime($result['date'])) . '</div>
                                                <div class="import-docs-list__row__column">' . $result['type'] . '</div>
                                                <div class="import-docs-list__row__column">' . $result['nomModule'] . '</div>
                                                <div class="import-docs-list__row__column"><a href="/e-suivi/img/fichesDabsence/' . $result['image'] . '" download>' . $result['image'] . '</a></div>
                                                <div class="import-docs-list__row__column param-delete"></div>
                                            </div>
                                        </div>
                                    ';
                                }
                            }
                            
                        echo '</div>
                        <script src="../app/script/documentsList.js"></script>
                    ';
                }

                if($_POST['type'] == "log"){
                    $req = $connection->prepare("INSERT INTO `log` (`operation`, `matricule`) VALUES (?,?)");
                    if($req->execute(array($_POST['ope'], $personnel['matricule']))){
                        echo 'ok';
                    }else 'err';
                }

                if($_POST['type'] != "newMessageCount" && $_POST['type'] != "MessagesNotif" && 
                $_POST['type'] != "newNotifCount" && $_POST['type'] != "newNotif")
                    $_SESSION['LAST_ACTIVITY'] = time();
            }else echo 'err no post';
        }else echo 'session ech';
    } else
        echo 'notConnected';
    
    function humanTiming ($time){

        $time = time() - $time; // to get the time since that moment
        $time = ($time<1)? 1 : $time;
        $tokens = array (
            31536000 => 'année',
            2592000 => 'mois',
            604800 => 'semaine',
            86400 => 'jour',
            3600 => 'heure',
            60 => 'minute',
            1 => 'second'
        );

        foreach ($tokens as $unit => $text) {
            if ($time < $unit) continue;
            $numberOfUnits = floor($time / $unit);
            return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'');
        }

    }