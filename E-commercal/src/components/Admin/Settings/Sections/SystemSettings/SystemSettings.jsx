import { useState } from "react";
import { FiCpu } from "react-icons/fi";

import "./SystemSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const SystemSettings = () => {
  const [systemSettings, setSystemSettings] = useState({
    maintenance: false,
    registration: true,
    stockNotifications: true,
    orderNotifications: true,
  });

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

      <SaveButton />
    </SettingsCard>
  );
};

export default SystemSettings;
