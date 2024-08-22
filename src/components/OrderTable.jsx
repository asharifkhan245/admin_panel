import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import Toast, { showToast } from '../components/Toast';

const Table = () => {
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const getEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-employees');
            setEmployees(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        console.log(id)
        try {
            await axios.post(`http://127.0.0.1:8000/api/delete-employe/${id}`);
            showToast('Employee deleted successfully!', 'success');
            getEmployees();
        } catch (error) {
            console.log(error);
            showToast('Failed to delete employee.', 'error');
        }
    };

    useEffect(() => {
        getEmployees()
    }, [employees]);

    return (
        <>
            <section className="mx-auto w-full max-w-7x2 px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Orders</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all Orders. You can add new Orders, edit or
                            delete existing ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={handleShow}
                        >
                            Add new Order
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
                                                <span>Order no</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Customer name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                            Product Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                status
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
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
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
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                                        <button
                                                            className="text-gray-700 lg:hover:bg-warning py-2 px-2 rounded-md transition"
                                                            onClick={() => handleDelete(data.id)}
                                                        >
                                                            Delete
                                                        </button>
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
            </section>

            <Modal showModal={showModal} handleClose={handleClose} getEmployees={getEmployees} />
            <Toast />
        </>
    );
};

export default Table;
