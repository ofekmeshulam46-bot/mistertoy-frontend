export function ToyPreview({ toy }) {
  console.log(toy)

  return (
    <article className="toy-preview">
      <p className="name">{toy.name}</p>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <p>
        inStock: <span>{JSON.stringify(toy.inStock)}</span>
      </p>
    </article>
  )
}
