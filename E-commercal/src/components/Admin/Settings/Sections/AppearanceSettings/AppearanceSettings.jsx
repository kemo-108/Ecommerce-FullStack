import { useState } from "react";
import { FiSun } from "react-icons/fi";

import "./AppearanceSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const AppearanceSettings = () => {
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "Light",
    primaryColor: "Pink",
    compactSidebar: false,
    animations: true,
    rtl: false,
  });

  const handleSave = () => {
    console.log(appearanceSettings);
  };

  return (
    <SettingsCard icon={<FiSun />} title="Appearance">
      <SettingsSelect
        label="Theme"
        value={appearanceSettings.theme}
        onChange={(e) =>
          setAppearanceSettings({
            ...appearanceSettings,
            theme: e.target.value,
          })
        }
        options={["Light", "Dark", "System"]}
      />

      <SettingsSelect
        label="Primary Color"
        value={appearanceSettings.primaryColor}
        onChange={(e) =>
          setAppearanceSettings({
            ...appearanceSettings,
            primaryColor: e.target.value,
          })
        }
        options={["Pink", "Blue", "Green", "Purple"]}
      />

      <SettingsSwitch
        label="Compact Sidebar"
        checked={appearanceSettings.compactSidebar}
        onChange={() =>
          setAppearanceSettings({
            ...appearanceSettings,
            compactSidebar: !appearanceSettings.compactSidebar,
          })
        }
      />

      <SettingsSwitch
        label="Enable Animations"
        checked={appearanceSettings.animations}
        onChange={() =>
          setAppearanceSettings({
            ...appearanceSettings,
            animations: !appearanceSettings.animations,
          })
        }
      />

      <SettingsSwitch
        label="RTL Layout"
        checked={appearanceSettings.rtl}
        onChange={() =>
          setAppearanceSettings({
            ...appearanceSettings,
            rtl: !appearanceSettings.rtl,
          })
        }
      />

      <SaveButton onClick={handleSave} />
    </SettingsCard>
  );
};

export default AppearanceSettings;
