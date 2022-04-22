const TrackItem = ({songName, songArtists, picURL}) => {
	return (
		<div className='w-full flex items-start mb-7 w-full pr-8 truncate overflow-hidden'>
			<div className='hidden sm:block sm:w-12 sm:h-12 overflow-hidden rounded-full'>
				<img src={picURL} alt="track" className='object-cover'/>
			</div>
			<div className='ml-4 truncate'>
				<h4 className='text-gray-400 hover:text-white truncate' >{songName}</h4>
				
			</div>
		</div>

	)
}
export default TrackItem