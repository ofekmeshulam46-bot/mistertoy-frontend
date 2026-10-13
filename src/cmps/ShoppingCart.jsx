import { useSelector, useDispatch } from "react-redux"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { checkout } from '../store/actions/user.js'
import { REMOVE_FROM_CART } from '../store/store.js'

export function ShoppingCart() {
    const isCartShown = useSelector(storeState => storeState.isCartShown)
    const user = useSelector(storeState => storeState.loggedinUser)
    const cart = useSelector(storeState => storeState.cart)
    const dispatch = useDispatch()

	function removeFromCart(carId) {
        dispatch({ type: REMOVE_FROM_CART, carId })
	}

	function getCartTotal() {
		return cart.reduce((acc, car) => acc + car.price, 0)
	}

	function onCheckout() {
		const amount = getCartTotal()

		checkout(amount)
            .then(() => 
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`))
            .catch(() => showErrorMsg('Not Enough Zoozim'))
		
	}

	if (!isCartShown) return <span></span>

	const total = getCartTotal()
	return <section className="cart">
        <h3>Your Cart</h3>
        <ul>
            {cart.map((car, idx) => (
                <li key={idx}>
                    <button onClick={() => 
                        removeFromCart(car._id)}>x</button>
                    <span>{car.vendor} | ${car.price.toLocaleString()}</span>
                </li>
            ))}
        </ul>
        <p>Total: ${total} </p>
        <button disabled={!user || !total} onClick={onCheckout}>
            Checkout
        </button>
    </section>
}