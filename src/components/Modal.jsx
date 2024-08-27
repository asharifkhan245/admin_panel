import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { editEmployee, registerEmployee } from '../store/UserSlice';

const Modal = ({ showModal, handleClose, getEmployees, edit, editData, modal, getProducts, showEditData, showedit }) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        role: '',
        title: '',
        profile_image: '',
        description: '',
        quantity: '',
        price: '',
        image: '',
        category: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (edit || showedit) {
            setFormData(showedit ? showEditData : editData);
        } else {
            setFormData(initialFormData);
        }
    }, [edit, editData, showedit, showEditData, modal]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };


    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            for (const key in formData) {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            }


            if (edit || showedit) {
                const url = modal
                    ? `http://127.0.0.1:8000/api/edit-product/${showEditData.id}`
                    : dispatch(editEmployee(editData.id));
                await axios.post(url, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success(modal ? 'Product updated successfully!' : 'Employee updated successfully!');

            } else {

                const response = await dispatch(registerEmployee(data));
                if (response) {
                    toast.success("Employee added successfully");
                } else {
                    toast.error("something went wrong");
                }


            }



            // if (edit || showedit) {
            //     const url = modal
            //         ? `http://127.0.0.1:8000/api/edit-product/${showEditData.id}`
            //         : `http://127.0.0.1:8000/api/edit-employee/${editData.id}`;
            //     await axios.post(url, data, {
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //     });
            //     toast.success(modal ? 'Product updated successfully!' : 'Employee updated successfully!');
            // } else {
            //     const url = modal
            //         ? 'http://127.0.0.1:8000/api/add-product'
            //         : 'http://127.0.0.1:8000/api/add-employee';
            //     await axios.post(url, data, {
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //     });
            //     toast.success(modal ? 'Product added successfully!' : 'Employee added successfully!');
            // }







            modal ? getProducts() : getEmployees();
            handleClose();
            setFormData(initialFormData);
        } catch (error) {
            console.log(error);
            toast.error('Server side error');
        }
    };


    return (
        <>
            {showModal || modal ? (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
                        <h3 className="text-lg ml-4 font-semibold">
                            {showedit ? 'Update Product' : modal ? 'Add Product' : edit ? 'Edit Employee' : 'Add Employee'}
                        </h3>
                        <form className="p-2" onSubmit={handleSubmit}>
                            {modal ? (
                                <>
                                    <Input
                                        type="text"
                                        placeholder="Product Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Product Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Product Quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Product Price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Product Category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="file"
                                        name="profile_image"
                                        onChange={handleChange}
                                    />
                                    <div className="flex mb-1">
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="flex h-10 w-48 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 m-2"
                                        >
                                            <option value="">Choose role</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Graphics">Graphics</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            <button className="btn bg-black text-white rounded-md px-5 py-1 mt-1 text-sm ml-2">
                                {edit || showedit ? 'Update' : 'Submit'}
                            </button>
                        </form>
                        <div className="modal-action">
                            <button
                                className="btn bg-black text-white rounded-md px-5 py-1 mt-1 text-sm"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName=""
                        containerStyle={{}}
                        toastOptions={{
                            duration: 3000,
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
                </div>
            ) : null}
        </>
    );
};

export default Modal;
