interface LooseObject {
    [key: string]: any;
}

function decode(input: string) {
    try {
        return decodeURIComponent(input.replace(/\+/g, " "));
    } catch (e) {
        return null;
    }
}
function encode(input: string) {
    try {
        return encodeURIComponent(input);
    } catch (e) {
        return null;
    }
}
export function parse(query: string) {
    const parser = /([^=?#&]+)=?([^&]*)/g;
    const result: LooseObject = {};
    let part: any;
    while ((part = parser.exec(query))) {
        const key = decode(part[1]);
        let value: string[] | string | null = decode(part[2]);
        if (key === null || value === null || key in result) continue;
        if (value.includes(",")) value = value.split(",");
        result[key] = value;
    }
    return result;
}
export function stringify(obj: LooseObject, prefix: string | true) {
    const has = Object.prototype.hasOwnProperty;
    const pairs = [];
    let key: any;
    prefix = prefix || "";
    if (typeof prefix !== "string") prefix = "?";
    for (key in obj) {
        if (has.call(obj, key)) {
            var value = obj[key];
            if (!value && (value === null || value || undefined || isNaN(value))) value = "";
            key = encode(key);
            value = encode(value);
            if (key === null || value === null) continue;
            pairs.push(key + "=" + value);
        }
    }
    return (pairs.length ? prefix + pairs.join("&") : "").toString();
}
export default { parse, stringify };
