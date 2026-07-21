import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

import "./ProfileSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../Shared/SettingsInput/SettingsInput";
import SaveButton from "../Shared/SaveButton/SaveButton";
import {
  GetMe,
  UpdateMe,
  GetCurrentUser,
} from "../../../../services/AuthService";

const ProfileSettings = () => {
  const [profileSettings, setProfileSettings] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetMe()
      .then((user) => {
        setProfileSettings({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
        setAvatar(user.avatar || "");
      })
      .catch(() => {
        const cached = GetCurrentUser();
        if (cached) {
          setProfileSettings({
            name: cached.name || "",
            email: cached.email || "",
            phone: cached.phone || "",
          });
          setAvatar(cached.avatar || "");
        }
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await UpdateMe({
        name: profileSettings.name,
        phone: profileSettings.phone,
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-settings-grid">
      <SettingsCard icon={<FiUser />} title="Profile Information">
        <div className="profile-avatar">
          <img src={avatar || "https://i.pravatar.cc/120"} alt="Profile" />
        </div>
      </SettingsCard>

      <SettingsCard icon={<FiUser />} title="Personal Information">
        <SettingsInput
          label="Name"
          value={profileSettings.name}
          onChange={(e) =>
            setProfileSettings({ ...profileSettings, name: e.target.value })
          }
        />

        <SettingsInput label="Email" value={profileSettings.email} readOnly />

        <SettingsInput
          label="Phone"
          value={profileSettings.phone}
          onChange={(e) =>
            setProfileSettings({ ...profileSettings, phone: e.target.value })
          }
        />

        <SaveButton onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </SaveButton>
      </SettingsCard>
    </div>
  );
};

export default ProfileSettings;
