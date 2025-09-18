/**
 * Detect commit type based on file name or path
 */

const detectCommitType = (file: string): string => {
  if (file.includes('test')) return 'test';
  if (file.endsWith('.md')) return 'docs';
  if (file.includes('config') || file.includes('.json')) return 'chore';
  if (file.includes('controller') || file.includes('service')) return 'feat';
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
  const description = `update ${files.length} files(s)`;

  return scope
    ? `${type}(${scope}): ${description}`
    : `${type}: ${description}`;
};

