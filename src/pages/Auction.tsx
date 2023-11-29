import Placeholder from "../assets/images/placeholder.png"

export default function Auction() {
  return (
    <div className="bg-[#EDF5FF] p-10">
      <div className="flex">
        <div>
          <img src={Placeholder}/>
        </div>
        <div>
          <div className='text-4xl font-medium text-[#002766]'>
            Title
          </div>
          <div>
            Description
          </div>
        </div>
      </div>

      <div>
        <div className="">
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
        <div>
          <div>
            Raise options
          </div>
          <div>
            <div>
              + $100
            </div>
            <div>
              + $100
            </div>
            <div>
              + $100
            </div>
            <div>
              + $100
            </div>
          </div>
        </div>
      </div>

      <div className="text-red-600 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere gravida sapien at sollicitudin. Quisque non consectetur massa, in congue libero.
      </div>
    </div>
  )
}
