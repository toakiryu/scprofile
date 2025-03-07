import { scprofileUserType } from "@/types/scprofile";

export interface Database {
  public: {
    users: scprofileUserType[];
  };
}
