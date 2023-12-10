import React, { useMemo, useState, useEffect } from 'react';
import { Button, Tabs, Modal, message, Spin } from 'antd';
import { InboxOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import AddAuction from '../components/AddAuction';
import axios from '../../api/axios';
import AuctionCard from '../components/AuctionCard';
import { confirmation } from '../components/Confirmation';
import { IAuction } from '../../types/auction.types';
const { TabPane } = Tabs;

export default function Auctions() {

    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [editedAuctionDetails, setEditedAuctionDetails] = useState<IAuction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('1');
    const [loading, setLoading] = useState(true);

    type PositionType = 'left';

    const [position] = useState<PositionType[]>(['left']);

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left:
            <Button
                type='primary'
                size='large'
                className="mb-4 bg-[#1890FF] primary-6"
                onClick={() => {
                    setEditedAuctionDetails(null)
                    setIsModalOpen(true)
                }}>
                Add Auction
            </Button>,
    };

    const NoAuction: React.FC = () => {
        return (
            <div className='text-4xl font-bold text-center text-[#002766]'>
                No auctions here...
            </div>
        )
    }

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

    const fetchData = async () => {
        try {
            const response = await axios.get('/auctions'); // Replace with your API endpoint
            console.log(response.data)
            setAuctions(response.data.auctions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleModifiedAuctionList = (editedAuction: IAuction) => {

        console.log("EDITED AUCTION", editedAuction)

        setAuctions((prevAuctions) => {
            // Check if the edited coupon already exists in the list
            const couponExists = prevAuctions.some((auction) => auction._id === editedAuction?._id);

            if (couponExists) {
                // Update the existing coupon
                const updatedCoupons = prevAuctions.map((auction) =>
                    auction._id === editedAuction._id ? editedAuction : auction
                );
                setIsModalOpen(false)
                return updatedCoupons;
            } else {
                setIsModalOpen(false)
                // Add the new coupon to the list
                return [...prevAuctions, editedAuction];
            }
        });
    };

    const handleEditCoupon = (auctionId: string) => {
        // Find the coupon with the given ID
        const editedCoupon = auctions.find((auction) => auction._id === auctionId);

        // Check if the coupon is found
        if (editedCoupon) {
            // Open the AddEditCoupon modal and pass the coupon ID and details
            setIsModalOpen(true);
            setEditedAuctionDetails(editedCoupon);
        }
    };

    const handleDeleteCoupon = async (auctionId: string) => {
        try {
            // Make axios call to delete the coupon
            await axios.delete(`/auctions/${auctionId}`);
            // Update the list after successful deletion
            setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== auctionId));
            // Fetch data for the current page to reflect the deletion
            // fetchData(currentPage); 

            // Show a success message to the user
            message.success('Auction deleted successfully!');
        } catch (error) {
            console.error('Error deleting coupon:', error);
            // Handle error (e.g., show an error message to the user)
            message.error('Error deleting coupon. Please try again.');
        }
    };

    const handleDeleteConfirmation = async (auctionId: string) => {
        const shouldDelete = await confirmation("Are you sure you want to delete this Auction?");
        if (shouldDelete) {
            // User confirmed the deletion, call the delete function
            handleDeleteCoupon(auctionId);
        }
    }

    return (
        <>
            <Modal width={1000} closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                <AddAuction onAuctionEdited={handleModifiedAuctionList} editedAuction={editedAuctionDetails} />
            </Modal>
            <Tabs
                className='flex flex-1'
                defaultActiveKey="1"
                tabPosition="left"
                tabBarExtraContent={slot}
                onChange={handleTabChange}
            >
                <TabPane tab={<span><InboxOutlined />Live</span>} key="1">
                    <div className='p-6 gap-12 flex flex-wrap'>
                        {loading ? (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
                                <Spin size='large' tip="Loading..." />
                            </div>
                        ) : auctions.filter((auction) => auction.status === 'In Progress').length > 0 ? (
                            auctions
                                .filter((auction) => auction.status === 'In Progress')
                                .map((auction) => (
                                    <AuctionCard
                                        key={auction._id}
                                        id={auction._id}
                                        image={auction.image}
                                        live={auction.status === 'In Progress'}
                                        startAt={auction.start_datetime.toString()}
                                        title={auction.title}
                                        description={auction.description}
                                        openingBidAmount={auction.opening_bid_amount}
                                        modifyable={false}
                                    />
                                ))
                        ) : <NoAuction />
                        }
                    </div>
                </TabPane>
                <TabPane tab={<span><ClockCircleOutlined />Upcoming</span>} key="2" >
                    <div className='p-6 gap-12 flex flex-wrap'>
                        {loading ? (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
                                <Spin size='large' tip="Loading..." />
                            </div>
                        ) : auctions.filter((auction) => auction.status === 'Not Started').length > 0 ? (
                            auctions
                                .filter((auction) => auction.status === 'Not Started')
                                .map((auction) => (
                                    <AuctionCard
                                        key={auction._id}
                                        id={auction._id}
                                        image={auction.image}
                                        startAt={auction.start_datetime.toString()}
                                        title={auction.title}
                                        description={auction.description}
                                        openingBidAmount={auction.opening_bid_amount}
                                        modifyable={true}
                                        handleDeleteConfirmation={handleDeleteConfirmation}
                                        handleEditCoupon={handleEditCoupon}
                                    />
                                ))
                        ) : <NoAuction />
                        }
                    </div>
                </TabPane>
                <TabPane tab={<span><CheckCircleOutlined />Completed</span>} key="3" >
                    <div className='p-6 gap-12 flex flex-wrap'>
                        {loading ? (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
                                <Spin size='large' tip="Loading..." />
                            </div>
                        ) : auctions.filter((auction) => auction.status === 'Ended').length > 0 ? (
                            auctions
                                .filter((auction) => auction.status === 'Ended')
                                .map((auction) => (
                                    <AuctionCard
                                        key={auction._id}
                                        id={auction._id}
                                        image={auction.image}
                                        live={auction.status === 'In Progress'}
                                        startAt={auction.start_datetime.toString()}
                                        title={auction.title}
                                        description={auction.description}
                                        openingBidAmount={auction.opening_bid_amount}
                                        status={auction.status}
                                        winnerBidAmount={auction.winner_bid_amount.toString()}
                                        winner={auction?.winner ?? "None"}
                                        modifyable={false}
                                    />
                                ))
                        ) : <NoAuction />
                        }
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
}
