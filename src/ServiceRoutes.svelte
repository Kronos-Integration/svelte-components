<script>
  import { Route } from "svelte-guard-history-router";
  import { Endpoint } from "@kronos-integration/endpoint";
  import { Interceptor } from "@kronos-integration/interceptor";
  import { Service } from "./service.mjs";
  import ServicesPage from "./ServicesPage.svelte";
</script>

<Route path="service" component={ServicesPage} objectInstance={Service}>
  <Route path="/:service" propertyMapping={{ service: 'name' }}>
    <Route path="/endpoint" objectInstance={Endpoint}>
      <Route path="/:endpoint" propertyMapping={{ endpoint: 'name' }}>
        <Route path="interceptor" objectInstance={Interceptor}>
          <Route
            path="/:interceptor"
            propertyMapping={{ interceptor: 'type' }} />
        </Route>
      </Route>
    </Route>
  </Route>
</Route>
