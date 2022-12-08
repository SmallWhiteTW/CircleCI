import { computed } from "vue";
import { useStore } from "vuex";

export function useState(scoped) {
  const store = useStore();
  const state = computed(() => (scoped ? store.state[scoped] : store.state));

  return state;
}

export function useLayoutState() {
  const state = useState("layout");

  return state;
}
export function useAuthState() {
  const state = useState("auth");

  return state;
}
