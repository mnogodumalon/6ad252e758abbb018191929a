import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import type { DashboardData } from '@/hooks/useDashboardData';
import { useEntityCrud } from '@/components/EntityCrud';
import type { OffenePunkte, Aufgaben, Kundenanfragen } from '@/types/app';
import { LOOKUP_OPTIONS, lookupOption } from '@/types/app';
import { LivingAppsService } from '@/services/livingAppsService';
import { formatDate, lookupKey } from '@/lib/formatters';
import { tx, appLabel } from '@/i18n';
import { useClock, gruss, undoToast } from '@/lib/polish';
import { DashboardGrid } from '@/components/DashboardGrid';
import { HeroBanner } from '@/components/HeroBanner';
import { WorkList } from '@/components/WorkList';
import { StatStrip, StatStripItem } from '@/components/StatCard';
import { KanbanWidget, type KanbanCard, type KanbanColumn, type KanbanTone } from '@/components/widgets/KanbanWidget';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconAlertTriangle, IconClock, IconInbox, IconMessageQuestion, IconGavel, IconChecklist, IconRefresh, IconUserOff, IconPlus, IconRosetteDiscountCheck } from '@tabler/icons-react';

const PUNKT_DONE = ['erledigt', 'entschieden_akzeptiert', 'nicht_mehr_relevant'];
const AUFGABE_DONE = ['erledigt', 'abgebrochen'];

