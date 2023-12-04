import { FileTextOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { handleFileDownload } from '../../utils/FileDownloader';
import { TenderFormData } from '../../types/tender.types';
import TenderFormDetails from '../components/TenderFormDetails';
import Search from 'antd/es/input/Search';

export default function TenderSubmissions() {

    const location = useLocation();
    const { state } = location;

    const [submissions, setSubmissions] = useState<TenderFormData[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<TenderFormData | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalSubmissions, setTotalSubmission] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const columns: ColumnsType<TenderFormData> = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Quote Amount',
            dataIndex: 'quoteAmount',
            key: 'quoteAmount',
        },
        {
            title: 'Pan Number',
            dataIndex: 'panNumber',
            key: 'panNumber',
        },
        {
            title: 'GST Number',
            dataIndex: 'gstNumber',
            key: 'gstNumber',
        },
        // {
        //     title: 'Project Details 1',
        //     dataIndex: 'projectDetails1',
        //     key: 'projectDetails1',
        // },
        // {
        //     title: 'Project Details 2',
        //     dataIndex: 'projectDetails2',
        //     key: 'projectDetails2',
        // },
        // {
        //     title: 'Project Details 3',
        //     dataIndex: 'projectDetails3',
        //     key: 'projectDetails3',
        // },
        {
            title: 'Income Proof',
            dataIndex: 'incomeProof',
            key: 'incomeProof',
            render: (text) => (
                <Button type="default" icon={<FileTextOutlined />} onClick={() => handleFileDownload(text)}>
                    View File
                </Button>
            ),
        },
        {
            title: 'IT Return/Bank Statement',
            dataIndex: 'itReturnOrBankStatement',
            key: 'itReturnOrBankStatement',
            render: (text) => (
                <Button type="default" icon={<FileTextOutlined />} onClick={() => handleFileDownload(text)}>
                    View File
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            render: (_text, record) => (
                <Space size="middle">
                    <Button type='primary' className='bg-[#1890FF] primary-6 text-white px-5 rounded-md' onClick={() => {
                        setSelectedSubmission(record)
                        setIsModalOpen(true)
                    }}>View</Button>
                </Space>
            ),
        },
    ];

    const fetchData = async (page: number = 1) => {
        // Fetch data based on tenderId from state or local storage
        const tenderIdFromState = state?.tenderId;
        const tenderIdFromStorage = localStorage.getItem("selected-tender-id");
        const tenderIdToFetch = tenderIdFromState || tenderIdFromStorage;

        console.log(tenderIdToFetch)

        if (tenderIdToFetch) {
            // Fetch TenderForms based on the selected tenderId
            axios.get(`/tenderform`, {
                params: {
                    page: page,
                    pageSize: 30,
                    filter: JSON.stringify({ tenderId: tenderIdToFetch }),
                    search: searchQuery,
                },
            })
                .then(response => {
                    const { data } = response;
                    console.log(data)
                    setSubmissions(data.tenderforms);
                    setTotalSubmission(data.total);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    };

    useEffect(() => {
        fetchData()
    }, [searchQuery]);

    return (
        <>
            {
                selectedSubmission &&
                <Modal width={1000} closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                    <TenderFormDetails selectedSubmission={selectedSubmission} />
                </Modal>
            }
            <div className='p-4'>
                <div className='text-4xl font-medium text-[#002766] mb-4'>
                    Submissions for: <span className='text-black'>{localStorage.getItem("selected-tender-title")}</span>
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
                    dataSource={submissions}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 10,
                        total: totalSubmissions,
                        current: currentPage,
                    }}
                    onChange={(pagination) => setCurrentPage(pagination.current || 1)}
                    scroll={{
                        y: 600,
                    }}
                />
            </div>
        </>
    )
}
