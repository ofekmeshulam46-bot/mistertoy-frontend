import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_SCORE, store } from "../store.js"

export async function login(credentials) {
  try {
    const loggedinUser = await userService.login(credentials)
    store.dispatch({ type: SET_USER, loggedinUser })
    return loggedinUser
  } catch (err) {
    console.log("login failed", err)
    showErrorMsg("login failed")
  }
}

export async function signup(credentials) {
  try {
    const loggedinUser = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, loggedinUser })
    return loggedinUser
  } catch (err) {
    console.log("signup failed", err)
    showErrorMsg("signup failed")
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, loggedinUser: null })
  } catch (err) {
    console.log("logout failed", err)
    showErrorMsg("logout failed")
  }
  //return?
}

export async function checkout(amount) {
  try {
    const updatedScore = await userService.updateScore(-amount)
    store.dispatch({ type: SET_USER_SCORE, score: updatedScore })
  } catch (err) {
    console.log("checkout fail", err)
    showErrorMsg("checkout fail")
  }
  //return?
}
