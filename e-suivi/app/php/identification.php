<?php
    include_once '../php/connection.php';
    //test Keys
    define('SITE_KEY', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');
    define('SECRET_KEY', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe');

    //Ay Kz keys
    /* define('SITE_KEY', '6Leju3waAAAAALwlHW2e-IK3U9AqZNN00bYiIm07');
    define('SECRET_KEY', '6Leju3waAAAAAOGiJtZwQiuYUbjHIYFq2esHgcNC');  */

    //Atmane keys
    /* define('SITE_KEY', '6LfWzH0aAAAAAHx_1W4X86Cuo1a14uGidBNLvlN9');
    define('SECRET_KEY', '6LfWzH0aAAAAAK8Dr3z2gFYP0m3M26JH48zgCDRB'); */

    if(isset($_POST)) {
        
        $Return = getCaptcha($_POST['captcha']);
        if($Return->success == true){
            $mat = $_POST['matricule'];
            $motdepass = $_POST['motdepass'];
            
            $req = $connection->prepare("SELECT * FROM personnel WHERE matricule=? AND motdepass=?");
            $req->execute([$mat, $motdepass]);
            $result = $req->fetch();            
            if($result) {
                session_start();
                $_SESSION['LAST_ACTIVITY'] = time();
                $_SESSION['logedPersonnel'] = $result;
                echo json_encode($result);
            }
            else{
                echo 'err Votre matricule ou mot de passe est incorrect ou compte inexistant';
            }
        }else{
            echo "err Veuillez confirmer que vous n'êtes pas un robot !!";
        }
        
    }

    function getCaptcha($captchaResponse){
        $Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".SECRET_KEY."&response={$captchaResponse}");
        return json_decode($Response);
    }