import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tabs, Modal, Table, Space } from 'antd';
import { InboxOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import AddUser from '../components/AddUser';
import axios from '../../api/axios.js';

const { TabPane } = Tabs;

interface IUser {
    key: string; // Assuming 'key' is a unique identifier for each user
    username: string;
    name: string;
    mobile_no: string;
    email_id: string;
}


export default function Users() {

    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobile_no',
            key: 'mobile_no',
        },
        {
            title: 'Email ID',
            dataIndex: 'email_id',
            key: 'email_id',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: IUser) => (
                <Space size="middle">
                    {/* Edit button */}
                    <Button type="dashed" onClick={() => { console.log(text, record) }}>
                        Edit
                    </Button>

                    {/* Delete button */}
                    <Button type="dashed" onClick={() => { console.log(text, record) }}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    type PositionType = 'left';

    const [position] = useState<PositionType[]>(['left']);

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left: <Button className="h-12 w-40 mb-4 bg-[#1890FF] primary-6 text-white" onClick={() => { setIsModalOpen(true) }}>Add User</Button>,
    };


    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [position]);

    const [activeTab, setActiveTab] = useState<string>('1');

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
        console.log(activeTab);
    };

    useEffect(() => {
        // Fetch user data from your API or database
        const fetchData = async () => {
            try {
                const response = await axios.get('/users/'); // Replace with your API endpoint
                console.log(response.data.users)
                setUserData(response.data.users);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Modal closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                <AddUser />
            </Modal>
            <Tabs
                className='flex flex-1'
                defaultActiveKey="1"
                tabPosition="left"
                tabBarExtraContent={slot}
                onChange={handleTabChange}
            >
                <TabPane tab={<span><InboxOutlined />Bid Winners</span>} key="1">

                </TabPane>
                <TabPane tab={<span><ClockCircleOutlined />All</span>} key="2" >
                    <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={userData}
                        pagination={{
                            position: ['bottomRight'],
                            pageSize: 10
                        }}
                        scroll={{
                            y: 700
                        }}
                    />
                </TabPane>
                <TabPane tab={<span><TeamOutlined />Staff</span>} key="3" >

                </TabPane>
            </Tabs>
        </>
    )
}
