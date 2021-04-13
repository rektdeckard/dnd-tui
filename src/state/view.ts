import create from "zustand";

import { Character } from "../lib";

type ViewPane = null | "overview" | "saves" | "attacks" | keyof Character;

interface ViewState {
  activeView?: ViewPane;
  setActiveView: (view: ViewPane) => void;
  [key: string]: any;
}

export const useViewState = create<ViewState>((set) => ({
  activeView: null,
  setActiveView: (view: ViewPane) => set({ activeView: view }),
}));
