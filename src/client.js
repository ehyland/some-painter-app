/* eslint no-console: 0 */
import React from "react";
import ReactDom from "react-dom";
import app from "./app";

window.debugLib = require("debug");
window.debugLib.enable("painter:*");
const debug = window.debugLib("painter:client");

const mountNode = document.getElementById("app");
const dehydratedState = window.__INITIAL_STATE__;

renderApp();

function renderApp() {
  debug("Rehydrating state...", dehydratedState);

  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw err;
    }

    debug("State has been rehydrated");

    const Root = app.getComponent();

    ReactDom.render(<Root context={ context.getComponentContext() } />, mountNode, () => {
      debug("Root component has been mounted");
    });
  });
}
