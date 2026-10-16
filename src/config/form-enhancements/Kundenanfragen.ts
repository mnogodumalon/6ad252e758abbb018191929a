// Auto-generated. Per-entity form-enhancements config for "Kundenanfragen".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: [{"row": ["anfragenummer", "kunde"], "cols": "1fr 2fr"}, {"row": ["eingangsdatum", "eingangskanal"], "cols": "1fr 1fr"}, "kundenreferenz", {"row": ["produktfamilie", "produktvariante"], "cols": "1fr 1fr"}, {"row": ["gewuenschte_menge", "gewuenschter_liefertermin"], "cols": "1fr 1fr"}, {"row": ["status", "prioritaet"], "cols": "1fr 1fr"}, "verantwortlicher", {"row": ["kl_aufwand", "vollstaendigkeit"], "cols": "1fr 1fr"}, {"row": ["zieltermin_klaerung", "klaerung_abgeschlossen_am"], "cols": "1fr 1fr"}, {"row": ["kontakt_vorname_anfrage", "kontakt_nachname_anfrage"], "cols": "1fr 1fr"}, {"row": ["kontakt_email_anfrage", "kontakt_telefon_anfrage"], "cols": "1fr 1fr"}, {"row": ["aktive_bearbeitung_min", "wartezeit_kunde_min"], "cols": "1fr 1fr"}, "wartezeit_intern_min", {"row": ["anzahl_nacharbeiten", "anzahl_nachtraegliche_aenderungen"], "cols": "1fr 1fr"}, "erneute_pruefung", "anfragebeschreibung", "urspruengliche_kundenanforderungen", "erneute_pruefung_grund"],
  defaults: {
    'eingangsdatum': { kind: 'today' },
    'status': { kind: 'lookup', key: 'neu', label: 'Neu' },
    'zieltermin_klaerung': { kind: 'todayOffset', days: 14 },
    'gewuenschte_menge': { kind: 'literal', value: 1 },
  },
  computed: {
    '_gesamt_minuten': { op: 'add', left: { op: 'add', left: { kind: 'field', key: 'aktive_bearbeitung_min' }, right: { kind: 'field', key: 'wartezeit_kunde_min' } }, right: { kind: 'field', key: 'wartezeit_intern_min' } },
  },
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
