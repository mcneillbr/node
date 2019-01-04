//
//
//

const list = {
    "a": { "value": "a", "order": 1 },
    "b": { "value": "b", "order": 2 },
    "c": { "value": "c", "order": 3 },
    "d": { "value": "d", "order": 4 },
    "e": { "value": "e", "order": 5 },
};

console.debug('original list', list);

const reOrderList = {
    "d": { "value": "d", "order": 2 },
    "a": { "value": "a", "order": 4 },
    "b": { "value": "b", "order": 4 },
    "c": { "value": "c", "order": 1 }
};

function getArrayNextIndexEmpty(arr, index, stop) {

    let idx = Math.max(0, (index + 1));
    idx = (idx >= arr.length) ? 0 : idx;
    if (stop && stop == idx) {
        return -1;
    }
    if (arr[idx] === undefined) {
        return idx;
    }

    return getArrayNextIndexEmpty(arr, idx, Math.min(index, 0));

}

function reorder(list, nlistOrder) {
    let nlist = Array(5);
    let row = 0;
    for (let item in list) {
        const hasItem = (reOrderList[item] && list[item].value == reOrderList[item].value);
        let slot = (hasItem) ? reOrderList[item].order - 1 : -1;
        if (slot >= 0) {
            slot = (nlist[slot] === undefined) ? slot : getArrayNextIndexEmpty(nlist, slot);
            nlist[slot] = list[item];
            list[item].order = slot + 1;
            console.debug('item', item, 'ori ordem', list[item].order, 'new order ', reOrderList[item].order, 'slot', slot);
        }
        row++;
    }
    console.debug('nlist', nlist);
    row = 0;
    for (let item in list) {
        let emptyRow = (typeof nlist[row] === 'undefined');
        let isObj = (reOrderList[item] && list[item].value == reOrderList[item].value);

        if (!emptyRow) {
            ++row;
        }
        if (!isObj) {
            nlist[row] = list[item];
            list[item].order = row + 1;
        }

        row++;
        console.log('for2', 'emptyRow', emptyRow, 'isObj', isObj, 'row', row, 'item', item);

    }

    return nlist;
}

const nl = reorder(list, reOrderList);
console.debug('result ', nl);
process.exit(0);
