export function CarPreview({ car }) {
    return <article className="car-preview">
        <p className="vendor">{car.vendor}</p>
        <p>Price: <span>${car.price.toLocaleString()}</span></p>
        <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
    </article>
}