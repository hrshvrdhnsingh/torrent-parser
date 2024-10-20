/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import PaginationComponent from '../components/Pagination.js';
import MovieDetails from '../components/MovieDetails.js';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null)
    const [allResults, setAllResults] = useState([])
    const location = useLocation()

    let tempResults = []
    const keywords = ['yts', 'torlock', 'piratebay', 'rarbg', 'kickass'];

    const changeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(searchTerm)

        await TorrentSearcher(searchTerm)
        await DetailsSearcher(searchTerm)
    }

    const isRelevant = (result, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const title = result.Name ? result.Name.toLowerCase() : "";
        const genre = result.Genre ? result.Genre.toLowerCase() : "";
    
        return title.includes(lowerCaseSearchTerm) || genre.includes(lowerCaseSearchTerm);
    };
    
    const relevanceScore = (result, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const title = result.Name ? result.Name.toLowerCase() : "";
        const genre = result.Genre ? result.Genre.toLowerCase() : "";
    
        let score = 0;
    
        if (title === lowerCaseSearchTerm) score += 5; 
        else if (title.includes(lowerCaseSearchTerm)) score += 3;
    
        if (genre.includes(lowerCaseSearchTerm)) score += 2;
    
        return score;
    };

    const DetailsSearcher = async (searchTerm) => {
        const query = encodeURIComponent(searchTerm)
        const DETAILS_URL = process.env.REACT_APP_DETAILS_URL;

        const response = await fetch(DETAILS_URL + `&t=${query}`)
        const data = await response.json()
        setMovieDetails(data);
    }
    const TorrentSearcher = async (searchTerm) => {
        const query = encodeURIComponent(searchTerm)
        const BASE_URL = process.env.REACT_APP_MAGNET_URL;
        for (const keyword of keywords) {
            try {
                setLoading(true);
                const response = await fetch(BASE_URL + `/${keyword}/${query}`);

                if(!response.ok) {
                    console.log("Something happened")
                    continue;
                }

                const data = await response.json();
                console.log("Individual data -> ", keyword, data)
                if (keyword === "yts") { // has the movie details
                    data.forEach(result => {
                        if (result.Files && result.Files.length > 0) {
                            tempResults.push(...result.Files);
                        }
                    });
                }
                // They have different structure of the result
                else if(keyword === "piratebay" || keyword === 'rarbg' || keyword === 'kickass' || keyword === 'torlock') {
                    console.log("Piratebay data -> ", data);
                    tempResults = [...tempResults, ...data.filter(result => isRelevant(result, searchTerm))]
                }
                else 
                    tempResults = [...tempResults, ...data.results.filter(result => isRelevant(result, searchTerm))];
            } 
            catch (error) {
                console.error(`Error fetching data for keyword: ${keyword}`, error);
            }
        }
        tempResults.sort((a, b) => {
            if (b.Seeders !== a.Seeders) {
                return b.Seeders - a.Seeders;  // Sort by seeders in descending order
            } else {
                return a.Leechers - b.Leechers;  // If seeders are equal, sort by leechers in descending order
            }
        });
        setAllResults(tempResults);
        console.log("Temp Resulst->", tempResults)
        console.log("All result -> ", allResults)
        setLoading(false);
    }
    useEffect(() => {
        if (allResults.length > 0) {
            console.log("All results have been updated", allResults);
        }
    }, [allResults])
     return (
        <div className='z-50 w-screen flex flex-col items-center min-h-screen'>
            <div className='w-full navbar flex justify-center items-center fixed z-[999]'>
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
            {
                movieDetails !== null && !loading && <MovieDetails movieDetails={movieDetails} />
            }
            <div className='w-9/12 flex justify-center items-center min-h-screen'>
                {
                    loading && (
                        <div className='absolute top-0 z-[100] left-0 w-screen h-screen bg-neutral-900 bg-opacity-90'>
                            <div className='loader'>
                                <div className='inner'></div>
                            </div>
                        </div>
                    )
                }
                {
                    allResults.length > 0 && (<PaginationComponent movieList={allResults} movieDetails={movieDetails}/>)
                }
            </div>
        </div>
    )
}

export default Search