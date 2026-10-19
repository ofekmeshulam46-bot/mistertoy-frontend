import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy,  }) {
    return <ul className="toy-list">
        {toys.map(toy => <li key={toy._id}>
            <ToyPreview toy={toy} />

            <div className="actions">
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <button onClick={() => onEditToy(toy)}>Edit</button>
            </div>
        </li>)}
    </ul>
}