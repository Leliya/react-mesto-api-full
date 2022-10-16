import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationDeletePopup from "./ConfirmationDeletePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { getContent, authorize, register, signout } from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopup, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, updateCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [dataAuth, setDataAuth] = React.useState({ email: "", password: "" });
  const [regInfo, setRegInfo] = React.useState({ isRegOk: true, message: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [emailLoggedin, setEmailLoggedin] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => updateCards(data.cards))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    getContent()
      .then((res) => {
        if (res) {
          setloggedIn(true);
          setEmailLoggedin(res.user.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }, [history, loggedIn]);

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCard(card._id, isLiked)
      .then((res) =>
        updateCards((cards) => cards.map((c) => (c._id === card._id ? res.card : c)))
      )
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    setDeletedCard(card);
    setConfirmPopupOpen(true);
  }

  function handleDeleteConfirmation() {
    setLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        updateCards((cards) => cards.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .postNewCard(data)
      .then((res) => {
        updateCards([res.card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api
      .setUserInfo(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api
      .setAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleRegister() {
    setLoading(true);
    register(dataAuth.email, dataAuth.password)
      .then((res) => {
        if (res) {
          setRegInfo({
            isRegOk: true,
            message: "Вы успешно зарегистрированы!",
          });
          setIsInfoTooltipOpen(true);
          setTimeout(() => {
            setIsInfoTooltipOpen(false);
            history.push("./sign-in");
          }, 2500);
        }
      })
      .catch((err) => {
        console.log(err)
        setRegInfo({
          isRegOk: false,
          message: err,
          //message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogin() {
    setLoading(true);
    authorize(dataAuth.email, dataAuth.password)
      .then(() => {
        setDataAuth({ email: "", password: "" });
        setloggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setRegInfo({
          isRegOk: false,
          message: err,
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setLoading(false));
  }

  function handleChangeAuthData(input, value) {
    setDataAuth({ ...dataAuth, [input]: value });
  }

  function handleSignOut() {
    signout()
      .then(() => {
        setloggedIn(false);
        history.push("/sign-in");
        setEmailLoggedin("");
      }).catch((err) => {
        console.log(err);
      })
  }

  function handlerCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (regInfo.isRegOk) {
      history.push("/sign-in");
    }
    setRegInfo({ isRegOk: false, message: "" });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          email={emailLoggedin}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              isLoading={isLoading}
              email={dataAuth.email}
              password={dataAuth.password}
              onChange={handleChangeAuthData}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
              isLoading={isLoading}
              email={dataAuth.email}
              password={dataAuth.password}
              onChange={handleChangeAuthData}
            />
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <Route path="*">
          <Redirect to="/sign-in" />
        </Route>
        <InfoTooltip
          isRegOk={regInfo.isRegOk}
          isOpen={isInfoTooltipOpen}
          onClose={handlerCloseInfoTooltip}
          message={regInfo.message}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmationDeletePopup
          isOpen={isConfirmPopup}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteConfirmation}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
