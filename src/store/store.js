import { userService } from "../services/user.service.js"

import { createStore } from "redux"

export const INCREMENT = "INCREMENT"
export const INCREMENT_BY = "INCREMENT_BY"

export const SET_CARS = "SET_CARS"
export const REMOVE_CAR = "REMOVE_CAR"
export const ADD_CAR = "ADD_CAR"
export const EDIT_CAR = "EDIT_CAR"

export const SET_USER = "SET_USER"
export const SET_USER_SCORE = "SET_USER_SCORE"

const initialState = {
  count: 106,
  cars: [],
  loggedinUser: userService.getLoggedinUser(),
}

export function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }

    case INCREMENT_BY:
      return { ...state, count: state.count + cmd.by }

    case SET_CARS:
      return { ...state, cars: cmd.cars }

    case REMOVE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== cmd.carId),
      }

    case ADD_CAR:
      return { ...state, cars: [...state.cars, cmd.car] }

    case EDIT_CAR:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === cmd.car._id ? cmd.car : car,
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
