<?php
require '../vendor/autoload.php';

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
        'file' => "00_ALL_" . $folder . "_CA Window Door.csv",
        'count' => ''
    ),
    1 => array(
        'query' => "003a27_01_Alit_ALL_Kitchen Bathroom Decks",
        'file' => "01_ALL_" . $folder . "_KitchenBathDecksRenovate.csv",
        'count' => ''
    ),
    2 => array(
        'query' => "003a27_02_Alit_LA",
        'file' => "02_LA_" . $folder . ".csv",
        'count' => ''
    ),
    3 => array(
        'query' => "003a27_03_Alit_SD",
        'file' => "03_SD_" . $folder . ".csv",
        'count' => ''
    ),
    4 => array(
        'query' => "003a27_04_Alit_WA",
        'file' => "04_WA_" . $folder . ".csv",
        'count' => ''
    ),
    5 => array(
        'query' => "003a27_05_Alit_BAY South",
        'file' => "05_BAY_" . $folder . " South.csv",
        'count' => ''
    ),
    6 => array(
        'query' => "003a27_06_Alit_BAY North",
        'file' => "06_BAY_" . $folder . " North.csv",
        'count' => ''
    ),
    7 => array(
        'query' => "003a27_07_Alit_OR",
        'file' => "07_OR_" . $folder . ".csv",
        'count' => ''
    ),
    8 => array(
        'query' => "003a27_08_Alit_Austin",
        'file' => "08_TX_Austin_" . $folder . ".csv",
        'count' => ''
    ),
    9 => array(
        'query' => "003a27_09_Alit_Houston",
        'file' => "09_TX_Houston_" . $folder . ".csv",
        'count' => ''
    ),
    10 => array(
        'query' => "003a27_10_Alit_Dallas",
        'file' => "10_TX_Dallas_" . $folder . ".csv",
        'count' => ''
    )
);

$a_xls = array(
    0 => array(
        'query' => "003a10_Palm CON WA <<< PALM NEW>>>------------",
        'sheet' => "WA",
        'count' => ''
    ),
    1 => array(
        'query' => "003a11_Palm CON BAY",
        'sheet' => "BAY",
        'count' => ''
    ),
    2 => array(
        'query' => "003a12_Palm CON SD",
        'sheet' => "SD",
        'count' => ''
    ),
    3 => array(
        'query' => "003a13_Palm CON LA",
        'sheet' => "LA",
        'count' => ''
    ),
    4 => array(
        'query' => "003a13a_Palm CON FL",
        'sheet' => "FL",
        'count' => ''
    )
);

$a_trc = array(
    0 => array(
        'query' => '003a23_TRC_1 CA_LA',
        'key' => 'Date 1 - LA',
        'count' => '',
    ),
    1 => array(
        'query' => '003a23_TRC_2 CA_VENTURA',
        'key' => 'Date 2 - VENT',
        'count' => '',
    ),
    2 => array(
        'query' => '003a23_TRC_3 CA_OR',
        'key' => 'Date 3 - OR',
        'count' => '',
    ),
    3 => array(
        'query' => '003a23_TRC_4 CA_SB RS',
        'key' => 'Date 4 - SB RV',
        'count' => '',
    ),
    4 => array(
        'query' => '003a23_TRC_5 WA',
        'key' => 'Date 5 - WA',
        'count' => '',
    ),
);

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
                $d = $spreadsheet->getSheet($index)->toArray();
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
            $query = $xls['query'];
            $sth = $db->prepare("select * from [$query]");
            $sth->execute();

            $worksheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($mySpreadsheet, $xls['sheet']);
            $mySpreadsheet->addSheet($worksheet, $index);

            $data = [];
            if ($index === 3)
                array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY.COUNTY']);
            else
                array_push($data, ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY']);

            $a_xls[$index]['count'] = 0;
            while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
                if ($row['Phone'] == $xls['pre_phone']) break;

                if ($index === 3)
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
    if ($file_type === 'trc' || $file_type === 'all') {
        //get previous csv download information
        if (file_exists($trc_previous_path)) {
            $files = glob($trc_previous_path . "\\" . "*.csv");

            $sel_index = -1;
            if (($handle = fopen($files[0], "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {
                    if ($sel_index !== -1) {
                        $a_trc[$sel_index]['pre_phone'] = $data[1];
                        $sel_index = -1;
                    }

                    foreach($a_trc as $index => $trc) {
                        if ($trc['key'] === $data[0]) {
                            $sel_index = $index;
                        }
                    }
                }
                fclose($handle);
            } else {
                echo json_encode(array('status' => 'warning', 'description' => "Can't open TRC previous download file"));
                exit;
            }
        } else {
            echo json_encode(array('status' => 'error', 'description' => 'TRC previous download file path wrong'));
            exit;
        }

        $folder_path = $trc_path . "\\" . $folder . "\\";

        if (!file_exists($folder_path)) {
            mkdir($folder_path, 0777, true);
        }

        $fp = fopen($folder_path . "\\" . $folder . '_TRC.csv', 'w');

        foreach ($a_trc as $index => $trc) {
            $query = $trc['query'];
            $sth = $db->prepare("select * from [$query]");
            $sth->execute();

            $data = array();

            fputcsv($fp, array($trc['key'], 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'County'));

            $a_trc[$index]['count'] = 0;
            while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
                if ($row['Phone'] === $trc['pre_phone']) break;

                fputcsv($fp, array($row[$trc['key']], $row['Phone'], $row['Name'], $row['Address'], $row['City'], $row['State'], $row['Zip'], $row['Job Group'], $row['County']));

                $a_trc[$index]['count'] = $a_trc[$index]['count'] + 1;
            }

            fputcsv($fp, array('', '', '','', '', '', '', '', ''));
        }

        fclose($fp);

        $trc_previous_path = $trc_path . "\\" . $folder;
    }

} catch(PDOException $e) {
    echo json_encode(array('status' => 'error', 'description' => 'mdb file path wrong'));
    exit;
}

