import { APIResponse, TUser } from "@/types";
import { API_URL } from "@/consts";

export const register = async (user: TUser) => {
  try {
    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const status = res.status;

    if (status != 201) {
      const data = (await res.json()) as APIResponse;
      throw new Error(data.message);
    }

    return true;
  } catch (error: any) {
    console.warn(`User register service failed: ${error.message}`);
    return false;
  }
};
