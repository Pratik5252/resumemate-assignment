'use client';
import React from 'react';
import { useState } from 'react';
import { formDataSchema, type FormData } from '../lib/validate';
import {
    BriefcaseBusiness,
    FileText,
    LucidePhoneCall,
    Mail,
    User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormData } from '../context/FormDataContext';

import DownloadPdf from './DownloadPdf';

const Form = () => {
    const { formData, setFormData } = useFormData();

    const [errors, setErrors] = useState<
        Partial<Record<keyof FormData, string>>
    >({});
    const [isloading, setIsLoading] = useState(false);
    const router = useRouter();

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: '' });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const viewPDF = async () => {
        const result = formDataSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof FormData, string>> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            console.log(errors);
            return;
        }
        try {
            setIsLoading(true);
            setErrors({});
            router.push('/viewpdf');
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white w-screen h-screen flex flex-col items-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <h2 className="text-center font-bold text-xl text-black">
                    Add your Details
                </h2>
                <div>
                    <div
                        className={`input-field ${
                            errors.name ? 'input-error' : ''
                        }`}
                    >
                        <User size={16} />
                        <div>
                            <label htmlFor="name" className="text-sm">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="eg. Jame Smith"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>
                <div>
                    <div
                        className={`input-field ${
                            errors.email ? 'input-error' : ''
                        }`}
                    >
                        <Mail size={16} />
                        <div>
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="eg. jame@example.com"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>
                <div>
                    <div
                        className={`input-field ${
                            errors.phoneNumber ? 'input-error' : ''
                        }`}
                    >
                        <LucidePhoneCall size={16} />
                        <div>
                            <label htmlFor="phoneNumber" className="text-sm">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name="phoneNumber"
                                inputMode='numeric'
                                value={formData.phoneNumber}
                                placeholder="eg. +1234567890"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm ">
                            {errors.phoneNumber}
                        </p>
                    )}
                </div>
                <div>
                    <div className={`input-field`}>
                        <BriefcaseBusiness size={16} />
                        <div>
                            <label htmlFor="position" className="text-sm">
                                Position
                            </label>
                            <input
                                id="position"
                                type="text"
                                name="position"
                                value={formData.position}
                                placeholder="Enter position"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`textarea-field`}>
                        <label
                            htmlFor="description"
                            className="flex justify-center items-center gap-4 text-sm py-1"
                        >
                            <FileText size={16} />
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            placeholder="Enter description"
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <button onClick={viewPDF} className="btn">
                        {isloading ? '...' : 'View PDF'}
                    </button>
                    <DownloadPdf formData={formData} setErrors={setErrors} />
                </div>
            </form>
        </div>
    );
};

export default Form;
