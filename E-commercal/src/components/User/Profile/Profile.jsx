import "./Profile.css";

import ProfileCard from "./Sections/ProfileCard/ProfileCard";
import PersonalInformation from "./Sections/PersonalInformation/PersonalInformation";
import AddressSection from "./Sections/AddressSection/AddressSection";
import ChangePassword from "./Sections/ChangePassword/ChangePassword";
import NotificationSettings from "./Sections/NotificationSettings/NotificationSettings";
import DeleteAccount from "./Sections/DeleteAccount/DeleteAccount";

const Profile = () => {
  return (
    <div className="profile-page">
      <ProfileCard />

      <PersonalInformation />

      <AddressSection />

      <ChangePassword />

      <NotificationSettings />

      <DeleteAccount />
    </div>
  );
};

export default Profile;
