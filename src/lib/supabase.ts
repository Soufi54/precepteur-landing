import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cztnbuesyiawazidkobt.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dG5idWVzeWlhd2F6aWRrb2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDIwNjMsImV4cCI6MjA2ODA3ODA2M30.dpaIMncJ-5Ytql7i8DbBfbHt6lD5uQIuRXGa1vo-kQA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("email_subscribers")
    .insert({ email, source: "landing" });

  if (error) {
    if (error.code === "23505") {
      return { success: true };
    }
    return { success: false, error: error.message };
  }
  return { success: true };
}
