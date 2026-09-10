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

/* ============================
 * Chat
 * ============================ */

export const ChatSchema = z.object({
  id: z.number().int(),
  title: z.string(),
})

export type Chat = z.infer<typeof ChatSchema>

export const AddChatSchema = z.object({
  message: z.string(),
  connector_ids: z.array(z.number()),
})
export type AddChat = z.infer<typeof AddChatSchema>

/* ============================
 * Message
 * ============================ */

export const MessageSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  type: z.string(),
  role: z.string(),
})

export type Message = z.infer<typeof MessageSchema>

export const AddMessageSchema = MessageSchema.pick({
  content: true,
  type: true,
  role: true,
}).extend({ chat_id: z.number().int() })
export type AddMessage = z.infer<typeof AddMessageSchema>
