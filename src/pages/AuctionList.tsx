import { Pagination, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuctionCard from '../components/AuctionCard';
import TabPane from 'antd/es/tabs/TabPane';
import { ClockCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { IAuction } from '../types/auction.types';
import axios from "../api/axios"

const NoAuction: React.FC = () => {
    return (
        <div className='text-4xl font-bold text-center text-[#002766]'>
            "Currently, no auctions are available. Kindly revisit later for updates."
        </div>
    )
}

const AuctionList: React.FC = () => {
    // Access the state from useLocation hook
    const location = useLocation();
    const { state } = location;

    console.log(state.tab)

    const [loading, setLoading] = useState<boolean>(true)
    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [totalAuctions, setTotalAuctions] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(15);
    const [selectedTab, setSelectedTab] = useState<string>(state.tab || 'In Progress');

    const fetchData = async (page = 1, filter = {}) => {
        setLoading(true)
        try {
            const response = await axios.get('/auctions', {
                params: {
                    page: page,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                },
            });
            console.log(response.data)
            setAuctions(response.data.auctions);
            setTotalAuctions(response.data.total);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData(page, {status: selectedTab});
    }, [selectedTab]);

    return (
        <div>
            <div>
                <div className='space-y-2 py-5'>
                    <div className='text-4xl font-medium text-center text-[#002766]'>
                        Auctions
                    </div>
                    <div className='text-center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin.
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='m-4'>
                        <Tabs
                            defaultActiveKey={selectedTab}
                            tabPosition="top"
                            onChange={(key) => {
                                setSelectedTab(key)
                            }}
                        >
                            <TabPane tab={<span><PlayCircleOutlined /> Active</span>} key="In Progress" />
                            <TabPane tab={<span><ClockCircleOutlined /> Upcoming</span>} key="Not Started" />
                        </Tabs >
                    </div>
                    <div className='min-h-[460px] flex justify-center items-center space-x-12 my-4'>
                        {loading ? (
                            // Show loading spin when auctions are being fetched
                            <div className="flex items-center justify-center w-full">
                                <Spin size="large" tip="Loading..." />
                            </div>
                        ) : auctions.length > 0 ? (
                            // Show auctions if available
                            <div className='flex flex-wrap justify-center gap-12 px-6'>
                                {auctions.map((auction) => (
                                    <AuctionCard
                                        key={auction._id}
                                        id={auction._id}
                                        image={auction.image}
                                        live={auction.status === 'In Progress'}
                                        startAt={auction.start_datetime.toString()}
                                        title={auction.title}
                                        description={auction.description}
                                        openingBidAmount={`$${auction.opening_bid_amount}`}
                                    />
                                ))}
                            </div>
                        ) : <NoAuction />}
                    </div>

                    <div className='m-4'>
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={totalAuctions}
                            onChange={(page) => {
                                setPage(page);
                                fetchData(page, { status: selectedTab });
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionList;
