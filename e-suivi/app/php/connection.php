<?php
    try {
        $connection = new PDO('mysql:host=localhost;dbname=e-suivi-bd','root','');
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo $e->getMessage();
    }