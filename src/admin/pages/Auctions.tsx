import React, { useMemo, useState, useEffect } from 'react';
import { Button, Tabs, Modal } from 'antd';
import { InboxOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import AddAuction from '../components/AddAuction';
import axios from '../../api/axios';
import AuctionCard from '../components/AuctionCard';
const { TabPane } = Tabs;

interface IAuction {
    _id: string;
    winner_id: string | null;
    winner_bid_amount: number;
    title: string;
    description: string;
    images: string[];
    start_datetime: Date;
    duration: number;
    opening_bid_amount: number;
    logs: Record<string, unknown>[];
    raise_options: Record<string, unknown>;
    status: 'Not Started' | 'In Progress' | 'Ended';
}

export default function Auctions() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [auctionData, setAuctionData] = useState<IAuction[]>([]);
    const [activeTab, setActiveTab] = useState<string>('1');

    type PositionType = 'left';

    const [position] = useState<PositionType[]>(['left']);

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left: <Button className="h-12 w-40 mb-4 bg-[#1890FF] primary-6 text-white" onClick={() => { setIsModalOpen(true) }}>Add Auction</Button>,
    };

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [position]);

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
        console.log(activeTab);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/auctions'); // Replace with your API endpoint
                console.log(response.data)
                setAuctionData(response.data);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Modal className='' closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                <AddAuction />
            </Modal>
            <Tabs
                className='flex flex-1'
                defaultActiveKey="1"
                tabPosition="left"
                tabBarExtraContent={slot}
                onChange={handleTabChange}
            >
                <TabPane tab={<span><InboxOutlined />Live</span>} key="1" >
                    <div className='my-4 grid grid-cols-3'>
                        {auctionData
                            .filter((auction) => auction.status === 'In Progress')
                            .map((auction) => (
                                <AuctionCard
                                    key={auction._id}
                                    live={auction.status === 'In Progress'}
                                    startAt={auction.start_datetime.toString()}
                                    title={auction.title}
                                    description={auction.description}
                                    openingBidAmount={`$${auction.opening_bid_amount}`}
                                />
                            ))}
                    </div>
                </TabPane>
                <TabPane tab={<span><ClockCircleOutlined />Upcoming</span>} key="2" >
                    <div className='my-4 grid grid-cols-3'>
                        {auctionData
                            .filter((auction) => auction.status === 'Not Started')
                            .map((auction) => (
                                <AuctionCard
                                    key={auction._id}
                                    live={auction.status === 'In Progress'}
                                    startAt={auction.start_datetime.toString()}
                                    title={auction.title}
                                    description={auction.description}
                                    openingBidAmount={`$${auction.opening_bid_amount}`}
                                />
                            ))}
                    </div>
                </TabPane>
                <TabPane tab={<span><CheckCircleOutlined />Completed</span>} key="3" >
                    <div className='my-4 grid grid-cols-3'>
                        {auctionData
                            .filter((auction) => auction.status === 'Ended')
                            .map((auction) => (
                                <AuctionCard
                                    key={auction._id}
                                    live={auction.status === 'In Progress'}
                                    startAt={auction.start_datetime.toString()}
                                    title={auction.title}
                                    description={auction.description}
                                    openingBidAmount={`$${auction.opening_bid_amount}`}
                                />
                            ))}
                    </div>
                </TabPane>
                <TabPane tab={<span><ClockCircleOutlined />All</span>} key="4" >
                    <div className='my-4 grid grid-cols-3'>
                        {auctionData.map((auction) => (
                            <AuctionCard
                                key={auction._id}
                                live={auction.status === 'In Progress'}
                                startAt={auction.start_datetime.toString()}
                                title={auction.title}
                                description={auction.description}
                                openingBidAmount={`$${auction.opening_bid_amount}`}
                            />
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
}
