import { useEffect } from "react"
import { useSelector, useDispatch }from "react-redux"

import { CarList } from '../cmps/CarList.jsx'
import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadCars, removeCar, saveCar } from '../store/actions/car.js'

export function CarIndex() {

    const cars = useSelector(storeState => storeState.cars)
    const dispatch = useDispatch()

    useEffect(() => {
        loadCars()
    }, [])

    function onRemoveCar(carId) {
        removeCar(carId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                console.log('Cannot remove car', err)
                showErrorMsg('Cannot remove car')
            })
    }

    function onAddCar() {
        const carToSave = carService.getEmptyCar()

        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car added (id: ${savedCar._id})`)
            })
            .catch(err => {
                console.log('Cannot add car', err)
                showErrorMsg('Cannot add car')
            })


    }
    function onEditCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }

        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(err => {
                console.log('Cannot update car', err)
                showErrorMsg('Cannot update car')
            })
    }

   
    return <section className="car-index">
        <header>
            <h3>Cars</h3>
            <button onClick={onAddCar}>Add Car ⛐</button>
        </header>

        <main>
            <CarList 
                cars={cars}
                onRemoveCar={onRemoveCar}
                onEditCar={onEditCar}/>
        </main>
    </section>
}