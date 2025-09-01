import { useDispatch } from "react-redux";
import { store } from "src/store";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const amar = () => {};

amar();
