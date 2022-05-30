import Project from "~~/types/Project";

export const useProjects = () =>  useState<Project[]>("projects", () => [])

export async function fetchProjects(supabase): Promise<Project[]> {
  const { data: new_projects } = await supabase.from("project").select();

  return new_projects
}
