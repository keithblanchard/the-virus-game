

export function populateSelectElement({elementSelector, data}) {
     const select = document.querySelector(elementSelector);

    const length = data.length;
    for (let i = 0; i < length; i ++) {
        let option = document.createElement('option');
        option.setAttribute('value', data[i]);
        option.appendChild(document.createTextNode(data[i].name));
        select.appendChild(option);
    }
}

export async function loadData ({storeName, jsonURL}) {
    const response = await fetch(jsonURL);
    const data = await response.json();
    window.localStorage.setItem(storeName, data);
    return data;
}

export async function init ({storeName, jsonURL, elementSelector}) {
    const data = await loadData({storeName, jsonURL});
    populateSelectElement({elementSelector, data});
}

export default {
    init
}
