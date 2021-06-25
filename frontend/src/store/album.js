// Define Action Types as Constants
const SET_ALBUMS = 'albums/SET_ALBUMS';

// Define Action Creators
const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
})

// Define Thunks
export const getAlbums = () => async (dispatch) => {
  const res = await fetch('/api/albums');
  const albums = await res.json();
  dispatch(setAlbums(albums));
}

// Define an Initial State
const initialState = {};

// Define a Reducer
const albumsReducer = (state = initialState, action) => {
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
    default:
      return state
  }
};

// Export the Reducer
export default albumsReducer;
