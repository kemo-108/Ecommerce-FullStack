import { useEffect, useState } from "react";
import { FiShield } from "react-icons/fi";

import "./SecuritySettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";
import { ChangePassword } from "../../../../../services/AuthService";

const OPTION_DEFAULTS = {
  twoFactor: false,
  loginNotifications: true,
  trustedDevices: true,
  requirePassword: false,
};

const KEY_MAP = {
  twoFactor: "security.twoFactor",
  loginNotifications: "security.loginNotifications",
  trustedDevices: "security.trustedDevices",
  requirePassword: "security.requirePassword",
};

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securityOptions, setSecurityOptions] = useState(OPTION_DEFAULTS);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingOptions, setSavingOptions] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        const next = {};
        Object.keys(OPTION_DEFAULTS).forEach((field) => {
          const key = KEY_MAP[field];
          next[field] =
            data[key] === undefined ? OPTION_DEFAULTS[field] : data[key] === "true";
        });
        setSecurityOptions(next);
      })
      .catch(() => {});
  }, []);

  const handleUpdatePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirmation don't match.");
      return;
    }

    setSavingPassword(true);
    try {
      await ChangePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated successfully.");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSaveOptions = async () => {
    setSavingOptions(true);
    try {
      const payload = {};
      Object.keys(securityOptions).forEach((field) => {
        payload[KEY_MAP[field]] = String(securityOptions[field]);
      });
      await UpdateSettings(payload);
      toast.success("Security options saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSavingOptions(false);
    }
  };

  return (
    <div className="security-settings-grid">
      <SettingsCard icon={<FiShield />} title="Password Security">
        <SettingsInput
          type="password"
          label="Current Password"
          placeholder="••••••••"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, currentPassword: e.target.value })
          }
        />

        <SettingsInput
          type="password"
          label="New Password"
          placeholder="••••••••"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />

        <SettingsInput
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
        />

        <SaveButton onClick={handleUpdatePassword} disabled={savingPassword}>
          {savingPassword ? "Updating..." : "Update Password"}
        </SaveButton>
      </SettingsCard>

      <SettingsCard icon={<FiShield />} title="Security Options">
        <SettingsSwitch
          label="Enable Two Factor Authentication"
          checked={securityOptions.twoFactor}
          onChange={() =>
            setSecurityOptions({
              ...securityOptions,
              twoFactor: !securityOptions.twoFactor,
            })
          }
        />

        <SettingsSwitch
          label="Login Notifications"
          checked={securityOptions.loginNotifications}
          onChange={() =>
            setSecurityOptions({
              ...securityOptions,
              loginNotifications: !securityOptions.loginNotifications,
            })
          }
        />

        <SettingsSwitch
          label="Remember Trusted Devices"
          checked={securityOptions.trustedDevices}
          onChange={() =>
            setSecurityOptions({
              ...securityOptions,
              trustedDevices: !securityOptions.trustedDevices,
            })
          }
        />

        <SettingsSwitch
          label="Require Password On Sensitive Actions"
          checked={securityOptions.requirePassword}
          onChange={() =>
            setSecurityOptions({
              ...securityOptions,
              requirePassword: !securityOptions.requirePassword,
            })
          }
        />

        <SaveButton onClick={handleSaveOptions} disabled={savingOptions}>
          {savingOptions ? "Saving..." : "Save Security"}
        </SaveButton>
      </SettingsCard>
    </div>
  );
};

export default SecuritySettings;
