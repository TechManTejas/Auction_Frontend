import { Button, message } from "antd"
import Placeholder from "../assets/images/placeholder.png"
import axios from "../api/axios"
import { useEffect, useState } from "react";
import { IAuction } from "../types/auction.types";
import { io } from "socket.io-client";
import { formatTimeRemaining } from "../utils/TimeFormatter";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";

interface LiveAuctionDetails {
  // Define the structure of your auction data
  auctionId: string;
  title: string;
  description: string;
  openingBidAmount: number;
  winnerName: string;
  winnerBidAmount: number;
  // Add other relevant auction information as needed
}

export default function Auction() {

  const socket = io(import.meta.env.VITE_BASE_URL);

  const navigate = useNavigate()
  const [auction, setAuction] = useState<IAuction | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [liveAuctionDetails, setLiveAuctionDetails] = useState<LiveAuctionDetails | null>(null);

  const room_id = localStorage.getItem("auction-room-id")
  const bidder_id = localStorage.getItem('auction-user-token');
  const bidder_name = localStorage.getItem('auction-user-name');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/auctions/${room_id}/`);
      console.log(response.data.auction)
      setAuction({
        ...response.data.auction,
        raise_options: JSON.parse(response.data.auction.raise_options)
      })
    } catch (error) {
      console.error('Error fetching auction data:', error);
    }
  };

  const handlePlaceBid = (raiseOptionId: string) => {
    // Emit a bid event to the socket
    socket.emit("placeBid", {
      auctionId: room_id,
      bidderId: bidder_id,
      raiseOptionId,
    });
  };

  useEffect(() => {

    fetchData()

    // Emit the 'joinAuction' event when the component mounts to join the auction room
    socket.emit("joinAuction", {
      auctionId: room_id,
      bidder_id: bidder_id,
      bidder_name: bidder_name
    });

    // Listen for updates from the server
    socket.on("initialAuctionInfo", (initialAuctionData) => {
      console.log("Initial Auction Data:", initialAuctionData);
      // Handle the received data as needed
      setLiveAuctionDetails(initialAuctionData);
    });

    // Listen for updates from the server
    socket.on("updateTime", (data) => {
      console.log("Time remaining:", data.timeRemaining);
      // Update your UI with the remaining time
      setTimeRemaining(data.timeRemaining);
    });

    // Listen for updates from the server
    socket.on("updateBids", (data) => {
      console.log(data)
      setLiveAuctionDetails(data)
    });

    socket.on("auctionEnd", () => {
      message.info("Auction has ended");
      navigate('/result')
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [])


  return (
    <div className=" space-y-10">
      {/* <div className="flex justify-center p-4">
        <div className="border rounded-xl">
          <img src={`${import.meta.env.VITE_BASE_URL}${auction?.image}` || Placeholder} className="w-[500px] h-72 object-cover rounded-xl" />
        </div>
        <div className="px-10 space-y-2 w-[600px]">
          <div className='text-4xl font-medium text-[#002766]'>
            {auction?.title}
          </div>
          <div>
            {auction?.description}
          </div>
        </div>
      </div> */}

      <div className="rounded-t-[48px] px-4 flex" style={{
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
      }}>
        <div className="p-4 flex flex-1">
          <div>
            <div className="border rounded-xl">
              <img src={`${import.meta.env.VITE_BASE_URL}${auction?.image}` || Placeholder} className="object-cover rounded-xl" />
            </div>
            <div className="px-10 space-y-2 ">
              <div className='text-4xl font-medium text-[#002766]'>
                {auction?.title}
              </div>
              <div>
                {auction?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 py-10 flex flex-col flex-shrink-0 justify-center items-center">
          <div className="text-white -mt-10 rounded-b-lg text-xl bg-[#52C41A] success font-semibold px-2 animate-pulse w-24 h-10 items-center flex justify-center">
            LIVE
          </div>
          {/* Display winner and winnerBidAmount */}
          <div className="flex justify-evenly w-full">
            {liveAuctionDetails && (
              <div className="border-2 border-blue-400 flex items-center justify-around rounded-l-xl px-4 py-2 w-80 h-20">
                <div className="m-2 text-2xl">
                  <UserOutlined />
                </div>
                <div className="">
                  <div className="text-sm font-light">
                    Current Highest Bidder
                  </div>
                  <div className="font-medium text-2xl">
                    {liveAuctionDetails.winnerName || "'No one started yet'"}
                  </div>
                </div>
              </div>
            )}
            {liveAuctionDetails && (
              <div className="border-2 border-blue-400 flex items-center justify-around px-4 py-2 w-80 h-20">
                <div className="m-2 text-2xl">
                  <WalletOutlined />
                </div>
                <div className="">
                  <div className="text-sm font-light">
                    Current Bid Amount
                  </div>
                  <div className="font-medium text-2xl">
                    {liveAuctionDetails.winnerBidAmount || "'No one started yet'"}
                  </div>
                </div>
              </div>
            )}
            {liveAuctionDetails && (
              <div className="border-2 border-blue-400 flex items-center justify-around rounded-r-xl px-4 py-2 w-80 h-20">
                <div className="m-2 text-2xl">
                  <ClockCircleOutlined />
                </div>
                <div className="">
                  <div className="text-sm font-light">
                    Auction ends in
                  </div>
                  <div className="font-medium text-lg">
                    {timeRemaining !== null ? (
                      <span className="text-red-600">{formatTimeRemaining(timeRemaining)}</span>
                    ) : (
                      <span className="text-red-600">Loading...</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-8 w-full">
            <div className="font-light text-gray-500 text-xl flex justify-center items-center w-full">
              <div className="border w-full" />
              <div className="w-48 text-center">
                Raise bid
              </div>
              <div className="border w-full" />
            </div>
            <div className="flex justify-center gap-20">
              <Button onClick={() => {
                handlePlaceBid('1')
              }} type="primary" className="bg-[#1890FF] primary-6 text-white font-semibold shadow-2xl text-3xl h-12 w-60">
                {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                  `+ ₹${auction.raise_options['1'] as string}`
                ) : (
                  'Loading...'
                )}
              </Button>

              <Button onClick={() => {
                handlePlaceBid('2')
              }} type="primary" className="bg-[#1890FF] primary-6 text-white font-semibold shadow-2xl text-3xl h-12 w-60">
                {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                  `+ ₹${auction.raise_options['2'] as string}`
                ) : (
                  'Loading...'
                )}
              </Button>
            </div>
            <div className="flex justify-center gap-20">
              <Button onClick={() => {
                handlePlaceBid('3')
              }} type="primary" className="bg-[#1890FF] primary-6 text-white font-semibold shadow-2xl text-3xl h-12 w-60">
                {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                  `+ ₹${auction.raise_options['3'] as string}`
                ) : (
                  'Loading...'
                )}
              </Button>
              <Button onClick={() => {
                handlePlaceBid('4')
              }} type="primary" className="bg-[#1890FF] primary-6 text-white font-semibold shadow-2xl text-3xl h-12 w-60">
                {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                  `+ ₹${auction.raise_options['4'] as string}`
                ) : (
                  'Loading...'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* <div className="">
            <span className="text-4xl font-medium text-[#002766]">Auction ends in:- </span>
            {timeRemaining !== null ? (
              <span className="text-4xl font-medium text-red-600">{formatTimeRemaining(timeRemaining)}</span>
            ) : (
              <span className="text-4xl font-medium text-red-600">Loading...</span>
            )}
          </div> */}