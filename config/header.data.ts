//type and interface

interface NavLink {
    name: string;
    href?: string;
    children?: NavLink[];
}



// set you config here

export const appName="Lantxx Blog";

export const navLinks : NavLink[] = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Social", children: [
    { name: "Github", href: "/contact/github" },
    { name: "Bilibili", href: "/contact/bilibili" },
    ] },
];














