// Rutas y textos compartidos en español e inglés.
// Cada página tiene una clave; la misma clave da su ruta en los dos idiomas (para hreflang y el cambio de idioma).

export type Lang = 'es' | 'en';

export const SITE = 'https://abgframe.com';

export const routes = {
  home: { es: '/', en: '/en/' },
  promotoras: { es: '/diseno-web-promotoras-inmobiliarias/', en: '/en/real-estate-developer-websites/' },
  arquitectura: { es: '/diseno-web-arquitectura-interiorismo/', en: '/en/architecture-interior-design-websites/' },
  reformas: { es: '/diseno-web-constructoras-reformas/', en: '/en/construction-renovation-websites/' },
  inmobiliarias: { es: '/diseno-web-inmobiliarias/', en: '/en/real-estate-agency-websites/' },
  casos: { es: '/casos/', en: '/en/work/' },
  ceyra: { es: '/casos/ceyra-studio/', en: '/en/work/ceyra-studio/' },
  demo: { es: '/demo/', en: '/en/demo/' },
  demoPromotora: { es: '/demo/promotora/', en: null },
  demoEstudio: { es: '/demo/estudio/', en: null },
  demoReformas: { es: '/demo/reformas/', en: null },
  demoInmobiliaria: { es: '/demo/inmobiliaria/', en: null },
  tresd: { es: '/maquetas-3d-visitas-virtuales/', en: '/en/3d-models-virtual-tours/' },
  proceso: { es: '/proceso/', en: '/en/process/' },
  estudio: { es: '/estudio/', en: '/en/studio/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
  blog: { es: '/blog/', en: null },
  avisoLegal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacidad: { es: '/privacidad/', en: '/en/privacy/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
} as const;

export type RouteKey = keyof typeof routes;

export const r = (key: RouteKey, lang: Lang): string => routes[key][lang] ?? routes[key].es;

export const CONTACT = {
  email: 'contacto@abgframe.com',
  phone: '+34 601 058 997',
  phoneRaw: '34601058997',
  instagram: 'abgframe',
  instagramAlvaro: 'alvarobergillos',
  formspree: 'https://formspree.io/f/meerbynw',
};

export const wa = (lang: Lang) =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(
    lang === 'es' ? 'Hola, vengo de abgframe.com y quería contaros un proyecto.' : 'Hi, I found you on abgframe.com and would like to tell you about a project.'
  )}`;

export const ui = {
  es: {
    skip: 'Saltar al contenido',
    services: 'Servicios',
    work: 'Casos',
    process: 'Proceso',
    studio: 'Estudio',
    blog: 'Blog',
    contact: 'Contacto',
    menu: 'Menú',
    close: 'Cerrar',
    otherLang: 'English',
    otherLangShort: 'EN',
    tagline: 'Agencia web para arquitectura, construcción e inmobiliaria',
    lines: {
      promotoras: ['Promotoras y obra nueva', 'Vender viviendas sobre plano'],
      arquitectura: ['Arquitectura e interiorismo', 'Conseguir encargos'],
      reformas: ['Constructoras y reformas', 'Recibir presupuestos'],
      inmobiliarias: ['Inmobiliarias', 'Captar propietarios'],
    },
    footerAbout: 'Diseñamos y programamos webs para promotoras, estudios de arquitectura e interiorismo, constructoras, empresas de reformas e inmobiliarias. Desde Alicante, para la Costa Blanca y fuera de ella.',
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    whatsapp: 'Escríbenos por WhatsApp',
    breadcrumbHome: 'Inicio',
  },
  en: {
    skip: 'Skip to content',
    services: 'Services',
    work: 'Work',
    process: 'Process',
    studio: 'Studio',
    blog: 'Blog',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    otherLang: 'Español',
    otherLangShort: 'ES',
    tagline: 'Web studio for architecture, construction and real estate',
    lines: {
      promotoras: ['Developers and new builds', 'Sell homes off-plan'],
      arquitectura: ['Architecture and interiors', 'Win commissions'],
      reformas: ['Builders and renovation', 'Get quote requests'],
      inmobiliarias: ['Real estate agencies', 'Win property listings'],
    },
    footerAbout: 'We design and build websites for property developers, architecture and interior design studios, builders, renovation companies and real estate agencies. Based in Alicante, working across the Costa Blanca and beyond.',
    legal: 'Legal notice',
    privacy: 'Privacy',
    cookies: 'Cookies',
    whatsapp: 'Message us on WhatsApp',
    breadcrumbHome: 'Home',
  },
} as const;

export const LINE_KEYS = ['promotoras', 'arquitectura', 'reformas', 'inmobiliarias'] as const;
export type LineKey = (typeof LINE_KEYS)[number];

// La demo (P2) aún no existe: mientras sea false, no se enlaza desde portada ni casos.
export const DEMO_READY = true;
