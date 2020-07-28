import { Selector, ClientFunction } from "testcafe";

const getLocation = ClientFunction(() => window.location.href);
const goBack = ClientFunction(() => window.history.back());

const base = "http://localhost:5000/";

fixture`Getting Started`.page`${base}/index.html`;

test("list services", async t => {
  const service = Selector(".service");

  await t.expect(service.innerText).contains("logger (logger)");
});
