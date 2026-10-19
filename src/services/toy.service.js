import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
}

function query() {
	return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
	return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
	return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
	if (toy._id) {
		return storageService.put(STORAGE_KEY, toy)
	} else {
		// when switching to backend - remove the next line
		toy.owner = userService.getLoggedinUser()
		return storageService.post(STORAGE_KEY, toy)
	}
}

function getEmptyToy() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}

function _createToys() {
    const toys = utilService.loadFromStorage(STORAGE_KEY) || []
    if (toys.length > 0) return

    for (var i = 0; i < 4; i++){
        const toy = _createToy()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}

function _createToy() {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()

    return toy
}