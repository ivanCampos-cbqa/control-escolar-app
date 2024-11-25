import { LogInPayload } from "@interfaces/auth";
import { getFromSessionStorage, removeFromSessionStorage, saveToSessionStorage } from "@utils/browserUtils";
import { zustandCreate } from "./zustandStore";


export const authStorageKey = 'authState';

interface AuthStore {
  authState: LogInPayload | undefined;
  dispatchLogin: (payload: LogInPayload) => void;
  dispatchSignOut: () => void;
}

const initializeState = (): LogInPayload | undefined => {
  const initialAuthState = getFromSessionStorage<LogInPayload>(authStorageKey);

  if (!initialAuthState) return;

  return initialAuthState;
};

export const useAuthStore = zustandCreate<AuthStore>((set) => {
  const initialState = initializeState();

  return {
    authState: initialState,

    dispatchLogin: (newAuthState: LogInPayload): void => {
      saveToSessionStorage(authStorageKey, newAuthState);
      set({
        authState: newAuthState,
      });
    },

    dispatchSignOut: (): void => {
      removeFromSessionStorage(authStorageKey);
      set({
        authState: undefined,
      });
    },
  };
});
