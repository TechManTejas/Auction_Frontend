import { Button } from "antd"
import Bike from "../assets/images/bike.gif"

export default function AuctionCard({ live = false }) {

    return (
        <div>
            <div className={`absolute w-[300px] h-[460px] ${live ? 'border-[#52C41A] border-[3px] animate-pulse' : ''}   rounded-xl`}/>
            <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                className={`w-[300px] h-[460px] ${live ? ' border-[3px]' : ''}   rounded-xl`}
            >
                {live && <>
                    <div className="w-full flex justify-center items-center -mt-6">
                        <div className="text-white bg-[#52C41A] success font-semibold px-2 rounded-t-sm animate-pulse">
                            LIVE
                        </div>
                    </div>
                </>}
                <div className="w-full flex justify-center items-center p-2 text-[#002766] daybreakblue-10">
                    23rd November 10:00 am
                </div>
                <div>
                    <img src={Bike} className="object-cover" />
                </div>
                <div className="p-6 space-y-3.5">
                    <div className="font-semibold overflow-hidden overflow-ellipsis line-clamp-1">Vue JS is good but why learn when you know react</div>
                    <div className="text-sm h-20 overflow-hidden overflow-ellipsis whitespace-normal line-clamp-4">
                        Eleifend ultricies nam mauris non facilisis. Eleifend ultricies nam mauris non facilisis. Eleifend ultricies nam mauris non facilisis.
                    </div>
                    <div className="text-[#096DD9] primary-7">Opening Bid: $100</div>
                    <div className="w-full flex justify-center items-center">
                        <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">
                            {live ? "Enter" : "Register"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
