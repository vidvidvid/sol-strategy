import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Trade {
  type: string;
  pair: string;
  amount: number;
  price: number;
  timestamp: number;
}

export interface AgentPerformance {
  totalProfit: number;
  winRate: number;
  tradeCount: number;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  selectedCharacter: string | null;
  setSelectedCharacter: (value: string | null) => void;
  agentActions: Trade[];
  setAgentActions: React.Dispatch<React.SetStateAction<Trade[]>>;
  agentPerformance: AgentPerformance;
  setAgentPerformance: React.Dispatch<React.SetStateAction<AgentPerformance>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [agentActions, setAgentActions] = useState<Trade[]>([]);
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance>({
    totalProfit: 0,
    winRate: 0,
    tradeCount: 0,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        selectedCharacter,
        setSelectedCharacter,
        agentActions,
        setAgentActions,
        agentPerformance,
        setAgentPerformance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
