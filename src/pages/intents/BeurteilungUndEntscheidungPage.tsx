/**
 * Beurteilung und Entscheidung dokumentieren — 7-Schritt-Wizard.
 * Steps: 1) Anfrage wählen → 2) Anforderungen wählen → 3) Offene Punkte wählen → 4) Quellen wählen
 *        → 5) Beurteilung erfassen → 6) Entscheidung vorbereiten (optional) → 7) Prüfen & anlegen.
 * Reads: kundenanfragen, technische_anforderungen, offene_punkte, informationsquellen.
 * Writes: beurteilungen (Entwurf), optional entscheidungen (verknüpft mit der Beurteilung) — via useBeurteilungUndEntscheidungFlow.
 * Composes: IntentWizardShell, EntitySelectStep, Bound, Field, StepNav, SummaryStep, SuccessStep.
 */
import { useEffect, useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { Field } from '@/components/blocks/Field';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText, fieldLookup, isEmptyValue } from '@/lib/journey';
import { useBeurteilungUndEntscheidungFlow } from '@/lib/journey/flows/BeurteilungUndEntscheidung';
import { tx } from '@/i18n';

const DECISION_FIELDS = ['titel', 'entscheidungsgegenstand', 'entscheidungstyp', 'entscheidung', 'begruendung', 'entscheidungsverantwortlicher', 'auflagen'] as const;
const SYNCED_MULTI = ['betroffene_anforderungen', 'betroffene_offene_punkte'] as const;

const idsOf = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);

