import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,

    getById,
    updateScore,
    getEmptyCredentials,
}

window.us = userService

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
        // .then((data) => _setLoggedinUser(data)) same same
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.score
                })
        })
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})
