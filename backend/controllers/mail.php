<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

$action = $_REQUEST['action'];
$name = $_REQUEST['name'];

$path_file = '../db/path.json';
$path = json_decode(file_get_contents($path_file));

$email_file = '../db/email.json';
$email = json_decode(file_get_contents($email_file));

$setting_file = '../db/emailSetting.json';
$settings = json_decode(file_get_contents($setting_file));

$settings->shai1->open = false;
$settings->shai2->open = false;
$settings->palm1->open = false;

$a_counts = [
    0 => [
        'c' => '0 Shai - W D, CA',
        'k' => 'CA W, D',
        'i' => -1,
        'v' => 0,
    ],
    1 => [
        'c' => '1 Shai KBD',
        'k' => 'KBDR',
        'i' => -1,
        'v' => 0,
    ],
    2 => [
        'c' => '2 ALIT Shai LA',
        'k' => 'LA',
        'i' => -1,
        'v' => 0,
    ],
    3 => [
        'c' => '3 ALIT Shai SD',
        'k' => 'SD',
        'i' => -1,
        'v' => 0,
    ],
    4 => [
        'c' => '4 ALIT Shai WA',
        'k' => 'WA',
        'i' => -1,
        'v' => 0,
    ],
    5 => [
        'c' => '5 ALIT Shai BAY South',
        'k' => 'BAY S.',
        'i' => -1,
        'v' => 0,
    ],
    6 => [
        'c' => '6 ALIT Shai BAY Noth',
        'k' => 'BAY N.',
        'i' => -1,
        'v' => 0,
    ],
    7 => [
        'c' => '7 ALIT Shai OR',
        'k' => 'OR',
        'i' => -1,
        'v' => 0,
    ],
//    8 => [
//        'c' => '8 ALIT Shai TX',
//        'k' => 'AUS',
//        'i' => -1,
//        'v' => 0,
//    ],
    9 => [
        'c' => ' 9 ALIT Shai TX HOU',
        'k' => 'HOU',
        'i' => -1,
        'v' => 0,
    ],
    10 => [
        'c' => '10 ALIT Shai TX  DAL',
        'k' => 'DAL',
        'i' => -1,
        'v' => 0,
    ]
];

switch($action) {
    case 'set_setting_data':
        if ($name === 'shai1') {
            $settings->$name->open = true;

            if ($path->csv_previous_path === '') {
                echo json_encode(array('status' => 'error', 'text' => 'csv previous path is invalid.'));
                exit;
            }
            $folder_path = $path->csv_previous_path;
            $sp = explode('\\', $folder_path);
            $folder_name = $sp[count($sp) - 1];
            $file_name = '00_ALL_' . $folder_name . '_CA Window Door.csv';
            $file_path = $folder_path . '\\' . $file_name;
            if (!file_exists($file_path)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name . " doesn't exist."));
                exit;
            }
            $settings->$name->subject = $folder_name;
            $settings->$name->files = [['path' => $file_path, 'name' => $file_name]];
        }
        if ($name === 'shai2') {
            $settings->$name->open = true;
            $settings->$name->files = [];
            
            if ($path->csv_previous_path === '') {
                echo json_encode(array('status' => 'error', 'text' => 'csv previous path is invalid.'));
                exit;
            }
            $folder_path = $path->csv_previous_path;
            $sp = explode('\\', $folder_path);
            $folder_name = $sp[count($sp) - 1];

            $file_name1 = '01_ALL_' . $folder_name . '_KitchenBathDecksRenovate.csv';
            $file_path1 = $folder_path . '\\' . $file_name1;
            if (!file_exists($file_path1)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name1 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path1, 'name' => $file_name1]);

            $file_name2 = '02_LA_' . $folder_name . '.csv';
            $file_path2 = $folder_path . '\\' . $file_name2;
            if (!file_exists($file_path2)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name2 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path2, 'name' => $file_name2]);

            $file_name3 = '03_SD_' . $folder_name . '.csv';
            $file_path3 = $folder_path . '\\' . $file_name3;
            if (!file_exists($file_path3)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name3 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path3, 'name' => $file_name3]);

            $file_name4 = '04_WA_' . $folder_name . '.csv';
            $file_path4 = $folder_path . '\\' . $file_name4;
            if (!file_exists($file_path4)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name4 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path4, 'name' => $file_name4]);

            $file_name5 = '05_BAY_' . $folder_name . ' South.csv';
            $file_path5 = $folder_path . '\\' . $file_name5;
            if (!file_exists($file_path5)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name5 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path5, 'name' => $file_name5]);

            $file_name6 = '06_BAY_' . $folder_name . ' North.csv';
            $file_path6 = $folder_path . '\\' . $file_name6;
            if (!file_exists($file_path6)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name6 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path6, 'name' => $file_name6]);

            $file_name7 = '07_OR_' . $folder_name . '.csv';
            $file_path7 = $folder_path . '\\' . $file_name7;
            if (!file_exists($file_path7)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name7 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path7, 'name' => $file_name7]);

