import type { DriveStep } from "driver.js";


export const userSteps: DriveStep[] = [
    {
        element: "#step-1",
        popover: {
            title: "Users Account Details",
            description:
                "Here you see your account balance an and account details.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#step-2",
        popover: {
            title: "Account Action",
            description:
                "In this section you can send money to users and cash out to agent.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#step-3",
        popover: {
            title: "Send Money",
            description: "Here You can Send Money Any Users Account.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#step-4",
        popover: {
            title: "Cash Out",
            description: "Here you can Cash Out From any agent account.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#step-5",
        popover: {
            title: "Transaction Details",
            description: "Here you can see your recent and all transaction.",
            side: "top",
            align: "start",
        },
    },
];