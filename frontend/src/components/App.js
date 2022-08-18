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

  function handleUpdateUser({ name, about }) {
    api
      .updateProfile({ name, about })
      .then(setCurrentUser)
      .then(handleCloseAllPopups)
      .catch((err) => console.error(`Error: ${err.status}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateProfilePicture({ avatar })
      .then(setCurrentUser)
      .then(handleCloseAllPopups)
      .catch((err) => console.error(`Error: ${err.status}`));
  }

  useEffect(() => {
    api
      .getProfileInfo()
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }, []);

  const [cards, setCards] = useState([]);

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postNewCard({ name, link })
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
      .catch((err) => {
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
      .catch((err) => {
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
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      ).catch((err) => console.error(`Error: ${err.status}`));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
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
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => console.error(`Error: ${err.status}`));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && isLoggedIn) {
      api
        .getAppInfo(token)
        .then(([cardData, userData]) => {
          setCurrentUser(userData.data);
          setCards(cardData.data);
        })
        .catch((err) => console.error(`Error: ${err.status}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, [history]);

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
