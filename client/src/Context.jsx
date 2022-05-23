import { useEffect, useContext, React } from 'react';
import App from './components/App';


// export React.createContext()

export default Context = function() {

    const value = {};
    return (
    <>
        <Provider value={value}>
            <App />
        </Provider>
    </>
    );
};