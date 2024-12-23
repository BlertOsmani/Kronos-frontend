import { useState } from "react";

export function useUser() {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    const [user, setUser] = useState(storedUser);

    function fetchUserFromLocalStorage() {
        const stored_user = JSON.parse(localStorage.getItem("user")) || null;
        setUser(stored_user);
    }

    function updateUserInLocalStorage(new_user) {
        console.log("new user", new_user);
        setUser(new_user);
        localStorage.setItem("user", JSON.stringify(new_user));
    }

    return { user, fetchUserFromLocalStorage, updateUserInLocalStorage };
}
