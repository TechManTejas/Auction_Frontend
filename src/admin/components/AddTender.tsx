/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, message } from 'antd';
import TenderCard from './TenderCardPrototype';
import { useFormik } from 'formik';
import axios from "../../api/axios"
import { ITender } from '../../types/tender.types';

interface TenderFormProps {
    editedTender?: ITender | null; // Include the editedCoupon prop
    onTenderEdited: (editedCoupon: ITender) => void;
}

const AddTender: React.FC<TenderFormProps> = ({ editedTender, onTenderEdited }) => {

    const [id, setId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setId(editedTender?._id || null);

        // Reset form values when editedAuction changes
        formik.resetForm({
            values: {
                title: 'Title',
                description: 'Description',
                estCost: 10000,
                timeToComplete: { years: 0, months: 0, weeks: 0 },
                city: 'City',
                bidEndsOn: new Date(),
                ...(editedTender && {
                    title: editedTender.title || 'Title',
                    description: editedTender.description || 'Description',
                    estCost: editedTender.estCost || 10000,
                    timeToComplete: { years: 0, months: 0, weeks: 0 },
                    city: editedTender.city || 'City',
                    bidEndsOn: new Date(editedTender.bidEndsOn),
                }),
            },
        });
    }, [editedTender])


    const formik = useFormik({
        initialValues: {
            title: 'Title',
            description: 'Description',
            estCost: 10000,
            timeToComplete: { years: 0, months: 0, weeks: 0 },
            city: 'City',
            bidEndsOn: new Date(),
        },
        onSubmit: async (values, { resetForm }) => {
            // Convert timeToComplete to string format before submitting
            const timeToCompleteString = convertTimeToCompleteToString(values.timeToComplete);

            try {
                setLoading(true);

                let response;

                if (editedTender?._id) {
                    // Edit existing auction
                    response = await axios.put(`/tenders/${id}`, {
                        ...values,
                        timeToComplete: timeToCompleteString,
                    });
                } else {
                    // Add new auction
                    response = await axios.post('/tenders/', {
                        ...values,
                        timeToComplete: timeToCompleteString,
                    });
                }

                if (response.status === 200 || response.status === 201) {
                    const editedTender = response.data;
                    console.log(editedTender, response.data)
                    message.success('Tender created successfully');
                    onTenderEdited(editedTender)
                    resetForm({
                        values: {
                            title: 'Title',
                            description: 'Description',
                            estCost: 10000,
                            timeToComplete: { years: 0, months: 0, weeks: 0 },
                            city: 'City',
                            bidEndsOn: new Date(),
                        },
                    });
                } else {
                    // Handle errors, e.g., show an error message
                    message.error('Failed to create tender');
                }

                setLoading(false);

            } catch (error) {
                console.error('Unexpected error:', error);
                message.error('Failed to save tender. Please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    // Custom function to convert timeToComplete values into a string
    const convertTimeToCompleteToString = (timeToComplete: { years: number; months: number; weeks: number }) => {
        const { years, months, weeks } = timeToComplete;
        return `${years} years ${months} months ${weeks} weeks`;
    };

    return (
        <div className='flex justify-center items-center w-full'>
            <Form
                name="tenderForm"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={formik.handleSubmit}
            >
                <Form.Item
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input
                        placeholder="Enter title"
                        onChange={(e) => {
                            formik.setFieldValue('title', e.target.value)
                        }}
                        value={formik.values.title}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea
                        placeholder="Enter description"
                        onChange={(e) => {
                            formik.setFieldValue('description', e.target.value)
                        }}
                        value={formik.values.description}
                    />
                </Form.Item>

                <Form.Item
                    label="Estimated Cost"
                    rules={[{ required: true, message: 'Please input the estimated cost!' }]}
                >
                    <InputNumber
                        placeholder="Enter estimated cost"
                        style={{ width: '100%' }}
                        onChange={(value) => formik.setFieldValue('estCost', value)}
                        value={formik.values.estCost}
                    />
                </Form.Item>

                <Form.Item
                    label="Time to Complete"
                    name="timeToComplete"
                    rules={[{ required: true, message: 'Please input the time to complete!' }]}
                >
                    <Input.Group compact style={{ display: 'flex', width: '100%' }}>
                        <Form.Item
                            name={['timeToComplete', 'years']}
                            style={{ flex: 1, marginRight: '8px' }}
                            noStyle
                        >
                            <InputNumber
                                placeholder="Years"
                                style={{ width: '100%' }}
                                min={0}
                                onChange={(value) =>
                                    formik.setFieldValue('timeToComplete.years', value)
                                }
                                value={formik.values.timeToComplete.years}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['timeToComplete', 'months']}
                            style={{ flex: 1, marginRight: '8px' }}
                            noStyle
                        >
                            <InputNumber
                                placeholder="Months"
                                style={{ width: '100%' }}
                                min={0}
                                onChange={(value) =>
                                    formik.setFieldValue('timeToComplete.months', value)
                                }
                                value={formik.values.timeToComplete.months}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['timeToComplete', 'weeks']}
                            style={{ flex: 1 }}
                            noStyle
                        >
                            <InputNumber
                                placeholder="Weeks"
                                style={{ width: '100%' }}
                                min={0}
                                onChange={(value) =>
                                    formik.setFieldValue('timeToComplete.weeks', value)
                                }
                                value={formik.values.timeToComplete.weeks}
                            />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    label="City"
                    rules={[{ required: true, message: 'Please input the city!' }]}
                >
                    <Input
                        placeholder="Enter city"
                        onChange={(e) => {
                            formik.setFieldValue('city', e.target.value)
                        }}
                        value={formik.values.city}
                    />
                </Form.Item>

                <Form.Item
                    label="Bid Ends On"
                    name="bidEndsOn"
                    rules={[{ required: true, message: 'Please select the bid end date!' }]}
                >
                    <DatePicker
                        showTime
                        onChange={(date, dateString) => {
                            console.log(date, dateString)
                            formik.setFieldValue('bidEndsOn', dateString)
                        }}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                        type="primary"
                        className='bg-[#1890FF] w-full font-semibold'
                        htmlType="submit"
                        loading={loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <div className='text-4xl font-medium text-center text-[#002766] p-5'>Tender Card</div>
                <TenderCard
                    title={formik.values.title}
                    description={formik.values.description}
                    estCost={formik.values.estCost}
                    timeToComplete={convertTimeToCompleteToString(formik.values.timeToComplete)}
                    city={formik.values.city}
                    bidEndsOn={formik.values.bidEndsOn.toString()}
                />
            </div>
        </div>
    );
};

export default AddTender;
