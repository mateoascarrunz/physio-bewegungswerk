export const BOOKING_URL =
  'https://onlinecalendar.medidoc.ch/BookAppointment?cgid=GLLYOUHTXUK45FADLLmoKA&ssid=gUj7CbnQGk.1KiYHwBRBVg';

export const PRACTICE = {
  company: 'Physio Bewegungswerk GmbH',
  street: 'Bergstrasse 3',
  city: '8625 Gossau',
  address: 'Bergstrasse 3, 8625 Gossau',
  mapsUrl: 'https://maps.app.goo.gl/cF5gTcjpVvmXUC6T7',
  linkedInUrl: 'https://www.linkedin.com/company/100080030',
  phone: { label: '044 543 63 68', href: 'tel:+41445436368' },
  mobile: { label: '076 543 63 68', href: 'tel:+41765436368' },
  email: { label: 'info@physio-bewegungswerk.ch', href: 'mailto:info@physio-bewegungswerk.ch' },
  hours: 'Montag bis Freitag, 09:00–17:00 Uhr',
};

/** Links shown in the header. `priority` links stay visible on tablets in landscape. */
export const NAV_LINKS = [
  { to: '/behandlungstechniken', label: 'Behandlungstechniken', softLabel: 'Behandlungs\u00ADtechniken', priority: true },
  { to: '/private', label: 'Private Physiotherapie' },
  { to: '/uberuns', label: 'Über uns', priority: true },
  { to: '/news', label: 'News' },
  { to: '/kontakt', label: 'Kontakt', priority: true },
];
