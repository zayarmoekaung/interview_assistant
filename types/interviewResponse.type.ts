import z from "zod"

export const GreetingMatchSchema = z.object({
    message: z.string().min(10),
    kb_version: z.number().min(5)
}
)

export type Greeting = z.infer<
typeof GreetingMatchSchema
>;