import { runInteractiveMode } from './cli/interactive';
import { generateCommitMessage } from './core/commitMessage';
import { getStagedFiles } from './infra/git';
import { runGitCommit } from './infra/commit';
import chalk from 'chalk';

const args = process.argv.slice(2);

const showHelp = () => {
  console.log(`
      ${chalk.green.bold('Commit Helper CLI')}
      ${chalk.gray(
        'A lightweight CLI to generate Conventional Commit messages.',
      )}

      Usage: 
        ${chalk.cyan('commit-helper')} [options]

      Options: 
        ${chalk.yellow('--interactive')} Run interactive mode
        ${chalk.yellow('--commit')} Run git commit with the generated message
        ${chalk.yellow('--help')} Show this help
        ${chalk.yellow('--version')} Show CLI version
    `);
};

(async () => {
  if (args.includes('--help')) {
    showHelp();
    return;
  }

  if (args.includes('--version')) {
    const { version } = await import('../package.json');
    console.log(chalk.green(`Commit Helper  v${version}`));
    return;
  }

  const files = getStagedFiles();

  if (files.length === 0) {
    console.log(
      chalk.yellow(
        '⚠️ No staged files found. Stage some files with `git add`.',
      ),
    );
    return;
  }

  console.log(chalk.blue('📂 Staged files:'));
  files.forEach((file: string) => console.log(' -', file));

  let finalMessage: string;

  if (process.argv.includes('--interactive')) {
    finalMessage = await runInteractiveMode();
  } else {
    finalMessage = generateCommitMessage(files);
    console.log(chalk.cyan('\n💡 Suggested commit message:'));
    console.log(chalk.white(finalMessage));
  }

  if (process.argv.includes('--commit')) {
    console.log(chalk.green('\n✅ Running git commit...'));
    runGitCommit(finalMessage);
  } else {
    console.log(
      chalk.gray(
        '\n👉 Run again with --commit to apply this message automatically',
      ),
    );
  }
})();
