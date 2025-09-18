'use client';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import PdfTemplate from './PdfTemplate';
import { formDataSchema, type FormData } from '../lib/validate';
import { Download } from 'lucide-react';

type DownloadPdfProps = {
    formData: FormData;
    setErrors?: React.Dispatch<
        React.SetStateAction<Partial<Record<keyof FormData, string>>>
    >;
};

const DownloadPdf = ({ formData, setErrors }: DownloadPdfProps) => {
    const downloadPDF = async () => {
        const result = formDataSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof FormData, string>> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormData;
                fieldErrors[field] = issue.message;
            });
            if (setErrors) {
                setErrors(fieldErrors);
            }
            return;
        }
        if (setErrors) {
            setErrors({});
        }
        const doc = <PdfTemplate formData={formData} />;

        const asPdf = pdf(doc);
        const blob = await asPdf.toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'example.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };
    return (
        <button onClick={downloadPDF} className="btn">
            <Download size={16} /> Download PDF
        </button>
    );
};

export default DownloadPdf;
