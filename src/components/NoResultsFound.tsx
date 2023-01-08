import React from 'react'
import PreloadImage from 'react-preload-image'
import NoResults from '../assets/NoResults.png';

function NoResultsFound({show}) {
  return (
    <div className={`${show ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
        <PreloadImage className='relative w-[200px] h-[200px]' src={NoResults} alt="noResults" />
        <h1 className='font-semibold text-2xl dark:text-white'>No Results found</h1>
        <p className='text-gray-600 dark:text-gray-200 text-lg'>We couldn't find what you are searching for.</p>
        <p className='text-gray-600 dark:text-gray-200 text-lg'>Try searching again.</p>
    </div>
  )
}

export default NoResultsFound