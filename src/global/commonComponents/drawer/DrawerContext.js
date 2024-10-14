import React, { createContext, useState, useCallback } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [state, setState] = useState({
        left: false,
        right: false,
        top: false,
        bottom: false,
    });

    // Memoize the toggleDrawer to prevent unnecessary re-renders
    const toggleDrawer = useCallback((anchor, open) => {
        setState(prevState => ({ ...prevState, [anchor]: open }));
    }, []);

    return (
        <DrawerContext.Provider value={{ state, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => React.useContext(DrawerContext);
