import { getStagedFiles } from "./infra/git";

const files = getStagedFiles()

if(files.length === 0) {
  console.log("⚠️ No staged files found. Stage some files with `git add`.")
} else {
  console.log("📂 Staged files:")
  files.forEach((file) => console.log(" -", file))
}