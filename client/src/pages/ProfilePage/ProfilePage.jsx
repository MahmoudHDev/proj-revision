import { useEffect } from "react";
import useProfile from "./useProfile.js";
function ProfilePage() {

    const { profileData, errorMessage } = useProfile();
    if (errorMessage) return <div>Error: {errorMessage}</div>;
    if (!profileData) return <div>Loading...</div>;

    return (
        <div>ProfilePage</div>
    );
};

export default ProfilePage;