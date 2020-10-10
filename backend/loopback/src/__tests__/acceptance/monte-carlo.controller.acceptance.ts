import { Client } from "@loopback/testlab";
import assert from "assert";

import { LoopbackApplication } from "../..";
import { setupApplication } from "./test-helper";

describe('MonteCarloController', () => {
  let app: LoopbackApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /positive/1000', async () => {
    const res = await client.get('/positive/1000').expect(200);
    const points = res.body.points;
    assert(Array.isArray(points));
    assert(points.length === 1000);
    assert(points.every((p) => p.x >= 0 && p.y >= 0));
  });

  it('invokes GET /whole/1000', async () => {
    const res = await client.get('/whole/1000').expect(200);
    const points = res.body.points;
    assert(Array.isArray(points));
    assert(points.length === 1000);
  });
});
