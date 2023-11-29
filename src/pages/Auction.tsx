import { Button } from "antd"
import Placeholder from "../assets/images/placeholder.png"

export default function Auction() {
  return (
    <div className="bg-[#EDF5FF] p-10 space-y-10">
      <div className="flex justify-center">
        <div>
          <img src={Placeholder} className="w-[500px] h-72"/>
        </div>
        <div className="p-5 space-y-2 w-[600px]">
          <div className='text-4xl font-medium text-[#002766]'>
            Title
          </div>
          <div className="">
            Description Descriptio nDescriptionDescriptionDes criptionDescri ptionDescript ionDescriptionDescripti onDescriptionDescriptionDescripti onDescriptio nDescriptionDescriptionDescripti onDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescripti onDescriptionDescriptionDescriptionDescript ionDescriptionDescriptionDescription
          </div>
        </div>
      </div>

      <div className="space-y-6 border-[4px] py-10 border-[#52C41A]">
        <div className="space-y-2">
          <div className="text-4xl font-medium text-center text-[#002766]">
            Current Bid Amount : $1000
          </div>
          <div className="text-4xl font-medium text-center">
            - Tejas Vaij
          </div>
          <div className="text-white bg-[#52C41A] success font-semibold px-2 rounded-t-sm animate-pulse text-center">
            LIVE
          </div>
        </div>
        <div className="text-center ">
          <span className="text-4xl font-medium text-[#002766]">Auction ends in:- </span>
          <span className="text-4xl font-medium text-red-600">14 mins 20 seconds</span>
        </div>
        <div className="space-y-8">
          <div className="text-center font-medium text-xl">
            Raise options
          </div>
          <div className="flex justify-center gap-16">
            <Button type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              + $100
            </Button>
            <Button type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              + $100
            </Button>
          </div>
          <div className="flex justify-center gap-16">
            <Button type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              + $100
            </Button>
            <Button type="primary" className="bg-[#1890FF] primary-6 text-white font-medium text-2xl h-10 w-40">
              + $100
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
