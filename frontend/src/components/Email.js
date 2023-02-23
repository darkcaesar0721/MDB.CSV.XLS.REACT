import {message, Spin, Row, Col, Input, Form, Button, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getEmailData, setEmailData} from "../redux/actions";

const Email = (props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [emailForm] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');

    const [email, setEmail] = useState({});

    const [currentBtn, setCurrentBtn] = useState('');

    useEffect(function() {
        props.getEmailData();
    }, []);

    useEffect(function() {
        emailForm.setFieldsValue(props.email);

        setEmail(props.email);
    }, [props.email]);

    const handleEmailSendSubmit = function(form) {
        
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
    }

    return (
        <Spin spinning={loading} tip={tip} delay={500}>
            {contextHolder}
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
        </Spin>
    )
}

const mapStateToProps = state => {
    return { email: state.email };
};

export default connect(
    mapStateToProps,
    { getEmailData, setEmailData }
)(Email);