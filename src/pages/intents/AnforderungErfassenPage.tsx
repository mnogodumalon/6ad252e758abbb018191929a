/**
 * Anforderung erfassen — 4-Schritt-Wizard.
 * Steps: 1) Anfrage wählen → 2) Quellen wählen → 3) Bezeichnung, Typ, Sollwert und Herkunft erfassen → 4) Prüfen & anlegen
 * (die gewählte Anfrage wird dabei auf „In Prüfung“ gesetzt).
 * Reads: kundenanfragen, informationsquellen. Writes: technische_anforderungen (create), kundenanfragen (update status).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { Field } from '@/components/blocks/Field';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText, fieldLookup } from '@/lib/journey';
import { useAnforderungErfassenFlow } from '@/lib/journey/flows/AnforderungErfassen';
import { tx } from '@/i18n';

export default function AnforderungErfassenPage() {
  const [step, setStep] = useState(1);
  const flow = useAnforderungErfassenFlow({
    steps: {
      kundenanfragen: 1, anfrage: 1, quellen: 2,
      bezeichnung: 3, beschreibung: 3, anforderungstyp: 3, ursprung: 3, sollwert: 3, einheit: 3,
      vergleichsoperator: 3, min_wert: 3, max_wert: 3, ist_pflichtanforderung: 3, verantwortlicher: 3,
    },
    items: {
      anfrage: (r, ctx) => ({ id: r.id, title: fieldText(r, 'anfragenummer'), subtitle: ctx.ref('kunde'), status: fieldLookup(r, 'status') ?? undefined }),
      kundenanfragen: (r, ctx) => ({ id: r.id, title: fieldText(r, 'anfragenummer'), subtitle: ctx.ref('kunde'), status: fieldLookup(r, 'status') ?? undefined }),
      quellen: r => ({ id: r.id, title: fieldText(r, 'titel'), subtitle: fieldLookup(r, 'quellentyp')?.label, status: fieldLookup(r, 'quellenstatus') ?? undefined }),
    },
  });
  const f = flow.forms.technische_anforderungen;
  const target = flow.pick('kundenanfragen');
  const anfrage = flow.pick('anfrage');

  return (
    <IntentWizardShell
      title={tx('Anforderung erfassen')}
      currentStep={step} onStepChange={setStep}
      forms={flow.formList} draftKey={flow.draftKey}
      intro={{
        description: tx('Eine technische Anforderung zu einer Anfrage festhalten und die Anfrage in Prüfung setzen.'),
        needs: [tx('Anfragenummer'), tx('Bezeichnung und Beschreibung der Anforderung')],
      }}
    >
      <WizardStep label={tx('Anfrage')} description={tx('Zu welcher Kundenanfrage gehört die Anforderung?')}>
        <EntitySelectStep {...flow.picks.anfrage.select}
          selectedId={target.selectedId}
          onSelect={id => { target.onSelect(id); anfrage.onSelect(id); }}
          searchPlaceholder={tx('Anfragenummer suchen …')} />
      </WizardStep>

      <WizardStep label={tx('Quellen')} description={tx('Aus welchen Quellen stammt die Anforderung? Du kannst mehrere wählen.')} needs={['anfrage']}>
        <Field form={f} name="quellen">
          <EntitySelectStep {...flow.picks.quellen.select} {...flow.pickMany('quellen')}
            searchPlaceholder={tx('Quelle suchen …')} />
        </Field>
        <StepNav onBack={() => setStep(1)} onNext={() => flow.validateStep(2)} nextStepLabel={tx('Anforderung beschreiben')} />
      </WizardStep>

      <WizardStep label={tx('Anforderung')} description={tx('Beschreibe die Anforderung, ihren Sollwert und woher sie stammt.')} needs={['anfrage']}>
        <div className="space-y-4">
          <Bound form={f} name="bezeichnung" />
          <Bound form={f} name="beschreibung" rows={3} />
          <Bound form={f} name="anforderungstyp" />
          <Bound form={f} name="ursprung" />
          <Bound form={f} name="sollwert" />
          <Bound form={f} name="einheit" />
          <Bound form={f} name="vergleichsoperator" />
          <Bound form={f} name="min_wert" />
          <Bound form={f} name="max_wert" />
          <Bound form={f} name="ist_pflichtanforderung" />
          <Bound form={f} name="verantwortlicher" />
          <StepNav onBack={() => setStep(2)} onNext={() => flow.validateStep(3)} nextStepLabel={tx('Prüfen')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep forms={flow.formList} submit={flow.submit}
            whatHappensNext={tx('Die Anforderung wird als „ungeprüft“ angelegt und die Anfrage auf „In Prüfung“ gesetzt.')} />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep result={flow.submit.result} forms={flow.formList} submit={flow.submit}
          next={[
            { label: tx('Offenen Punkt anlegen'), href: '#/intents/offenen-punkt-anlegen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
          whatHappensNext={tx('Offene Fragen zur Anforderung hältst du als offenen Punkt fest.')} />
      )}
    </IntentWizardShell>
  );
}
