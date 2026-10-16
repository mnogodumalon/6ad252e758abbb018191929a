/**
 * Required-field messages — WRITTEN BY THE BUILD AGENT, never by a heuristic.
 *
 * The layer knows two things about an empty required field: that it is
 * required and what its label is. Out of that it can only say „„Anreise" ist
 * ein Pflichtfeld". What the person should do instead („Bitte einen Gast
 * auswählen.") is meaning, and meaning is the agent's: the Phase-2 orchestrator
 * writes one short instruction per required field — what is needed, not why — to
 * `.intents-staging/messages.json`, the integration step validates it against
 * the app metadata and renders it into the block below. Scaffold updates keep
 * the block. Do not edit outside the markers.
 *
 * Every door reads this and nothing else: `useStepForm` (flows and public
 * pages), the generated {Entity}Dialog and the public form's server-error line.
 * A field without a sentence falls back to the label sentence — never to a
 * bare „Dieses Feld ist erforderlich".
 *
 * Required fields per entity (from the base view):
 *   - kunden: firmenname (Firmenname)
 *   - kundenanfragen: kunde (Kunde), eingangsdatum (Eingangsdatum), anfragebeschreibung (Anfragebeschreibung), urspruengliche_kundenanforderungen (Ursprüngliche Kundenanforderungen)
 *   - abschluss_und_uebergabe: anfrage (Kundenanfrage (genau ein Abschluss je Anfrage)), pruefdatum (Prüfdatum), geprueft_von (Geprüft von)
 *   - informationsquellen: anfrage (Kundenanfrage), titel (Titel)
 *   - technische_anforderungen: anfrage (Kundenanfrage), bezeichnung (Bezeichnung), beschreibung (Beschreibung)
 *   - offene_punkte: anfrage (Kundenanfrage), kurztitel (Kurztitel), beschreibung (Beschreibung und Grund), verantwortlicher (Verantwortlicher)
 *   - aufgaben: anfrage (Kundenanfrage), titel (Titel), verantwortlicher (Verantwortlicher)
 *   - beurteilungen: anfrage (Kundenanfrage), beurteilungsgegenstand (Beurteilungsgegenstand), fachliche_begruendung (Fachliche Begründung)
 *   - rueckfragen_und_kommunikation: anfrage (Kundenanfrage), betreff (Betreff), inhalt (Inhalt (Fragen gebündelt formulieren))
 *   - entscheidungen: anfrage (Kundenanfrage), titel (Titel), entscheidungsgegenstand (Entscheidungsgegenstand), entscheidung (Entscheidung), begruendung (Begründung), entscheidungsverantwortlicher (Entscheidungsverantwortlicher)
 *   - erfahrungen_und_erkenntnisse: ursprungs_anfrage (Ursprüngliche Kundenanfrage), titel (Titel), sachverhalt (Sachverhalt)
 *   - wiederverwendung_von_erfahrungen: ziel_anfrage (Spätere Kundenanfrage), erfahrung (Erfahrung)
 */
import { t, tx } from '@/i18n';
import { labelOf, type EntityKey } from './rules';

