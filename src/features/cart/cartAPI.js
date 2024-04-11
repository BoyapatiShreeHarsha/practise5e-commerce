import axios from "../../utils/axios";

export function addToCart(ItemsData) {
    let data = JSON.stringify(ItemsData);
    return new Promise(async (resolve) => {
        const response = await axios.post('/carts', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}

export function fetchItemsByUserId(userId) {
    return new Promise(async (resolve) => {
        const response = await axios.get(`/carts?user=${userId}`);
        resolve(response)
    }
    );
}


export function updateCart(ItemsData) {
    let data = JSON.stringify(ItemsData);
    return new Promise(async (resolve) => {
        const response = await axios.patch(`/carts/${ItemsData.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}

export function deleteItemFromCart(ItemId) {
    return new Promise(async (resolve) => {
        const response = await axios.delete(`/carts/${ItemId}`);
        // console.log(response.data);

        resolve({ data: response.data.id })
    }
    );
}

export function resetCart(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchItemsByUserId(userId);
            for (let obj of response.data) {
                await deleteItemFromCart(obj.id);
            }
            resolve({ status: "successful" });
        } catch (error) {
            reject({ message: error });
        }
    });
}