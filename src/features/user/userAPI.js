import axios from "../../utils/axios"


export function fetchUserOrdersById(userId) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`/orders/user?user=${userId}`);
        resolve(response);

    });
}


export function fetchUserData(userId) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`/users?id=${userId}`);

        if (response.data.length > 0) {
            resolve({ data: response.data[0] });
        }
        reject({ message: 'user not found' });

    });
}

export function updateUser(userData) {
    let data = JSON.stringify(userData);
    return new Promise(async (resolve) => {
        const response = await axios.patch(`/users/${userData.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve(response)
    }
    );
}