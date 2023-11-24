import { Form, Input, DatePicker, InputNumber, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

export default function AddAuction() {

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            start_datetime: null,
            durationHours: 0,
            durationMinutes: 15,
            opening_bid_amount: 1000,
            raise_option1: 100,
            raise_option2: 500,
            raise_option3: 1000,
            raise_option4: 2000,
        },
        onSubmit: values => {
            // Handle form submission here
            console.log(values);
        },
    });

    // Image Upload Configuration
    // const imageUploadProps = {
    //     beforeUpload: file => {
    //         // TODO: Handle image upload logic
    //         return false;
    //     },
    // };

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={formik.handleSubmit}
        >
            <Form.Item label="Images" name="images">
                <Upload 
                // {...imageUploadProps}
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
                <DatePicker showTime onChange={(date, dateString) => formik.setFieldValue('start_datetime', dateString)} />
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
                <Button type="dashed" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
