import supabase from "~/lib/supabase";

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.from("experience").select();

  if (error) return { error };

  return {
    data
  };
});
