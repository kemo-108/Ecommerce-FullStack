import { useState } from "react";
import { FiCreditCard } from "react-icons/fi";

import "./BillingSettings.css";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SaveButton from "../../Shared/SaveButton/SaveButton";

const BillingSettings = () => {
  const [billingSettings, setBillingSettings] = useState({
    companyName: "Style Store",
    taxNumber: "123456789",
    vatNumber: "EG123456789",
    billingAddress: "Cairo, Egypt",
  });

  const handleSave = () => {
    console.log(billingSettings);
  };

  return (
    <SettingsCard icon={<FiCreditCard />} title="Billing Information">
      <SettingsInput
        label="Company Name"
        value={billingSettings.companyName}
        onChange={(e) =>
          setBillingSettings({
            ...billingSettings,
            companyName: e.target.value,
          })
        }
      />

      <SettingsInput
        label="Tax Number"
        value={billingSettings.taxNumber}
        onChange={(e) =>
          setBillingSettings({
            ...billingSettings,
            taxNumber: e.target.value,
          })
        }
      />

      <SettingsInput
        label="VAT Number"
        value={billingSettings.vatNumber}
        onChange={(e) =>
          setBillingSettings({
            ...billingSettings,
            vatNumber: e.target.value,
          })
        }
      />

      <SettingsInput
        label="Billing Address"
        value={billingSettings.billingAddress}
        onChange={(e) =>
          setBillingSettings({
            ...billingSettings,
            billingAddress: e.target.value,
          })
        }
      />

      <SaveButton onClick={handleSave} />
    </SettingsCard>
  );
};

export default BillingSettings;
