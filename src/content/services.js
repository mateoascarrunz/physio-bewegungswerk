/** Treatments shown across the site. Long descriptions live in serviceDescriptions.js. */
export const services = [
  {
    id: '1',
    title: 'Myofasziale Triggerpunkt-Therapie',
    image: 'services/myofasziale',
    focus: '50% 42%',
  },
  {
    id: '2',
    title: 'Manuelle Therapie',
    image: 'services/manuelle',
    focus: '50% 50%',
  },
  {
    id: '3',
    title: 'Postoperative Rehabilitation',
    image: 'services/postoperative',
    focus: '50% 62%',
  },
  {
    id: '4',
    title: 'Rehabilitation und Medizinische Trainingstherapie MTT',
    image: 'services/mtt',
    focus: '62% 50%',
  },
  {
    id: '5',
    title: 'Manuelle Lymphdrainage inkl. Kompressionsbehandlung',
    image: 'services/lymphdrainage',
    focus: '50% 50%',
  },
  {
    id: '6',
    title: 'Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS)',
    image: 'services/neurologische',
    focus: '50% 22%',
  },
  {
    id: '7',
    title: 'Ultraschalltherapie',
    image: 'services/ultraschalltherapie',
    focus: '55% 50%',
    onHome: false,
  },
  {
    id: '8',
    title: 'Elektrotherapie',
    homeTitle: 'Elektrotherapie und Ultraschallbehandlungen inkl. Ionto-/Sonophorese',
    image: 'services/elektrotherapie',
    focus: '72% 38%',
  },
  {
    id: '9',
    title: 'Atemtherapie',
    image: 'services/atemtherapie',
    focus: '60% 40%',
  },
  {
    id: '10',
    title: 'Geriatrische Rehabilitation und Sturzprophylaxe',
    image: 'services/geriatrische',
    focus: '50% 38%',
  },
  {
    id: '11',
    title: 'Domizilbehandlungen / Hausbesuche',
    image: 'services/domizil',
    focus: '50% 42%',
  },
  {
    id: '12',
    title: 'Mobilisation nach Mulligan',
    image: 'services/mobilisation',
    focus: '50% 58%',
  },
  {
    id: '13',
    title: 'Kinesio - Tape',
    homeTitle: 'Kinesio - Taping',
    image: 'services/kinesio',
    focus: '50% 40%',
  },
  {
    id: '14',
    title: 'Dry Needling',
    image: 'services/dry-needling',
    focus: '55% 50%',
    onHome: false,
  },
];

// Controlled break points for the long German compounds, so a narrow card breaks
// "Trigger-punkt" where a reader expects it rather than wherever the browser likes.
const SOFT_HYPHEN = '\u00AD';
const COMPOUNDS = [
  ['Triggerpunkt', 'Trigger|punkt'],
  ['Rehabilitation', 'Rehabili|tation'],
  ['Trainingstherapie', 'Trainings|therapie'],
  ['Lymphdrainage', 'Lymph|drainage'],
  ['Kompressionsbehandlung', 'Kompressions|behandlung'],
  ['Ultraschallbehandlungen', 'Ultraschall|behandlungen'],
  ['Ultraschalltherapie', 'Ultraschall|therapie'],
  ['Elektrotherapie', 'Elektro|therapie'],
  ['Sturzprophylaxe', 'Sturz|prophylaxe'],
  ['Domizilbehandlungen', 'Domizil|behandlungen'],
  ['Neurologische', 'Neuro|logische'],
];

export function withSoftHyphens(title) {
  return COMPOUNDS.reduce(
    (text, [word, broken]) => text.replace(word, broken.replace('|', SOFT_HYPHEN)),
    title,
  );
}

export function findService(id) {
  return services.find((service) => service.id === String(id)) ?? null;
}
