import type { AbschlussUndUebergabe, Aufgaben, Beurteilungen, Entscheidungen, ErfahrungenUndErkenntnisse, Informationsquellen, Kundenanfragen, OffenePunkte, RueckfragenUndKommunikation, TechnischeAnforderungen, WiederverwendungVonErfahrungen } from './app';

export type EnrichedKundenanfragen = Kundenanfragen & {
  kundeName: string;
};

export type EnrichedAbschlussUndUebergabe = AbschlussUndUebergabe & {
  anfrageName: string;
};

export type EnrichedInformationsquellen = Informationsquellen & {
  anfrageName: string;
  ersetzt_quelleName: string;
};

export type EnrichedTechnischeAnforderungen = TechnischeAnforderungen & {
  quellenName: string;
  anfrageName: string;
};

export type EnrichedOffenePunkte = OffenePunkte & {
  anfrageName: string;
  betroffene_anforderungenName: string;
  betroffene_quellenName: string;
};

export type EnrichedAufgaben = Aufgaben & {
  anfrageName: string;
  offener_punktName: string;
  abhaengige_aufgabenName: string;
};

export type EnrichedBeurteilungen = Beurteilungen & {
  betroffene_anforderungenName: string;
  betroffene_offene_punkteName: string;
  grundlage_quellenName: string;
  anfrageName: string;
};

export type EnrichedRueckfragenUndKommunikation = RueckfragenUndKommunikation & {
  anfrageName: string;
  offener_punktName: string;
  weitere_offene_punkteName: string;
  bezug_rueckfrageName: string;
  quelleName: string;
};

export type EnrichedEntscheidungen = Entscheidungen & {
  betroffene_anforderungenName: string;
  betroffene_offene_punkteName: string;
  grundlage_beurteilungenName: string;
  ersetzt_durch_entscheidungName: string;
  anfrageName: string;
};

export type EnrichedErfahrungenUndErkenntnisse = ErfahrungenUndErkenntnisse & {
  ursprungs_anfrageName: string;
  beleg_abschluesseName: string;
  beleg_quellenName: string;
  beleg_beurteilungenName: string;
  beleg_entscheidungenName: string;
};

export type EnrichedWiederverwendungVonErfahrungen = WiederverwendungVonErfahrungen & {
  ziel_anfrageName: string;
  erfahrungName: string;
};
