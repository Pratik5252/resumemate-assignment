# Resume Mate — Assignment

Small Next.js app to collect user details and produce a printable/downloadable PDF of those details.

## Features

-   Simple form for Name, Email, Phone, Position, Description
-   Client + schema validation with Zod
-   View form data on a formatted page (`/viewpdf`)
-   Generate and download PDF (separated `downloadPDF` helper)
-   Tailwind CSS for web layout; `@react-pdf/renderer` for PDF output

## Tech

-   Next.js (app router)
-   React (client components)
-   Tailwind CSS (global utilities)
-   Zod (validation)
-   @react-pdf/renderer (PDF generation)
-   lucide-react (icons)

## Setup

1. Install
    ```bash
    npm install
    # or
    pnpm install
    ```
2. Run dev server
    ```bash
    npm run dev
    ```
3. Build / start
    ```bash
    npm run build
    npm run start
    ```

## Implementation notes

-   Validation: schema lives at `src/app/lib/validate.ts`. Use `safeParse` and display field errors.
-   Download: `src/app/lib/downloadpdf.ts` creates a React element of the PDF component and uses `pdf(...).toBlob()` to trigger download.
-   PDF styling: React PDF does not understand Tailwind or CSS `vw`. Use `StyleSheet.create` inside `PdfTemplate.tsx`.

## File pointers

-   Form component: `src/app/components/Form.tsx`
-   PDF template: `src/app/components/PdfTemplate.tsx`
-   Download Pdf: `src/app/components/DownloadPdf.tsx`
-   Validation schema: `src/app/lib/validate.ts`
-   View page: `src/app/viewpdf/page.tsx`
