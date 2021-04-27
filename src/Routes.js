import React from "react";
import { Switch } from "react-router-dom";

import Home from "./pages/Home/";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";
import RouteHandler from "./components/RouterHandler";

// eslint-disable-next-line
export default ({ setModalClass, openModal, actualModalClass }) => {
  return (
    <Switch>
      <RouteHandler exact path="/">
        <Home />
      </RouteHandler>
      <RouteHandler exact path="/about">
        <About />
      </RouteHandler>
      <RouteHandler exact path="/signin">
        <SignIn />
      </RouteHandler>
      <RouteHandler exact path="/signup">
        <SignUp />
      </RouteHandler>
      <RouteHandler exact path="/ad/:id">
        <AdPage />
      </RouteHandler>
      <RouteHandler private exact path="/post-an-ad">
        <AddAd />
      </RouteHandler>
      <RouteHandler exact path="/ads">
        <Ads />
      </RouteHandler>
      <RouteHandler exact path="/my-account">
        <Profile
          setModalClass={setModalClass}
          openModal={openModal}
          actualModalClass={actualModalClass}
        />
      </RouteHandler>
      <RouteHandler>
        <NotFound />
      </RouteHandler>
    </Switch>
  );
};