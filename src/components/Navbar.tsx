import { Button, Modal, message } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Autentication from "./Autentication";

interface UserNavbarProps {
    userAuthenticated: boolean;
    setUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ userAuthenticated, setUserAuthenticated }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultTab, setDefaultTab] = useState('1')

    useEffect(() => {
        if (userAuthenticated) {
            setUsername(localStorage.getItem('auction-user-name'));
        }
    }, [userAuthenticated])

    const handleLogout = () => {
        localStorage.removeItem('auction-user-token');
        localStorage.removeItem('auction-user-name');

        setUserAuthenticated(false);
        message.success("User logged out successfully")

        navigate('/');
    };

    return (
        <>
            <Modal closable={false} open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
                <Autentication defaultTab={defaultTab}/>
            </Modal>
            <div className='flex justify-between items-center w-full text-xl p-3'>
                <div className='font-bold'>
                    AUCTION
                </div>
                <div className='flex items-center space-x-3'>
                    {
                        userAuthenticated ? <div className='flex items-center space-x-2'>
                            <div>
                                {username}
                            </div>
                            <div>
                                <Button onClick={handleLogout} size={"small"} className="rounded-none border-[1.5px]">Logout</Button>
                            </div>
                        </div> : <div className="flex items-center space-x-2">
                            <div>
                                <Button onClick={() => {
                                    setDefaultTab('1')
                                    setIsModalOpen(true)
                                }} size={"small"} className="rounded-none bg-[#1677ff] text-white ">Log in</Button>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    setDefaultTab('2')
                                    setIsModalOpen(true)
                                }} size={"small"} className="rounded-none border-[1.5px]">Register</Button>
                            </div>
                        </div>
                    }
                    <div>
                        <Button size={"middle"} type="dashed" className="bg-red-600 text-white rounded-none border-[1.5px]" onClick={() => {
                            navigate(`/admin`);
                        }}>Admin</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserNavbar;