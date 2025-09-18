import { execSync } from 'child_process';

/**
 * Detect commit type based on filename and diff content
 */

const detectCommitType = (file: string): string => {
  if (file.endsWith('.md')) return 'docs';
  if (file.includes('test') || file.includes('__tests__')) return 'test';
  if (file.includes('config') || file.endsWith('.json')) return 'chore';

  // check diff content for potential bug fixes
  try {
    const diff = execSync(`git diff --staged ${file}`, { encoding: 'utf-8' });

    if (/fix|bug|error|issue/i.test(diff)) return 'fix';
    if (/add|create|implement/i.test(diff)) return 'feat';
    if (/refactor|cleanup|optimize/i.test(diff)) return 'refactor';
  } catch {
    return 'refactor';
  }

  return 'refactor';
};

/**
 * Build a commit message suggestion based on staged files
 */

export const generateCommitMessage = (files: string[]): string => {
  if (files.length === 0) {
    return 'chore: update project';
  }

  const type = detectCommitType(files[0]); // Use first staged file as a heuristic for commit type
  const scope = files[0].split('/')[0] ?? '';
  const description =
    files.length === 1 ? `update ${files[0]}` : `update ${files.length} files`;

  return scope
    ? `${type}(${scope}): ${description}`
    : `${type}: ${description}`;
};
