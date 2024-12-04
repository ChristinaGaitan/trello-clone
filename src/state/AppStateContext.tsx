import { createContext, useContext, FC, PropsWithChildren } from "react";
import { AppState, List, Task } from "./appStateReducer";

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{id: "c0", text: "Generate app scaffold"}]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{id: "c1", text: "Learn Typescript"}]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{id: "c3", text: "Begin to use static typing"}]
        }
    ]
}

type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
}

const AppSateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
    const { lists } = appData;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
        <AppSateContext.Provider value={{lists, getTasksByListId}}>
            {children}
        </AppSateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppSateContext)
}