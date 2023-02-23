<?php

$path_file = '../db/path.json';
$email_file = '../db/email.json';

$action = $_REQUEST['action'];

if ($action === 'get_path_data') {
    if (!file_exists($path_file)) {
        $fp = fopen($path_file, 'w');
        fclose($fp);
    }

    echo file_get_contents($path_file);
    exit;
}

if ($action === 'set_path_data') {
    $path = json_decode(file_get_contents($path_file));

    foreach($_REQUEST['rows'] as $k => $v) {
        $path->$k = $v;
    }

    file_put_contents($path_file, json_encode($path));
    echo json_encode($path);
    exit;
}

if ($action === 'get_email_data') {
    if (!file_exists($email_file)) {
        $fp = fopen($email_file, 'w');
        fclose($fp);
    }

    echo file_get_contents($email_file);
    exit;
}

if ($action === 'set_email_data') {
    $email = json_decode(file_get_contents($email_file));

    foreach($_REQUEST['rows'] as $k => $v) {
        $email->$k = $v;
    }

    file_put_contents($email_file, json_encode($email));
    echo json_encode($email);
    exit;
}