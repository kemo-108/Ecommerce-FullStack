import "./DeleteAccount.css";
import { FiTrash2 } from "react-icons/fi";

const DeleteAccount = () => {
  return (
    <div className="delete-account-card">
      <div className="delete-info">
        <div className="card-title">
          <FiTrash2 />
          <h3>Delete Account</h3>
        </div>

        <p>
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
      </div>

      <button className="delete-account-btn">Delete Account</button>
    </div>
  );
};

export default DeleteAccount;
