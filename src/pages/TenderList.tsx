import { Modal, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../api/axios"
import { ITender } from '../types/tender.types';
import TenderCard from '../components/TenderCard';
import TenderForm from '../components/TenderForm';
import Search from 'antd/es/input/Search';

const NoTender: React.FC = () => {
    return (
        <div className='text-4xl font-bold text-center text-[#002766]'>
            "Currently, no auctions are available. Kindly revisit later for updates."
        </div>
    )
}

const TenderList: React.FC = () => {
    // Access the state from useLocation hook
    const location = useLocation();
    const { state } = location;

    console.log(state.tab)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true)
    const [tenders, setTenders] = useState<ITender[]>([]);
    const [totalTenders, setTotalTenders] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(15);
    const [selectedTab] = useState<string>(state.tab || 'In Progress');
    const [selectedTender, setSelectedTender] = useState<ITender | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>('');

    const openQuoteModal = (tender: ITender) => {
        setSelectedTender(tender);
        setIsModalOpen(true);
    };

    const closeQuoteModal = () => {
        setSelectedTender(null);
        setIsModalOpen(false);
    };

    const fetchData = async (page = 1) => {
        setLoading(true)
        try {
            const response = await axios.get('/tenders', {
                params: {
                    page: page,
                    pageSize: pageSize,
                    filter: JSON.stringify({status: "In Progress"}),
                    search: searchQuery,
                },
            });
            console.log(response.data)
            setTenders(response.data.tenders);
            setTotalTenders(response.data.total);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [selectedTab, searchQuery]);

    return (
        <div>
            <Modal width={1000} closable={false} open={isModalOpen} footer={null} onCancel={closeQuoteModal}>
                {selectedTender && <TenderForm tender={selectedTender} closeQuoteModal={closeQuoteModal}/>}
            </Modal>
            <div>
                <div className='space-y-2 py-5'>
                    <div className='text-4xl font-medium text-center text-[#002766]'>
                        Tenders
                    </div>
                    <div className='text-center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin.
                    </div>
                </div>
                <div className='mb-4 w-full flex justify-center'>
                    <Search
                        className='w-[360px]'
                        size={'large'}
                        placeholder="Search..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='min-h-[460px] flex justify-center items-center space-x-12 my-4'>
                        {loading ? (
                            // Show loading spin when auctions are being fetched
                            <div className="flex items-center justify-center w-full">
                                <Spin size="large" tip="Loading..." />
                            </div>
                        ) : tenders.length > 0 ? (
                            // Show auctions if available
                            <div className='flex flex-wrap justify-center gap-12 px-6 text-sm'>
                                {tenders.map((tender) => (
                                    <TenderCard
                                        key={tender._id}
                                        id={tender._id}
                                        title={tender.title}
                                        description={tender.description}
                                        estCost={tender.estCost}
                                        timeToComplete={tender.timeToComplete}
                                        bidEndsOn={tender.bidEndsOn}
                                        city={tender.city}
                                        onQuoteSubmit={() => openQuoteModal(tender)}
                                    />
                                ))}
                            </div>
                        ) : <NoTender />}
                    </div>

                    <div className='m-4'>
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={totalTenders}
                            onChange={(page) => {
                                setPage(page);
                                fetchData(page);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenderList;
