export interface WorkItem {
  slug: string
  image: string
  title: string
  description: string
}

export const WORKS: WorkItem[] = [
  {
    slug: "survivor-connect",
    image: "/works/survivor-connect.png",
    title: "Survivor Connect",
    description: "A multi-lingual healthcare platform with advanced UX.",
  },
  {
    slug: "school-saas",
    image: "/works/school-saas.png",
    title: "School Management SaaS",
    description: "Role-based SaaS with custom domains and dashboards.",
  },
  {
    slug: "website-builder",
    image: "/works/website-builder.png",
    title: "Visual Website Builder",
    description: "Drag-and-drop website builder generating real TSX code.",
  },
  {
    slug: "cloud-kitchen",
    image: "/works/cloud-kitchen.png",
    title: "Cloud Kitchen Platform",
    description: "End-to-end food ordering and menu management system.",
  },
  {
    slug: "portfolio",
    image: "/works/portfolio.png",
    title: "Developer Portfolio",
    description: "A modern i18n-first developer portfolio.",
  },
]
