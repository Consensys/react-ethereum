import { createEthereumContext } from "..";

// TODO: add more tests

describe("createEthereumContext", () => {
  it("is truthy", () => {
    const Context = createEthereumContext();
    expect(Context).toBeTruthy();
  });
});
