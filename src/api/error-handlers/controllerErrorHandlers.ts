export const handleNotExistingTodoId = (todoId: string): string => {
  return `TODO List with id '${todoId}' does not exist.`;
};

export const handleNoTodoIdSpecified = (): string => {
  return 'TODO List id has not been specified.';
};

export const handleNoTodNameSpecified = (): string => {
  return 'TODO List name has not been specified.';
};

export const handleNoIdOrNameSpecified = (): string => {
  return 'TODO List id or new name has not been specified.';
};

export const handleCreateUpdateErrors = (
  errorStack: string[],
  errorItems: string[]
): void => {
  if (errorStack.includes('todo_list_todo_name_key')) {
    throw new Error(`TODO List with name ${errorItems[0]} already exists.`);
  }
  if (errorStack.includes('invalid input syntax for type uuid')) {
    throw new Error(`TODO id '${errorItems[1]}' has not valid syntax.`);
  }
  if (errorStack.includes('value too long for type character varying')) {
    throw new Error(
      `TODO List name ${errorItems[0]} is too long. 25 characters allowed.`
    );
  }
};
