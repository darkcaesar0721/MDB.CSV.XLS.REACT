import {message, Spin, Divider, Row, Col} from "antd";
import React, {useState} from "react";
import {connect} from "react-redux";
import {download} from "../redux/actions";
import Email from "./Email";
import FileList from "./FileList";
import Path from "./Path";

const Dashboard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');

    const downloadSubmit = function(form) {
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
                    <FileList
                        path={props.path}
                        folder_name={folder_name}
                    />
                </Col>
            </Row>
        </Spin>
    )
}

const mapStateToProps = state => {
    return { path: state.path };
};

export default connect(
    mapStateToProps,
    { download }
)(Dashboard);