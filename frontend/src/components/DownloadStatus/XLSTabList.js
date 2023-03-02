import {Col, Row, Table, Divider} from "antd";
import React, {useEffect, useState} from "react";
import {LoadingOutlined, CheckCircleTwoTone} from "@ant-design/icons";

const XLSTabDownloadStatusList = (props) => {
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
            render: (_, r) => {
                let number = 0;
                props.xlsTabs.forEach((c, i) => {
                    if (c.query === r.query) {
                        number = i + 1;
                        return;
                    }
                })
                return (
                    <span>{number}</span>
                )
            }
        },
        {
            title: 'Status',
            key: 'status',
            width: 60,
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
                            r.status === undefined && r.status === '' ?
                                <span></span> : ''
                        }
                    </>
                )
            }
        },
        {
            title: 'Download XLS Sheet Name',
            dataIndex: 'sheet',
            key: 'sheet',
        },
        {
            title: 'Query Name',
            dataIndex: 'query',
            key: 'query',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
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
                <Col span={24}>
                    <Divider><h4>XLS TAB DOWNLOAD STATUS LIST</h4></Divider>
                </Col>
            </Row>
            <Row style={{marginTop: '0.4rem'}}>
                <Col span={24}>
                    <Table
                        bordered={true}
                        size="small"
                        columns={columns}
                        dataSource={props.xlsTabs}
                        pagination={tableParams.pagination}
                        onChange={handleTableChange}
                        className="antd-custom-table"
                    />
                </Col>
            </Row>
        </>
    )
}

export default XLSTabDownloadStatusList;