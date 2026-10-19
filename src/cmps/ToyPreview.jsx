export function ToyPreview({ toy }) {
    return <article className="toy-preview">
        <p className="vendor">{toy.vendor}</p>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p>
    </article>
}