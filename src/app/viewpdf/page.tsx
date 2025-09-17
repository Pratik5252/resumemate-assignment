'use client';

import React from 'react';
import { useFormData } from '../context/FormDataContext';
import type { FormData } from '../lib/validate';

const Page = () => {
    const { formData }: { formData: FormData } = useFormData();
    return (
        <div>
            <div>
                <p>Name: {formData.name}</p>
                <p>Email: {formData.email}</p>
                <p>Phone Number: {formData.phoneNumber}</p>
                <p>Position: {formData.position}</p>
                <p>Description: {formData.description}</p>
            </div>
        </div>
    );
};

export default Page;
