import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';

const UserContext = createContext();

export default function UserProvider({children}) {
    const stored_user = JSON.parse(localStorage.getItem('user')) || null;
    const [user, setUser] = useState(stored_user);

    function fetchUserFromLocalStorage(){
        const stored_user = JSON.parse(localStorage.getItem('user')) || null;
        setUser(stored_user);
    }

    function updateUserFromLocalStorage(new_user){
        setUser(new_user);
        localStorage.setItem('user', JSON.stringify(new_user));
    }

  return (
    <UserContext.Provider value={{user, fetchUserFromLocalStorage, updateUserFromLocalStorage}}>
        {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
    children: PropTypes.node
}

export const useUser = () => useContext(UserContext);
