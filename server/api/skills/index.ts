import supabase from "~/lib/supabase";

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.from("skill").select(`
    name,
    level,
    category_id (
        id,
        name
    )
  `);

  if (error) return { error };

  return {
    data
  };
});
