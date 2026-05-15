import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type MessageInput = z.infer<typeof messageSchema>;
