import * as dotenv from "dotenv";
dotenv.config();

/**
 * Rule 1
 * 
 * Check if an uppcase letter exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function uppercase_exist(str: string): boolean {
    const has_capital = /[A-Z]/.test(str);

    if (has_capital) {
        return true;
    }

    return false;
}

/**
 * Rule 2
 * 
 * Check if a special char exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function special_exist(str: string): boolean {
    const has_special = /[^A-Za-z0-9🔥]/.test(str);

    if (has_special) {
        return true;
    }

    return false;
}

/**
 * Rule 3
 * 
 * Check if a number exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function number_exist(str: string): boolean {
    const has_number = /[0-9]/.test(str);

    if (has_number) {
        return true;
    }

    return false;
}

/**
 * Rule 4
 * 
 * Check if a minimum of 8 characters exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function minimum_8(str: string): boolean {
    if (str.length >= 8) {
        return true;
    }

    return false;
}

/**
 * Rule 5
 * 
 * Check if a greek character exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function greek_exist(str: string): boolean {
    const has_greek = /\p{Script=Greek}/u.test(str);
    
    if (has_greek) {
        return true;
    }

    return false;
}

/**
 * Rule 6
 * 
 * Check if a country exist in a string
 *
 * @param {string} str - The string to be checked
 * @param {string} country - The country expected to exist
 *
 * @return {boolean}
 */
export function country_exist(str: string, country: string): boolean {
    const regex = new RegExp(country, "i");
    const has_country = regex.test(str);
    
    if (has_country) {
        return true;
    }

    return false;
}

/**
 * Rule 7
 * 
 * Check if at least one dev exist in a string
 *
 * @param {string} str - The string to be checked
 *
 * @return {boolean}
 */
export function contain_dev(str: string): boolean {
    //if any of the following searches return is at least 0, return true. ow return false
    const devs: Array<number> = [str.search(/Isaac/i), str.search(/Isak/i), str.search(/Felix/i)];
    return !devs.every(x => x === -1);
}

/**
 * Rule 8
 * 
 * Check if a youtube video id exist at the end of a string
 *
 * @param {string} str - The string to be checked
 * @param {number} time_to_match - The time the video has to be
 *
 * @precondition: The video id must be at the end of the string
 *
 * @return {Promise<boolean>}
 */
export async function video_exist(str: string, time_to_match: number): Promise<boolean> {
    // Convert iso_8601 time to a number
    function iso_to_sec(iso_string: string): number {
        const match = iso_string.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return 0;
        const hours = Number(match[1] ?? 0);
        const minutes = Number(match[2] ?? 0);
        const seconds = Number(match[3] ?? 0);

        return hours * 3600 + minutes * 60 + seconds;
    }

    // OBS!!! Expects the id to be last in the string
    const video_id = str.slice(-11);
    
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&part=contentDetails&key=${process.env.YOUTUBE_API_KEY}`;
       
    const response = await fetch(url);
    const json = await response.json();

    if (!json.items || json.items.length === 0) {
        return false;
    }

    const time_iso_8601 = json.items[0].contentDetails.duration;
    const time = iso_to_sec(time_iso_8601);

    return time_to_match === time;
}
