import { TOGGLE_CART } from "../store/store.js"

import { useSelector, useDispatch } from "react-redux"
export function AppFooter() {
    
    const isCartShown = useSelector(storeState => storeState.isCartShown)
    const count = useSelector(storeState => storeState.count)
    const carCount = useSelector(storeState => storeState.cars.length)
    const cartSize = useSelector(storeState => storeState.cart.length)
    const dispatch = useDispatch()

    return <footer className="app-footer">
        
        <section className='cart-stats'>
            <p>{carCount} cars in the shop</p>
            <p className="product-count">{cartSize} products in your Cart</p>

            <button onClick={() => dispatch({ type: TOGGLE_CART })}>
                {(isCartShown) ? 'hide 🛒' : 'show 🛒'}
            </button>
        </section>
        <p>Coffeerights &copy; 2026 - Count: {count}</p>
    </footer>
}
