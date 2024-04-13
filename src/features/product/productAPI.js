import axios from "../../utils/axios";

export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await axios.get('/products');
        // console.log(response);
        resolve(response)
    }
    );
}

export function createProduct(productData) {
    let data = JSON.stringify(productData);
    return new Promise(async (resolve) => {
        const response = await axios.post('/products', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response);
    }
    );
}

export function updateProduct(productData) {
    let data = JSON.stringify(productData);
    return new Promise(async (resolve) => {
        const response = await axios.patch(`/products/${productData.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}

export function fetchProduct(id) {
    return new Promise(async (resolve) => {
        const response = await axios.get(`/products/${id}`);
        resolve(response)
    }
    );
}

export function fetchProductsByFilters(filter, sort, page) {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_per_page=12}.
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
        const totalItems = response.data.items;
        const totalPages = response.data.pages;
        // we have to send the data here
        resolve({ data: { products: response.data.data, totalItems: totalItems, totalPages: totalPages } })
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
        resolve(response)
    }
    );
}