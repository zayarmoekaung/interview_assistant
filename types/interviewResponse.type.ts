import z from "zod"

export const GreetingMatchSchema = z.object({
    message: z.string().min(10)
}
)

export type Greeting = z.infer<
typeof GreetingMatchSchema
>;