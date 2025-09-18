import { generateCommitMessage } from "./core/commitMessage";
import { getStagedFiles } from "./infra/git";

const files = getStagedFiles()

if(files.length === 0) {
  console.log("⚠️ No staged files found. Stage some files with `git add`.")
} else {
  console.log("📂 Staged files:")
  files.forEach((file) => console.log(" -", file))

  const suggestion = generateCommitMessage(files)
  console.log("\n💡 Suggested commit message:")
  console.log(suggestion)
}