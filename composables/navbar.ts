export const useActive = () => useState<string>('active', () => "#home")

type Link = {
    path: string;
    label: string;
}

export const useLinks = () => useState<Link[]>('links', () => [
    {
      path: "#home",
      label: "Accueil",
    },
    {
      path: "#about",
      label: "A propos",
    },
    {
        path: "#cv",
        label: "CV"
    },
    {
      path: "#projects",
      label: "Projets",
    },
    {
      path: "#contact",
      label: "Contact",
    },
  ])