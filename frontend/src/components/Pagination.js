import React, { useState } from 'react'
import MovieCard from './MovieCard';

const PaginationComponent = ({movieList, movieDetails}) => {
    console.log("Recieved here -> ", movieList, movieDetails)
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(movieList.length/25);
    return (
        <div className='w-full bg-black h-max p-4 flex justify-center items-center'>
            {
                movieList.slice(page*25-25, page*25).map((movie) => {
                    return (
                        <div className='w-10/12 h-max rounded-3xl py-3 px-2 bg-slate-400 p-2' key={movie.id}>
                            <div className='w-5/12 h-max'>
                                <p>
                                    {
                                        movie.Torrent.startsWith('https://yts.mx')
                                            ? movieDetails?.Name
                                            : movie?.Name
                                    }
                                </p>
                            </div>
                            <div className=''>

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
