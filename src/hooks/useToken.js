import { computed } from "vue";
import { useAuthState } from "./useState";
import { hasData } from "@/utils";

export function useToken() {
  const state = useAuthState();
  const token = computed(() => state.value.token);

  return token;
}

export function useAuthorized() {
  const token = useToken();
  const authorized = computed(() => hasData(token.value));

  return authorized;
}
