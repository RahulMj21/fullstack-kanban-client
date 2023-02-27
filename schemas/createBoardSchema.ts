import { object, string, TypeOf } from "zod";

export const CreateBoardSchema = object({
    title: string({ required_error: "please provide board title" })
        .trim()
        .min(3, "title must contain atleast 3 chracters")
        .max(20, "title must contain less than 20 characters"),
    description: string()
        .trim()
        .max(500, "description must contain less than 500 characters")
        .optional(),
});

export type CreateBoardInput = TypeOf<typeof CreateBoardSchema>;
