import {Row, Col, Input, Form, Divider} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getLastPhoneData, setLastPhoneData} from "../redux/actions";

const LastPhone = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState({});

    useEffect(function() {
        props.getLastPhoneData();
    }, []);

    useEffect(function() {
        form.setFieldsValue(props.lastphone);

        setData(props.lastphone);
    }, [props.lastphone]);

    const handleDataChange = function(name, e) {
        setData((oldState) => {
            let newState = {...oldState};
            newState[name] = e.target.value;
            return newState;
        });
    }

    const saveData = function(name) {
        let rows = {};
        rows[name] = data[name] === undefined ? '' : data[name];
        props.setLastPhoneData(rows);
    }

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <Form
            validateMessages={validateMessages}
            layout="vertical"
            form={form}
            style={{padding: '1rem', border: '1px solid #e5e1e1', borderRadius: '5x'}}
        >
            <Divider>PALM LAST PHONE NUMBER SETTING</Divider>
            <Row>
                {
                    props.palms.map(palm => {
                        return (
                            <Col span={4}>
                                <Form.Item
                                    name={palm.key}
                                    label={palm.key}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" onBlur={(e) => {saveData(palm.key)}} onChange={(e) => {handleDataChange(palm.key, e)}}/>
                                </Form.Item>
                            </Col>
                        )
                    })
                }
            </Row>
            <Divider>SHAI LAST PHONE NUMBER SETTING</Divider>
            <Row>
                {
                    props.shais.map(shai => {
                        return (
                            <Col span={4}>
                                <Form.Item
                                    name={shai.key}
                                    label={shai.key}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" onBlur={(e) => {saveData(shai.key)}} onChange={(e) => {handleDataChange(shai.key, e)}}/>
                                </Form.Item>
                            </Col>
                        )
                    })
                }
            </Row>
        </Form>
    )
}

const mapStateToProps = state => {
    return { lastphone: state.lastphone };
};

export default connect(
    mapStateToProps,
    { getLastPhoneData, setLastPhoneData }
)(LastPhone);