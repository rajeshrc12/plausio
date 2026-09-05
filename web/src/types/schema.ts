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
