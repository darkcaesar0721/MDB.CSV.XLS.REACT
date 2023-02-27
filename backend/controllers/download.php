<?php
require '../vendor/autoload.php';

use Google_Client;
use Google_Service_Sheets;
use Google_Service_Sheets_ValueRange;

$path_file = '../db/path.json';
$path = json_decode(file_get_contents($path_file));

$mdb_path = $path->mdb_path;
$count_xls_path = $path->count_xls_path;
$csv_path = $path->csv_path;
$csv_previous_path = $path->csv_previous_path;
$xls_path = $path->xls_path;
$xls_previous_path = $path->xls_previous_path;
$trc_path = $path->trc_path;
$trc_previous_path = $path->trc_previous_path;

$folder = $path->folder_name;
$time = $path->download_time;
$file_type = $path->download_way;

$sp = explode(' ', $folder);
$date = substr($sp[0], 0, 2) . '/' . substr($sp[0], 2, 2) . '/' . substr($sp[0], 4, 4);

$accdatabase = $mdb_path;

if (!file_exists($count_xls_path)) {
    echo json_encode(array('status' => 'error', 'description' => 'Count xls file path wrong'));
    exit;
}

$a_csv = array(
    0 => array(
        'query' => "003a27_00a_Alit_CA Windows Doors  ------------------------  >>",
        'schedule' => "0 Shai - W D, CA",
        'schedule_index' => -1,
        'file' => "00_ALL_" . $folder . "_CA Window Door.csv",
        'count' => ''
    ),
    1 => array(
        'query' => "003a27_01_Alit_ALL_Kitchen Bathroom Decks",
        'schedule' => "1 Shai KBD",
        'schedule_index' => -1,
        'file' => "01_ALL_" . $folder . "_KitchenBathDecksRenovate.csv",
        'count' => ''
    ),
    2 => array(
        'query' => "003a27_02_Alit_LA",
        'schedule' => "2 ALIT Shai LA",
        'schedule_index' => -1,
        'file' => "02_LA_" . $folder . ".csv",
        'count' => ''
    ),
    3 => array(
        'query' => "003a27_03_Alit_SD",
        'schedule' => "3 ALIT Shai SD",
        'schedule_index' => -1,
        'file' => "03_SD_" . $folder . ".csv",
        'count' => ''
    ),
    4 => array(
        'query' => "003a27_04_Alit_WA",
        'schedule' => "4 ALIT Shai WA",
        'schedule_index' => -1,
        'file' => "04_WA_" . $folder . ".csv",
        'count' => ''
    ),
    5 => array(
        'query' => "003a27_05_Alit_BAY South",
        'schedule' => "5 ALIT Shai BAY South",
        'schedule_index' => -1,
        'file' => "05_BAY_" . $folder . " South.csv",
        'count' => ''
    ),
    6 => array(
        'query' => "003a27_06_Alit_BAY North",
        'schedule' => "6 ALIT Shai BAY Noth",
        'schedule_index' => -1,
        'file' => "06_BAY_" . $folder . " North.csv",
        'count' => ''
    ),
    7 => array(
        'query' => "003a27_07_Alit_OR",
        'schedule' => "7 ALIT Shai OR",
        'schedule_index' => -1,
        'file' => "07_OR_" . $folder . ".csv",
        'count' => ''
    ),
    8 => array(
        'query' => "003a27_08_Alit_Austin",
        'schedule' => "8 ALIT Shai TX",
        'schedule_index' => -1,
        'file' => "08_TX_Austin_" . $folder . ".csv",
        'count' => ''
    ),
    9 => array(
        'query' => "003a27_09_Alit_Houston",
        'schedule' => " 9 ALIT Shai TX HOU",
        'schedule_index' => -1,
        'file' => "09_TX_Houston_" . $folder . ".csv",
        'count' => ''
    ),
    10 => array(
        'query' => "003a27_10_Alit_Dallas",
        'schedule' => "10 ALIT Shai TX  DAL",
        'schedule_index' => -1,
        'file' => "10_TX_Dallas_" . $folder . ".csv",
        'count' => ''
    )
);

