import { execSync } from 'child_process';
/**
 * Run git commit with the provided message
 */
export const runGitCommit = (message: string): void => {
  try {
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
  } catch {
    console.error(
      '❌ Failed to run git commit. Make sure you have staged files',
    );
  }
};
