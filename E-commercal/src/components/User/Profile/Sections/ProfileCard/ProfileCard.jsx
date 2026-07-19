import "./ProfileCard.css";

import { FiCamera } from "react-icons/fi";
import { GetCurrentUser } from "../../../../../services/AuthService";

const ProfileCard = () => {
  const user = GetCurrentUser();

  const memberSince = user?.joined
    ? new Date(user.joined).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img
          src={user?.avatar || "https://i.pravatar.cc/300?img=12"}
          alt={user?.name || "User"}
        />

        <button>
          <FiCamera />
        </button>
      </div>

      <div className="profile-info">
        <h2>{user?.name || "Guest"}</h2>

        <p>{user?.email || ""}</p>

        {memberSince && <span>Member since {memberSince}</span>}
      </div>
    </div>
  );
};

export default ProfileCard;
