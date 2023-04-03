import { object, string, TypeOf } from "zod";

export const CreateSectionSchema = object({
    title: string({ required_error: "please provide section title" })
        .min(3, "title must contain atleast 3 characters")
        .max(15, "title must contain less than 15 characters"),
});

export type TCreateSectionInput = TypeOf<typeof CreateSectionSchema>;
