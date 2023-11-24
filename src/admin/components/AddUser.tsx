import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

export default function AddUser() {
    return (
        <div>
            <div className='font-medium text-center text-3xl my-5'>
                ADD USER
            </div>
            <div className='space-y-6'>
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
                <div className='w-full flex justify-center'>
                    <Button className="bg-[#1890FF] primary-6 text-white px-6 rounded-sm">
                        Add
                    </Button>
                </div>
            </div>
        </div>

    )
}
