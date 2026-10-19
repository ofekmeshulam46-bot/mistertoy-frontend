import { userService } from "../services/user.service.js"

import { createStore } from "redux"

export const INCREMENT = "INCREMENT"
export const INCREMENT_BY = "INCREMENT_BY"

export const SET_TOYS = "SET_TOYS"
export const REMOVE_TOY = "REMOVE_TOY"
export const ADD_TOY = "ADD_TOY"
export const EDIT_TOY = "EDIT_TOY"

export const SET_USER = "SET_USER"
export const SET_USER_SCORE = "SET_USER_SCORE"

const initialState = {
  count: 106,
  toys: [],
  loggedinUser: userService.getLoggedinUser(),
}

export function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }

    case INCREMENT_BY:
      return { ...state, count: state.count + cmd.by }

    case SET_TOYS:
      return { ...state, toys: cmd.toys }

    case REMOVE_TOY:
      return {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== cmd.toyId),
      }

    case ADD_TOY:
      return { ...state, toys: [...state.toys, cmd.toy] }

    case EDIT_TOY:
      return {
        ...state,
        toys: state.toys.map((toy) =>
          toy._id === cmd.toy._id ? cmd.toy : toy,
        ),
      }

    case SET_USER:
      return { ...state, loggedinUser: cmd.loggedinUser }

    case SET_USER_SCORE:
      const loggedinUser = { ...state.loggedinUser, score: cmd.score }
      return { ...state, loggedinUser }

    default:
      return state
  }
}

export const store = createStore(appReducer)
window.gStore = store
