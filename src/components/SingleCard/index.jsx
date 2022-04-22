const SingleCard = ({imageURL, itemName}) => {
	return (
		<div className='bg-card pb-1.5 mr-3 md:mr-6 mt-4 w-36 md:w-40 shadow-2xl rounded-sm transition-transform duration-300 transform hover:scale-105'>
			<div className='px-4 w-full'>
				<div className='image pt-4 opacity-75'>
					<img src={imageURL} alt="" className='w-32 h-36 object-cover'/>
				</div>
				<div className='w-full'>
					<h3 className='mt-1 text-gray-400 truncate'>{itemName}</h3>
				</div>
			</div>
		</div>
	)
}

export default SingleCard;