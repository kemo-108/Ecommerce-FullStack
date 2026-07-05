import { useState } from "react";
import { FiUser } from "react-icons/fi";

import "./ProfileSettings.css";

import SettingsCard from "../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../Shared/SettingsInput/SettingsInput";
import SaveButton from "../Shared/SaveButton/SaveButton";

const ProfileSettings = () => {
  const [profileSettings, setProfileSettings] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+20 100 123 4567",
  });

  const handleSave = () => {
    console.log(profileSettings);
  };

  return (
    <div className="profile-settings-grid">
      <SettingsCard icon={<FiUser />} title="Profile Information">
        <div className="profile-avatar">
          <img src="https://i.pravatar.cc/120" alt="Profile" />

          <button>Change Photo</button>
        </div>

        <SaveButton>Upload Image</SaveButton>
      </SettingsCard>

      <SettingsCard icon={<FiUser />} title="Personal Information">
        <SettingsInput
          label="First Name"
          value={profileSettings.firstName}
          onChange={(e) =>
            setProfileSettings({
              ...profileSettings,
              firstName: e.target.value,
            })
          }
        />

        <SettingsInput
          label="Last Name"
          value={profileSettings.lastName}
          onChange={(e) =>
            setProfileSettings({
              ...profileSettings,
              lastName: e.target.value,
            })
          }
        />

        <SettingsInput
          label="Email"
          value={profileSettings.email}
          onChange={(e) =>
            setProfileSettings({
              ...profileSettings,
              email: e.target.value,
            })
          }
        />

        <SettingsInput
          label="Phone"
          value={profileSettings.phone}
          onChange={(e) =>
            setProfileSettings({
              ...profileSettings,
              phone: e.target.value,
            })
          }
        />

        <SaveButton onClick={handleSave} />
      </SettingsCard>
    </div>
  );
};

export default ProfileSettings;
