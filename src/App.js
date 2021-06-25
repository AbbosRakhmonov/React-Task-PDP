import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SearchBar from "./Components/SearchBar";

function App() {
  const filter = (active, letter) => {
    return users.filter(
      (item) =>
        (item.active === active || !active) &&
        (item.name.toLowerCase().includes(letter) ||
          item.lastname.toLowerCase().includes(letter) ||
          item.username.toLowerCase().includes(letter) ||
          !letter)
    );
  };

  const [users, setUsers] = useState([
    {
      id: 0,
      name: "Abbos",
      lastname: "Raxmonov",
      username: "@abbosbek",
      count: 0,
      active: false,
    },
    {
      id: 1,
      name: "Islom",
      lastname: "Karimov",
      username: "@islombek",
      count: 0,
      active: false,
    },
    {
      id: 2,
      name: "Abdulaziz",
      lastname: "Abdukarimov",
      username: "@abdulaziz",
      count: 0,
      active: false,
    },
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userActive, setUserActive] = useState("false");
  const [currentUser, setCurrentUser] = useState("");
  const [searchedUser, setSearchedUser] = useState("");

  const toggleActive = (userId) => {
    users.filter((item) =>
      item.id === userId ? (item.active = !item.active) : ""
    );
    setUsers([...users]);
    const res = filter(active, searchedUser);
    setFilteredUsers(res);
  };

  const onChangeActive = (event) => {
    const check = event.target.checked;
    setActive(check);
    const res = filter(check, searchedUser);
    setFilteredUsers(res);
  };

  const counter = (type, id) => {
    if (type === "-") {
      users.map((item) =>
        item.id === id && item.count > 0 ? (item.count = item.count - 1) : ""
      );
    } else {
      users.map((item) =>
        item.id === id ? (item.count = item.count + 1) : ""
      );
    }
    setUsers([...users]);
    const res = filter(active, searchedUser);
    setFilteredUsers(res);
  };

  const toggleModal = () => {
    setIsOpen((prev) => (prev = !prev));
  };

  const addNewUser = (e) => {
    e.preventDefault();
    if (currentUser === "") {
      setUsers([
        ...users,
        {
          name: firstName,
          lastname: lastName,
          username: username,
          count: 0,
          active: userActive === "false" ? false : true,
        },
      ]);
    } else {
      const user = users.filter((item) => item.id === currentUser)[0];
      user.name = firstName;
      user.lastname = lastName;
      user.username = username;
      user.active = userActive === "false" ? false : true;
      setUsers([...users]);
    }
    const res = filter(active);
    setFilteredUsers(res);
    toggleModal();
  };

  const deleteCurrentUser = (userId) => {
    users.map((item, index) =>
      item.id === userId ? users.splice(index, 1) : ""
    );
    setUsers([...users]);
    const res = filter(active, searchedUser);
    setFilteredUsers(res);
  };

  const editCurrentUser = (firstName, lastName, userName, status, userId) => {
    setFirstName(firstName);
    setLastName(lastName);
    setUsername(userName);
    setUserActive(status.toString());
    setCurrentUser(userId);
    toggleModal();
  };

  const onChangeUserFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };
  const onChangeUserLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
  };
  const onChangeUserName = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const onChangeUserActive = (event) => {
    const checked = event.target.value;
    setUserActive(checked);
  };

  const searchBar = (value) => {
    const res = filter(active, value);
    setFilteredUsers(res);
    setSearchedUser(value);
  };

  useEffect(() => {
    const res = filter(active);
    setFilteredUsers(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12 mb-3">
          <div className="row">
            <div className="col-md-6">
              <SearchBar
                onChangeActive={onChangeActive}
                value={active}
                searchBar={searchBar}
                searchedUser={searchedUser}
              />
            </div>
            <div className="col-md-6 text-end">
              <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader>Add New User</ModalHeader>
                <ModalBody>
                  <form id="user-form">
                    <div className="form-group mb-3">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstName}
                        onChange={onChangeUserFirstName}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastName}
                        onChange={onChangeUserLastName}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="username">Username</label>
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={onChangeUserName}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="status">Choose status</label>
                      <select
                        id="status"
                        className="form-control form-select"
                        value={userActive}
                        onChange={onChangeUserActive}
                      >
                        <option value="false">Inactive</option>
                        <option value="true">Active</option>
                      </select>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button
                    type="submit"
                    className="btn btn-success"
                    form="user-form"
                    onClick={addNewUser}
                  >
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={toggleModal}>
                    Close
                  </button>
                </ModalFooter>
              </Modal>
              <button
                className="btn btn-outline-success px-4"
                onClick={toggleModal}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <table className="table table-light table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col ">User Name</th>
                <th scope="col">Count</th>
                <th scope="col">Active</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">{item.lastname}</td>
                  <td className="text-primary align-middle">{item.username}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => counter("-", item.id)}
                    >
                      -
                    </button>
                    <span className="btn disabled">
                      <h4>{item.count}</h4>
                    </span>
                    <button
                      className="btn btn-dark"
                      onClick={() => counter("+", item.id)}
                    >
                      +
                    </button>
                  </td>
                  <td className="align-middle">
                    <input
                      type="checkbox"
                      className="form-check-input p-2"
                      checked={item.active}
                      onChange={() => toggleActive(item.id)}
                    />
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-outline-dark me-3"
                      onClick={() =>
                        editCurrentUser(
                          item.name,
                          item.lastname,
                          item.username,
                          item.active,
                          item.id
                        )
                      }
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteCurrentUser(item.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
