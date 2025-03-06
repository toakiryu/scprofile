export interface ScratchAuthComponentConfigType {
  title: string;
  cookie_name: string;
  redirect_url: string;
  expiration: number;
}

export interface ScratchAuthComponentResult<T> {
  status: boolean;
  message: string;
  body: T | undefined;
  error?: unknown;
}

export type ScratchAuthSessionType = string | undefined;
