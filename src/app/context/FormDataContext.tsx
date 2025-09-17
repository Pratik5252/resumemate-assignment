'use client';
import React, { createContext, useContext, useState } from 'react';
import type { FormData } from '../lib/validate';

const FormDataContext = createContext<{
    formData: FormData;
    setFormData: (data: FormData) => void;
} | null>(null);

export const FormDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phoneNumber: '',
        position: '',
        description: '',
    });

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (!context)
        throw new Error('useFormData must be used within a FormDataProvider');
    return context;
};
