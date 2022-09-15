export const Endpoints = {
  login: () => '/login',
  logout: () => '/logout',
  register: () => '/register',
  todo: () => '/todo',
  user: (param?: string) => `/user/${param}`
}
