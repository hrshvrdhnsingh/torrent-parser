/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import PaginationComponent from '../components/Pagination.js';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [recentResult, setRecentResult] = useState();
    let allResults = [];
    let movieDetails = [];
    const location = useLocation()

    useEffect(() => {
        allResults = []
        movieDetails = []
    },[])
    const keywords = ['1337x', 'yts', 'torlock', 'piratebay', 'rarbg', 'kickass'];

    const changeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(searchTerm)

        await TorrentSearcher(searchTerm)
    }

    const TorrentSearcher = async (searchTerm) => {
        const query = encodeURIComponent(searchTerm)
        const BASE_URL = process.env.REACT_APP_MAGNET_URL;
        console.log(BASE_URL)
        for (const keyword of keywords) {
            try {
                setLoading(true);
                const response = await fetch(BASE_URL + `/${keyword}/${query}`);
                console.log(BASE_URL + `/${keyword}/${query}`);

                if(!response.ok) {
                    console.log("Something happened")
                    return;
                }

                const data = await response.json();
                console.log("Individual data -> ", data)
                if(keyword === "1337x") setRecentResult(data); // Since the data is independent of the query
                else if (keyword === "yts") { // has the movie details
                    // eslint-disable-next-line no-loop-func
                    data.forEach(result => {
                        const { Name, ReleasedDate, Genre, Rating, Likes, Runtime, Language="", Poster } = result;
                        const movieDetail = { Name, ReleasedDate, Genre, Rating, Likes, Runtime, Language, Poster };
                
                        movieDetails.push(movieDetail);
                
                        if (result.Files && result.Files.length > 0) {
                            allResults.push(...result.Files);
                        }
                    });
                }
                // They have different structure of the result
                else if(keyword === "piratebay" || keyword === 'rarbg' || keyword === 'kickass' || keyword === 'torlock') {
                    console.log("Piratebay data -> ", data);
                    allResults = [...allResults, ...data]
                }
                else 
                    allResults = [...allResults, ...data.results];
            } 
            catch (error) {
                console.error(`Error fetching data for keyword: ${keyword}`, error);
            }
        }

        console.log("All result -> ", allResults)
        console.log('Movie Details -> ', movieDetails)
        console.log("Home page -> ", recentResult);
        setSearchResult(allResults);
        setLoading(false);
    }
     return (
        <div className='z-50 w-screen flex flex-col items-center min-h-screen'>
            <div className='w-9/12 flex justify-center items-center'>
                <div className="messageBox w-11/12 mt-4">
                    <form onSubmit={submitHandler} className="fileUploadWrapper w-full">
                        <input required="" value={searchTerm} placeholder="Search for the desired torrents..." type="text" id="messageInput" className='w-full' autoComplete="off" onChange={changeHandler}/>
                    </form>
                    <button id="sendButton" onClick={submitHandler} type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='w-9/12 flex justify-center items-center'>
                {
                    loading && (
                        <div className='absolute top-0 left-0 w-screen h-screen bg-neutral-900 bg-opacity-90'>
                            <div className='loader'>
                                <div className='inner'></div>
                            </div>
                        </div>
                    )
                }
                {
                    !allResults && (<PaginationComponent movieList={recentResult} />)
                }
                {
                    allResults && (<PaginationComponent movieList={allResults} />)
                }

            </div>
        </div>
    )
}

export default Search
