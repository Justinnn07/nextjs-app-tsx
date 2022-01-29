import React, { createContext, useContext, useReducer } from "react";
// create context object
export const DataLayerContext = createContext<any>(null);

// data layer
export const DataLayer = ({ reducer, initialState, children }: any) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

// use context hook
const useDataLayerValue = () => useContext(DataLayerContext);

export { useDataLayerValue };
export default DataLayer;
