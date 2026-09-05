import { z } from "zod"

/* ============================
 * User
 * ============================ */

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  name: z.string(),
  profile_url: z.string(),
})

export type User = z.infer<typeof UserSchema>
