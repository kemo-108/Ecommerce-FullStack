import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";

import "./AppearanceSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  theme: "Light",
  primaryColor: "Pink",
  compactSidebar: false,
  animations: true,
  rtl: false,
};

const KEY_MAP = {
  theme: "appearance.theme",
  primaryColor: "appearance.primaryColor",
  compactSidebar: "appearance.compactSidebar",
  animations: "appearance.animations",
  rtl: "appearance.rtl",
};

const AppearanceSettings = () => {
  const [appearanceSettings, setAppearanceSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        setAppearanceSettings({
          theme: data[KEY_MAP.theme] ?? DEFAULTS.theme,
          primaryColor: data[KEY_MAP.primaryColor] ?? DEFAULTS.primaryColor,
          compactSidebar:
            data[KEY_MAP.compactSidebar] === undefined
              ? DEFAULTS.compactSidebar
              : data[KEY_MAP.compactSidebar] === "true",
          animations:
            data[KEY_MAP.animations] === undefined
              ? DEFAULTS.animations
              : data[KEY_MAP.animations] === "true",
          rtl:
            data[KEY_MAP.rtl] === undefined
              ? DEFAULTS.rtl
              : data[KEY_MAP.rtl] === "true",
        });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await UpdateSettings({
        [KEY_MAP.theme]: appearanceSettings.theme,
        [KEY_MAP.primaryColor]: appearanceSettings.primaryColor,
        [KEY_MAP.compactSidebar]: String(appearanceSettings.compactSidebar),
        [KEY_MAP.animations]: String(appearanceSettings.animations),
        [KEY_MAP.rtl]: String(appearanceSettings.rtl),
      });
      toast.success("Appearance settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiSun />} title="Appearance">
      <SettingsSelect
        label="Theme"
        value={appearanceSettings.theme}
        onChange={(e) =>
          setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })
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
          setAppearanceSettings({ ...appearanceSettings, rtl: !appearanceSettings.rtl })
        }
      />

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default AppearanceSettings;
