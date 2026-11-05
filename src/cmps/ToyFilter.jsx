import { useState, useEffect, useRef } from "react"

import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../hooks/useEffectUpdate.js"
import MultipleSelect from "./MaterialUi.jsx"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    // value = type === "number" ? +value || "" : value
    console.log("test")
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="By name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />
        <label for="cars">In Stock:</label>
        <select name="toys" id="toys">
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Not In Stock">Not In Stock</option>
        </select>

        <MultipleSelect />

        {/* <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        /> */}
      </form>
    </section>
  )
}
