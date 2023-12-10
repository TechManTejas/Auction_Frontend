/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../api/axios"

const { Step } = Steps;

interface TenderFormProps {
    tender: any;
    closeQuoteModal: any
}

const TenderForm: React.FC<TenderFormProps> = ({ tender, closeQuoteModal }) => {

    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onFinish = async (values: any) => {

        console.log(values)

        try {
            const {
                companyName,
                experience,
                quoteAmount,
                panNumber,
                gstNumber,
                incomeProof,
                projectDetails1,
                projectDetails2,
                projectDetails3,
            } = values;

            // Convert experience to the desired format (e.g., "5 years")
            const formattedExperience = `${experience} years`;

            const formData = new FormData();
            formData.append('tenderId', tender._id);
            formData.append('companyName', companyName);
            formData.append('experience', formattedExperience);
            formData.append('quoteAmount', quoteAmount);
            formData.append('panNumber', panNumber);
            formData.append('gstNumber', gstNumber);
            formData.append('incomeProof', incomeProof[0]?.originFileObj); // assuming only one file
            formData.append('projectDetails1', projectDetails1);
            formData.append('projectDetails2', projectDetails2);
            formData.append('projectDetails3', projectDetails3);

            // // Assuming you have a function to fetch and handle the API request
            const response = await axios.post('/tenderform/create', formData);

            if (response.status === 201) {
                const data = response.data;
                message.success('Tender submitted successfully', data);

                closeQuoteModal()
                // Add any additional logic or redirect if needed
            } else {
                console.error('Form submission failed:', response.statusText);
                // Handle error as needed
            }

        } catch (error) {
            console.error('Form submission error:', error);
            // Handle error as needed
        }
    };


    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const steps = [
        {
            title: 'Basic Information',
            content: (
                <>
                    <Form.Item
                        label="Company Name"
                        name="companyName"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: 'Please input your company name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Experience"
                        name="experience"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: 'Please input your experience!' }]}
                    >
                        <Input
                            type='tel'
                            placeholder="Enter experience in years"
                            min={0}  // Set minimum value to 0
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quote Amount"
                        name="quoteAmount"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[
                            { required: true, message: 'Please input the quote amount!' },
                            () => ({
                                validator(_, value) {
                                    const estCost = tender.estCost
                                    if (value >= 0 && value <= estCost) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Quote amount must be greater than or equal to 0 and less than or equal to Estimated Cost.'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            type='tel'
                            placeholder="Enter quote amount"
                            min={0}  // Set minimum value to 0
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="PAN Number"
                        name="panNumber"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: 'Please input your PAN number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="GST Number"
                        name="gstNumber"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: 'Please input your GST number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Income Proof"
                        name="incomeProof"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: 'Please upload your income proof!' }]}
                    >
                        <Upload name="incomeProof" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to upload IT Return of last 1 year or Bank Statement of last 3 months</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' onClick={nextStep}>
                            Next
                        </Button>
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Project Details',
            content: (
                <>
                    <Form.Item name="projectDetails1" label="Project Details 1" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }} >
                        <Input.TextArea style={{ height: '108px' }} defaultValue={"Cost of project:\nTime to complete\nDetails:"} />
                    </Form.Item>
                    <Form.Item name="projectDetails2" label="Project Details 2" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}>
                        <Input.TextArea style={{ height: '108px' }} defaultValue={"Cost of project:\nTime to complete\nDetails:"} />
                    </Form.Item>
                    <Form.Item name="projectDetails3" label="Project Details 3" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}>
                        <Input.TextArea style={{ height: '108px' }} defaultValue={"Cost of project:\nTime to complete\nDetails:"} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 16 }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' onClick={prevStep}>
                                Previous
                            </Button>
                            <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>

                </>
            ),
        },
    ];

    return (
        <div>
            <div className='border rounded-lg shadow-xl mb-4 p-4'>
                <div className='text-2xl text-[#002766]'>
                    {tender.title}
                </div>
                <div className='text-sm'>
                    {tender.description}
                </div>
            </div>
            <Steps current={currentStep} className='px-16 py-6'>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                <Form
                    form={form}
                    name="combinedForm"
                    onFinish={onFinish}
                    onFinishFailed={() => message.error('Form submission failed.')}
                    encType="multipart/form-data"
                >
                    {steps.map((item, index) => (
                        <div key={index} style={{ display: index === currentStep ? 'block' : 'none' }}>
                            {item.content}
                        </div>
                    ))}
                </Form>
            </div>
        </div>
    );
};

export default TenderForm;
