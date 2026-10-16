/**
 * Klärung abschließen und übergeben — 4-Schritt-Wizard.
 * Steps: 1) Anfrage wählen → 2) Kritische offene Punkte und Entscheidungen kontrollieren
 *        → 3) Abweichungen, Risiken, Restpunkte, Zusammenfassung und Übergabeempfänger → 4) Prüfen & auf Technisch geklärt setzen.
 * Reads: kundenanfragen, offene_punkte (Zähler), entscheidungen (Zähler), abschluss_und_uebergabe (Zähler).
 * Writes: abschluss_und_uebergabe (create), kundenanfragen (update Status) — via useKlaerungAbschliessenFlow.
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { useRecordCount, refFilter, combineFilters, fieldText, fieldLookup, fieldRef } from '@/lib/journey';
import { useKlaerungAbschliessenFlow } from '@/lib/journey/flows/KlaerungAbschliessen';
import { tx } from '@/i18n';

const OPEN_STATES = ['neu', 'zugewiesen', 'in_bearbeitung', 'wartet_auf_kunde', 'wartet_intern', 'zur_entscheidung'];

export default function KlaerungAbschliessenPage() {
  const [step, setStep] = useState(1);
  const flow = useKlaerungAbschliessenFlow({
    steps: {
      kundenanfragen: 1, anfrage: 1,
      geprueft_von: 2, anforderungen_geprueft: 2, kritische_punkte_geklaert: 2, entscheidungen_vorhanden: 2, freigaben_vorhanden: 2,
      verbleibende_abweichungen: 3, verbleibende_risiken: 3, offene_restpunkte: 3, uebergabeempfaenger: 3, zusammenfassung: 3,
    },
    items: {
      kundenanfragen: r => ({
        id: r.id,
        title: fieldText(r, 'anfragenummer') || tx('Anfrage ohne Nummer'),
        subtitle: fieldText(r, 'produktfamilie'),
        status: fieldLookup(r, 'status') ?? undefined,
      }),
    },
  });

  const abschluss = flow.forms.abschluss_und_uebergabe;
  const anfrageId = flow.targets.kundenanfragen.selectedId;
  const anfrageLabel = anfrageId ? flow.picks.kundenanfragen.labelOf(anfrageId) : undefined;

  // The one pick: the request is both the record the flow changes and the one the Abschluss belongs to.
  const pickAnfrage = (id: string) => {
    flow.targets.kundenanfragen.onSelect(id);
    abschluss.set('anfrage', id, flow.picks.kundenanfragen.labelOf(id));
    setStep(2);
  };

  const critical = useRecordCount(flow.port, 'offene_punkte', {
    filter: anfrageId
      ? combineFilters(refFilter('anfrage', anfrageId), tx('r.v_prioritaet == \'kritisch\''), tx`r.v_status in [${OPEN_STATES.map(s => `'${s}'`).join(', ')}]`)
      : undefined,
    where: r => fieldRef(r, 'anfrage') === anfrageId
      && fieldLookup(r, 'prioritaet')?.key === 'kritisch'
      && OPEN_STATES.includes(fieldLookup(r, 'status')?.key ?? ''),
    enabled: Boolean(anfrageId),
  });
  const decisions = useRecordCount(flow.port, 'entscheidungen', {
    filter: anfrageId ? refFilter('anfrage', anfrageId) : undefined,
    where: r => fieldRef(r, 'anfrage') === anfrageId,
    enabled: Boolean(anfrageId),
  });
  const existing = useRecordCount(flow.port, 'abschluss_und_uebergabe', {
    filter: anfrageId ? refFilter('anfrage', anfrageId) : undefined,
    where: r => fieldRef(r, 'anfrage') === anfrageId,
    enabled: Boolean(anfrageId),
  });

  const checkStep2 = (): boolean | string => {
    if (!flow.validateStep(2)) return false;
    if (critical.count === null || existing.count === null) return tx('Die Kontrolle läuft noch — einen Moment bitte.');
    if (existing.count > 0) return tx('Für diese Anfrage existiert bereits ein Abschluss.');
    if (critical.count > 0) return tx('Es gibt noch kritische offene Punkte, die weder geklärt noch ausdrücklich entschieden sind.');
    return true;
  };

  const criticalOk = critical.count === 0;

  return (
    <IntentWizardShell
      title={tx('Klärung abschließen und übergeben')}
      currentStep={step} onStepChange={setStep}
      forms={flow.formList} draftKey={flow.draftKey}
      intro={{
        description: tx('Voraussetzungen prüfen, Abschluss dokumentieren und die Anfrage als technisch geklärt übergeben.'),
        needs: [tx('Anfragenummer'), tx('Name der prüfenden Person'), tx('Übergabeempfänger')],
      }}
    >
      <WizardStep label={tx('Anfrage')} description={tx('Welche Anfrage ist technisch geklärt?')}>
        <EntitySelectStep
          {...flow.picks.kundenanfragen.select}
          selectedId={anfrageId}
          onSelect={pickAnfrage}
          searchPlaceholder={tx('Anfragenummer suchen …')}
        />
      </WizardStep>

      <WizardStep label={tx('Kontrolle')} description={tx('Kritische Punkte und Entscheidungen prüfen und bestätigen.')} needs={['kundenanfragen']}>
        <div className="space-y-4">
          <div className="rounded-2xl border bg-card p-4 space-y-2 overflow-hidden">
            <p className="text-sm text-muted-foreground min-w-0 truncate">{anfrageLabel}</p>
            {critical.count === null ? (
              <p className="text-sm text-muted-foreground">{tx('Offene Punkte werden geprüft …')}</p>
            ) : criticalOk ? (
              <p className="flex items-center gap-2 text-sm"><IconCircleCheck size={18} className="shrink-0 text-emerald-600" />{tx('Keine kritischen offenen Punkte.')}</p>
            ) : (
              <p className="flex items-center gap-2 text-sm text-destructive"><IconAlertTriangle size={18} className="shrink-0" />{tx`${critical.count} kritische offene Punkte sind weder geklärt noch ausdrücklich entschieden.`}</p>
            )}
            {decisions.count !== null && (
              <p className="text-sm text-muted-foreground">{tx`${decisions.count} Entscheidungen zu dieser Anfrage vorhanden.`}</p>
            )}
            {existing.count !== null && existing.count > 0 && (
              <p className="flex items-center gap-2 text-sm text-destructive"><IconAlertTriangle size={18} className="shrink-0" />{tx('Für diese Anfrage existiert bereits ein Abschluss.')}</p>
            )}
          </div>
          <Bound form={abschluss} name="geprueft_von" />
          <Bound form={abschluss} name="anforderungen_geprueft" />
          <Bound form={abschluss} name="kritische_punkte_geklaert" />
          <Bound form={abschluss} name="entscheidungen_vorhanden" />
          <Bound form={abschluss} name="freigaben_vorhanden" />
          <StepNav onBack={() => setStep(1)} onNext={checkStep2} nextStepLabel={tx('Übergabe')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Übergabe')} description={tx('Verbleibendes festhalten und den Empfänger bestimmen.')} needs={['kundenanfragen']}>
        <div className="space-y-4">
          <Bound form={abschluss} name="verbleibende_abweichungen" rows={3} />
          <Bound form={abschluss} name="verbleibende_risiken" rows={3} />
          <Bound form={abschluss} name="offene_restpunkte" rows={3} />
          <Bound form={abschluss} name="zusammenfassung" rows={4} />
          <Bound form={abschluss} name="uebergabeempfaenger" />
          <StepNav onBack={() => setStep(2)} onNext={() => flow.validateStep(3)} nextStepLabel={tx('Prüfen')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')} description={tx('Alles richtig? Danach gilt die Anfrage als technisch geklärt.')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList} submit={flow.submit}
            whatHappensNext={tx('Der Abschluss wird angelegt und die Anfrage auf „Technisch geklärt“ gesetzt. Eine Freigabe erfolgt nicht automatisch.')}
          />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep
          result={flow.submit.result} forms={flow.formList} submit={flow.submit}
          facts={[
            { label: tx('Übergabestatus'), value: tx('Bereit') },
            { label: tx('Status der Anfrage'), value: tx('Technisch geklärt') },
          ]}
          next={[
            { label: tx('Beurteilung dokumentieren'), href: '#/intents/beurteilung-und-entscheidung' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
          whatHappensNext={tx('Die technische Freigabe bleibt offen und wird separat erteilt.')}
        />
      )}
    </IntentWizardShell>
  );
}
