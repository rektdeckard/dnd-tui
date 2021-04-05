import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(`
	Usage
	  $ dnd-ink-ts

	Options
		--name  Your name

	Examples
	  $ dnd-ink-ts --name=Jane
	  Hello, Jane
`);

void cli;

render(<App />);
