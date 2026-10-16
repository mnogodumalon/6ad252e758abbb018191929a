// Auto-generated. Per-entity form-enhancements config for "Wiederverwendung von Erfahrungen".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["erfahrung", "ziel_anfrage", {"row": ["abrufdatum", "bewertet_am"], "cols": "1fr 1fr"}, "aehnlichkeit", "verwendungsergebnis", {"row": ["gueltigkeit_geprueft", "geprueft_von"], "cols": "1fr 2fr"}, {"row": ["aufwand_schaetzung_min", "aufwand_tatsaechlich_min"], "cols": "1fr 1fr"}, "abrufgrund", "kontextunterschiede", "begruendung", "beobachteter_nutzen", "negative_folgen"],
  defaults: {
    'bewertet_am': { kind: 'today' },
  },
  computed: {},
  numberFields: {
    'aufwand_tatsaechlich_min': { allowNegative: true },
  },
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
