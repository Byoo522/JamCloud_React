import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal'; // added
import { getAlbums, deleteAlbums, createAlbums } from '../../store/album';
import AddAlbumButton from './AddAlbumButton';
// import * as albumActions from "../../store/album";

import '../AlbumsPage/AlbumsPage.css';



function AlbumsPage({ isLoaded }) {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const userId = sessionUser.id;
  const albums = useSelector((state) => Object.values(state.albums)) // Object.values turns the values of albums into an array
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(''); // added
  const [imageUrl, setImageUrl] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    // const albumToDelete = { userId, title, imageUrl }
    // albumToDelete.destroy();
    history.push('/');
    return dispatch(deleteAlbums({ userId, title, imageUrl }))
  };

  // const handleEdit =


  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(getAlbums())
    dispatch(deleteAlbums())
  }, [dispatch])


  return (
    <>
      <h1 className="album-page-head">Your Albums</h1>
      <div className="album-page-container">
        {albums.map((album) =>
          <div className="album-page-card-container">
            <div className="card" style={{ backgroundImage: `url('${album.imageUrl}')` }} ></div>
            <div className="album-content">
              {album.title}
              <button type="submit" className="edit-button">Edit</button>
              <button type="submit" className="delete-button" onSubmit={handleDelete}>Delete</button>
            </div>
          </div>)}
        <button className="add-album" onClick={() => setShowModal(true)}>Add Album Cover</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddAlbumButton />
          </Modal>
        )}

      </div>
    </>
  )
}


export default AlbumsPage;
