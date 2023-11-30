import { Result, Button, Spin } from "antd";
import axios from "../api/axios";
import { useState, useEffect } from "react";

export default function Results() {
  const room_id = localStorage.getItem("auction-room-id");
  const userToken = localStorage.getItem("auction-user-token");

  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(`/auctions/${room_id}`);
        const auction = response.data;

        // Check if winner_id matches the userToken
        if (auction.winner_id === userToken) {
          setResult(true);
          setLoading(false);
        } else {
          // If winner_id doesn't match, set result to false and continue fetching
          setResult(false);
          // If winner_id is empty, continue fetching
          if (!auction.winner_id) {
            setTimeout(() => {
              fetchAuction();
            }, 1000); // Adjust the delay as needed
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setLoading(false);
        // Handle error, maybe show an error message
      }
    };

    if (room_id) {
      // Start fetching the auction details
      fetchAuction();
    } else {
      // Handle the case when room_id is not available
      setLoading(false);
    }
  }, [room_id, userToken]);

  return (
    <div className="bg-[#EDF5FF]">
      {loading ? (
        // Display a loading spinner while fetching
        <div className="h-[600px] flex items-center justify-center">
          <Spin size="large" tip="Please wait fetching result..." />
        </div>
      ) : result ? (
        // Display success result
        <div className="h-[600px] flex flex-col justify-center items-center">
          <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">
                Proceed to Payment
              </Button>,
            ]}
          />
        </div>
      ) : (
        // Display error result
        <div>
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
              <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">
                Go Home
              </Button>,
            ]}
          />
          <div className="text-4xl font-medium text-center text-[#002766] mb-20">
            Oops.. lost the bid? No worries we have some more for you
          </div>
          <div className="flex w-full justify-center space-x-32 my-10">
            {/* Render your AuctionCard components here */}
          </div>
        </div>
      )}
    </div>
  );
}
