import {message, Spin, Row, Col, Input, Form, Button, Popconfirm, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getEmailData, setEmailData, getSettingData, setSettingData, setSettingDataByMail, sendEmail} from "../redux/actions";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 21,
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 21,
            offset: 3,
        },
    },
};

const Email = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState('');
    const [email, setEmail] = useState({});
    const [emailForm] = Form.useForm();
    const [shai1Form] = Form.useForm();
    const [shai2Form] = Form.useForm();
    const [palm1Form] = Form.useForm();

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
        props.sendEmail('shai1', {subject: form, receivers: form.receivers}, function() {
            setLoading(false);
            messageApi.success('Shai1 gmail send success')
            props.getSettingData();
        });
    }

    const handleShai2SendSubmit = function(form) {
        setLoading(true);
        setTip('wait for sending shai2 gmail');
        props.sendEmail('shai2', {subject: form, receivers: form.receivers}, function() {
            setLoading(false);
            messageApi.success('Shai2 gmail send success')
            props.getSettingData();
        });
    }

    const handlePalm1SendSubmit = function(form) {
        setLoading(true);
        setTip('wait for sending palm1 gmail');
        props.sendEmail('palm1', {subject: form, receivers: form.receivers}, function() {
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
        setLoading(true);
        setTip('wait for getting gamil data');
        props.setSettingDataByMail(name, function(resp) {
            setLoading(false);
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
        <Spin spinning={loading} tip={tip} delay={500}>
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
                        <Modal
                            title="Shai1 Preview"
                            centered
                            open={props.settings.shai1.open === true}
                            footer={null}
                            width={700}
                        >
                            <Spin spinning={loading} tip={tip} delay={500}>
                                <Row>
                                    <Col span={24}>
                                        <Form
                                            {...layout}
                                            onFinish={handleShai1SendSubmit}
                                            validateMessages={validateMessages}
                                            form={shai1Form}
                                        >
                                            <Col span={6} offset={18}>
                                                <Form.Item
                                                    name={['sendBtn']}
                                                >
                                                    <Button offset={10} type="primary" htmlType="submit">Send</Button>
                                                    <Button type="dashed" onClick={(e) => {handleCancelClick('shai1')}}>Cancel</Button>
                                                </Form.Item>
                                            </Col>
                                            <Form.Item
                                                name={['subject']}
                                                label="Subject"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large"/>
                                            </Form.Item>
                                            <Form.List
                                                name="receivers"
                                                rules={[
                                                    {
                                                        validator: async (_, names) => {
                                                            if (!names || names.length < 1) {
                                                                return Promise.reject(new Error('At least 1 receiver'));
                                                            }
                                                        },
                                                    },
                                                ]}
                                            >
                                                {(fields, { add, remove }, { errors }) => (
                                                    <>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                                                label={index === 0 ? 'Receivers' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input receiver email id or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input
                                                                        size="large"
                                                                        placeholder="receiver gmail id"
                                                                        style={{
                                                                            width: '95%',
                                                                        }}
                                                                    />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => add()}
                                                                style={{
                                                                    width: '30%',
                                                                    marginLeft: '14%'
                                                                }}
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add Receiver Gmail
                                                            </Button>
                                                            <Form.ErrorList errors={errors} />
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                            <Form.Item
                                                name={['files']}
                                                label="Files"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <div style={{marginTop: '-0.5rem'}}>
                                                {
                                                    props.settings.shai1.files.map((f, i) => {
                                                        return <p key={i}>{f.name}</p>
                                                    })
                                                }
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Spin>
                        </Modal>
                        <Modal
                            title="Shai2 Preview"
                            centered
                            open={props.settings.shai2.open === true}
                            footer={null}
                            width={900}
                        >
                            <Spin spinning={loading} tip={tip} delay={500}>
                                <Row>
                                    <Col span={24}>
                                        <Form
                                            {...layout}
                                            onFinish={handleShai2SendSubmit}
                                            validateMessages={validateMessages}
                                            form={shai2Form}
                                        >
                                            <Col span={6} offset={18}>
                                                <Form.Item
                                                    name={['sendBtn']}
                                                >
                                                    <Button offset={10} type="primary" htmlType="submit">Send</Button>
                                                    <Button type="dashed" onClick={(e) => {handleCancelClick('shai1')}}>Cancel</Button>
                                                </Form.Item>
                                            </Col>
                                            <Form.Item
                                                name={['subject']}
                                                label="Subject"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large"/>
                                            </Form.Item>
                                            <Form.List
                                                name="receivers"
                                                rules={[
                                                    {
                                                        validator: async (_, names) => {
                                                            if (!names || names.length < 1) {
                                                                return Promise.reject(new Error('At least 1 receiver'));
                                                            }
                                                        },
                                                    },
                                                ]}
                                            >
                                                {(fields, { add, remove }, { errors }) => (
                                                    <>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                                                label={index === 0 ? 'Receivers' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input receiver email id or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input
                                                                        size="large"
                                                                        placeholder="receiver gmail id"
                                                                        style={{
                                                                            width: '95%',
                                                                        }}
                                                                    />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => add()}
                                                                style={{
                                                                    width: '30%',
                                                                    marginLeft: '14%'
                                                                }}
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add Receiver Gmail
                                                            </Button>
                                                            <Form.ErrorList errors={errors} />
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                            <Form.Item
                                                name={['body']}
                                                label="body"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                {htmlToReactParser.parse(props.settings.shai2.body)}
                                            </Form.Item>
                                            <Form.Item
                                                name={['files']}
                                                label="Files"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <div style={{marginTop: '-0.5rem'}}>
                                                {
                                                    props.settings.shai2.files.map((f, i) => {
                                                        return <p key={i}>{f.name}</p>
                                                    })
                                                }
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Spin>
                        </Modal>
                        <Modal
                            title="Palm1 Preview"
                            centered
                            open={props.settings['palm1'].open === true}
                            footer={null}
                            width={700}
                        >
                            <Spin spinning={loading} tip={tip} delay={500}>
                                <Row>
                                    <Col span={24}>
                                        <Form
                                            {...layout}
                                            onFinish={handlePalm1SendSubmit}
                                            validateMessages={validateMessages}
                                            form={palm1Form}
                                        >
                                            <Col span={6} offset={18}>
                                                <Form.Item
                                                    name={['sendBtn']}
                                                >
                                                    <Button offset={10} type="primary" htmlType="submit">Send</Button>
                                                    <Button type="dashed" onClick={(e) => {handleCancelClick('shai1')}}>Cancel</Button>
                                                </Form.Item>
                                            </Col>
                                            <Form.Item
                                                name={['subject']}
                                                label="Subject"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input size="large"/>
                                            </Form.Item>
                                            <Form.List
                                                name="receivers"
                                                rules={[
                                                    {
                                                        validator: async (_, names) => {
                                                            if (!names || names.length < 1) {
                                                                return Promise.reject(new Error('At least 1 receiver'));
                                                            }
                                                        },
                                                    },
                                                ]}
                                            >
                                                {(fields, { add, remove }, { errors }) => (
                                                    <>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                                                label={index === 0 ? 'Receivers' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input receiver email id or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input
                                                                        size="large"
                                                                        placeholder="receiver gmail id"
                                                                        style={{
                                                                            width: '95%',
                                                                        }}
                                                                    />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => add()}
                                                                style={{
                                                                    width: '30%',
                                                                    marginLeft: '14%'
                                                                }}
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add Receiver Gmail
                                                            </Button>
                                                            <Form.ErrorList errors={errors} />
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                            <Form.Item
                                                name={['files']}
                                                label="Files"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <div style={{marginTop: '-0.5rem'}}>
                                                {
                                                    props.settings.palm1.files.map((f, i) => {
                                                        return <p key={i}>{f.name}</p>
                                                    })
                                                }
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Spin>
                        </Modal>
                    </> : ''
            }
            
        </Spin>
    )
}

const mapStateToProps = state => {
    return { email: state.email, settings: state.settings };
};

export default connect(
    mapStateToProps,
    { getEmailData, setEmailData, getSettingData, setSettingData, setSettingDataByMail, sendEmail }
)(Email);