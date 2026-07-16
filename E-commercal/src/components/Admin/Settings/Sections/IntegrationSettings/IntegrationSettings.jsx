import { useState } from "react";
import { FiGrid } from "react-icons/fi";

import "./IntegrationSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsSwitch from "../../Shared/SettingsSwitch/SettingsSwitch";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const IntegrationSettings = () => {
  const [integrationSettings, setIntegrationSettings] = useState({
    stripe: true,
    paypal: false,
    googleAnalytics: true,
    facebookPixel: false,
    slack: false,
    webhookApi: false,
  });

  const handleSave = () => {
    console.log(integrationSettings);
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

      <SaveButton onClick={handleSave} />
    </SettingsCard>
  );
};

export default IntegrationSettings;
