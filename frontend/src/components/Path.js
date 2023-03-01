import {Row, Col, Input, Form, Select, Button, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getPathData, setPathData, download} from "../redux/actions";

const downloadTimeOption = [
    {value: '8AM', label: '8AM'},
    {value: '2PM', label: '2PM'},
];

const downloadWayOption = [
    {value: 'all', label: 'CSV & XLS'},
    {value: 'csv', label: 'CSV'},
    {value: 'xls', label: 'XLS'}
];

const Path = (props) => {
    const [pathForm] = Form.useForm();

    const [path, setPath] = useState({});

    useEffect(function() {
        props.getPathData();
    }, []);

    useEffect(function() {
        pathForm.setFieldsValue(props.path);

        setPath(props.path);
    }, [props.path]);

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

    
    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <Form
            onFinish={props.downloadSubmit}
            validateMessages={validateMessages}
            layout="vertical"
            form={pathForm}
            style={{padding: '1rem', border: '1px solid #898383', borderRadius: '10px'}}
        >
            <Row>
                <Col span={20} offset={2}>
                    <Form.Item
                        name={['schedule']}
                        label="Schedule Google Sheet URL"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" placeholder="https://docs.google.com/spreadsheets/d/16fiKZjpWZ3ZCY69JpRrTBAYLS4GnjqEKp8tj2G65EAI/edit#gid=0" onBlur={(e) => {savePath('schedule')}} onChange={(e) => {handlePathChange('schedule', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={7} offset={1}>
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
                <Col span={7} offset={1}>
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
                <Col span={7} offset={1}>
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
                <Col span={7} offset={1}>
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
                <Col span={7} offset={1}>
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
    )
}

const mapStateToProps = state => {
    return { path: state.path };
};

export default connect(
    mapStateToProps,
    { getPathData, setPathData, download }
)(Path);