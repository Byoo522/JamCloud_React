// Import hooks from 'react'. Which hook is meant for causing side effects?
// Import hooks from react-redux;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import the action here
import { getAlbums } from '../../store/album';
import '../AlbumCard/AlbumCard.css';

function AlbumCard() {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums)) // Object.values turns the values of albums into an array

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  return (
    <>
      <h1 className="album-header">Upload Your Music.</h1>
      <div className="album-card-container">
        <div className="card-container">
          <div className="card-1" ></div>
          <div className="card-content">The Beatles</div>
        </div>
        <div className="card-container">
          <div className="card-2"></div>
          <div className="card-content">Elvis Presley</div>
        </div>
        <div className="card-container">
          <div className="card-3"></div>
          <div className="card-content">Eagles</div>
        </div>
        <div className="card-container">
          <div className="card-4"></div>
          <div className="card-content">Michael Jackson</div>
        </div>
        <div className="card-container">
          <div className="card-5"></div>
          <div className="card-content">Led Zeppelin</div>
        </div>
        <div className="card-container">
          <div className="card-6"></div>
          <div className="card-content">Jay-Z</div>
        </div>
        <div className="card-container">
          <div className="card-7"></div>
          <div className="card-content">Eminem</div>
        </div>
        <div className="card-container">
          <div className="card-8"></div>
          <div className="card-content">Mariah Carey</div>
        </div>
        <div className="card-container">
          <div className="card-9"></div>
          <div className="card-content">Metallica</div>
        </div>
        <div className="card-container">
          <div className="card-10"></div>
          <div className="card-content">Queen</div>
        </div>
        <div className="card-container">
          <div className="card-11"></div>
          <div className="card-content">Kanye West</div>
        </div>
        <div className="card-container">
          <div className="card-12"></div>
          <div className="card-content">Illenium</div>
        </div>
      </div>
    </>
  )
}

export default AlbumCard;
