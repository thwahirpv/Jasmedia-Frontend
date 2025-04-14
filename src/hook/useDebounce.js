import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [deBounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return deBounceValue
}

export default useDebounce