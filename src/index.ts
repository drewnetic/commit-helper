import { runInteractiveMode } from './cli/interactive';
import { generateCommitMessage } from './core/commitMessage';
import { getStagedFiles } from './infra/git';
import { runGitCommit } from './infra/commit';

const files = getStagedFiles();

(async () => {
  if (files.length === 0) {
    console.log('⚠️ No staged files found. Stage some files with `git add`.');
    return;
  }

  console.log('📂 Staged files:');
  files.forEach((file: string) => console.log(' -', file));

  let finalMessage: string;

  if (process.argv.includes('--interactive')) {
    finalMessage = await runInteractiveMode();
  } else {
    finalMessage = generateCommitMessage(files);
    console.log('\n💡 Suggested commit message:');
    console.log(finalMessage);
  }

  if (process.argv.includes('--commit')) {
    runGitCommit(finalMessage);
  } else {
    console.log(
      '\n👉 Run again with --commit to apply this message automatically',
    );
  }
})();