$a_xls = array(
    20 => array(
        'query' => "003a10_Palm CON WA <<< PALM NEW>>>------------",
        'sheet' => "WA",
        'schedule' => "Palm CON WA",
        'schedule_index' => -1,
        'count' => ''
    ),
    21 => array(
        'query' => "003a11_Palm CON BAY",
        'sheet' => "BAY",
        'schedule' => "Palm CON BAY",
        'schedule_index' => -1,
        'count' => ''
    ),
    22 => array(
        'query' => "003a12_Palm CON SD",
        'sheet' => "SD",
        'schedule' => "Palm CON SD",
        'schedule_index' => -1,
        'count' => ''
    ),
    23 => array(
        'query' => "003a13_Palm CON LA",
        'sheet' => "LA",
        'schedule' => "Palm CON LA",
        'schedule_index' => -1,
        'count' => ''
    ),
    24 => array(
        'query' => "003a13a_Palm CON FL",
        'sheet' => "FL",
        'schedule' => "Palm CON FL",
        'schedule_index' => -1,
        'count' => ''
    )
);

$client = new \Google_Client();
$client->setApplicationName('Google Sheets and PHP');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(__DIR__ . '/../credentials.json');
$service = new Google_Service_Sheets($client);

$url_array = parse_url($path->schedule);
$path_array = explode("/", $url_array["path"]);

$spreadsheetId = $path_array[3];
$spreadSheet = $service->spreadsheets->get($spreadsheetId);
$sheets = $spreadSheet->getSheets();

$cur_sheet = [];
foreach($sheets as $sheet) {
    $sheetId = $sheet['properties']['sheetId'];

    $pos = strpos($path->schedule, "gid=" . $sheetId);

    if($pos) {
        $cur_sheet = $sheet;
        break;
    }
}

$response = $service->spreadsheets_values->get($spreadsheetId, $cur_sheet['properties']['title']);
$schedules = $response->getValues();

$cur_schedule_index = -1;
$cur_schedule = [];

foreach($schedules as $i => $v) {
    foreach($v as $j => $r) {
        if (strtotime($date) == strtotime(date($r))) {
            $cur_schedule_index = $i;
            $cur_schedule = $v;
        }

        foreach($a_csv as $k => $csv) {
            if ($csv['schedule'] == $r) {
                $a_csv[$k]['schedule_index'] = $j;
            }
        }

        foreach($a_xls as $k => $xls) {
            if ($xls['schedule'] == $r) {
                $a_xls[$k]['schedule_index'] = $j;
            }
        }
    }
}

