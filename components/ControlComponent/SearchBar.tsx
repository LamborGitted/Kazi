

export default function SearchBar() {
    return(
        <div className="w-full h-16 flex items-center justify-center bg-white dark:bg-black">
            <input type="text" placeholder="搜索..." className="bg-transparent border-none focus:outline-none" />
        </div>
    )
}