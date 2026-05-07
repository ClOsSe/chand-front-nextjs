import axios from "axios";
import type { Token } from "@/types/price";

const PRICE_ENDPOINT = "https://chand-backend.chandforandroid.workers.dev/latest";

export async function getTokens(): Promise<Token[]> {
  try {
    const { data } = await axios.get<Token[]>(PRICE_ENDPOINT, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!Array.isArray(data)) {
      throw new Error("Price service returned an unexpected payload shape");
    }

    return data;
  } catch (error) {
    const serviceError = createPriceServiceError(error);

    logPriceServiceError(serviceError, error);

    throw serviceError;
  }
}

function createPriceServiceError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new Error(
        `Price service responded with ${error.response.status} ${
          error.response.statusText || "Unknown status"
        }`,
      );
    }

    if (error.request) {
      return new Error(`Price service connection failed: ${error.message}`);
    }
  }

  return new Error(`Price service failed: ${getErrorMessage(error)}`);
}

function logPriceServiceError(error: Error, cause: unknown) {
  console.error("[price.service] getTokens failed", {
    endpoint: PRICE_ENDPOINT,
    message: error.message,
    cause: getErrorMessage(cause),
  });
}

function getErrorMessage(error: unknown) {
  console.error('error',error)
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}
