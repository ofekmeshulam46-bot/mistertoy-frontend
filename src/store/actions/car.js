import { ADD_CAR, EDIT_CAR, REMOVE_CAR, SET_CARS, store } from '../store.js'
import { carService } from '../../services/car.service.js'

export function loadCars() {
	return carService.query()
        .then(cars => store.dispatch({ type: SET_CARS, cars }))
}

export function removeCar(carId) {
    return carService.remove(carId)
        .then(() => store.dispatch({ type: REMOVE_CAR, carId }))
}

export function saveCar(car) {
    const type = car._id ? EDIT_CAR : ADD_CAR

    return carService.save(car)
        .then(savedCar => {
            store.dispatch({ type, car: savedCar })
            return savedCar
        })
}