export default function DashboardOverview({ data }: { data: DashboardData }) {
  const { setOffenePunkte, setAufgaben, setKundenanfragen, fetchAll } = data;
  const clock = useClock();
  const todayKey = format(clock, 'yyyy-MM-dd');

  const [filter, setFilter] = useState<'all' | 'overdue' | 'unassigned' | 'recheck'>('all');
  const [person, setPerson] = useState('all');

  const isOverdue = (d?: string) => !!d && d.slice(0, 10) < todayKey;

  // ---------- Schreibpfade (optimistisch + Rückgängig) ----------
  const writePunktStatus = async (r: OffenePunkte, newKey: string) => {
    const prev = lookupKey(r.fields.status);
    const title = r.fields.kurztitel ?? '';
    setOffenePunkte(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('offene_punkte', 'status', newKey) } } : p));
    try {
      await LivingAppsService.updateOffenePunkteEntry(r.record_id, { status: newKey });
      undoToast(tx`${title} — Status geändert`, prev ? () => {
        setOffenePunkte(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('offene_punkte', 'status', prev) } } : p));
        void LivingAppsService.updateOffenePunkteEntry(r.record_id, { status: prev }).catch(() => void fetchAll());
      } : undefined);
    } catch {
      void fetchAll();
    }
  };

  const writeAufgabeStatus = async (r: Aufgaben, newKey: string) => {
    const prev = lookupKey(r.fields.status);
    const title = r.fields.titel ?? '';
    setAufgaben(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('aufgaben', 'status', newKey) } } : p));
    try {
      await LivingAppsService.updateAufgabenEntry(r.record_id, { status: newKey });
      undoToast(tx`${title} — Status geändert`, prev ? () => {
        setAufgaben(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('aufgaben', 'status', prev) } } : p));
        void LivingAppsService.updateAufgabenEntry(r.record_id, { status: prev }).catch(() => void fetchAll());
      } : undefined);
    } catch {
      void fetchAll();
    }
  };

  const takeOverAnfrage = async (r: Kundenanfragen) => {
    const prev = lookupKey(r.fields.status);
    const nr = r.fields.anfragenummer ?? '';
    setKundenanfragen(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('kundenanfragen', 'status', 'in_pruefung') } } : p));
    try {
      await LivingAppsService.updateKundenanfragenEntry(r.record_id, { status: 'in_pruefung' });
      undoToast(tx`${nr} — in Prüfung`, prev ? () => {
        setKundenanfragen(list => list.map(p => p.record_id === r.record_id ? { ...p, fields: { ...p.fields, status: lookupOption('kundenanfragen', 'status', prev) } } : p));
        void LivingAppsService.updateKundenanfragenEntry(r.record_id, { status: prev }).catch(() => void fetchAll());
      } : undefined);
    } catch {
      void fetchAll();
    }
  };

  // Nächster Schritt eines offenen Punkts — Abschluss braucht immer ein dokumentiertes Ergebnis (Dialog).
  const punktNext = (r: OffenePunkte): { label: string; run: () => void } | undefined => {
    const k = lookupKey(r.fields.status) ?? 'neu';
    if (PUNKT_DONE.includes(k)) return undefined;
    if (!r.fields.verantwortlicher) return { label: tx('Zuweisen'), run: () => crud.offenePunkte.openEdit(r) };
    if (k === 'neu' || k === 'zugewiesen') return { label: tx('Bearbeiten starten'), run: () => void writePunktStatus(r, 'in_bearbeitung') };
    return { label: tx('Ergebnis erfassen'), run: () => crud.offenePunkte.openEdit(r) };
  };

  const crud = useEntityCrud(data, {
    footer: (top) => {
      if (top.type === 'offenePunkte') {
        const n = punktNext(top.record);
        return n ? { label: n.label, onClick: n.run } : undefined;
      }
      return undefined;
    },
  });

  const punkte = crud.enriched.offenePunkte;
  const aufgaben = crud.enriched.aufgaben;
  const anfragen = crud.enriched.kundenanfragen;
  const kommunikation = crud.enriched.rueckfragenUndKommunikation;
  const entscheidungen = crud.enriched.entscheidungen;
  const abschluesse = crud.enriched.abschlussUndUebergabe;

  // ---------- Abgeleitete Mengen ----------
  const offenePunkteAktiv = punkte.filter(p => !PUNKT_DONE.includes(lookupKey(p.fields.status) ?? 'neu'));
  const kritische = offenePunkteAktiv.filter(p => lookupKey(p.fields.prioritaet) === 'kritisch');
  const ueberfaelligePunkte = offenePunkteAktiv.filter(p => isOverdue(p.fields.faellig_am));
  const ohneVerantwortlichen = offenePunkteAktiv.filter(p => !p.fields.verantwortlicher);
  const erneutePruefung = offenePunkteAktiv.filter(p => p.fields.erneute_pruefung);

  const personen = useMemo(
    () => Array.from(new Set(punkte.map(p => p.fields.verantwortlicher).filter((x): x is string => !!x))).sort(),
    [punkte],
  );

  const ueberfaelligeAufgaben = aufgaben
    .filter(a => !AUFGABE_DONE.includes(lookupKey(a.fields.status) ?? 'offen') && isOverdue(a.fields.faellig_am))
    .sort((a, b) => (a.fields.faellig_am ?? '').localeCompare(b.fields.faellig_am ?? ''));

  const neueAnfragen = anfragen.filter(a => (lookupKey(a.fields.status) ?? 'neu') === 'neu');

  const ausstehendeAntworten = kommunikation
    .filter(k => lookupKey(k.fields.versandstatus) === 'versendet' && !k.fields.antwort_erhalten_am && lookupKey(k.fields.antwortstatus) !== 'beantwortet')
    .sort((a, b) => (a.fields.antwort_erwartet_bis ?? '9999').localeCompare(b.fields.antwort_erwartet_bis ?? '9999'));

  const offeneEntscheidungen = entscheidungen.filter(e => ['vorbereitung', 'zur_entscheidung'].includes(lookupKey(e.fields.entscheidungsstatus) ?? ''));

  const freigabeBereit = abschluesse.filter(a => lookupKey(a.fields.uebergabestatus) === 'bereit' && lookupKey(a.fields.freigabestatus) !== 'freigegeben');

  // ---------- Board ----------
  const columns = useMemo<KanbanColumn[]>(
    () => (LOOKUP_OPTIONS['offene_punkte']?.['status'] ?? []).map(o => ({ key: o.key, label: o.label })),
    [],
  );

  const visiblePunkte = punkte.filter(p => {
    if (person !== 'all' && p.fields.verantwortlicher !== person) return false;
    const aktiv = !PUNKT_DONE.includes(lookupKey(p.fields.status) ?? 'neu');
    if (filter === 'overdue') return aktiv && isOverdue(p.fields.faellig_am);
    if (filter === 'unassigned') return aktiv && !p.fields.verantwortlicher;
    if (filter === 'recheck') return aktiv && !!p.fields.erneute_pruefung;
    return true;
  });

  const cards: KanbanCard[] = visiblePunkte.map(p => {
    const prio = lookupKey(p.fields.prioritaet);
    const tone: KanbanTone = prio === 'kritisch' ? 'destructive' : prio === 'hoch' ? 'warning' : 'default';
    const parts = [
      p.fields.prioritaet?.label,
      p.fields.verantwortlicher ?? tx('Nicht zugewiesen'),
      p.fields.faellig_am ? formatDate(p.fields.faellig_am) : '',
      p.betroffene_anforderungenName,
      p.fields.erneute_pruefung ? tx('Erneute Prüfung') : '',
    ].filter(Boolean);
    return {
      id: `offenePunkte:${p.record_id}`,
      column: lookupKey(p.fields.status) ?? 'neu',
      title: p.fields.kurztitel ?? tx('Ohne Titel'),
      subtitle: parts.join(' · '),
      tone,
    };
  });

  const moveCard = (cardId: string, newColumn: string) => {
    const rid = cardId.split(':')[1];
    const rec = punkte.find(p => p.record_id === rid);
    if (!rec) return;
    if (newColumn === 'erledigt' && !rec.fields.loesung_ergebnis) {
      return tx('Zum Erledigen zuerst das Ergebnis dokumentieren — Karte öffnen und bearbeiten.');
    }
    if (newColumn === 'entschieden_akzeptiert' && lookupKey(rec.fields.prioritaet) === 'kritisch') {
      return tx('Kritische Punkte werden nur über eine dokumentierte Entscheidung akzeptiert.');
    }
    void writePunktStatus(rec, newColumn);
  };

  // ---------- Kopf ----------
  const erstesKritisch = kritische[0];
  const erstesUeberfaellig = ueberfaelligeAufgaben[0];
  const erstesNeu = neueAnfragen[0];
  let kontext: string;
  if (erstesKritisch) {
    const t = erstesKritisch.fields.kurztitel ?? '';
    const a = erstesKritisch.anfrageName;
    kontext = kritische.length > 1
      ? tx`Kritisch: „${t}“ (${a}) blockiert den Abschluss — dazu ${kritische.length - 1} weitere.`
      : tx`Kritisch: „${t}“ (${a}) blockiert den Abschluss.`;
  } else if (erstesUeberfaellig) {
    const t = erstesUeberfaellig.fields.titel ?? '';
    const w = erstesUeberfaellig.fields.verantwortlicher ?? tx('niemandem zugewiesen');
    kontext = tx`Überfällig ist die Aufgabe „${t}“ (${w}).`;
  } else if (erstesNeu) {
    const nr = erstesNeu.fields.anfragenummer ?? '';
    const k = erstesNeu.kundeName;
    kontext = tx`Neu eingegangen: ${nr} von ${k} wartet auf Übernahme.`;
  } else if (anfragen.length > 0) {
    const k = anfragen[0].kundeName;
    kontext = tx`Keine kritischen Punkte — zuletzt bearbeitet: Anfrage von ${k}.`;
  } else {
    kontext = tx`Noch keine Kundenanfrage erfasst — starte mit der ersten.`;
  }

  const heroNext = erstesKritisch ? punktNext(erstesKritisch) : undefined;

  const heroEl = erstesKritisch
    ? (
      <HeroBanner
        icon={<IconAlertTriangle size={18} />}
        action={{
          label: heroNext?.label ?? tx('Öffnen'),
          onClick: () => (heroNext ? heroNext.run() : crud.offenePunkte.openDetail(erstesKritisch)),
        }}
      >
        <b>{erstesKritisch.fields.kurztitel}</b>
        {' — '}
        {erstesKritisch.anfrageName}
        {erstesKritisch.fields.faellig_am ? ` · ${tx('fällig')} ${formatDate(erstesKritisch.fields.faellig_am)}` : ''}
        {kritische.length > 1 ? ` · +${kritische.length - 1}` : ''}
      </HeroBanner>
    )
    : anfragen.length === 0
      ? (
        <HeroBanner
          icon={<IconInbox size={48} />}
          action={{ label: tx('Erste Anfrage erfassen'), onClick: () => crud.kundenanfragen.openCreate({ status: 'neu', eingangsdatum: todayKey }) }}
        >
          {tx('Hier laufen Anfragen, offene Punkte und Entscheidungen zusammen.')}
        </HeroBanner>
      )
      : undefined;

  // ---------- Arbeitslisten ----------
  const secondWord = (word: string, cls: string, rest?: string) => (
    <>
      <span className={`font-medium ${cls}`}>{word}</span>
      {rest ? <span className="text-muted-foreground"> · {rest}</span> : null}
    </>
  );

  const listAufgaben = (
    <WorkList
      title={tx('Überfällige Aufgaben')}
      icon={<IconClock size={16} />}
      items={ueberfaelligeAufgaben.map(a => {
        const k = lookupKey(a.fields.status) ?? 'offen';
        return {
          id: a.record_id,
          title: a.fields.titel ?? tx('Ohne Titel'),
          secondLine: secondWord(
            tx('Überfällig'),
            'text-destructive',
            `${formatDate(a.fields.faellig_am)} · ${a.fields.verantwortlicher ?? tx('Nicht zugewiesen')}`,
          ),
          action: k === 'offen'
            ? { label: tx('Starten'), onClick: () => void writeAufgabeStatus(a, 'in_bearbeitung') }
            : { label: tx('Erledigt'), onClick: () => void writeAufgabeStatus(a, 'erledigt') },
        };
      })}
      onItemClick={id => { const r = data.aufgaben.find(x => x.record_id === id); if (r) crud.aufgaben.openDetail(r); }}
      empty={{ text: tx('Alle Aufgaben im Zeitplan.'), action: crud.aufgaben.canWrite ? { label: tx('Neue Aufgabe'), onClick: () => crud.aufgaben.openCreate({ status: 'offen' }) } : undefined }}
    />
  );

  const listAnfragen = (
    <WorkList
      title={tx('Neue Anfragen')}
      icon={<IconInbox size={16} />}
      items={neueAnfragen.map(a => ({
        id: a.record_id,
        title: `${a.fields.anfragenummer ?? ''} ${a.kundeName}`.trim(),
        secondLine: secondWord(tx('Neu'), 'text-primary', `${formatDate(a.fields.eingangsdatum)}${a.fields.prioritaet ? ` · ${a.fields.prioritaet.label}` : ''}`),
        action: a.fields.verantwortlicher
          ? { label: tx('Übernehmen'), onClick: () => void takeOverAnfrage(a) }
          : { label: tx('Zuweisen'), onClick: () => crud.kundenanfragen.openEdit(a) },
      }))}
      onItemClick={id => { const r = data.kundenanfragen.find(x => x.record_id === id); if (r) crud.kundenanfragen.openDetail(r); }}
      empty={{ text: tx('Keine neuen Anfragen.'), action: crud.kundenanfragen.canWrite ? { label: tx('Anfrage erfassen'), onClick: () => crud.kundenanfragen.openCreate({ status: 'neu', eingangsdatum: todayKey }) } : undefined }}
    />
  );

  const listAntworten = (
    <WorkList
      title={tx('Kundenantworten ausstehend')}
      icon={<IconMessageQuestion size={16} />}
      items={ausstehendeAntworten.map(k => {
        const late = isOverdue(k.fields.antwort_erwartet_bis);
        return {
          id: k.record_id,
          title: k.fields.betreff ?? tx('Ohne Betreff'),
          secondLine: late
            ? secondWord(tx('Antwort überfällig'), 'text-destructive', `${k.fields.empfaenger ?? ''} · ${formatDate(k.fields.antwort_erwartet_bis)}`)
            : secondWord(tx('Wartet'), 'text-amber-600', `${k.fields.empfaenger ?? ''}${k.fields.antwort_erwartet_bis ? ` · ${formatDate(k.fields.antwort_erwartet_bis)}` : ''}`),
          action: { label: tx('Antwort zuordnen'), onClick: () => crud.rueckfragenUndKommunikation.openEdit(k) },
        };
      })}
      onItemClick={id => { const r = data.rueckfragenUndKommunikation.find(x => x.record_id === id); if (r) crud.rueckfragenUndKommunikation.openDetail(r); }}
      empty={{ text: tx('Keine offenen Rückfragen beim Kunden.') }}
    />
  );

  const listEntscheidungen = (
    <WorkList
      title={tx('Offene Entscheidungen')}
      icon={<IconGavel size={16} />}
      items={offeneEntscheidungen.map(e => ({
        id: e.record_id,
        title: e.fields.titel ?? tx('Ohne Titel'),
        secondLine: secondWord(
          e.fields.entscheidungsstatus?.label ?? tx('Vorbereitung'),
          'text-amber-600',
          `${e.anfrageName} · ${e.fields.entscheidungsverantwortlicher ?? tx('Kein Verantwortlicher')}`,
        ),
        action: { label: tx('Prüfen'), onClick: () => crud.entscheidungen.openEdit(e) },
      }))}
      onItemClick={id => { const r = data.entscheidungen.find(x => x.record_id === id); if (r) crud.entscheidungen.openDetail(r); }}
      empty={{ text: tx('Keine Entscheidung ausstehend.') }}
    />
  );

  const listFreigabe = (
    <WorkList
      title={tx('Zur Freigabe vorbereitet')}
      icon={<IconRosetteDiscountCheck size={16} />}
      items={freigabeBereit.map(a => ({
        id: a.record_id,
        title: a.anfrageName,
        secondLine: secondWord(
          tx('Freigabe durch eine Person nötig'),
          'text-primary',
          a.fields.uebergabeempfaenger ?? tx('Kein Empfänger'),
        ),
        action: { label: tx('Prüfen'), onClick: () => crud.abschlussUndUebergabe.openEdit(a) },
      }))}
      onItemClick={id => { const r = data.abschlussUndUebergabe.find(x => x.record_id === id); if (r) crud.abschlussUndUebergabe.openDetail(r); }}
      empty={{ text: tx('Kein Abschluss wartet auf Freigabe.') }}
    />
  );

  const toggle = (f: typeof filter) => setFilter(cur => (cur === f ? 'all' : f));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">{gruss(clock)}</h1>
          <p className="text-sm text-muted-foreground">{kontext}</p>
        </div>
        {crud.kundenanfragen.canWrite && (
          <Button onClick={() => crud.kundenanfragen.openCreate({ status: 'neu', eingangsdatum: todayKey })}>
            <IconPlus size={16} className="shrink-0" />
            <span>{tx('Neue Anfrage')}</span>
          </Button>
        )}
      </div>

      <DashboardGrid
        variant="wide"
        hero={heroEl}
        kpis={
          <StatStrip>
            <StatStripItem
              title={tx('Überfällige Punkte')}
              value={ueberfaelligePunkte.length}
              icon={<IconClock size={16} className="text-muted-foreground" />}
              tone={ueberfaelligePunkte.length > 0 ? 'warning' : 'default'}
              onClick={() => toggle('overdue')}
              active={filter === 'overdue'}
            />
            <StatStripItem
              title={tx('Ohne Verantwortlichen')}
              value={ohneVerantwortlichen.length}
              icon={<IconUserOff size={16} className="text-muted-foreground" />}
              tone={ohneVerantwortlichen.length > 0 ? 'warning' : 'default'}
              onClick={() => toggle('unassigned')}
              active={filter === 'unassigned'}
            />
            <StatStripItem
              title={tx('Erneute Prüfung')}
              value={erneutePruefung.length}
              icon={<IconRefresh size={16} className="text-muted-foreground" />}
              onClick={() => toggle('recheck')}
              active={filter === 'recheck'}
            />
          </StatStrip>
        }
        primary={
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <IconChecklist size={16} className="shrink-0 text-muted-foreground" />
                <span>{tx('Klärungsboard')}</span>
              </div>
              <Select value={person} onValueChange={setPerson}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder={tx('Verantwortlicher')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tx('Alle Verantwortlichen')}</SelectItem>
                  {personen.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <KanbanWidget
              cards={cards}
              columns={columns}
              defaultCollapsed={['erledigt', 'entschieden_akzeptiert', 'nicht_mehr_relevant']}
              onCardClick={card => {
                const rec = data.offenePunkte.find(p => p.record_id === card.id.split(':')[1]);
                if (rec) crud.offenePunkte.openDetail(rec);
              }}
              onCardMove={moveCard}
              onAddCard={crud.offenePunkte.canWrite ? (column => crud.offenePunkte.openCreate({ status: column })) : undefined}
            />
          </div>
        }
        aside={
          <>
            {listAnfragen}
            {listAufgaben}
            {listAntworten}
            {listEntscheidungen}
            {listFreigabe}
          </>
        }
      />
      {crud.surfaces}
    </div>
  );
}
