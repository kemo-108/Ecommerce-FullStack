import { useEffect, useState } from "react";
import { FiCpu } from "react-icons/fi";

import "./SystemSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  maintenance: false,
  registration: true,
  stockNotifications: true,
  orderNotifications: true,
};

const SystemSettings = () => {
  const [systemSettings, setSystemSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        setSystemSettings({
          maintenance:
            data["system.maintenance"] === undefined
              ? DEFAULTS.maintenance
              : data["system.maintenance"] === "true",
          registration:
            data["system.registration"] === undefined
              ? DEFAULTS.registration
              : data["system.registration"] === "true",
          stockNotifications:
            data["system.stockNotifications"] === undefined
              ? DEFAULTS.stockNotifications
              : data["system.stockNotifications"] === "true",
          orderNotifications:
            data["system.orderNotifications"] === undefined
              ? DEFAULTS.orderNotifications
              : data["system.orderNotifications"] === "true",
        });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await UpdateSettings({
        "system.maintenance": String(systemSettings.maintenance),
        "system.registration": String(systemSettings.registration),
        "system.stockNotifications": String(systemSettings.stockNotifications),
        "system.orderNotifications": String(systemSettings.orderNotifications),
      });
      toast.success("System settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiCpu />} title="System Settings">
      <SettingsSwitch
        label="Maintenance Mode"
        checked={systemSettings.maintenance}
        onChange={() =>
          setSystemSettings({
            ...systemSettings,
            maintenance: !systemSettings.maintenance,
          })
        }
      />

      <SettingsSwitch
        label="Allow Registration"
        checked={systemSettings.registration}
        onChange={() =>
          setSystemSettings({
            ...systemSettings,
            registration: !systemSettings.registration,
          })
        }
      />

      <SettingsSwitch
        label="Stock Notifications"
        checked={systemSettings.stockNotifications}
        onChange={() =>
          setSystemSettings({
            ...systemSettings,
            stockNotifications: !systemSettings.stockNotifications,
          })
        }
      />

      <SettingsSwitch
        label="Order Notifications"
        checked={systemSettings.orderNotifications}
        onChange={() =>
          setSystemSettings({
            ...systemSettings,
            orderNotifications: !systemSettings.orderNotifications,
          })
        }
      />

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default SystemSettings;
