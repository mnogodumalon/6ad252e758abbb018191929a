/**
 * Offenen Punkt mit Aufgabe anlegen — 5-Schritt-Wizard.
 * Steps: 1) Anfrage wählen → 2) Betroffene Anforderungen und Quellen wählen → 3) Punkt erfassen
 *        → 4) Optional Aufgabe dazu anlegen → 5) Prüfen & anlegen.
 * Reads: kundenanfragen, technische_anforderungen, informationsquellen. Writes: offene_punkte, aufgaben (optional).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, Field, StepNav, SummaryStep, SuccessStep.
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
import { useOffenenPunktAnlegenFlow } from '@/lib/journey/flows/OffenenPunktAnlegen';
import { tx } from '@/i18n';

export default function OffenenPunktAnlegenPage() {
  const [step, setStep] = useState(1);
  const flow = useOffenenPunktAnlegenFlow({
    steps: {
      anfrage: 1,
      betroffene_anforderungen: 2, betroffene_quellen: 2,
      kurztitel: 3, beschreibung: 3, punktetyp: 3, prioritaet: 3, auswirkung: 3,
      zustaendige_rolle: 3, verantwortlicher: 3, faellig_am: 3, erledigungskriterium: 3,
      titel: 4, aufgabentyp: 4,
    },
    items: {
      anfrage: r => ({ id: r.id, title: fieldText(r, 'anfragenummer') || tx('Anfrage ohne Nummer'), subtitle: fieldText(r, 'produktfamilie') }),
      betroffene_anforderungen: r => ({
        id: r.id, title: fieldText(r, 'bezeichnung'),
        subtitle: [fieldLookup(r, 'anforderungstyp')?.label, fieldLookup(r, 'pruefstatus')?.label].filter(Boolean).join(' · '),
      }),
      betroffene_quellen: r => ({
        id: r.id, title: fieldText(r, 'titel'),
        subtitle: [fieldLookup(r, 'quellentyp')?.label, fieldLookup(r, 'quellenstatus')?.label].filter(Boolean).join(' · '),
      }),
    },
  });
  const punkt = flow.forms.offene_punkte;
  const aufgabe = flow.forms.aufgaben;

  return (
    <IntentWizardShell
      title={tx('Offenen Punkt mit Aufgabe anlegen')}
      currentStep={step} onStepChange={setStep}
      forms={flow.formList} draftKey={flow.draftKey}
      intro={{
        description: tx('Klärungsbedarf erfassen, Anforderungen und Quellen verknüpfen, Aufgabe zuweisen.'),
        needs: [tx('Die betroffene Kundenanfrage'), tx('Kurztitel und Grund des offenen Punkts'), tx('Name des Verantwortlichen')],
      }}
    >
      <WizardStep label={tx('Anfrage')} description={tx('Zu welcher Kundenanfrage gehört der offene Punkt?')}>
        <EntitySelectStep {...flow.picks.anfrage.select} {...flow.pick('anfrage')} searchPlaceholder={tx('Anfragenummer suchen …')} />
      </WizardStep>

      <WizardStep label={tx('Betroffenes')}
        description={tx('Welche Anforderungen und Quellen sind betroffen? Beides ist optional.')}>
        <div className="space-y-6">
          <Field form={punkt} name="betroffene_anforderungen">
            <EntitySelectStep {...flow.picks.betroffene_anforderungen.select} {...flow.pickMany('betroffene_anforderungen')} />
          </Field>
          <Field form={punkt} name="betroffene_quellen">
            <EntitySelectStep {...flow.picks.betroffene_quellen.select} {...flow.pickMany('betroffene_quellen')} />
          </Field>
          <StepNav onBack={() => setStep(1)} onNext={() => true} nextStepLabel={tx('Punkt erfassen')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Punkt')}
        description={tx('Was ist offen, warum, und wer kümmert sich darum?')}>
        <div className="space-y-4">
          <Bound form={punkt} name="kurztitel" />
          <Bound form={punkt} name="beschreibung" rows={3} />
          <Bound form={punkt} name="punktetyp" />
          <Bound form={punkt} name="prioritaet" />
          <Bound form={punkt} name="auswirkung" />
          <Bound form={punkt} name="zustaendige_rolle" />
          <Bound form={punkt} name="verantwortlicher" />
          <Bound form={punkt} name="faellig_am" />
          <Bound form={punkt} name="erledigungskriterium" rows={2} />
          <StepNav
            onBack={() => setStep(2)}
            onNext={() => punkt.validate(['kurztitel', 'beschreibung', 'verantwortlicher'])}
            nextStepLabel={tx('Aufgabe')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Aufgabe')}
        description={tx('Optional: gleich eine Aufgabe zum offenen Punkt anlegen. Ohne Titel entfällt sie.')}>
        <div className="space-y-4">
          <Bound form={aufgabe} name="titel" />
          <Bound form={aufgabe} name="beschreibung" rows={3} />
          <Bound form={aufgabe} name="aufgabentyp" />
          <Bound form={aufgabe} name="verantwortlicher" />
          <Bound form={aufgabe} name="prioritaet" />
          <Bound form={aufgabe} name="faellig_am" />
          <StepNav
            onBack={() => setStep(3)}
            onNext={() => {
              if (!String(aufgabe.get('titel') ?? '').trim()) return true;
              const anfrageId = punkt.get('anfrage');
              if (typeof anfrageId === 'string' && anfrageId) aufgabe.set('anfrage', anfrageId, flow.picks.anfrage.labelOf(anfrageId));
              return aufgabe.validate(['anfrage', 'titel', 'verantwortlicher']);
            }}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep forms={flow.formList} submit={flow.submit}
            items={[{ key: 'status_punkt', label: tx('Status des Punkts'), value: tx('Zugewiesen') }]}
            whatHappensNext={tx('Der offene Punkt erscheint sofort bei der Anfrage; eine Aufgabe wird mit ihm verknüpft.')} />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep result={flow.submit.result} forms={flow.formList} submit={flow.submit}
          next={[
            { label: tx('Rückfrage vorbereiten'), href: '#/intents/rueckfrage-vorbereiten' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
          whatHappensNext={tx('Zu diesem Punkt kannst du jetzt eine Rückfrage vorbereiten.')} />
      )}
    </IntentWizardShell>
  );
}
