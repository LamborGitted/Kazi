//type and interface

interface NavLink {
    id: string;

    label: string;

    i18nKey?: string;

    href?: string;

    icon?: string;

    children?: NavLink[];
}



// set you config here

export const appName="Lantxx Homepage";

export const navLinks : NavLink[] = [
  { id: "about", label: "About", href: "/about" },

  { id: "blog", label: "Blog", href: "/blog" },

  { id: "projects", label: "Projects", href: "/projects" },

  { id: "music", label: "Music", href: "/music" },

  { id : "social", label: "Social", href: "/social", },
  
  { id: "contact", label: "Contact", href: "/contact" ,},
];














