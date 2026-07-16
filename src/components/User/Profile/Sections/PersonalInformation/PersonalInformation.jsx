import "./PersonalInformation.css";
import { FiEdit2 } from "react-icons/fi";

const PersonalInformation = () => {
  return (
    <section className="personal-information">
      <div className="section-header">
        <div>
          <h2>Personal Information</h2>
          <p>Manage your personal details.</p>
        </div>

        <button className="edit-btn">
          <FiEdit2 />
          Edit Profile
        </button>
      </div>

      <div className="information-grid">
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" value="Kemo Mostafa" readOnly />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input type="email" value="kemo@gmail.com" readOnly />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" value="+20 100 000 0000" readOnly />
        </div>

        <div className="input-group">
          <label>Gender</label>
          <input type="text" value="Male" readOnly />
        </div>

        <div className="input-group">
          <label>Country</label>
          <input type="text" value="Egypt" readOnly />
        </div>

        <div className="input-group">
          <label>City</label>
          <input type="text" value="Cairo" readOnly />
        </div>

        <div className="input-group">
          <label>Postal Code</label>
          <input type="text" value="12345" readOnly />
        </div>

        <div className="input-group">
          <label>Birth Date</label>
          <input type="text" value="20 / 04 / 2005" readOnly />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
