import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./authContext";

export const AppContextProvider = combineContext(AuthContextProvider);
