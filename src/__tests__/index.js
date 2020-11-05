import { PromiseAll } from "../index";

describe("PromiseAll tests", () => {
  test("Resolve for one promise", async () => {
    const result = await PromiseAll([getRandomlyResolvedPromise()]);
    expect(result).toEqual(["resolved!"]);
  });

  test("Resolve for couple promises", async () => {
    const result = await PromiseAll([
      getRandomlyResolvedPromise(),
      getRandomlyResolvedPromise(),
      getRandomlyResolvedPromise(),
      getRandomlyResolvedPromise(),
      getRandomlyResolvedPromise()
    ]);
    expect(result).toEqual([
      "resolved!",
      "resolved!",
      "resolved!",
      "resolved!",
      "resolved!"
    ]);
  });

  test("Rejects for one rejected promise", async () => {
    try {
      await PromiseAll([getRandomlyRejectedPromise()]);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Rejects for couple rejected promises", async () => {
    try {
      await PromiseAll([
        getRandomlyRejectedPromise(),
        getRandomlyRejectedPromise(),
        getRandomlyRejectedPromise()
      ]);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Rejects for any rejected promise", async () => {
    try {
      await PromiseAll([
        getRandomlyResolvedPromise(),
        getRandomlyRejectedPromise(),
        getRandomlyResolvedPromise()
      ]);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

function getRandomlyResolvedPromise() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("resolved!"), getRandomTimeout())
  );
}

function getRandomlyRejectedPromise() {
  return new Promise((_resolve, reject) =>
    setTimeout(() => reject("rejected!"), getRandomTimeout())
  );
}

function getRandomTimeout() {
  const MAX = 1200;
  return Math.floor(Math.random() * MAX) + 1;
}
