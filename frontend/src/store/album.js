import { csrfFetch } from "./csrf";
// Define Action Types as Constants
export const SET_ALBUMS = 'albums/SET_ALBUMS';
export const ADD_ALBUMS = 'albums/ADD_ALBUMS';
// export const EDIT_ALBUMS = 'albums/EDIT_ALBUMS';
export const REMOVE_ALBUMS = 'albums/REMOVE_ALBUMS';

// Define Action Creators
const setAlbums = (albums, userId) => ({
  type: SET_ALBUMS,
  albums,
})

const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums,
})

// const editAlbums = (albums) => ({
//   type: EDIT_ALBUMS,
//   albums,
// })

const removeAlbums = (albumId) => ({
  type: REMOVE_ALBUMS,
  albumId,
})

// Define Thunks
export const getAlbums = () => async (dispatch) => {
  const res = await csrfFetch('/api/albums');
  const albums = await res.json();
  dispatch(setAlbums(albums));
}


export const createAlbums = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/albums', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    const album = await res.json();
    dispatch(addAlbums(album));
    return album;
  }
}

export const deleteAlbums = albumId => async dispatch => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'delete',
  });

  if (res.ok) {
    const albumToDelete = await res.json();
    dispatch(removeAlbums(albumToDelete));
  }
};

// export const editAlbums = data => async dispatch => {
//   const response = await fetch(`/api/albums/${albumId}`, {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     const item = await response.json();
//     dispatch(editAlbums(data));
//     return item;
//   }
// };



// Define an Initial State
const initialState = {};

// Define a Reducer
const albumsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ALBUMS:
      const allAlbums = {};
      action.albums.forEach((album) => {
        allAlbums[album.id] = album
      });
      return {
        ...state,
        ...allAlbums,
      }

    case ADD_ALBUMS: {
      newState = Object.assign({}, state);
      newState.albums = action.payload;
      return newState;
    }

    case REMOVE_ALBUMS: {
      const newState = { ...state };
      delete newState[action.albumId];
      return newState;
    }

    // case EDIT_ALBUMS: {
    //   return {
    //     ...state,
    //     [action.album.id]: action.album,
    //   };
    // }

    default:
      return state
  }
};

// Export the Reducer
export default albumsReducer;
