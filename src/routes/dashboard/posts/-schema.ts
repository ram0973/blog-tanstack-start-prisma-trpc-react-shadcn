import z from 'zod'

export const postSchema = z.object({
  title: z.string().min(2, { message: 'Title must be not empty' }),
  content: z.string().min(2, { message: 'Content must be not empty' }),
})
