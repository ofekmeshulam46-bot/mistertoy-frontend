
import { useSelector, useDispatch } from "react-redux"
export function AppFooter() {
    
    const count = useSelector(storeState => storeState.count)
    const carCount = useSelector(storeState => storeState.cars.length)
    const dispatch = useDispatch()

    return <footer className="app-footer">
        

        <p>Coffeerights &copy; 2026 - Count: {count}</p>
    </footer>
}
