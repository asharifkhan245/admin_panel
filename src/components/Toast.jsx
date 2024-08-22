import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Toast = () => {
    return <Toaster />;
};

export const showToast = (message, type) => {
    toast(message, {
        duration: 4000,
        position: 'top-center',
        icon: type === 'success' ? '✅' : '❌',
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};

export default Toast;
