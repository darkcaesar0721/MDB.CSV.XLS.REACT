<?php
error_reporting(E_ERROR);

require '../vendor/autoload.php';

$path_file = '../db/path.json';
$path = json_decode(file_get_contents($path_file));

$mdb_path = $path->mdb_path;
$xls_path = $path->xls_path;
$xls_previous_path = $path->xls_previous_path;

$folder = $path->folder_name;

$xls = $_REQUEST['data'];
$index = $_REQUEST['index'];

try {
# OPEN BOTH DATABASE CONNECTIONS
$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)}; DBq=$mdb_path;Uid=;Pwd=;");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();

if (file_exists($xls_previous_path)) {
    $files = glob($xls_previous_path . "\\" . "*.xls");
    $spreadsheet = $reader->load($files[0]);

    $sheetNames = $spreadsheet->getSheetNames();
    if (array_key_exists($index, $sheetNames)) {
        $d = $spreadsheet->getSheet($index)->toArray();
        $xls['pre_phone'] = $d[1][1];
    } else {
        $xls['pre_phone'] = '';
    }
} else {
    echo json_encode(array('status' => 'error', 'description' => 'XLS previous download file path wrong'));
    exit;
}

$folder_path = $xls_path . "\\" . $folder . "\\";

if (!file_exists($folder_path)) {
    mkdir($folder_path, 0777, true);
}

if ($index * 1 === 0) {
    $mySpreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

    $mySpreadsheet->removeSheetByIndex(0);
} else {
    $mySpreadsheet = $reader->load($folder_path . "\\" . $folder . '_PALM.xls');
}

$worksheets = [];

$query = $xls['query'];
$sth = $db->prepare("select * from [$query]");
$sth->execute();

$worksheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($mySpreadsheet, $xls['sheet']);
$mySpreadsheet->addSheet($worksheet, $index);

$data = [];
if ($index * 1 === 3)
    array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY.COUNTY']);
else
    array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY']);

$xls['count'] = 0;
while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    if ($row['Phone'] == $xls['pre_phone']) break;

    if ($index * 1 === 3)
        array_push($data, [$row['Date'], $row['Phone'], $row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Job Group'], $row['COUNTY.COUNTY']]);
    else
        array_push($data, [$row['Date'], $row['Phone'], $row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Job Group'], $row['COUNTY']]);

    $xls['count'] = $xls['count'] + 1;
}

$worksheet->fromArray($data);

$worksheet->getStyle('A1:' . 'N' . ($xls['count'] + 1))->getFont()->setBold(true)
    ->setName('Arial')
    ->setSize(8);

$mySpreadsheet->setActiveSheetIndex(0);

// Save to file.
$writer = new PhpOffice\PhpSpreadsheet\Writer\Xls($mySpreadsheet);
$writer->save($folder_path . "\\" . $folder . '_PALM.xls');

echo json_encode(array('status' => 'success', 'tab' => $xls));  
} catch(PDOException $e) {
echo json_encode(array('status' => 'error', 'description' => 'mdb file path wrong'));
exit;
}