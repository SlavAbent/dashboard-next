export interface CreateUserInput {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
}
