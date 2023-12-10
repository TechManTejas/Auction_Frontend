import { Button, message } from "antd";

export default function AdminNavbar() {

  const handleLogout = () => {
    localStorage.removeItem('auction-admin-token');
    localStorage.removeItem('auction-admin-role');

    message.success("Staff logged out successfully")

    window.location.href = "/admin"
  };

  return (
    <div className='flex justify-between items-center w-full text-xl p-3 bg-[#EDF5FF]'>
      <div className='font-bold'>
        AUCTION ADMIN
      </div>
      <div>
        <Button onClick={handleLogout} size={"small"} className="rounded-none border-[1.5px]">Logout</Button>
      </div>
    </div>
  )
}
