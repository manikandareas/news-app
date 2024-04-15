"use client";

import React from "react";

type TSidebarContext = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<TSidebarContext | null>(null);

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error(
            "useSidebarContext must be used within a SidebarProvider"
        );
    }
    return context;
};
