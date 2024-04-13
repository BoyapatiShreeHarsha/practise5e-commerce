import axios from "../../utils/axios"


export function createUser(userData) {
    let data = JSON.stringify(userData);
    return new Promise(async (resolve) => {
        const response = await axios.post('/users', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        resolve({ data: response.data.id })
    }
    );
}

export function checkUser(loginData) {
    let email = loginData.email;
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`/users?email=${email}`);
        const data = response.data.filter((obj) => {
            return (obj.password === loginData.password)
        })

        if (data.length > 0) {
            resolve({ data: data[0].id });
        }

        reject({ message: 'user not found' });

    });
}


export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
        // call to backend to end any session
        resolve({ data: "success" });
    });
}