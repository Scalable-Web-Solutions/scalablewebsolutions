// src/hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import { experimentHandle } from 'sws-parallel-render-engine';
import type { ExperimentsConfig } from 'sws-parallel-render-engine';

const config: ExperimentsConfig = {
  landing_hero_v1: { id: 'landing_hero_v1', variants: ['control','alt'], enabled: true }
};

const exp = experimentHandle({ config });

export const handle = sequence(exp);