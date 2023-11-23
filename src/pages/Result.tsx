import { Result, Button } from "antd"
import AuctionCard from '../components/AuctionCard'

export default function Results() {

    const result = false;

    return (
        <div className="bg-[#EDF5FF]">
            {result ?
                <div className="h-[600px] flex flex-col justify-center items-center">
                    <Result
                        status="success"
                        title="Successfully Purchased Cloud Server ECS!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        extra={[
                            <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">
                                Proceed to Payment
                            </Button>
                        ]}
                    />
                </div> : <div>
                    <Result
                        status="error"
                        title="Submission Failed"
                        subTitle="Please check and modify the following information before resubmitting."
                        extra={[
                            <Button className="bg-[#1890FF] primary-6 text-white px-5 rounded-sm">
                                Go Home
                            </Button>
                        ]}
                    />
                    <div className='text-4xl font-medium text-center text-[#002766] mb-20'>
                        Oops.. lost the bid? No worries we have some more for you
                    </div>
                    <div className='flex w-full justify-center space-x-32 my-10'>
                        <AuctionCard live />
                        <AuctionCard live />
                        <AuctionCard live />
                    </div>
                </div>
            }

        </div>
    )
}
