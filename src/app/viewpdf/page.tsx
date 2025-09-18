'use client';

import React from 'react';
import { useFormData } from '../context/FormDataContext';
import type { FormData } from '../lib/validate';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DownloadPdf from '../components/DownloadPdf';

const Page = () => {
    const { formData }: { formData: FormData } = useFormData();
    const router = useRouter();
    return (
        <div className="bg-white relative w-full h-screen flex flex-col gap-4 items-center justify-start">
            <div
                className="absolute top-4 left-4 cursor-pointer hover:text-stone-700 p-1"
                onClick={() => router.back()}
            >
                <ChevronLeft size={36} strokeWidth={2} color='black'/>
            </div>
            <div className="w-[80vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-4 border px-6 py-10 shadow-lg mt-36">
                {Object.entries(formData).map(([key, value]) => (
                    <div
                        key={key}
                        className="grid grid-cols-[150px_1fr] gap-4 items-baseline"
                    >
                        <h2 className="text-black text-base font-semibold capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                        </h2>
                        <p className="text-sm text-stone-600 font-medium w-[80%]">
                            {value ? value : '-'}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-[80vw] md:w-[70vw] lg:w-[50vw]">
                <DownloadPdf formData={formData} />
            </div>
        </div>
    );
};

export default Page;
