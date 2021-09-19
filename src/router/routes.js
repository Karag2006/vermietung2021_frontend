const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"
            ),
    },
    {
        path: "/customers",
        name: "Customer",
        component: () =>
            import(/* webpackChunkName: "Customer" */ "../views/Customer.vue"),
    },
    {
        path: "/users",
        name: "User",
        component: () =>
            import(/* webpackChunkName: "User" */ "../views/User.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
];


export default routes