$date_info = getDate(strtotime($date));
$_time = ($time == '8AM' ? '8am' : '2pm');

$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xls");
$spreadsheet = $reader->load($count_xls_path);
$sheet = $spreadsheet->getActiveSheet();
$data = $sheet->toArray();

if ($date_info['wday'] == 4) {
    $cur_index = -1;
    $cur_row = [];
    foreach ($data as $i => $row) {
        if ($row[0] === $date && $row[1] === $date_info['weekday'] . ' ' . $_time) {
            $cur_index = $i; $cur_row = $row;
        }
    }

    if ($cur_index === -1) {
        $last_row = (int) $sheet->getHighestRow();

        $row = $last_row + 1;

        $col = 1;
        $sheet->setCellValueByColumnAndRow($col++, $row, $date);
        $sheet->setCellValueByColumnAndRow($col++, $row, $date_info['weekday'] . ' ' . $_time);

        foreach($a_xls as $index => $xls) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $xls['count']);
        }
        $col++;
        foreach($a_trc as $index => $trc) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $trc['count']);
        }
        $col++;
        foreach($a_csv as $index => $csv) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $csv['count']);
        }
        $sheet->getStyle('C' . $row . ':T' . $row)->getAlignment()->setHorizontal('right');
    } else {
        $col = 3;
        foreach($a_xls as $index => $xls) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $xls['count']);
        }
        $col++;
        foreach($a_trc as $index => $trc) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $trc['count']);
        }
        $col++;
        foreach($a_csv as $index => $csv) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $csv['count']);
        }
        $sheet->getStyle('C' . ($cur_index + 1) . ':Z' . ($cur_index + 1))->getAlignment()->setHorizontal('right');
    }
} else {
    $cur_index = -1;
    $cur_row = [];
    foreach ($data as $i => $row) {
        if ($row[0] === $date) {
            $cur_index = $i; $cur_row = $row;
        }
    }

    if ($cur_index === -1) {
        $last_row = (int) $sheet->getHighestRow();

        $row = $last_row + 1;

        $col = 1;
        $sheet->setCellValueByColumnAndRow($col++, $row, $date);
        $sheet->setCellValueByColumnAndRow($col++, $row, $date_info['weekday']);

        foreach($a_xls as $index => $xls) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $xls['count']);
        }
        $col++;
        foreach($a_trc as $index => $trc) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $trc['count']);
        }
        $col++;
        foreach($a_csv as $index => $csv) {
            $sheet->setCellValueByColumnAndRow($col++, $row, $csv['count']);
        }
        $sheet->getStyle('C' . $row . ':Z' . $row)->getAlignment()->setHorizontal('left');
    } else {
        $col = 3;
        foreach($a_xls as $index => $xls) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $xls['count']);
        }
        $col++;
        foreach($a_trc as $index => $trc) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $trc['count']);
        }
        $col++;
        foreach($a_csv as $index => $csv) {
            $sheet->setCellValueByColumnAndRow($col++, $cur_index + 1, $cur_row[$col - 2] . ' ' . $csv['count']);
        }
        $sheet->getStyle('C' . ($cur_index + 1) . ':Z' . ($cur_index + 1))->getAlignment()->setHorizontal('left');
    }
}

$sheet->getStyle('A')->getAlignment()->setHorizontal('right');

$last_row = (int) $sheet->getHighestRow();
$sheet->getStyle('A2:' . 'Z' . ($last_row + 1))->getFont()->setBold(true)
    ->setName('Arial')
    ->setSize(8);

$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xls");
$writer->save($count_xls_path);

if ($time === '2PM') {
    $date = date("mdY", strtotime('+1 day', strtotime($date)));
    $path->download_time = '8am';
    $path->folder_name = $date . ' 8AM'; 
} else {
    $path->download_time = '2pm';
    $path->folder_name = $sp[0] . ' 2PM'; 
}

$path->csv_previous_path = $csv_previous_path;
$path->xls_previous_path = $xls_previous_path;
$path->trc_previous_path = $trc_previous_path;

file_put_contents($path_file, json_encode($path));

echo json_encode(array('status' => 'success'));
exit;