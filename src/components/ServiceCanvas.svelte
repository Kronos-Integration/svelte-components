<script>
  import { setContext } from "svelte";
  import { SERVICES } from "../util.mjs";
  import Service from "./Service.svelte";
  import Connection from "./Connection.svelte";
  import Request from "./Request.svelte";
  import { getAttributes } from "model-attributes";

  let { services } = $props();

  setContext(SERVICES, services);

  function serviceAction(event) {
    const service = event.detail?.service?.name;

    if (service) {
      services.serviceStore.set({
        service,
        action: "start"
      });
    }
  }

  function endpointAction(event) {
    alert(event.detail.endpoint);

    services.serviceStore.set({
      action: "insert",
      service: event.detail.endpoint.owner.name,
      endpoint: event.detail.endpoint.name,
      interceptors: [{ type: "live-probe" }]
    });
  }

  function interceptorAction(event) {
    const interceptor = event.detail.interceptor;
    let atts = getAttributes(interceptor, interceptor.configurationAttributes);
    const str =
      `${interceptor.type}\n` +
      Object.entries(atts)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

    alert(str);
  }
</script>

<svg viewbox="0 0 {services.width} {services.height}">
  <defs>
    <symbol id="interceptor" y="-3">
      <path d="M0 -3L6 6L0 6L6 -3z" />
    </symbol>
    <symbol id="live-probe" y="-78" viewbox="0 0 1200 1200">
      <path
        d="M2.25 10C2.25 5.71979 5.71979 2.25 10 2.25C14.2802 2.25 17.75 5.71979 17.75 10C17.75 14.2802 14.2802 17.75 10 17.75C5.71979 17.75 2.25 14.2802 2.25 10Z"
        fill="black"
      />
      <path
        d="M16.8214 15.618C17.1645 15.2749 17.7044 15.2276 18.1019 15.5059L21.9536 18.2021C22.8451 18.8261 22.957 20.1037 22.1875 20.8731L21.8731 21.1875C21.1037 21.957 19.8261 21.8451 19.2021 20.9536L16.5059 17.1019C16.2276 16.7044 16.2749 16.1645 16.618 15.8214L16.8214 15.618Z"
        fill="black"
      />
    </symbol>
    <symbol id="ctx" y="-3">
      <path d="M0 -3L6 6L0 6L6 -3z" />
    </symbol>
    <symbol id="ctx-jwt-verify" y="-78" viewbox="0 0 1200 1200">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.25 8C7.25 5.37665 9.37665 3.25 12 3.25C14.6234 3.25 16.75 5.37665 16.75 8V9.3525C17.0611 9.40539 17.3506 9.48823 17.6271 9.62137C18.3925 9.98997 19.01 10.6075 19.3786 11.3729C19.5844 11.8002 19.67 12.2587 19.7106 12.7797C19.75 13.2859 19.75 13.91 19.75 14.6837V14.7457C19.75 15.7853 19.75 16.6092 19.6982 17.2743C19.6453 17.9543 19.5349 18.5309 19.2796 19.0609C18.8127 20.0305 18.0305 20.8127 17.0609 21.2796C16.5309 21.5349 15.9543 21.6453 15.2743 21.6982C14.6092 21.75 13.7853 21.75 12.7457 21.75H11.2543C10.2147 21.75 9.39078 21.75 8.72566 21.6982C8.04571 21.6453 7.46914 21.5349 6.93905 21.2796C5.96954 20.8127 5.18729 20.0305 4.7204 19.0609C4.46512 18.5309 4.35472 17.9543 4.30178 17.2743C4.24999 16.6092 4.25 15.7853 4.25 14.7457V14.6837C4.24999 13.91 4.24999 13.2859 4.2894 12.7797C4.32996 12.2587 4.41561 11.8002 4.62137 11.3729C4.98997 10.6075 5.60753 9.98997 6.37294 9.62137C6.64939 9.48823 6.93893 9.40539 7.25 9.3525V8ZM15.25 8V9.25331C14.9657 9.24999 14.6554 9.25 14.3163 9.25H9.68375C9.34468 9.25 9.03427 9.24999 8.75 9.25331V8C8.75 6.20507 10.2051 4.75 12 4.75C13.7949 4.75 15.25 6.20507 15.25 8ZM14 14C14 14.784 13.5489 15.4626 12.8921 15.7905L13.1913 17.5856C13.2814 18.1261 13.3264 18.3964 13.1766 18.5732C13.0268 18.75 12.7529 18.75 12.2049 18.75H11.7951C11.2471 18.75 10.9732 18.75 10.8234 18.5732C10.6736 18.3964 10.7186 18.1261 10.8087 17.5856L11.1079 15.7905C10.4511 15.4626 10 14.784 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z"
        fill="black"
      />
    </symbol>
    <symbol id="ctx-body-param" y="-3">
      <path d="M0 -3L6 6L0 6L6 -3z" />
    </symbol>

    <marker
      id="arrow"
      viewBox="0 0 8 8"
      refX="2"
      refY="3"
      markerWidth="4"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0 0L6 3L0 6z" />
    </marker>
    <marker
      id="dot"
      viewBox="0 0 8 8"
      refX="4"
      refY="4"
      markerWidth="4"
      markerHeight="4"
    >
      <circle cx="4" cy="4" r="3" />
    </marker>
  </defs>

  <g class="services">
    {#each Object.values(services.services) as service}
      <Service {service} {endpointAction} {interceptorAction} {serviceAction} />
    {/each}
  </g>

  <g class="connections">
    {#each services.connections as [from, to]}
      <Connection {from} {to} />
    {/each}
  </g>

  <g class="requests">
    {#each services.requests as request}
      <Request {request} />
    {/each}
  </g>
</svg>
