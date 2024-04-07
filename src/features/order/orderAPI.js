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