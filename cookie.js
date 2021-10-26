const Cookie = {
    get(key = "") {
        let allCharacter = document.cookie.split(" "),
            keys, values, allKeys, allValues, semiColonIndex,
            oldObj = {},
            newObj = {};

        for (let i of allCharacter) {
            oldObj[i] = i;
        }

        keys = Object.keys(oldObj);
        values = Object.values(oldObj);

        allKeys = keys.map(item => {
            let equalChar = item.indexOf("=");
            return item.substring(0, equalChar);
        })

        allValues = values.map(item => {
            let equalChar = item.indexOf("=");
            return item.substring(equalChar + 1);
        })

        for (let i = 0; i < allKeys.length; i++) {
            newObj[allKeys[i]] = allValues[i];
        }

        if (newObj[key] == undefined) {
            return undefined
        } else if (newObj[key][newObj[key].length - 1] === ";") {
            semiColonIndex = newObj[key][newObj[key].length - 1];
            return newObj[key].substring(0, newObj[key].indexOf(semiColonIndex));
        }
        return newObj[key];
    },
    set(key = "", newValue = "") {
        document.cookie = `${key}=${newValue}`;
    }
}

export default Cookie;