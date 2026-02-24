// Rule 1
export function uppercase_exist(str: string): boolean {
    const has_capital = /[A-Z]/.test(str);

    if (has_capital) {
        return true;
    }

    return false;
}

// Rule 2
export function special_exist(str: string): boolean {
    const has_special = /[^A-Za-z0-9 ]/.test(str);

    if (has_special) {
        return true;
    }

    return false;
}

// Rule 3
export function minimun_8(str: string): boolean {
    if (str.length >= 8) {
        return true;
    }

    return false;
}

// Rule 4
export function greek_exist(str: string): boolean {
    const has_greek = /\p{Script=Greek}/u.test(str);
    
    if (has_greek) {
        return true;
    }

    return false;
}

// Rule 5
export function country_exist(str: string, country: string): boolean {
    const regex = new RegExp(country, "i");
    const has_country = regex.test(str);
    
    if (has_country) {
        return true;
    }

    return false;
}



