export type Urls = "/" | "/iniciar-sesion" | "/registrarse" | "/inicio";

export type Url = Urls | `${Urls}?${string}` | `${Urls}#${string}`;
