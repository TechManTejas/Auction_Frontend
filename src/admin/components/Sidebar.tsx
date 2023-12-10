import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    BookOutlined, FileOutlined, UserOutlined,
    // CreditCardOutlined,
    // UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.replace('/admin/', '');

    const role = localStorage.getItem("auction-admin-role")

    const handleMenuClick = (key: string) => {
        // Convert the key to lowercase and navigate to the respective route
        navigate(`/admin/${key}`);
    };

    return (
        <Sider width={200} className="h-[calc(100vh-52px)] bg-[#EDF5FF]">
            <Menu
                mode="inline"
                defaultSelectedKeys={[path]}
                className='h-full bg-inherit'
                onClick={({ key }) => handleMenuClick(key as string)}
            >
                {role === 'SUPERADMIN' && (
                    <>
                        <Menu.Item key="auctions" icon={<BookOutlined />}>
                            Auctions
                        </Menu.Item>
                        <Menu.Item key="tenders" icon={<FileOutlined />}>
                            Tenders
                        </Menu.Item>
                        <Menu.Item key="staffs" icon={<UserOutlined />}>
                            Staff
                        </Menu.Item>
                    </>
                )}
                {role === 'AUCTIONADMIN' && (
                    <Menu.Item key="Auctions" icon={<BookOutlined />}>
                        Auctions
                    </Menu.Item>
                )}
                {role === 'TENDERADMIN' && (
                    <Menu.Item key="Tenders" icon={<FileOutlined />}>
                        Tenders
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
