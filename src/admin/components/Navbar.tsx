export default function AdminNavbar() {

  return (
    <div className='flex justify-between items-center w-full text-xl p-3 bg-[#EDF5FF]'>
      <div className='font-bold'>
        AUCTION ADMIN
      </div>
      <div className='flex items-center space-x-3'>
        <div className='flex items-center space-x-2'>
          <div className="bg-sky-400 h-7 w-7 rounded-full" />
          <div>
            Tejas Vaij
          </div>
        </div>
      </div>
    </div>
  )
}
