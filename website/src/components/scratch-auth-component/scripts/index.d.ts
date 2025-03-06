export interface ScratchAuthComponentConfigType {
  title: string;
  cookie_name: string;
  redirect_url: string;
  expiration: number;
}

export interface ScratchAuthComponentResult<T> {
  status: boolean;
  message: string;
  body: T | null;
  error?: unknown;
}

export type ScratchAuthSessionType = string | null;
