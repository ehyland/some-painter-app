import React from "react";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import {navigateAction} from "fluxible-router";

import HTML from "./containers/HTML";
import app from "./app";

// Get assets to inject
let css, scripts, buildConfig, stats;
if(process.env.NODE_ENV === "development") {
  buildConfig = require("../webpack/dev.config");
  scripts = ["bundle.js"];
  css = [];
}
else {
  stats = require("../static/build/stats.json");
  buildConfig = require("../webpack/prod.config");
  scripts = stats.main.js;
  css = stats.main.css;
}

// Prefix with public path
css = css.map(fileName => buildConfig.output.publicPath + fileName);
scripts = scripts.map(fileName => buildConfig.output.publicPath + fileName);

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
        css={ css }
        scripts={ scripts }
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
