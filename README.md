# MASL
Matto's Assembly-Styled Language is a programming language that looks like assembly but the language is interpreted.

## Commands
[Commands](https://github.com/Matto58/masl/wiki/Commands) are in the wiki.

## How to run
You'll need NodeJS.
After getting the latest version of NodeJS, go to the folder where `masl.js` is stored in the terminal of your choice.
Then run `node masl <filename> [args]` and replace `<filename>` with the file name of your code.

If you'd like, you can add these arguments:
- `-vl` / `--view-lines`
  - Shows all lines of code.
- `-sm` / `--show-mem`
  - Shows contents of all banks and registers.
- `-sc` / `--show-current` (Added in v1.0.0-beta3)
  - Shows current line.
- `-ri` / `--remove-intro` (Added in v1.0.0-beta4)
  - Removes intro on start.
- `-mc` / `--monochrome` (Added in v1.0.0-beta5)
  - Removes all colors and styles.
- `-sw` / `--show-warns` (Added in v1.0.0-beta6)
  - Shows warnings in console.
- `-sa` / `--show-args` (Added in v1.0.0-beta6)
  - Shows passed arguments.
- `-a` / `--pass-arg` (Added in v1.0.0-beta6)
  - Passes arguments like this: `-a:1:2:3` or `--pass-arg:1:2:3`
