import { FiGlobe } from "react-icons/fi";
import { useEffect, useState } from "react";
import "./LanguageSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  language: "English",
  timezone: "GMT+2 Cairo",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24 Hours",
};

const LanguageSettings = () => {
  const [languageSettings, setLanguageSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        setLanguageSettings({
          language: data["language.language"] ?? DEFAULTS.language,
          timezone: data["language.timezone"] ?? DEFAULTS.timezone,
          dateFormat: data["language.dateFormat"] ?? DEFAULTS.dateFormat,
          timeFormat: data["language.timeFormat"] ?? DEFAULTS.timeFormat,
        });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await UpdateSettings({
        "language.language": languageSettings.language,
        "language.timezone": languageSettings.timezone,
        "language.dateFormat": languageSettings.dateFormat,
        "language.timeFormat": languageSettings.timeFormat,
      });
      toast.success("Language settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiGlobe />} title="Language & Region">
      <SettingsSelect
        label="Language"
        value={languageSettings.language}
        onChange={(e) =>
          setLanguageSettings({ ...languageSettings, language: e.target.value })
        }
        options={["English", "Arabic", "French"]}
      />

      <SettingsSelect
        label="Timezone"
        value={languageSettings.timezone}
        onChange={(e) =>
          setLanguageSettings({ ...languageSettings, timezone: e.target.value })
        }
        options={["UTC", "GMT+2 Cairo", "GMT+3 Riyadh"]}
      />

      <SettingsSelect
        label="Date Format"
        value={languageSettings.dateFormat}
        onChange={(e) =>
          setLanguageSettings({ ...languageSettings, dateFormat: e.target.value })
        }
        options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"]}
      />

      <SettingsSelect
        label="Time Format"
        value={languageSettings.timeFormat}
        onChange={(e) =>
          setLanguageSettings({ ...languageSettings, timeFormat: e.target.value })
        }
        options={["12 Hours", "24 Hours"]}
      />
      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default LanguageSettings;
