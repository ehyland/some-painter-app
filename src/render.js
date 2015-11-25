import React from "react";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import {navigateAction} from "fluxible-router";

import HTML from "./containers/HTML";
import app from "./app";

function renderResponse(req, res, context, next) {
  try {
    const state = "window.__INITIAL_STATE__=" + serialize(app.dehydrate(context)) + ";";
    const Root = app.getComponent();

    // Render the Root to string
    const content = ReactDOMServer.renderToString(
      <Root context={ context.getComponentContext() } />
    );

    // The root component is rendered as static markup and sent as response.
    const html = ReactDOMServer.renderToStaticMarkup(
      <HTML
        context={ context.getComponentContext() }
        state={ state }
        content={ content }
      />
    );
    const doctype = "<!DOCTYPE html>";
    res.send(doctype + html);
  }
  catch (e) {
    next(e);
  }
}

export default function(req, res, next) {
  // Create a fluxible context (_csrf is needed by the fetchr plugin)
  const context = app.createContext({
    req: req,
    xhrContext: {
      _csrf: req.csrfToken()
    }
  });

  Promise.all([
    context.executeAction(navigateAction, { url: req.url })
  ])
    .then(() => renderResponse(req, res, context, next))
    .catch(err => {
      if (err.statusCode || err.status) {
        renderResponse(req, res, context, next);
        return;
      }
      next(err);
    });
}
