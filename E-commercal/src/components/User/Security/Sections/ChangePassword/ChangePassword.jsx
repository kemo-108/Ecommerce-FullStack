import { useState } from "react";
import "./ChangePassword.css";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { ChangePassword as ChangePasswordRequest } from "../../../../../services/AuthService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.currentPassword || !formData.newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation don't match.");
      return;
    }

    setSaving(true);
    try {
      await ChangePasswordRequest({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password updated successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="change-password-card">
      <div className="card-title">
        <FiLock />
        <h3>Change Password</h3>
      </div>

      <div className="password-form">
        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          className="change-password-btn"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
