import React, { useState } from 'react'
import MovieCard from './MovieCard';

const PaginationComponent = ({movieList}) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(movieList.length/25);
    return (
        <div className='w-full h-max p-4 flex justify-center items-center'>
            {
                movieList.slice(page*25-25, page*25).map((movie) => {
                    return (
                        <div className='w-10/12 h-max rounded-3xl py-3 px-2'>

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
