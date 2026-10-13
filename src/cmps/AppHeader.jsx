import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

import { logout } from "../store/actions/user.js"
import { TOGGLE_CART } from "../store/store.js"
import { LoginSignup } from "./LoginSignup.jsx"

export function AppHeader() {
  const loggedinUser = useSelector((storeState) => storeState.loggedinUser)
  const dispatch = useDispatch()

  function onLogout() {
    logout()
  }

  return (
    <header className="app-header">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/car">Cars</NavLink>
        <NavLink to="/about">About</NavLink>

        <button onClick={() => dispatch({ type: TOGGLE_CART })}>
          <span>🛒 Cart</span>
        </button>
      </nav>
      <h1>State Management with Redux</h1>

      {loggedinUser && (
        <section className="login-signup">
          <p>
            {loggedinUser.fullname}{" "}
            <span>${loggedinUser.score.toLocaleString()}</span>
          </p>
          <button onClick={onLogout}>Logout</button>
        </section>
      )}

      {!loggedinUser && (
        <section className="login-signup">
          <LoginSignup />
        </section>
      )}
    </header>
  )
}
