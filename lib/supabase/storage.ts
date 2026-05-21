import { supabase } from "@/lib/supabase/client";

export async function uploadPalmImage(file: File, userId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("palm-uploads")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("palm-uploads")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
