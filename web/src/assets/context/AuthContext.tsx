"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextInterface {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface AuthProviderInterface {
  children: ReactNode;
}

export type AuthContextValue = AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth se debe de utilizar dentro de AuthProvider");
  }
  return context;
};
