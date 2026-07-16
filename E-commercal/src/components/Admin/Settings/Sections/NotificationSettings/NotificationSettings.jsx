import { useState } from "react";
import { FiBell } from "react-icons/fi";

import "./NotificationSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    inventoryAlerts: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    console.log(notificationSettings);
  };

  return (
    <SettingsCard icon={<FiBell />} title="Notification Settings">
      <SettingsSwitch
        label="Email Notifications"
        checked={notificationSettings.emailNotifications}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            emailNotifications: !notificationSettings.emailNotifications,
          })
        }
      />

      <SettingsSwitch
        label="SMS Notifications"
        checked={notificationSettings.smsNotifications}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            smsNotifications: !notificationSettings.smsNotifications,
          })
        }
      />

      <SettingsSwitch
        label="Push Notifications"
        checked={notificationSettings.pushNotifications}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            pushNotifications: !notificationSettings.pushNotifications,
          })
        }
      />

      <SettingsSwitch
        label="Order Updates"
        checked={notificationSettings.orderUpdates}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            orderUpdates: !notificationSettings.orderUpdates,
          })
        }
      />

      <SettingsSwitch
        label="Inventory Alerts"
        checked={notificationSettings.inventoryAlerts}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            inventoryAlerts: !notificationSettings.inventoryAlerts,
          })
        }
      />

      <SettingsSwitch
        label="Marketing Emails"
        checked={notificationSettings.marketingEmails}
        onChange={() =>
          setNotificationSettings({
            ...notificationSettings,
            marketingEmails: !notificationSettings.marketingEmails,
          })
        }
      />

      <SaveButton onClick={handleSave} />
    </SettingsCard>
  );
};

export default NotificationSettings;
