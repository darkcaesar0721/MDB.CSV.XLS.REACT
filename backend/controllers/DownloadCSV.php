<?php
error_reporting(E_ERROR);

$path_file = '../db/path.json';
$path = json_decode(file_get_contents($path_file));

$mdb_path = $path->mdb_path;
$csv_path = $path->csv_path;
$csv_previous_path = $path->csv_previous_path;

$folder = $path->folder_name;

$csv = $_REQUEST['data'];
$index = $_REQUEST['index'];

try {
    # OPEN BOTH DATABASE CONNECTIONS
    $db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)}; DBq=$mdb_path;Uid=;Pwd=;");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //get previous csv download information
    if (file_exists($csv_previous_path)) {
        $files = glob($csv_previous_path . "\\" . "*.csv");
        $file = $files[$index];

        if (($handle = fopen($file, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {
                if ($data[5] !== 'Phone') {
                    $csv['pre_phone'] = $data[5];

                    break;
                }
            }
            fclose($handle);
        } else {
            echo json_encode(array('status' => 'warning', 'description' => "Can't open CSV previous download file"));
            exit;
        }
    } else {
        echo json_encode(array('status' => 'error', 'description' => 'CSV previous download file path wrong'));
        exit;
    }

    $folder_path = $csv_path . "\\" . $folder . "\\";

    if (!file_exists($folder_path)) {
        mkdir($folder_path, 0777, true);
    }

    $query = $csv['query'];
    $sth = $db->prepare("select * from [$query]");
    $sth->execute();

    $fp = fopen($folder_path . "\\" . $csv['file'], 'w');

    if (strpos($csv['file'], "10") === 0 || strpos($csv['file'], "09") === 0 || strpos($csv['file'], "08") === 0 || strpos($csv['file'], "05") === 0) {
        fputcsv($fp, array('Name', 'Address', 'City', 'State', 'Zip', 'Phone', 'Job Group1'));
    } else if (strpos($csv['file'], "06") === 0) {
        fputcsv($fp, array('Name', 'Address', 'City', 'State', 'Zip', 'Phone', 'Job Group1', 'County1'));
    } else if (strpos($csv['file'], "01") === 0) {
        fputcsv($fp, array('Name', 'Address', 'City', 'State', 'Zip', 'Phone', 'Job Group', 'County1'));
    } else {
        fputcsv($fp, array('Name', 'Address', 'City', 'State', 'Zip', 'Phone', 'Job Group'));
    }

    $csv['count'] = 0;
    while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
        if ($row['Phone'] === $csv['pre_phone']) break;

        if (strpos($csv['file'], "10") === 0 || strpos($csv['file'], "09") === 0 || strpos($csv['file'], "08") === 0 || strpos($csv['file'], "05") === 0) {
            fputcsv($fp, array($row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Phone'], $row['Job Group1']));
        } else if (strpos($csv['file'], "06") === 0) {
            fputcsv($fp, array($row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Phone'], $row['Job Group1'], $row['County1']));
        } else if (strpos($csv['file'], "01") === 0) {
            fputcsv($fp, array($row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Phone'], $row['Job Group'], $row['County1']));
        } else {
            fputcsv($fp, array($row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Phone'], $row['Job Group']));
        }

        $csv['count'] = $csv['count'] + 1;
    }
    fclose($fp);

    echo json_encode(array('status' => 'success', 'csv' => $csv));

} catch(PDOException $e) {
    echo json_encode(array('status' => 'error', 'description' => 'mdb file path wrong'));
    exit;
}