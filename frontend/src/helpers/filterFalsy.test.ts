import { filterFalsy } from "./filterFalsyValues";

describe("filterFalsy", () => {
    test("returns without null", () => {
        expect(filterFalsy([1, 2, 3, null, null])).toHaveLength(3);
    });
});
