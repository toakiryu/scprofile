"use client";

import React from "react";
import { scprofileUserType } from "@/types/scprofile";
import ScProfileProfilePreview from "@/components/scprofile/ui/profile-preview";

function UserProfilePreview({
  user,
  analyticsEvent,
}: {
  user: scprofileUserType;
  analyticsEvent?: boolean;
}) {
  return (
    <div className="flex flex-col justify-start sm:justify-center items-center w-full h-full min-h-dvh sm:p-5">
      <ScProfileProfilePreview
        user={user}
        analyticsEvent={analyticsEvent || false}
      />
    </div>
  );
}

export default UserProfilePreview;
