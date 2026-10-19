import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_TOYS,SET_FILTER_BY, store } from "../store.js"
import { toyService } from "../../services/toy.service.js"

export function loadToys() {
  return toyService
    .query()
    .then((toys) => store.dispatch({ type: SET_TOYS, toys }))
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
}

export function saveToy(toy) {
  const type = toy._id ? EDIT_TOY : ADD_TOY

  return toyService.save(toy).then((savedToy) => {
    store.dispatch({ type, toy: savedToy })
    return savedToy
  })
}

export function setFilterBy(filterBy) {
    // console.log(filterBy)
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
