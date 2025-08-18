// src/lib/experiments.ts
import type { ExperimentsConfig } from "sws-parallel-render-engine";

export const experiments: ExperimentsConfig = {
  landing_hero_v1: {
    id: 'landing_hero_v1',
    variants: ['control', 'ContactOne', 'ContactTwo'],

    weight: [0.80, 0.10, 0.10], // optional
    botVariant: 'control',
    enabled: true
  },
  // ...more experiments
};
