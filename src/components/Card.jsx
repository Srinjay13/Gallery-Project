import React from 'react'

const Card = ({ elem, onSave }) => {
  return (
    <div className='relative group'>
      <a href={elem.url} target='_blank'>
        <div className='h-40 w-44 overflow-hidden rounded-xl'>
          <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
        </div>
        <h2 className='font-bold text-lg'>{elem.author}</h2>
      </a>

      {/* Save Button */}
      <button
        onClick={() => onSave(elem)}
        className='absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition'
      >
        Save
      </button>

      {/* Download Button */}
      <a
        href={elem.download_url}
        target='_blank'
        download={`image-${elem.id}.jpg`}
        className='absolute bottom-8 right-2 bg-blue-400 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition'
      >
        Download
      </a>
    </div>
  )
}

export default Card