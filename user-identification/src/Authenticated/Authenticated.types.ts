import { VerificationResult } from "../types";

export type AuthenticatedProps = {
  loginEmail: string;
  verificationResults: VerificationResult[];
  setLoginEmail: (email?: string) => void;
};
