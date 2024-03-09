const PlaceImg = ({place, index=0, className=null}) => {
    if(!place.photos?.length) {
        return ''
    }

    if(!className) {
        className =  'object-cover'
    }
  return (
    <div>
        {place.photos.length > 0 && (
            <img src={`http://localhost:3003/uploads/${place.photos[index]}`} className={className} alt="" />
        )}
    </div>
  )
}

export default PlaceImg