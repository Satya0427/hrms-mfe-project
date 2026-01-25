export const API_ENDPOINTS = {
    auth: {
        login: `/auth/login`,
        register: `/users/register_admin`,
        refreshToken: `/auth/token_refresh`,
        logout:`/auth/logout`
    },
    users:{
        getUsersList:`/user/users-list`,
        createUser:`/user/creation`,
        editUser:`/users/V1/edit`,
    },
    gallery:{
        getImages:`/gallery/view_images`
    }
};