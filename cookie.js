let allCharacter = document.cookie.split(" "),
    keys, values, allKeys, allValues, semiColonIndex,
    oldObj = {},
    newObj = {},
    date = new Date(),
    day = 24,
    hour = 60,
    minute = 60,
    second = 1000,
    expiresDate;

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

export const Cookie = {
    get(key = "") {
        if (key == undefined || key == "") {
            return undefined;
        } else {
            if (newObj[key] == undefined) return undefined;
            else if (newObj[key][newObj[key].length - 1] === ";") {
                semiColonIndex = newObj[key][newObj[key].length - 1];
                return newObj[key].substring(0, newObj[key].indexOf(semiColonIndex));
            }
            return newObj[key];
        }
    },
    getAll() {
        allValues[allValues.length - 1] += ";";
        allValues = allValues.map(item => {
            if (item.charAt((item.length - 1)) == ";") {
                return item.substring(0, item.length - 1);
            }
            return item;
        })
        for (let i = 0; i < allKeys.length; i++) {
            newObj[allKeys[i]] = allValues[i];
        }
        if (newObj[""] == "") return undefined;
        return newObj;
    },
    set(key = "", newValue = "", expires = 1) {
        date.setTime(date.getTime() + (expires * day * hour * minute * second));
        expiresDate = `expires=${date.toUTCString()}`;
        if (key.length >= 1 && newValue.length >= 1) {
            document.cookie = `${key}=${newValue};${expiresDate}`;
        } else {
            throw new TypeError(`'${key}' and '${newValue}' must contain at least 1 character`).message;
        }
    },
    remove(key = ""){
        date.setTime(date.getTime() + (0 * day * hour * minute * second));
        expiresDate = `expires=${date.toUTCString()}`;
        let currentValue = this.get(key);
        if (key.length >= 1) {
            if(currentValue != undefined){
                document.cookie = `${key}=${currentValue};${expiresDate}`;
                alert(`'${currentValue}' successfully removed!`)
            }else {
                throw new ReferenceError(`No value found with '${key}' keyword`).message;
            }
        } else {
            throw new TypeError(`'${key}' must contain at least 1 character`).message;
        }
    }
}


