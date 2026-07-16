import { useState } from "react";
import { FiShield } from "react-icons/fi";

import "./SecuritySettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
    loginNotifications: true,
    trustedDevices: true,
    requirePassword: false,
  });

  const handleSave = () => {
    console.log(securitySettings);
  };

  return (
    <div className="security-settings-grid">
      <SettingsCard icon={<FiShield />} title="Password Security">
        <SettingsInput
          type="password"
          label="Current Password"
          placeholder="••••••••"
          value={securitySettings.currentPassword}
          onChange={(e) =>
            setSecuritySettings({
              ...securitySettings,
              currentPassword: e.target.value,
            })
          }
        />

        <SettingsInput
          type="password"
          label="New Password"
          placeholder="••••••••"
          value={securitySettings.newPassword}
          onChange={(e) =>
            setSecuritySettings({
              ...securitySettings,
              newPassword: e.target.value,
            })
          }
        />

        <SettingsInput
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={securitySettings.confirmPassword}
          onChange={(e) =>
            setSecuritySettings({
              ...securitySettings,
              confirmPassword: e.target.value,
            })
          }
        />

        <SaveButton onClick={handleSave}>Update Password</SaveButton>
      </SettingsCard>

      <SettingsCard icon={<FiShield />} title="Security Options">
        <SettingsSwitch
          label="Enable Two Factor Authentication"
          checked={securitySettings.twoFactor}
          onChange={() =>
            setSecuritySettings({
              ...securitySettings,
              twoFactor: !securitySettings.twoFactor,
            })
          }
        />

        <SettingsSwitch
          label="Login Notifications"
          checked={securitySettings.loginNotifications}
          onChange={() =>
            setSecuritySettings({
              ...securitySettings,
              loginNotifications: !securitySettings.loginNotifications,
            })
          }
        />

        <SettingsSwitch
          label="Remember Trusted Devices"
          checked={securitySettings.trustedDevices}
          onChange={() =>
            setSecuritySettings({
              ...securitySettings,
              trustedDevices: !securitySettings.trustedDevices,
            })
          }
        />

        <SettingsSwitch
          label="Require Password On Sensitive Actions"
          checked={securitySettings.requirePassword}
          onChange={() =>
            setSecuritySettings({
              ...securitySettings,
              requirePassword: !securitySettings.requirePassword,
            })
          }
        />

        <SaveButton onClick={handleSave}>Save Security</SaveButton>
      </SettingsCard>
    </div>
  );
};

export default SecuritySettings;
