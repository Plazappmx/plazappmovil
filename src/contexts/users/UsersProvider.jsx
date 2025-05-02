import { useState } from "react";
import UsersContext from "./UsersContext";

const UsersProvider = ({ children }) => {
  const [userTenant, setUserTenant] = useState({});
  const [userToEdit, setUserToEdit] = useState({});

  const data = {
    userTenant,
    setUserTenant,
    userToEdit,
    setUserToEdit,
  };

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
