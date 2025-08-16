// src/lib/experiments.ts
import type { ExperimentsConfig } from "sws-parallel-render-engine";

export const experiments: ExperimentsConfig = {
  landing_hero_v1: {
    id: 'landing_hero_v1',
    variants: ['control', 'ContactOne', 'ContactTwo'],

    // weight: [0.5, 0.25, 0.25], // optional
    botVariant: 'control',
    enabled: true
  },
  // ...more experiments
};
