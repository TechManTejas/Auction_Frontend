import { Button, message } from "antd"
import Placeholder from "../assets/images/placeholder.png"
import axios from "../api/axios"
import { useEffect, useState } from "react";
import { IAuction } from "../types/auction.types";
import { io } from "socket.io-client";
import { formatTimeRemaining } from "../utils/TimeFormatter";
import { useNavigate } from "react-router-dom";

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
      setAuction({
        ...response.data,
        raise_options: JSON.parse(response.data.raise_options)
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
    <div className="bg-[#EDF5FF] p-10 space-y-10">
      <div className="flex justify-center">
        <div className="border">
          <img src={auction?.image || Placeholder} className="w-[500px] h-72 object-contain" />
        </div>
        <div className="p-5 space-y-2 w-[600px]">
          <div className='text-4xl font-medium text-[#002766]'>
            {auction?.title}
          </div>
          <div>
            {auction?.description}
          </div>
        </div>
      </div>

      <div className="space-y-6 border-[4px] py-10 border-[#52C41A]">
        {/* Display winner and winnerBidAmount */}
        {liveAuctionDetails && (
          <div className="text-center space-y-2">
            <div className="text-4xl font-medium text-[#002766]">
              Winner: {liveAuctionDetails.winnerName || "'No one started yet'"}
            </div>
            <div className="text-4xl font-medium text-[#002766]">
              Winning Bid Amount: ${liveAuctionDetails.winnerBidAmount}
            </div>
            <div className="text-white bg-[#52C41A] success font-semibold px-2 rounded-t-sm animate-pulse text-center">
            LIVE
          </div>
          </div>
        )}
        <div className="text-center ">
          <span className="text-4xl font-medium text-[#002766]">Auction ends in:- </span>
          {timeRemaining !== null ? (
            <span className="text-4xl font-medium text-red-600">{formatTimeRemaining(timeRemaining)}</span>
          ) : (
            <span className="text-4xl font-medium text-red-600">Loading...</span>
          )}
        </div>
        <div className="space-y-8">
          <div className="text-center font-medium text-xl">
            Raise options
          </div>
          <div className="flex justify-center gap-16">
            <Button onClick={() => {
              handlePlaceBid('1')
            }} type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                `+ $${auction.raise_options['1'] as string}`
              ) : (
                'Loading...'
              )}
            </Button>

            <Button onClick={() => {
              handlePlaceBid('2')
            }} type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                `+ $${auction.raise_options['2'] as string}`
              ) : (
                'Loading...'
              )}
            </Button>
          </div>
          <div className="flex justify-center gap-16">
            <Button onClick={() => {
              handlePlaceBid('3')
            }} type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                `+ $${auction.raise_options['3'] as string}`
              ) : (
                'Loading...'
              )}
            </Button>
            <Button onClick={() => {
              handlePlaceBid('4')
            }} type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              {auction?.raise_options && auction.raise_options['1'] !== undefined ? (
                `+ $${auction.raise_options['4'] as string}`
              ) : (
                'Loading...'
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-red-600 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin. Quisque non consectetur massa, in congue libero.
      </div>
    </div>
  )
}