import { Carousel, Tabs, Pagination, Modal } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
// import AuctionCard from '../components/AuctionCard';
import { useEffect, useState } from 'react';
import Autentication from '../components/Autentication';
import { IAuction } from '../types/auction.types';
import axios from "../api/axios"
import AuctionCard from '../components/AuctionCard';
const { TabPane } = Tabs;


export default function Home() {

  const contentStyle: React.CSSProperties = {
    height: '260px',
    color: '#fff',
    lineHeight: '260px',
    textAlign: 'center',
    background: '#40A9FF', //primary-5
  };

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [auctions, setAuctions] = useState<IAuction[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/auctions'); // Replace with your API endpoint
      console.log(response.data)
      setAuctions(response.data.auctions);
    } catch (error) {
      console.error('Error fetching auction data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Modal closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
        <Autentication />
      </Modal>
      <div className='bg-[#EDF5FF] px-10'>
        <div className='space-y-2 py-5'>
          <div className='text-4xl font-medium text-center text-[#002766]'>
            Auction Anything Anytime
          </div>
          <div className='text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin. Quisque non consectetur massa, in congue libero.
          </div>
        </div>
        <div className=''>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className='space-y-2 py-5'>
          <div className='text-4xl font-medium text-center text-[#002766]'>
            Auctions
          </div>
          <div className='text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin.
          </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full'>
          <div className='m-4'>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              onChange={() => { }}
            >
              <TabPane tab={<span><PlayCircleOutlined /> Active</span>} key="1" />
              <TabPane tab={<span><ClockCircleOutlined /> Upcoming</span>} key="2" />
            </Tabs >
          </div>
          <div className='flex space-x-32 my-4'>
            {auctions
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
                  openingBidAmount={`$${auction.opening_bid_amount}`}
                />
              ))}
          </div>
          <div className='m-4'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  )
}
