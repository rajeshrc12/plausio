const MovieCard = () => {
  return (
    <div className="relative h-40 overflow-hidden">
      <div
        className="absolute inset-0 rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url("https://picsum.photos/320/180")`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/80" />

      <div className="absolute bottom-1 left-1 z-10 font-medium">
        Crazy Romance
      </div>
    </div>
  )
}

export default MovieCard
