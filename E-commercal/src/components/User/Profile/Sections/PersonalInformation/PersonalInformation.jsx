import { useState } from "react";
import "./PersonalInformation.css";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  GetCurrentUser,
  UpdateMe,
  SaveSession,
} from "../../../../../services/AuthService";

const PersonalInformation = () => {
  const currentUser = GetCurrentUser();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await UpdateMe(formData);
      // Keep the cached session in sync so the sidebar/ProfileCard reflect it too.
      SaveSession({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        user: updatedUser,
      });
      toast.success("Profile updated successfully.");
      setEditing(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
    });
    setEditing(false);
  };

  return (
    <section className="personal-information">
      <div className="section-header">
        <div>
          <h2>Personal Information</h2>
          <p>Manage your personal details.</p>
        </div>

        {editing ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="edit-btn" onClick={handleCancel}>
              <FiX />
              Cancel
            </button>
            <button className="edit-btn" onClick={handleSave} disabled={saving}>
              <FiSave />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            <FiEdit2 />
            Edit Profile
          </button>
        )}
      </div>

      <div className="information-grid">
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!editing}
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input type="email" value={currentUser?.email || ""} readOnly />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!editing}
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
