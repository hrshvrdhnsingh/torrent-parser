import React, { useState } from 'react'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState("");
    
    const changeHandler = (e) => {
        setSearchTerm(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(searchTerm)


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

            </div>
        </div>
    )
}

export default Search
