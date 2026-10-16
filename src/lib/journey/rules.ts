/**
 * Field rules — GENERATED from the app metadata. Do not edit.
 *
 * The mechanical truth about every field: what kind it is, whether the
 * platform's base view marks it required, which lookup keys exist, where an
 * applookup points, what the label is. `useStepForm` validates against these
 * rules and phrases its messages with the real labels; `toWirePayload` uses
 * them to shape the create payload; `SHAPES` tells a page which input FORM
 * fits the data (a date pair wants a calendar, not two fields) — it is a
 * signal, not a gate.
 */
import { appLabel, fieldLabel, lookupLabel } from '@/i18n';
import { policyLabel } from './policy';
import { LOOKUP_OPTIONS } from '@/types/app';

export type EntityKey = 'kunden' | 'kundenanfragen' | 'abschluss_und_uebergabe' | 'informationsquellen' | 'technische_anforderungen' | 'offene_punkte' | 'aufgaben' | 'beurteilungen' | 'rueckfragen_und_kommunikation' | 'entscheidungen' | 'erfahrungen_und_erkenntnisse' | 'wiederverwendung_von_erfahrungen';

/** The text fields of each entity — what a search may run over (generated;
 *  `never` for an entity without text of its own, e.g. a link table). */
export interface StringFields {
  "kunden": "kundennummer" | "firmenname" | "ansprechpartner_vorname" | "ansprechpartner_nachname" | "e_mail" | "telefon" | "strasse" | "hausnummer" | "plz" | "ort" | "branche" | "interne_bemerkung";
  "kundenanfragen": "anfragenummer" | "kundenreferenz" | "produktfamilie" | "produktvariante" | "anfragebeschreibung" | "urspruengliche_kundenanforderungen" | "verantwortlicher" | "kontakt_vorname_anfrage" | "kontakt_nachname_anfrage" | "kontakt_email_anfrage" | "kontakt_telefon_anfrage" | "erneute_pruefung_grund";
  "abschluss_und_uebergabe": "geprueft_von" | "verbleibende_abweichungen" | "verbleibende_risiken" | "offene_restpunkte" | "uebergabeempfaenger" | "zusammenfassung";
  "informationsquellen": "titel" | "referenz" | "absender_urheber" | "versionskennung" | "zusammenfassung" | "pruefung_durch" | "bemerkung";
  "technische_anforderungen": "bezeichnung" | "beschreibung" | "sollwert" | "einheit" | "begruendung_pruefstatus" | "verantwortlicher" | "aenderungsgrund";
  "offene_punkte": "kurztitel" | "beschreibung" | "verantwortlicher" | "erledigungskriterium" | "loesung_ergebnis" | "abschluss_durch";
  "aufgaben": "titel" | "beschreibung" | "verantwortlicher" | "mitwirkende" | "blockierungsgrund" | "ergebnis";
  "beurteilungen": "beurteilungsgegenstand" | "fachliche_begruendung" | "annahmen" | "unsicherheiten" | "alternativen" | "empfehlung" | "erstellt_von" | "geprueft_von";
  "rueckfragen_und_kommunikation": "absender" | "empfaenger" | "betreff" | "inhalt" | "notizen";
  "entscheidungen": "titel" | "entscheidungsgegenstand" | "ergebnis" | "alternativen" | "entscheidung" | "begruendung" | "entscheidungsverantwortlicher" | "auflagen";
  "erfahrungen_und_erkenntnisse": "titel" | "produktfamilie" | "schlagwoerter" | "sachverhalt" | "urspruengliches_problem" | "vorgehen" | "beobachtetes_ergebnis" | "erkenntnis" | "gueltigkeitsbedingungen" | "bekannte_grenzen" | "bestaetigt_von" | "kommentar_wiederverwendung";
  "wiederverwendung_von_erfahrungen": "abrufgrund" | "kontextunterschiede" | "geprueft_von" | "begruendung" | "beobachteter_nutzen" | "negative_folgen";
}
export type StringFieldKey<E extends EntityKey> = E extends keyof StringFields ? StringFields[E] : never;

/** The applookup fields of each entity (generated). A pick stored through
 *  `form.set` on one of these must carry its display name — at compile time
 *  (`StepForm.set`), because the review would otherwise show the id. */
export interface RecordFields {
  "kunden": never;
  "kundenanfragen": "kunde";
  "abschluss_und_uebergabe": "anfrage";
  "informationsquellen": "anfrage" | "ersetzt_quelle";
  "technische_anforderungen": "quellen" | "anfrage";
  "offene_punkte": "anfrage" | "betroffene_anforderungen" | "betroffene_quellen";
  "aufgaben": "anfrage" | "offener_punkt" | "abhaengige_aufgaben";
  "beurteilungen": "betroffene_anforderungen" | "betroffene_offene_punkte" | "grundlage_quellen" | "anfrage";
  "rueckfragen_und_kommunikation": "anfrage" | "offener_punkt" | "weitere_offene_punkte" | "bezug_rueckfrage" | "quelle";
  "entscheidungen": "betroffene_anforderungen" | "betroffene_offene_punkte" | "grundlage_beurteilungen" | "ersetzt_durch_entscheidung" | "anfrage";
  "erfahrungen_und_erkenntnisse": "ursprungs_anfrage" | "beleg_abschluesse" | "beleg_quellen" | "beleg_beurteilungen" | "beleg_entscheidungen";
  "wiederverwendung_von_erfahrungen": "ziel_anfrage" | "erfahrung";
}
export type RecordFieldKey<E extends EntityKey> = E extends keyof RecordFields ? RecordFields[E] : never;

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'bool'
  | 'date'
  | 'datetime'
  | 'lookup'
  | 'multilookup'
  | 'record'
  | 'multirecord'
  | 'file'
  | 'geo';

export interface FieldRule {
  key: string;
  fulltype: string;
  kind: FieldKind;
  /** From the app's base view. A public page may override this per field. */
  required: boolean;
  /** Build-time label — `labelOf()` prefers the runtime i18n bundle. */
  label: string;
  /** Whether a journey may write it (`file` is upload-only, never via a journey). */
  writable: boolean;
  maxLength?: number;
  /** lookup / multilookup: the ONLY valid write values. */
  options?: string[];
  /** record / multirecord: the target app (always) and its entity key (when inside this appgroup). */
  targetAppId?: string;
  targetEntity?: EntityKey;
  format?: 'currency';
  /** HTML autocomplete token derived from the field name (given-name, email, tel, …). */
  autoComplete?: string;
}

export interface EntityInfo {
  key: EntityKey;
  appId: string;
  label: string;
  /** PascalCase plural — `get<pascal>()` on the service. */
  pascal: string;
  /** The single-record suffix — `create<single>()` on the service. */
  single: string;
}

/** Input-form signals per entity: which data shape each field (pair) has.
 *  `range`  — two date fields that form a stay/period → AvailabilityRangePicker
 *  `choice` — a lookup with few options → ChoiceGroup pills instead of a select
 *  `record` — an applookup → EntitySelectStep with search, never a raw id field
 *  `stock`  — a quantity that has a stock/capacity counterpart → show it, warn on overshoot */
