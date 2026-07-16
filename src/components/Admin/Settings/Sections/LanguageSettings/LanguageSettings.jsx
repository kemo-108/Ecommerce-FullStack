import { FiGlobe } from "react-icons/fi";
import { useState } from "react";
import "./LanguageSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const LanguageSettings = () => {
  const [languageSettings, setLanguageSettings] = useState({
    language: "English",
    timezone: "GMT+2 Cairo",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24 Hours",
  });
  return (
    <SettingsCard icon={<FiGlobe />} title="Language & Region">
      <SettingsSelect
        label="Language"
        value={languageSettings.language}
        onChange={(e) =>
          setLanguageSettings({
            ...languageSettings,
            language: e.target.value,
          })
        }
        options={["English", "Arabic", "French"]}
      />

      <SettingsSelect
        label="Timezone"
        value={languageSettings.timezone}
        onChange={(e) =>
          setLanguageSettings({
            ...languageSettings,
            timezone: e.target.value,
          })
        }
        options={["UTC", "GMT+2 Cairo", "GMT+3 Riyadh"]}
      />

      <SettingsSelect
        label="Date Format"
        value={languageSettings.dateFormat}
        onChange={(e) =>
          setLanguageSettings({
            ...languageSettings,
            dateFormat: e.target.value,
          })
        }
        options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"]}
      />

      <SettingsSelect
        label="Time Format"
        value={languageSettings.timeFormat}
        onChange={(e) =>
          setLanguageSettings({
            ...languageSettings,
            timeFormat: e.target.value,
          })
        }
        options={["12 Hours", "24 Hours"]}
      />
      <SaveButton />
    </SettingsCard>
  );
};

export default LanguageSettings;
