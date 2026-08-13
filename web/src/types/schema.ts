import { z } from "zod"

/* ============================
 * User
 * ============================ */

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserSchema = z.infer<typeof UserSchema>
