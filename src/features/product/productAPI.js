import axios from "../../utils/axios";

export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await axios.get('/products');
        // console.log(response);
        resolve(response)
    }
    );
}


export function fetchProductsByFilters(filter, sort, page) {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}.
    // TODO : on server we will support multi values in filter
    // TODO : pagination on server

    let queryString = '';

    for (let cat in filter) {
        let value = filter[cat][filter[cat].length - 1];
        queryString += `${cat}=${value}&`
    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }
    for (let key in page) {

        queryString += `${key}=${page[key]}&`
    }

    return new Promise(async (resolve) => {
        const response = await axios.get('/products?' + queryString);
        console.log(queryString);
        const totalItems = response.data.length;
        // we have to send the data here
        resolve({ data: { products: response.data, totalItems: totalItems } })
    }
    );
}

export function fetchAllCategories() {
    return new Promise(async (resolve) => {
        const response = await axios.get('/categories');
        // console.log(response);
        resolve(response)
    }
    );
}

export function fetchAllBrands() {
    return new Promise(async (resolve) => {
        const response = await axios.get('/brands');
        // console.log(response);
        resolve(response)
    }
    );
}