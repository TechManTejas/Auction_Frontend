import React, { useMemo, useState, useEffect } from 'react';
import { Button, Tabs, Modal, message, Spin } from 'antd';
import { InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';
import AddTender from '../components/AddTender';
import axios from '../../api/axios';
import TenderCard from '../components/TenderCard';
import { confirmation } from '../components/Confirmation';
import { ITender } from '../../types/tender.types';
const { TabPane } = Tabs;

export default function Tenders() {

    const [tenders, setTenders] = useState<ITender[]>([]);
    const [editedTenderDetails, setEditedTendersDetails] = useState<ITender | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('1');
    const [loading, setLoading] = useState(false);

    type PositionType = 'left';

    const [position] = useState<PositionType[]>(['left']);

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left:
            <Button
                type='primary'
                size='large'
                className="mb-4 bg-[#1890FF] primary-6"
                onClick={() => {
                    setEditedTendersDetails(null)
                    setIsModalOpen(true)
                }}>
                Add Tender
            </Button>,
    };

    const NoTender: React.FC = () => {
        return (
            <div className='text-4xl font-bold text-center text-[#002766]'>
                No tenders here...
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
            const response = await axios.get('/tenders'); // Replace with your API endpoint
            console.log(response.data)
            setTenders(response.data.tenders);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tender data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleModifiedTenderList = (editedTender: ITender) => {

        console.log("EDITED TENDER", editedTender)

        setTenders((prevTenders) => {
            // Check if the edited coupon already exists in the list
            const couponExists = prevTenders.some((tenders) => tenders._id === editedTender?._id);

            if (couponExists) {
                // Update the existing coupon
                const updatedCoupons = prevTenders.map((tenders) =>
                    tenders._id === editedTender._id ? editedTender : tenders
                );
                setIsModalOpen(false)
                return updatedCoupons;
            } else {
                setIsModalOpen(false)
                // Add the new coupon to the list
                return [...prevTenders, editedTender];
            }
        });
    };

    const handleEditCoupon = (tenderId: string) => {
        // Find the coupon with the given ID
        const editedCoupon = tenders.find((auction) => auction._id === tenderId);

        // Check if the coupon is found
        if (editedCoupon) {
            // Open the AddEditCoupon modal and pass the coupon ID and details
            setIsModalOpen(true);
            setEditedTendersDetails(editedCoupon);
        }
    };

    const handleDeleteCoupon = async (tenderId: string) => {
        try {
            // Make axios call to delete the coupon
            await axios.delete(`/tenders/${tenderId}`);
            // Update the list after successful deletion
            setTenders((prevTenders) => prevTenders.filter((tenders) => tenders._id !== tenderId));
            // Fetch data for the current page to reflect the deletion
            // fetchData(currentPage); 

            // Show a success message to the user
            message.success('Tender deleted successfully!');
        } catch (error) {
            console.error('Error deleting tender:', error);
            // Handle error (e.g., show an error message to the user)
            message.error('Error deleting tender. Please try again.');
        }
    };

    const handleDeleteConfirmation = async (tenderId: string) => {
        const shouldDelete = await confirmation("Are you sure you want to delete this Tender?");
        if (shouldDelete) {
            // User confirmed the deletion, call the delete function
            handleDeleteCoupon(tenderId);
        }
    }

    return (
        <>
            <Modal width={1000} closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                <AddTender onTenderEdited={handleModifiedTenderList} editedTender={editedTenderDetails} />
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
                        ) : tenders.filter((auction) => auction.status === 'In Progress').length > 0 ? (
                            tenders
                                .filter((auction) => auction.status === 'In Progress')
                                .map((auction) => (
                                    <TenderCard
                                        key={auction._id}
                                        id={auction._id}
                                        title={auction.title}
                                        description={auction.description}
                                        estCost={auction.estCost}
                                        timeToComplete={auction.timeToComplete}
                                        bidEndsOn={auction.bidEndsOn}
                                        city={auction.city}
                                        handleDeleteConfirmation={handleDeleteConfirmation}
                                        handleEditCoupon={handleEditCoupon}
                                    />
                                ))
                        ) : <NoTender />
                        }
                    </div>
                </TabPane>
                <TabPane tab={<span><CheckCircleOutlined />Completed</span>} key="3" >
                    <div className='p-6 gap-12 flex flex-wrap'>
                        {loading ? (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
                                <Spin size='large' tip="Loading..." />
                            </div>
                        ) : tenders.filter((auction) => auction.status === 'Ended').length > 0 ? (
                            tenders
                                .filter((auction) => auction.status === 'Ended')
                                .map((auction) => (
                                    <TenderCard
                                        key={auction._id}
                                        id={auction._id}
                                        title={auction.title}
                                        description={auction.description}
                                        estCost={auction.estCost}
                                        timeToComplete={auction.timeToComplete}
                                        bidEndsOn={auction.bidEndsOn}
                                        city={auction.city}
                                    />
                                ))
                        ) : <NoTender />
                        }
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
}
