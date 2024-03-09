import { useState } from "react"

const PlaceGallery = ({place}) => {
    const [showPhotos, setShowPhotos] = useState(false)

    if(showPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
                        <button onClick={() => setShowPhotos(false)} className="flex items-center gap-2 fixed py-2 px-4 rounded-2xl shadow shadow-black right-12 top-12">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={18} height={18}>
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                            close photos
                        </button>
                    </div>
                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img src={`http://localhost:3003/uploads/${photo}`} alt="" className="object-cover w-full h-full" />
                    </div>
                ))}
                </div>
            </div>
        )
    }
  return (
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <img onClick={() => setShowPhotos(true)} src={`http://localhost:3003/uploads/${place.photos[0]}`} className="cursor-pointer object-cover w-full h-full" alt="" /> 
                )}
            </div>
            <div className="cursor-pointer flex flex-col gap-2">
                {place.photos?.[1] && (
                    <img onClick={() => setShowPhotos(true)} src={`http://localhost:3003/uploads/${place.photos[1]}`} className="cursor-pointer object-cover flex-1" alt="" />
                )}
                {place.photos?.[2] && (
                    <img onClick={() => setShowPhotos(true)} src={`http://localhost:3003/uploads/${place.photos[2]}`} className="cursor-pointer object-cover flex-1" alt="" />
                )}
                
            </div>
        </div>
        <button onClick={() => setShowPhotos(true)} className="flex gap-2 items-center absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={17} height={17}>
            <path d="M32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM320 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM224 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-448a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm192 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 320a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM416 192a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
        </svg>
            Show more photos
            </button>
        </div>
  )
}

export default PlaceGallery