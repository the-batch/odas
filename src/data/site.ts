/** Source unique des informations réelles : JSON fourni par ODAS. */
import source from "./avecodas-com.json";

export const company = {
  name: source.companyDescription.name,
  description: source.companyDescription.overview,
  tagline: source.companyDescription.tagline,
  vision: source.companyDescription.vision,
  definition: source.definitions[0],
  email: source.contactInfo.email,
  phone: source.contactInfo.phone,
  phoneHref: `tel:${source.contactInfo.phone.replace(/[^+\d]/g, "")}`,
  address: source.contactInfo.address,
  invitation: source.contactInfo.meeting,
  legal: {
    copyright: source.footer.copyright,
    rccm: source.footer.rccm,
  },
};

export const serviceFamilies = [
  {
    number: "01",
    name: "STRATÉGIE &\nPOSITIONNEMENT",
    summary: "Auditer, comprendre, structurer : poser les fondations d’une parole crédible.",
    details: source.areasOfExpertise.slice(0, 4),
    image: "/media/expertises/strategie.jpg",
  },
  {
    number: "02",
    name: "PRODUCTION &\nINFLUENCE",
    summary: "Créer des contenus qui circulent, qui se regardent et qui engagent.",
    details: source.areasOfExpertise.slice(4, 10),
    image: "/media/expertises/production.jpg",
  },
  {
    number: "03",
    name: "COMMUNICATION\nFINANCIÈRE",
    summary: "Rendre les sujets exigeants lisibles, accessibles et visibles.",
    details: source.areasOfExpertise.slice(10),
    image: "/media/expertises/finance.jpg",
  },
] as const;

export const outcomes = [
  { no: "01", title: source.digitalMarketingServices[0], description: source.digitalMarketingServices[1] },
  { no: "02", title: source.digitalMarketingServices[2], description: source.digitalMarketingServices[3] },
  { no: "03", title: source.digitalMarketingServices[4], description: source.digitalMarketingServices[5] },
];

export const industries = source.industries.map((sector, index) => ({
  number: String(index + 1).padStart(2, "0"),
  name: sector.title,
}));

/** Le JSON ne fournit pas de références clients ni de résultats chiffrés : ne pas en inventer. */
export const narrativeSteps = [
  { no: "01", name: "ÉCOUTER", text: "Comprendre vos enjeux, votre marché et vos publics." },
  { no: "02", name: "STRUCTURER", text: "Définir une direction et une architecture de communication." },
  { no: "03", name: "CRÉER", text: "Déployer une expression éditoriale, visuelle et digitale." },
  { no: "04", name: "ACTIVER", text: "Faire vivre les contenus et les prises de parole." },
];
