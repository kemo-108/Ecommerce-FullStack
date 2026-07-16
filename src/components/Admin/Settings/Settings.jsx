import { useState } from "react";
import "./Settings.css";

import SettingsTabs from "./Shared/SettingsTabs/SettingsTabs";

import GeneralSettings from "./Sections/GeneralSettings/GeneralSettings";
import LanguageSettings from "./Sections/LanguageSettings/LanguageSettings";
import EmailSettings from "./Sections/EmailSettings/EmailSettings";
import SystemSettings from "./Sections/SystemSettings/SystemSettings";

import ProfileSettings from "./ProfileSettings/ProfileSettings";
import SecuritySettings from "./Sections/SecuritySettings/SecuritySettings";
import NotificationSettings from "./Sections/NotificationSettings/NotificationSettings";
import BillingSettings from "./Sections/BillingSettings/BillingSettings";
import IntegrationSettings from "./Sections/IntegrationSettings/IntegrationSettings";
import AppearanceSettings from "./Sections/AppearanceSettings/AppearanceSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings</p>
      </div>

      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "general" && (
        <div className="settings-grid">
          <GeneralSettings />
          <LanguageSettings />
          <EmailSettings />
          <SystemSettings />
        </div>
      )}

      {activeTab === "profile" && <ProfileSettings />}

      {activeTab === "security" && <SecuritySettings />}

      {activeTab === "notifications" && <NotificationSettings />}

      {activeTab === "billing" && <BillingSettings />}

      {activeTab === "integrations" && <IntegrationSettings />}

      {activeTab === "appearance" && <AppearanceSettings />}
    </div>
  );
};

export default Settings;
