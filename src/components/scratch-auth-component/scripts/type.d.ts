export interface ScratchAuthComponentConfigType {
  title: string;
  cookie_name: string;
  redirect_url: string;
  expiration: number;
}

export type ScratchUserType = {
  id: number;
  username: string;
  scratchteam: boolean;
  history: {
    joined: string;
  };
  profile: {
    id: number;
    images: {
      "90x90": string;
      "60x60": string;
      "55x55": string;
      "50x50": string;
      "32x32": string;
    };
    status: string;
    bio: string;
    country: string;
  };
};

export type ScratchAuthSessionType = string | undefined;
