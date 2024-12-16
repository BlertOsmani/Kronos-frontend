import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const DialogContext = createContext();

export default function DialogProvider({children}){
    const [dialog, setDialog] = useState(null);

    function openDialog(name, payload){
        setDialog({name, payload});
    }

    function closeDialog(){
        setDialog(null);
    }

    return (
        <DialogContext.Provider value={{dialog, openDialog, closeDialog}}>
            {children}
        </DialogContext.Provider>
    )
}

DialogProvider.propTypes = {
    children: PropTypes.node
}

export const useDialog = () => useContext(DialogContext);