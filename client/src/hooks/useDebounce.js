import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 500) => {
    const [searchValue, setSearchValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchValue(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])
    return searchValue
}