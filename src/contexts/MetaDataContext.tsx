"use client"

import { createContext, useContext, useState } from "react";

interface AppMetaData {
    [key: string]: any;
}

const AppMetaDataContext = createContext<AppMetaData>({});

export function MetaDataProvider({ initialMetadata, children }: { initialMetadata: AppMetaData, children: React.ReactNode }) {
    const [metadata, setMetadata] = useState(initialMetadata);

    return (
        <AppMetaDataContext.Provider value={metadata}>
            {children}
        </AppMetaDataContext.Provider>
    )
}

export function useAppMetaData() {
    return useContext(AppMetaDataContext);
}