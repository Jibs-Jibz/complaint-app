import React, { useState, useEffect } from "react";
import moment from "moment";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/complaintsData.json")
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.map((complaint) => ({
          id: complaint.id,
          username: `${complaint.firstName} ${complaint.lastName}`,
          role: complaint.role,
          password: complaint.password,
          lastLogin: complaint.lastLogin,
        }));
        setUsers(mappedData);
      });
  }, []);

  const handleAddUser = (user) => {
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newUser = { ...user, id: maxId + 1 };
    setUsers([...users, newUser]);

    fetch("/complaintsData.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // filter users by role
  const adminUsers = users.filter((user) => user.role === "admin");
  const regularUsers = users.filter((user) => user.role === "user");

  return (
    <div className="flex flex-col gap-12">
      <div className=" flex flex-row gap-8 justify-between ">
        <AddUserForm onAddUser={handleAddUser} />
        <div className="flex flex-row gap-12">
          <div>
            <h2 className="text-oou-blue text-2xl font-bold">
              Admins ({adminUsers.length})
            </h2>
            <ul>
              {adminUsers.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-oou-blue text-2xl font-bold">
              Users ({regularUsers.length})
            </h2>
            <ul>
              {regularUsers.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/* <th>Password</th> */}
            <th>Role</th>
            <th>Last Login</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.role}</td>
              <td>{user.lastLogin}</td>
              <td>
                <button
                  className="inline-block py-3 px-5 text-base font-bold text-center no-underline text-white bg-red-600 hover:bg-oou-purple border-none rounded-lg cursor-pointer btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function AddUserForm({ onAddUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [lastLogin, setLastLogin] = useState(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  );

  const addUser = () => {
    var name = document.getElementById("username").value;
    var email = "";
    var date = new Date().toISOString();
    var userList = document.getElementById("userList");
    var users = userList.getElementsByTagName("li");
    // Check if user already exists
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.innerHTML.indexOf(name) !== -1) {
        alert("User already exists!");
        return;
      }
    }
    var userEntry = document.createElement("li");
    userEntry.innerHTML = name + " (" + email + ") - " + date;
    userList.appendChild(userEntry);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: Math.floor(Math.random() * 1000),
      username,
      password,
      role,
      lastLogin,
    };

    onAddUser(user);
    setUsername("");
    setPassword("");
    setRole("user");
    setLastLogin(new Date().toISOString().slice(0, 19).replace("T", " "));
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h3 className="text-oou-blue text-2xl font-bold">Add User</h3>

      <div className="flex flex-col gap-3 justify-between max-w-xl">
        <div className="w-full flex flex-row gap-6">
          <div className="w-full flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              className="mt-1 p-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="mt-1 p-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <label htmlFor="role" className="text-gray-700 font-semibold">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full mt-1 p-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-oou-blue focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className=" py-2 px-8 mt-4 text-white bg-oou-purple rounded-lg w-40 hover:bg-oou-blue transition-colors duration-300 ease-in-out"
      >
        Add User
      </button>
    </form>
  );
}

export default ManageUsers;
