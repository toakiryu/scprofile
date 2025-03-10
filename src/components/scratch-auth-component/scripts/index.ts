import { ResultType } from "@/types/api";
import crypto from "crypto";

let SCRATCH_AUTH_COMPONENT_SECRET_KEY =
  process.env.SCRATCH_AUTH_COMPONENT_SECRET_KEY;
if (process.env.BASE_URL) {
  if (!SCRATCH_AUTH_COMPONENT_SECRET_KEY) {
    throw new Error("SCRATCH_AUTH_COMPONENT_SECRET_KEY is not defined!");
  }
}
SCRATCH_AUTH_COMPONENT_SECRET_KEY =
  process.env.SCRATCH_AUTH_COMPONENT_SECRET_KEY!;

const ScratchAuthComponent = {
  action: {
    calculateHmac: async (text: string): Promise<ResultType<string>> => {
      return {
        success: true,
        data: crypto
          .createHmac("sha256", SCRATCH_AUTH_COMPONENT_SECRET_KEY)
          .update(text)
          .digest("hex"),
      };
    },
    encrypt: async (text: string): Promise<ResultType<string>> => {
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
          success: true,
          data: `${iv.toString("hex")}:${encrypted}:${authTag}`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Encryption failed.",
          error: (error as Error).message,
        };
      }
    },
    decrypt: async (text: string): Promise<ResultType<string>> => {
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
          success: true,
          data: decrypted,
        };
      } catch (error) {
        return {
          success: false,
          message: "Decryption failed",
          error: (error as Error).message,
        };
      }
    },
    verifyToken: async (
      privateCode: string
    ): Promise<
      ResultType<{
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
          return {
            success: true,
            data: {
              sessionId: sessionId,
              data: data,
            },
          };
        } else {
          return {
            success: false,
            message: "VerifyToken Error",
          };
        }
      } catch (error) {
        return {
          success: false,
          message: "VerifyToken Error",
          error: (error as Error).message,
        };
      }
    },
    encryptedData: async (
      content: string,
      value: string,
      days: number
    ): Promise<
      ResultType<{
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
        const encryptedValue = encryptedRes.data;

        if (encryptedValue) {
          const expires = new Date();
          if (days === -1) {
            expires.setFullYear(expires.getFullYear() + 200);
          } else {
            expires.setDate(expires.getDate() + days);
          }

          return {
            success: true,
            data: {
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
            success: false,
            message: "Encryption failed.",
          };
        }
      } catch (error) {
        return {
          success: false,
          error: (error as Error).message,
        };
      }
    },
    getUserName: async (session: string): Promise<ResultType<string>> => {
      if (session) {
        const decryptedRes = await ScratchAuthComponent.action.decrypt(session);
        const decrypted = decryptedRes.data;
        if (decrypted) {
          const [username] = decrypted.split("|");
          return {
            success: true,
            data: username,
          };
        } else {
          return {
            success: false,
            message: "Decryption failed.",
          };
        }
      }
      return {
        success: false,
        message: "session is required.",
      };
    },
  },
};
export { ScratchAuthComponent };
