import { useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";

import "./BillingSettings.css";
import { toast } from "react-toastify";

import SettingsCard from "../../Shared/SettingsCard/SettingsCard";
import SettingsInput from "../../Shared/SettingsInput/SettingsInput";
import SaveButton from "../../Shared/SaveButton/SaveButton";
import { GetSettings, UpdateSettings } from "../../../../../services/SettingsService";

const DEFAULTS = {
  companyName: "",
  taxNumber: "",
  vatNumber: "",
  billingAddress: "",
};

const KEY_MAP = {
  companyName: "billing.companyName",
  taxNumber: "billing.taxNumber",
  vatNumber: "billing.vatNumber",
  billingAddress: "billing.billingAddress",
};

const BillingSettings = () => {
  const [billingSettings, setBillingSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetSettings()
      .then((data) => {
        const next = {};
        Object.keys(DEFAULTS).forEach((field) => {
          next[field] = data[KEY_MAP[field]] ?? DEFAULTS[field];
        });
        setBillingSettings(next);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {};
      Object.keys(billingSettings).forEach((field) => {
        payload[KEY_MAP[field]] = billingSettings[field];
      });
      await UpdateSettings(payload);
      toast.success("Billing information saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={<FiCreditCard />} title="Billing Information">
      <SettingsInput
        label="Company Name"
        value={billingSettings.companyName}
        onChange={(e) =>
          setBillingSettings({ ...billingSettings, companyName: e.target.value })
        }
      />

      <SettingsInput
        label="Tax Number"
        value={billingSettings.taxNumber}
        onChange={(e) =>
          setBillingSettings({ ...billingSettings, taxNumber: e.target.value })
        }
      />

      <SettingsInput
        label="VAT Number"
        value={billingSettings.vatNumber}
        onChange={(e) =>
          setBillingSettings({ ...billingSettings, vatNumber: e.target.value })
        }
      />

      <SettingsInput
        label="Billing Address"
        value={billingSettings.billingAddress}
        onChange={(e) =>
          setBillingSettings({ ...billingSettings, billingAddress: e.target.value })
        }
      />

      <SaveButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </SaveButton>
    </SettingsCard>
  );
};

export default BillingSettings;
