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
            import(
                /* webpackChunkName: "Customer" */ "../views/Customer.vue"
            ),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
];


export default routes