import axios from "../../utils/axios"


export function fetchUserOrdersById(userId) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`/orders?user.id=${userId}`);
        resolve(response);

    });
}