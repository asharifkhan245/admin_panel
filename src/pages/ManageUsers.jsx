import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import { AiOutlineMenu } from 'react-icons/ai';
const ManageUsers = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768); 
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <>
          <div className="flex min-h-screen lg:w-full">
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'} md:block md:w-64`}>
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col sm:ml-2 ">
                <button
                    className="md:hidden block mb-4 text-xl z-30 pl-2 pr-2 pt-3 px-2"  // Added padding-left and padding-right
                    onClick={toggleSidebar}
                >
                    <AiOutlineMenu />
                </button>
                <Table />
            </div>
        </div>
        </>
    )
}

export default ManageUsers