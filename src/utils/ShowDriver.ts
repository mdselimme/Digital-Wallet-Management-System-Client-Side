import { driver, type DriveStep } from "driver.js";


export const checkAndStartTour = (
    steps: DriveStep[],
    handleUpdateTour: () => void
) => {
    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            showButtons: ["previous", "next"],
            doneBtnText: "Finish",
            onDestroyed: () => {
                handleUpdateTour();
                driverObj.destroy();
            },
            steps,
            onNextClick: (_el, step) => {
                const currentStepIndex = steps.findIndex(
                    (s) => s.element === step.element
                );

                if (currentStepIndex === steps.length - 1) {
                    handleUpdateTour();
                    driverObj.destroy();
                } else {
                    driverObj.moveNext();
                }
            },
            
        });
        driverObj.drive();

    };

    startTour();
};
