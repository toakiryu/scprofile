import { ScratchAuthComponentConfigType } from "@/components/scratch-auth-component/scripts/type";

const scratchAuthComponentConfig: ScratchAuthComponentConfigType = {
  cookie_name: "_scratch-auth-component-session",
  redirect_url: `${process.env.BASE_URL}/account/auth`,
  title: `ScProfile`,
  expiration: 30,
};

export default scratchAuthComponentConfig;
