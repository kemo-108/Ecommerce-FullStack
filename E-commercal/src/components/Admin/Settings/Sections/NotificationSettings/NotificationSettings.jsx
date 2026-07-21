import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";

import "./NotificationSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  orderUpdates: true,
  inventoryAlerts: true,
  marketingEmails: false,
};

const KEY_MAP = {
  emailNotifications: "notification.emailNotifications",
  smsNotifications: "notification.smsNotifications",
  pushNotifications: "notification.pushNotifications",
  orderUpdates: "notification.orderUpdates",
  inventoryAlerts: "notification.inventoryAlerts",
  marketingEmails: "notification.marketingEmails",
};

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        const next = {};
        Object.keys(DEFAULTS).forEach((field) => {
          const key = KEY_MAP[field];
          next[field] = data[key] === undefined ? DEFAULTS[field] : data[key] === "true";
        });
        setNotificationSettings(next);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {};
      Object.keys(notificationSettings).forEach((field) => {
        payload[KEY_MAP[field]] = String(notificationSettings[field]);
      });
      await UpdateSettings(payload);
      toast.success("Notification settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
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

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default NotificationSettings;
