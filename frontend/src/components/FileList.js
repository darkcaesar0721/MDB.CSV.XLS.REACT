import {Row, Col, Divider} from "antd";

const FileList = function(props) {
    return (
        <Row>
            <Col className={!props.path.download_way || props.path.download_way === 'all' || props.path.download_way === 'csv' ? 'download-group-selected' : ''} span={11} style={{marginTop: '1rem', padding: '1rem', border: '1px solid #e5e1e1', borderRadius: '5px'}}>
                <Divider>CSV FILE LIST</Divider>
                <Row>
                    <Col span={15}>
                        <span>00_ALL_{props.folder_name}_CA Window Door</span>
                    </Col>
                    <Col span={9}>
                        <span>06_BAY_{props.folder_name} North</span>
                    </Col>
                    <Col span={15} style={{marginTop: '0.5rem'}}>
                        <span>01_ALL_{props.folder_name}_KitchenBathDecksRenovate.csv</span>
                    </Col>
                    <Col span={9} style={{marginTop: '0.5rem'}}>
                        <span>07_OR_{props.folder_name}</span>
                    </Col>
                    <Col span={15} style={{marginTop: '0.5rem'}}>
                        <span>02_LA_{props.folder_name}</span>
                    </Col>
                    <Col span={9} style={{marginTop: '0.5rem'}}>
                        <span>09_TX_Houston_{props.folder_name}</span>
                    </Col>
                    <Col span={15} style={{marginTop: '0.5rem'}}>
                        <span>03_SD_{props.folder_name}</span>
                    </Col>
                    <Col span={9} style={{marginTop: '0.5rem'}}>
                        <span>10_TX_Dallas_{props.folder_name}</span>
                    </Col>
                    <Col span={15} style={{marginTop: '0.5rem'}}>
                        <span>04_WA_{props.folder_name}</span>
                    </Col>
                    <Col span={15} style={{marginTop: '0.5rem'}}>
                        <span>05_BAY_{props.folder_name} South</span>
                    </Col>
                </Row>
            </Col>
            <Col className={!props.path.download_way || props.path.download_way === 'all' || props.path.download_way === 'xls' ? 'download-group-selected' : ''} span={11} offset={2} style={{marginTop: '1rem', padding: '1rem', border: '1px solid #e5e1e1', borderRadius: '5px'}}>
                <Divider>XLS SHEET LIST</Divider>
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <span>File Name: {props.folder_name}_PALM.xls</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>WA</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>BAY</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>SD</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>LA</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>FL</span>
                    </Col>
                    <Col span={24} style={{marginTop: '0.5rem', textAlign: 'center'}}>
                        <span>TX</span>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default FileList;