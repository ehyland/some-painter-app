import Fluxible from "fluxible";
import batchedUpdatePlugin from "fluxible-addons-react/batchedUpdatePlugin";
import fetchrPlugin from "fluxible-plugin-fetchr";
import {RouteStore} from "fluxible-router";

import EventStore from "./stores/EventStore";
import GalleryStore from "./stores/GalleryStore";
import LocationStore from "./stores/LocationStore";
import AppConfigStore from "./stores/AppConfigStore";
import SubmitEventStore from "./stores/SubmitEventStore";

import routes from "./routes";
import Root from "./containers/Root";

const app = new Fluxible({
  component: Root
});

app.plug(fetchrPlugin({
  xhrPath: "/api" // Path for XHR to be served from
}));
app.plug(batchedUpdatePlugin());

// Register stores
app.registerStore(RouteStore.withStaticRoutes(routes));
app.registerStore(EventStore);
app.registerStore(GalleryStore);
app.registerStore(LocationStore);
app.registerStore(AppConfigStore);
app.registerStore(SubmitEventStore);

export default app;
