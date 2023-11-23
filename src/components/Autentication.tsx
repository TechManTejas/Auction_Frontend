import { Tabs, Input, Button, Checkbox } from 'antd';
import { UserOutlined, UserAddOutlined, LockOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TabPane } = Tabs;

const Login: React.FC = () => {
    return (
        <div className='space-y-6 w-[300px]'>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="username"
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                />
            </div>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="password"
                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                    suffix={<EyeOutlined style={{ color: '#1890FF' }} />}
                    style={{ textAlign: 'center' }}
                />
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <Checkbox>Remember me</Checkbox>
                </div>
                <div className='text-sky-600'>Forgot password?</div>
            </div>
            <div>
                <Button className="bg-[#1890FF] primary-6 text-white px-6 rounded-sm">
                    Sign in
                </Button>
            </div>
        </div>
    )
}

const Register: React.FC = () => {
    return (
        <div className='space-y-6 w-[300px]'>
            <div className='flex space-x-6'>
                <div>
                    <Input
                        className='text-center rounded-none'
                        placeholder="First Name"
                        prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                    />
                </div>
                <div>
                    <Input
                        className='text-center rounded-none'
                        placeholder="Last Name"
                        prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                    />
                </div>
            </div>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="Email"
                    prefix={<MailOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                />
            </div>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="Username"
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                />
            </div>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="Password"
                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                    style={{ textAlign: 'center' }}
                />
            </div>
            <div>
                <Input
                    className='text-center rounded-none'
                    placeholder="Confirm Password"
                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#1890FF' }} />}
                    style={{ textAlign: 'center' }}
                />
            </div>
            <div>
                <Button className="bg-[#1890FF] primary-6 text-white px-6 rounded-sm">
                    Register
                </Button>
            </div>
        </div>
    )
}

export default function Autentication() {

    const [activeTab, setActiveTab] = useState<string>('1');

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
        console.log(activeTab);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='font-semibold text-3xl mt-5'>
                AUCTION
            </div>
            <div className='m-5'>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="top"
                    onChange={handleTabChange}
                >
                    <TabPane
                        tab={
                            <span>
                                <UserOutlined /> Login
                            </span>
                        }
                        key="1"
                    />
                    <TabPane
                        tab={
                            <span>
                                <UserAddOutlined /> Register
                            </span>
                        }
                        key="2"
                    />
                </Tabs>
            </div>
            <div className='mb-10'>
                {activeTab === '1' ?
                    <Login /> :
                    <Register />
                }
            </div>
        </div>
    )
}
