import React from "react";
import { Button } from "antd";
import Placeholder from "../../assets/images/placeholder.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface AuctionCardProps {
    id: string;
    image: string;
    live?: boolean;
    startAt: string;
    title: string;
    description: string;
    openingBidAmount: number;
    status?: string;
    winnerBidAmount?: string;
    winner?: string
    modifyable: boolean;
    handleDeleteConfirmation?: (id: string) => void;
    handleEditCoupon?: (id: string) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ id, live = false, image, startAt, title, description, status, winnerBidAmount, winner, openingBidAmount, modifyable, handleDeleteConfirmation, handleEditCoupon }) => {

    return (
        <div>
            <div className={`absolute w-[240px] h-[400px] ${live ? 'border-[#52C41A] border-[3px] animate-pulse' : ''}   rounded-xl`} />
            <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                className={`w-[240px] ${winner ? 'h-[420px]' : 'h-[400px]'}  ${live ? ' border-[3px]' : ''}   rounded-xl`}
            >
                {live && (
                    <div className="w-full flex justify-center items-center -mt-6">
                        <div className="text-white bg-[#52C41A] success font-semibold px-2 rounded-t-sm animate-pulse">
                            LIVE
                        </div>
                    </div>
                )}
                <div className="w-full flex text-sm justify-center items-center p-2 text-[#002766] daybreakblue-10">
                    {new Date(startAt).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: '2-digit',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </div>
                <div>
                    <img src={`${import.meta.env.VITE_BASE_URL}${image}` || Placeholder} className="object-cover w-full h-44" alt="Auction Item" />
                </div>
                <div className="p-6 space-y-1">
                    <div className="font-semibold overflow-hidden overflow-ellipsis line-clamp-1">{title}</div>
                    <div className="text-sm h-14 overflow-hidden overflow-ellipsis whitespace-normal line-clamp-4">{description}</div>
                    <div className="text-[#096DD9] primary-7">
                        {status === "Ended" ?
                            <div>
                                <div>
                                    Winner: {winner}
                                </div>
                                <div>
                                    Winner Bid Amount: {winnerBidAmount}
                                </div>
                            </div>
                            : <>
                                Opening Bid: {openingBidAmount}
                            </>
                        }
                    </div>
                    {
                        modifyable &&
                        <div className="w-full flex justify-between items-center">
                            <Button type="primary" className="bg-[#1890FF] primary-6 text-white px-5 rounded-lg" onClick={() => {
                                if (handleEditCoupon) {
                                    handleEditCoupon(id)
                                }
                            }} icon={<EditOutlined />}/>
                            <Button className="bg-[#ff1818] primary-6 text-white px-5 rounded-lg" onClick={() => {
                                if (handleDeleteConfirmation) {
                                    handleDeleteConfirmation(id)
                                }
                            }} icon={<DeleteOutlined />}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;
