import { useUserTourUpdateMutation } from "@/redux/features/user/user.api";


const useUpdateTour = () => {
    const [updateTour] = useUserTourUpdateMutation();
    const handleUpdateTour = () => {
        updateTour({ tour: true });
    }
    return handleUpdateTour;
}

export default useUpdateTour;