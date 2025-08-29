import type { DriveStep } from "driver.js";

export const agentSteps: DriveStep[] = [
    {
        element: "#agent-1",
        popover: {
            title: "Users Account Details",
            description:
                "Here you see your account balance an and account details.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#agent-2",
        popover: {
            title: "Account Action",
            description:
                "In this section you can b2b to other agent and cash in to user.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#agent-3",
        popover: {
            title: "Cash In",
            description: "Here You can Cash In Any Users Account.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: "#agent-4",
        popover: {
            title: "B2B",
            description: "Here you can b2b transaction with Other agent.",
            side: "left",
            align: "start",
        },
    },
    {
        element: "#agent-5",
        popover: {
            title: "Transaction Details",
            description: "Here you can see your recent and all transaction.",
            side: "top",
            align: "start",
        },
    },
];