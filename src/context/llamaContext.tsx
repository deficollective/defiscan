"use client";

import {defiLlama} from "@/services/defillama";
import React, {useState, useEffect, createContext, ReactNode} from "react";
import {Project} from "@/lib/types";

interface ILLamaContext {
    projects: Project[];
    loading: boolean;
}

const LlamaContext = createContext<ILLamaContext>({} as ILLamaContext);

export function LLamaContextProvider({ children }: {
    children: ReactNode
}) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const projects = await defiLlama.getProjects();
            setProjects(() => {
                setLoading(false);
                return projects;
            });
        }

        fetchData();
    }, []);

    return (
        <LlamaContext.Provider
             value={{ projects, loading }}
        >
            {children}
        </LlamaContext.Provider>
    );
}

export default LlamaContext;
