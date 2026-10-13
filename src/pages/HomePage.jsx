import { useSelector, useDispatch } from "react-redux"
import { INCREMENT, INCREMENT_BY } from "../store/store.js"

export function HomePage() {
  const count = useSelector((storeState) => storeState.count)
  const dispatch = useDispatch()

  function increment() {
    dispatch({ type: INCREMENT })
  }

  function incrementBy(by) {
    dispatch({ type: INCREMENT_BY, by })
  }

  return (
    <section className="home-page">
      <div className="counter">
        <h2>Count {count}</h2>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => incrementBy(10)}>+10</button>
      </div>

      <img src="assets/img/logo.png" />
    </section>
  )
}
