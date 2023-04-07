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
    <form className="flex flex-col gap-8 justify-left text-left self-left items-center " onSubmit={handleSubmit}>
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
              className=" bg-white mt-1 p-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue  focus:border-transparent"
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
            className=" py-2 w-24 "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* <div className="w-full flex flex-col">
          <label className="font-bold">Last Login:</label>
          <input
            type="datetime-local"
            name="lastLogin"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
          />
        </div> */}
      </div>

      <button
        type="submit"
        className=" w-2/5 inline-block py-3 px-5 text-base font-bold text-center no-underline text-white bg-green-600 hover:bg-oou-purple border-none rounded-lg cursor-pointer btn btn-success"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditUserInfoForm;
