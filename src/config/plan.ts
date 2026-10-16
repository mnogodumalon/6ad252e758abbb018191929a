// The orchestrator's plan, as far as the running app needs it
// (docs/orchestrator/SPEC.md). Generated — do not edit; regenerated on every
// build and update from the stored plan. Without a plan every map is empty.
//
//   SYSTEM_ASSIGNED entity → fields a tool fills when a record is CREATED — the
//                   value does not exist before; dialogs hide these on create and
//                   the form-polish sets no default on them. A scheduled or
//                   update-triggered tool owns its field but is NOT in here.
//   PLAN_SENTENCES  slug → the plan in the owner's words (flows' field page)
//
// The runtime write guard (FLOW_WRITES/OWNERSHIP, planGuard.ts) left on
// 23.09.2026: a flow page composes against its generated hook, whose submit
// plan IS the Schreibliste — there is no way to spell a write outside it.

export const SYSTEM_ASSIGNED: Record<string, string[]> = {
  "kundenanfragen": [
    "anfragenummer"
  ],
  "informationsquellen": [
    "quellenstatus"
  ],
  "wiederverwendung_von_erfahrungen": [
    "abrufdatum"
  ]
};

export const PLAN_SENTENCES: Record<string, string[]> = {
  "anfrage-aufnehmen": [
    "Legt an: informationsquellen, kundenanfragen",
    "Automatisch: eingangsdatum (heutiges Datum, automatisch), status (fester Wert „neu“), vollstaendigkeit (fester Wert „ungeprueft“), eingang_am (aktueller Zeitpunkt, automatisch)"
  ],
  "anforderung-erfassen": [
    "Legt an: technische_anforderungen",
    "Ändert: kundenanfragen",
    "Automatisch: pruefstatus (fester Wert „ungeprueft“), status (fester Wert „in_pruefung“)"
  ],
  "offenen-punkt-anlegen": [
    "Legt an: aufgaben, offene_punkte",
    "Automatisch: status (fester Wert „zugewiesen“), status (fester Wert „offen“)"
  ],
  "rueckfrage-vorbereiten": [
    "Legt an: rueckfragen_und_kommunikation",
    "Ändert: offene_punkte",
    "Automatisch: kommunikationstyp (fester Wert „kundenrueckfrage“), versandstatus (fester Wert „entwurf“), antwortstatus (fester Wert „offen“), status (fester Wert „wartet_auf_kunde“)"
  ],
  "beurteilung-und-entscheidung": [
    "Legt an: beurteilungen, entscheidungen",
    "Automatisch: erstellt_am (aktueller Zeitpunkt, automatisch), pruefstatus (fester Wert „entwurf“)"
  ],
  "klaerung-abschliessen": [
    "Legt an: abschluss_und_uebergabe",
    "Ändert: kundenanfragen",
    "Automatisch: pruefdatum (aktueller Zeitpunkt, automatisch), uebergabestatus (fester Wert „bereit“), freigabestatus (fester Wert „nicht_freigegeben“), status (fester Wert „technisch_geklaert“), klaerung_abgeschlossen_am (heutiges Datum, automatisch), vollstaendigkeit (fester Wert „vollstaendig_geprueft“)"
  ]
};

export const PLAN_SUMMARY = "Die Anwendung begleitet die technische Auftragsklärung: von der Kundenanfrage über Quellen, technische Anforderungen, offene Punkte, Aufgaben, Rückfragen, Beurteilungen und Entscheidungen bis zum dokumentierten Abschluss mit Übergabe. Erfahrungen aus abgeschlossenen Fällen werden festgehalten und bei späteren Anfragen auf ihre Übertragbarkeit geprüft.";

/** slug → the lists a flow writes (the plan's Schreibliste). The nav leaves a
 *  flow out for a user who may not write one of them (lib/permissions.ts). */
export const FLOW_ENTITIES: Record<string, string[]> = {
  "anfrage-aufnehmen": [
    "informationsquellen",
    "kundenanfragen"
  ],
  "anforderung-erfassen": [
    "kundenanfragen",
    "technische_anforderungen"
  ],
  "offenen-punkt-anlegen": [
    "aufgaben",
    "offene_punkte"
  ],
  "rueckfrage-vorbereiten": [
    "offene_punkte",
    "rueckfragen_und_kommunikation"
  ],
  "beurteilung-und-entscheidung": [
    "beurteilungen",
    "entscheidungen"
  ],
  "klaerung-abschliessen": [
    "abschluss_und_uebergabe",
    "kundenanfragen"
  ]
};
