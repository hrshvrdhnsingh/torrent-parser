import React from 'react'

const MovieDetails = ({movieDetails}) => {
    return (
        <div className='w-8/12 h-[60vh] glass2 mt-12 p-4 flex justify-center items-center gap-4'>
            <div className='w-4/12 h-full rounded-xl overflow-hidden'><img src={movieDetails?.Poster} alt='' className='object-fit w-full h-full'/></div>
            <div className='w-8/12 h-full flex flex-col gap-2'>
                <h1 className='text-3xl font-medium bg-gradient-to-r from-[#fd5efde7] to-[#1900ff] text-transparent bg-clip-text'>{movieDetails.Title}</h1>
                <p className='text-purple-400'>Released : {movieDetails.Released}</p>
                <p className='text-slate-200'>{movieDetails.Plot}</p>
                <div className='flex w-full '>
                    <div className='flex flex-col w-2/12 text-zinc-300 gap-1'>
                        <p>Genre : </p>
                        <p>Director : </p>
                        <p>Actors : </p>
                        <p>Awards : </p>
                        <p>Rating : </p>
                    </div>
                    <div className='w-10/12 flex flex-col text-zinc-200 gap-1'>
                        <p>{movieDetails.Genre}</p>
                        <p>{movieDetails.Director}</p>
                        <p>{movieDetails.Actors}</p>
                        <p>{movieDetails.Awards}</p>
                        <p>{movieDetails.imdbRating} ⭐</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
