import { create } from "zustand";

const useAquaStore = create((set) => ({
  crop: "",
  yieldValue: "",
  irrigation: "",
  reservoir: "",
  advisory: "",

  setCrop: (crop) =>
    set({
      crop,
    }),

  setYieldValue: (yieldValue) =>
    set({
      yieldValue,
    }),

  setIrrigation: (irrigation) =>
    set({
      irrigation,
    }),

  setReservoir: (reservoir) =>
    set({
      reservoir,
    }),

  setAdvisory: (advisory) =>
    set({
      advisory,
    }),
}));

export default useAquaStore;