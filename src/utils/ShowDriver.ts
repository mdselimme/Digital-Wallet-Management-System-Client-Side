import { driver, type DriveStep } from "driver.js";

// Custom function to save tour completion
export const myCustomFunction = (email: string, role: string) => {
    localStorage.setItem("tour_completed", JSON.stringify({ email, role }));
};

export const checkAndStartTour = (
    steps: DriveStep[],
    email: string,
    role: string
) => {
    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            showButtons: ["previous", "close", "next"],
            doneBtnText: "Finish",
            steps,
            onNextClick: (_el, step) => {
                const currentStepIndex = steps.findIndex(
                    (s) => s.element === step.element
                );

                if (currentStepIndex === steps.length - 1) {
                    myCustomFunction(email, role);
                    driverObj.destroy();
                } else {
                    driverObj.moveNext();
                }
            },
        });

        driverObj.drive();
    };

    // Check localStorage if tour was already completed
    const storedData = localStorage.getItem("tour_completed");
    if (storedData) {
        const { email: storedEmail, role: storedRole } = JSON.parse(storedData);
        if (storedEmail !== email || storedRole !== role) {
            startTour();
        }
    } else {
        startTour();
    }
};
