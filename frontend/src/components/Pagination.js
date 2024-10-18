import React, { useState } from 'react'
import MovieCard from './MovieCard';
import StreamBtn from './StreamBtn';
import Downloadbtn from './Downloadbtn';

const PaginationComponent = (props) => {
    const movieList = props.movieList;
    const movieDetails = props.movieDetails;
     
    console.log("Recieved here -> ", movieList, movieDetails)
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(movieList.length/25);
    return (
        <div className='w-full h-max gap-4 p-4 flex flex-col justify-center items-center'>
            <div className='nav-bg rounded-xl w-10/12 h-max flex py-1 bg-pink-600 bg-opacity-60 p-2'>
                <p className='w-5/12 flex justify-center items-center text-sm'>Torrent Name</p>
                <p className='w-2/12 flex justify-center items-center text-sm'>Size</p>
                <p className='w-1/12 flex justify-center items-center text-sm'>Seeders</p>
                <p className='w-1/12 flex justify-center items-center text-sm'>Leechers</p>
                <p className='w-3/12 flex justify-center items-center text-sm'></p>
            </div>
            {
                movieList.slice(page*25-25, page*25).map((movie) => {
                    return (
                        <div className='card-bg text-slate-400 w-10/12 h-max rounded-3xl py-3 px-6 bg-slate-400 p-2' key={movie.id}>
                            <div className='w-full h-max flex'>
                                <p className='text-zinc-400 text-lg w-5/12 flex justify-center items-center '>
                                    {
                                        movie?.Torrent?.startsWith('https://yts.mx')
                                            ? `${movieDetails?.Title} - YIFY`
                                            : movie?.Name
                                    }
                                </p>
                                <p className='w-2/12 flex justify-center items-center'>{movie.Size}</p>
                                <p className='w-1/12  flex justify-center items-center'>{movie.Seeders ? movie.Seeders : "-"}</p>
                                <p className='w-1/12  flex justify-center items-center'>{movie.Leechers ? movie.Leechers : "-"}</p>
                                <div className='flex w-3/12 gap-4  justify-center items-center'>
                                    <StreamBtn link={movie.Torrent ? movie.Torrent : movie.Magnet}/>
                                    <Downloadbtn />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                movieList.size > 25 && (
                    <div className='pagination'>
                        {page > 1 && <span className='' onClick={setPage(page-1)}></span>}
                        <p className='text-2xl '>{page}</p>
                        {page < totalPages && <span onClick={setPage(page+1)}></span>}
                    </div>
                )
            }
        </div>
    )
}

export default PaginationComponent
