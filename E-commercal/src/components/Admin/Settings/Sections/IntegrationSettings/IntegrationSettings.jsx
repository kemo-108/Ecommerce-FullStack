import { useEffect, useState } from "react";
import { FiGrid } from "react-icons/fi";

import "./IntegrationSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  stripe: false,
  paypal: false,
  googleAnalytics: false,
  facebookPixel: false,
  slack: false,
  webhookApi: false,
};

const KEY_MAP = {
  stripe: "integration.stripe",
  paypal: "integration.paypal",
  googleAnalytics: "integration.googleAnalytics",
  facebookPixel: "integration.facebookPixel",
  slack: "integration.slack",
  webhookApi: "integration.webhookApi",
};

const IntegrationSettings = () => {
  const [integrationSettings, setIntegrationSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        const next = {};
        Object.keys(DEFAULTS).forEach((field) => {
          const key = KEY_MAP[field];
          next[field] = data[key] === undefined ? DEFAULTS[field] : data[key] === "true";
        });
        setIntegrationSettings(next);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {};
      Object.keys(integrationSettings).forEach((field) => {
        payload[KEY_MAP[field]] = String(integrationSettings[field]);
      });
      await UpdateSettings(payload);
      toast.success("Integration settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiGrid />} title="Third Party Integrations">
      <SettingsSwitch
        label="Stripe"
        checked={integrationSettings.stripe}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            stripe: !integrationSettings.stripe,
          })
        }
      />

      <SettingsSwitch
        label="PayPal"
        checked={integrationSettings.paypal}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            paypal: !integrationSettings.paypal,
          })
        }
      />

      <SettingsSwitch
        label="Google Analytics"
        checked={integrationSettings.googleAnalytics}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            googleAnalytics: !integrationSettings.googleAnalytics,
          })
        }
      />

      <SettingsSwitch
        label="Facebook Pixel"
        checked={integrationSettings.facebookPixel}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            facebookPixel: !integrationSettings.facebookPixel,
          })
        }
      />

      <SettingsSwitch
        label="Slack"
        checked={integrationSettings.slack}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            slack: !integrationSettings.slack,
          })
        }
      />

      <SettingsSwitch
        label="Webhook API"
        checked={integrationSettings.webhookApi}
        onChange={() =>
          setIntegrationSettings({
            ...integrationSettings,
            webhookApi: !integrationSettings.webhookApi,
          })
        }
      />

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default IntegrationSettings;
