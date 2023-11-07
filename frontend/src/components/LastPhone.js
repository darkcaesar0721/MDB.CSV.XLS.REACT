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
                <Col span={4}>
                    <Form.Item
                        name={['WA']}
                        label="WA"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('WA')}} onChange={(e) => {handleDataChange('WA', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['BAY']}
                        label="BAY"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('BAY')}} onChange={(e) => {handleDataChange('BAY', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['SD']}
                        label="SD"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('SD')}} onChange={(e) => {handleDataChange('SD', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['LA']}
                        label="LA"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('LA')}} onChange={(e) => {handleDataChange('LA', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['FL']}
                        label="FL"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('FL')}} onChange={(e) => {handleDataChange('FL', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['TX']}
                        label="TX"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('TX')}} onChange={(e) => {handleDataChange('TX', e)}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Divider>SHAI LAST PHONE NUMBER SETTING</Divider>
            <Row>
                <Col span={4}>
                    <Form.Item
                        name={['CA']}
                        label="CA"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('CA')}} onChange={(e) => {handleDataChange('CA', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['KITCHEN']}
                        label="KITCHEN"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('KITCHEN')}} onChange={(e) => {handleDataChange('KITCHEN', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['SHAI_LA']}
                        label="SHAI_LA"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('SHAI_LA')}} onChange={(e) => {handleDataChange('SHAI_LA', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['SHAI_SD']}
                        label="SHAI_SD"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('SHAI_SD')}} onChange={(e) => {handleDataChange('SHAI_SD', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['SHAI_WA']}
                        label="SHAI_WA"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('SHAI_WA')}} onChange={(e) => {handleDataChange('SHAI_WA', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['BAY_SOUTH']}
                        label="BAY_SOUTH"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('BAY_SOUTH')}} onChange={(e) => {handleDataChange('BAY_SOUTH', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4} offset={4}>
                    <Form.Item
                        name={['BAY_NORTH']}
                        label="BAY_NORTH"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('BAY_NORTH')}} onChange={(e) => {handleDataChange('BAY_NORTH', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['OR']}
                        label="OR"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('OR')}} onChange={(e) => {handleDataChange('OR', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['TX_HOUSTON']}
                        label="TX_HOUSTON"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('TX_HOUSTON')}} onChange={(e) => {handleDataChange('TX_HOUSTON', e)}}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={['TX_DALLAS']}
                        label="TX_DALLAS"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        
                    >
                        <Input size="large" onBlur={(e) => {saveData('TX_DALLAS')}} onChange={(e) => {handleDataChange('TX_DALLAS', e)}}/>
                    </Form.Item>
                </Col>
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