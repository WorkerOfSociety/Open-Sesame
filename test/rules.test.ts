import { 
    uppercase_exist, special_exist, minimum_8, greek_exist, 
    country_exist, video_exist, number_exist, contain_dev
} from "../lib/rules";

import {
    remapKeys, spreadFire
} from "../src/utils";

const empty = "";

describe("Testing rules check functions", () => {
    test("Testing uppercase_exist", () => {
        const undercase = "dgasuidgasudg";
        const uppercase = "asdasgdasGTYUdasdasd";
        expect(uppercase_exist(empty)).toBeFalsy();
        expect(uppercase_exist(undercase)).toBeFalsy();
        expect(uppercase_exist(uppercase)).toBeTruthy();
    });    

    test("Testing special_exist", () => {
        const non_special = "dnaskjdbhnaiwue";
        const special = "Isak!";
        expect(special_exist(empty)).toBeFalsy();
        expect(special_exist(non_special)).toBeFalsy();
        expect(special_exist(special)).toBeTruthy();
    });

    test("Testing number_exist", () => {
        const non_number = "sadoashdasf";
        const with_number = "asdfasflj!9";
        expect(number_exist(empty)).toBeFalsy();
        expect(number_exist(non_number)).toBeFalsy();
        expect(number_exist(with_number)).toBeTruthy();
    });

    test("Testing minimum_8", () => {
        const under = "dsahd";
        const exact = "dksngofö";
        const over = "afsilufhasiuf";
        expect(minimum_8(empty)).toBeFalsy();
        expect(minimum_8(under)).toBeFalsy();
        expect(minimum_8(exact)).toBeTruthy();
        expect(minimum_8(over)).toBeTruthy();
    });

    test("Testing greek_exist", () => {
        const no_greek = "dsiahd";
        const greek = "dasfiddβfyas";
        expect(greek_exist(empty)).toBeFalsy();
        expect(greek_exist(no_greek)).toBeFalsy();
        expect(greek_exist(greek)).toBeTruthy();
    });

    test("Testing contain_dev", () => {
        const no_dev = "sdahaspu";
        const dev = "asohFelixasdas";
        expect(contain_dev(empty)).toBeFalsy();
        expect(contain_dev(no_dev)).toBeFalsy();
        expect(contain_dev(dev)).toBeTruthy();
    });

    test("Testing country_exist", () => {
        const no_country = "asdfhdasiu";
        const country = "Japan";
        const country_plus = "kjdshadikshaSwedenIOSGHDIP";
        expect(country_exist(empty, "Taiwan")).toBeFalsy();
        expect(country_exist(no_country, "France")).toBeFalsy();
        expect(country_exist(country, "japan")).toBeTruthy();
        expect(country_exist(country_plus, "Sweden")).toBeTruthy();
    });

    test("Testing video_exist", async () => {
        const res_1 = await video_exist("Aq5WXmQQooo", 15);
        expect(res_1).toBeTruthy();
        
        const res_2 = await video_exist("ashdiasgdasigdp!mQIdvYVw5aY", 9);
        expect(res_2).toBeTruthy();

        const res_3 = await video_exist("!!!!", 100);
        expect(res_3).toBeFalsy();
    })
});

describe("Testing the utils.ts file", () => {
    test("Testing remapKeys", () => {
        const str_1 = "aaabbcp11111";
        const str_1_expected = "bbb11cpaaaaa";
        expect(remapKeys(str_1)).toStrictEqual(str_1_expected);

        const str_2 = "hhuuhuu11a";
        const str_2_expected = "11hh1hhuua";
        expect(remapKeys(str_2)).toStrictEqual(str_2_expected);
    });

    test("Testing spreadFire", () => {
        const str_1 = "sajkSdgas!wSldg";
        const str_1_fire = spreadFire(str_1);
        const fire_count = (str_1_fire.match(/🔥/g) || []).length;
        console.log(str_1_fire);
        console.log(fire_count);
        expect(fire_count).toBe(1);

        const str_2 = spreadFire(str_1_fire);
        console.log(str_2);
        const fire_count_2 = (str_2.match(/🔥/g) || []).length;
        console.log(fire_count_2);
        expect([2, 3]).toContain(fire_count_2);
    });
});