/** The writable fields of each entity — the keys a message may address (generated). */
export interface MessageFields {
  "kunden": "kundennummer" | "firmenname" | "ansprechpartner_vorname" | "ansprechpartner_nachname" | "e_mail" | "telefon" | "strasse" | "hausnummer" | "plz" | "ort" | "branche" | "interne_bemerkung" | "aktiv";
  "kundenanfragen": "anfragenummer" | "kunde" | "eingangsdatum" | "eingangskanal" | "kundenreferenz" | "produktfamilie" | "produktvariante" | "gewuenschte_menge" | "gewuenschter_liefertermin" | "anfragebeschreibung" | "urspruengliche_kundenanforderungen" | "prioritaet" | "verantwortlicher" | "status" | "kl_aufwand" | "zieltermin_klaerung" | "vollstaendigkeit" | "kontakt_vorname_anfrage" | "kontakt_nachname_anfrage" | "kontakt_email_anfrage" | "kontakt_telefon_anfrage" | "aktive_bearbeitung_min" | "wartezeit_kunde_min" | "wartezeit_intern_min" | "anzahl_nacharbeiten" | "anzahl_nachtraegliche_aenderungen" | "klaerung_abgeschlossen_am" | "erneute_pruefung" | "erneute_pruefung_grund";
  "abschluss_und_uebergabe": "anfrage" | "pruefdatum" | "geprueft_von" | "anforderungen_geprueft" | "kritische_punkte_geklaert" | "entscheidungen_vorhanden" | "freigaben_vorhanden" | "verbleibende_abweichungen" | "verbleibende_risiken" | "offene_restpunkte" | "uebergabeempfaenger" | "uebergabestatus" | "uebergabedatum" | "zusammenfassung" | "freigabestatus";
  "informationsquellen": "anfrage" | "quellentyp" | "titel" | "referenz" | "absender_urheber" | "quellendatum" | "eingang_am" | "versionskennung" | "quellenstatus" | "zusammenfassung" | "extraktionsstatus" | "pruefung_durch" | "pruefung_am" | "erneute_pruefung" | "bemerkung" | "ersetzt_quelle";
  "technische_anforderungen": "quellen" | "anfrage" | "bezeichnung" | "beschreibung" | "anforderungstyp" | "ursprung" | "sollwert" | "einheit" | "vergleichsoperator" | "min_wert" | "max_wert" | "ist_pflichtanforderung" | "pruefstatus" | "begruendung_pruefstatus" | "verantwortlicher" | "gueltig_ab" | "gueltig_bis" | "erneute_pruefung" | "aenderungsgrund";
  "offene_punkte": "anfrage" | "kurztitel" | "beschreibung" | "punktetyp" | "prioritaet" | "auswirkung" | "zustaendige_rolle" | "verantwortlicher" | "faellig_am" | "status" | "erledigungskriterium" | "loesung_ergebnis" | "abgeschlossen_am" | "abschluss_durch" | "erneute_pruefung" | "betroffene_anforderungen" | "betroffene_quellen";
  "aufgaben": "anfrage" | "titel" | "beschreibung" | "aufgabentyp" | "verantwortlicher" | "mitwirkende" | "prioritaet" | "status" | "faellig_am" | "blockierungsgrund" | "ergebnis" | "abgeschlossen_am" | "offener_punkt" | "abhaengige_aufgaben";
  "beurteilungen": "betroffene_anforderungen" | "betroffene_offene_punkte" | "grundlage_quellen" | "anfrage" | "beurteilungsgegenstand" | "beurteilungsart" | "einschaetzung" | "fachliche_begruendung" | "annahmen" | "unsicherheiten" | "alternativen" | "empfehlung" | "erstellt_von" | "ki_vorschlag" | "erstellt_am" | "pruefstatus" | "geprueft_von" | "geprueft_am" | "erneute_pruefung";
  "rueckfragen_und_kommunikation": "anfrage" | "kommunikationstyp" | "kanal" | "absender" | "empfaenger" | "betreff" | "inhalt" | "versandstatus" | "versanddatum" | "antwort_erwartet_bis" | "antwort_erhalten_am" | "antwortstatus" | "antwort_geprueft" | "notizen" | "offener_punkt" | "weitere_offene_punkte" | "bezug_rueckfrage" | "quelle";
  "entscheidungen": "betroffene_anforderungen" | "betroffene_offene_punkte" | "grundlage_beurteilungen" | "ersetzt_durch_entscheidung" | "anfrage" | "titel" | "entscheidungsgegenstand" | "entscheidungstyp" | "gueltig_bis" | "ergebnis" | "alternativen" | "entscheidung" | "begruendung" | "entscheidungsverantwortlicher" | "kompetenz_geprueft" | "entscheidungsstatus" | "entscheidungsdatum" | "auflagen";
  "erfahrungen_und_erkenntnisse": "ursprungs_anfrage" | "titel" | "produktfamilie" | "anforderungstyp" | "schlagwoerter" | "sachverhalt" | "erfahrungstyp" | "urspruengliches_problem" | "vorgehen" | "beobachtetes_ergebnis" | "erkenntnis" | "beleg_abschluesse" | "gueltigkeitsbedingungen" | "bekannte_grenzen" | "risiko_uebertragung" | "bestaetigungsstatus" | "bestaetigt_von" | "bestaetigt_am" | "gueltig_ab" | "gueltig_bis" | "kommentar_wiederverwendung" | "wiederverwendungsstatus" | "beleg_quellen" | "beleg_beurteilungen" | "beleg_entscheidungen";
  "wiederverwendung_von_erfahrungen": "ziel_anfrage" | "abrufdatum" | "abrufgrund" | "aehnlichkeit" | "kontextunterschiede" | "gueltigkeit_geprueft" | "geprueft_von" | "verwendungsergebnis" | "begruendung" | "beobachteter_nutzen" | "aufwand_schaetzung_min" | "aufwand_tatsaechlich_min" | "negative_folgen" | "bewertet_am" | "erfahrung";
}
export type MessageFieldKey<E extends EntityKey> = E extends keyof MessageFields ? MessageFields[E] : never;

