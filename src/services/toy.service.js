import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"

const STORAGE_KEY = "toyDB"

const toyNames = [
  "Remote Control Car",
  "Paint Set Deluxe",
  "Electronic Drum Kit",
  "Musical Crib Mobile",
  "Wooden Puzzle Set",
  "Electronic Drum Kit",
  "Cyber Retro Robot",
  "Magnetic Building Blocks",
  "Solar Powered Rover",
  "Miniature Railway Set",
  "Mechanical Wind-up Toy",
  "Programmable Code Bot",
  "Plush Alien Companion",
  "DIY Telescope Kit",
  "Glow-in-the-Dark Putty",
  "Steampunk Action Figure",
  "Electronic Walkie Talkies",
  "Marble Run Super Set",
  "Pocket Rocket Model",
  "Interactive Dino Bot",
  "Holographic Puzzle Cube",
]

const labels = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
]

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
    name: toyNames[utilService.getRandomIntInclusive(0, toyNames.length-1)],
    price: utilService.getRandomIntInclusive(1000, 9000),
    labels: labels[utilService.getRandomIntInclusive(0, labels.length)],
    createdAt: Date.now(),
    inStock: true,
  }
}

function _createToys() {
  const toys = utilService.loadFromStorage(STORAGE_KEY) || []
  if (toys.length > 0) return

  for (var i = 0; i < 4; i++) {
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
