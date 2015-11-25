import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import {RouteStore} from "fluxible-router";

import EventStore from "./stores/EventStore";
import GalleryStore from "./stores/GalleryStore";

import routes from "./routes";
import Root from "./containers/Root";

const app = new Fluxible({
  component: Root
});

app.plug(fetchrPlugin({
    xhrPath: '/api' // Path for XHR to be served from
}));

// Register stores
app.registerStore(RouteStore.withStaticRoutes(routes));
app.registerStore(EventStore);
app.registerStore(GalleryStore);

export default app;
