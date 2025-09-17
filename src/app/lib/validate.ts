import * as z from 'zod';

const formDataSchema = z.object({
    name: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    position: z.string(),
    description: z.string(),
});

type FormData = z.infer<typeof formDataSchema>;

export { formDataSchema, type FormData };
