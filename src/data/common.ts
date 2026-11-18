import type { Lang } from '../i18n';

export const steps: Record<Lang, { t: string; d: string }[]> = {
  es: [
    { t: 'Conversación', d: 'Qué vendes, a quién y qué tiene que pasar cuando alguien entra en tu web.' },
    { t: 'Propuesta por escrito', d: 'Alcance, plazos y precio cerrados antes de empezar.' },
    { t: 'Diseño y desarrollo', d: 'Ves la web avanzar en un enlace privado y la corriges sobre ella.' },
    { t: 'Publicación y cuidado', d: 'Medimos qué funciona y lo mejoramos cada mes.' },
  ],
  en: [
    { t: 'Conversation', d: 'What you sell, to whom, and what needs to happen when someone lands on your site.' },
    { t: 'Written proposal', d: 'Scope, timeline and a fixed price agreed before we start.' },
    { t: 'Design and build', d: 'You watch the site take shape on a private link and give feedback on it.' },
    { t: 'Launch and care', d: 'We measure what works and improve it every month.' },
  ],
};

export const homeFaq: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: '¿Trabajáis fuera de Alicante?', a: 'Sí. Estamos en Alicante y trabajamos en remoto con clientes de toda España y de fuera. Si estás en la provincia, vamos a verte.' },
    { q: '¿En qué idiomas puede estar mi web?', a: 'En los que hablen tus clientes. Para obra nueva lo normal es español, inglés y alguno más según tu comprador. Cada idioma con su propio SEO.' },
    { q: '¿La web y el dominio son míos?', a: 'Sí, a tu nombre desde el primer día. Si algún día quieres cambiar de proveedor, te la llevas.' },
    { q: '¿Cuánto cuesta?', a: 'Depende de la pieza y del alcance: no cuesta lo mismo un selector de 80 viviendas en cuatro idiomas que la web de un estudio. Tras la primera conversación te damos un precio cerrado por escrito.' },
    { q: '¿Cuánto se tarda?', a: 'Lo fijamos en la propuesta, por escrito, según el alcance. Antes de empezar sabes la fecha de publicación.' },
  ],
  en: [
    { q: 'Do you work outside Alicante?', a: 'Yes. We are based in Alicante and work remotely with clients across Spain and abroad. If you are in the province, we will come and see you.' },
    { q: 'Which languages can my website be in?', a: 'Whichever your clients speak. For new builds, Spanish, English and one or two more depending on your buyers is common. Each language has its own SEO.' },
    { q: 'Do I own the website and the domain?', a: 'Yes, in your name from day one. If you ever want to change provider, you take it with you.' },
    { q: 'How much does it cost?', a: 'It depends on the piece and the scope: an 80-unit selector in four languages is not the same as a studio website. After the first conversation we give you a fixed price in writing.' },
    { q: 'How long does it take?', a: 'We set it in the written proposal, based on scope. Before we start, you know the launch date.' },
  ],
};

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
