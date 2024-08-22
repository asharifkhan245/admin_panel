import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import ViewModal from '../components/ViewModal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ProductTable = () => {
    const [modal, setShowmodal] = useState(false);
    const [products, setProducts] = useState([]);
    const [showedit, setshowedit] = useState(false);
    const [showEditData, setShowEditData] = useState(null);

    const handleShow = () => {
        setShowEditData(null);  // Clear any previous data
        setshowedit(false);      // Ensure showedit is false for adding a new product
        setShowmodal(true);
    }

    const handleClose = () => {
        setShowmodal(false);
        setshowedit(false);
    }

    const getProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/delete-product/${id}`);
            toast.success("Deleted Successfully");
            getProducts();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete products.', 'error');
        }
    };

    const handleEdit = (product) => {
        setShowEditData(product);
        setshowedit(true);   
        setShowmodal(true);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4 overflow-hidden">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Products</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all products. You can add new products, edit or
                            delete existing ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={handleShow}
                        >
                            Add new product
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
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Product Name
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Description
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Price
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {products && Object.values(products).length > 0 ? (
                                            Object.values(products).map((data, key) => (
                                                <tr key={key}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={data.image}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {data.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900">{data.description}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900">{data.quantity}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900">${data.price}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Active
                                                        </span>
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
                                                <td colSpan="6" className="whitespace-nowrap px-4 py-4 text-center text-gray-700">
                                                    No Products found
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


            <Modal modal={modal} handleClose={handleClose} getProducts={getProducts} showEditData={showEditData} showedit={showedit} />
            <ViewModal />
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

export default ProductTable;
