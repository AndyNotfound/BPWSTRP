/**
 * travel-package router
 */

export default {
    routes: [
        {
            method: "GET",
            path: "/travel-packages/homepage",
            handler: "travel-package.homepage",
            config: {
                auth: false,
            },
        },
    ]
};