export type Shape =
  | { kind: 'range'; from: string; to: string }
  | { kind: 'choice'; field: string; count: number }
  | { kind: 'record'; field: string; targetEntity?: EntityKey }
  | { kind: 'stock'; field: string };

export const ENTITIES: Record<EntityKey, EntityInfo> = {
  "kunden": {
    "key": "kunden",
    "appId": "6ad25293f1bbf692c0e9bc2a",
    "label": "Kunden",
    "pascal": "Kunden",
    "single": "KundenEntry"
  },
  "kundenanfragen": {
    "key": "kundenanfragen",
    "appId": "6ad2529bc987f10873d5483d",
    "label": "Kundenanfragen",
    "pascal": "Kundenanfragen",
    "single": "KundenanfragenEntry"
  },
  "abschluss_und_uebergabe": {
    "key": "abschluss_und_uebergabe",
    "appId": "6ad2529daa6ad3a4991df038",
    "label": "Abschluss und Übergabe",
    "pascal": "AbschlussUndUebergabe",
    "single": "AbschlussUndUebergabeEntry"
  },
  "informationsquellen": {
    "key": "informationsquellen",
    "appId": "6ad2529ee20f7f909b5a3812",
    "label": "Informationsquellen",
    "pascal": "Informationsquellen",
    "single": "InformationsquellenEntry"
  },
  "technische_anforderungen": {
    "key": "technische_anforderungen",
    "appId": "6ad252a0adb5fd9769ed3cd3",
    "label": "Technische Anforderungen",
    "pascal": "TechnischeAnforderungen",
    "single": "TechnischeAnforderungenEntry"
  },
  "offene_punkte": {
    "key": "offene_punkte",
    "appId": "6ad252a24c090fb7e743a8f7",
    "label": "Offene Punkte",
    "pascal": "OffenePunkte",
    "single": "OffenePunkteEntry"
  },
  "aufgaben": {
    "key": "aufgaben",
    "appId": "6ad252a2f6ae63b6f1bc287f",
    "label": "Aufgaben",
    "pascal": "Aufgaben",
    "single": "AufgabenEntry"
  },
  "beurteilungen": {
    "key": "beurteilungen",
    "appId": "6ad252a3fc1ea3c1c8dc407e",
    "label": "Beurteilungen",
    "pascal": "Beurteilungen",
    "single": "BeurteilungenEntry"
  },
  "rueckfragen_und_kommunikation": {
    "key": "rueckfragen_und_kommunikation",
    "appId": "6ad252a475f945afeedab898",
    "label": "Rückfragen und Kommunikation",
    "pascal": "RueckfragenUndKommunikation",
    "single": "RueckfragenUndKommunikationEntry"
  },
  "entscheidungen": {
    "key": "entscheidungen",
    "appId": "6ad252a6008d102be6054258",
    "label": "Entscheidungen",
    "pascal": "Entscheidungen",
    "single": "EntscheidungenEntry"
  },
  "erfahrungen_und_erkenntnisse": {
    "key": "erfahrungen_und_erkenntnisse",
    "appId": "6ad252a7402c5e512e7068ca",
    "label": "Erfahrungen und Erkenntnisse",
    "pascal": "ErfahrungenUndErkenntnisse",
    "single": "ErfahrungenUndErkenntnisseEntry"
  },
  "wiederverwendung_von_erfahrungen": {
    "key": "wiederverwendung_von_erfahrungen",
    "appId": "6ad252ab0bc5f3c0f275d2e9",
    "label": "Wiederverwendung von Erfahrungen",
    "pascal": "WiederverwendungVonErfahrungen",
    "single": "WiederverwendungVonErfahrungenEntry"
  }
};

