import fs from "fs";
import path from "path";
import create from "zustand";

import { useCharacter } from ".";
import { ICharacter } from "../lib";

interface FileState {
  path?: string;
  setPath: (p: string) => void;
  [key: string]: any;
}

export const useFileState = create<FileState>((set) => ({
  path: undefined,
  setPath: (p: string) => set({ path: p }),
}));

export const saveFile = async () => {
  const charData = useCharacter.getState().character as ICharacter;
  const currentPath = useFileState.getState().path;

  const fileName = currentPath
    ? path.basename(currentPath)
    : `${charData.name || "character"}.json`;
  const filePath = currentPath ?? `./${fileName}`;

  try {
    fs.writeFile(filePath, JSON.stringify(charData, null, 2), (err) => {
      if (err) throw err;
    });
    useCharacter.setState({ isDirty: false });
  } catch (e) {
    console.error(e);
  }
};
