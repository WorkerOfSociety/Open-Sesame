import { uppercase_exist } from "../lib/rules"

describe("Testing rules check functions", () => {
    test("Testing uppercase", () => {
        const empty = "";
        const undercase = "dgasuidgasudg";
        const uppercase = "asdasgdasGTYUdasdasd";
        expect(uppercase_exist(empty)).toBeFalsy();
        expect(uppercase_exist(undercase)).toBeFalsy();
        expect(uppercase_exist(uppercase)).toBeTruthy();
    });    
});
