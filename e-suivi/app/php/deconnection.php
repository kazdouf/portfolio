<?php
    session_start();

    // Détruit toutes les variables de session
    $_SESSION = array();
    
    // En détruit la session.
    session_destroy();

    // Redirection vers login
    header('location: ../../');