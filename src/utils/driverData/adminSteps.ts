import type { DriveStep } from "driver.js";

export const adminSteps: DriveStep[] = [
    {
        element: "#admin-1",
        popover: {
            title: "Admin Account Details",
            description: "Here you see your account balance and account details.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#admin-2",
        popover: {
            title: "Account Action",
            description:
                "In this section you can send money to users and cash out to agent.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#admin-3",
        popover: {
            title: "Self Add Money",
            description: "Here You can Add Money To your own account",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#admin-4",
        popover: {
            title: "Add Money To Other",
            description: "Here you can Add money to other user, agent, admin.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#admin-5",
        popover: {
            title: "Transaction Details",
            description: "Here you can see your recent and all transaction.",
            side: "top",
            align: "start",
        },
    },
];