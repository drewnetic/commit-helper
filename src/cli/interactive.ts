import inquirer from 'inquirer';

/**
 * Ask the user for commit details interactively
 */
export const runInteractiveMode = async (): Promise<string> => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select commit type:',
      choices: ['feat', 'fix', 'docs', 'refactor', 'test', 'chore'],
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Scope (optional)',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Short description:',
      validate: (input) => input.length > 0 || 'Description cannot be empty',
    },
  ]);

  const { type, scope, description } = answers;

  return scope
    ? `${type}(${scope}): ${description}`
    : `${type}: ${description}`;
};
