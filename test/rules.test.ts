import { uppercase_exist, special_exist, minimum_8, greek_exist, country_exist, 
         video_exist, number_exist, contain_dev
} from "../lib/rules";

const empty = "";


test('YOUTUBE_API_KEY is loaded', () => {
  console.log('YOUTUBE_API_KEY:', process.env.YOUTUBE_API_KEY);
  expect(process.env.YOUTUBE_API_KEY).toBeDefined();
});

describe("Testing rules check functions", () => {
    test("Testing uppercase", () => {
        const undercase = "dgasuidgasudg";
        const uppercase = "asdasgdasGTYUdasdasd";
        expect(uppercase_exist(empty)).toBeFalsy();
        expect(uppercase_exist(undercase)).toBeFalsy();
        expect(uppercase_exist(uppercase)).toBeTruthy();
    });    

    test("Testinag special chars", () => {
        const non_special = "dnaskjdbhnaiwue";
        const special = "Isak!";
        expect(special_exist(empty)).toBeFalsy();
        expect(special_exist(non_special)).toBeFalsy();
        expect(special_exist(special)).toBeTruthy();
    });

    test("Testing number exist", () => {
        const non_number = "sadoashdasf";
        const with_number = "asdfasflj!9";
        expect(number_exist(empty)).toBeFalsy();
        expect(number_exist(non_number)).toBeFalsy();
        expect(number_exist(with_number)).toBeTruthy();
    });

    test("Testing minimun 8", () => {
        const under = "dsahd";
        const exact = "dksngofö";
        const over = "afsilufhasiuf";
        expect(minimum_8(empty)).toBeFalsy();
        expect(minimum_8(under)).toBeFalsy();
        expect(minimum_8(exact)).toBeTruthy();
        expect(minimum_8(over)).toBeTruthy();
    });

    test("Testing greek exist", () => {
        const no_greek = "dsiahd";
        const greek = "dasfiddβfyas";
        expect(greek_exist(empty)).toBeFalsy();
        expect(greek_exist(no_greek)).toBeFalsy();
        expect(greek_exist(greek)).toBeTruthy();
    });

    test("Testing contain dev", () => {
        const no_dev = "sdahaspu";
        const dev = "asohFelixasdas";
        expect(contain_dev(empty)).toBeFalsy();
        expect(contain_dev(no_dev)).toBeFalsy();
        expect(contain_dev(dev)).toBeTruthy();
    });

    test("Country exist", () => {
        const no_country = "asdfhdasiu";
        const country = "Japan";
        const country_plus = "kjdshadikshaSwedenIOSGHDIP";
        expect(country_exist(empty, "Taiwan")).toBeFalsy();
        expect(country_exist(no_country, "Frankrike"))
        expect(country_exist(country, "japan")).toBeTruthy();
        expect(country_exist(country_plus, "Sweden")).toBeTruthy();
    });

    test("YOUTUBE API", async () => {
        const res_1 = await video_exist("Aq5WXmQQooo", 15);
        expect(res_1).toBeTruthy();
        
        const res_2 = await video_exist("ashdiasgdasigdp!Aq5WXmQQooo", 15);
        expect(res_2).toBeTruthy();

        const res_3 = await video_exist("!!!!", 100);
        expect(res_3).toBeFalsy();
    })
});
