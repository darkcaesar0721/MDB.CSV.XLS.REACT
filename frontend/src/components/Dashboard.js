import {message, Spin, Divider, Row, Col, Modal, Button} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {actionDownloadShai, actionDownloadPalm, getPathData, actionUploadStatus} from "../redux/actions";

import ShaisDownloadStatusList from "./DownloadStatus/ShaisList";
import PalmsDownloadStatusList from "./DownloadStatus/PalmsList";

import Email from "./Email";
import FileList from "./FileList";
import Path from "./Path";
import WhatsApp from "./WhatsApp";
import LastPhone from "./LastPhone";

const Dashboard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTip, setModalTip] = useState('');
    const [open, setOpen] = useState(false);
    const [shais, setShais] = useState([]);
    const [palms, setPalms] = useState([]);
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
        
        setShais((oldState) => {
            const newState = [
                {
                    query: "003a27_00a_Alit_CA Windows Doors  ------------------------  >>",
                    key: "SHAI_CA",
                    schedule: "0 Shai - W D, CA",
                    schedule_index: -1,
                    file: "00_ALL_" + folder_name + "_CA Window Door.csv",
                    count: '',
                    schedule_count: 0,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group'],
                    status: props.path.download_way === 'all' || props.path.download_way === 'shai' ? 'loading' : '',
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                    isCreateFile: true,
                },
                {
                    query: "003a27_01_Alit_ALL_Kitchen Bathroom Decks",
                    key: "SHAI_KITCHEN",
                    schedule: "1 Shai KBD",
                    schedule_index: -1,
                    file: "01_ALL_" + folder_name + "_KitchenBathDecksRenovate.csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'County1'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_02_Alit_LA",
                    key: "SHAI_LA",
                    schedule: "2 ALIT Shai LA",
                    schedule_index: -1,
                    file: "02_LA_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_03_Alit_SD",
                    key: "SHAI_SD",
                    schedule: "3 ALIT Shai SD",
                    schedule_index: -1,
                    file: "03_SD_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_04_Alit_WA",
                    key: "SHAI_WA",
                    schedule: "4 ALIT Shai WA",
                    schedule_index: -1,
                    file: "04_WA_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_05_Alit_BAY South",
                    key: "SHAI_BAY_SOUTH",
                    schedule: "5 ALIT Shai BAY South",
                    schedule_index: -1,
                    file: "05_BAY_" + folder_name + " South.csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group1'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_06_Alit_BAY North",
                    key: "SHAI_BAY_NORTH",
                    schedule: "6 ALIT Shai BAY Noth",
                    schedule_index: -1,
                    file: "06_BAY_" + folder_name + " North.csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group1', 'County1'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_07_Alit_OR",
                    key: "SHAI_OR",
                    schedule: "7 ALIT Shai OR",
                    schedule_index: -1,
                    file: "07_OR_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_09_Alit_Houston",
                    key: "SHAI_TX_HOUSTON",
                    schedule: " 9 ALIT Shai TX HOU",
                    schedule_index: -1,
                    file: "09_TX_Houston_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group1'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                },
                {
                    query: "003a27_10_Alit_Dallas",
                    key: "SHAI_TX_DALLAS",
                    schedule: "10 ALIT Shai TX  DAL",
                    schedule_index: -1,
                    file: "10_TX_Dallas_" + folder_name + ".csv",
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group1'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedShaiKeys: [],
                }
            ]
            return newState;
        });

        setPalms((oldState) => {
            const newState = [
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a10_Palm CON WA <<< PALM NEW>>>------------",
                    key: "PALM_CON_WA",
                    sheet: "WA",
                    schedule: "Palm CON WA",
                    schedule_index: -1,
                    count: '',
                    schedule_count: 0,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    status: props.path.download_way === 'palm' ? 'loading' : '',
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                    isCreateFile: false,
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a11_Palm CON BAY",
                    key: "PALM_CON_BAY",
                    sheet: "BAY",
                    schedule: "Palm CON BAY",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a12_Palm CON SD",
                    key: "PALM_CON_SD",
                    sheet: "SD",
                    schedule: "Palm CON SD",
                    schedule_index: -1,
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13_Palm CON LA",
                    key: "PALM_CON_LA",
                    sheet: "LA",
                    schedule: "Palm CON LA",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY.COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13a_Palm CON FL",
                    key: "PALM_CON_FL",
                    sheet: "FL",
                    schedule: "Palm CON FL",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003a13b_Palm CON TX",
                    key: "PALM_CON_TX",
                    sheet: "TX",
                    schedule: "Palm CON TX",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'County'],
                    count: '',
                    schedule_count: 0,
                    isDownload: false,
                    isUploadCount: false,
                    duplicatedPalmKeys: [],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006a_Palm WA",
                    key: "PALM_WA",
                    sheet: "WA",
                    schedule: "Palm CON WA",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_WA'],
                    isCreateFile: true,
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006b_Palm BAY",
                    key: "PALM_BAY",
                    sheet: "BAY",
                    schedule: "Palm CON BAY",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_BAY'],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006c_Palm SD",
                    key: "PALM_SD",
                    sheet: "SD",
                    schedule: "Palm CON SD",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_SD'],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006d_Palm LA",
                    key: "PALM_LA",
                    sheet: "LA",
                    schedule: "Palm CON LA",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_LA'],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006e_Palm FL",
                    key: "PALM_FL",
                    sheet: "FL",
                    schedule: "Palm CON FL",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_FL'],
                },
                {
                    file: folder_name + "_PALM.xls",
                    query: "003c_006f_Palm TX",
                    key: "PALM_TX",
                    sheet: "TX",
                    schedule: "Palm CON TX",
                    schedule_index: -1,
                    rows: [],
                    columns: ['Date', 'Phone', 'Name', 'Address', 'City', 'State', 'Zip', 'Job Group', 'COUNTY'],
                    count: '',
                    schedule_count: 0,
                    isDownload: true,
                    isUploadCount: true,
                    duplicatedPalmKeys: ['PALM_CON_TX'],
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
                downloadShai(0, function() {
                    let data = palms[0];
                    data['status'] = 'loading';
                    updatePalm(0, data);
                    downloadPalm(0);
                });
                break;

            case 'shai':
                downloadShai(0);
                break;

            case 'palm':
                downloadPalm(0);
                break;

            default:
                break;
        }
    }

    const uploadStatus = function() {
        setModalLoading(true);
        setModalTip('Upload count status....');
        props.actionUploadStatus(function() {
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

    const downloadShai = function(index, callback = undefined) {
        props.downloadShai(index, shais[index], function(resp) {
            if (resp.data.status === 'error' || resp.data.status === 'warning') {
                messageApi.error(resp.data.description);
            } else {
                resp.data.shai.status = 'complete';

                if (index + 1 === shais.length) {
                    updateShai(index, resp.data.shai);

                    if (callback === undefined) setDownloadStatus(true);
                    else callback();

                    return;
                } else {
                    let nextData = shais[index + 1];
                    nextData.status = 'loading';

                    updateShai(index, resp.data.shai, nextData);

                    downloadShai(index + 1, callback);
                }
            }
        });
    }

    const updateShai = function(index, data, nextData = undefined) {
        setShais((oldState) => {
            return [...oldState].map((c, i) => {
                return (i === index) ? data : ((nextData !== undefined && i === index + 1) ? nextData : c);
            });
        });
    }

    const downloadPalm = function(index, callback = undefined) {
        props.actionDownloadPalm(index, palms[index], function(resp) {
            if (resp.data.status === 'error' || resp.data.status === 'warning') {
                messageApi.error(resp.data.description);
            } else {
                resp.data.palm.status = 'complete';

                if (index + 1 === palms.length) {
                    updatePalm(index, resp.data.palm);
                    
                    if (callback === undefined) setDownloadStatus(true);
                    else callback();

                    return;
                } else {
                    let nextData = palms[index + 1];
                    nextData.status = 'loading';
                    updatePalm(index, resp.data.palm, nextData);

                    downloadPalm(index + 1, callback);
                }
            }
        });
    }

    const updatePalm = function(index, data, nextData = undefined) {
        setPalms((oldState) => {
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
                    <Divider><h2>MDB TO SHAI AND PALM</h2></Divider>
                </Col>
            </Row>
            <Row style={{marginTop: '1rem'}}>
                <Col span={16} offset={1}>
                    <Row>
                        <Col span={24}>
                            <Path
                                downloadSubmit={downloadSubmit}
                            />                 
                        </Col>
                        <Col span={24} style={{marginTop: "1.5rem"}}>
                            <LastPhone
                                palms={palms}
                                shais={shais}
                            />                    
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>   
                    <Email
                        setLoading={setLoading}
                        setTip={setTip}
                        messageApi={messageApi}
                    />
                    <WhatsApp/>
                </Col>
            </Row>
            <Row style={{marginTop: '1rem'}}>
                <Col span={22} offset={1}>
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
                        props.path.download_way !== undefined && (props.path.download_way === 'all' || props.path.download_way === 'shai') ?
                            <ShaisDownloadStatusList
                                shais={shais}
                            /> : ''
                    }
                    {
                        props.path.download_way !== undefined && (props.path.download_way === 'all' || props.path.download_way === 'palm') ?
                            <PalmsDownloadStatusList
                                palms={palms}
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
    { actionDownloadShai, actionDownloadPalm, getPathData, actionUploadStatus }
)(Dashboard);