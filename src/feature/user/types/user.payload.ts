import { z } from "zod"

export const updateUserPayloadSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    password: z.string().min(6).optional(),
    old_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && !data.old_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Old password is required when updating password",
      })
    }
  })

export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>
