import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileLogo from './ProfileLogo';
import { useNavigate } from 'react-router-dom';







export default function UserDropdown({ user }) {


    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('user');
        navigate("/");


    }



    return (
        <Menu as="div" className="relative inline-block text-left" >
            <div>
                <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-gray-900 ">
                    <div className="flex flex-col m-1">
                        <span className="text-black font-semibold text-md">{user ? user.name : 'Joe'}</span>
                        <span className="text-gray-400 font-normal text-xs text-start">Admin</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <ProfileLogo />
                        <RiArrowDropDownLine className="h-5 w-5 text-gray-400" />
                    </div>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Account settings
                        </a>
                    </MenuItem>

                    <form action="#" method="POST">
                        <MenuItem>
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                onClick={handleLogout}
                            >
                                Sign out
                            </button>
                        </MenuItem>
                    </form>
                </div>
            </MenuItems>
        </Menu>
    )
}
