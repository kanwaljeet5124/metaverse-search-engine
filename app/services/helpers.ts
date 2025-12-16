export const URL: string = "https://rickandmortyapi.com/api";

export const responseValidator = async <T>(response: Response) : Promise<T> => {
  const res: any = await response.json().catch((e: unknown) => {console.log("No JSON response")});

  if (response.ok) {
    return res as T
  }

  if (response.status === 401) {
    throw new Error("You are not logged in. Please login for accessing this section.");
  }
  else if (response.status === 413) {
    throw new Error("The file you tried to upload is too large.");
  }
  else if (response.status === 404) {
    throw new Error("Wrong input or resource not found.");
  }
  else if (response.status >= 400 && response.status < 500) {
    throw new Error(res?.message || res?.error || "Client side error occurred.");
  }
  else if (response.status >= 500) {
    throw new Error(res?.message || "Encountered server error.");
  }

  throw new Error("Something went wrong.");
};

interface ApiErrorResult {
  status: false;
  message: string;
}

export const apiError = (e: unknown): ApiErrorResult => {
  if(e instanceof Error) {
    console.error("API Error: ", e.message);
    return { status: false, message: e.message };
  }
  else {
    console.error("API Error: Unknown error", e);
    return  {status: false, message: "Network error: please refresh the page." };
  } 
};


