import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  Dispatch,
  useEffect,
} from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c1", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
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

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

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
};

export const useAppState = () => {
  return useContext(AppSateContext);
};
