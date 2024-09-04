import React from 'react';
import DisableInput from './DisableInput';

const ViewModal = ({ Viewmodal, handleClose, viewModalData, viewProductModal, viewProductModalData }) => {
    const isEmployeeModal = Viewmodal;
    const data = isEmployeeModal ? viewModalData : viewProductModalData;
    const title = isEmployeeModal ? "Employee Details" : "Product Details";

    return (
        <>
            {(Viewmodal || viewProductModal) && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
                        <h3 className="text-xl ml-4 font-semibold mb-3">
                            {title}
                        </h3>

                        <div className='flex flex-wrap gap-2 justify-around'>
                            {Object.keys(data).map((key, index) => (
                                <div key={index} className='flex-1 min-w-[200px]'>
                                    <DisableInput data={data[key]} />
                                </div>
                            ))}
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn bg-black text-white rounded-md px-5 py-1 mt-1 text-sm"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewModal;
