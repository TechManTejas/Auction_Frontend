import { Form, Input, DatePicker, InputNumber, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import AuctionCard from './AuctionCardPrototype';
import { useState } from 'react';
import axios from "../../api/axios"
import { IAuction } from '../../types/auction.types';
import './DatePicker.css'

interface AuctionFormProps {
    editedAuction?: IAuction | null; // Include the editedCoupon prop
    onAuctionEdited: (editedCoupon: IAuction) => void;
}

const AddAuction: React.FC<AuctionFormProps> = ({ editedAuction, onAuctionEdited }) => {

    // Extract id from editedCoupon or set it to undefined
    const id = editedAuction?._id || undefined;

    const [imageURL, setImageURL] = useState('')

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
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                // Calculate duration in milliseconds
                const durationMilliseconds = ((values.durationMinutes * 60) + (values.durationHours * 60 * 60)) * 1000;

                // Prepare FormData for sending files
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('start_datetime', values.start_datetime.toString());
                formData.append('duration', durationMilliseconds.toString());
                formData.append('durationHours', values.durationHours.toString());
                formData.append('durationMinutes', values.durationMinutes.toString());
                formData.append('opening_bid_amount', values.opening_bid_amount.toString());
                formData.append('raise_options', JSON.stringify({
                    '1': values.raise_option1.toString(),
                    '2': values.raise_option2.toString(),
                    '3': values.raise_option3.toString(),
                    '4': values.raise_option4.toString()
                }));
                formData.append("image", imageURL);

                let response;

                if (id) {
                    // Edit existing auction
                    response = await axios.put(`/auctions/${id}`, formData);
                } else {
                    // Add new auction
                    response = await axios.post('/auctions/create', formData);
                }

                // Check if the response indicates a successful creation
                if (response.status === 201 || response.status === 200) {
                    const editedAuction = response.data;
                    console.log(editedAuction, response.data)
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
            } catch (error) {
                console.error('Error saving auction:', error);
                message.error('Failed to save auction. Please try again.');
            }
        },
    });

    // useEffect(() => {
    //     if (editedAuction) {
    //         console.log(editedAuction)
    //         const { start_datetime, ...rest } = editedAuction;
    //         formik.setValues({
    //             ...rest,
    //             start_datetime: moment(start_datetime),
    //         });
    //         setImageURL(editedAuction.image);

    //         console.log(formik.values)
    //     } else {
    //         formik.resetForm();
    //         setImageURL('');
    //     }
    // }, [editedAuction]);

    // Image Upload Configuration
    const imageUploadProps = {
        beforeUpload: (_file: File) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                // The result will be a data URL
                const dataUrl = event.target?.result as string;
                setImageURL(dataUrl)
            };
            reader.readAsDataURL(_file);
            return false
        }
    };

    return (
        <div className='flex justify-between items-center'>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={formik.handleSubmit}
            >
                <Form.Item label="Image" name="image">
                    <Upload
                        {...imageUploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
                    <Input onChange={formik.handleChange} value={formik.values.title} />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
                    <Input.TextArea onChange={formik.handleChange} value={formik.values.description} />
                </Form.Item>

                <Form.Item label="Start Date and Time" name="start_datetime" rules={[{ required: true, message: 'Please select the start date and time!' }]}>
                    <DatePicker showTime onChange={(date, dateString) => {
                        console.log(date)
                        formik.setFieldValue('start_datetime', dateString)
                    }} />
                </Form.Item>

                <Form.Item label="Duration" name="duration">
                    <InputNumber
                        style={{ width: '50%' }}
                        min={0}
                        placeholder="Hours"
                        onChange={value => formik.setFieldValue('durationHours', value)}
                        value={formik.values.durationHours}
                    />
                    <span style={{ margin: '0 8px' }}>hours</span>
                    <InputNumber
                        style={{ width: '50%' }}
                        min={0}
                        placeholder="Minutes"
                        onChange={value => formik.setFieldValue('durationMinutes', value)}
                        value={formik.values.durationMinutes}
                    />
                    <span style={{ margin: '0 8px' }}>minutes</span>
                </Form.Item>

                <Form.Item label="Opening Bid Amount" name="opening_bid_amount" rules={[{ required: true, message: 'Please enter the opening bid amount!' }]}>
                    <InputNumber min={0} onChange={value => formik.setFieldValue('opening_bid_amount', value)} value={formik.values.opening_bid_amount} />
                </Form.Item>

                <Form.Item label="Raise Options" name="raise_options">
                    <Input.Group compact>
                        <InputNumber
                            min={0}
                            onChange={value =>
                                formik.setFieldValue('raise_option1', value)
                            }
                            value={formik.values.raise_option1}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={value =>
                                formik.setFieldValue('raise_option2', value)
                            }
                            value={formik.values.raise_option2}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={value =>
                                formik.setFieldValue('raise_option3', value)
                            }
                            value={formik.values.raise_option3}
                            style={{ width: '50%' }}
                        />
                        <InputNumber
                            min={0}
                            onChange={value =>
                                formik.setFieldValue('raise_option4', value)
                            }
                            value={formik.values.raise_option4}
                            style={{ width: '50%' }}
                        />
                    </Input.Group>
                </Form.Item>

                {/* Add other form items for images if needed */}

                <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                    <Button type="primary" className='bg-[#1890FF] w-full font-semibold' htmlType="submit">
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
                    openingBidAmount={formik.values.opening_bid_amount.toString()}
                    live={false}
                />
            </div>
        </div>
    )
}

export default AddAuction;