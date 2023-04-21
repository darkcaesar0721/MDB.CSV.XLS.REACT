import {message, Spin, Divider, Row, Col, Modal, Button} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {downloadCSV, downloadXLSTab, getPathData, uploadStatus} from "../redux/actions";
import CSVDownloadStatusList from "./DownloadStatus/CSVList";
import XLSTabDownloadStatusList from "./DownloadStatus/XLSTabList";
import Email from "./Email";
import FileList from "./FileList";
import Path from "./Path";
import WhatsApp from "./WhatsApp";

const Dashboard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTip, setModalTip] = useState('');
    const [open, setOpen] = useState(false);
    const [csvFiles, setCSVFiles] = useState([]);
    const [xlsTabs, setXLSTabs] = useState([]);
    const [isClose, setIsClose] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState(false);

    useEffect(function() {
        init_download_status();
    }, [props.path]);

    useEffect(function() {
        if (downloadStatus === true) {
            uploadStatus();
        }
    }, [downloadStatus])

    const init_download_status = function() {
        const folder_name = props.path.folder_name === undefined ? '' : props.path.folder_name;
        
        setCSVFiles((oldState) => {
            const newState = [
                {
                    query: "003a27_00a_Alit_CA Windows Doors  ------------------------  >>",
                    schedule: "0 Shai - W D, CA",
                    schedule_index: -1,
                    file: "00_ALL_" + folder_name + "_CA Window Door.csv",
                    count: '',
                    status: props.path.download_way === 'all' || props.path.download_way === 'csv' ? 'loading' : '', 
                },
                {
                    query: "003a27_01_Alit_ALL_Kitchen Bathroom Decks",
                    schedule: "1 Shai KBD",
                    schedule_index: -1,
                    file: "01_ALL_" + folder_name + "_KitchenBathDecksRenovate.csv",
                    count: '',
                },
                {
                    query: "003a27_02_Alit_LA",
                    schedule: "2 ALIT Shai LA",
                    schedule_index: -1,
                    file: "02_LA_" + folder_name + ".csv",
                    count: ''
                },
                {
                    query: "003a27_03_Alit_SD",
                    schedule: "3 ALIT Shai SD",
                    schedule_index: -1,
                    file: "03_SD_" + folder_name + ".csv",
                    count: ''
                },
                {
                    query: "003a27_04_Alit_WA",
                    schedule: "4 ALIT Shai WA",
                    schedule_index: -1,
                    file: "04_WA_" + folder_name + ".csv",
                    count: ''
                },
                {
                    query: "003a27_05_Alit_BAY South",
                    schedule: "5 ALIT Shai BAY South",
                    schedule_index: -1,
                    file: "05_BAY_" + folder_name + " South.csv",
                    count: ''
                },
                {
                    query: "003a27_06_Alit_BAY North",
                    schedule: "6 ALIT Shai BAY Noth",
                    schedule_index: -1,
                    file: "06_BAY_" + folder_name + " North.csv",
                    count: ''
                },
                {
                    query: "003a27_07_Alit_OR",
                    schedule: "7 ALIT Shai OR",
                    schedule_index: -1,
                    file: "07_OR_" + folder_name + ".csv",
                    count: ''
                },
                {
                    query: "003a27_09_Alit_Houston",
                    schedule: " 9 ALIT Shai TX HOU",
                    schedule_index: -1,
                    file: "09_TX_Houston_" + folder_name + ".csv",
                    count: ''
                },
                {
                    query: "003a27_10_Alit_Dallas",
                    schedule: "10 ALIT Shai TX  DAL",
                    schedule_index: -1,
                    file: "10_TX_Dallas_" + folder_name + ".csv",
                    count: ''
                }
            ]
            return newState;
        });

        setXLSTabs((oldState) => {
            const newState = [
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a10_Palm CON WA <<< PALM NEW>>>------------",
                    sheet: "WA",
                    schedule: "Palm CON WA",
                    schedule_index: -1,
                    count: '',
                    status: props.path.download_way === 'xls' ? 'loading' : '', 
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a11_Palm CON BAY",
                    sheet: "BAY",
                    schedule: "Palm CON BAY",
                    schedule_index: -1,
                    count: ''
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a12_Palm CON SD",
                    sheet: "SD",
                    schedule: "Palm CON SD",
                    schedule_index: -1,
                    count: ''
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13_Palm CON LA",
                    sheet: "LA",
                    schedule: "Palm CON LA",
                    schedule_index: -1,
                    count: ''
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13a_Palm CON FL",
                    sheet: "FL",
                    schedule: "Palm CON FL",
                    schedule_index: -1,
                    count: ''
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13b_Palm CON TX",
                    sheet: "TX",
                    schedule: "Palm CON TX",
                    schedule_index: -1,
                    count: ''
                },
            ];
            return newState;
        });
    }

    const downloadSubmit = function(form) {
        setLoading(true);
        setOpen(true);
        setIsClose(false);
        setDownloadStatus(false);

        const download_way = props.path.download_way;
        switch(download_way) {
            case 'all':
                downloadCSV(0, function() {
                    let data = xlsTabs[0];
                    data['status'] = 'loading';
                    updateXLSTab(0, data);
                    downloadXLSTab(0);
                });
                break;

            case 'csv':
                downloadCSV(0);
                break;

            case 'xls':
                downloadXLSTab(0);
                break;

            default:
                break;
        }
    }

    const uploadStatus = function() {
        let data = {};
        if (props.path.download_way === 'all' || props.path.download_way === 'csv') data.csv = csvFiles;
        if (props.path.download_way === 'all' || props.path.download_way === 'xls') data.xls = xlsTabs;

        setModalLoading(true);
        setModalTip('Upload count status....');
        props.uploadStatus(data, function() {
            setModalLoading(false);
            downloadFinish();
        })
    }

    const downloadFinish = function() {
        init_download_status();

        messageApi.success('dwonload success');
        setLoading(false);
        setIsClose(true);
        setOpen(false);

        props.getPathData();
    }

    const downloadCSV = function(index, callback = undefined) {
        props.downloadCSV(index, csvFiles[index], function(resp) {
            if (resp.data.status === 'error' || resp.data.status === 'warning') {
                messageApi.error(resp.data.description);
            } else {
                resp.data.csv.status = 'complete';

                if (index + 1 === csvFiles.length) {
                    updateCSVFile(index, resp.data.csv);

                    if (callback === undefined) setDownloadStatus(true);
                    else callback();

                    return;
                } else {
                    let nextData = csvFiles[index + 1];
                    nextData.status = 'loading';

                    updateCSVFile(index, resp.data.csv, nextData);

                    downloadCSV(index + 1, callback);
                }
            }
        });
    }

    const updateCSVFile = function(index, data, nextData = undefined) {
        setCSVFiles((oldState) => {
            return [...oldState].map((c, i) => {
                return (i === index) ? data : ((nextData !== undefined && i === index + 1) ? nextData : c);
            });
        });
    }

    const downloadXLSTab = function(index, callback = undefined) {
        props.downloadXLSTab(index, xlsTabs[index], function(resp) {
            if (resp.data.status === 'error' || resp.data.status === 'warning') {
                messageApi.error(resp.data.description);
            } else {
                resp.data.tab.status = 'complete';
                
                if (index + 1 === xlsTabs.length) {
                    updateXLSTab(index, resp.data.tab);
                    
                    if (callback === undefined) setDownloadStatus(true);
                    else callback();

                    return;
                } else {
                    let nextData = xlsTabs[index + 1];
                    nextData.status = 'loading';
                    updateXLSTab(index, resp.data.tab, nextData);

                    downloadXLSTab(index + 1, callback);
                }
            }
        });
    }

    const updateXLSTab = function(index, data, nextData = undefined) {
        setXLSTabs((oldState) => {
            let newState = [...oldState];
            return newState.map((c, i) => {
                return (i === index) ? data : ((nextData !== undefined && i === index + 1) ? nextData : c);
            });
        });
    }

    const folder_name = props.path.folder_name === undefined ? '' : props.path.folder_name;

    return (
        <Spin spinning={loading} tip={tip} delay={500}>
            {contextHolder}
            <Row>
                <Col span={24}>
                    <Divider><h2>MDB TO CSV AND XLS</h2></Divider>
                    <p style={{textAlign: "center"}}>Please set mdb, csv, and xls path, then press download button!</p>
                </Col>
            </Row>
            <Row style={{marginTop: '1rem'}}>
                <Col span={21} offset={1}>
                    <Path
                        downloadSubmit={downloadSubmit}
                    />                    
                    <Email
                        setLoading={setLoading}
                        setTip={setTip}
                        messageApi={messageApi}
                    />
                    <WhatsApp/>
                    <FileList
                        path={props.path}
                        folder_name={folder_name}
                    />
                </Col>
            </Row>
            <Modal
                title="DOWNLOAD STATUS LIST"
                open={open}
                header={null}
                footer={null}
                closable={false}
                width={900}
            >
                <Spin spinning={modalLoading} tip={modalTip} delay={500}>
                    <Row>
                        <Col span={2}>
                            <Button type="primary" disabled={!isClose} onClick={(e) => {setOpen(false)}}>Close Window</Button>
                        </Col>
                    </Row>
                    {
                        props.path.download_way !== undefined && (props.path.download_way === 'all' || props.path.download_way === 'csv') ?
                            <CSVDownloadStatusList
                                csvFiles={csvFiles}
                            /> : ''
                    }
                    {
                        props.path.download_way !== undefined && (props.path.download_way === 'all' || props.path.download_way === 'xls') ?
                            <XLSTabDownloadStatusList
                                xlsTabs={xlsTabs}
                            /> : ''
                    }
                </Spin>
            </Modal>
        </Spin>
    )
}

const mapStateToProps = state => {
    return { path: state.path };
};

export default connect(
    mapStateToProps,
    { downloadCSV, downloadXLSTab, getPathData, uploadStatus }
)(Dashboard);