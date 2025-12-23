import axios from 'axios'
import React, { useState } from 'react'

const MovieForm = () => {
    const [movieData, setMovieData] = useState({movieName: '', desc: '', year: '', actor: '', director: '', ratings: ''}) 
    const [movie, setMovies] = useState([])

    const handleMovieSubmit = async (e) => {
        e.prevetDefault()

        await axios.post('http://localhost:3000/admin/createMovie', movieData).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
        })
    }

    const movieNameChange = (e) => {
        setMovieData((prev) => { return {...prev, movieName: e.target.value}})
    }

    const descChange = (e) => {
        setMovieData((prev) => {return {...prev, desc: e.target.value}})
    }

  return (
    <div className='movie-form-container'>
      <form onSubmit={handleMovieSubmit} className='movie-form' action="">
        <div className='input-container'>
            <label htmlFor="">Movie Name</label>
            <input 
            value={movieData.movieName}
            onChange={movieNameChange}
            className='input' type="text" />
        </div>
        <div className='input-container'>
            <label htmlFor="">About Movie</label>
            <input 
            onChange={descChange}
            className='input' 
            type="text" />
        </div>
        <div className='input-container'>
            <label htmlFor="">Year of Release</label>
            <input  className='input'type="date" />
        </div>
        <div className='input-container'>
            <label htmlFor="">Actor</label>
            <input className='input' type="text" />
        </div>
        <div className='input-container'>
            <label htmlFor="">Director</label>
            <input className='input' type="text" />
        </div>
        <div className='input-container'>
            <label htmlFor="">Ratings</label>
            <input className='input' type="Number" />
        </div>

        <button type='submit' >
            submit
        </button>
      </form>
    </div>
  )
}

export default MovieForm
