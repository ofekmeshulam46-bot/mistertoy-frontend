import {
  ADD_TOY,
  EDIT_TOY,
  REMOVE_TOY,
  SET_TOYS,
  SET_FILTER_BY,
  store,
} from "../store.js"
import { toyService } from "../../services/toy.service.js"

export async function loadToys(filterBy) {
  const regExp = new RegExp(filterBy.txt, "i")
  try {
    const toys = await toyService.query(filterBy)

    return store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log(err)
    showErrorMsg("cannt load toys")
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    return store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log("removing toy failed", err)
    showErrorMsg("removing toy failed")
  }
}

export async function saveToy(toy) {
  const type = toy._id ? EDIT_TOY : ADD_TOY
  try {
    const savedToy = await toyService.save(toy)
    store.dispatch({ type, toy: savedToy })
    return savedToy
  } catch (err) {
    console.log("saving toy failed", err)
    showErrorMsg("saving toy failed")
  }
}

export function setFilterBy(filterBy) {
  // console.log(filterBy)
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
