import Fluxible from "fluxible";
import {RouteStore} from "fluxible-router";

import routes from "./routes";
import Root from "./containers/Root";

const app = new Fluxible({
  component: Root
});

// Register stores
app.registerStore(RouteStore.withStaticRoutes(routes));

export default app;