export const REQUIRED_MESSAGES: { [E in EntityKey]?: Partial<Record<MessageFieldKey<E>, string>> } = {
  // <custom:messages>
  kunden: { firmenname: "Bitte den Firmennamen eingeben." },
  kundenanfragen: { kunde: "Bitte einen Kunden auswählen.", eingangsdatum: "Bitte das Eingangsdatum wählen.", anfragebeschreibung: "Bitte die Anfrage kurz beschreiben.", urspruengliche_kundenanforderungen: "Bitte die Kundenanforderungen eintragen." },
  abschluss_und_uebergabe: { anfrage: "Bitte eine Kundenanfrage auswählen.", pruefdatum: "Bitte das Prüfdatum wählen.", geprueft_von: "Bitte die prüfende Person eintragen." },
  informationsquellen: { anfrage: "Bitte eine Kundenanfrage auswählen.", titel: "Bitte einen Titel für die Quelle eingeben." },
  technische_anforderungen: { anfrage: "Bitte eine Kundenanfrage auswählen.", bezeichnung: "Bitte die Anforderung benennen.", beschreibung: "Bitte die Anforderung beschreiben." },
  offene_punkte: { anfrage: "Bitte eine Kundenanfrage auswählen.", kurztitel: "Bitte einen Kurztitel eingeben.", beschreibung: "Bitte den Klärungsbedarf beschreiben.", verantwortlicher: "Bitte eine verantwortliche Person eintragen." },
  aufgaben: { anfrage: "Bitte eine Kundenanfrage auswählen.", titel: "Bitte einen Aufgabentitel eingeben.", verantwortlicher: "Bitte eine verantwortliche Person eintragen." },
  beurteilungen: { anfrage: "Bitte eine Kundenanfrage auswählen.", beurteilungsgegenstand: "Bitte den Beurteilungsgegenstand eingeben.", fachliche_begruendung: "Bitte die fachliche Begründung eintragen." },
  rueckfragen_und_kommunikation: { anfrage: "Bitte eine Kundenanfrage auswählen.", betreff: "Bitte einen Betreff eingeben.", inhalt: "Bitte die Fragen formulieren." },
  entscheidungen: { anfrage: "Bitte eine Kundenanfrage auswählen.", titel: "Bitte einen Titel eingeben.", entscheidungsgegenstand: "Bitte den Entscheidungsgegenstand beschreiben.", entscheidung: "Bitte die Entscheidung festhalten.", begruendung: "Bitte die Begründung eintragen.", entscheidungsverantwortlicher: "Bitte die entscheidende Person eintragen." },
  erfahrungen_und_erkenntnisse: { ursprungs_anfrage: "Bitte die ursprüngliche Anfrage auswählen.", titel: "Bitte einen Titel eingeben.", sachverhalt: "Bitte den Sachverhalt beschreiben." },
  wiederverwendung_von_erfahrungen: { ziel_anfrage: "Bitte die spätere Anfrage auswählen.", erfahrung: "Bitte eine Erfahrung auswählen." },
  // </custom:messages>
};

/** The sentence shown when `key` of `entity` is required and empty — the
 *  agent's own text (translated at runtime like every page string), else the
 *  label sentence. Call it while rendering, not at module scope. */
export function requiredMessage(entity: EntityKey, key: string): string {
  const own = (REQUIRED_MESSAGES as Record<string, Record<string, string | undefined> | undefined>)[entity]?.[key];
  if (own && own.trim()) return tx(own);
  return t('v_required', { label: labelOf(entity, key) });
}

/** True when the agent wrote a sentence for the field. */
export function hasOwnMessage(entity: EntityKey, key: string): boolean {
  const own = (REQUIRED_MESSAGES as Record<string, Record<string, string | undefined> | undefined>)[entity]?.[key];
  return Boolean(own && own.trim());
}
