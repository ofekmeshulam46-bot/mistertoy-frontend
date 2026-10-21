import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import {
  loadToys,
  removeToy,
  saveToy,
  setFilterBy,
} from "../store/actions/toy.js"

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toys)
  const filterBy = useSelector((storeState) => storeState.filterBy)
  const dispatch = useDispatch()

  useEffect(() => {
    const regExp = new RegExp(filterBy.txt, "i")
    loadToys(filterBy)
    // return toys.filter(toy =>
    //       {
    //           return regExp.test(toy.vendor) &&
    //           toy.price <= filterBy.maxPrice
    //       }
    // console.log(toys)
  }, [filterBy])

  function onSetFilter(filterBy) {
    // console.log(filterBy)
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg("Toy removed")
      })
      .catch((err) => {
        console.log("Cannot remove toy", err)
        showErrorMsg("Cannot remove toy")
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        console.log("Cannot add toy", err)
        showErrorMsg("Cannot add toy")
      })
  }
  function onEditToy(toy) {
    const price = +prompt("New price?")
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        console.log("Cannot update toy", err)
        showErrorMsg("Cannot update toy")
      })
  }

  return (
    <section className="toy-index">
      <header>
        <h3>Toys</h3>
        <button onClick={onAddToy}>Add Toy ⛐</button>
      </header>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <main>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
      </main>
    </section>
  )
}
