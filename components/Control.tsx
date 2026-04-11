import ControlTitle from "./ControlComponent/ControlTitle"
import SearchBar from "./ControlComponent/SearchBar"
import LanguageSwitcher from "./ControlComponent/LanguageSwitcher"
import Clock from "./ControlComponent/Clock"

export default function Control() {
    return (
        <div className="flex bg-white dark:bg-black p-4 min-w-full justify-center items-center">
            
            <ControlTitle />
            <SearchBar />
            <LanguageSwitcher />
            <Clock />
            
        </div>
    )
}