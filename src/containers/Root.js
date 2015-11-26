import React, {Component, PropTypes} from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";
import Immutable from "immutable";

import Page from "./Page";
import NotFoundPage from "./NotFoundPage";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

if (process.env.BROWSER) {
  require("../styles/main.scss");
}

@provideContext
@handleHistory
class Root extends Component {
  static propTypes = {
    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    })
  }

  render() {
    const {currentRoute, currentNavigateError, isNavigateComplete} = this.props;
    const Handler = currentRoute && currentRoute.handler;

    let content;

    if (!Handler || (currentNavigateError && currentNavigateError.statusCode === 404)) {
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      content = <ErrorPage err={ currentNavigateError } />;
    }
    else if (!isNavigateComplete) {
      content = <LoadingPage />;
    }
    else {
      const params = currentRoute.params;
      content = <Handler {...params} />;
    }

    return (
      <Page>
        { content }
      </Page>
    );
  }
}

export default Root;
