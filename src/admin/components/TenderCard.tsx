import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface TenderCardProps {
    id: string;
    title: string;
    description: string;
    estCost: number;
    timeToComplete: string;
    city: string;
    bidEndsOn: string;
    modifyable?: boolean;
    handleDeleteConfirmation?: (id: string) => void;
    handleEditCoupon?: (id: string) => void;
}

const TenderCard: React.FC<TenderCardProps> = ({ id, title, description, estCost, timeToComplete, city, bidEndsOn, handleDeleteConfirmation, handleEditCoupon }) => {

    console.log(description)

    const navigate = useNavigate()

    return (
        <div>
            <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                className={`w-[300px] h-[344px] rounded-xl`}
            >
                <div className="p-6 space-y-3.5">
                    <div className="text-xl h-20 font-semibold overflow-hidden overflow-ellipsis line-clamp-3">{title}</div>
                    {/* <div className="text-sm h-40 overflow-hidden overflow-ellipsis whitespace-normal">{description}</div> */}
                    <div><span className="text-[#096DD9] primary-7">City: </span>{city}</div>
                    <div><span className="text-[#096DD9] primary-7">Esimated Cost: </span>{estCost}</div>
                    <div className="h-10"><span className="text-[#096DD9] primary-7">Time to Complete: </span>{timeToComplete}</div>
                    <div className="w-full p-2 text-[#ff0808] text-xs daybreakblue-10 bg-[#ffd1d1] space-x-1 rounded-md">
                        <span className="text-[#000000] font-semibold primary-7">Ends on:</span>
                        <span className="text-[#ff0606] font-semibold primary-7">
                            {new Date(bidEndsOn).toLocaleString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </div>
                    {
                        true &&
                        <div className="w-full flex justify-between items-center">
                            <Button className="bg-yellow-500 primary-6 text-white px-5 rounded-lg" onClick={() => {
                                localStorage.setItem("selected-tender-id", id)
                                localStorage.setItem("selected-tender-title", title)
                                navigate('/admin/tenders-submissions', {
                                    state: {
                                        tenderId: id,
                                        tenderTitle: title
                                    }
                                })
                            }}>View Submissions</Button>
                            {handleEditCoupon &&
                                <Button
                                    icon={<EditOutlined />}
                                    type="primary"
                                    className="bg-[#1890FF] primary-6 text-white px-5 rounded-lg"
                                    onClick={() => {
                                        if (handleEditCoupon) {
                                            handleEditCoupon(id)
                                        }
                                    }} />
                            }
                            {handleDeleteConfirmation &&
                                <Button
                                    className="bg-[#ff1818] primary-6 text-white px-5 rounded-lg"
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                        if (handleDeleteConfirmation) {
                                            handleDeleteConfirmation(id)
                                        }
                                    }} />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default TenderCard;
