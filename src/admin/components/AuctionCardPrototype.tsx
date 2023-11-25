import React from "react";
import { Button } from "antd";
import Placeholder from "../../assets/images/placeholder.png";

interface AuctionCardProps {
    live?: boolean;
    startAt: string;
    title: string;
    description: string;
    openingBidAmount: string;
    image: string,
}

const AuctionCard: React.FC<AuctionCardProps> = ({ live = false, startAt, title, description, openingBidAmount, image = Placeholder }) => {
    return (
        <div>
            <div className={`absolute w-[300px] h-[460px] ${live ? 'border-[#52C41A] border-[3px] animate-pulse' : ''}   rounded-xl`} />
            <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                className={`w-[300px] h-[460px] ${live ? ' border-[3px]' : ''}   rounded-xl`}
            >
                {live && (
                    <div className="w-full flex justify-center items-center -mt-6">
                        <div className="text-white bg-[#52C41A] success font-semibold px-2 rounded-t-sm animate-pulse">
                            LIVE
                        </div>
                    </div>
                )}
                <div className="w-full flex justify-center items-center p-2 text-[#002766] daybreakblue-10">
                    {new Date(startAt).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </div>
                <div>
                    <img src={image} className="object-cover w-full h-44" alt="Auction Item" />
                </div>
                <div className="p-6 space-y-3.5">
                    <div className="font-semibold overflow-hidden overflow-ellipsis whitespace-normal line-clamp-1">{title}</div>
                    <div className="text-sm h-20 overflow-hidden overflow-ellipsis whitespace-normal line-clamp-4">{description}</div>
                    <div className="text-[#096DD9] primary-7">Opening Bid: {openingBidAmount}</div>
                    <div className="w-full flex justify-center items-center">
                        <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;
