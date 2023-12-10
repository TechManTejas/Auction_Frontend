import React from 'react';
import { Button, Form, Typography } from 'antd';
import { TenderFormData } from '../../types/tender.types';
import { handleFileDownload } from '../../utils/FileDownloader';

const { Title, Text } = Typography;

interface ITenderFormDetails {
    selectedSubmission: TenderFormData;
}

const TenderFormDetails: React.FC<ITenderFormDetails> = ({ selectedSubmission }) => {

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Submission Details</Title>
            <Form
                name="tenderForm"
                labelCol={{ span:8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item label="Company Name">
                    <Text strong>{selectedSubmission.companyName}</Text>
                </Form.Item>

                <Form.Item label="Experience">
                    <Text strong>{selectedSubmission.experience}</Text>
                </Form.Item>

                <Form.Item label="Quote Amount">
                    <Text strong>{selectedSubmission.quoteAmount}</Text>
                </Form.Item>

                <Form.Item label="PAN Number">
                    <Text strong>{selectedSubmission.panNumber}</Text>
                </Form.Item>

                <Form.Item label="GST Number">
                    <Text strong>{selectedSubmission.gstNumber}</Text>
                </Form.Item>

                <Form.Item label="Income Proof">
                    <Button type="default" onClick={() => handleFileDownload(selectedSubmission.incomeProof)}>
                        Download Income Proof
                    </Button>
                </Form.Item>

                <Form.Item label="Project Details 1">
                    <Text>{selectedSubmission.projectDetails1}</Text>
                </Form.Item>

                <Form.Item label="Project Details 2">
                    <Text>{selectedSubmission.projectDetails2}</Text>
                </Form.Item>

                <Form.Item label="Project Details 3">
                    <Text>{selectedSubmission.projectDetails3}</Text>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TenderFormDetails;
