/* eslint no-console: 0 */
import React from "react";
import app from "./app";

window.debug = require("debug");
const debug = window.debug("painter:client");

const mountNode = document.getElementById("app");
const dehydratedState = window.__INITIAL_STATE__;

function renderApp() {
  debug("Rehydrating state...", dehydratedState);

  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw err;
    }

    debug("State has been rehydrated");

    const Root = app.getComponent();

    React.render(<Root context={ context.getComponentContext() } />, mountNode, () => {
      debug("Root component has been mounted");
    });
  });
}
