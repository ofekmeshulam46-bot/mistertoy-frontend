import { useState, useEffect, useRef } from "react"

import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../hooks/useEffectUpdate.js"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    // console.log(value, field, type)
    value = type === "number" ? +value || "" : value
    // console.log(value)

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  console.log(filterByToEdit)
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

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
