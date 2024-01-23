/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, DatePicker, InputNumber, Upload, Button, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import AuctionCard from './AuctionCardPrototype';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { IAuction } from '../../types/auction.types';

interface AuctionFormProps {
    editedAuction?: IAuction | null;
    onAuctionEdited: (editedCoupon: IAuction) => void;
}

const AddAuction: React.FC<AuctionFormProps> = ({ editedAuction, onAuctionEdited }) => {
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState<string>('');

    useEffect(() => {
        setId(editedAuction?._id || null);
        setImageURL(editedAuction?.image?.toString() || '');

        formik.resetForm({
            values: {
                image: null,
                title: 'Title',
                description: 'Description',
                start_datetime: new Date(),
                durationHours: 0,
                durationMinutes: 15,
                opening_bid_amount: 1000,
                raise_option1: 100,
                raise_option2: 500,
                raise_option3: 1000,
                raise_option4: 2000,
                ...(editedAuction && {
                    title: editedAuction.title || 'Title',
                    description: editedAuction.description || 'Description',
                    start_datetime: new Date(editedAuction.start_datetime),
                    durationHours: editedAuction.durationHours || 0,
                    durationMinutes: editedAuction.durationMinutes || 15,
                    opening_bid_amount: editedAuction.opening_bid_amount || 1000,
                    raise_option1: JSON.parse(editedAuction.raise_options?.toString() || '{}')['1'] || 100,
                    raise_option2: JSON.parse(editedAuction.raise_options?.toString() || '{}')['2'] || 500,
                    raise_option3: JSON.parse(editedAuction.raise_options?.toString() || '{}')['3'] || 1000,
                    raise_option4: JSON.parse(editedAuction.raise_options?.toString() || '{}')['4'] || 2000,
                }),
            },
        });
    }, [editedAuction]);

    const formik = useFormik({
        initialValues: {
            image: null,
            title: 'Title',
            description: 'Description',
            start_datetime: new Date(),
            durationHours: 0,
            durationMinutes: 15,
            opening_bid_amount: 1000,
            raise_option1: 100,
            raise_option2: 500,
            raise_option3: 1000,
            raise_option4: 2000,
            ...(editedAuction && {
                title: editedAuction.title || 'Title',
                description: editedAuction.description || 'Description',
                start_datetime: new Date(editedAuction.start_datetime),
                durationHours: editedAuction.durationHours || 0,
                durationMinutes: editedAuction.durationMinutes || 15,
                opening_bid_amount: editedAuction.opening_bid_amount || 1000,
                raise_option1: JSON.parse(editedAuction.raise_options?.toString() || '{}')['1'] || 100,
                raise_option2: JSON.parse(editedAuction.raise_options?.toString() || '{}')['2'] || 500,
                raise_option3: JSON.parse(editedAuction.raise_options?.toString() || '{}')['3'] || 1000,
                raise_option4: JSON.parse(editedAuction.raise_options?.toString() || '{}')['4'] || 2000,
            }),
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                const durationMilliseconds = (values.durationMinutes * 60 + values.durationHours * 60 * 60) * 1000;
                const formData = new FormData();

                if (values.image && Array.isArray(values.image)) {
                    const imageFile = values.image[0];
                    console.log(imageFile);
                    formData.append('image', imageFile);
                }

                const startDatetime = new Date(values.start_datetime);
                // Subtract 5 hours and 30 minutes
                startDatetime.setHours(startDatetime.getHours() - 5);
                startDatetime.setMinutes(startDatetime.getMinutes() - 30);
                // Convert to string
                const formattedDatetime = startDatetime.toString(); 

                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('start_datetime', formattedDatetime);
                formData.append('duration', durationMilliseconds.toString());
                formData.append('durationHours', values.durationHours.toString());
                formData.append('durationMinutes', values.durationMinutes.toString());
                formData.append('opening_bid_amount', values.opening_bid_amount.toString());
                formData.append('raise_options', JSON.stringify({
                    '1': values.raise_option1.toString(),
                    '2': values.raise_option2.toString(),
                    '3': values.raise_option3.toString(),
                    '4': values.raise_option4.toString(),
                }));

                let response;

                if (editedAuction?._id) {
                    // Edit existing auction
                    response = await axios.put(`/auctions/${id}/update`, formData);
                } else {
                    // Add new auction
                    response = await axios.post('/auctions/create', formData);
                }

                if (response.status === 201 || response.status === 200) {
                    const editedAuction = response.data;
                    message.success('Auction saved successfully!');
                    onAuctionEdited(editedAuction);
                    resetForm({
                        values: {
                            image: null,
                            title: 'Title',
                            description: 'Description',
                            start_datetime: new Date(),
                            durationHours: 0,
                            durationMinutes: 15,
                            opening_bid_amount: 1000,
                            raise_option1: 100,
                            raise_option2: 500,
                            raise_option3: 1000,
                            raise_option4: 2000,
                        },
                    });
                } else {
                    console.error('Auction creation/updation failed. Unexpected response:', response);
                    message.error('Failed to save auction. Please try again.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error saving auction:', error);
                message.error('Failed to save auction. Please try again.');
                setLoading(false);
            }
        },
    });

    const imageUploadProps = {
        beforeUpload: (_file: File) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                setImageURL(dataUrl);
                console.log(dataUrl)
                formik.setFieldValue('image', [_file]);
            };
            reader.readAsDataURL(_file);
            return false;
        },
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div className='flex justify-between items-center'>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout='horizontal'
                onFinish={formik.handleSubmit}
            >
                <Form.Item
                    label='Image'
                    name='image'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Please upload an Image!' }]}
                >
                    <Upload name='image' {...imageUploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label='Title' rules={[{ required: true, message: 'Please enter the title!' }]}>
                    <Input
                        onChange={(e) => {
                            formik.setFieldValue('title', e.target.value);
                        }}
                        value={formik.values.title}
                    />
                </Form.Item>

                <Form.Item
                    label='Description'
                    rules={[{ required: true, message: 'Please enter the description!' }]}
                >
                    <Input.TextArea
                        onChange={(e) => {
                            formik.setFieldValue('description', e.target.value);
                        }}
                        value={formik.values.description}
                        style={{
                            height: "120px"
                        }}
                    />
                </Form.Item>

                <Form.Item label='Duration'>
                    <InputNumber
                        style={{ width: '50%' }}
                        min={0}
                        placeholder='Hours'
                        onChange={(value) => formik.setFieldValue('durationHours', value)}
                        value={formik.values.durationHours}
                    />
                    <span style={{ margin: '0 8px' }}>hours</span>
                    <InputNumber
                        style={{ width: '50%' }}
                        min={0}
                        placeholder='Minutes'
                        onChange={(value) => formik.setFieldValue('durationMinutes', value)}
                        value={formik.values.durationMinutes}
                    />
                    <span style={{ margin: '0 8px' }}>minutes</span>
                </Form.Item>

                <Form.Item
                    label='Opening Bid Amount'
                    rules={[{ required: true, message: 'Please enter the opening bid amount!' }]}
                >
                    <InputNumber
                        min={0}
                        onChange={(value) => {
                            formik.setFieldValue('opening_bid_amount', value);
                        }}
                        value={formik.values.opening_bid_amount}
                    />
                </Form.Item>

                <Form.Item label='Raise Options' name='raise_options'>
                    <Space.Compact>
                        <InputNumber
                            min={0}
                            onChange={(value) => formik.setFieldValue('raise_option1', value)}
                            value={formik.values.raise_option1}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={(value) => formik.setFieldValue('raise_option2', value)}
                            value={formik.values.raise_option2}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={(value) => formik.setFieldValue('raise_option3', value)}
                            value={formik.values.raise_option3}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={(value) => formik.setFieldValue('raise_option4', value)}
                            value={formik.values.raise_option4}
                            style={{ width: '50%' }}
                        />
                    </Space.Compact>
                </Form.Item>

                <Form.Item
                    label='Start Date and Time'
                    rules={[{ required: true, message: 'Please select the start date and time!' }]}
                >
                    <DatePicker
                        showTime
                        onChange={(date, dateString) => {
                            console.log(date)
                            formik.setFieldValue('start_datetime', dateString);
                        }}
                        className="custom-date-picker" 
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                    <Button
                        type='primary'
                        className='bg-[#1890FF] w-full font-semibold'
                        htmlType='submit'
                        loading={loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <div className='text-4xl font-medium text-center text-[#002766] p-5'>Auction Card</div>
                <AuctionCard
                    image={imageURL}
                    startAt={formik.values.start_datetime.toString()}
                    title={formik.values.title}
                    description={formik.values.description}
                    openingBidAmount={formik.values.opening_bid_amount}
                    live={false}
                />
            </div>
        </div>
    );
};

export default AddAuction;
