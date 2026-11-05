/** Turns the bulleted free text the CMS stores into list items. */
export function toListItems(text) {
  return (text ?? '')
    .split(/•|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanQuote(quote) {
  return (quote ?? '').trim().replace(/^["„“”]+|["„“”]+$/g, '');
}

function telephoneHref(phone) {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('0') ? `+41${digits.slice(1)}` : digits}`;
}

/** Everything a team view needs from a CMS entry, with absent fields left empty. */
export function describeMember(member) {
  const contacts = [];
  if (member.email) {
    contacts.push({ icon: 'mail', label: member.email, href: `mailto:${member.email}` });
  }
  if (member.phone) {
    contacts.push({ icon: 'phone', label: member.phone, href: telephoneHref(member.phone) });
  }
  if (member.linkedIn) {
    contacts.push({ icon: 'linkedin', label: 'LinkedIn', href: member.linkedIn });
  }

  return {
    name: member.name.trim(),
    role: member.workPosition,
    quote: cleanQuote(member.quote),
    description: member.description,
    diploma: member.diploma?.trim() || null,
    languages: member.languages?.split(',').map((language) => language.trim()).join(', ') || null,
    education: toListItems(member.education),
    specialties: toListItems(member.specialties),
    contacts,
    photo: member.profilePicture,
  };
}
