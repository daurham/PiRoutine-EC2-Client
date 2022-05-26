import React, { useMemo, useEffect, useContext, createContext } from 'react';
import App from './components/App';

const contextData = createContext(/* defaultValue */); 
export const useData = () => useContext(contextData); 


export default function Context() {
	let textData = { text: 'Data from Context component' };	

	const value = useMemo(() => ({ 
		textData
	 }), [/* upon change */]);
  
	return (
		<>
			<h1>My Context</h1>
			<contextData.Provider value={value}>
				<App />
			</contextData.Provider>
		</>
	);
};