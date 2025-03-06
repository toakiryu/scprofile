import crypto from "crypto";

const SCRATCH_AUTH_COMPONENT_SECRET_KEY =
  process.env.SCRATCH_AUTH_COMPONENT_SECRET_KEY;
if (!SCRATCH_AUTH_COMPONENT_SECRET_KEY) {
  throw new Error("SCRATCH_AUTH_COMPONENT_SECRET_KEY is not defined!");
}

export interface ScratchAuthComponentActionResult<T> {
  status: boolean;
  message: string;
  body: T | undefined;
  error?: unknown;
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

const ScratchAuthComponent = {
  action: {
    calculateHmac: async (
      text: string
    ): Promise<ScratchAuthComponentActionResult<string>> => {
      return {
        status: true,
        message: "Calculated succeeded.",
        body: crypto
          .createHmac("sha256", SCRATCH_AUTH_COMPONENT_SECRET_KEY)
          .update(text)
          .digest("hex"),
      };
    },
    encrypt: async (
      text: string
    ): Promise<ScratchAuthComponentActionResult<string>> => {
      try {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(
          "aes-256-gcm",
          Buffer.from(SCRATCH_AUTH_COMPONENT_SECRET_KEY, "hex"),
          iv
        );

        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");

        const authTag = cipher.getAuthTag().toString("hex");

        return {
          status: true,
          message: "Encryption succeeded.",
          body: `${iv.toString("hex")}:${encrypted}:${authTag}`,
        };
      } catch (error) {
        return {
          status: false,
          message: "Encryption failed.",
          error: error,
          body: undefined,
        };
      }
    },
    decrypt: async (
      text: string
    ): Promise<ScratchAuthComponentActionResult<string>> => {
      try {
        const [iv, encrypted, authTag] = text.split(":");
        const decipher = crypto.createDecipheriv(
          "aes-256-gcm",
          Buffer.from(SCRATCH_AUTH_COMPONENT_SECRET_KEY, "hex"),
          Buffer.from(iv, "hex")
        );

        decipher.setAuthTag(Buffer.from(authTag, "hex"));

        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return {
          status: true,
          message: "Decryption succeeded.",
          body: decrypted,
        };
      } catch (error) {
        return {
          status: false,
          message: "Decryption failed",
          error: error,
          body: undefined,
        };
      }
    },
    verifyToken: async (
      privateCode: string
    ): Promise<
      ScratchAuthComponentActionResult<{
        sessionId: string;
        data: {
          valid: boolean;
          username: string | null;
          redirect: string | null;
        };
      }>
    > => {
      try {
        const res = await fetch(
          `https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`
        );
        const data = await res.json();
        if (data.valid === true) {
          const sessionId = crypto.randomUUID();
          console.log(data);
          return {
            status: true,
            message: "Token authentication succeeded.",
            body: {
              sessionId: sessionId,
              data: data,
            },
          };
        } else {
          return {
            status: false,
            message: "VerifyToken Error",
            body: undefined,
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "VerifyToken Error",
          error: error,
          body: undefined,
        };
      }
    },
    encryptedData: async (
      content: string,
      value: string,
      days: number
    ): Promise<
      ScratchAuthComponentActionResult<{
        name: string;
        value: string;
        options: {
          expires: Date;
          path: string;
        };
      }>
    > => {
      try {
        const hmac = await ScratchAuthComponent.action.calculateHmac(value);
        const encryptedRes = await ScratchAuthComponent.action.encrypt(
          value + "|" + hmac
        );
        const encryptedValue = encryptedRes.body;

        if (encryptedValue) {
          const expires = new Date();
          if (days === -1) {
            expires.setFullYear(expires.getFullYear() + 200);
          } else {
            expires.setDate(expires.getDate() + days);
          }

          return {
            status: true,
            message: "Encryption succeeded.",
            body: {
              name: content,
              value: encryptedValue,
              options: {
                expires: expires,
                path: "/",
              },
            },
          };
        } else {
          return {
            status: false,
            message: "Encryption failed.",
            body: undefined,
          };
        }
      } catch (error) {
        return {
          status: false,
          message: `${error}`,
          body: undefined,
        };
      }
    },
    getUserName: async (
      session: string
    ): Promise<ScratchAuthComponentActionResult<string>> => {
      if (session) {
        const decryptedRes = await ScratchAuthComponent.action.decrypt(session);
        const decrypted = decryptedRes.body;
        if (decrypted) {
          const [username] = decrypted.split("|");
          return {
            status: true,
            message: "Decryption succeeded.",
            body: username,
          };
        } else {
          return {
            status: false,
            message: "Decryption failed.",
            body: undefined,
          };
        }
      }
      return {
        status: false,
        message: "session is required.",
        body: undefined,
      };
    },
  },
};
export { ScratchAuthComponent };
