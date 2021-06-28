import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import * as albumActions from "../../store/album";
// import { restoreUser, requireAuth } from "../../../../backend/utils/auth";
import { useDispatch, useSelector } from "react-redux";


function AddAlbumButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const sessionUser = useSelector(state => state.session.user)
  const userId = sessionUser.id;


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/');
    return dispatch(albumActions.createAlbums({ userId, title, imageUrl }))
  };


  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="app-title">Add Album Cover</h1>
      <div >
        <label id="inputs" className="label-1">
          Title
          <input
            type="text"
            className="input-1"
            placeholder="Album Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className="label-2">
          imageUrl
          <input
            type="text"
            className="input-2"
            value={imageUrl}
            placeholder="Image Url (300 x 300)"
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Add Album</button>
    </form >
  )
}

export default AddAlbumButton;
