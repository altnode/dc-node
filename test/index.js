import assert from "power-assert";
import index from "../src";
import DCNode from "../src/DCNode";

describe("index", () => {
  it("exports", () => {
    assert(index === DCNode);
  });
});
