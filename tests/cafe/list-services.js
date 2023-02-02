import { Selector, ClientFunction } from "testcafe";

const getLocation = ClientFunction(() => window.location.href);
const goBack = ClientFunction(() => window.history.back());

const base = "http://localhost:5173/";

fixture`Getting Started`.page`${base}`;

test("list services", async t => {
/*
  const service = Selector(".service");
  await t.expect(service.innerText).contains("logger");
*/

  const adminServiceExists = Selector('#admin').exists;
  await t.expect(adminServiceExists).ok();
  await t.takeScreenshot();
/*
  const endpointExists = Selector('#service(logger).log').exists;
  await t.expect(endpointExists).ok();
*/
});
