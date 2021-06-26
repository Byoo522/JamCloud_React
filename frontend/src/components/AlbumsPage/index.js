import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/album';


import '../AlbumsPage/AlbumsPage.css';



function AlbumsPage() {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums)) // Object.values turns the values of albums into an array
  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])


  return (
    <>
      <h1 className="album-page-head">Your Albums</h1>
      <div className="album-page-container">
        {albums.map((album) =>
          <div className="album-page-card-container">
            <div className="card" style={{ backgroundImage: `url("${album.imageUrl}")` }} ></div>
            <div className="album-content">{album.title}</div>
          </div>)}
        <button className="add-album">Add Album Cover</button>
      </div>
    </>
  )
}


export default AlbumsPage;
