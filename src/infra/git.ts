import { execSync } from 'child_process';

/**
 * Get staged files from Git.
 * @returns string[] List of staged file paths
 */
export const getStagedFiles = (): string[] => {
  try {
    const output = execSync('git diff --staged --name-only', {
      encoding: 'utf-8',
    });

    return output
      .split('\n')
      .map((file) => file.trim())
      .filter(Boolean);
  } catch (error) {
    console.log(
      '❌ Failed to get staged files. Make sure you are in a Git repo.',
    );
    return [];
  }
};
