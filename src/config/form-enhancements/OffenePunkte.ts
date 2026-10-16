// Auto-generated. Per-entity form-enhancements config for "Offene Punkte".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["kurztitel", "anfrage", "verantwortlicher", {"row": ["punktetyp", "prioritaet"], "cols": "1fr 1fr"}, {"row": ["auswirkung", "zustaendige_rolle"], "cols": "1fr 1fr"}, {"row": ["status", "faellig_am"], "cols": "1fr 1fr"}, {"row": ["abgeschlossen_am", "abschluss_durch"], "cols": "1fr 1fr"}, "erneute_pruefung", "betroffene_anforderungen", "betroffene_quellen", "beschreibung", "erledigungskriterium", "loesung_ergebnis"],
  defaults: {
    'status': { kind: 'lookup', key: 'neu', label: 'Neu' },
    'faellig_am': { kind: 'todayOffset', days: 14 },
    'prioritaet': { kind: 'lookup', key: 'normal', label: 'Normal' },
  },
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
