import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import Toast, { showToast } from '../components/Toast';
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import ViewModal from '../components/ViewModal';
import { Toaster } from 'react-hot-toast';



const Table = () => {
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);

    const [edit, SetEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    const [Viewmodal, setViewModal] = useState(false);
    const [viewModalData, setViewModalData] = useState(null);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);

        SetEdit(false);
        setEditData(null);
        setViewModal(false);
    };

    const getEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-employees');
            setEmployees(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/delete-employe/${id}`);
            showToast('Employee deleted successfully!', 'success');
            getEmployees();
        } catch (error) {
            console.log(error);
            showToast('Failed to delete employee.', 'error');
        }
    };

    const handleEdit = (employee) => {
        setEditData(employee);
        SetEdit(true);
        setShowModal(true);
    };

    const handleView = (employe) => {

        setViewModal(true);
        setViewModalData(employe);
    }

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <>
            <section className="mx-auto lg:w-full max-w-7x2 px-4 py-4 overflow-hidden">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Employees</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all employees. You can add new employees, edit or
                            delete existing ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={handleShow}
                        >
                            Add new employee
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                <span>Employee</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">

                                        {employees && Object.values(employees).length > 0 ? (
                                            Object.values(employees).map((data, key) => (
                                                <tr key={key}>
                                                    <td className="whitespace-nowrap px-4 py-4 ">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 ">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={data.profile_image}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 ">
                                                                    {data.name}
                                                                </div>
                                                                <div className="text-sm text-gray-700">{data.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900">{data.title}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            {data.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                        {data.role}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium flex">
                                                        <MdDeleteOutline onClick={() => handleDelete(data.id)} className='text-gray-700 text-4xl hover:bg-gray-100 py-2 px-2 rounded-full transition ease-in cursor-pointer' />
                                                        <BiEdit onClick={() => handleEdit(data)} className='text-gray-700 text-4xl hover:bg-gray-100 py-2 px-2 rounded-full transition ease-in cursor-pointer' />
                                                        <FaRegEye onClick={() => handleView(data)} className='text-gray-700 text-4xl hover:bg-gray-100 py-2 px-2 rounded-full transition ease-in cursor-pointer' />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="whitespace-nowrap px-4 py-4 text-center text-gray-700">
                                                    No employees found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center pt-6">
                    <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
                        <span className="hidden lg:block">&larr; Previous</span>
                        <span className="block lg:hidden">&larr;</span>
                    </a>
                    <a
                        href="#"
                        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                    >
                        4
                    </a>
                    <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
                        <span className="hidden lg:block">Next &rarr;</span>
                        <span className="block lg:hidden">&rarr;</span>
                    </a>
                </div>

            </section>

            <Modal showModal={showModal} handleClose={handleClose} getEmployees={getEmployees} setShowModal={setShowModal} edit={edit} SetEdit={SetEdit} editData={editData} />
            <ViewModal Viewmodal={Viewmodal} handleClose={handleClose} viewModalData={viewModalData} />
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                }}
            />

        </>
    );
};

export default Table;
