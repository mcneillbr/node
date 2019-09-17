/** todo */
function getObjValue(target, path, fallback = null) {
    const callList = path.split('.') || [];
    console.log('callList', callList);
    if(callList.length <= 0) {
        return fallback;
    }
    const first = callList.splice(0, 1);
    let acc = target[first];
    for(const idx in callList) {
        const key = callList[idx];
        console.log('for:item', {key, idx, acc, first}, typeof acc);
        if(typeof acc === 'object' && key in acc) {
            acc = acc[key];
        } else  {
            acc = null;
            break;
        }
        
    }
    return acc ? acc : fallback;
}

/**
 * Verify is value is type number
 * @param {*} value 
 */
function isNumber(value) {

    return ((typeof value != undefined || value != null) && !isNaN(Number(value)));
}

/**
 * convert value to Number
 * @param {*} value 
 
 */
function toNumber(value) {
    return Number(value);
}

/**
 * convert value to Number or returns fallback
 * @param {*} value
 * @param {*} fallback 
 * @returns Number
 */
function tryToNumber(value, fallback) {
    fallback = NaN || fallback;
    const num = Number(value);
    return isNaN(num) ? fallback : num;
}

/**
 * convert object to boolean
 * @param {*} value 
 */
function toBoolean(value) {
    if (value instanceof String || typeof value === 'string') {
        return parseBoolean(value);
    } else if (isNumber(value)) {
        return (Number(value) > 0) ? true : false;
    }
    return Boolean(value);
}

/**
 * returns boolean value from string in format boolean
 * @param {string} value 
 */
function parseBoolean(value) {
    switch (value.toLocaleLowerCase().trim()) {
        case 'on':
        case 'true':
        case 'yes':
        case '1':
            return true;
    }
    return (Number(value) > 0) ? true : false;
}

module.exports = {
    "isNumber": isNumber,
    "toBoolean": toBoolean,
    "toNumber": toNumber,
    "tryToNumber": tryToNumber
}
