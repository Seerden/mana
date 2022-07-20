describe("test environment", () => {
   it("resolves environment variable", () => {
      expect(process.env.IS_TEST_ENVIRONMENT).toEqual("true");
   });
});
