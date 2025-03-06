import { ScratchAuthComponentConfigType } from "@/components/scratch-auth-component/scripts";

const scratchAuthComponentConfig: ScratchAuthComponentConfigType = {
  cookie_name: "_scratch-auth-component-session",
  redirect_url: `http://localhost:3000/en/api/auth`,
  title: `ScProfile`,
  expiration: 30,
};

export default scratchAuthComponentConfig;
