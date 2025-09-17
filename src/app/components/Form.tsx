'use client';
import React from 'react';
import { useState } from 'react';
import { formDataSchema } from '../lib/validate';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormData } from '../context/FormDataContext';

const Form = () => {
    const { formData, setFormData } = useFormData();
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const router = useRouter();

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = formDataSchema.safeParse(formData);
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
        }
        setErrors({});
        console.log('Form submitted', formData);
    };

    const viewPDF = () => {
        // Function to handle PDF viewing
        router.push('/viewpdf');
    };
    const downloadPDF = () => {
        // Function to handle PDF download
    };
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <form onSubmit={onSubmit} className="w-[50vw] flex flex-col gap-4">
                <h2>Add your Details</h2>
                <div>
                    <label htmlFor="name" className="text-md">
                        Name
                    </label>
                    <div className="bg-white flex justify-start items-center gap-4 border border-gray-300 rounded-xl px-3 py-3 shadow-sm">
                        <User size={16} />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter name"
                            onChange={(e) => onChange(e)}
                            className="outline-none"
                            required
                        />
                    </div>
                </div>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={(e) => onChange(e)}
                />
                <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Enter phone number"
                    onChange={(e) => onChange(e)}
                />
                <input
                    id="position"
                    type="text"
                    name="position"
                    value={formData.position}
                    placeholder="Enter position"
                    onChange={(e) => onChange(e)}
                />
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    placeholder="Enter description"
                    onChange={(e) => onChange(e)}
                />
                <div className="flex gap-4">
                    <button onClick={viewPDF}>View PDF</button>
                    <button onClick={downloadPDF}>Download PDF</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
