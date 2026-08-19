const HeroSlide = ({ movie }: any) => {
  return (
    <div>
      <img
        src={`https://picsum.photos/1600/900?random=${movie.id}`}
        alt={movie.title}
        className="absolute h-full w-full object-cover"
      />
    </div>
  )
}

export default HeroSlide
