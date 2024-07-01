export type RequestStatus = "idle" | "loading" | "success" | "error";

export type VerificationResult = {
  timestamp: number;
  status: "success" | "failed";
};
