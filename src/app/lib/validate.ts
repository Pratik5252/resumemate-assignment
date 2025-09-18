import * as z from 'zod';

const formDataSchema = z.object({
    name: z
        .string()
        .min(1, 'Name must be at least 1 character long')
        .max(100, 'Name must be at most 100 characters long'),
    email: z.email('Invalid email address'),
    phoneNumber: z
        .string()
        .min(10, 'Phone number must be at least 10 digits long')
        .max(15, 'Invalid phone number'),
    position: z.string('Position is required'),
    description: z.string('Description is required'),
});

type FormData = z.infer<typeof formDataSchema>;

export { formDataSchema, type FormData };
