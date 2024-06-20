import axios from "../config/axios";

export const apiCreateNewStaff = async (body, token) => {
    const data = await axios({
        url: "admin/create-staff",
        method: "post",
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};


export const apiGetAllStaff = async (token) => {
    const data = await axios({
        url: "admin/get-all-staff",
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}

export const apiDeleteStaff = async (id, token) => {
    const data = await axios({
        url: `admin/delete-staff/${id}`,
        method: "delete",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}

export const apiGetAllServices = async (token) => {
    const data = await axios({
        url: "admin/get-all-service",
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(data);
    return data;
}

export const apiGetAllRooms = async (token) => {
    const data = await axios({
        url: "admin/get-all-room",
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(data);
    return data;
}

export const apiUpdateStaff = async (updatedEmployee, token) => {
    const data = await axios({
        url: `admin/update-staff/${updatedEmployee.userAccountId}`,
        method: "put",
        data: updatedEmployee,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}


