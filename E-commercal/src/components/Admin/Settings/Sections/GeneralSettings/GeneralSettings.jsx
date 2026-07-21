import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import "./GeneralSettings.css";
import { toast } from "react-toastify";
import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  storeName: "My Store",
  storeEmail: "",
  phone: "",
  currency: "EGP (E£)",
  description: "",
};

const GeneralSettings = () => {
  const [generalSettings, setGeneralSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        setGeneralSettings({
          storeName: data["general.storeName"] ?? DEFAULTS.storeName,
          storeEmail: data["general.storeEmail"] ?? DEFAULTS.storeEmail,
          phone: data["general.phone"] ?? DEFAULTS.phone,
          currency: data["general.currency"] ?? DEFAULTS.currency,
          description: data["general.description"] ?? DEFAULTS.description,
        });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!generalSettings.storeName.trim()) {
      toast.error("Store name is required.");
      return;
    }
    if (!generalSettings.storeEmail.trim()) {
      toast.error("Store email is required.");
      return;
    }
    if (!generalSettings.phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    setSaving(true);
    try {
      await UpdateSettings({
        "general.storeName": generalSettings.storeName,
        "general.storeEmail": generalSettings.storeEmail,
        "general.phone": generalSettings.phone,
        "general.currency": generalSettings.currency,
        "general.description": generalSettings.description,
      });
      toast.success("General settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiSettings />} title="General Settings">
      <SettingsInput
        label="Store Name"
        value={generalSettings.storeName}
        onChange={(e) =>
          setGeneralSettings({ ...generalSettings, storeName: e.target.value })
        }
      />
      <SettingsInput
        label="Store Email"
        value={generalSettings.storeEmail}
        onChange={(e) =>
          setGeneralSettings({ ...generalSettings, storeEmail: e.target.value })
        }
      />
      <SettingsInput
        label="Phone Number"
        value={generalSettings.phone}
        onChange={(e) =>
          setGeneralSettings({ ...generalSettings, phone: e.target.value })
        }
      />
      <SettingsSelect
        label="Currency"
        value={generalSettings.currency}
        onChange={(e) =>
          setGeneralSettings({ ...generalSettings, currency: e.target.value })
        }
        options={["USD ($)", "EUR (€)", "EGP (E£)", "SAR (﷼)"]}
      />
      <SettingsInput
        label="Store Description"
        value={generalSettings.description}
        onChange={(e) =>
          setGeneralSettings({ ...generalSettings, description: e.target.value })
        }
      />
      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default GeneralSettings;
