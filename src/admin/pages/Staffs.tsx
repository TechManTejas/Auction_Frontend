import { Button, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { IStaff } from '../../types/staff.types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { confirmation } from '../components/Confirmation';
import { Option } from 'antd/es/mentions';

export default function Staff() {

    const [staffs, setStaffs] = useState<IStaff[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [totalStaffs, setTotalStaffs] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [editingStaff, setEditingStaff] = useState<IStaff | null>(null);

    const showAddStaffModal = () => {
        form.resetFields();
        setEditingStaff(null);
        setIsModalVisible(true);
    };

    const showEditStaffModal = (staff: IStaff) => {
        form.setFieldsValue({
            username: staff.username,
            password: staff.password,
            role: staff.role,
        });
        setEditingStaff(staff);
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingStaff) {
                // Edit existing staff
                await axios.put(`/admins/${editingStaff._id}`, values);
            } else {
                // Add new staff
                await axios.post(`/admins/signup`, values);
            }
            setIsModalVisible(false);
            fetchData();
            message.success(`${editingStaff ? 'Edited' : 'Added'} staff successfully`);
        } catch (error) {
            console.error('Error creating/editing staff:', error);
            message.error('Error creating/editing staff. Please try again.');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (staff: IStaff) => {
        const confirmDelete = await confirmation(`Are you sure you want to delete ${staff.username}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`/admins/${staff._id}`);
                fetchData();
                message.success(`Successfully deleted ${staff.username}`);
            } catch (error) {
                console.error('Error deleting staff:', error);
                message.error('Error deleting staff. Please try again.');
            }
        }
    };

    const columns: ColumnsType<IStaff> = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (staff: IStaff) => (
                <Space className='space-x-4'>
                    {staff.username !== 'SUPERADMIN' &&
                        <>
                            <Button
                                type="primary"
                                className="bg-[#1890FF]"
                                icon={<EditOutlined />}
                                onClick={() => showEditStaffModal(staff)}
                            />
                            <Button
                                className="bg-red-600 text-white"
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(staff)}
                            />
                        </>
                    }
                </Space>
            ),
        },
    ];

    const fetchData = async (page: number = 1) => {
        // Fetch TenderForms based on the selected tenderId
        axios.get(`/admins`, {
            params: {
                page: page,
                pageSize: 20,
                search: searchQuery,
            },
        })
            .then(response => {
                const { data } = response;
                console.log(data)
                setStaffs(data.staffs);
                setTotalStaffs(data.total);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchData()
    }, [searchQuery]);

    return (
        <>
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div className='text-4xl font-medium text-[#002766] mb-4'>
                        Staffs
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        className="mb-4 bg-[#1890FF] primary-6"
                        onClick={showAddStaffModal}>
                        Add Staff
                    </Button>
                </div>
                <div className='mb-4'>
                    <Search
                        size={'large'}
                        placeholder="Search..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Table
                    className='shadow-xl border-2 rounded-xl '
                    columns={columns}
                    dataSource={staffs}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 10,
                        total: totalStaffs,
                        current: currentPage,
                    }}
                    onChange={(pagination) => setCurrentPage(pagination.current || 1)}
                    scroll={{
                        y: 600,
                    }}
                />
                <Modal
                    title={`${editingStaff ? 'Edit' : 'Add'} Staff`}
                    visible={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    okButtonProps={{ className: 'bg-[#1890FF]' }}
                    okText={`${editingStaff ? 'Save Changes' : 'Create'}`}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ role: 'SUPERADMIN' }}
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter a username' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter a password' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please select a role' }]}
                        >
                            <Select>
                                <Option value="SUPERADMIN">Super Admin</Option>
                                <Option value="AUCTIONADMIN">Auction Admin</Option>
                                <Option value="TENDERADMIN">Tender Admin</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
