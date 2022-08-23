import React, { createContext } from "react";

const UserContext = createContext({}); 
export const UserProvider = UserContext.Provider;
// export const UserConsumer = UserContext.Consumer; //phần consumer chỉ dành cho class component
export default UserContext;