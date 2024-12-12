import { createContext, useContext, Dispatch, useEffect } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppSateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
);

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    useEffect(() => {
      save(state);
    }, [state]);

    return (
      <AppSateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppSateContext.Provider>
    );
  },
);

export const useAppState = () => {
  return useContext(AppSateContext);
};
