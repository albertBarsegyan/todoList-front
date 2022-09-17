export const Endpoints = {
  login: () => '/login',
  logout: () => '/logout',
  register: () => '/register',
  todo: (param?: string) => `/todo/${param ?? ''}`,
  user: (param?: string) => `/user/${param ?? ''}`,
};
