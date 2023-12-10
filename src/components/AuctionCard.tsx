import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import Placeholder from "../assets/images/placeholder.png";
import { Context } from "../context/context.provider";

interface AuctionCardProps {
    id: string;
    image: string;
    live?: boolean;
    startAt: string;
    title: string;
    description: string;
    openingBidAmount: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ id, live = false, image, startAt, title, description, openingBidAmount }) => {

    const { userAuthenticated, setAuthModalOpen } = Context();

    const navigate = useNavigate()

    const handleEnterAuction = () => {
        if (userAuthenticated) {
            localStorage.setItem('auction-room-id', id);
            if (live) {
                // If it's a live auction, perform actions for entering the auction
                navigate('/auction');
            } else {
                // If it's not a live auction, perform actions for registering
                // Add your registration logic here
                message.success("Registered for the auction");
            }
        } else {
            // If the user is not authenticated, open the authentication modal
            setAuthModalOpen(true);
        }
    };

    return (
        <div>
            <div className={`absolute w-[240px] h-[400px] ${live ? 'border-[#52C41A] border-[3px] animate-pulse' : ''}   rounded-xl`} />
            <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                className={`w-[240px] h-[400px] ${live ? ' border-[3px]' : ''}   rounded-xl`}
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
                        weekday: 'short',
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
                    <div className="text-[#096DD9] primary-7">Opening Bid: {openingBidAmount}</div>
                    <div className="w-full flex justify-center items-center">
                        <Button type="primary" className="bg-[#1890FF] primary-6 px-5 rounded-lg" onClick={handleEnterAuction}>{live ? "Enter" : "Register"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;