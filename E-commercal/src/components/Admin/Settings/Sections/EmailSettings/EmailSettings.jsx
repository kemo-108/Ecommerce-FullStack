import { useState } from "react";
import { FiMail } from "react-icons/fi";

import "./EmailSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const EmailSettings = () => {
  const [emailSettings, setEmailSettings] = useState({
    senderName: "Style Store",
    senderEmail: "admin@store.com",
    emailNotifications: true,
    marketingEmails: false,
  });

  return (
    <SettingsCard icon={<FiMail />} title="Email Settings">
      <SettingsInput
        label="Sender Name"
        value={emailSettings.senderName}
        onChange={(e) =>
          setEmailSettings({
            ...emailSettings,
            senderName: e.target.value,
          })
        }
      />

      <SettingsInput
        label="Sender Email"
        value={emailSettings.senderEmail}
        onChange={(e) =>
          setEmailSettings({
            ...emailSettings,
            senderEmail: e.target.value,
          })
        }
      />

      <SettingsSwitch
        label="Email Notifications"
        checked={emailSettings.emailNotifications}
        onChange={() =>
          setEmailSettings({
            ...emailSettings,
            emailNotifications: !emailSettings.emailNotifications,
          })
        }
      />

      <SettingsSwitch
        label="Marketing Emails"
        checked={emailSettings.marketingEmails}
        onChange={() =>
          setEmailSettings({
            ...emailSettings,
            marketingEmails: !emailSettings.marketingEmails,
          })
        }
      />

      <SaveButton />
    </SettingsCard>
  );
};

export default EmailSettings;
