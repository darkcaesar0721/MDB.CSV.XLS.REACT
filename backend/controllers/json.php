<?php

$path_file = '../db/path.json';
$email_file = '../db/email.json';
$setting_file = '../db/emailSetting.json';

$setting = [
    'shai1' => [
        'open' => false,
        'subject' => '',
        'receivers' => [''],
        'files' => [],
        'body' => "   "
    ],
    'shai2' => [
        'open' => false,
        'subject' => '',
        'receivers' => [''],
        'files' => [],
        'body' => "   "
    ],
    'palm1' => [
        'open' => false,
        'subject' => '',
        'receivers' => [''],
        'files' => [],
        'body' => "   "
    ],
];

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

if ($action === 'get_setting_data') {
    if (!file_exists($setting_file)) {
        $fp = fopen($setting_file, 'w');
        fwrite($fp, json_encode($setting));
        fclose($fp);
    }

    echo file_get_contents($setting_file);
    exit;
}

if ($action === 'set_setting_data') {
    $settings = json_decode(file_get_contents($setting_file));

    $settings->shai1->open = false;
    $settings->shai2->open = false;
    $settings->palm1->open = false;

    $key = $_REQUEST['key'];

    foreach($_REQUEST['rows'] as $k => $v) {
        $settings->$key->$k = $v;
    }

    file_put_contents($setting_file, json_encode($settings));
    echo json_encode($settings);
    exit;
}