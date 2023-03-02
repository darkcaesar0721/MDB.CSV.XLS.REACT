import {Button, Col, Form, Input, Modal, Row, Spin, Switch} from "antd";
import {CheckOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";

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

const validateMessages = {
    required: '${label} is required!'
}

const Palm1 = function(props) {
    return (
        <Modal
            title="Palm1 Preview"
            centered
            open={props.settings['palm1'].open === true}
            footer={null}
            width={900}
            closable={false}
        >
            <Spin spinning={props.loading} tip={props.tip} delay={500}>
                <Row>
                    <Col span={24}>
                        <Form
                            {...layout}
                            onFinish={props.handleSendSubmit}
                            validateMessages={validateMessages}
                            form={props.form}
                        >
                            <Col span={6} offset={18}>
                                <Form.Item
                                    name={['sendBtn']}
                                >
                                    <Button offset={10} type="primary" htmlType="submit">Send</Button>
                                    <Button type="dashed" onClick={(e) => {props.handleCancelClick('palm1')}}>Cancel</Button>
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
                                name={['isWhatsApp']}
                                label="WhatsApp"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    size="large"
                                    checked={props.isWhatsApp}
                                    onChange={props.handleIsWhatsAppChange}
                                    disabled={!(props.whatsapp.isWhatsApp === undefined || props.whatsapp.isWhatsApp === true || props.whatsapp.isWhatsApp === 'true')}
                                />
                            </Form.Item>
                            <Form.Item
                                name={['whatsapp_message']}
                                label="WhatsApp Send Message"
                            >
                                <Input.TextArea disabled={!props.isWhatsApp} showCount autoSize={{ minRows: 3, maxRows: 10 }}/>
                            </Form.Item>
                            <Form.List
                                name="whatsapp_people"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'WhatsApp Single People' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="WhatsApp Single Person"
                                                        style={{
                                                            width: '95%',
                                                        }}
                                                        disabled={!props.isWhatsApp}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        disabled={!props.isWhatsApp}
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
                                                disabled={!props.isWhatsApp}
                                            >
                                                Add Single Person
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.List
                                name="whatsapp_groups"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'WhatsApp Groups' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="WhatsApp Group"
                                                        style={{
                                                            width: '95%',
                                                        }}
                                                        disabled={!props.isWhatsApp}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        disabled={!props.isWhatsApp}
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
                                                disabled={!props.isWhatsApp}
                                            >
                                                Add Group
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
    )
}

export default Palm1;
