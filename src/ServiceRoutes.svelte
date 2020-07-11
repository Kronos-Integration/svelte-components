<script>
  import { Route } from "svelte-guard-history-router";
  import { Endpoint } from "@kronos-integration/endpoint";
  import { Service } from "./service.mjs";

  import ServicesPage from "./ServicesPage.svelte";
</script>


<Route path="service" objectInstance={Service} component={ServicesPage}>
  <Route path="/:service" propertyMapping={{ service: "name" }}>
    <Route path="/endpoint" objectInstance={Endpoint} component={}>
      <Route path="/:endpoint" propertyMapping={{ endpoint: "name" }}/>
    </Route>
  </Route>
</Route