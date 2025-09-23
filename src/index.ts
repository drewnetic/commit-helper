import { runInteractiveMode } from './cli/interactive';
import { generateCommitMessage } from './core/commitMessage';
import { getStagedFiles } from './infra/git';

const files = getStagedFiles();

(async () => {
  if (files.length === 0) {
    console.log('⚠️ No staged files found. Stage some files with `git add`.');
    return;
  }

  console.log('📂 Staged files:');
  files.forEach((file: string) => console.log(' -', file));

  const suggestion = generateCommitMessage(files);
  console.log('\n💡 Suggested commit message:');
  console.log(suggestion);

  const interactive = process.argv.includes('--interactive');

  if (interactive) {
    const finalMessage = await runInteractiveMode();
    console.log('\n✅ Final commit message:');
    console.log(finalMessage);
  }
})();