export default function BeurteilungUndEntscheidungPage() {
  const [step, setStep] = useState(1);
  const flow = useBeurteilungUndEntscheidungFlow({
    steps: {
      anfrage: 1, betroffene_anforderungen: 2, betroffene_offene_punkte: 3, grundlage_quellen: 4,
      beurteilungsgegenstand: 5, beurteilungsart: 5, einschaetzung: 5, fachliche_begruendung: 5, annahmen: 5,
      unsicherheiten: 5, alternativen: 5, empfehlung: 5, erstellt_von: 5, ki_vorschlag: 5,
      titel: 6, entscheidungsgegenstand: 6, entscheidungstyp: 6, entscheidung: 6, begruendung: 6,
      entscheidungsverantwortlicher: 6, auflagen: 6,
    },
    items: {
      anfrage: r => ({ id: r.id, title: fieldText(r, 'anfragenummer') || tx('Anfrage ohne Nummer'), subtitle: fieldText(r, 'produktfamilie'), status: fieldLookup(r, 'status') ?? undefined }),
      betroffene_anforderungen: r => ({ id: r.id, title: fieldText(r, 'bezeichnung'), subtitle: fieldText(r, 'sollwert'), status: fieldLookup(r, 'pruefstatus') ?? undefined }),
      betroffene_offene_punkte: r => ({ id: r.id, title: fieldText(r, 'kurztitel'), subtitle: fieldLookup(r, 'prioritaet')?.label, status: fieldLookup(r, 'status') ?? undefined }),
      grundlage_quellen: r => ({ id: r.id, title: fieldText(r, 'titel'), subtitle: fieldLookup(r, 'quellentyp')?.label, status: fieldLookup(r, 'quellenstatus') ?? undefined }),
    },
  });
  const b = flow.forms.beurteilungen;
  const e = flow.forms.entscheidungen;

  const decisionStarted = DECISION_FIELDS.some(k => !isEmptyValue(e.get(k)));
  const anfrageId = typeof b.get('anfrage') === 'string' ? (b.get('anfrage') as string) : '';
  const anfrageLabel = anfrageId ? flow.picks.anfrage.labelOf(anfrageId) : undefined;
  const anforderungenKey = idsOf(b.get('betroffene_anforderungen')).join(',');
  const punkteKey = idsOf(b.get('betroffene_offene_punkte')).join(',');
  const eAnfrage = typeof e.get('anfrage') === 'string' ? (e.get('anfrage') as string) : '';
  const eAnforderungenKey = idsOf(e.get('betroffene_anforderungen')).join(',');
  const ePunkteKey = idsOf(e.get('betroffene_offene_punkte')).join(',');

  // The decision form shares anfrage + affected records with the assessment: copy them over once the
  // person starts a decision, and clear them again when no decision is written (nothing half-filled).
  useEffect(() => {
    const setE = e.set as (k: string, v: unknown, l?: string) => void;
    const wantAnfrage = decisionStarted ? anfrageId : '';
    const wantAnf = decisionStarted ? anforderungenKey : '';
    const wantPunkte = decisionStarted ? punkteKey : '';
    if (eAnfrage !== wantAnfrage) setE('anfrage', wantAnfrage, wantAnfrage ? anfrageLabel : undefined);
    if (eAnforderungenKey !== wantAnf) setE('betroffene_anforderungen', wantAnf ? wantAnf.split(',') : []);
    if (ePunkteKey !== wantPunkte) setE('betroffene_offene_punkte', wantPunkte ? wantPunkte.split(',') : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decisionStarted, anfrageId, anforderungenKey, punkteKey, eAnfrage, eAnforderungenKey, ePunkteKey]);

  void SYNCED_MULTI;

  return (
    <IntentWizardShell
      title={tx('Beurteilung und Entscheidung dokumentieren')}
      currentStep={step} onStepChange={setStep}
      forms={flow.formList} draftKey={flow.draftKey}
      intro={{
        description: tx('Eine fachliche Beurteilung als Entwurf festhalten und eine Entscheidung vorbereiten.'),
        needs: [tx('Die betroffene Anfrage'), tx('Fachliche Begründung'), tx('Optional: Entscheidungsverantwortlicher')],
      }}
    >
      <WizardStep label={tx('Anfrage')} description={tx('Zu welcher Kundenanfrage gehört die Beurteilung?')}>
        <EntitySelectStep {...flow.picks.anfrage.select} {...flow.pick('anfrage')} searchPlaceholder={tx('Anfragenummer suchen …')} />
      </WizardStep>

      <WizardStep label={tx('Anforderungen')} description={tx('Welche technischen Anforderungen sind betroffen? Mehrfachauswahl möglich.')}>
        <Field form={b} name="betroffene_anforderungen">
          <EntitySelectStep {...flow.picks.betroffene_anforderungen.select} {...flow.pickMany('betroffene_anforderungen')} searchPlaceholder={tx('Bezeichnung oder Sollwert …')} />
        </Field>
        <StepNav onBack={() => setStep(1)} onNext={() => flow.validateStep(2)} nextStepLabel={tx('Offene Punkte')} />
      </WizardStep>

      <WizardStep label={tx('Offene Punkte')} description={tx('Welche offenen Punkte berührt die Beurteilung?')}>
        <Field form={b} name="betroffene_offene_punkte">
          <EntitySelectStep {...flow.picks.betroffene_offene_punkte.select} {...flow.pickMany('betroffene_offene_punkte')} searchPlaceholder={tx('Kurztitel suchen …')} />
        </Field>
        <StepNav onBack={() => setStep(2)} onNext={() => flow.validateStep(3)} nextStepLabel={tx('Quellen')} />
      </WizardStep>

      <WizardStep label={tx('Quellen')} description={tx('Auf welchen Informationsquellen beruht die Beurteilung?')}>
        <Field form={b} name="grundlage_quellen">
          <EntitySelectStep {...flow.picks.grundlage_quellen.select} {...flow.pickMany('grundlage_quellen')} searchPlaceholder={tx('Titel der Quelle …')} />
        </Field>
        <StepNav onBack={() => setStep(3)} onNext={() => flow.validateStep(4)} nextStepLabel={tx('Beurteilung')} />
      </WizardStep>

      <WizardStep label={tx('Beurteilung')} description={tx('Einschätzung mit fachlicher Begründung festhalten — sie bleibt ein Entwurf.')}>
        <div className="space-y-4">
          <Bound form={b} name="beurteilungsgegenstand" />
          <Bound form={b} name="beurteilungsart" />
          <Bound form={b} name="einschaetzung" />
          <Bound form={b} name="fachliche_begruendung" rows={4} />
          <Bound form={b} name="annahmen" rows={2} />
          <Bound form={b} name="unsicherheiten" rows={2} />
          <Bound form={b} name="alternativen" rows={2} />
          <Bound form={b} name="empfehlung" rows={2} />
          <Bound form={b} name="erstellt_von" />
          <Bound form={b} name="ki_vorschlag" />
          <StepNav onBack={() => setStep(4)} onNext={() => flow.validateStep(5)} nextStepLabel={tx('Entscheidung')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Entscheidung')} description={tx('Optional: eine Entscheidung vorbereiten. Entscheiden muss am Ende eine Person.')}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {tx('Lass alle Felder leer, wenn jetzt keine Entscheidung vorbereitet werden soll.')}
          </p>
          <Bound form={e} name="titel" />
          <Bound form={e} name="entscheidungsgegenstand" rows={3} />
          <Bound form={e} name="entscheidungstyp" />
          <Bound form={e} name="entscheidung" rows={3} />
          <Bound form={e} name="begruendung" rows={3} />
          <Bound form={e} name="entscheidungsverantwortlicher" />
          <Bound form={e} name="auflagen" rows={2} />
          <StepNav
            onBack={() => setStep(5)}
            onNext={() => (decisionStarted ? flow.validateStep(6) : true)}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList}
            submit={flow.submit}
            whatHappensNext={tx('Die Beurteilung wird als Entwurf angelegt. Eine Entscheidung entsteht nur, wenn du sie ausgefüllt hast — sie wird mit der Beurteilung verknüpft.')}
          />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep
          result={flow.submit.result}
          forms={flow.formList}
          submit={flow.submit}
          whatHappensNext={tx('Die Beurteilung wartet auf fachliche Prüfung. Sind alle Punkte geklärt, kannst du die Klärung abschließen.')}
          next={[
            { label: tx('Klärung abschließen'), href: '#/intents/klaerung-abschliessen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
        />
      )}
    </IntentWizardShell>
  );
}
