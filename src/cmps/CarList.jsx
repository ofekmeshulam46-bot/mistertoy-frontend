import { CarPreview } from "./CarPreview.jsx"

export function CarList({ cars, onRemoveCar, onEditCar, onAddToCart }) {
    return <ul className="car-list">
        {cars.map(car => <li key={car._id}>
            <CarPreview car={car} />

            <div className="actions">
                <button onClick={() => onRemoveCar(car._id)}>x</button>
                <button onClick={() => onEditCar(car)}>Edit</button>
                <button onClick={() => onAddToCart(car)}>Add to Cart</button>
            </div>
        </li>)}
    </ul>
}