/**
* Get a "podium" of the 3 most used characters in input.
* Replace each instance of any of these characters with the next on the podium.
*
* @example e.g, given aaabbcp11111, make bbb11cpaaaaa
* the 3 most used characters are 1, a, and b in descending order.
* so all 1s are replaced by a's, a's by b's and b's by 1's
*
* @param {string} str - The input password
*
* @precondition: Input must have 3 or more unique characters
*
* @return {string} - The input except with the top 3
*/
export function remapKeys(str: string): string {
    let str_compare: string = "";
    const segments: string[] = Array.from(str);
    const counter_arr: number[] = [];
    const letters_arr: string[] = [];
    
    //count how often each letter appears in a str
    for (let i = 0; i < segments.length; i++) {
        if (!letters_arr.includes(segments[i]!)) {
            counter_arr[letters_arr.length] = 1;
            letters_arr[letters_arr.length] = segments[i]!;
        } else {
            counter_arr[letters_arr.indexOf(segments[i]!)]!++;
        }
    }
    //in case of ties, the char that appeared first will win. 
    const sorted = counter_arr.slice().sort((a, b) => (b - a));
    let mst_lttr =      letters_arr[counter_arr.indexOf(sorted[0]!)]!;
    let scnd_mst_lttr = letters_arr[counter_arr.indexOf(sorted[1]!)]!;
    let thrd_mst_lttr = letters_arr[counter_arr.indexOf(sorted[2]!)]!;

    const out: string[] = segments.slice();
    let top3letters: string[] = [mst_lttr, scnd_mst_lttr, thrd_mst_lttr];

    //internally rotate all instances of charcters from the set of top 3 characters.
    for(let i = 0; i < out.length; i++) {
        if (top3letters.includes(out[i]!)) {
            out[i] = top3letters[(top3letters.indexOf(out[i]!) + 1) % 3]!;
        }
    }

    str_compare = out.join('');
    return out.join('');
}

/**
 * Starts a fire randomly in the string and spreads to adjacent symbols.
 *
 * @param {string} str - The string to be modified
 * @param {string} fire - The fire character to be spread
 *
 * @return {string} - The modified string containing fire
 */
export function spreadFire(str: string, fire: string = "🔥"): string {
    const out = Array.from(str);
    //segments.length is equal to the length of current password
    
    if(!out.includes(fire)) {
        const randomIndex = Math.floor(Math.random() * out.length)
        out [randomIndex] = fire
        return out.join('')
    }
    const outSpread = [...out]
    for (let i = 0; i < outSpread.length; i++) {
        if (outSpread[i] === fire) {
            //body apparently ok to do inline if it is specifically a single statement
            //(e.g, not a declaration or multiple statements)
            if (i > 0 && out[i - 1] !== fire) out[i - 1] = fire;
            if (i + 1 < outSpread.length && out[i + 1] !== fire) out[i + 1] = fire;
        }
    }
    return out.join('');
}

/**
 * Get a promise for an geoapify url that can be used to show an image of a random place in a country
 *
 * @param {string} country - The country you want an image of
 *
 * @return {Promise<string>} - A geoapify url
 */
export async function get_country_url(country: string): Promise<string> {
    const geocode_url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(country)}&type=country&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;
    const response = await fetch(geocode_url);
    const json = await response.json();

    const place_id = json.features[0].properties.place_id;

    const boundary_url = `https://api.geoapify.com/v1/boundaries/consists-of?id=${place_id}&geometry=geometry_1000&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;
    const boundary_response = await fetch(boundary_url);
    const boundary_json = await boundary_response.json();

    const random_feature = boundary_json.features[Math.floor(Math.random() * boundary_json.features.length)];
    const geometry = random_feature.geometry;

    const coords = geometry.type === 'MultiPolygon' 
        ? geometry.coordinates[0][0] 
        : geometry.coordinates[0];
    const random_index = Math.floor(Math.random() * coords.length);
    const lon_and_lat = coords[random_index];
    
    const lon = lon_and_lat[0];
    const lat = lon_and_lat[1];
    return `https://maps.geoapify.com/v1/staticmap?format=png&style=toner&width=600&height=400&center=lonlat:${lon},${lat}&zoom=10&scaleFactor=2&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;
}
