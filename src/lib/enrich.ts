import type { EnrichedAbschlussUndUebergabe, EnrichedAufgaben, EnrichedBeurteilungen, EnrichedEntscheidungen, EnrichedErfahrungenUndErkenntnisse, EnrichedInformationsquellen, EnrichedKundenanfragen, EnrichedOffenePunkte, EnrichedRueckfragenUndKommunikation, EnrichedTechnischeAnforderungen, EnrichedWiederverwendungVonErfahrungen } from '@/types/enriched';
import type { AbschlussUndUebergabe, Aufgaben, Beurteilungen, Entscheidungen, ErfahrungenUndErkenntnisse, Informationsquellen, Kunden, Kundenanfragen, OffenePunkte, RueckfragenUndKommunikation, TechnischeAnforderungen, WiederverwendungVonErfahrungen } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveDisplay(url: unknown, map: Map<string, any>, ...fields: string[]): string {
  if (!url) return '';
  const id = extractRecordId(url);
  if (!id) return '';
  const r = map.get(id);
  if (!r) return '';
  return fields.map(f => String(r.fields[f] ?? '')).join(' ').trim();
}

interface KundenanfragenMaps {
  kundenMap: Map<string, Kunden>;
}

export function enrichKundenanfragen(
  kundenanfragen: Kundenanfragen[],
  maps: KundenanfragenMaps
): EnrichedKundenanfragen[] {
  return kundenanfragen.map(r => ({
    ...r,
    kundeName: resolveDisplay(r.fields.kunde, maps.kundenMap, 'kundennummer'),
  }));
}

interface AbschlussUndUebergabeMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
}

export function enrichAbschlussUndUebergabe(
  abschlussUndUebergabe: AbschlussUndUebergabe[],
  maps: AbschlussUndUebergabeMaps
): EnrichedAbschlussUndUebergabe[] {
  return abschlussUndUebergabe.map(r => ({
    ...r,
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
  }));
}

interface InformationsquellenMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  informationsquellenMap: Map<string, Informationsquellen>;
}

export function enrichInformationsquellen(
  informationsquellen: Informationsquellen[],
  maps: InformationsquellenMaps
): EnrichedInformationsquellen[] {
  return informationsquellen.map(r => ({
    ...r,
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    ersetzt_quelleName: resolveDisplay(r.fields.ersetzt_quelle, maps.informationsquellenMap, 'titel'),
  }));
}

interface TechnischeAnforderungenMaps {
  informationsquellenMap: Map<string, Informationsquellen>;
  kundenanfragenMap: Map<string, Kundenanfragen>;
}

export function enrichTechnischeAnforderungen(
  technischeAnforderungen: TechnischeAnforderungen[],
  maps: TechnischeAnforderungenMaps
): EnrichedTechnischeAnforderungen[] {
  return technischeAnforderungen.map(r => ({
    ...r,
    quellenName: resolveDisplay(r.fields.quellen, maps.informationsquellenMap, 'titel'),
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
  }));
}

interface OffenePunkteMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  technischeAnforderungenMap: Map<string, TechnischeAnforderungen>;
  informationsquellenMap: Map<string, Informationsquellen>;
}

export function enrichOffenePunkte(
  offenePunkte: OffenePunkte[],
  maps: OffenePunkteMaps
): EnrichedOffenePunkte[] {
  return offenePunkte.map(r => ({
    ...r,
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    betroffene_anforderungenName: resolveDisplay(r.fields.betroffene_anforderungen, maps.technischeAnforderungenMap, 'bezeichnung'),
    betroffene_quellenName: resolveDisplay(r.fields.betroffene_quellen, maps.informationsquellenMap, 'titel'),
  }));
}

interface AufgabenMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  offenePunkteMap: Map<string, OffenePunkte>;
  aufgabenMap: Map<string, Aufgaben>;
}

export function enrichAufgaben(
  aufgaben: Aufgaben[],
  maps: AufgabenMaps
): EnrichedAufgaben[] {
  return aufgaben.map(r => ({
    ...r,
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    offener_punktName: resolveDisplay(r.fields.offener_punkt, maps.offenePunkteMap, 'kurztitel'),
    abhaengige_aufgabenName: resolveDisplay(r.fields.abhaengige_aufgaben, maps.aufgabenMap, 'titel'),
  }));
}

interface BeurteilungenMaps {
  technischeAnforderungenMap: Map<string, TechnischeAnforderungen>;
  offenePunkteMap: Map<string, OffenePunkte>;
  informationsquellenMap: Map<string, Informationsquellen>;
  kundenanfragenMap: Map<string, Kundenanfragen>;
}

export function enrichBeurteilungen(
  beurteilungen: Beurteilungen[],
  maps: BeurteilungenMaps
): EnrichedBeurteilungen[] {
  return beurteilungen.map(r => ({
    ...r,
    betroffene_anforderungenName: resolveDisplay(r.fields.betroffene_anforderungen, maps.technischeAnforderungenMap, 'bezeichnung'),
    betroffene_offene_punkteName: resolveDisplay(r.fields.betroffene_offene_punkte, maps.offenePunkteMap, 'kurztitel'),
    grundlage_quellenName: resolveDisplay(r.fields.grundlage_quellen, maps.informationsquellenMap, 'titel'),
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
  }));
}

interface RueckfragenUndKommunikationMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  offenePunkteMap: Map<string, OffenePunkte>;
  rueckfragenUndKommunikationMap: Map<string, RueckfragenUndKommunikation>;
  informationsquellenMap: Map<string, Informationsquellen>;
}

export function enrichRueckfragenUndKommunikation(
  rueckfragenUndKommunikation: RueckfragenUndKommunikation[],
  maps: RueckfragenUndKommunikationMaps
): EnrichedRueckfragenUndKommunikation[] {
  return rueckfragenUndKommunikation.map(r => ({
    ...r,
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    offener_punktName: resolveDisplay(r.fields.offener_punkt, maps.offenePunkteMap, 'kurztitel'),
    weitere_offene_punkteName: resolveDisplay(r.fields.weitere_offene_punkte, maps.offenePunkteMap, 'kurztitel'),
    bezug_rueckfrageName: resolveDisplay(r.fields.bezug_rueckfrage, maps.rueckfragenUndKommunikationMap, 'absender'),
    quelleName: resolveDisplay(r.fields.quelle, maps.informationsquellenMap, 'titel'),
  }));
}

interface EntscheidungenMaps {
  technischeAnforderungenMap: Map<string, TechnischeAnforderungen>;
  offenePunkteMap: Map<string, OffenePunkte>;
  beurteilungenMap: Map<string, Beurteilungen>;
  entscheidungenMap: Map<string, Entscheidungen>;
  kundenanfragenMap: Map<string, Kundenanfragen>;
}

export function enrichEntscheidungen(
  entscheidungen: Entscheidungen[],
  maps: EntscheidungenMaps
): EnrichedEntscheidungen[] {
  return entscheidungen.map(r => ({
    ...r,
    betroffene_anforderungenName: resolveDisplay(r.fields.betroffene_anforderungen, maps.technischeAnforderungenMap, 'bezeichnung'),
    betroffene_offene_punkteName: resolveDisplay(r.fields.betroffene_offene_punkte, maps.offenePunkteMap, 'kurztitel'),
    grundlage_beurteilungenName: resolveDisplay(r.fields.grundlage_beurteilungen, maps.beurteilungenMap, 'beurteilungsgegenstand'),
    ersetzt_durch_entscheidungName: resolveDisplay(r.fields.ersetzt_durch_entscheidung, maps.entscheidungenMap, 'titel'),
    anfrageName: resolveDisplay(r.fields.anfrage, maps.kundenanfragenMap, 'anfragenummer'),
  }));
}

interface ErfahrungenUndErkenntnisseMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  abschlussUndUebergabeMap: Map<string, AbschlussUndUebergabe>;
  informationsquellenMap: Map<string, Informationsquellen>;
  beurteilungenMap: Map<string, Beurteilungen>;
  entscheidungenMap: Map<string, Entscheidungen>;
}

export function enrichErfahrungenUndErkenntnisse(
  erfahrungenUndErkenntnisse: ErfahrungenUndErkenntnisse[],
  maps: ErfahrungenUndErkenntnisseMaps
): EnrichedErfahrungenUndErkenntnisse[] {
  return erfahrungenUndErkenntnisse.map(r => ({
    ...r,
    ursprungs_anfrageName: resolveDisplay(r.fields.ursprungs_anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    beleg_abschluesseName: resolveDisplay(r.fields.beleg_abschluesse, maps.abschlussUndUebergabeMap, 'geprueft_von'),
    beleg_quellenName: resolveDisplay(r.fields.beleg_quellen, maps.informationsquellenMap, 'titel'),
    beleg_beurteilungenName: resolveDisplay(r.fields.beleg_beurteilungen, maps.beurteilungenMap, 'beurteilungsgegenstand'),
    beleg_entscheidungenName: resolveDisplay(r.fields.beleg_entscheidungen, maps.entscheidungenMap, 'titel'),
  }));
}

interface WiederverwendungVonErfahrungenMaps {
  kundenanfragenMap: Map<string, Kundenanfragen>;
  erfahrungenUndErkenntnisseMap: Map<string, ErfahrungenUndErkenntnisse>;
}

export function enrichWiederverwendungVonErfahrungen(
  wiederverwendungVonErfahrungen: WiederverwendungVonErfahrungen[],
  maps: WiederverwendungVonErfahrungenMaps
): EnrichedWiederverwendungVonErfahrungen[] {
  return wiederverwendungVonErfahrungen.map(r => ({
    ...r,
    ziel_anfrageName: resolveDisplay(r.fields.ziel_anfrage, maps.kundenanfragenMap, 'anfragenummer'),
    erfahrungName: resolveDisplay(r.fields.erfahrung, maps.erfahrungenUndErkenntnisseMap, 'titel'),
  }));
}
