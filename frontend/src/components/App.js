import "../index.css";
import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import * as auth from "../utils/auth.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import InfoToolTip from "./InfoToolTip";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";

function App() {
  //______________________________________________________________________//
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [toolTipStatus, setToolTipStatus] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  console.log("TOP CURRENT USER: ", currentUser);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && isLoggedIn) {
      api
        .getAppInfo(token)
        .then(([userData, cardData]) => {
          setCurrentUser(userData.data);
          setCards(cardData);
        })
        .catch((err) => console.error(`Error: ${err.status}`));
    }
  }, [isLoggedIn]);

  function handleUpdateUser({ name, about }) {
    const token = localStorage.getItem("jwt");
    api
      .updateProfile({ name, about }, token)
      .then((newProfile) => {
        setCurrentUser(newProfile.data);
        console.log("newProfile", newProfile.data);
      })
      .then(handleCloseAllPopups)
      .catch((err) => console.error(`Error: ${err.status}`));
  }

  function handleUpdateAvatar({ avatar }) {
    const token = localStorage.getItem("jwt");
    api
      .updateProfilePicture({ avatar }, token)
      .then((newAvatar) => {
        setCurrentUser(newAvatar.data);
      })
      .then(handleCloseAllPopups)
      .catch((err) => console.error(`Error: ${err.status}`));
  }

  const [cards, setCards] = useState([]);

  console.log("GENERAL CARDS, SETCARDS", cards, setCards);

  function handleAddPlaceSubmit({ name, link }) {
    const token = localStorage.getItem("jwt");
    api
      .postNewCard({ name, link }, token)
      .then((generatedCard) => {
        setCards([generatedCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setToolTipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch(() => {
        setToolTipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        localStorage.setItem("jwt", res.token);
        history.push("/");
      })
      .catch(() => {
        setToolTipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  function handleCardLike(card) {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, token).then((newCard) => {
      setCards((state) => {
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard.data : currentCard
        );
      }).catch((err) => console.error(`Error: ${err.status}`));
    });
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem("jwt");
    api
      .deleteCard(card, token)
      .then((deleteCard) => {
        setCards((currentCards) =>
          currentCards.filter(
            (currentCard) => currentCard._id !== deleteCard._id
          )
        );
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    api
      .getProfileInfo(token)
      .then((profile) => {
        setCurrentUser(profile.data);
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    api
      .getInitialCards(token)
      .then((card) => {
        setCards(card);
        console.log("useEFFECT CARD: ", card);
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setEmail(email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handlePreviewPopupClick() {
    setIsPreviewPopupOpen(true);
  }
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }
  console.log("CURRENT USER: ", currentUser);
  //________________________________________________________________________//
  //

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <section className="page">
          <Header email={email} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
              <Main
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onPreviewPopupClick={handlePreviewPopupClick}
                onCardClick={handleCardClick}
                onCardDeleteClick={handleDeleteCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onSignOut={onSignOut}
              />
            </ProtectedRoute>
            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <ImagePopup
            isOpen={isPreviewPopupOpen}
            card={selectedCard}
            onClose={handleCloseAllPopups}
          />
          <EditProfilePopup
            submitBtnText="Save"
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Are you sure?"
            submitBtnText="Yes"
            isOpen={isDeleteCardPopupOpen}
            onClose={handleCloseAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={handleCloseAllPopups}
            status={toolTipStatus}
          />
          <Footer />
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
