import SearchBar from "./ControlComponent/SearchBar"
import Clock from "./ControlComponent/Clock"
import HuePicker from "./ControlComponent/HuePicker"

export default function Control() {
    return (
        <div className="flex bg-white dark:bg-black p-4 min-w-full justify-center gap-4 bottom-0">
            <Clock />
            <SearchBar />
            <HuePicker />
        </div>
    )
}