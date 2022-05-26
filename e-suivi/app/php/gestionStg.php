<?php
    include 'connection.php';
    include 'lib/vendor/autoload.php';
    session_start();

    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
    use PhpOffice\PhpSpreadsheet\IOFactory;

  
    if(isset($_SESSION['LAST_ACTIVITY'])){

        if((time() - $_SESSION['LAST_ACTIVITY']) < 900){

            $personnel = $_SESSION['logedPersonnel'];
            $codeEFP = ($personnel['titre'] == 'CSRIO') ? $_SESSION['codeEFP'] : $personnel['codeEFP'];
            
            if($personnel['titre'] == 'GS' || $personnel['titre'] == 'CSRIO'){

                if($_POST['type'] == "home"){
                    
                    echo '
                        <div id="scVAbsencesOverlay" class="overlay" hidden>
                            <div class="list-sanctions-message-box">
                                
                            </div>
                        </div>

                        <div class="content__title">Statut des validations</div>
                        
                        <div class="grid">
                            <div class="grid__header">
                                <div>Formateurs</div>
                                <div>Séance 1</div>
                                <div>Séance 2</div>
                                <div>Séance 3</div>
                                <div>Séance 4</div>
                                <div>Autre Séance</div>
                            </div>';

                            $req = $connection->prepare("SELECT matricule, specialite, CONCAT(nom, ' ', prenom) AS fullname 
                            FROM personnel WHERE codeEFP=? AND titre='formateur'");
                            $req->execute([$codeEFP]);

                            while($result = $req->fetch()) {
                                echo '<div class="grid__row">
                                    <div class="grid__row__res flex flex-dc flex-jc-c">
                                        <div class="grid__row__res__name">' . $result['fullname'] . '</div>
                                        <div class="grid__row__res__spec">' . $result['specialite'] . '</div>
                                    </div>';

                                    $req1 = $connection->prepare("SELECT * FROM seance WHERE (heurDebut=? AND heurFin=?) AND active=b'1' 
                                    AND codeAffectation IN (SELECT codeAffectation FROM affectation WHERE matricule=?) ORDER BY jour ASC");
                                    $req1->execute(array('08:30','11:00',$result['matricule']));
                                    $statue = 0;
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            if(date('D', strtotime($result1['jour'])) == date('D')){
                                                $statue = ($result1['jour'] == date('Y-m-d')) ? 1 : 2;
                                            }
                                            $codeSeance = $result1['codeSeance'];
                                        }
                                    }
                                    if($statue == 1)
                                        echo '<div class="grid__row__carte grid__row__carte__valid flex flex-dc flex-jc-c" style="background: #17AC70;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Validée</div>
                                            <div id="mat" hidden>' . $result['matricule'] . '</div>
                                            <div id="sc" hidden>' . $codeSeance . '</div>
                                        </div>';
                                    if($statue == 2)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" style="background: #D03425;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Non validée</div>
                                        </div>';
                                    if($statue == 0)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" >
                                            <div class="grid__row__carte__titre">Séance</div>
                                            <div class="grid__row__carte__etat">Vide</div>
                                        </div>';
                                    
                                    $req1 = $connection->prepare("SELECT * FROM seance WHERE (heurDebut=? AND heurFin=?) AND active=b'1' 
                                    AND codeAffectation IN (SELECT codeAffectation FROM affectation WHERE matricule=?) ORDER BY jour ASC");
                                    $req1->execute(array('11:00','13:30',$result['matricule']));
                                    $statue = 0;
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            if(date('D', strtotime($result1['jour'])) == date('D')){
                                                $statue = ($result1['jour'] == date('Y-m-d')) ? 1 : 2;
                                            }
                                            $codeSeance = $result1['codeSeance'];
                                        }
                                    }
                                    if($statue == 1)
                                        echo '<div class="grid__row__carte grid__row__carte__valid flex flex-dc flex-jc-c" style="background: #17AC70;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Validée</div>
                                            <div id="mat" hidden>' . $result['matricule'] . '</div>
                                            <div id="sc" hidden>' . $codeSeance . '</div>
                                        </div>';
                                    if($statue == 2)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" style="background: #D03425;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Non validée</div>
                                        </div>';
                                    if($statue == 0)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" >
                                            <div class="grid__row__carte__titre">Séance</div>
                                            <div class="grid__row__carte__etat">Vide</div>
                                        </div>';
                                    
                                    
                                    $req1 = $connection->prepare("SELECT * FROM seance WHERE (heurDebut=? AND heurFin=?) AND active=b'1' 
                                    AND codeAffectation IN (SELECT codeAffectation FROM affectation WHERE matricule=?) ORDER BY jour ASC");
                                    $req1->execute(array('13:30','16:00',$result['matricule']));
                                    $statue = 0;
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            if(date('D', strtotime($result1['jour'])) == date('D')){
                                                $statue = ($result1['jour'] == date('Y-m-d')) ? 1 : 2;
                                            }
                                            $codeSeance = $result1['codeSeance'];
                                        }
                                    }
                                    if($statue == 1)
                                        echo '<div class="grid__row__carte grid__row__carte__valid flex flex-dc flex-jc-c" style="background: #17AC70;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Validée</div>
                                            <div id="mat" hidden>' . $result['matricule'] . '</div>
                                            <div id="sc" hidden>' . $codeSeance . '</div>
                                        </div>';
                                    if($statue == 2)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" style="background: #D03425;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Non validée</div>
                                        </div>';
                                    if($statue == 0)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" >
                                            <div class="grid__row__carte__titre">Séance</div>
                                            <div class="grid__row__carte__etat">Vide</div>
                                        </div>';
                                    
                                    
                                    $req1 = $connection->prepare("SELECT * FROM seance WHERE (heurDebut=? AND heurFin=?) AND active=b'1' 
                                    AND codeAffectation IN (SELECT codeAffectation FROM affectation WHERE matricule=?) ORDER BY jour ASC");
                                    $req1->execute(array('16:00','18:30',$result['matricule']));
                                    $statue = 0;
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            if(date('D', strtotime($result1['jour'])) == date('D')){
                                                $statue = ($result1['jour'] == date('Y-m-d')) ? 1 : 2;
                                            }
                                            $codeSeance = $result1['codeSeance'];
                                        }
                                    }
                                    if($statue == 1)
                                        echo '<div class="grid__row__carte grid__row__carte__valid flex flex-dc flex-jc-c" style="background: #17AC70;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Validée</div>
                                            <div id="mat" hidden>' . $result['matricule'] . '</div>
                                            <div id="sc" hidden>' . $codeSeance . '</div>
                                        </div>';
                                    if($statue == 2)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" style="background: #D03425;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Non validée</div>
                                        </div>';
                                    if($statue == 0)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" >
                                            <div class="grid__row__carte__titre">Séance</div>
                                            <div class="grid__row__carte__etat">Vide</div>
                                        </div>';
                                    
                                    
                                    
                                    $req1 = $connection->prepare("SELECT * FROM seance WHERE (heurDebut NOT IN ('08:30','11:00','13:30','16:00') 
                                    OR heurFin NOT IN ('18:30','11:00','13:30','16:00')) AND active=b'1' 
                                    AND codeAffectation IN (SELECT codeAffectation FROM affectation WHERE matricule=?) ORDER BY jour ASC");
                                    $req1->execute(array($result['matricule']));
                                    $statue = 0;
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            if(date('D', strtotime($result1['jour'])) == date('D')){
                                                $statue = ($result1['jour'] == date('Y-m-d')) ? 1 : 2;
                                            }
                                            $codeSeance = $result1['codeSeance'];
                                        }
                                    }
                                    if($statue == 1)
                                        echo '<div class="grid__row__carte grid__row__carte__valid flex flex-dc flex-jc-c" style="background: #17AC70;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Validée</div>
                                            <div id="mat" hidden>' . $result['matricule'] . '</div>
                                            <div id="sc" hidden>' . $codeSeance . '</div>
                                        </div>';
                                    if($statue == 2)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" style="background: #D03425;">
                                            <div class="grid__row__carte__titre">Absence</div>
                                            <div class="grid__row__carte__etat">Non validée</div>
                                        </div>';
                                    if($statue == 0)
                                        echo '<div class="grid__row__carte flex flex-dc flex-jc-c" >
                                            <div class="grid__row__carte__titre">Séance</div>
                                            <div class="grid__row__carte__etat">Vide</div>
                                        </div>';
                                    echo '</div>
                                ';
                            }
                        echo '</div>
                        <script src="../app/script/gs/home.js"></script>
                    ';
                }

                if($_POST['type'] == "lstAbsAjustif"){
                    if(isset($_POST['seance']) && isset($_POST['matricule'])){

                        echo '<div class="list-sanctions-message-box__title">Absences de la Séance</div>
                                <div class="list-sanctions-message-box__table">
                                <table class="datasection__datatable">
                                    <colgroup>
                                        <col class="datasection__datatable__long">
                                        <col class="datasection__datatable__short">
                                    </colgroup>
                                    <thead>
                                        <th>Nom et Prenom</th>
                                        <th>justification</th>
                                    </thead>
                        ';
                        $req = $connection->prepare("SELECT *, CONCAT(nom, ' ', prenom) AS fullname FROM absence a 
                        JOIN seance s ON (a.codeSeance=s.codeSeance) 
                        JOIN affectation f ON (s.codeAffectation=f.codeAffectation) 
                        JOIN stagiaire st ON (a.matriculeEtd=st.matriculeEtudiant)
                        WHERE s.codeSeance=? AND f.matricule=?");
                        $req->execute([$_POST['seance'], $_POST['matricule']]);

                        if($req->rowCount() > 0){
                            while($result = $req->fetch()) {
                                echo '<tr>
                                    <td id="matEtd" hidden>' . $result['matriculeEtd'] . '</td>
                                    <td id="fullname">' . $result['fullname'] . '</td>
                                    <td><input type="checkbox" class="justifCheck" id="' . $_POST['seance'] . '"';
                                    if($result['justifiee'] == 1) echo ' checked';
                                    echo '></td>
                                </tr>';
                            }
                        }else echo '<tr>
                                <td colspan="3" style="text-align: center">aucune absence</td>
                            </tr>
                        ';
                        echo '</table>
                        </div>';
                    }else echo 'err';
                    echo '<script src="../app/script/gs/listeAbsencesAjustifier.js"></script>';
                }

                if($_POST['type'] == "notes"){
                    echo '
                        <div class="flex flex-ai-c flex-jc-sb">
                        <div class="content__title">Liste des notes des stagiaires</div>
                            <form id="exportForm" method="POST" action="../app/php/gestionStg.php" class="content-param__head__btns flex flex-jc-fe">
                                <input type="hidden" name="type" value="listeNotesEtdGroupe" />
                                <input type="hidden" name="file_content" value="table" />
                                <input type="hidden" name="groupe" />
                                <input type="hidden" name="key" />
                                <input class="content-param__head__btn" type="submit" id="exporterNotes" value="Exporter">
                            </form>
                        </div>

                        <div class="filters filters__etd">
                            <div class="entry-blocks filters__groupe">
                            <div class="filters__labels">Groupe</div>
                            <select class="entry" id="groupe">
                                <option value="tous">-----------------</option>';
                                
                                $req = $connection->prepare("SELECT * FROM groupe WHERE codeEFP=?");
                                $req->execute(array($codeEFP));
                                
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
                                <div class="">Nom et Prénom</div>
                                <div class="">Groupe</div>
                                <div class="">Numéro Téléphone</div>
                                <div class="">Année</div>
                                <div>Note</div>
                            </div>
                        </div>
                
                        <div id="notesStg" class="content__table">
                        
                        </div>
                        <script src="../app/script/gs/notes.js"></script>
                    ';
                }
                
                
                if($_POST['type'] == "ajoutSanction"){
                    if(isset($_POST['Sanctions']) && isset($_POST['ptsDeduire']) && isset($_POST['matriculeEtudiant'])){
                        $req = $connection->prepare("INSERT INTO indiscipline (sanction, points, matriculeEtudiant) VALUES (?,?,?)");
                        $req->execute(array($_POST['Sanctions'], $_POST['ptsDeduire'], $_POST['matriculeEtudiant']));
                        echo 'success';
                    }else echo 'no set';
                }

                if($_POST['type'] == "justification"){
                    if(isset($_POST['matriculeEtd'])){
                        $justif = ($_POST['action'] == 'justif') ? 1 : 0;
                        $req = $connection->prepare("UPDATE absence SET justifiee=? WHERE (matriculeEtd=? AND codeSeance=?)");
                        $req->execute(array($justif, $_POST['matriculeEtd'], $_POST['seance']));
                        echo 'succes';
                    }else echo 'err';
                }

                if($_POST['type'] == "listeNotesEtdGroupe"){

                    $ind = 0;
                    $sql = "SELECT matriculeEtudiant, CONCAT(nom, ' ', prenom) AS fullName, g.codeGroupe, g.annee, st.noteDiscipline, st.numTel
                    FROM stagiaire st JOIN groupe g ON (g.codeGroupe=st.codeGroupe) ";
                    
                    if(isset($_POST['key']) && $_POST['key'] != ''){
                        $key = $_POST['key'];
                        $sql .= "WHERE (matriculeEtudiant LIKE '%$key%' OR nom LIKE '%$key%' OR prenom LIKE '%$key%') 
                        AND codeEFP=? ORDER BY st.codeGroupe";
                        $req = $connection->prepare($sql);
                    }else{    
                        if($_POST['groupe'] != "tous"){
                            $sql .= "WHERE g.codeGroupe = ? AND ";
                            $ind = 1;
                        }else $sql .="WHERE ";
                        $sql .= "codeEFP=? ORDER BY st.codeGroupe";
                        $req = $connection->prepare($sql);
                    }

                    if($ind == 0)
                        $req->execute(array($codeEFP));
                    if($ind == 1)
                        $req->execute(array($_POST['groupe'], $codeEFP));
                    

                    if(isset($_POST['file_content']) && $_POST['file_content'] == 'table'){

                        $htmlString = '<table>
                            <tr>
                                <td>CEF</td>   
                                <td>Nom et Prénom</td>   
                                <td>Groupe</td>   
                                <td>Numéro de téléphone</td>   
                                <td>Année</td>   
                                <td>Note de discipline</td>
                            </tr>   
                        ';
                        while($result = $req->fetch()){
                            $htmlString .= '
                                <tr>
                                    <td>' . $result['matriculeEtudiant'] . '</td>
                                    <td>' . $result['fullName']. '</td>
                                    <td>' . $result['codeGroupe'] . '</td>
                                    <td>' . $result['numTel'] . '</td>
                                    <td>' . $result['annee'] . '</td>
                                    <td>' . $result['noteDiscipline'] . '/20</td>
                                </tr>
                            ';
                        }
                        $htmlString .= '</table>';
                        
                        $temporary_html_file = './' . time() . '.html';

                        file_put_contents($temporary_html_file, $htmlString);

                        $reader = IOFactory::createReader('Html');

                        $spreadsheet = $reader->load($temporary_html_file);

                        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');

                        $filename = 'liste Des Notes de discipline.xlsx';

                        $writer->save($filename);

                        header('Content-Type: application/x-www-form-urlencoded');

                        header('Content-Transfer-Encoding: Binary');

                        header("Content-disposition: attachment; filename=\"".$filename."\"");

                        readfile($filename);

                        unlink($temporary_html_file);

                        unlink($filename);

                        exit;
                        
                    }else{
                        while($result = $req->fetch()){
                            echo '
                                <div class="content__table__etdrow">
                                    <div class="content__table__etdnoterow__infos">
                                        <div class="mat" hidden>' . $result['matriculeEtudiant'] . '</div>
                                        <div>' . $result['fullName']. '</div>
                                        <div>' . $result['codeGroupe'] . '</div>
                                        <div>' . $result['numTel'] . '</div>
                                        <div>' . $result['annee'] . '</div>
                                        <div>' . $result['noteDiscipline'] . '/20</div>
                                    </div>
                                </div>
                            ';
                        }
        
                        echo '<script src="../app/script/gs/rechercheNotes.js"></script>';
                    }
                }
                

                if($_POST['type'] == "param"){
                    echo '
                        <div id="deleteOverlay" class="overlay" hidden>
                            <div class="delete-message-box">
                                <div class="delete-message-box__title"></div>
                                <div class="delete-message-box__target" hidden></div>
                                <div class="delete-message-box__code" hidden></div>
                                <div class="delete-message-box__btns flex flex-jc-sb">
                                    <input class="delete-message-box__btn" type="button" value="Supprimer" id="confirmSupp">
                                    <input class="delete-message-box__btn" type="button" value="Annuler" id="annuleSupp">
                                </div>
                            </div>
                        </div>

                        <div id="formatOverlay" class="overlay" hidden>
                            <div id = "addMessageBox" class="add-message-box">

                                <div class="add-message-box__title"></div>

                                <div class="add-message-box__form flex flex-jc-sb flex-dc">
                            
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Matricule</div>
                                        <div id="formatMat" hidden></div>
                                        <input id="formatId" type="number" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Nom</div>
                                        <input id="formatNom" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Prenom</div>
                                        <input id="formatPrenom" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Spécialité</div>
                                        <input id="formatSpec" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-ai-c flex-jc-sb">
                                        <input id="ResetBtn" class="add-message-box__formbtn" type="button" value="Réinitialiser le mot de passe">
                                        <input id="validFormatBtn" class="add-message-box__formbtn" type="button" value="Valider">
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                                    
                        <div id="addGrpOverlay" class="overlay" hidden>
                            <div id="addMessageBox" class="add-message-box">

                                <div class="add-message-box__title"></div>

                                <div class="add-message-box__form flex flex-jc-sb flex-dc">
                            
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Code groupe</div>
                                        <input id="GroupeCode" type="text" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Année</div>
                                        <input id="GroupeAnnee" type="number" class="add-message-box__form__row__input">
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Code filière</div>
                                        <select id="selectFiliere" class="add-message-box__form__row__input">';
                                            
                                            $req = $connection->prepare("SELECT DISTINCT f.* FROM filiere f JOIN groupe g ON (f.codeFiliere=g.codeFiliere) WHERE codeEFP=?");
                                            $req->execute(array($codeEFP));
                                            
                                            while($result = $req->fetch()){
                                                echo '<option value="' . $result['codeFiliere'] . '">' . $result['nom'] . '</option>';
                                            }
                                        
                                        echo '</select>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label"></div>
                                        <input id="ValiderGrpBtn" class="add-message-box__formbtn" type="button" value="Valider">
                                    </div>
                    
                                </div>
                            </div>
                        </div>

                        <div id="updateGrpOverlay" class="overlay" hidden>

                            <div id="addMessageBox" class="tabset">
                                <!-- Tab 1 -->
                                <input type="radio" name="tabset" id="tab1" aria-controls="modifier" checked>
                                <label for="tab1">Modifier le groupe</label>
                                <!-- Tab 2 -->
                                <input type="radio" name="tabset" id="tab2" aria-controls="import">
                                <label for="tab2">Importer les stagiaires</label>
                                
                                <div class="tab-panels">

                                <section id="modifier" class="tab-panel">
                                    <div class="add-message-box__form flex flex-jc-sb flex-dc">
                                        <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                            <div class="add-message-box__form__row__label">Code groupe</div>
                                            <input id="upGroupeCode" type="text" class="add-message-box__form__row__input">
                                        </div>
                                        <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                            <div class="add-message-box__form__row__label">Année</div>
                                            <input id="upGroupeAnnee" type="number" class="add-message-box__form__row__input">
                                        </div>
                                        <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                            <div class="add-message-box__form__row__label">Code filière</div>
                                            <select id="upSelectFiliere" class="add-message-box__form__row__input">';

                                            $req = $connection->prepare("SELECT DISTINCT f.* FROM filiere f JOIN groupe g ON (f.codeFiliere=g.codeFiliere) WHERE codeEFP=?");
                                            $req->execute(array($codeEFP));
                                            
                                            while($result = $req->fetch()){
                                                echo '<option value="' . $result['codeFiliere'] . '">' . $result['nom'] . '</option>';
                                            }
                                        echo '</select>
                                        </div>
                                        <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                            <div class="add-message-box__form__row__label"></div>
                                            <input id="ValiderGrpBtn" class="add-message-box__formbtn" type="button" value="Modifier">
                                        </div>
                                    </div>
                                </section>

                                    <section id="import" class="tab-panel">
                                        <div class="tab-panel__grid">
                                            <div class="tab-panel__grid__label1">Etape 1</div>
                                            <a href="../dist/template.xlsx" class="tab-panel__grid__export" download></a>
                                            <div class="tab-panel__grid__label11">Exporter le modèle</div>
                                            
                                            <div class="tab-panel__grid__label2">Etape 2</div>
                                            <label for="inporterStgs" class="tab-panel__grid__import"></label>
                                            <input id="inporterStgs" type="file" name="file" accept="Excel/.xls,.xlsx" hidden>
                                            <div class="tab-panel__grid__label22">Importer liste des Stagiaires</div>
                                        </div>  
                                    </section>
                                </div>
                            </div>
                        </div>

                        <div id="stgOverlay" class="overlay" hidden>
                            <div id="addMessageBox" class="add-message-box">

                                <div class="add-message-box__title"></div>

                                <div class="add-message-box__form flex flex-jc-sb flex-dc">
                            
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">CEF</div>
                                        <input id="matriculestg" type="text" class="add-message-box__form__row__input">
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Nom</div>
                                        <input id="nomstg" type="text" class="add-message-box__form__row__input">
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Prénom</div>
                                        <input id="prenomstg" type="text" class="add-message-box__form__row__input">
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Genre</div>
                                        <select id="genrestg" class="add-message-box__form__row__input">
                                            <option value="F">Féminin</option>
                                            <option value="H">Masculin</option>
                                        </select>
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Date naissance</div>
                                        <input id="dateNaissancestg" type="date" class="add-message-box__form__row__input">
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Numéro téléphone</div>
                                        <input id="telstg" type="number" class="add-message-box__form__row__input">
                                    </div>

                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label">Groupe</div>
                                        <select id="groupestg" class="add-message-box__form__row__input">';

                                            $req = $connection->prepare("SELECT DISTINCT * FROM groupe g WHERE codeEFP=?");
                                            $req->execute(array($codeEFP));
                                            
                                            while($result = $req->fetch()){
                                                echo '<option value="' . $result['codeGroupe'] . '">' . $result['codeGroupe'] . '</option>';
                                            }
                                        echo '</select>
                                    </div>
                                    <div class="add-message-box__form__row flex flex-jc-sb flex-ai-c">
                                        <div class="add-message-box__form__row__label"></div>
                                        <input id="ValiderStgBtn" class="add-message-box__formbtn" type="button">
                                    </div>
                                </div>
                            </div>
                        </div>
                                    
                        <div class="content-param__head flex flex-ai-c flex-jc-sb">
                            <div class="content__title">Paramètres</div>
                            <div class="content-param__head__btns flex flex-jc-fe hide-scrollbar">
                                <input class="content-param__head__btn active" type="button" id="format" value="Formateurs">';
                            if($personnel['titre'] == 'CSRIO') echo '<input class="content-param__head__btn" type="button" id="gs" value="Gestionnaires">';
                            echo '<input class="content-param__head__btn" type="button" id="grp" value="Groupes">
                                <input class="content-param__head__btn" type="button" id="stg" value="Stagiaires">
                                <input class="content-param__head__btn" type="button" id="seances" value="Séances">
                                <input class="content-param__head__btn" type="button" id="affect" value="Affectation">
                                <input class="content-param__head__btn" type="button" id="log" value="Journaux">
                            </div>
                        </div>
            
                    <section class="controls-param flex flex-ai-c flex-jc-sb">
                        <div id="paramControlsText" class="controls-param__title"></div>
                        <div class="controls-param__btns flex">
                            <input class="controls-param__btns__btn" type="button" id="ajout" value="Ajouter">
                            <input class="controls-param__btns__btn" type="button" id="supp" value="Supprimer">
                        </div>
                    </section>
                    <section class="datasection">
                    
                    </section>
                    <script src="../app/script/gs/parametres.js"></script>
                    ';
                }
                    
                if($_POST['type'] == "paramFormateurs"){
                    
                    $req = $connection->prepare("SELECT *, CONCAT(nom, ' ', prenom) AS `fullname` FROM personnel WHERE codeEFP=? AND titre='Formateur'");
                    $req->execute(array($codeEFP));
                    
                    echo '
                        <table class="datasection__datatable" style="table-layout: auto">
                            <thead class="datasection__datatable__head">
                                <th>Matricule</th>
                                <th>Nom et Prénom</th>
                                <th>Spécialité</th>
                            </thead>
                        <tbody id="formatTableBody">';
                    while($result = $req->fetch()){
                        echo '
                        <tr>
                            <td id="mat">' . $result['matricule'] . '</td>
                            <td>' . $result['fullname'] . '</td>
                            <td>' . $result['specialite'] . '</td>
                            <td class="param-delete"></td>
                        </tr>';
                    }
                    echo '</tbody>
                    </table>
                    <script defer src="../app/script/gs/paramFormateurs.js"></script>';
                }

                if($_POST['type'] == "paramResetPass"){
                    $req = $connection->prepare("UPDATE personnel SET motdepass=? WHERE matricule=?");
                    if($req->execute(array($_POST['mat'], $personnel['matricule'])))
                        echo 'success';
                    else echo 'err';
                }

                if($_POST['type'] == "formateurInfos"){
                    $req = $connection->prepare("SELECT * FROM personnel WHERE matricule=?");
                    $req->execute(array($_POST['matricule']));
                    echo json_encode($req->fetch());
                }

                if($_POST['type'] == "paramGroupes"){
                    
                    $req = $connection->prepare("SELECT f.codeFiliere, g.codeGroupe, f.nom, g.annee FROM groupe g JOIN filiere f ON (g.codeFiliere=f.codeFiliere) WHERE g.codeEFP=?");
                    $req->execute(array($codeEFP));
                    
                    
                    echo '
                    <table class="datasection__datatable" style="table-layout: auto">
                        <thead class="datasection__datatable__head">
                            <th>Groupe</th>
                            <th>Filière</th>
                            <th>Année</th>
                        </thead>
                    <tbody id="groupeTableBody">';
                    while($result = $req->fetch()){
                        echo '
                        <tr>
                            <td id="codeGrp">' . $result['codeGroupe'] . '</td>
                            <td id="' . $result['codeFiliere'] . '">' . $result['nom'] . '</td>
                            <td id="annee">' . $result['annee'] . '</td>
                            <td class="param-delete"></td>
                        </tr>';
                    }
                    echo '</tbody>
                    </table>
                    <script src="../app/script/gs/paramGroupes.js"></script>';
                }

                if($_POST['type'] == "paramStagiaires"){
                    echo '
                        <div class="flex">
                            <div class="entry-blocks filters__groupe" style="margin:.5rem">
                                <select class="entry" id="groupe">';

                                echo '<option value="tous">Tous les groupes</option>';
                                
                                $req = $connection->prepare("SELECT * FROM groupe WHERE codeEFP=?");
                                $req->execute(array($codeEFP));
                                
                                while($result = $req->fetch()) {
                                    echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                }

                        echo '</select>
                            </div>
                            <div class="entry-blocks filters__search" style="margin:.5rem">
                                <input class="entry" type="text" placeholder="CEF ou nom et prénom" id="search">
                            </div>
                        </div>
                        <table class="datasection__datatable" style="table-layout: auto; margin-top:1rem">
                            <thead class="datasection__datatable__head">
                                <th>CEF</th>
                                <th>Nom et Prénom</th>
                                <th>Groupe</th>
                                <th>Date Naissance</th>
                            </thead>
                            <tbody id="stgTableBody"></tbody>
                        </table>
                        <script src="../app/script/gs/paramStgs.js"></script>
                    ';
                }

                if($_POST['type'] == "paramListeStg"){
                    if(isset($_POST['groupe'])){
                        $ind = false;
                        $sql = "SELECT s.*, CONCAT(nom, ' ', prenom) AS fullname 
                        FROM stagiaire s JOIN groupe g ON (g.codeGroupe=s.codeGroupe) 
                        WHERE g.codeEFP=?";
                        if($_POST['groupe'] != 'tous'){
                            $ind = true;
                            $sql .= " AND g.codeGroupe=?";
                        }
                        $req = $connection->prepare($sql);
                        
                        if($ind) $req->execute(array($codeEFP, $_POST['groupe']));
                        else $req->execute(array($codeEFP));
                        
                    }
                    if(isset($_POST['key'])){
                        $key = $_POST['key'];
                        $req = $connection->prepare("SELECT st.*, CONCAT(nom, ' ', prenom) AS fullname FROM stagiaire st JOIN groupe g ON (g.codeGroupe=st.codeGroupe) 
                        WHERE g.codeEFP=? AND (matriculeEtudiant LIKE '%$key%' OR nom LIKE '%$key%' OR prenom LIKE '%$key%')");
                        
                        $req->execute(array($codeEFP));
                        
                    }
                    while($result = $req->fetch()){
                        echo '
                        <tr>
                            <td id="mat">' . $result['matriculeEtudiant'] . '</td>
                            <td id="fullname">' . $result['fullname'] . '</td>
                            <td id="groupe">' . $result['codeGroupe'] . '</td>
                            <td>' . date('d/m/Y', strtotime($result['dateNaissance'])) . '</td>
                            <td id="nom" hidden>' . $result['nom'] . '</td>
                            <td id="prenom" hidden>' . $result['prenom'] . '</td>
                            <td id="tel" hidden>' . $result['numTel'] . '</td>
                            <td id="genre" hidden>' . $result['genre'] . '</td>
                            <td id="date" hidden>' . $result['dateNaissance'] . '</td>
                            <td class="param-delete"></td>
                        </tr>';
                    }
                    echo '<script src="../app/script/gs/paramListeStgs.js"></script>';
                }

                if($_POST['type'] == "addF"){
                    if(isset($_POST['mat']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['spec'])){
                        $mat = $_POST['mat'];
                        $nom = $_POST['nom'];
                        $prenom = $_POST['prenom'];
                        $spec = $_POST['spec'];
                        if($mat != "" && $nom != "" && $prenom != "" && $spec != ""){
                            $req = $connection->prepare("INSERT INTO personnel(matricule, nom, prenom, titre, specialite, motdepass, codeEFP) VALUES (?,?,?,?,?,?,?)");
                            $req->execute(array($mat,$nom, $prenom, "Formateur", $spec, $mat, $codeEFP));
                            
                            echo 'success add';
                        }else echo 'ERROR: Veuillez remplir tous les champs';
                    }else echo 'not set';
                }

                if($_POST['type'] == "addG"){
                    if(isset($_POST['codeGrp']) && isset($_POST['annee']) && isset($_POST['filiere'])){
                        $grp = $_POST['codeGrp'];
                        $annee = $_POST['annee'];
                        $filiere = $_POST['filiere'];
                        if($grp != "" && $annee != "" && $filiere != ""){
                            $req = $connection->prepare("INSERT INTO groupe(codeGroupe, annee, codeFiliere, codeEFP) VALUES (?,?,?,?)");
                            $req->execute(array($grp, $annee, $filiere, $codeEFP));
                            echo 'success add';
                        }else echo 'ERROR: Veuillez remplir tous les champs';
                    }else echo 'not set';
                }
                
                if($_POST['type'] == "addStg"){
                    if($_POST['mat'] != "" && $_POST['nom'] != "" && $_POST['prenom'] != "" 
                    && $_POST['genre'] != "" && $_POST['naissance'] != "" 
                    && $_POST['tel'] != "" && $_POST['groupe'] != "" ){
                        $req = $connection->prepare("INSERT INTO stagiaire(matriculeEtudiant, nom, prenom, genre, dateNaissance, numTel, codeGroupe) VALUES (?,?,?,?,?,?,?)");
                        $req->execute(array($_POST['mat'], $_POST['nom'], $_POST['prenom'], $_POST['genre'], $_POST['naissance'], $_POST['tel'], $_POST['groupe']));
                        echo 'success add';
                    }else echo 'ERROR: Veuillez remplir tous les champs';
                }
                
                if($_POST['type'] == "updateF"){
                    if($_POST['newMat'] != '' && $_POST['nom'] != '' && $_POST['prenom'] != '' && $_POST['spec'] != ''){
                        $req = $connection->prepare("UPDATE personnel SET matricule=?, nom=?, prenom=?,specialite=? WHERE matricule=?");
                        if($req->execute(array($_POST['newMat'], $_POST['nom'], $_POST['prenom'], $_POST['spec'], $_POST['oldMat'])))
                            echo 'success';
                        else echo 'modification échouée';
                    }else
                        echo 'ERROR: Veuillez remplir tous les champs';
                }
                
                if($_POST['type'] == "updateG"){
                    $grp = $_POST['codeGrp'];
                    $annee = $_POST['annee'];
                    $filiere = $_POST['filiere'];
                    if($grp != "" && $annee != "" && $filiere != ""){
                        $req = $connection->prepare("UPDATE groupe SET codeGroupe=?, annee=?, filiere=? WHERE codeGroupe=?");
                        if($req->execute(array($grp, $annee, $filiere, $grp)))
                            echo 'success';
                        else echo 'modification échouée';
                    }else
                        echo 'ERROR: Veuillez remplir tous les champs';
                }
                
                if($_POST['type'] == "updateStg"){
                    if($_POST['mat'] != "" && $_POST['nom'] != "" && $_POST['prenom'] != "" 
                    && $_POST['genre'] != "" && $_POST['naissance'] != "" 
                    && $_POST['tel'] != "" && $_POST['groupe'] != "" ){
                        $req = $connection->prepare("UPDATE stagiaire SET nom=?, prenom=?, genre=?, dateNaissance=?, numTel=?, codeGroupe=? WHERE matriculeEtudiant=?");
                        $req->execute(array($_POST['nom'], $_POST['prenom'], $_POST['genre'], $_POST['naissance'], $_POST['tel'], $_POST['groupe'], $_POST['mat']));
                        echo 'success';
                    }else echo 'ERROR: Veuillez remplir tous les champs';
                }
                
                if($_POST['type'] == "deleteF"){
                    if(isset($_POST['mat'])){
                        $mat = $_POST['mat'];
                        $req = $connection->prepare("DELETE FROM personnel WHERE matricule=?");
                        $req->execute(array($mat));
                        echo 'success delete';
                    }else echo 'ERROR: not set';
                }
                
                if($_POST['type'] == "deleteG"){
                    if(isset($_POST['grp'])){
                        $req = $connection->prepare("DELETE FROM groupe WHERE codeGroupe=?");
                        $req->execute(array($_POST['grp']));
                        echo 'success delete';
                    }else echo 'ERROR: not set';
                }

                if($_POST['type'] == "deleteStg"){
                    if(isset($_POST['mat'])){
                        $req = $connection->prepare("DELETE FROM stagiaire WHERE matriculeEtudiant=?");
                        $req->execute(array($_POST['mat']));
                        echo 'success delete';
                    }else echo 'ERROR: not set';
                }

                if($_POST['type'] == "paramSeances"){
                    echo '
                        <div class="flex">
                            <div class="entry-blocks filters__groupe" style="margin:.5rem">
                                <select class="entry" id="formateur" style="width:50%;">';

                                echo '<option value="tous">Tous les formateurs</option>';
                                
                                $req = $connection->prepare("SELECT *,CONCAT(nom, ' ', prenom) AS fullName FROM personnel 
                                WHERE titre='Formateur' AND codeEFP=?");
                                $req->execute(array($codeEFP));
                                
                                while($result = $req->fetch()) {
                                    echo '<option value="'.$result['matricule'].'">'.$result['fullName'].'</option>';
                                }

                        echo '</select>
                            </div>
                            <!--<div class="entry-blocks filters__search" style="margin:.5rem">
                                <input class="entry" type="date" id="search">
                            </div>-->
                        </div>
                        <table class="datasection__datatable" style="table-layout: auto; margin-top:1rem">
                            <thead class="datasection__datatable__head">
                                <th>Formateur</th>
                                <th>Heure début</th>
                                <th>Heure fin</th>
                                <th>Activer</th>
                            </thead>
                            <tbody id="seanceTableBody"></tbody>
                        </table>
                        <script src="../app/script/gs/paramSeances.js"></script>
                    ';
                }

                if($_POST['type'] == "paramListeSeances"){
                    if(isset($_POST['formateur'])){
                        $ind = false;
                        $sql = "SELECT s.codeSeance, CONCAT(nom, ' ', prenom) AS fullname, jour, p.matricule, heurDebut, heurFin, active
                        FROM seance s JOIN affectation af ON (af.codeAffectation=s.codeAffectation) 
                        JOIN personnel p ON (af.matricule=p.matricule) 
                        WHERE DAYNAME(jour)=DAYNAME(CURDATE()) AND p.codeEFP=? AND p.titre!='GS' AND p.titre!='CSRIO' ";
                        if($_POST['formateur'] != 'tous'){
                            $ind = true;
                            $sql .= "AND p.matricule=? ";
                        }
                        $sql .= "GROUP BY p.matricule, heurDebut, heurFin ORDER BY jour";
                        $req = $connection->prepare($sql);
                        
                        if($ind) $req->execute(array($codeEFP, $_POST['formateur']));
                        else $req->execute(array($codeEFP));
                        
                        while($result = $req->fetch()){
                            echo '
                            <tr>
                                <td id="mat" hidden>' . $result['matricule'] . '</td>
                                <td id="fullname">' . $result['fullname'] . '</td>
                                <td id="hdebut">' . $result['heurDebut'] . '</td>
                                <td id="hfin">' . $result['heurFin'] . '</td>';
                                if($result['active'] == 1)
                                echo '<td id="etat"><input class="etatCheck" type="checkbox" checked/></td>';
                                else echo '<td id="etat"><input class="etatCheck" type="checkbox"/></td>';
                                echo '<td class="param-delete"></td>
                            </tr>';
                        }
                    }
                    echo '<script src="../app/script/gs/paramListeSeances.js"></script>';
                }
                //
                    
                if($_POST['type'] == "etatDesSeances"){
                    $sql = "UPDATE seance SET ";
                    $sql .= ($_POST['action'] == 'activer') ? "active=b'1'" : "active=b'0'";
                    $sql .= " WHERE heurDebut=? AND heurFin=? AND codeAffectation IN 
                    (SELECT codeAffectation FROM affectation WHERE matricule=?)";
                    $req = $connection->prepare($sql);
                    $req->execute(array( $_POST['hdebut'], $_POST['hfin'], $_POST['matricule']));
                }

                if($_POST['type'] == "listStgUpload"){

                    if($_FILES["file"]["name"] != ''){

                        $allowed_extension = array('xls', 'xlsx');
                        $file_array = explode(".", $_FILES["file"]["name"]);
                        $file_extension = end($file_array);

                        if(in_array($file_extension, $allowed_extension)){
                            $file_name = time() . '.' . $file_extension;
                            move_uploaded_file($_FILES['file']['tmp_name'], $file_name);
                            $file_type = \PhpOffice\PhpSpreadsheet\IOFactory::identify($file_name);
                            $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($file_type);

                            $spreadsheet = $reader->load($file_name);

                            unlink($file_name);

                            $data = $spreadsheet->getActiveSheet()->toArray();

                            foreach(array_slice($data, 1) as $row){

                                $req = $connection->prepare("SELECT * FROM stagiaire WHERE matriculeEtudiant=?");
                                $req->execute(array($row[0]));
                                if($req->rowCount() == 0){
                                    $insert_data = array(
                                        ':matriculeEtudiant'  => $row[0],
                                        ':nom'  => $row[1],
                                        ':prenom'  => $row[2],
                                        ':genre'  => strtoupper($row[3]),
                                        ':dateNaissance'  => $row[4],
                                        ':cin'  => $row[5],
                                        ':numTel'  => $row[6],
                                        ':adresse'  => $row[7],
                                        ':noteDiscipline'  => ($_POST['annee'] == 1) ? 20 : 15,
                                        ':codeGroupe'  => $_POST['grp']
                                    );
                                    $query = "INSERT INTO stagiaire 
                                    VALUES (:matriculeEtudiant, :nom, :prenom, :genre, :dateNaissance, :cin, :numTel, :adresse, :noteDiscipline, :codeGroupe)
                                    ";
        
                                    $statement = $connection->prepare($query);
                                    $statement->execute($insert_data);
                                }
                            }
                            $message = 'succes';

                        }else{
                            $message = 'Type de fichier invalide, Sélectionner un fichier Excel s\'il vous plaît';
                        }
                    }else{
                        $message = 'Fichier introuvable';
                    }

                    echo $message;
                }

                if($_POST['type'] == "affectation"){
                    echo '
                        <div class="filters__primary">
                
                            <div class="entry-blocks filters__groupe">
                                <div class="labels">Formateur</div>
                                <select class="entry" name="formateur" id="formateur">';

                                    $req = $connection->prepare("SELECT *,CONCAT(nom, ' ', prenom) AS fullname FROM personnel WHERE codeEFP=?");
                                    $req->execute(array($codeEFP));

                                    while($result = $req->fetch()) {
                                        echo '<option value="'.$result['matricule'].'">'.$result['fullname'].'</option>';
                                    }
                
                                echo '</select>
                            </div>
                            <div class="entry-blocks filters__groupe">
                                <div class="labels">Groupe</div>
                                <select class="entry" name="groupe" id="groupe" onchange="getDetail()">';

                                    $req = $connection->prepare("SELECT codeGroupe FROM groupe WHERE codeEFP=?");
                                    $req->execute(array($codeEFP));
                                    
                                    while($result = $req->fetch()) {
                                        echo '<option value="'.$result['codeGroupe'].'">'.$result['codeGroupe'].'</option>';
                                    }
                
                                echo '</select>
                            </div>
                            <div class="entry-blocks filters__module">
                                <div class="labels">Module</div>
                                <select class="entry" name="module" id="module"></select>
                            </div>
                
                        </div>
                
                        <input class="entry" id="validerAffectation" type="button" value="Valider"/>

                        <script src="../app/script/gs/affectation.js"></script>
                    ';
                }

                if($_POST['type'] == "affecterGroupe"){
                        $grp = $_POST['grp'];
                        $format = $_POST['format'];
                        $mod = $_POST['mod'];
                        if($grp != "" && $format != "" && $mod != ""){

                            $req = $connection->prepare("SELECT * FROM affectation WHERE codeGroupe=? AND codeModule=?");
                            $req->execute(array($grp, $mod));
                            if($req->rowCount() == 0)
                                $req = $connection->prepare("INSERT INTO affectation(matricule, codeGroupe, anneeAffectation, codeModule) VALUES (?,?,?,?)");
                            else 
                                $req = $connection->prepare("UPDATE affectation SET matricule=? WHERE codeGroupe=? AND anneeAffectation=? AND codeModule=?");
                            
                            $req->execute(array($format, $grp, date('Y'), $mod));
                            echo 'INFOS: Le module a été affecté avec succès';
                        }else echo 'ERROR: Veillez remplir tous les champs';
                }

                if($_POST['type'] == "loglist"){
                    
                    $req = $connection->prepare("SELECT *, CONCAT(nom, ' ', prenom) AS fullname 
                    FROM `log` l JOIN personnel p ON (p.matricule=l.matricule)
                    WHERE codeEFP=? ORDER BY l.`date` DESC");
                    $req->execute(array($codeEFP));
                    
                    echo '
                        <table class="datasection__datatable">
                            <colgroup>
                                <col class="datasection__datatable__short">
                                <col class="datasection__datatable__short">
                                <col class="datasection__datatable__medium">
                            </colgroup>
                            <thead class="datasection__datatable__head">
                                <th>Date</th>
                                <th>Nom et Prenom</th>
                                <th>Opération</th>
                            </thead>
                            <tbody>';
                            while($result = $req->fetch()){
                                echo '
                                <tr>
                                    <td>' . date('d/m/Y h:i', strtotime($result['date'])) . '</td>
                                    <td>' . $result['fullname'] . '</td>
                                    <td>' . $result['operation'] . '</td>
                                </tr>';
                            }
                            echo '</tbody>
                        </table>
                    ';
                }

            } else
                echo 'notGS';

            $_SESSION['LAST_ACTIVITY'] = time();

        }else echo 'session ech';
    } else
        echo 'notConnected';