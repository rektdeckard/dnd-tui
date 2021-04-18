import React from "react";
import fs from "fs";
import { render } from "ink";
import meow from "meow";

import { useCharacter } from "./state";
import App from "./ui";
import { Character } from "./lib";
import { useFileState } from "./state/data";

const cli = meow(
  `
	Usage
	  $ dnd-tui [CHARFILE]

	Options
		-f, --file [CHARFILE]         alias to open existing CHARFILE
    -h, --help                    show this help message

	Examples
	  $ dnd-tui ~/games/elrond.json
`,
  {
    flags: {
      file: {
        type: "string",
        alias: "f",
      },
      help: {
        type: "boolean",
        alias: "h",
      },
    },
  }
);

if (cli.flags.help) {
  cli.showHelp();
}

const path = cli.input[0] || cli.flags.file;

try {
  if (
    path &&
    fs.stat(path, (err, stats) => {
      if (err) throw err;
      if (!stats.isFile) throw new Error(`${path} is not a file`);

      fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
        if (err) throw err;
        const c = JSON.parse(data);
        useFileState.getState().setPath(path);
        useCharacter.getState().setCharacter(new Character(c), false);
      });
    })
  ) {
  }
} catch (e) {
  console.error(e);
}

render(<App />);
