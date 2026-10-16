// Auto-generated. Per-entity form-enhancements config for "Informationsquellen".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["titel", "anfrage", {"row": ["quellentyp", "quellenstatus"], "cols": "1fr 1fr"}, "referenz", {"row": ["absender_urheber", "versionskennung"], "cols": "2fr 1fr"}, {"row": ["quellendatum", "eingang_am"], "cols": "1fr 1fr"}, "extraktionsstatus", {"row": ["pruefung_durch", "pruefung_am"], "cols": "1fr 1fr"}, "erneute_pruefung", "ersetzt_quelle", "zusammenfassung", "bemerkung"],
  defaults: {
    'eingang_am': { kind: 'today', withTime: true },
    'extraktionsstatus': { kind: 'lookup', key: 'nicht_verarbeitet', label: 'Nicht verarbeitet' },
  },
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
