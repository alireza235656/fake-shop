
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email('ایمیل نامعتبر است')
    .min(1, 'ایمیل الزامی است'),
  password: z.string()
    .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
    .min(1, 'رمز عبور الزامی است'),
});

export const checkoutSchema = z.object({
  firstName: z.string().min(1, 'نام الزامی است'),
  lastName: z.string().min(1, 'نام خانوادگی الزامی است'),
  address: z.string().min(1, 'آدرس الزامی است'),
  city: z.string().min(1, 'شهر الزامی است'),
  postalCode: z.string()
    .regex(/^\d{10}$/, 'کد پستی معتبر نیست')
    .min(1, 'کد پستی الزامی است'),
  phone: z.string()
    .regex(/^(09)\d{9}$/, 'شماره موبایل معتبر نیست')
    .min(1, 'شماره موبایل الزامی است'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
