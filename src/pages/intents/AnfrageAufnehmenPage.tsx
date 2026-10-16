/**
 * Anfrage aufnehmen — 4-Schritt-Wizard.
 * Steps: 1) Kunden wählen → 2) Anfrage und Kundenanforderungen erfassen → 3) Priorität, Verantwortlicher, Zieltermin
 *        → 4) Erste Informationsquelle (optional) → Prüfen & anlegen.
 * Reads: kunden. Writes: kundenanfragen, informationsquellen (optional, verknüpft).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText } from '@/lib/journey';
import { useAnfrageAufnehmenFlow } from '@/lib/journey/flows/AnfrageAufnehmen';
import { tx } from '@/i18n';

export default function AnfrageAufnehmenPage() {
  const [step, setStep] = useState(1);
  const flow = useAnfrageAufnehmenFlow({
    steps: {
      kunde: 1,
      eingangskanal: 2, kundenreferenz: 2, produktfamilie: 2, produktvariante: 2, gewuenschte_menge: 2,
      gewuenschter_liefertermin: 2, anfragebeschreibung: 2, urspruengliche_kundenanforderungen: 2,
      prioritaet: 3, verantwortlicher: 3, zieltermin_klaerung: 3,
      quellentyp: 4, titel: 4, referenz: 4, absender_urheber: 4, quellendatum: 4,
    },
    items: {
      kunde: k => ({
        id: k.id,
        title: fieldText(k, 'firmenname'),
        subtitle: [fieldText(k, 'ansprechpartner_nachname'), fieldText(k, 'ort')].filter(Boolean).join(' · '),
      }),
    },
  });
  const anfrage = flow.forms.kundenanfragen;
  const quelle = flow.forms.informationsquellen;

  return (
    <IntentWizardShell
      title={tx('Anfrage aufnehmen')}
      currentStep={step}
      onStepChange={setStep}
      forms={flow.formList}
      draftKey={flow.draftKey}
      intro={{
        description: tx('Eine neue Kundenanfrage mit ihrer ersten Quelle erfassen.'),
        needs: [tx('Name des Kunden'), tx('Beschreibung der Anfrage'), tx('Ursprüngliche Kundenanforderungen')],
      }}
    >
      <WizardStep label={tx('Kunde')} description={tx('Von welchem Kunden kommt die Anfrage?')}>
        <EntitySelectStep {...flow.picks.kunde.select} {...flow.pick('kunde')} searchPlaceholder={tx('Firma, Ansprechpartner oder Ort …')} />
      </WizardStep>

      <WizardStep label={tx('Anfrage')} description={tx('Was wird angefragt? Halte die Anforderungen so fest, wie der Kunde sie genannt hat.')} needs={['kunde']}>
        <div className="space-y-4">
          <Bound form={anfrage} name="anfragebeschreibung" rows={4} />
          <Bound form={anfrage} name="urspruengliche_kundenanforderungen" rows={4} />
          <Bound form={anfrage} name="eingangskanal" />
          <Bound form={anfrage} name="kundenreferenz" />
          <Bound form={anfrage} name="produktfamilie" />
          <Bound form={anfrage} name="produktvariante" />
          <Bound form={anfrage} name="gewuenschte_menge" />
          <Bound form={anfrage} name="gewuenschter_liefertermin" />
          <StepNav
            onBack={() => setStep(1)}
            onNext={() => flow.validateStep(2)}
            nextStepLabel={tx('Priorität und Verantwortlicher')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Zuständigkeit')} description={tx('Wie dringlich ist die Anfrage, wer kümmert sich und bis wann soll sie geklärt sein?')} needs={['kunde']}>
        <div className="space-y-4">
          <Bound form={anfrage} name="prioritaet" />
          <Bound form={anfrage} name="verantwortlicher" />
          <Bound form={anfrage} name="zieltermin_klaerung" />
          <StepNav
            onBack={() => setStep(2)}
            onNext={() => flow.validateStep(3)}
            nextStepLabel={tx('Erste Quelle')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Erste Quelle')} description={tx('Optional: Welche Unterlage oder Nachricht liegt der Anfrage zugrunde?')} needs={['kunde']}>
        <div className="space-y-4">
          <Bound form={quelle} name="quellentyp" />
          <Bound form={quelle} name="titel" />
          <Bound form={quelle} name="referenz" />
          <Bound form={quelle} name="absender_urheber" />
          <Bound form={quelle} name="quellendatum" />
          <StepNav
            onBack={() => setStep(3)}
            onNext={() => flow.validateStep(4)}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList}
            submit={flow.submit}
            items={[
              { key: 'status', label: tx('Status'), value: tx('Neu') },
              { key: 'vollstaendigkeit', label: tx('Vollständigkeit'), value: tx('Ungeprüft') },
            ]}
            whatHappensNext={tx('Die Anfrage wird mit Eingangsdatum heute angelegt; eine angegebene Quelle wird ihr zugeordnet.')}
          />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep
          result={flow.submit.result}
          forms={flow.formList}
          submit={flow.submit}
          next={[
            { label: tx('Anforderung erfassen'), href: '#/intents/anforderung-erfassen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
          whatHappensNext={tx('Als Nächstes die technischen Anforderungen aus der Anfrage herausarbeiten.')}
        />
      )}
    </IntentWizardShell>
  );
}
