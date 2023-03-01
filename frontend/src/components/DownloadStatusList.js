import {Button, Col, Row, Switch, Table} from "antd";
import React, {useEffect, useState} from "react";
import {LoadingOutlined, CheckCircleTwoTone} from "@ant-design/icons";

const DownloadStatusList = (props) => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 200,
        },
    });

    const columns = [
        {
            title: 'no',
            key: 'no',
            dataIndex: 'no',
            width: 30,
        },
        {
            title: 'Status',
            key: 'status',
            width: 90,
            render: (_, r) => {
                return (
                    <>
                        {
                            r.status === 'loading' ?
                                <LoadingOutlined /> : ''
                        }
                        {
                            r.status === 'complete' ?
                                <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''
                        }
                        {
                            r.status === 'normal' ?
                                <span></span> : ''
                        }
                    </>
                )
            }
        },
        {
            title: 'Download File Name',
            dataIndex: 'file',
            key: 'file',
        },
        {
            title: 'WhatsApp',
            key: 'whatsapp',
            render: (_, r) => {
                return (
                    <Switch
                        size="small"
                        checked={r.isWhatsApp === "true" || r.isWhatsApp === true}
                        disabled={true}
                    />
                )
            }
        }
    ]

    useEffect(function() {
        
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <>
            <Row>
                <Col span={2}>
                    <Button type="primary" disabled={!props.isClose} onClick={(e) => {props.setOpen(false)}}>Close Window</Button>
                </Col>
            </Row>
            <Row style={{marginTop: '0.4rem'}}>
                <Col span={24}>
                    <Table
                        bordered={true}
                        size="small"
                        columns={columns}
                        dataSource={props.downloadStatus}
                        pagination={tableParams.pagination}
                        onChange={handleTableChange}
                        className="antd-custom-table"
                    />
                </Col>
            </Row>
        </>
    )
}

export default DownloadStatusList;