//            $file_name8 = '08_TX_Austin_' . $folder_name . '.csv';
//            $file_path8 = $folder_path . '\\' . $file_name8;
//            if (!file_exists($file_path8)) {
//                echo json_encode(array('status' => 'error', 'text' => $file_name8 . " doesn't exist."));
//                exit;
//            }
//            array_push($settings->$name->files, ['path' => $file_path8, 'name' => $file_name8]);

            $file_name9 = '09_TX_Houston_' . $folder_name . '.csv';
            $file_path9 = $folder_path . '\\' . $file_name9;
            if (!file_exists($file_path9)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name9 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path9, 'name' => $file_name9]);

            $file_name10 = '10_TX_Dallas_' . $folder_name . '.csv';
            $file_path10 = $folder_path . '\\' . $file_name10;
            if (!file_exists($file_path10)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name10 . " doesn't exist."));
                exit;
            }
            array_push($settings->$name->files, ['path' => $file_path10, 'name' => $file_name10]);

           date_default_timezone_set('America/Los_Angeles');

           $count_path = $path->count_xls_path;

           $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();

           $spreadsheet = $reader->load($count_path);
           $d = $spreadsheet->getSheet(0)->toArray();

           foreach($d as $r) {
               foreach($r as $i => $c) {
                   foreach($a_counts as $j => $a_c) {
                       if ($a_c['c'] === $c) {
                           $a_counts[$j]['i'] = $i;
                       }
                   }
               }
           }
           
           $sp = explode(' ', $folder_name);
           $date = substr($sp[0], 0, 2) . '/' . substr($sp[0], 2, 2) . '/' . substr($sp[0], 4, 4);
           $date_info = getDate(strtotime($date));
           $time = ($sp[1] == '8AM' ? '8am' : '2pm');

           if ($date_info['wday'] == 4) {
               $cur_index = -1;
               $cur_row = [];
               foreach ($d as $i => $row) {
                   if (strtotime($row[0]) == strtotime($date) && strpos($row[1], "8am") > 0) {
                       $cur_index = $i; $cur_row = $row;
                   }
               }
               if ($cur_index !== -1) {
                   foreach($a_counts as $i => $a_c) {
                       $a_counts[$i]['v'] = $cur_row[$a_c['i']];
                   }
               }
               if ($time == "2pm") {
                   $cur_index = -1;
                   $cur_row = [];
                   foreach ($d as $i => $row) {
                       if (strtotime($row[0]) == strtotime($date) && strpos($row[1], "2pm") > 0) {
                           $cur_index = $i; $cur_row = $row;
                       }
                   }
                   if ($cur_index !== -1) {
                       foreach($a_counts as $i => $a_c) {
                           $a_counts[$i]['v'] = $a_counts[$i]['v'] . ' ' . $cur_row[$a_c['i']];
                       }
                   }
               }
           } else {
               $cur_index = -1;
               $cur_row = [];
               foreach ($d as $i => $row) {
                   if (strtotime($row[0]) == strtotime($date)) {
                       $cur_index = $i; $cur_row = $row;
                   }
               }

               if ($cur_index !== -1) {
                   foreach($a_counts as $i => $a_c) {
                       if ($time == "2pm") {
                           $a_counts[$i]['v'] = $cur_row[$a_c['i']];
                       } else {
                           $sp1 = explode(' ', $cur_row[$a_c['i']]);
                           $a_counts[$i]['v'] = $sp1[0];
                       }
                   }
               }
           }

            $settings->$name->subject = $folder_name;
            $body = "<table border='0' cellpadding='0' cellspacing='0' width='726' style='border-collapse:collapse;width:539pt'>
                           <colgroup><col width='66' span='11' style='width:49pt'>
                           </colgroup>
                           <tbody>
                               <tr height='18' style='height:13.4pt'>
                                   <td height='18' width='66' style='height:13.4pt;width:49pt;font-size:9pt;font-weight:700;font-family:Calibri,sans-serif;text-align:center;border:1pt solid silver;padding-top:1px;padding-right:1px;padding-left:1px;color:windowtext;vertical-align:bottom'>". $a_counts[0]['v'] ."</td>";

            for ($i = 1; $i < 11; $i++) {
                if ($i === 8) continue;
               $body .= "<td width='66' style='border-left:none;width:49pt;font-size:9pt;font-weight:700;font-family:Calibri,sans-serif;text-align:center;border-top:1pt solid silver;border-right:1pt solid silver;border-bottom:1pt solid silver;padding-top:1px;padding-right:1px;padding-left:1px;color:windowtext;vertical-align:bottom'>". $a_counts[$i]['v'] ."</td>";
            }

            $body .= "</tr>";
            $body .= "<tr height='18' style='height:13.4pt'>
                               <td height='18' width='66' style='height:13.4pt;border-top:none;width:49pt;font-size:9pt;font-weight:700;font-family:Calibri,sans-serif;text-align:center;border-right:1pt solid silver;border-bottom:1pt solid silver;border-left:1pt solid silver;padding-top:1px;padding-right:1px;padding-left:1px;color:windowtext;vertical-align:bottom'>". $a_counts[0]['k'] ."</td>";
            for ($i = 1; $i < 11; $i++) {
                if ($i === 8) continue;
               $body .= "<td width='66' style='border-top:none;border-left:none;width:49pt;font-size:9pt;font-weight:700;font-family:Calibri,sans-serif;text-align:center;border-right:1pt solid silver;border-bottom:1pt solid silver;padding-top:1px;padding-right:1px;padding-left:1px;color:windowtext;vertical-align:bottom'>". $a_counts[$i]['k'] ."</td>";
            }
            $body .= "</tr></tbody></table>";
            $settings->$name->body = $body;
        }
        if ($name === 'palm1') {
            $settings->$name->open = true;

            if ($path->xls_previous_path === '') {
                echo json_encode(array('status' => 'error', 'text' => 'xls previous path is invalid.'));
                exit;
            }
            $folder_path = $path->xls_previous_path;
            $sp = explode('\\', $folder_path);
            $folder_name = $sp[count($sp) - 1];
            $file_name = $folder_name . '_PALM.xls';
            $file_path = $folder_path . '\\' . $file_name;
            if (!file_exists($file_path)) {
                echo json_encode(array('status' => 'error', 'text' => $file_name . " doesn't exist."));
                exit;
            }

            $settings->$name->subject = $folder_name;
            $settings->$name->files = [['path' => $file_path, 'name' => $file_name]];
        }
        file_put_contents($setting_file, json_encode($settings));
        echo json_encode(array('status' => 'success'));
        break;

    case 'send_mail':
        $settings = json_decode(file_get_contents($setting_file));

        $settings->shai1->open = false;
        $settings->shai2->open = false;
        $settings->palm1->open = false;

        $name = $_REQUEST['name'];

        foreach($_REQUEST['rows'] as $k => $v) {
            $settings->$name->$k = $v;
        }

        foreach($settings->$name->receivers as $r) {
            $mail = new PHPMailer();

            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com;';
            $mail->SMTPAuth   = true;
            $mail->Username   = $email->sender;   // Enter your gmail-id
            $mail->Password   = $email->password;     // Enter your gmail app password that you generated
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            $mail->setFrom($email->sender); // This mail-id will be same as your gmail-id
            $mail->addAddress($r);      // Enter your reciever email-id

            $mail->isHTML(true);

            $mail->Subject = $settings->$name->subject;
            foreach($settings->$name->files as $f) {
                $mail->AddAttachment($f->path, $f->name);
            }

            $mail->Body = $settings->$name->body;

            $mail->send();
        }

        file_put_contents($setting_file, json_encode($settings));
        echo json_encode(array("status" => "success"));
        exit;
        break;
}