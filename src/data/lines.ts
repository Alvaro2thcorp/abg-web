// Contenido de las cuatro líneas de servicio. Lo usan la portada (pestañas) y cada landing.
// Estructura del brief (sección 8): problema concreto → pieza interactiva → prueba → proceso → un solo contacto.
import type { Lang, LineKey } from '../i18n';

export interface LineCopy {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  h1: string;
  h1Mark: string;          // la palabra que va seleccionada dentro del h1
  lead: string;
  tabTitle: string;        // portada
  tabText: string;
  problemTitle: string;
  problems: { t: string; d: string }[];
  pieceTitle: string;
  pieceText: string;
  pieceCaption: string;
  includes: string[];
  proofTitle: string;
  proofText: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  photo: { src: string; w: number; h: number; alt: string };
}

const P = {
  fachada: { src: '/img/foto/fachada', w: 1920, h: 2880 },
  muros: { src: '/img/foto/muros', w: 1920, h: 2880 },
  escalera: { src: '/img/foto/escalera', w: 1920, h: 2880 },
  escalonada: { src: '/img/foto/escalonada', w: 1920, h: 2433 },
};

export const lines: Record<LineKey, Record<Lang, LineCopy>> = {
  promotoras: {
    es: {
      seoTitle: 'Diseño web para promotoras en Alicante | ABGFRAME',
      seoDesc: 'Webs para vender obra nueva sobre plano: selector de viviendas con plano, estado y reserva de visita, dosier del inversor y varios idiomas. Alicante y Costa Blanca.',
      kicker: 'Promotoras y obra nueva',
      h1: 'Diseño web para promotoras que venden sobre plano',
      h1Mark: 'venden',
      lead: 'Tu comprador elige vivienda desde el móvil, a veces desde otro país y sin haber pisado la parcela. Le damos el edificio entero para recorrer: planta, vivienda, plano y estado, en su idioma.',
      tabTitle: 'Vende viviendas antes de terminar la obra.',
      tabText: 'Un selector con el edificio, cada planta y cada vivienda: plano, metros, orientación y estado. Reserva de visita y dosier del inversor, en los idiomas de tus compradores.',
      problemTitle: 'Lo que frena una venta sobre plano',
      problems: [
        { t: 'El PDF de planos no vende', d: 'El comprador tiene que adivinar qué vivienda le conviene entre veinte láminas. Muchos lo dejan antes de llamar.' },
        { t: 'Nadie sabe qué queda libre', d: 'La disponibilidad cambia cada semana y la web no se entera. El comercial pierde tiempo explicando lo que ya está reservado.' },
        { t: 'Tu comprador no habla español', d: 'En la Costa Blanca una parte grande de la obra nueva la compra gente de fuera. Si la web solo está en español, compara con otra promoción que sí le habla en su idioma.' },
      ],
      pieceTitle: 'El selector de viviendas',
      pieceText: 'Del edificio a la planta, de la planta a la vivienda. Cada una con su plano, metros útiles y construidos, terraza, orientación, precio si quieres mostrarlo y estado: disponible, reservada o vendida. El estado lo cambias tú desde un panel sencillo y la web se actualiza al momento.',
      pieceCaption: 'Pruébalo: toca una vivienda. Datos de ejemplo.',
      includes: ['Selector de viviendas: edificio, planta y vivienda', 'Plano, superficies y estado de cada vivienda', 'Reserva de visita con día y hora', 'Dosier del inversor descargable', 'Tres a cinco idiomas, con SEO en cada uno', 'Cada solicitud llega con la vivienda que le interesa'],
      proofTitle: 'Lo hemos hecho con una villa en preventa',
      proofText: 'Ceyra Studio vende villas llave en mano en Sri Lanka a inversores que no pueden ir a verlas. Su web enseña la villa hora a hora, explica la inversión con un simulador y termina en una llamada reservada.',
      faq: [
        { q: '¿Puedo cambiar yo el estado de las viviendas?', a: 'Sí. Desde un panel marcas una vivienda como disponible, reservada o vendida y la web cambia al momento, sin depender de nadie.' },
        { q: '¿En cuántos idiomas puede estar?', a: 'En los que hablen tus compradores. Lo habitual es español e inglés, y añadir alemán, francés o neerlandés según la promoción. Cada idioma tiene su propio SEO.' },
        { q: '¿Sirve para una sola promoción o para varias?', a: 'Para las dos cosas. Podemos hacer una web por promoción o la web de la promotora con cada promoción dentro.' },
        { q: '¿Qué necesito tener preparado?', a: 'Planos por vivienda, renders o fotos, la memoria de calidades y el listado de viviendas con su estado. Si falta algo, lo vemos en la primera conversación.' },
      ],
      ctaTitle: '¿Qué promoción tienes en marcha?',
      photo: { ...P.fachada, alt: 'Fachada de un edificio residencial con terrazas y celosías de madera' },
    },
    en: {
      seoTitle: 'Websites for property developers in Spain | ABGFRAME',
      seoDesc: 'Websites that sell new builds off-plan: an interactive unit selector with floor plans, availability and viewing requests, an investor pack and multiple languages.',
      kicker: 'Developers and new builds',
      h1: 'Websites for developers who sell off-plan',
      h1Mark: 'sell',
      lead: 'Your buyer chooses a home on their phone, often from another country and before setting foot on the plot. We give them the whole building to explore: floor, unit, plan and availability, in their language.',
      tabTitle: 'Sell homes before the building is finished.',
      tabText: 'A selector with the building, every floor and every home: floor plan, size, orientation and availability. Viewing requests and an investor pack, in your buyers’ languages.',
      problemTitle: 'What holds back an off-plan sale',
      problems: [
        { t: 'A PDF of plans does not sell', d: 'The buyer has to guess which home suits them across twenty drawings. Many give up before calling.' },
        { t: 'Nobody knows what is still available', d: 'Availability changes every week and the website does not. Sales staff waste time explaining units that are already reserved.' },
        { t: 'Your buyer does not speak Spanish', d: 'On the Costa Blanca, a large share of new builds is bought by people from abroad. If the site is only in Spanish, they move on to a development that speaks their language.' },
      ],
      pieceTitle: 'The unit selector',
      pieceText: 'From the building to the floor, from the floor to the home. Each one with its plan, internal and built area, terrace, orientation, price if you want to show it, and status: available, reserved or sold. You change the status from a simple panel and the site updates instantly.',
      pieceCaption: 'Try it: tap a unit. Sample data.',
      includes: ['Unit selector: building, floor and home', 'Plan, areas and status for every unit', 'Viewing requests with date and time', 'Downloadable investor pack', 'Three to five languages, with SEO in each', 'Every enquiry arrives with the unit the buyer wants'],
      proofTitle: 'We have done it for a villa sold off-plan',
      proofText: 'Ceyra Studio sells turnkey villas in Sri Lanka to investors who cannot visit them. Their website shows the villa hour by hour, explains the investment with a simulator and ends in a booked call.',
      faq: [
        { q: 'Can I update the status of each unit myself?', a: 'Yes. From a simple panel you mark a unit as available, reserved or sold and the site changes instantly.' },
        { q: 'How many languages can it have?', a: 'As many as your buyers speak. Spanish and English are the usual base, adding German, French or Dutch depending on the development. Each language has its own SEO.' },
        { q: 'Is it for one development or several?', a: 'Both. We can build one site per development, or the developer’s site with each development inside it.' },
        { q: 'What do I need to have ready?', a: 'Floor plans per unit, renders or photos, the specification sheet and the list of units with their status. If something is missing, we sort it out in the first conversation.' },
      ],
      ctaTitle: 'Which development are you working on?',
      photo: { ...P.fachada, alt: 'Residential building facade with terraces and timber screens' },
    },
  },
  arquitectura: {
    es: {
      seoTitle: 'Diseño web para arquitectos e interioristas | ABGFRAME',
      seoDesc: 'Webs para estudios de arquitectura e interiorismo que quieren conseguir encargos: portfolio por proyecto a pantalla completa y briefing guiado para el cliente.',
      kicker: 'Arquitectura e interiorismo',
      h1: 'Webs para estudios de arquitectura e interiorismo que buscan encargos',
      h1Mark: 'encargos',
      lead: 'Tus proyectos son tu mejor argumento. Los enseñamos como merecen y hacemos que el cliente llegue a la primera reunión sabiendo qué quiere y con qué presupuesto.',
      tabTitle: 'Que tus proyectos te consigan el siguiente.',
      tabText: 'Cada proyecto a pantalla completa, con su planta, sus materiales y su historia. Y un briefing guiado: el cliente llega a la primera reunión con presupuesto, plazos y programa por escrito.',
      problemTitle: 'Lo que pasa hoy con la web de muchos estudios',
      problems: [
        { t: 'Un portfolio que parece un álbum', d: 'Veinte fotos sin contexto. El cliente no sabe qué problema resolvisteis, en qué plazo ni para quién.' },
        { t: 'Consultas que no encajan', d: 'Llegan correos de “¿cuánto cuesta una casa?” y la primera reunión se va en averiguar si hay proyecto.' },
        { t: 'Todo depende del boca a boca', d: 'La recomendación funciona, pero quien te recomienda manda a tu web. Si la web no está a la altura, la recomendación pierde fuerza.' },
      ],
      pieceTitle: 'Portfolio por proyecto y briefing guiado',
      pieceText: 'Cada proyecto tiene su página: imágenes a pantalla completa, planta, ficha técnica, materiales y lo que pedía el cliente. Al final, un briefing en cinco pasos (tipo de obra, ubicación, superficie, presupuesto y plazos) que te llega ordenado antes de hablar.',
      pieceCaption: 'Pruébalo: elige un proyecto. Imágenes de ejemplo.',
      includes: ['Página propia para cada proyecto', 'Ficha técnica: ubicación, superficie, año, equipo', 'Galería a pantalla completa, rápida en móvil', 'Briefing guiado en cinco pasos', 'Versión en inglés para clientes de fuera', 'SEO por tipo de proyecto y zona'],
      proofTitle: 'Lo hemos hecho para un estudio que diseña y construye',
      proofText: 'Ceyra Studio es un estudio de arquitectura, diseño e inversión. Su web presenta Leo Villa como un proyecto con nombre propio: planta, materiales, un día dentro de la casa y una forma clara de hablar con ellos.',
      faq: [
        { q: '¿Puedo añadir proyectos yo mismo?', a: 'Sí. Subes fotos, rellenas la ficha y el proyecto aparece con el mismo diseño que los demás.' },
        { q: '¿Las imágenes pesadas no harán la web lenta?', a: 'No. Las optimizamos para cada pantalla y se cargan cuando hacen falta. Una galería a pantalla completa puede cargar rápido en un móvil.' },
        { q: '¿Qué pasa con el briefing que rellena el cliente?', a: 'Te llega por email con todas las respuestas ordenadas y, si quieres, también a tu hoja de cálculo o CRM.' },
        { q: '¿Hacéis también la web de un interiorista?', a: 'Sí. Funciona igual: proyectos con nombre, materiales y un briefing adaptado a interiorismo.' },
      ],
      ctaTitle: '¿Qué proyecto quieres que te llegue?',
      photo: { ...P.muros, alt: 'Volúmenes blancos de arquitectura contemporánea contra el cielo' },
    },
    en: {
      seoTitle: 'Websites for architects and interior designers | ABGFRAME',
      seoDesc: 'Websites for architecture and interior design studios that want to win commissions: full-screen project portfolio and a guided client brief.',
      kicker: 'Architecture and interiors',
      h1: 'Websites for architecture and interior design studios that want commissions',
      h1Mark: 'commissions',
      lead: 'Your projects are your best argument. We show them properly and make sure clients arrive at the first meeting knowing what they want and what they can spend.',
      tabTitle: 'Let your projects win you the next one.',
      tabText: 'Each project full-screen, with its plan, materials and story. Plus a guided brief: the client arrives at the first meeting with budget, timeline and requirements in writing.',
      problemTitle: 'What happens today with many studio websites',
      problems: [
        { t: 'A portfolio that looks like an album', d: 'Twenty photos with no context. The client cannot tell what problem you solved, how long it took or who it was for.' },
        { t: 'Enquiries that do not fit', d: 'Emails asking “how much is a house?” arrive, and the first meeting is spent finding out whether there is a project at all.' },
        { t: 'Everything depends on word of mouth', d: 'Referrals work, but whoever refers you sends people to your website. If it is not up to the standard, the referral loses strength.' },
      ],
      pieceTitle: 'Project portfolio and guided brief',
      pieceText: 'Each project gets its own page: full-screen images, plan, fact sheet, materials and what the client asked for. At the end, a five-step brief (type of work, location, area, budget and timeline) that reaches you organised before you speak.',
      pieceCaption: 'Try it: choose a project. Sample images.',
      includes: ['A page for each project', 'Fact sheet: location, area, year, team', 'Full-screen gallery, fast on mobile', 'Five-step guided brief', 'English version for international clients', 'SEO by project type and area'],
      proofTitle: 'We have done it for a studio that designs and builds',
      proofText: 'Ceyra Studio is an architecture, design and investment studio. Their website presents Leo Villa as a named project: plan, materials, a day inside the house and a clear way to talk to them.',
      faq: [
        { q: 'Can I add projects myself?', a: 'Yes. Upload photos, fill in the fact sheet and the project appears with the same design as the rest.' },
        { q: 'Will large images make the site slow?', a: 'No. We optimise them for each screen and load them only when needed. A full-screen gallery can load fast on a phone.' },
        { q: 'What happens with the brief the client fills in?', a: 'It reaches you by email with every answer organised and, if you want, in your spreadsheet or CRM too.' },
        { q: 'Do you build websites for interior designers too?', a: 'Yes. It works the same way: named projects, materials and a brief adapted to interior design.' },
      ],
      ctaTitle: 'What project do you want to win next?',
      photo: { ...P.muros, alt: 'White contemporary architectural volumes against the sky' },
    },
  },
  reformas: {
    es: {
      seoTitle: 'Diseño web para constructoras y reformas | ABGFRAME',
      seoDesc: 'Webs para constructoras y empresas de reformas que quieren recibir presupuestos: calculadora orientativa, antes y después de tus obras y SEO local en Alicante.',
      kicker: 'Constructoras y reformas',
      h1: 'Webs para constructoras y empresas de reformas que traen presupuestos',
      h1Mark: 'presupuestos',
      lead: 'Quien busca reformar compara tres empresas en una tarde. Hacemos que la tuya sea la que enseña obras reales, da una primera cifra y se deja contactar sin esfuerzo.',
      tabTitle: 'Presupuestos de clientes que ya saben lo que quieren.',
      tabText: 'Una calculadora de presupuesto orientativo por metros y calidades, el antes y después de tus obras para deslizar con el dedo y una web que aparece cuando buscan reformas en tu zona.',
      problemTitle: 'Lo que le cuesta trabajo a una empresa de reformas',
      problems: [
        { t: 'Visitas para nada', d: 'Vas a medir y resulta que el cliente esperaba la mitad de precio. Una primera cifra orientativa filtra antes de mover la furgoneta.' },
        { t: 'Tus obras no se ven', d: 'Haces buenos trabajos, pero las fotos están en el móvil del encargado. El cliente no tiene cómo comprobarlo.' },
        { t: 'No apareces en Google en tu zona', d: 'Cuando alguien busca “reforma de baño en Alicante”, salen otros. Sin SEO local, dependes de directorios que cobran por cada contacto.' },
      ],
      pieceTitle: 'Calculadora, antes y después y SEO local',
      pieceText: 'El cliente elige tipo de reforma, metros y calidad, y ve una horquilla orientativa con tus precios. Después te deja sus datos con todo eso ya rellenado. Tus obras se enseñan con un antes y después que se desliza con el dedo, y cada servicio tiene su página para tu zona.',
      pieceCaption: 'Pruébalo: desliza para ver el después. Imágenes de ejemplo.',
      includes: ['Calculadora de presupuesto orientativo con tus precios', 'Antes y después deslizable de cada obra', 'Una página por servicio y zona (baños, cocinas, integrales…)', 'Ficha de Google Business coherente con la web', 'Botón de WhatsApp con el presupuesto ya escrito', 'Cada solicitud llega con metros y calidades'],
      proofTitle: 'Lo hemos hecho con una obra que aún no existía',
      proofText: 'Ceyra Studio vende una villa que se está construyendo. Su web enseña el proceso del terreno a las llaves y explica los números con un simulador, igual que tu calculadora explicará un presupuesto.',
      faq: [
        { q: '¿La calculadora me compromete a un precio?', a: 'No. Muestra una horquilla orientativa con tus propios precios y deja claro que el presupuesto final se da tras la visita.' },
        { q: '¿Cuánto tarda en aparecer en Google en mi zona?', a: 'Depende de la competencia. Las páginas por servicio y zona y la ficha de Google Business empiezan a notarse en semanas o en meses, y te enseñamos cómo avanza.' },
        { q: '¿Puedo subir yo las fotos de cada obra?', a: 'Sí. Subes el antes y el después y la web arma la comparación sola.' },
        { q: '¿Trabajáis con constructoras de obra nueva?', a: 'Sí. Para obra nueva cambiamos la calculadora por un recorrido de proyectos terminados y en curso.' },
      ],
      ctaTitle: '¿Qué tipo de obras quieres recibir?',
      photo: { ...P.escalera, alt: 'Escalera interior de obra con paredes encaladas y luz natural' },
    },
    en: {
      seoTitle: 'Websites for builders and renovation firms | ABGFRAME',
      seoDesc: 'Websites for builders and renovation companies that want quote requests: an estimate calculator, before-and-after of your work and local SEO.',
      kicker: 'Builders and renovation',
      h1: 'Websites for builders and renovation companies that bring in quote requests',
      h1Mark: 'quote requests',
      lead: 'People planning a renovation compare three companies in an afternoon. We make yours the one that shows real work, gives a first figure and is easy to contact.',
      tabTitle: 'Quote requests from clients who know what they want.',
      tabText: 'An estimate calculator by size and finish, before-and-after of your work to swipe, and a site that shows up when people search for renovations in your area.',
      problemTitle: 'What costs a renovation company time',
      problems: [
        { t: 'Site visits that lead nowhere', d: 'You go to measure and the client expected half the price. A first estimate filters before the van leaves.' },
        { t: 'Your work cannot be seen', d: 'You do good work, but the photos live on the site manager’s phone. The client has no way to check.' },
        { t: 'You do not show up on Google locally', d: 'When someone searches “bathroom renovation Alicante”, others appear. Without local SEO you depend on directories that charge per lead.' },
      ],
      pieceTitle: 'Calculator, before-and-after and local SEO',
      pieceText: 'The client picks the type of renovation, size and finish, and sees an estimate range based on your prices. Then they leave their details with all of that filled in. Your work is shown with a before-and-after they can swipe, and each service has its own page for your area.',
      pieceCaption: 'Try it: drag to see the after. Sample images.',
      includes: ['Estimate calculator with your own prices', 'Swipeable before-and-after for each job', 'A page per service and area (bathrooms, kitchens, full renovations…)', 'Google Business Profile aligned with the site', 'WhatsApp button with the estimate pre-filled', 'Every request arrives with size and finish'],
      proofTitle: 'We have done it for a build that did not exist yet',
      proofText: 'Ceyra Studio sells a villa that is still being built. Their website shows the process from plot to keys and explains the numbers with a simulator, just as your calculator will explain an estimate.',
      faq: [
        { q: 'Does the calculator commit me to a price?', a: 'No. It shows an estimate range based on your prices and makes clear that the final quote comes after the visit.' },
        { q: 'How long until I show up on Google locally?', a: 'It depends on the competition. Service and area pages plus the Google Business Profile start to show in weeks or months, and we show you how it progresses.' },
        { q: 'Can I upload photos of each job myself?', a: 'Yes. Upload the before and after and the site builds the comparison.' },
        { q: 'Do you work with new-build construction companies?', a: 'Yes. For new builds we replace the calculator with a showcase of finished and ongoing projects.' },
      ],
      ctaTitle: 'What kind of jobs do you want more of?',
      photo: { ...P.escalera, alt: 'Plastered interior staircase in natural light' },
    },
  },
  inmobiliarias: {
    es: {
      seoTitle: 'Diseño web para inmobiliarias en Alicante | ABGFRAME',
      seoDesc: 'Webs para inmobiliarias que quieren captar propietarios: valorador online de viviendas, fichas de inmueble cuidadas y versión en inglés para el comprador extranjero.',
      kicker: 'Inmobiliarias',
      h1: 'Webs para inmobiliarias que captan propietarios',
      h1Mark: 'propietarios',
      lead: 'Los portales te dan compradores, pero el negocio empieza con el propietario que te confía su casa. Le damos un motivo para dejarte sus datos: saber cuánto vale su vivienda.',
      tabTitle: 'Propietarios que te buscan para vender.',
      tabText: 'Un valorador online: el propietario consulta cuánto vale su vivienda y tú recibes su contacto con los datos del inmueble, listo para llamar.',
      problemTitle: 'Lo que le pasa a la web de muchas inmobiliarias',
      problems: [
        { t: 'Es un portal más, pero peor', d: 'Repite los mismos pisos que Idealista con peor buscador. El comprador se queda en el portal.' },
        { t: 'No capta propietarios', d: 'Nada en la web invita a un propietario a escribirte. Captas por la calle o por recomendación, y ahí se acaba.' },
        { t: 'No habla al comprador de fuera', d: 'En la Costa Blanca el comprador extranjero es clave. Una web solo en español lo deja en manos de otra agencia.' },
      ],
      pieceTitle: 'El valorador online',
      pieceText: 'El propietario escribe la dirección, la superficie y cuatro datos más, y ve una horquilla orientativa con los datos de tu zona. Para recibir el informe completo deja su teléfono. A ti te llega el contacto con el inmueble descrito, listo para llamar.',
      pieceCaption: 'Pruébalo. Cifras de ejemplo, no es una tasación.',
      includes: ['Valorador online con los datos de tu zona', 'Fichas de inmueble con fotos grandes y plano', 'Conexión con tu programa de gestión o feed de portales', 'Versión en inglés con SEO propio', 'Página de cada zona en la que trabajas', 'Cada valoración llega con los datos del inmueble'],
      proofTitle: 'Lo hemos hecho para vender a inversores de fuera',
      proofText: 'Ceyra Studio vende villas a inversores europeos que deciden a distancia. Su web responde lo que preguntaría un comprador extranjero antes de llamar, y termina en una llamada reservada.',
      faq: [
        { q: '¿De dónde salen las cifras del valorador?', a: 'De tus datos: precio por metro de cada zona según tus operaciones y tu criterio. Lo dejamos configurado contigo y lo puedes actualizar.' },
        { q: '¿Se conecta con mi programa de inmuebles?', a: 'Sí, con los habituales que exportan a portales (Inmovilla, Witei, Mobilia y similares). Lo confirmamos con el tuyo antes de empezar.' },
        { q: '¿Y si ya estoy en Idealista y Fotocasa?', a: 'Perfecto, la web no compite con ellos: capta al propietario que los portales no te dan y refuerza tu marca cuando el comprador te busca.' },
        { q: '¿Tiene que estar en inglés?', a: 'En la Costa Blanca, casi siempre conviene. La versión inglesa tiene su propio SEO para que te encuentren desde fuera.' },
      ],
      ctaTitle: '¿Dónde quieres captar propietarios?',
      photo: { ...P.escalonada, alt: 'Edificio residencial escalonado de hormigón blanco contra el cielo azul' },
    },
    en: {
      seoTitle: 'Websites for real estate agencies in Spain | ABGFRAME',
      seoDesc: 'Websites for agencies that want more listings: an online valuation tool, well-designed property pages and an English version for international buyers.',
      kicker: 'Real estate agencies',
      h1: 'Websites for real estate agencies that win property owners',
      h1Mark: 'owners',
      lead: 'Portals bring you buyers, but the business starts with the owner who trusts you with their home. We give them a reason to leave their details: finding out what their home is worth.',
      tabTitle: 'Owners who come to you to sell.',
      tabText: 'An online valuation tool: the owner checks what their home is worth and you get their contact details with the property described, ready to call.',
      problemTitle: 'What happens to many agency websites',
      problems: [
        { t: 'Just another portal, only worse', d: 'It repeats the same listings as the big portals with a weaker search. Buyers stay on the portal.' },
        { t: 'It does not win listings', d: 'Nothing on the site invites an owner to get in touch. You find listings on the street or by referral, and that is it.' },
        { t: 'It does not speak to foreign buyers', d: 'On the Costa Blanca, international buyers are key. A Spanish-only site leaves them to another agency.' },
      ],
      pieceTitle: 'The online valuation tool',
      pieceText: 'The owner enters the address, size and a few details, and sees an estimate range based on your local data. To get the full report they leave their phone number. You receive the contact with the property described, ready to call.',
      pieceCaption: 'Try it. Sample figures, not a formal valuation.',
      includes: ['Online valuation tool with your local data', 'Property pages with large photos and floor plan', 'Connection to your property software or portal feed', 'English version with its own SEO', 'A page for each area you cover', 'Every valuation arrives with the property details'],
      proofTitle: 'We have done it for selling to overseas investors',
      proofText: 'Ceyra Studio sells villas to European investors who decide from a distance. Their website answers what an overseas buyer would ask before calling, and ends in a booked call.',
      faq: [
        { q: 'Where do the valuation figures come from?', a: 'From your data: price per square metre in each area based on your sales and your judgement. We set it up with you and you can update it.' },
        { q: 'Does it connect to my property software?', a: 'Yes, with the usual tools that export to portals. We confirm it with yours before starting.' },
        { q: 'What if I am already on the big portals?', a: 'Good, the website does not compete with them: it wins the owners portals do not give you, and strengthens your brand when buyers look you up.' },
        { q: 'Does it need to be in English?', a: 'On the Costa Blanca, almost always. The English version has its own SEO so you can be found from abroad.' },
      ],
      ctaTitle: 'Where do you want to win more listings?',
      photo: { ...P.escalonada, alt: 'Stepped white concrete residential building against a blue sky' },
    },
  },
};
