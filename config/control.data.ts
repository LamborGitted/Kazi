const defaultColor = "#ff69b4";

const defaultTheme: "light" | "dark" | "auto" = "light";

const defaultTimeData = "YYYY-MM-DD HH:mm:ss";

const defaultLanguage = "auto";

const defaultSearchPlaceholder = "Search...";






type ControlComponent = "ControlTitle"|"HuePicker" | "ThemeToggle" | "LanguageSwitcher" | "Clock" | "SearchBar";


const controlComponent: ControlComponent[] = [
    "Clock",
    "SearchBar",
    "LanguageSwitcher",
    "HuePicker",
    "ThemeToggle",
    "ControlTitle"
]

