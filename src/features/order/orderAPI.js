import axios from "../../utils/axios";

export function createOrder(OrderData) {
    let data = JSON.stringify(OrderData);
    return new Promise(async (resolve) => {
        const response = await axios.post('/orders', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}

export function updateOrder(orderData) {
    let data = JSON.stringify(orderData);
    return new Promise(async (resolve) => {
        const response = await axios.patch(`/orders/${orderData.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}

export function fetchAllOrders({ sort, page }) {
    let queryString = "";

    for (let p in sort) {
        queryString += p;
        queryString += "=";
        queryString += sort[p];
        queryString += "&";
    }


    for (let p in page) {
        queryString += p;
        queryString += "=";
        queryString += page[p];
        queryString += "&";
    }

    console.log(queryString);

    return new Promise(async (resolve) => {
        const response = await axios.get('/orders?' + queryString);
        // console.log(response);
        resolve({ data: response.data.data, totalPages: response.data.pages, totalItems: response.data.items })
    }
    );
}