<?php
    include 'connection.php';
    session_start();
    if(isset($_SESSION['LAST_ACTIVITY'])){
        
        if((time() - $_SESSION['LAST_ACTIVITY']) < 900){
            $personnel = $_SESSION['logedPersonnel'];

            if($personnel['titre'] == 'Formateur'){

                if(isset($_POST['type'])){

                    if($_POST['type'] == "home"){
                        try {
                            echo '
                                <div class="content__title">Dernières absences</div>
                                
                                <div class="content__table__head">
                                    <div class="content__table__head__infos">
                                        <div class="content__table__head__column">Nom et Prénom</div>
                                        <div class="content__table__head__column">Module</div>
                                        <div class="content__table__head__column">Séance</div>
                                        <div>Justification</div>
                                    </div>
                                </div>
                            ';

                            $req = $connection->prepare("SELECT DISTINCT codeGroupe FROM affectation WHERE matricule = ? ORDER BY codeGroupe");
                            $req->execute([$personnel['matricule']]);
                            while($result = $req->fetch()) {
                                echo '
                                    <div class="content__groupe flex flex-ai-c flex-jc-sb">'.$result['codeGroupe'].'</div>
                                    <div class="content__table">';
                                    $req1 = $connection->prepare("CALL GetAbsences(?)");
                                    $req1->execute(array($result['codeGroupe']));
                                    if($req1->rowCount() > 0){
                                        while($result1 = $req1->fetch()) {
                                            echo '
                                                <div class="content__table__row">
                                                    <div class="content__table__row__infos">
                                                        <div class="content__table__row__column" hidden>'.$result1['matriculeEtd'].'</div>
                                                        <div class="content__table__row__column">'.$result1['fullName'].'</div>
                                                        <div class="content__table__row__column">'.$result1['nomModule'].'</div>
                                                        <div class="content__table__row__column">Le '.date('j/m/Y', strtotime($result1['jour'])).' de '. 
                                                        date('h:i', strtotime($result1['heurDebut'])) .' à '. 
                                                        date('h:i', strtotime($result1['heurFin'])) .'</div>';
                                                        if($result1['justifiee'] == 1)
                                                            echo '<div class="just">justifiée</div>';
                                                        else echo '<div class="njust">non justifiée</div>';
                                                    echo '</div>
                                                </div>';
                                        }
                                    }else{
                                        echo '
                                            <div class="content__table__aucune">Aucune Absence</div>
                                        ';
                                    }
                                echo '</div>';
                            }

                            echo '<script src="../app/script/formateur/home.js"></script>';
                            
                        } catch (PDOException $e) {
                            die("Error occurred:" . $e->getMessage());
                        }
                            
                    }

                }else echo 'err';
                
            }else
                echo 'notFormateur';

            $_SESSION['LAST_ACTIVITY'] = time();
        }else echo 'session ech';
    }else
        echo 'notConnected';
    