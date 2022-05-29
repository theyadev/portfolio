import supabase from "~/lib/supabase";

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.from("skill_category").select("id, name");

  if (error) return { error };

  return {
      data
  };
});
