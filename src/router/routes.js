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
        path: "/trailers",
        name: "Trailer",
        component: () =>
            import(/* webpackChunkName: "Trailer" */ "../views/Trailer.vue"),
    },
    {
        path: "/equipment",
        name: "Equipment",
        component: () =>
            import(
                /* webpackChunkName: "Equipment" */ "../views/Equipment.vue"
            ),
    },
    {
        path: "/options",
        name: "Options",
        component: () =>
            import(/* webpackChunkName: "Options" */ "../views/Options.vue"),
    },
    {
        path: "/offers",
        name: "Offers",
        component: () =>
            import(/* webpackChunkName: "Offers" */ "../views/Offers.vue"),
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