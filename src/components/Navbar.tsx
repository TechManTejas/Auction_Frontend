import { Button } from "antd"

export default function UserNavbar() {

    const token = false;

    return (
        <div className='flex justify-between items-center w-full text-xl p-3'>
            <div className='font-bold'>
                AUCTION
            </div>
            <div className='flex items-center space-x-3'>
                {
                    token ? <div className='flex items-center space-x-2'>
                        <div className="bg-sky-400 h-7 w-7 rounded-full" />
                        <div>
                            Tejas Vaij
                        </div>
                    </div> : <div className="flex items-center space-x-2">
                        <div>
                            <Button size={"small"} className="rounded-none bg-[#1677ff] text-white ">Log in</Button>
                        </div>
                        <div>
                            <Button size={"small"} className="rounded-none border-[1.5px]">Register</Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
