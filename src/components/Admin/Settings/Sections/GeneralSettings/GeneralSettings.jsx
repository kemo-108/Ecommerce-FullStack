import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import "./GeneralSettings.css";
import { toast } from "react-toastify";
import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SettingsSelect from "../../Shared/SettingsSelect/SettingsSelect";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const GeneralSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "My Awesome Store",
    storeEmail: "admin@store.com",
    phone: "+20 100 123 4567",
    currency: "EGP (E£)",
    description: "Premium fashion store",
  });
  const handleSave = () => {
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

    console.log(generalSettings);

    toast.success("General settings saved successfully.");
  };
  return (
    <SettingsCard icon={<FiSettings />} title="General Settings">
      <SettingsInput
        label="Store Name"
        value={generalSettings.storeName}
        onChange={(e) =>
          setGeneralSettings({
            ...generalSettings,
            storeName: e.target.value,
          })
        }
      />
      <SettingsInput
        label="Store Email"
        value={generalSettings.storeEmail}
        onChange={(e) =>
          setGeneralSettings({
            ...generalSettings,
            storeEmail: e.target.value,
          })
        }
      />
      <SettingsInput
        label="Phone Number"
        value={generalSettings.phone}
        onChange={(e) =>
          setGeneralSettings({
            ...generalSettings,
            phone: e.target.value,
          })
        }
      />
      <SettingsSelect
        label="Currency"
        value={generalSettings.currency}
        onChange={(e) =>
          setGeneralSettings({
            ...generalSettings,
            currency: e.target.value,
          })
        }
        options={["USD ($)", "EUR (€)", "EGP (E£)", "SAR (﷼)"]}
      />
      <SettingsInput
        label="Store Description"
        value={generalSettings.description}
        onChange={(e) =>
          setGeneralSettings({
            ...generalSettings,
            description: e.target.value,
          })
        }
      />
      <SaveButton onClick={handleSave} />{" "}
    </SettingsCard>
  );
};

export default GeneralSettings;
