import { z } from "zod"

export const updateUserPayloadSchema = z
  .object({
    id: z.number().min(1),
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    // allow empty/undefined to mean "not updating password"; validate only when a non-empty value is provided
    password: z.string().optional(),
    old_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const pwd = data.password

    // If password is provided and non-empty, validate its length and require old_password
    if (pwd && pwd.length > 0) {
      if (pwd.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 6 characters long",
          path: ["password"],
        })
      }

      if (!data.old_password || data.old_password.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Old password is required when updating password",
          path: ["old_password"],
        })
      }
    }
  })

export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>
