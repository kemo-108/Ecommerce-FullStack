import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";

import "./EmailSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  senderName: "",
  senderEmail: "",
  emailNotifications: true,
  marketingEmails: false,
};

const EmailSettings = () => {
  const [emailSettings, setEmailSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        setEmailSettings({
          senderName: data["email.senderName"] ?? DEFAULTS.senderName,
          senderEmail: data["email.senderEmail"] ?? DEFAULTS.senderEmail,
          emailNotifications:
            data["email.emailNotifications"] === undefined
              ? DEFAULTS.emailNotifications
              : data["email.emailNotifications"] === "true",
          marketingEmails:
            data["email.marketingEmails"] === undefined
              ? DEFAULTS.marketingEmails
              : data["email.marketingEmails"] === "true",
        });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await UpdateSettings({
        "email.senderName": emailSettings.senderName,
        "email.senderEmail": emailSettings.senderEmail,
        "email.emailNotifications": String(emailSettings.emailNotifications),
        "email.marketingEmails": String(emailSettings.marketingEmails),
      });
      toast.success("Email settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiMail />} title="Email Settings">
      <SettingsInput
        label="Sender Name"
        value={emailSettings.senderName}
        onChange={(e) =>
          setEmailSettings({ ...emailSettings, senderName: e.target.value })
        }
      />

      <SettingsInput
        label="Sender Email"
        value={emailSettings.senderEmail}
        onChange={(e) =>
          setEmailSettings({ ...emailSettings, senderEmail: e.target.value })
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

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default EmailSettings;
