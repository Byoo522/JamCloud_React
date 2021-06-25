// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HeadBanner from "./components/HeadBanner";
import AlbumCard from "./components/AlbumCard";
import AlbumsPage from './components/AlbumsPage'
// import SignupFormPage from "./components/SignupFormPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <HeadBanner />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AlbumCard />
          </Route>
          <Route path="/albums">
            <AlbumsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
