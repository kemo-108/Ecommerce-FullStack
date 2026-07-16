import {
  FiSettings,
  FiUser,
  FiShield,
  FiBell,
  FiCreditCard,
  FiGrid,
  FiSun,
} from "react-icons/fi";

import "./SettingsTabs.css";

const tabs = [
  {
    id: "general",
    label: "General",
    icon: <FiSettings />,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <FiUser />,
  },
  {
    id: "security",
    label: "Security",
    icon: <FiShield />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <FiBell />,
  },
  {
    id: "billing",
    label: "Billing",
    icon: <FiCreditCard />,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <FiGrid />,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <FiSun />,
  },
];

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="settings-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}

          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;
