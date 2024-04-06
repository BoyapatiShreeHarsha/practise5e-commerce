import axios from "../../utils/axios";

export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await axios.get('/products');
        // console.log(response);
        resolve(response)
    }
    );
}


export function fetchProductsByFilters(filter, sort) {

    let queryString = '';
    for (let cat in filter) {
        let value = filter[cat][filter[cat].length - 1];
        queryString += `${cat}=${value}&`
    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }

    return new Promise(async (resolve) => {
        const response = await axios.get('/products?' + queryString);

        resolve(response)
    }
    );
}