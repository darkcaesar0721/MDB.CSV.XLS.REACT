import {message, Spin, Divider, Row, Col, Input, Form, Select, Button, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getPathData, getEmailData, setPathData, setEmailData, download} from "../redux/actions";

const downloadTimeOption = [
    {value: '8AM', label: '8AM'},
    {value: '2PM', label: '2PM'},
];

const downloadWayOption = [
    {value: 'all', label: 'CSV & XLS & TRC'},
    {value: 'csv', label: 'CSV'},
    {value: 'xls', label: 'XLS'},
    {value: 'trc', label: 'TRC'},
];

const Dashboard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [pathForm] = Form.useForm();
    const [emailForm] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');

    const [path, setPath] = useState({});
    const [email, setEmail] = useState({});

    const [currentBtn, setCurrentBtn] = useState('');

    useEffect(function() {
        props.getPathData();
        props.getEmailData();
    }, []);

    useEffect(function() {
        pathForm.setFieldsValue(props.path);
        emailForm.setFieldsValue(props.email);

        setPath(props.path);
        setEmail(props.email);
    }, [props.path, props.email]);

    const handleDownloadSubmit = function(form) {
        setLoading(true);
        setTip('Wait for downloading data');
        props.download(function(resp) {
            setLoading(false);

            if (resp.data.status === 'error' || resp.data.status === 'warning') {
                messageApi.error(resp.data.description);
            } else {
                props.getPathData();
                messageApi.success('download success'); 
            }
        })
    }

    const handleEmailSendSubmit = function(form) {
        
    }

    const handlePathChange = function(name, e) {
        setPath((oldState) => {
            let newState = {...oldState};
            newState[name] = e.target.value;
            return newState;
        });
    }

    const savePath = function(name) {
        let rows = {};
        rows[name] = path[name] === undefined ? '' : path[name];
        props.setPathData(rows);
    }

    const handleDownloadTimeChange = function(v) {
        if (path.folder_name !== undefined || path.folder_name !== '') {
            const date = path.folder_name.split(' ')[0];
            setPath((oldState) => {
                let newState = {...oldState};
                newState.download_time = v;
                newState.folder_name = date + ' ' + v;
                return newState;
            });
            props.setPathData({download_time: v, folder_name: date + ' ' + v});
        } else {
            setPath((oldState) => {
                let newState = {...oldState};
                newState.download_time = v;
                return newState;
            });
            props.setPathData({download_time: v});
        }
    }

    const handleDownloadWayChange = function(v) {
        setPath((oldState) => {
            let newState = {...oldState};
            newState.download_way = v;
            return newState;
        });
        props.setPathData({download_way: v});
    }

    const handleEmailChange = function(name, e) {
        setEmail((oldState) => {
            let newState = {...oldState};
            newState[name] = e.target.value;
            return newState;
        });
    }

    const saveEmail = function(name) {
        let rows = {};
        rows[name] = email[name] === undefined ? '' : email[name];
        props.setEmailData(rows);
    }

    const handleEmailSendBtnClick = function(name) {
        setCurrentBtn(name);
    }
    
    const validateMessages = {
        required: '${label} is required!'
    };

    const folder_name = path.folder_name === undefined ? '' : path.folder_name;

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
                    <Form
                        onFinish={handleDownloadSubmit}
                        validateMessages={validateMessages}
                        layout="vertical"
                        form={pathForm}
                        style={{padding: '1rem', border: '1px solid #898383', borderRadius: '10px'}}
                    >
                        <Row>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['mdb_path']}
                                    label="MDB file path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    
                                >
                                    <Input size="large" placeholder="C:\mdb_work\LeadDB_ThisSMALL.mdb" onBlur={(e) => {savePath('mdb_path')}} onChange={(e) => {handlePathChange('mdb_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['csv_path']}
                                    label="CSV download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\CSV" onBlur={(e) => {savePath('csv_path')}} onChange={(e) => {handlePathChange('csv_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['xls_path']}
                                    label="XLS download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\XLS" onBlur={(e) => {savePath('xls_path')}} onChange={(e) => {handlePathChange('xls_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['trc_path']}
                                    label="TRC download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\TRC" onBlur={(e) => {savePath('trc_path')}} onChange={(e) => {handlePathChange('trc_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['count_xls_path']}
                                    label="Count xls file path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    
                                >
                                    <Input size="large" placeholder="C:\mdb_work\Query Counts.xls" onBlur={(e) => {savePath('count_xls_path')}} onChange={(e) => {handlePathChange('count_xls_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['csv_previous_path']}
                                    label="CSV previous download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\CSV\02232023 8AM" onBlur={(e) => {savePath('csv_previous_path')}} onChange={(e) => {handlePathChange('csv_previous_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['xls_previous_path']}
                                    label="XLS previous download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\XLS\02232023 8AM" onBlur={(e) => {savePath('xls_previous_path')}} onChange={(e) => {handlePathChange('xls_previous_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['trc_previous_path']}
                                    label="TRC previous download folder path"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="C:\mdb_work\TRC\02232023 8AM" onBlur={(e) => {savePath('trc_previous_path')}} onChange={(e) => {handlePathChange('trc_previous_path', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={4}>
                                <Form.Item
                                    name={['folder_name']}
                                    label="Generate folder Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="02232023 8AM" onBlur={(e) => {savePath('folder_name')}} onChange={(e) => {handlePathChange('folder_name', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['download_time']}
                                    label="Download time"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        defaultValue={path.download_time === undefined ? '8AM' : path.download_time}
                                        onChange={handleDownloadTimeChange}
                                        style={{ width: '100%' }}
                                        options={downloadTimeOption}
                                        value={path.download_time === undefined ? '8AM' : path.download_time}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item
                                    name={['download_way']}
                                    label="Download way"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        defaultValue="all"
                                        onChange={handleDownloadWayChange}
                                        style={{ width: '100%' }}
                                        options={downloadWayOption}
                                        value={path.download_way === undefined ? 'all' : path.download_way}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3} offset={12}>
                                <Form.Item
                                    style={{marginBottom: '0'}}
                                >
                                    <Popconfirm
                                        title="Download"
                                        description="Are you sure to download mdb data?"
                                        onConfirm={() => {
                                            pathForm.submit();
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" htmlType="submit">Download</Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Form
                        onFinish={handleEmailSendSubmit}
                        validateMessages={validateMessages}
                        form={emailForm}
                        style={{padding: '1rem', paddingBottom: '0', border: '1px solid #898383', borderRadius: '10px', marginTop: '1rem'}}
                    >
                        <Row>
                            <Col span={5} offset={3}>
                                <Form.Item
                                    name={['sender']}
                                    label="Sender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    
                                >
                                    <Input size="large" placeholder="yourgamil@gmail.com" onBlur={(e) => {saveEmail('sender')}} onChange={(e) => {handleEmailChange('sender', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={1}>
                                <Form.Item
                                    name={['password']}
                                    label="App password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    
                                >
                                    <Input size="large" placeholder="" onBlur={(e) => {saveEmail('password')}} onChange={(e) => {handleEmailChange('password', e)}}/>
                                </Form.Item>
                            </Col>
                            <Col span={2} offset={1}>
                                <Form.Item
                                    
                                >
                                    <Popconfirm
                                        title="Send Shai1 email"
                                        description="Are you sure to send shai1 email?"
                                        onConfirm={() => {
                                            handleEmailSendBtnClick('shai1');
                                            emailForm.submit();
                                        }}
                                        okText="Send"
                                        cancelText="No"
                                    >
                                        <Button style={{marginTop: '0.3rem'}} type="primary" htmlType="submit">Shai1</Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item
                                    
                                >
                                    <Popconfirm
                                        title="Send Shai2 email"
                                        description="Are you sure to send shai2 email?"
                                        onConfirm={() => {
                                            handleEmailSendBtnClick('shai2');
                                            emailForm.submit();
                                        }}
                                        okText="Send"
                                        cancelText="No"
                                    >
                                        <Button style={{marginTop: '0.3rem'}} type="primary" htmlType="submit">Shai2</Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item
                                    
                                >
                                    <Popconfirm
                                        title="Send Palm1 email"
                                        description="Are you sure to send palm1 email?"
                                        onConfirm={() => {
                                            handleEmailSendBtnClick('palm1');
                                            emailForm.submit();
                                        }}
                                        okText="Send"
                                        cancelText="No"
                                    >
                                        <Button style={{marginTop: '0.3rem'}} type="primary" htmlType="submit">Palm1</Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col className={!path.download_way || path.download_way === 'all' || path.download_way === 'csv' ? 'download-group-selected' : ''} span={12} style={{marginTop: '1rem', padding: '1rem', border: '1px solid #898383', borderRadius: '10px'}}>
                            <Divider>CSV FILE LIST</Divider>
                            <Row>
                                <Col span={15}>
                                    <span>00_ALL_{folder_name}_CA Window Door</span>
                                </Col>
                                <Col span={9}>
                                    <span>06_BAY_{folder_name} North</span>
                                </Col>
                                <Col span={15} style={{marginTop: '0.5rem'}}>
                                    <span>01_ALL_{folder_name}_KitchenBathDecksRenovate.csv</span>
                                </Col>
                                <Col span={9} style={{marginTop: '0.5rem'}}>
                                    <span>07_OR_{folder_name}</span>
                                </Col>
                                <Col span={15} style={{marginTop: '0.5rem'}}>
                                    <span>02_LA_{folder_name}</span>
                                </Col>
                                <Col span={9} style={{marginTop: '0.5rem'}}>
                                    <span>08_TX_Austin_{folder_name}</span>
                                </Col>
                                <Col span={15} style={{marginTop: '0.5rem'}}>
                                    <span>03_SD_{folder_name}</span>
                                </Col>
                                <Col span={9} style={{marginTop: '0.5rem'}}>
                                    <span>09_TX_Houston_{folder_name}</span>
                                </Col>
                                <Col span={15} style={{marginTop: '0.5rem'}}>
                                    <span>04_WA_{folder_name}</span>
                                </Col>
                                <Col span={9} style={{marginTop: '0.5rem'}}>
                                    <span>10_TX_Dallas_{folder_name}</span>
                                </Col>
                                <Col span={15} style={{marginTop: '0.5rem'}}>
                                    <span>05_BAY_{folder_name} South</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={!path.download_way || path.download_way === 'all' || path.download_way === 'xls' ? 'download-group-selected' : ''} span={6} style={{marginTop: '1rem', padding: '1rem', border: '1px solid #898383', borderRadius: '10px'}}>
                            <Divider>XLS SHEET LIST</Divider>
                            <Row>
                                <Col span={24} style={{textAlign: 'center'}}>
                                    <span>File Name: {folder_name}_PALM.xls</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>WA</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>BAY</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>SD</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>LA</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>FL</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={!path.download_way || path.download_way === 'all' || path.download_way === 'trc' ? 'download-group-selected' : ''} span={6} style={{marginTop: '1rem', padding: '1rem', border: '1px solid #898383', borderRadius: '10px'}}>
                            <Divider>TRC CSV GROUP LIST</Divider>
                            <Row>
                                <Col span={24} style={{textAlign: 'center'}}>
                                    <span>File Name: {folder_name}_TRC.xls</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>TRC_1 CA_LA</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>TRC_2 CA_VENTURA</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>TRC_3 CA_OR</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>TRC_4 CA_SB RS</span>
                                </Col>
                                <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                                    <span>TRC_5 WA</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Spin>
    )
}

const mapStateToProps = state => {
    return { path: state.path, email: state.email };
};

export default connect(
    mapStateToProps,
    { getPathData, getEmailData, setPathData, setEmailData, download }
)(Dashboard);