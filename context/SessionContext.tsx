"use client";
import { Session, User } from "lucia";
import React, { PropsWithChildren, createContext, useContext } from "react";

export type SessionProviderProps = {
    user: User | null;
    session: Session | null;
};

const SessionContext = createContext<SessionProviderProps>(
    {} as SessionProviderProps
);

export const SessionProvider: React.FC<
    PropsWithChildren & SessionProviderProps
> = (props) => {
    return (
        <SessionContext.Provider
            value={{ session: props.session, user: props.user }}
        >
            {props.children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const sessionContext = useContext(SessionContext);

    if (!sessionContext)
        throw new Error("useSession must be used within a SessionProvider");
    return sessionContext;
};
