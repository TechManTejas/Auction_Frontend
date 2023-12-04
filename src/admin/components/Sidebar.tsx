import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    BookOutlined, FileOutlined,
    // CreditCardOutlined,
    // UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleMenuClick = (key: string) => {
        // Convert the key to lowercase and navigate to the respective route
        navigate(`/admin/${key.toLowerCase()}`);
    };

    return (
        <Sider width={200} className="h-[calc(100vh-52px)] bg-[#EDF5FF]">
            <Menu
                mode="inline"
                defaultSelectedKeys={['Auctions']}
                className='h-full bg-inherit'
                onClick={({ key }) => handleMenuClick(key as string)}
            >
                <Menu.Item key="Auctions" icon={<BookOutlined />}>
                    Auctions
                </Menu.Item>
                <Menu.Item key="Tenders" icon={<FileOutlined />}>
                    Tenders
                </Menu.Item>
                {/* <Menu.Item key="Payments" icon={<CreditCardOutlined />}>
                    Payments
                </Menu.Item> */}
                {/* <Menu.Item key="Users" icon={<UserOutlined />}>
                    Users
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
