'use client'
import { Provider } from "react-redux";
import { ConfigStore } from "./store";

const ReduxProvider = ({children} : {children : React.ReactNode}) => {
    return (
        <Provider store={ConfigStore}>
            {children}
        </Provider>
    )
}

export default ReduxProvider;