import {message, Spin, Row, Col, Input, Form, Button, Popconfirm, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getEmailData, setEmailData, getSettingData, setSettingData, setSettingDataByMail, sendEmail} from "../redux/actions";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Shai1 from "./EmailGroup/Shai1";
import Shai2 from "./EmailGroup/Shai2";
import Palm1 from "./EmailGroup/Palm1";

const Email = (props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [email, setEmail] = useState({});
    const [emailForm] = Form.useForm();
    const [shai1Form] = Form.useForm();
    const [shai2Form] = Form.useForm();
    const [palm1Form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');

    useEffect(function() {
        props.getEmailData();
        props.getSettingData();
    }, []);

    useEffect(function() {
        emailForm.setFieldsValue(props.email);
        
        shai1Form.setFieldsValue(props.settings.shai1);
        shai2Form.setFieldsValue(props.settings.shai2);
        palm1Form.setFieldsValue(props.settings.palm1);

        setEmail(props.email);
    }, [props.email, props.settings]);

    const handleShai1SendSubmit = function(form) {
        setLoading(true);
        setTip('wait for sending shai1 gmail');
        props.sendEmail('shai1', {subject: form.subject, receivers: form.receivers}, function() {
            setLoading(false);
            messageApi.success('Shai1 gmail send success')
            props.getSettingData();
        });
    }

    const handleShai2SendSubmit = function(form) {
        setLoading(true);
        setTip('wait for sending shai2 gmail');
        props.sendEmail('shai2', {subject: form.subject, receivers: form.receivers}, function() {
            setLoading(false);
            messageApi.success('Shai2 gmail send success')
            props.getSettingData();
        });
    }

    const handlePalm1SendSubmit = function(form) {
        setLoading(true);
        setTip('wait for sending palm1 gmail');
        props.sendEmail('palm1', {subject: form.subject, receivers: form.receivers}, function() {
            setLoading(false);
            messageApi.success('Palm1 gmail send success')
            props.getSettingData();
        });
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
        props.setLoading(true);
        props.setTip('wait for getting gamil data');
        props.setSettingDataByMail(name, function(resp) {
            props.setLoading(false);
            if (resp.data.status === 'error') {
                messageApi.error(resp.data.text);
            } else {
                props.getSettingData();
            }
        });
    }
    
    const handleCancelClick = function(name) {
        props.setSettingData(name, {open: false}, function() {
            props.getSettingData();
        });
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    return (
        <>
            {contextHolder}
            <Form
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
            {
                props.settings.shai1 !== undefined ? 
                    <>
                        <Shai1
                            settings={props.settings}
                            loading={loading}
                            tip={tip}
                            handleSendSubmit={handleShai1SendSubmit}
                            form={shai1Form}
                            handleCancelClick={handleCancelClick}
                        />
                        <Shai2
                            settings={props.settings}
                            loading={loading}
                            tip={tip}
                            handleSendSubmit={handleShai2SendSubmit}
                            form={shai2Form}
                            handleCancelClick={handleCancelClick}
                        />
                        <Palm1
                            settings={props.settings}
                            loading={loading}
                            tip={tip}
                            handleSendSubmit={handlePalm1SendSubmit}
                            form={palm1Form}
                            handleCancelClick={handleCancelClick}
                        />
                    </> : ''
            }
        </>
    )
}

const mapStateToProps = state => {
    return { email: state.email, settings: state.settings };
};

export default connect(
    mapStateToProps,
    { getEmailData, setEmailData, getSettingData, setSettingData, setSettingDataByMail, sendEmail }
)(Email);