try {
    # OPEN BOTH DATABASE CONNECTIONS
    $db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)}; DBq=$accdatabase;Uid=;Pwd=;");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($file_type === 'csv' || $file_type === 'all') {
        //get previous csv download information
        if (file_exists($csv_previous_path)) {
            $files = glob($csv_previous_path . "\\" . "*.csv");

            foreach($files as $index => $file) {
                if (($handle = fopen($file, "r")) !== FALSE) {
                    while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {
                        if ($data[5] !== 'Phone') {
                            $a_csv[$index]['pre_phone'] = $data[5];
                            break;
                        }
                    }
                    fclose($handle);
                } else {
                    echo json_encode(array('status' => 'warning', 'description' => "Can't open CSV previous download file"));
                    exit;
                }
            }
        } else {
            echo json_encode(array('status' => 'error', 'description' => 'CSV previous download file path wrong'));
            exit;
        }

        $folder_path = $csv_path . "\\" . $folder . "\\";

        if (!file_exists($folder_path)) {
            mkdir($folder_path, 0777, true);
        }

        foreach ($a_csv as $index => $csv) {
            if ($index == 8) continue;

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

            $a_csv[$index]['count'] = 0;
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

                $a_csv[$index]['count'] = $a_csv[$index]['count'] + 1;
            }
            fclose($fp);
        }

        $csv_previous_path = $csv_path . "\\" . $folder;
    }
    if ($file_type === 'xls' || $file_type === 'all') {
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();

        if (file_exists($xls_previous_path)) {
            $files = glob($xls_previous_path . "\\" . "*.xls");

            $spreadsheet = $reader->load($files[0]);

            foreach($a_xls as $index => $xls) {
                $sheet_index = $index * 1 - 20;
                $d = $spreadsheet->getSheet($sheet_index)->toArray();
                $a_xls[$index]['pre_phone'] = $d[1][1];
            }
        } else {
            echo json_encode(array('status' => 'error', 'description' => 'CSV previous download file path wrong'));
            exit;
        }

        $folder_path = $xls_path . "\\" . $folder . "\\";

        if (!file_exists($folder_path)) {
            mkdir($folder_path, 0777, true);
        }

        $mySpreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();

        $mySpreadsheet->removeSheetByIndex(0);

        $worksheets = [];
        foreach ($a_xls as $index => $xls) {
            $sheet_index = $index * 1 - 20;

            $query = $xls['query'];
            $sth = $db->prepare("select * from [$query]");
            $sth->execute();

            $worksheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($mySpreadsheet, $xls['sheet']);
            $mySpreadsheet->addSheet($worksheet, $sheet_index);

            $data = [];
            if ($sheet_index === 3)
                array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY.COUNTY']);
            else
                array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY']);

            $a_xls[$index]['count'] = 0;
            while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
                if ($row['Phone'] == $xls['pre_phone']) break;

                if ($sheet_index === 3)
                    array_push($data, [$row['Date'], $row['Phone'], $row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Job Group'], $row['COUNTY.COUNTY']]);
                else
                    array_push($data, [$row['Date'], $row['Phone'], $row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Job Group'], $row['COUNTY']]);

                $a_xls[$index]['count'] = $a_xls[$index]['count'] + 1;
            }

            $worksheet->fromArray($data);

            $worksheet->getStyle('A1:' . 'N' . ($a_xls[$index]['count'] + 1))->getFont()->setBold(true)
                ->setName('Arial')
                ->setSize(8);

            array_push($worksheets, $worksheet);
        }

        foreach ($worksheets as $worksheet)
        {
            foreach ($worksheet->getColumnIterator() as $column)
            {
                $worksheet->getColumnDimension($column->getColumnIndex())->setAutoSize(true);
            }
        }

        $mySpreadsheet->setActiveSheetIndex(0);

        // Save to file.
        $writer = new PhpOffice\PhpSpreadsheet\Writer\Xls($mySpreadsheet);
        $writer->save($folder_path . "\\" . $folder . '_PALM.xls');

        $xls_previous_path = $xls_path . "\\" . $folder;
    }
} catch(PDOException $e) {
    echo json_encode(array('status' => 'error', 'description' => 'mdb file path wrong'));
    exit;
}

$date_info = getDate(strtotime($date));

$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xls");
$spreadsheet = $reader->load($count_xls_path);
$sheet = $spreadsheet->getActiveSheet();
$data = $sheet->toArray();

if ($time == '2pm') $time = '2PM';
if ($time == '8am') $time = '8AM';

$rows = array();
if ($file_type === 'all') $rows = array_merge($a_csv, $a_xls);
else if ($file_type === 'csv') $rows = $a_csv;
else $rows = $a_xls;

if ($date_info['wday'] == 4) {
    $name = $date_info['weekday'] . ' ' . $time;
    $cur_schedule = [];
    $cur_schedule_index = -1;
    foreach($schedules as $i => $v) {
        $cur_date_index = -1;
        $cur_name_index = -1;
        foreach($v as $j => $r) {
            if (strtotime($date) == strtotime(date($r))) {
                $cur_date_index = $i;
            }
            if ($name == $r) {
                $cur_name_index = $i;
            }
        }

        if ($cur_date_index != -1 && $cur_date_index == $cur_name_index) {
            $cur_schedule = $v;
            $cur_schedule_index = $i;
        }
    }

    $row = ['', $date, $name];

    for ($i = 3; $i < 100; $i++) {
        $ext = false;
        foreach($rows as $c_index => $c){
            if ($i == $c['schedule_index']) {
                if ($cur_schedule_index !== -1) {
                    if ($cur_schedule[$i]) {
                        if (strpos($cur_schedule[$i], '+') !== false) {
                            array_push($row, $cur_schedule[$i] . '+' . $c['count']);
                        } else {
                            if ($cur_schedule[$i] == ' ' || $cur_schedule[$i] == '') {
                                array_push($row, $c['count']);
                            } else {
                                $exp = explode(" ", $cur_schedule[$i]);
                                if (count($exp) > 2) {
                                    array_push($row, $cur_schedule[$i] . ' ' . $c['count']);
                                } else {
                                    if ((int)$exp[0] < 13) {
                                        array_push($row, $cur_schedule[$i] . '+' . $c['count']);
                                    } else {
                                        array_push($row, $cur_schedule[$i] . ' ' . $c['count']);
                                    }
                                }
                            }
                        }
                    } else {
                        array_push($row, $c['count']);
                    }
                } else {
                    array_push($row, $c['count']);
                }
                $ext = true;
            }
        }

        if (!$ext) {
            if (!$cur_schedule[$i]) array_push($row, ' ');
            else array_push($row, $cur_schedule[$i]);
        }
    }
} else {
    $row = ['', $date, date('l')];

    for ($i = 3; $i < 100; $i++) {
        $ext = false;
        foreach($rows as $c_index => $c){
            if ($i == $c['schedule_index']) {
                if ($cur_schedule_index !== -1) {
                    if ($cur_schedule[$i]) {
                        if (strpos($cur_schedule[$i], '+') !== false) {
                            array_push($row, $cur_schedule[$i] . '+' . $c['count']);
                        } else {
                            if ($cur_schedule[$i] == ' ' || $cur_schedule[$i] == '') {
                                array_push($row, $c['count']);
                            } else {
                                $exp = explode(" ", $cur_schedule[$i]);
                                if (count($exp) > 2) {
                                    array_push($row, $cur_schedule[$i] . ' ' . $c['count']);
                                } else {
                                    if ((int)$exp[0] < 13) {
                                        array_push($row, $cur_schedule[$i] . '+' . $c['count']);
                                    } else {
                                        array_push($row, $cur_schedule[$i] . ' ' . $c['count']);
                                    }
                                }
                            }
                        }
                    } else {
                        array_push($row, $c['count']);
                    }

                } else {
                    array_push($row, $c['count']);
                }
                $ext = true;
            }
        }

        if (!$ext) {
            if (!$cur_schedule[$i]) array_push($row, ' ');
            else array_push($row, $cur_schedule[$i]);
        }
    }
}

$body = new Google_Service_Sheets_ValueRange([
    'values' => [$row]
]);
$params = [
    'valueInputOption' => 'USER_ENTERED'
];

if ($cur_schedule_index == -1) {
    $update_range = $cur_sheet['properties']['title']. '!' . 'A' . (count($schedules) + 1) . ':' . 'ZZ' . (count($schedules) + 1);
} else {
    $update_range = $cur_sheet['properties']['title'] . '!' . 'A' . ($cur_schedule_index + 1) . ':' . 'ZZ' . ($cur_schedule_index + 1);
}

$update_sheet = $service->spreadsheets_values->update($spreadsheetId, $update_range, $body, $params);

if ($time === '2PM') {
    $date = date("mdY", strtotime('+1 day', strtotime($date)));
    $path->download_time = '8AM';
    $path->folder_name = $date . ' 8AM'; 
} else {
    $path->download_time = '2PM';
    $path->folder_name = $sp[0] . ' 2PM'; 
}

$path->csv_previous_path = $csv_previous_path;
$path->xls_previous_path = $xls_previous_path;

file_put_contents($path_file, json_encode($path));

echo json_encode(array('status' => 'success'));
exit;