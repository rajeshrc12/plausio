import { FILE_TYPES } from "@/types/constant"
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
 * Celery
 * ============================ */

export const CelerySchema = z.object({
  id: z.number().int(),
  type: z.string(),
})

export type Celery = z.infer<typeof CelerySchema>

/* ============================
 * Connector
 * ============================ */

export const ConnectorSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
})

export type Connector = z.infer<typeof ConnectorSchema>

export const AddConnectorSchema = ConnectorSchema.pick({
  name: true,
  type: true,
  title: true,
  description: true,
})
export type AddConnector = z.infer<typeof AddConnectorSchema>

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
 * ChatConnector
 * ============================ */

export const ChatConnectorSchema = z.object({
  chat_id: z.number().int(),
  connector_id: z.number().int(),
  connector: ConnectorSchema,
})

export type ChatConnector = z.infer<typeof ChatConnectorSchema>

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

export const connectorFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),

  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => FILE_TYPES.includes(file.type), {
      message: "File must be a PDF type",
    }),
})
