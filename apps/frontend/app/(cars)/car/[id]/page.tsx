interface CarParams {
  params: {
    id: string
  }
}

export default function Car({params}: CarParams) {
  
  const carId = parseInt(params.id)

  if (isNaN(carId)) {
    throw new Error(`Not a valid id.`)
  }

  return (
    <main>
      Something about car {carId}
    </main>
  )
}
