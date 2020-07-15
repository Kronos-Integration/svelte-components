<script>
  import { Route } from "svelte-guard-history-router";
  import { Endpoint } from "@kronos-integration/endpoint";
  import { Interceptor } from "@kronos-integration/interceptor";
  import { Service } from "./service.mjs";
  import ServicesPage from "./ServicesPage.svelte";

  export let services;
</script>

<Route path="service" component={ServicesPage}>
  <Route
    path="/:service"
    objectInstance={Service}
    propertyMapping={{ service: 'name' }}>
    <Route path="/endpoint">
      <Route
        path="/:endpoint"
        objectInstance={Endpoint}
        propertyMapping={{ endpoint: 'name' }}>
        <Route path="interceptor">
          <Route
            path="/:interceptor"
            objectInstance={Interceptor}
            propertyMapping={{ interceptor: 'type' }} />
        </Route>
      </Route>
    </Route>
  </Route>
</Route>
