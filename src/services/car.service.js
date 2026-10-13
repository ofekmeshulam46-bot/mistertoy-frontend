import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'carDB'

_createCars()

export const carService = {
	query,
	getById,
	save,
	remove,
	getEmptyCar,
}

function query() {
	return storageService.query(STORAGE_KEY)
}

function getById(carId) {
	return storageService.get(STORAGE_KEY, carId)
}

function remove(carId) {
	return storageService.remove(STORAGE_KEY, carId)
}

function save(car) {
	if (car._id) {
		return storageService.put(STORAGE_KEY, car)
	} else {
		// when switching to backend - remove the next line
		car.owner = userService.getLoggedinUser()
		return storageService.post(STORAGE_KEY, car)
	}
}

function getEmptyCar() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}

function _createCars() {
    const cars = utilService.loadFromStorage(STORAGE_KEY) || []
    if (cars.length > 0) return

    for (var i = 0; i < 4; i++){
        const car = _createCar()
        cars.push(car)
    }
    utilService.saveToStorage(STORAGE_KEY, cars)
}

function _createCar() {
    const car = getEmptyCar()
    car._id = utilService.makeId()

    return car
}