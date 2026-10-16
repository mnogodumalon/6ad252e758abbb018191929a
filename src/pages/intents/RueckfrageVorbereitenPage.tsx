/**
 * Rückfrage vorbereiten — 6-Schritt-Wizard.
 * Steps: 1) Offenen Punkt wählen (wird auf „Wartet auf Kunde" gesetzt) → 2) Kundenanfrage bestätigen
 * → 3) Hauptsächlich betroffener Punkt → 4) Weitere Punkte → 5) Empfänger, Betreff und Fragen formulieren
 * → 6) Prüfen & Entwurf speichern.
 * Reads: offene_punkte, kundenanfragen. Writes: rueckfragen_und_kommunikation (create), offene_punkte (update status).
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
import { fieldText, fieldLookup, fieldRef } from '@/lib/journey';
import { useRueckfrageVorbereitenFlow } from '@/lib/journey/flows/RueckfrageVorbereiten';
import { tx } from '@/i18n';

export default function RueckfrageVorbereitenPage() {
  const [step, setStep] = useState(1);
  const flow = useRueckfrageVorbereitenFlow({
    steps: { offene_punkte: 1, anfrage: 2, offener_punkt: 3, weitere_offene_punkte: 4, kanal: 5, absender: 5, empfaenger: 5, betreff: 5, inhalt: 5, antwort_erwartet_bis: 5 },
    items: {
      anfrage: r => ({ id: r.id, title: fieldText(r, 'anfragenummer') || tx('Ohne Nummer'), subtitle: fieldText(r, 'produktfamilie') }),
      offene_punkte: r => ({ id: r.id, title: fieldText(r, 'kurztitel'), subtitle: fieldText(r, 'verantwortlicher'), status: fieldLookup(r, 'status') ?? undefined }),
      offener_punkt: r => ({ id: r.id, title: fieldText(r, 'kurztitel'), subtitle: fieldText(r, 'verantwortlicher'), status: fieldLookup(r, 'status') ?? undefined }),
      weitere_offene_punkte: r => ({ id: r.id, title: fieldText(r, 'kurztitel'), subtitle: fieldText(r, 'verantwortlicher'), status: fieldLookup(r, 'status') ?? undefined }),
    },
  });
  const form = flow.forms.rueckfragen_und_kommunikation;
  const target = flow.pick('offene_punkte');

  // Der gewählte Punkt ist zugleich der Hauptbezug der Rückfrage — Anfrage und Hauptpunkt werden vorbelegt.
  const pickPoint = (id: string) => {
    target.onSelect(id);
    form.set('offener_punkt', id, flow.picks.offene_punkte.labelOf(id));
    const rec = flow.picks.offene_punkte.recordOf(id);
    const anfrageId = rec ? fieldRef(rec, 'anfrage') : null;
    if (anfrageId) form.set('anfrage', anfrageId, flow.picks.anfrage.labelOf(anfrageId) ?? '');
    setStep(2);
  };

  return (
    <IntentWizardShell
      title={tx('Rückfrage vorbereiten')}
      currentStep={step} onStepChange={setStep}
      forms={flow.formList} draftKey={flow.draftKey}
      intro={{ description: tx('Gebündelte Rückfrage als Entwurf zu offenen Punkten formulieren.'), needs: [tx('Offener Punkt'), tx('Empfänger und Betreff')] }}
    >
      <WizardStep label={tx('Offener Punkt')} description={tx('Zu welchem offenen Punkt brauchst du Antworten vom Kunden?')}>
        <EntitySelectStep {...flow.picks.offene_punkte.select} selectedId={target.selectedId} onSelect={pickPoint} searchPlaceholder={tx('Titel oder Verantwortlicher …')} />
      </WizardStep>

      <WizardStep label={tx('Kundenanfrage')} description={tx('Zu welcher Kundenanfrage gehört die Rückfrage?')} needs={['offene_punkte']}>
        <Field form={form} name="anfrage">
          <EntitySelectStep {...flow.picks.anfrage.select} {...flow.pick('anfrage')} searchPlaceholder={tx('Anfragenummer …')} />
        </Field>
        <StepNav onBack={() => setStep(1)} onNext={() => flow.validateStep(2)} nextStepLabel={tx('Hauptpunkt')} />
      </WizardStep>

      <WizardStep label={tx('Hauptpunkt')} description={tx('Welcher offene Punkt ist hauptsächlich betroffen?')} needs={['anfrage']}>
        <Field form={form} name="offener_punkt">
          <EntitySelectStep {...flow.picks.offener_punkt.select} {...flow.pick('offener_punkt')} searchPlaceholder={tx('Titel oder Verantwortlicher …')} />
        </Field>
        <StepNav onBack={() => setStep(2)} onNext={() => flow.validateStep(3)} nextStepLabel={tx('Weitere Punkte')} />
      </WizardStep>

      <WizardStep label={tx('Weitere Punkte')} description={tx('Optional: weitere offene Punkte, die dieselbe Rückfrage klärt.')} needs={['offener_punkt']}>
        <Field form={form} name="weitere_offene_punkte">
          <EntitySelectStep {...flow.picks.weitere_offene_punkte.select} {...flow.pickMany('weitere_offene_punkte')} searchPlaceholder={tx('Titel oder Verantwortlicher …')} />
        </Field>
        <StepNav onBack={() => setStep(3)} onNext={() => flow.validateStep(4)} nextStepLabel={tx('Rückfrage formulieren')} />
      </WizardStep>

      <WizardStep label={tx('Rückfrage')} description={tx('Empfänger, Betreff und gebündelte Fragen formulieren.')} needs={['offener_punkt']}>
        <div className="space-y-4">
          <Bound form={form} name="kanal" />
          <Bound form={form} name="absender" />
          <Bound form={form} name="empfaenger" />
          <Bound form={form} name="betreff" />
          <Bound form={form} name="inhalt" rows={6} />
          <Bound form={form} name="antwort_erwartet_bis" />
          <StepNav onBack={() => setStep(4)} onNext={() => flow.validateStep(5)} nextStepLabel={tx('Prüfen')} />
        </div>
      </WizardStep>

      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep forms={flow.formList} submit={flow.submit}
            whatHappensNext={tx('Die Rückfrage wird als Entwurf gespeichert, nichts wird versendet. Der offene Punkt wechselt auf „Wartet auf Kunde".')} />
        )}
      </WizardStep>

      {flow.submit.result && (
        <SuccessStep result={flow.submit.result} forms={flow.formList} submit={flow.submit}
          next={[
            { label: tx('Beurteilung und Entscheidung dokumentieren'), href: '#/intents/beurteilung-und-entscheidung' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
          whatHappensNext={tx('Prüfe den Entwurf und versende ihn; die Antwort dokumentierst du anschließend.')} />
      )}
    </IntentWizardShell>
  );
}
