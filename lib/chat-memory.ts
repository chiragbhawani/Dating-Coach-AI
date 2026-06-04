import { supabase } from "@/lib/supabase";

export async function saveMessage(
  userId: string,
  role: "user" | "assistant",
  content: string
) {
  const { error } = await supabase.from("chat_messages").insert({
    user_id: userId,
    role,
    content,
  });

  if (error) {
    console.error("Failed to save message:", error);
  }
}