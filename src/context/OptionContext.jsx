import React, { createContext, useContext, useState } from 'react';

const OptionContext = createContext();

export function OptionProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const setOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <OptionContext.Provider value={{ selectedOption, setOption }}>
      {children}
    </OptionContext.Provider>
  );
}

export function useOption() {
  return useContext(OptionContext);
}
