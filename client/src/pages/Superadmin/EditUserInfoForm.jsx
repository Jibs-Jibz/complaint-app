import React, { useState } from "react";

const EditUserInfoForm = ({ onEditUser, user = {} }) => {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState(user.password || "");
  const [role, setRole] = useState(user.role || "user");
  const [lastLogin, setLastLogin] = useState(user.lastLogin || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: user.id,
      username,
      password,
      role,
      lastLogin,
    };

    onEditUser(updatedUser);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h3 className="text-oou-blue text-2xl font-bold">
        Edit User Information
      </h3>

      <div className="flex flex-col gap-3 justify-between max-w-xl">
        <div className="w-full flex flex-row gap-6">
          <div className="w-full flex flex-col">
            <label className="font-bold">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label className="font-bold">Role:</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="w-full flex flex-col">
          <label className="font-bold">Last Login:</label>
          <input
            type="datetime-local"
            name="lastLogin"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-block py-3 px-5 text-base font-bold text-center no-underline text-white bg-green-600 hover:bg-oou-purple border-none rounded-lg cursor-pointer btn btn-success"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditUserInfoForm;
