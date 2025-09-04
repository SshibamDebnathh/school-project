'use client'

import React, { useEffect, useState, useContext, createContext } from 'react'

const SchoolsContext = createContext();

export function SchoolsProvider({ children }) {

    const [schools, setSchools] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch('/api/getSchools')
            if (!res.ok) throw new Error("Failed to fetch schools")
            const data = await res.json()
            setSchools(data)
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    useEffect(() => {

        getData();
    }, [])

    return (
        <SchoolsContext.Provider value={{ schools, setSchools, getData }}>
            {children}
        </SchoolsContext.Provider>
    )
}

export function useSchools() {
    return useContext(SchoolsContext);
}