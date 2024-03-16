import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    postId: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type signupType = z.infer<typeof signupInput>;
export type signinType = z.infer<typeof signinInput>;
export type createBlogType = z.infer<typeof createBlogInput>;
export type updateBlogType = z.infer<typeof updateBlogInput>;
