/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../api/axios"

const { Step } = Steps;

interface TenderFormProps {
    tender: any; // Adjust the type as needed
}

const TenderForm: React.FC<TenderFormProps> = ({ tender }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onFinish = async (values: any) => {
        try {
            const {
                companyName,
                experience,
                quoteAmount,
                panNumber,
                gstNumber,
                incomeProof,
                itReturnOrBankStatement,
                projectDetails1,
                projectDetails2,
                projectDetails3,
            } = values;

            console.log(values)

            // Convert experience to the desired format (e.g., "5 years")
            const formattedExperience = `${experience} years`;

            const formData = new FormData();
            formData.append('tenderId', tender.id);
            formData.append('companyName', companyName);
            formData.append('experience', formattedExperience);
            formData.append('quoteAmount', quoteAmount);
            formData.append('panNumber', panNumber);
            formData.append('gstNumber', gstNumber);
            formData.append('incomeProof', incomeProof); // assuming only one file
            formData.append('itReturnOrBankStatement', itReturnOrBankStatement); // assuming only one file
            formData.append('projectDetails1', projectDetails1);
            formData.append('projectDetails2', projectDetails2);
            formData.append('projectDetails3', projectDetails3);

           

            // // Assuming you have a function to fetch and handle the API request
            // const response = await axios.post('/tenderform/create', formData);

            // if (response.status === 200) {
            //     const data = response.data;
            //     message.success('Form submitted successfully:', data);
            //     // Add any additional logic or redirect if needed
            // } else {
            //     console.error('Form submission failed:', response.statusText);
            //     // Handle error as needed
            // }

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
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={() => message.error('Form submission failed.')}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Company Name"
                        name="companyName"
                        rules={[{ required: true, message: 'Please input your company name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Experience"
                        name="experience"
                        rules={[{ required: true, message: 'Please input your experience!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Quote Amount"
                        name="quoteAmount"
                        rules={[{ required: true, message: 'Please input the quote amount!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="PAN Number"
                        name="panNumber"
                        rules={[{ required: true, message: 'Please input your PAN number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="GST Number"
                        name="gstNumber"
                        rules={[{ required: true, message: 'Please input your GST number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Income Proof"
                        name="incomeProof"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload your income proof!' }]}
                    >
                        <Upload name="incomeProof" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="IT Return or Bank Statement"
                        name="itReturnOrBankStatement"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload your document!' }]}
                    >
                        <Upload name="itReturnOrBankStatement" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' onClick={nextStep}>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Project Details',
            content: (
                <Form
                    form={form}
                    name="projectDetails"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={() => message.error('Form submission failed.')}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item name="projectDetails1" label="Project Details 1">
                        <Input.TextArea style={{ height: '108px' }} />
                    </Form.Item>
                    <Form.Item name="projectDetails2" label="Project Details 2">
                        <Input.TextArea style={{ height: '108px' }} />
                    </Form.Item>
                    <Form.Item name="projectDetails3" label="Project Details 3">
                        <Input.TextArea style={{ height: '108px' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' onClick={prevStep}>
                                Previous
                            </Button>
                            <Button type="primary" className='bg-[#1890FF] primary-6 px-5 rounded-lg' htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>

                </Form>
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
            <div className="steps-content">{steps[currentStep].content}</div>
        </div>
    );
};

export default TenderForm;