export const FIELD_RULES: Record<EntityKey, Record<string, FieldRule>> = {
  "kunden": {
    "kundennummer": {
      "key": "kundennummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Kundennummer",
      "writable": true,
      "maxLength": 4000
    },
    "firmenname": {
      "key": "firmenname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Firmenname",
      "writable": true,
      "maxLength": 4000
    },
    "ansprechpartner_vorname": {
      "key": "ansprechpartner_vorname",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ansprechpartner Vorname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "given-name"
    },
    "ansprechpartner_nachname": {
      "key": "ansprechpartner_nachname",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ansprechpartner Nachname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "family-name"
    },
    "e_mail": {
      "key": "e_mail",
      "fulltype": "string/email",
      "kind": "email",
      "required": false,
      "label": "E-Mail",
      "writable": true,
      "autoComplete": "email"
    },
    "telefon": {
      "key": "telefon",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Telefon",
      "writable": true,
      "autoComplete": "tel"
    },
    "strasse": {
      "key": "strasse",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Straße",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "address-line1"
    },
    "hausnummer": {
      "key": "hausnummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Hausnummer",
      "writable": true,
      "maxLength": 4000
    },
    "plz": {
      "key": "plz",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Postleitzahl",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "postal-code"
    },
    "ort": {
      "key": "ort",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ort",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "address-level2"
    },
    "branche": {
      "key": "branche",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Branche",
      "writable": true,
      "maxLength": 4000
    },
    "interne_bemerkung": {
      "key": "interne_bemerkung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Interne Bemerkung",
      "writable": true
    },
    "aktiv": {
      "key": "aktiv",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Kunde aktiv",
      "writable": true
    }
  },
  "kundenanfragen": {
    "anfragenummer": {
      "key": "anfragenummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Anfragenummer",
      "writable": true,
      "maxLength": 4000
    },
    "kunde": {
      "key": "kunde",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kunde",
      "writable": true,
      "targetAppId": "6ad25293f1bbf692c0e9bc2a",
      "targetEntity": "kunden"
    },
    "eingangsdatum": {
      "key": "eingangsdatum",
      "fulltype": "date/date",
      "kind": "date",
      "required": true,
      "label": "Eingangsdatum",
      "writable": true
    },
    "eingangskanal": {
      "key": "eingangskanal",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Eingangskanal",
      "writable": true,
      "options": [
        "email",
        "webformular",
        "telefon",
        "persoenliches_gespraech",
        "bestandskunde",
        "sonstiger_kanal"
      ]
    },
    "kundenreferenz": {
      "key": "kundenreferenz",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Kundenreferenz",
      "writable": true,
      "maxLength": 4000
    },
    "produktfamilie": {
      "key": "produktfamilie",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Produkt oder Produktfamilie",
      "writable": true,
      "maxLength": 4000
    },
    "produktvariante": {
      "key": "produktvariante",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Produktvariante",
      "writable": true,
      "maxLength": 4000
    },
    "gewuenschte_menge": {
      "key": "gewuenschte_menge",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Gewünschte Menge (größer als 0)",
      "writable": true
    },
    "gewuenschter_liefertermin": {
      "key": "gewuenschter_liefertermin",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gewünschter Liefertermin",
      "writable": true
    },
    "anfragebeschreibung": {
      "key": "anfragebeschreibung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Anfragebeschreibung",
      "writable": true
    },
    "urspruengliche_kundenanforderungen": {
      "key": "urspruengliche_kundenanforderungen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Ursprüngliche Kundenanforderungen",
      "writable": true
    },
    "prioritaet": {
      "key": "prioritaet",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Priorität",
      "writable": true,
      "options": [
        "niedrig",
        "normal",
        "hoch",
        "kritisch"
      ]
    },
    "verantwortlicher": {
      "key": "verantwortlicher",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Verantwortlicher (Pflicht nach Übernahme)",
      "writable": true,
      "maxLength": 4000
    },
    "status": {
      "key": "status",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Status",
      "writable": true,
      "options": [
        "neu",
        "in_pruefung",
        "rueckfragen_offen",
        "fachliche_pruefung",
        "entscheidungsbedarf",
        "technisch_geklaert",
        "freigegeben",
        "abgelehnt",
        "zurueckgestellt"
      ]
    },
    "kl_aufwand": {
      "key": "kl_aufwand",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Technischer Kläraufwand",
      "writable": true,
      "options": [
        "klein",
        "mittel",
        "hoch",
        "unbekannt"
      ]
    },
    "zieltermin_klaerung": {
      "key": "zieltermin_klaerung",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Zieltermin Klärung",
      "writable": true
    },
    "vollstaendigkeit": {
      "key": "vollstaendigkeit",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Vollständigkeit",
      "writable": true,
      "options": [
        "ungeprueft",
        "unvollstaendig",
        "in_klaerung",
        "vollstaendig_geprueft"
      ]
    },
    "kontakt_vorname_anfrage": {
      "key": "kontakt_vorname_anfrage",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ansprechpartner Vorname (nur für diese Anfrage)",
      "writable": true,
      "maxLength": 4000
    },
    "kontakt_nachname_anfrage": {
      "key": "kontakt_nachname_anfrage",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ansprechpartner Nachname (nur für diese Anfrage)",
      "writable": true,
      "maxLength": 4000
    },
    "kontakt_email_anfrage": {
      "key": "kontakt_email_anfrage",
      "fulltype": "string/email",
      "kind": "email",
      "required": false,
      "label": "E-Mail (nur für diese Anfrage)",
      "writable": true,
      "autoComplete": "email"
    },
    "kontakt_telefon_anfrage": {
      "key": "kontakt_telefon_anfrage",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Telefon (nur für diese Anfrage)",
      "writable": true,
      "autoComplete": "tel"
    },
    "aktive_bearbeitung_min": {
      "key": "aktive_bearbeitung_min",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Aktive Bearbeitungszeit (Minuten)",
      "writable": true
    },
    "wartezeit_kunde_min": {
      "key": "wartezeit_kunde_min",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Wartezeit auf Kunde (Minuten)",
      "writable": true
    },
    "wartezeit_intern_min": {
      "key": "wartezeit_intern_min",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Interne Wartezeit (Minuten)",
      "writable": true
    },
    "anzahl_nacharbeiten": {
      "key": "anzahl_nacharbeiten",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Anzahl erforderlicher Nacharbeiten",
      "writable": true
    },
    "anzahl_nachtraegliche_aenderungen": {
      "key": "anzahl_nachtraegliche_aenderungen",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Anzahl nachträglicher Änderungen",
      "writable": true
    },
    "klaerung_abgeschlossen_am": {
      "key": "klaerung_abgeschlossen_am",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Technisch geklärt am",
      "writable": true
    },
    "erneute_pruefung": {
      "key": "erneute_pruefung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erneute Prüfung erforderlich",
      "writable": true
    },
    "erneute_pruefung_grund": {
      "key": "erneute_pruefung_grund",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Grund der erneuten Prüfung",
      "writable": true
    }
  },
  "abschluss_und_uebergabe": {
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage (genau ein Abschluss je Anfrage)",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "pruefdatum": {
      "key": "pruefdatum",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": true,
      "label": "Prüfdatum",
      "writable": true
    },
    "geprueft_von": {
      "key": "geprueft_von",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Geprüft von",
      "writable": true,
      "maxLength": 4000
    },
    "anforderungen_geprueft": {
      "key": "anforderungen_geprueft",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Anforderungen geprüft",
      "writable": true
    },
    "kritische_punkte_geklaert": {
      "key": "kritische_punkte_geklaert",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Kritische offene Punkte geklärt oder ausdrücklich entschieden",
      "writable": true
    },
    "entscheidungen_vorhanden": {
      "key": "entscheidungen_vorhanden",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erforderliche Entscheidungen vorhanden",
      "writable": true
    },
    "freigaben_vorhanden": {
      "key": "freigaben_vorhanden",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erforderliche Freigaben vorhanden",
      "writable": true
    },
    "verbleibende_abweichungen": {
      "key": "verbleibende_abweichungen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Verbleibende Abweichungen",
      "writable": true
    },
    "verbleibende_risiken": {
      "key": "verbleibende_risiken",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Verbleibende Risiken",
      "writable": true
    },
    "offene_restpunkte": {
      "key": "offene_restpunkte",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Offene Restpunkte",
      "writable": true
    },
    "uebergabeempfaenger": {
      "key": "uebergabeempfaenger",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Übergabeempfänger (Person oder Rolle)",
      "writable": true,
      "maxLength": 4000
    },
    "uebergabestatus": {
      "key": "uebergabestatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Übergabestatus",
      "writable": true,
      "options": [
        "nicht_vorbereitet",
        "bereit",
        "uebergeben",
        "zurueckgewiesen"
      ]
    },
    "uebergabedatum": {
      "key": "uebergabedatum",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Übergabedatum",
      "writable": true
    },
    "zusammenfassung": {
      "key": "zusammenfassung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Zusammenfassung des technischen Stands",
      "writable": true
    },
    "freigabestatus": {
      "key": "freigabestatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Technischer Freigabestatus",
      "writable": true,
      "options": [
        "nicht_freigegeben",
        "freigegeben",
        "verweigert",
        "zurueckgestellt"
      ]
    }
  },
  "informationsquellen": {
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "quellentyp": {
      "key": "quellentyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Quellentyp",
      "writable": true,
      "options": [
        "email",
        "pdf",
        "office_dokument",
        "bild",
        "zeichnung",
        "cad_dokument",
        "webadresse",
        "gespraechsnotiz",
        "erp_datensatz",
        "manuelle_eingabe",
        "sonstige_quelle"
      ]
    },
    "titel": {
      "key": "titel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Titel",
      "writable": true,
      "maxLength": 4000
    },
    "referenz": {
      "key": "referenz",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Referenz oder Webadresse",
      "writable": true,
      "maxLength": 4000
    },
    "absender_urheber": {
      "key": "absender_urheber",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Absender oder Urheber",
      "writable": true,
      "maxLength": 4000
    },
    "quellendatum": {
      "key": "quellendatum",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Quellendatum",
      "writable": true
    },
    "eingang_am": {
      "key": "eingang_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Eingang am",
      "writable": true
    },
    "versionskennung": {
      "key": "versionskennung",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Versionskennung",
      "writable": true,
      "maxLength": 4000
    },
    "quellenstatus": {
      "key": "quellenstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Quellenstatus",
      "writable": true,
      "options": [
        "aktuell",
        "ersetzt",
        "ungeprueft",
        "strittig",
        "ungueltig"
      ]
    },
    "zusammenfassung": {
      "key": "zusammenfassung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Inhaltliche Zusammenfassung",
      "writable": true
    },
    "extraktionsstatus": {
      "key": "extraktionsstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Extraktionsstatus (manuell gepflegt)",
      "writable": true,
      "options": [
        "nicht_verarbeitet",
        "in_bearbeitung",
        "extrahiert",
        "manuell_geprueft",
        "fehler"
      ]
    },
    "pruefung_durch": {
      "key": "pruefung_durch",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Geprüft durch",
      "writable": true,
      "maxLength": 4000
    },
    "pruefung_am": {
      "key": "pruefung_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Geprüft am",
      "writable": true
    },
    "erneute_pruefung": {
      "key": "erneute_pruefung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erneute Prüfung erforderlich (Quelle wurde geändert)",
      "writable": true
    },
    "bemerkung": {
      "key": "bemerkung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Bemerkung",
      "writable": true
    },
    "ersetzt_quelle": {
      "key": "ersetzt_quelle",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Ersetzt Quelle (ältere Version)",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    }
  },
  "technische_anforderungen": {
    "quellen": {
      "key": "quellen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Quellen",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    },
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "bezeichnung": {
      "key": "bezeichnung",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Bezeichnung",
      "writable": true,
      "maxLength": 4000
    },
    "beschreibung": {
      "key": "beschreibung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Beschreibung",
      "writable": true
    },
    "anforderungstyp": {
      "key": "anforderungstyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Anforderungstyp",
      "writable": true,
      "options": [
        "abmessung",
        "material",
        "leistung",
        "funktion",
        "schnittstelle",
        "norm",
        "sicherheit",
        "umweltbedingung",
        "qualitaet",
        "liefertermin",
        "dokumentation",
        "sonstiges"
      ]
    },
    "ursprung": {
      "key": "ursprung",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Ursprung",
      "writable": true,
      "options": [
        "kundenangabe",
        "kundenunterlage",
        "interne_vorgabe",
        "technische_ableitung",
        "erfahrungswissen",
        "ki_vorschlag"
      ]
    },
    "sollwert": {
      "key": "sollwert",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Sollwert",
      "writable": true,
      "maxLength": 4000
    },
    "einheit": {
      "key": "einheit",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Einheit",
      "writable": true,
      "maxLength": 4000
    },
    "vergleichsoperator": {
      "key": "vergleichsoperator",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Vergleichsoperator",
      "writable": true,
      "options": [
        "gleich",
        "groesser_als",
        "groesser_gleich",
        "kleiner_als",
        "kleiner_gleich",
        "zwischen"
      ]
    },
    "min_wert": {
      "key": "min_wert",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Mindestwert",
      "writable": true
    },
    "max_wert": {
      "key": "max_wert",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Höchstwert",
      "writable": true
    },
    "ist_pflichtanforderung": {
      "key": "ist_pflichtanforderung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Pflichtanforderung",
      "writable": true
    },
    "pruefstatus": {
      "key": "pruefstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Prüfstatus",
      "writable": true,
      "options": [
        "ungeprueft",
        "zu_pruefen",
        "bestaetigt",
        "unklar",
        "widerspruechlich",
        "nicht_erfuellt",
        "nicht_anwendbar"
      ]
    },
    "begruendung_pruefstatus": {
      "key": "begruendung_pruefstatus",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Begründung zum Prüfstatus (erforderlich bei kritischen Abweichungen)",
      "writable": true
    },
    "verantwortlicher": {
      "key": "verantwortlicher",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Verantwortlicher oder Rolle",
      "writable": true,
      "maxLength": 4000
    },
    "gueltig_ab": {
      "key": "gueltig_ab",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig ab",
      "writable": true
    },
    "gueltig_bis": {
      "key": "gueltig_bis",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig bis",
      "writable": true
    },
    "erneute_pruefung": {
      "key": "erneute_pruefung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erneute Prüfung erforderlich (Anforderung wurde geändert)",
      "writable": true
    },
    "aenderungsgrund": {
      "key": "aenderungsgrund",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Grund der Änderung",
      "writable": true
    }
  },
  "offene_punkte": {
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "kurztitel": {
      "key": "kurztitel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Kurztitel",
      "writable": true,
      "maxLength": 4000
    },
    "beschreibung": {
      "key": "beschreibung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Beschreibung und Grund",
      "writable": true
    },
    "punktetyp": {
      "key": "punktetyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Punktetyp",
      "writable": true,
      "options": [
        "fehlende_information",
        "widerspruch",
        "technische_pruefung",
        "normenpruefung",
        "machbarkeit",
        "risiko",
        "rueckfrage",
        "freigabe",
        "sonstiges"
      ]
    },
    "prioritaet": {
      "key": "prioritaet",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Priorität",
      "writable": true,
      "options": [
        "niedrig",
        "normal",
        "hoch",
        "kritisch"
      ]
    },
    "auswirkung": {
      "key": "auswirkung",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Auswirkung",
      "writable": true,
      "options": [
        "qualitaet",
        "sicherheit",
        "funktion",
        "kosten",
        "termin",
        "herstellbarkeit",
        "normenkonformitaet",
        "sonstiges"
      ]
    },
    "zustaendige_rolle": {
      "key": "zustaendige_rolle",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Zuständige Rolle",
      "writable": true,
      "options": [
        "vertrieb",
        "konstruktion",
        "arbeitsvorbereitung",
        "qualitaetssicherung",
        "fertigung",
        "einkauf",
        "entscheider"
      ]
    },
    "verantwortlicher": {
      "key": "verantwortlicher",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Verantwortlicher",
      "writable": true,
      "maxLength": 4000
    },
    "faellig_am": {
      "key": "faellig_am",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Fällig am",
      "writable": true
    },
    "status": {
      "key": "status",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Status",
      "writable": true,
      "options": [
        "neu",
        "zugewiesen",
        "in_bearbeitung",
        "wartet_auf_kunde",
        "wartet_intern",
        "zur_entscheidung",
        "erledigt",
        "entschieden_akzeptiert",
        "nicht_mehr_relevant"
      ]
    },
    "erledigungskriterium": {
      "key": "erledigungskriterium",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Erledigungskriterium",
      "writable": true
    },
    "loesung_ergebnis": {
      "key": "loesung_ergebnis",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Lösung oder Ergebnis (erforderlich beim Abschluss)",
      "writable": true
    },
    "abgeschlossen_am": {
      "key": "abgeschlossen_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Abgeschlossen am",
      "writable": true
    },
    "abschluss_durch": {
      "key": "abschluss_durch",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Abgeschlossen durch",
      "writable": true,
      "maxLength": 4000
    },
    "erneute_pruefung": {
      "key": "erneute_pruefung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erneute Prüfung erforderlich (Grundlage wurde geändert)",
      "writable": true
    },
    "betroffene_anforderungen": {
      "key": "betroffene_anforderungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene Anforderungen",
      "writable": true,
      "targetAppId": "6ad252a0adb5fd9769ed3cd3",
      "targetEntity": "technische_anforderungen"
    },
    "betroffene_quellen": {
      "key": "betroffene_quellen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene Quellen",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    }
  },
  "aufgaben": {
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "titel": {
      "key": "titel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Titel",
      "writable": true,
      "maxLength": 4000
    },
    "beschreibung": {
      "key": "beschreibung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Beschreibung und erwartetes Ergebnis",
      "writable": true
    },
    "aufgabentyp": {
      "key": "aufgabentyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Aufgabentyp",
      "writable": true,
      "options": [
        "informationspruefung",
        "technische_bewertung",
        "kundenrueckfrage",
        "interne_rueckfrage",
        "normenpruefung",
        "machbarkeitspruefung",
        "dokumentation",
        "entscheidung_vorbereiten",
        "freigabepruefung",
        "sonstiges"
      ]
    },
    "verantwortlicher": {
      "key": "verantwortlicher",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Verantwortlicher",
      "writable": true,
      "maxLength": 4000
    },
    "mitwirkende": {
      "key": "mitwirkende",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Mitwirkende",
      "writable": true,
      "maxLength": 4000
    },
    "prioritaet": {
      "key": "prioritaet",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Priorität",
      "writable": true,
      "options": [
        "niedrig",
        "normal",
        "hoch",
        "kritisch"
      ]
    },
    "status": {
      "key": "status",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Status",
      "writable": true,
      "options": [
        "offen",
        "in_bearbeitung",
        "blockiert",
        "wartet_auf_antwort",
        "erledigt",
        "abgebrochen"
      ]
    },
    "faellig_am": {
      "key": "faellig_am",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Fällig am",
      "writable": true
    },
    "blockierungsgrund": {
      "key": "blockierungsgrund",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Blockierungsgrund und nächster Schritt (bei Status Blockiert)",
      "writable": true
    },
    "ergebnis": {
      "key": "ergebnis",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Ergebnis",
      "writable": true
    },
    "abgeschlossen_am": {
      "key": "abgeschlossen_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Abgeschlossen am",
      "writable": true
    },
    "offener_punkt": {
      "key": "offener_punkt",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Offener Punkt",
      "writable": true,
      "targetAppId": "6ad252a24c090fb7e743a8f7",
      "targetEntity": "offene_punkte"
    },
    "abhaengige_aufgaben": {
      "key": "abhaengige_aufgaben",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Abhängig von Aufgaben",
      "writable": true,
      "targetAppId": "6ad252a2f6ae63b6f1bc287f",
      "targetEntity": "aufgaben"
    }
  },
  "beurteilungen": {
    "betroffene_anforderungen": {
      "key": "betroffene_anforderungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene Anforderungen",
      "writable": true,
      "targetAppId": "6ad252a0adb5fd9769ed3cd3",
      "targetEntity": "technische_anforderungen"
    },
    "betroffene_offene_punkte": {
      "key": "betroffene_offene_punkte",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene offene Punkte",
      "writable": true,
      "targetAppId": "6ad252a24c090fb7e743a8f7",
      "targetEntity": "offene_punkte"
    },
    "grundlage_quellen": {
      "key": "grundlage_quellen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Zugrunde liegende Quellen",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    },
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "beurteilungsgegenstand": {
      "key": "beurteilungsgegenstand",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Beurteilungsgegenstand",
      "writable": true,
      "maxLength": 4000
    },
    "beurteilungsart": {
      "key": "beurteilungsart",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Beurteilungsart",
      "writable": true,
      "options": [
        "machbarkeit",
        "vollstaendigkeit",
        "risiko",
        "qualitaet",
        "normenkonformitaet",
        "termin",
        "kostenwirkung",
        "herstellbarkeit",
        "sonstiges"
      ]
    },
    "einschaetzung": {
      "key": "einschaetzung",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Einschätzung",
      "writable": true,
      "options": [
        "positiv",
        "bedingt_positiv",
        "negativ",
        "unklar",
        "nicht_anwendbar"
      ]
    },
    "fachliche_begruendung": {
      "key": "fachliche_begruendung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Fachliche Begründung",
      "writable": true
    },
    "annahmen": {
      "key": "annahmen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Annahmen (nicht gesichert)",
      "writable": true
    },
    "unsicherheiten": {
      "key": "unsicherheiten",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Unsicherheiten",
      "writable": true
    },
    "alternativen": {
      "key": "alternativen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Alternativen",
      "writable": true
    },
    "empfehlung": {
      "key": "empfehlung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Empfehlung (keine Entscheidung)",
      "writable": true
    },
    "erstellt_von": {
      "key": "erstellt_von",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Erstellt von",
      "writable": true,
      "maxLength": 4000
    },
    "ki_vorschlag": {
      "key": "ki_vorschlag",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "KI-Vorschlag (noch nicht fachlich bestätigt)",
      "writable": true
    },
    "erstellt_am": {
      "key": "erstellt_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Erstellt am",
      "writable": true
    },
    "pruefstatus": {
      "key": "pruefstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Prüfstatus",
      "writable": true,
      "options": [
        "entwurf",
        "fachlich_geprueft",
        "bestaetigt",
        "ueberholt"
      ]
    },
    "geprueft_von": {
      "key": "geprueft_von",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Geprüft von",
      "writable": true,
      "maxLength": 4000
    },
    "geprueft_am": {
      "key": "geprueft_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Geprüft am",
      "writable": true
    },
    "erneute_pruefung": {
      "key": "erneute_pruefung",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Erneute Prüfung erforderlich (Grundlagen haben sich geändert)",
      "writable": true
    }
  },
  "rueckfragen_und_kommunikation": {
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "kommunikationstyp": {
      "key": "kommunikationstyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Kommunikationstyp",
      "writable": true,
      "options": [
        "kundenrueckfrage",
        "interne_anfrage",
        "antwort",
        "information",
        "eskalation",
        "gespraechsprotokoll"
      ]
    },
    "kanal": {
      "key": "kanal",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Kanal",
      "writable": true,
      "options": [
        "email",
        "telefon",
        "besprechung",
        "chat",
        "persoenliches_gespraech",
        "sonstiges"
      ]
    },
    "absender": {
      "key": "absender",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Absender",
      "writable": true,
      "maxLength": 4000
    },
    "empfaenger": {
      "key": "empfaenger",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Empfänger",
      "writable": true,
      "maxLength": 4000
    },
    "betreff": {
      "key": "betreff",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Betreff",
      "writable": true,
      "maxLength": 4000
    },
    "inhalt": {
      "key": "inhalt",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Inhalt (Fragen gebündelt formulieren)",
      "writable": true
    },
    "versandstatus": {
      "key": "versandstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Versandstatus",
      "writable": true,
      "options": [
        "entwurf",
        "zur_pruefung",
        "freigegeben",
        "versendet",
        "fehlgeschlagen",
        "nicht_erforderlich"
      ]
    },
    "versanddatum": {
      "key": "versanddatum",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Versanddatum",
      "writable": true
    },
    "antwort_erwartet_bis": {
      "key": "antwort_erwartet_bis",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Antwort erwartet bis",
      "writable": true
    },
    "antwort_erhalten_am": {
      "key": "antwort_erhalten_am",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Antwort erhalten am",
      "writable": true
    },
    "antwortstatus": {
      "key": "antwortstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Antwortstatus",
      "writable": true,
      "options": [
        "offen",
        "teilweise_beantwortet",
        "beantwortet",
        "unklar",
        "widerspruechlich"
      ]
    },
    "antwort_geprueft": {
      "key": "antwort_geprueft",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Antwort fachlich geprüft",
      "writable": true
    },
    "notizen": {
      "key": "notizen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Notizen (z. B. Folgeaufgaben, Widersprüche)",
      "writable": true
    },
    "offener_punkt": {
      "key": "offener_punkt",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Hauptsächlich betroffener offener Punkt",
      "writable": true,
      "targetAppId": "6ad252a24c090fb7e743a8f7",
      "targetEntity": "offene_punkte"
    },
    "weitere_offene_punkte": {
      "key": "weitere_offene_punkte",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Weitere zugehörige offene Punkte",
      "writable": true,
      "targetAppId": "6ad252a24c090fb7e743a8f7",
      "targetEntity": "offene_punkte"
    },
    "bezug_rueckfrage": {
      "key": "bezug_rueckfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Antwort auf Rückfrage",
      "writable": true,
      "targetAppId": "6ad252a475f945afeedab898",
      "targetEntity": "rueckfragen_und_kommunikation"
    },
    "quelle": {
      "key": "quelle",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Zugehörige Quelle",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    }
  },
  "entscheidungen": {
    "betroffene_anforderungen": {
      "key": "betroffene_anforderungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene Anforderungen",
      "writable": true,
      "targetAppId": "6ad252a0adb5fd9769ed3cd3",
      "targetEntity": "technische_anforderungen"
    },
    "betroffene_offene_punkte": {
      "key": "betroffene_offene_punkte",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Betroffene offene Punkte",
      "writable": true,
      "targetAppId": "6ad252a24c090fb7e743a8f7",
      "targetEntity": "offene_punkte"
    },
    "grundlage_beurteilungen": {
      "key": "grundlage_beurteilungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Zugrunde liegende Beurteilungen",
      "writable": true,
      "targetAppId": "6ad252a3fc1ea3c1c8dc407e",
      "targetEntity": "beurteilungen"
    },
    "ersetzt_durch_entscheidung": {
      "key": "ersetzt_durch_entscheidung",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Ersetzt durch Entscheidung",
      "writable": true,
      "targetAppId": "6ad252a6008d102be6054258",
      "targetEntity": "entscheidungen"
    },
    "anfrage": {
      "key": "anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "titel": {
      "key": "titel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Titel",
      "writable": true,
      "maxLength": 4000
    },
    "entscheidungsgegenstand": {
      "key": "entscheidungsgegenstand",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Entscheidungsgegenstand",
      "writable": true
    },
    "entscheidungstyp": {
      "key": "entscheidungstyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Entscheidungstyp",
      "writable": true,
      "options": [
        "technische_freigabe",
        "abweichung_akzeptieren",
        "alternative_auswaehlen",
        "anforderung_aendern",
        "risiko_akzeptieren",
        "rueckfrage_abschliessen",
        "ablehnung",
        "eskalation",
        "sonstiges"
      ]
    },
    "gueltig_bis": {
      "key": "gueltig_bis",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig bis",
      "writable": true
    },
    "ergebnis": {
      "key": "ergebnis",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Ergebnis",
      "writable": true
    },
    "alternativen": {
      "key": "alternativen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Alternativen",
      "writable": true
    },
    "entscheidung": {
      "key": "entscheidung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Entscheidung",
      "writable": true
    },
    "begruendung": {
      "key": "begruendung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Begründung",
      "writable": true
    },
    "entscheidungsverantwortlicher": {
      "key": "entscheidungsverantwortlicher",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Entscheidungsverantwortlicher",
      "writable": true,
      "maxLength": 4000
    },
    "kompetenz_geprueft": {
      "key": "kompetenz_geprueft",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Entscheidungskompetenz geprüft (Pflicht bei verbindlichen Entscheidungen)",
      "writable": true
    },
    "entscheidungsstatus": {
      "key": "entscheidungsstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Entscheidungsstatus",
      "writable": true,
      "options": [
        "vorbereitung",
        "zur_entscheidung",
        "entschieden",
        "zurueckgestellt",
        "ersetzt"
      ]
    },
    "entscheidungsdatum": {
      "key": "entscheidungsdatum",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Entscheidungsdatum",
      "writable": true
    },
    "auflagen": {
      "key": "auflagen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Auflagen",
      "writable": true
    }
  },
  "erfahrungen_und_erkenntnisse": {
    "ursprungs_anfrage": {
      "key": "ursprungs_anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Ursprüngliche Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "titel": {
      "key": "titel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Titel",
      "writable": true,
      "maxLength": 4000
    },
    "produktfamilie": {
      "key": "produktfamilie",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Produkt oder Produktfamilie",
      "writable": true,
      "maxLength": 4000
    },
    "anforderungstyp": {
      "key": "anforderungstyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Anforderungstyp",
      "writable": true,
      "options": [
        "abmessung",
        "material",
        "leistung",
        "funktion",
        "schnittstelle",
        "norm",
        "sicherheit",
        "umweltbedingung",
        "qualitaet",
        "liefertermin",
        "dokumentation",
        "sonstiges"
      ]
    },
    "schlagwoerter": {
      "key": "schlagwoerter",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Schlagwörter",
      "writable": true,
      "maxLength": 4000
    },
    "sachverhalt": {
      "key": "sachverhalt",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": true,
      "label": "Sachverhalt",
      "writable": true
    },
    "erfahrungstyp": {
      "key": "erfahrungstyp",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Erfahrungstyp",
      "writable": true,
      "options": [
        "beobachtung",
        "erfahrung",
        "annahme",
        "experiment",
        "wirkung",
        "bewaehrte_vorgehensweise"
      ]
    },
    "urspruengliches_problem": {
      "key": "urspruengliches_problem",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Ursprüngliches Problem",
      "writable": true
    },
    "vorgehen": {
      "key": "vorgehen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Vorgehen",
      "writable": true
    },
    "beobachtetes_ergebnis": {
      "key": "beobachtetes_ergebnis",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Beobachtetes Ergebnis",
      "writable": true
    },
    "erkenntnis": {
      "key": "erkenntnis",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Erkenntnis",
      "writable": true
    },
    "beleg_abschluesse": {
      "key": "beleg_abschluesse",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Belegende Prüfergebnisse",
      "writable": true,
      "targetAppId": "6ad2529daa6ad3a4991df038",
      "targetEntity": "abschluss_und_uebergabe"
    },
    "gueltigkeitsbedingungen": {
      "key": "gueltigkeitsbedingungen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Gültigkeitsbedingungen",
      "writable": true
    },
    "bekannte_grenzen": {
      "key": "bekannte_grenzen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Bekannte Grenzen",
      "writable": true
    },
    "risiko_uebertragung": {
      "key": "risiko_uebertragung",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Risiko der Übertragung",
      "writable": true,
      "options": [
        "niedrig",
        "mittel",
        "hoch",
        "unbekannt"
      ]
    },
    "bestaetigungsstatus": {
      "key": "bestaetigungsstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Bestätigungsstatus",
      "writable": true,
      "options": [
        "ungeprueft",
        "vorlaeufig",
        "fachlich_bestaetigt",
        "widerlegt",
        "ueberholt",
        "wiederholt_bestaetigt"
      ]
    },
    "bestaetigt_von": {
      "key": "bestaetigt_von",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Bestätigt von",
      "writable": true,
      "maxLength": 4000
    },
    "bestaetigt_am": {
      "key": "bestaetigt_am",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Bestätigt am",
      "writable": true
    },
    "gueltig_ab": {
      "key": "gueltig_ab",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig ab",
      "writable": true
    },
    "gueltig_bis": {
      "key": "gueltig_bis",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig bis",
      "writable": true
    },
    "kommentar_wiederverwendung": {
      "key": "kommentar_wiederverwendung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Kommentar zur Wiederverwendung",
      "writable": true
    },
    "wiederverwendungsstatus": {
      "key": "wiederverwendungsstatus",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Wiederverwendungsstatus",
      "writable": true,
      "options": [
        "nicht_geprueft",
        "verfuegbar",
        "nur_hinweis",
        "nicht_mehr_verwenden"
      ]
    },
    "beleg_quellen": {
      "key": "beleg_quellen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Belegquellen",
      "writable": true,
      "targetAppId": "6ad2529ee20f7f909b5a3812",
      "targetEntity": "informationsquellen"
    },
    "beleg_beurteilungen": {
      "key": "beleg_beurteilungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Belegende Beurteilungen",
      "writable": true,
      "targetAppId": "6ad252a3fc1ea3c1c8dc407e",
      "targetEntity": "beurteilungen"
    },
    "beleg_entscheidungen": {
      "key": "beleg_entscheidungen",
      "fulltype": "multipleapplookup/select",
      "kind": "multirecord",
      "required": false,
      "label": "Belegende Entscheidungen",
      "writable": true,
      "targetAppId": "6ad252a6008d102be6054258",
      "targetEntity": "entscheidungen"
    }
  },
  "wiederverwendung_von_erfahrungen": {
    "ziel_anfrage": {
      "key": "ziel_anfrage",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Spätere Kundenanfrage",
      "writable": true,
      "targetAppId": "6ad2529bc987f10873d5483d",
      "targetEntity": "kundenanfragen"
    },
    "abrufdatum": {
      "key": "abrufdatum",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Abrufdatum",
      "writable": true
    },
    "abrufgrund": {
      "key": "abrufgrund",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Abrufgrund",
      "writable": true
    },
    "aehnlichkeit": {
      "key": "aehnlichkeit",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Ähnlichkeitseinschätzung (fachlich geprüft)",
      "writable": true,
      "options": [
        "hoch",
        "mittel",
        "niedrig",
        "unklar"
      ]
    },
    "kontextunterschiede": {
      "key": "kontextunterschiede",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Kontextunterschiede",
      "writable": true
    },
    "gueltigkeit_geprueft": {
      "key": "gueltigkeit_geprueft",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Gültigkeit geprüft",
      "writable": true
    },
    "geprueft_von": {
      "key": "geprueft_von",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Geprüft von",
      "writable": true,
      "maxLength": 4000
    },
    "verwendungsergebnis": {
      "key": "verwendungsergebnis",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Verwendungsergebnis",
      "writable": true,
      "options": [
        "verwendet",
        "teilweise_verwendet",
        "nicht_verwendet",
        "ungeeignet"
      ]
    },
    "begruendung": {
      "key": "begruendung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Begründung",
      "writable": true
    },
    "beobachteter_nutzen": {
      "key": "beobachteter_nutzen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Beobachteter Nutzen",
      "writable": true
    },
    "aufwand_schaetzung_min": {
      "key": "aufwand_schaetzung_min",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Geschätzte Aufwandsersparnis (Minuten)",
      "writable": true
    },
    "aufwand_tatsaechlich_min": {
      "key": "aufwand_tatsaechlich_min",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Tatsächlich beobachtete Aufwandsersparnis (Minuten)",
      "writable": true
    },
    "negative_folgen": {
      "key": "negative_folgen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Negative Folgen oder Fehlübertragung",
      "writable": true
    },
    "bewertet_am": {
      "key": "bewertet_am",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Bewertet am",
      "writable": true
    },
    "erfahrung": {
      "key": "erfahrung",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Erfahrung",
      "writable": true,
      "targetAppId": "6ad252a7402c5e512e7068ca",
      "targetEntity": "erfahrungen_und_erkenntnisse"
    }
  }
};

export const SHAPES: Record<EntityKey, Shape[]> = {
  "kunden": [],
  "kundenanfragen": [
    {
      "kind": "choice",
      "field": "eingangskanal",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "prioritaet",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "kl_aufwand",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "vollstaendigkeit",
      "count": 4
    },
    {
      "kind": "record",
      "field": "kunde",
      "targetEntity": "kunden"
    }
  ],
  "abschluss_und_uebergabe": [
    {
      "kind": "choice",
      "field": "uebergabestatus",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "freigabestatus",
      "count": 4
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    }
  ],
  "informationsquellen": [
    {
      "kind": "choice",
      "field": "quellenstatus",
      "count": 5
    },
    {
      "kind": "choice",
      "field": "extraktionsstatus",
      "count": 5
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "ersetzt_quelle",
      "targetEntity": "informationsquellen"
    }
  ],
  "technische_anforderungen": [
    {
      "kind": "choice",
      "field": "ursprung",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "vergleichsoperator",
      "count": 6
    },
    {
      "kind": "record",
      "field": "quellen",
      "targetEntity": "informationsquellen"
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    }
  ],
  "offene_punkte": [
    {
      "kind": "choice",
      "field": "prioritaet",
      "count": 4
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "betroffene_anforderungen",
      "targetEntity": "technische_anforderungen"
    },
    {
      "kind": "record",
      "field": "betroffene_quellen",
      "targetEntity": "informationsquellen"
    }
  ],
  "aufgaben": [
    {
      "kind": "choice",
      "field": "prioritaet",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "status",
      "count": 6
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "offener_punkt",
      "targetEntity": "offene_punkte"
    },
    {
      "kind": "record",
      "field": "abhaengige_aufgaben",
      "targetEntity": "aufgaben"
    }
  ],
  "beurteilungen": [
    {
      "kind": "choice",
      "field": "einschaetzung",
      "count": 5
    },
    {
      "kind": "choice",
      "field": "pruefstatus",
      "count": 4
    },
    {
      "kind": "record",
      "field": "betroffene_anforderungen",
      "targetEntity": "technische_anforderungen"
    },
    {
      "kind": "record",
      "field": "betroffene_offene_punkte",
      "targetEntity": "offene_punkte"
    },
    {
      "kind": "record",
      "field": "grundlage_quellen",
      "targetEntity": "informationsquellen"
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    }
  ],
  "rueckfragen_und_kommunikation": [
    {
      "kind": "choice",
      "field": "kommunikationstyp",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "kanal",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "versandstatus",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "antwortstatus",
      "count": 5
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "offener_punkt",
      "targetEntity": "offene_punkte"
    },
    {
      "kind": "record",
      "field": "weitere_offene_punkte",
      "targetEntity": "offene_punkte"
    },
    {
      "kind": "record",
      "field": "bezug_rueckfrage",
      "targetEntity": "rueckfragen_und_kommunikation"
    },
    {
      "kind": "record",
      "field": "quelle",
      "targetEntity": "informationsquellen"
    }
  ],
  "entscheidungen": [
    {
      "kind": "choice",
      "field": "entscheidungsstatus",
      "count": 5
    },
    {
      "kind": "record",
      "field": "betroffene_anforderungen",
      "targetEntity": "technische_anforderungen"
    },
    {
      "kind": "record",
      "field": "betroffene_offene_punkte",
      "targetEntity": "offene_punkte"
    },
    {
      "kind": "record",
      "field": "grundlage_beurteilungen",
      "targetEntity": "beurteilungen"
    },
    {
      "kind": "record",
      "field": "ersetzt_durch_entscheidung",
      "targetEntity": "entscheidungen"
    },
    {
      "kind": "record",
      "field": "anfrage",
      "targetEntity": "kundenanfragen"
    }
  ],
  "erfahrungen_und_erkenntnisse": [
    {
      "kind": "choice",
      "field": "erfahrungstyp",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "risiko_uebertragung",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "bestaetigungsstatus",
      "count": 6
    },
    {
      "kind": "choice",
      "field": "wiederverwendungsstatus",
      "count": 4
    },
    {
      "kind": "record",
      "field": "ursprungs_anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "beleg_abschluesse",
      "targetEntity": "abschluss_und_uebergabe"
    },
    {
      "kind": "record",
      "field": "beleg_quellen",
      "targetEntity": "informationsquellen"
    },
    {
      "kind": "record",
      "field": "beleg_beurteilungen",
      "targetEntity": "beurteilungen"
    },
    {
      "kind": "record",
      "field": "beleg_entscheidungen",
      "targetEntity": "entscheidungen"
    }
  ],
  "wiederverwendung_von_erfahrungen": [
    {
      "kind": "choice",
      "field": "aehnlichkeit",
      "count": 4
    },
    {
      "kind": "choice",
      "field": "verwendungsergebnis",
      "count": 4
    },
    {
      "kind": "record",
      "field": "ziel_anfrage",
      "targetEntity": "kundenanfragen"
    },
    {
      "kind": "record",
      "field": "erfahrung",
      "targetEntity": "erfahrungen_und_erkenntnisse"
    }
  ]
};

/** The fields a record of this entity is recognised by (a person: first and
 *  last name; else its title-like text field) — the same choice the dashboard's
 *  enrichment makes for `<key>Name`. `useRecordSearch` resolves an applookup to
 *  this name (`ctx.ref('gast')` in `toItem`). */
export const DISPLAY_FIELDS: Record<EntityKey, string[]> = {
  "kunden": [
    "kundennummer"
  ],
  "kundenanfragen": [
    "anfragenummer"
  ],
  "abschluss_und_uebergabe": [
    "geprueft_von"
  ],
  "informationsquellen": [
    "titel"
  ],
  "technische_anforderungen": [
    "bezeichnung"
  ],
  "offene_punkte": [
    "kurztitel"
  ],
  "aufgaben": [
    "titel"
  ],
  "beurteilungen": [
    "beurteilungsgegenstand"
  ],
  "rueckfragen_und_kommunikation": [
    "absender"
  ],
  "entscheidungen": [
    "titel"
  ],
  "erfahrungen_und_erkenntnisse": [
    "titel"
  ],
  "wiederverwendung_von_erfahrungen": [
    "abrufgrund"
  ]
};

/** The display name of a record: its display fields joined, else the first
 *  non-empty text value, else ''. */
/** A display-field value as text: strings as they are, a lookup `{ key, label }`
 *  (either door hydrates lookups to objects) by its label — an entity whose
 *  only title-like field is a lookup/select otherwise had no name at all. */
function displayPart(v: unknown): string {
  if (typeof v === 'string') return v.trim();
  if (v && typeof v === 'object' && 'label' in v) {
    const l = (v as { label?: unknown }).label;
    return l === null || l === undefined ? '' : String(l).trim();
  }
  return '';
}

export function displayNameOf(entity: EntityKey, fields: Record<string, unknown>): string {
  const parts = (DISPLAY_FIELDS[entity] ?? [])
    .map(k => displayPart(fields[k]))
    .filter(v => v !== '');
  if (parts.length > 0) return parts.join(' ');
  for (const [k, rule] of Object.entries(FIELD_RULES[entity] ?? {})) {
    if (rule.kind !== 'text' && rule.kind !== 'email') continue;
    const v = fields[k];
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
  }
  return '';
}

export function ruleOf(entity: EntityKey, key: string): FieldRule | undefined {
  return FIELD_RULES[entity]?.[key];
}

/** The field label as the user sees it — the owner's policy label first (a
 *  public page's "Felder anpassen"), runtime bundle second, generated label last. */
export function labelOf(entity: EntityKey, key: string): string {
  const own = policyLabel(entity, key);
  if (own) return own;
  const fromBundle = fieldLabel(entity, key);
  if (fromBundle !== key) return fromBundle;
  return ruleOf(entity, key)?.label ?? key;
}

export function entityLabel(entity: EntityKey): string {
  const fromBundle = appLabel(entity);
  if (fromBundle !== entity) return fromBundle;
  return ENTITIES[entity]?.label ?? entity;
}

/** Lookup options with runtime labels — the only legitimate source of `{key,label}` pairs. */
export function optionsOf(entity: EntityKey, key: string): Array<{ key: string; label: string }> {
  const generated = (LOOKUP_OPTIONS as Record<string, Record<string, Array<{ key: string; label: string }>>>)[entity]?.[key];
  if (generated && generated.length) return generated.map(o => ({ key: o.key, label: o.label }));
  const keys = ruleOf(entity, key)?.options ?? [];
  return keys.map(k => ({ key: k, label: lookupLabel(entity, key, k) ?? k }));
}

export function isEmptyValue(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object' && 'from' in (v as object) && 'to' in (v as object)) {
    const r = v as { from: unknown; to: unknown };
    return isEmptyValue(r.from) && isEmptyValue(r.to);
  }
  return false;
}
