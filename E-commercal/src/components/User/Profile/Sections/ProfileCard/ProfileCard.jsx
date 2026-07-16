import "./ProfileCard.css";

import { FiCamera } from "react-icons/fi";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://i.pravatar.cc/300?img=12" alt="" />

        <button>
          <FiCamera />
        </button>
      </div>

      <div className="profile-info">
        <h2>Kemo Mostafa</h2>

        <p>kemo@example.com</p>

        <span>Member since June 2026</span>
      </div>
    </div>
  );
};

export default ProfileCard;
