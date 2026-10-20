import Image from "next/image";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import { MotionShell } from "@/components/MotionShell";
import { EditorialImage } from "@/components/EditorialImage";
import { company, serviceFamilies, outcomes, industries, narrativeSteps } from "@/data/site";

function Marker({ number, label, inverse = false }: { number: string; label: string; inverse?: boolean }) {
  return <div className={`section-marker ${inverse ? "section-marker--inverse" : ""}`} data-reveal><span>({number}) / {label}</span><span>AVEC ODAS © 2026</span></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Preloader />
      <MotionShell>
        <div className="progress" aria-hidden="true"><div className="progress__bar" /></div>
        <Header />
        <main id="main">
          <section id="accueil" className="hero" data-theme="dark" aria-labelledby="hero-title">
            <div className="hero__background" aria-hidden="true"><Image src="/media/img.jpg" fill sizes="100vw" alt="" priority /></div>
            <div className="hero__top" data-reveal><span>(01) / ODAS — ABIDJAN</span><span>AGENCE DE STRATÉGIE DIGITALE<br />AFRIQUE DE L’OUEST</span></div>
            <div className="hero__headline">
              <p className="hero__overline" data-reveal>STRATÉGIE <i /> CRÉATIVITÉ <i /> IMPACT</p>
              <h1 id="hero-title"><span className="hero__word">PLUS</span><span className="hero__word hero__word--accent">D’<em>ODAS.</em></span></h1>
            </div>
            <div className="hero__bottom"><p>{company.definition.meaning}.</p><a href="#agence">DÉCOUVRIR L’AGENCE <span aria-hidden="true">↘</span></a><span>SCROLL / 001—009</span></div>
          </section>

          <section className="about section-pad" id="agence" data-theme="light" aria-labelledby="about-title">
            <Marker number="02" label="LE MANIFESTE" />
            <div className="about__grid">
              <div className="about__aside" data-reveal><span className="brand-square" aria-hidden="true" /> <span>/ɔ.das/ <br />{company.definition.meaning}</span></div>
              <div className="about__main">
                <h2 id="about-title" className="about__title"><span className="mask-line"><span data-line-reveal>CONNECTER.</span></span><span className="mask-line"><span data-line-reveal>CONVAINCRE.</span></span><span className="mask-line"><span data-line-reveal className="red-text">MARQUER.</span></span></h2>
                <div className="about__description" data-reveal><p className="about__lead">Une stratégie claire. Une expression singulière. Un impact qui dure.</p><p>{company.description}</p><a href="#expertises" className="text-link">CE QUE NOUS FAISONS <span aria-hidden="true">↗</span></a></div>
              </div>
            </div>
            <div className="about__watermark" aria-hidden="true">AVEC ODAS / DEPUIS ABIDJAN</div>
          </section>

          <section className="expertise section-pad" id="expertises" data-theme="dark" aria-labelledby="expertise-title">
            <Marker number="03" label="NOS EXPERTISES" inverse />
            <div className="expertise__heading"><h2 id="expertise-title" className="display-heading" data-reveal>LES IDÉES<br /><span>PRENNENT FORME.</span></h2><p data-reveal>{company.tagline}</p></div>
            <div className="expertise__list">
              {serviceFamilies.map((family) => <article className="expertise__row" key={family.number} data-row>
                <div className="expertise__image" aria-hidden="true"><Image src={family.image} fill sizes="(max-width: 740px) 100vw, 90vw" alt="" /></div>
                <span className="expertise__no">/ {family.number}</span>
                <div><h3>{family.name.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p className="expertise__summary">{family.summary}</p><div className="expertise__chips">{family.details.map((detail) => <span key={detail}>{detail}</span>)}</div></div>
                <span className="expertise__arrow" aria-hidden="true">↗</span>
              </article>)}
            </div>
          </section>

          <section className="film section-pad" id="regard" data-theme="light" aria-labelledby="film-title">
            <Marker number="04" label="NOTRE REGARD" />
            <div className="film__intro"><div><p className="overline" data-reveal>LA FORME FAIT PARTIE DU FOND.</p><h2 id="film-title" className="display-heading display-heading--ink" data-reveal>FAIRE<br /><span>RESSENTIR.</span></h2></div><p data-reveal>Une communication doit captiver autant qu’elle doit convaincre. Nous croyons aux idées qui savent se faire remarquer.</p></div>
            <div className="film__stage" data-reveal><div className="film__stage-heading"><span>IMAGE / PRÉSENCE / ÉMOTION</span><span>01: UN AUTRE REGARD</span></div><EditorialImage className="film__video" alt="Un groupe réuni devant un décor portant le logo ODAS" /><span className="film__stage-mark" aria-hidden="true">ODAS<span>®</span></span></div>
            <div className="film__bottom" data-reveal><span>CRÉER L’ATTENTION.</span><span>DONNER DU SENS.</span><span>FAIRE LA DIFFÉRENCE. ↗</span></div>
            <div className="film__gallery" role="group" aria-label="Photographies illustrant des usages et des environnements professionnels">
              <figure className="film__gallery-item film__gallery-item--team" data-reveal><Image src="/media/img.jpg" fill sizes="(max-width: 740px) 100vw, 46vw" alt="Un groupe réuni sur une scène devant le logo ODAS" /></figure>
              <figure className="film__gallery-item film__gallery-item--mobile" data-reveal><Image src="/media/img-2.jpg" fill sizes="(max-width: 740px) 100vw, 30vw" alt="Une personne utilise un smartphone" /></figure>
              <figure className="film__gallery-item film__gallery-item--markets" data-reveal><Image src="/media/img-3.png" fill sizes="(max-width: 740px) 100vw, 38vw" alt="Deux personnes consultent des données sur des écrans dans un bureau" /></figure>
            </div>
          </section>

          <section className="sectors section-pad" id="secteurs" data-theme="dark" aria-labelledby="sectors-title">
            <Marker number="05" label="NOS UNIVERS" inverse />
            <div className="sectors__intro"><h2 id="sectors-title" className="display-heading" data-reveal>VOS ENJEUX.<br /><span>NOTRE TERRAIN.</span></h2><p data-reveal>Nous accompagnons les organisations dont la parole engage — et dont chaque action compte.</p></div>
            <div className="sectors__grid">{industries.map((industry) => <div className="sectors__item" data-row key={industry.number}><span>{industry.number}</span><h3>{industry.name}</h3><span aria-hidden="true">↗</span></div>)}</div>
            <div className="sectors__outro" data-parallax aria-hidden="true"><Image src="/brand/odas-red.png" width={1000} height={1000} alt="" /></div>
          </section>

          <section className="impact section-pad" id="impact" data-theme="light" aria-labelledby="impact-title">
            <Marker number="06" label="CE QUE NOUS ACTIVONS" />
            <div className="impact__header"><h2 id="impact-title" className="display-heading display-heading--ink" data-reveal>PLUS DE<br /><span>PORTÉE.</span></h2><p data-reveal>Trois ambitions, une même exigence : connecter votre expertise aux bonnes personnes.</p></div>
            <div className="impact__list">{outcomes.map((outcome) => <article className="impact__item" data-row key={outcome.no}><span>{outcome.no} / OBJECTIF</span><div><h3>{outcome.title}</h3><p>{outcome.description}</p></div><span aria-hidden="true">↗</span></article>)}</div>
          </section>

          <section className="process section-pad" data-theme="dark" aria-labelledby="process-title">
            <Marker number="07" label="NOTRE MOUVEMENT" inverse />
            <div className="process__heading"><h2 id="process-title" className="display-heading" data-reveal>RIEN N’EST<br /><span>LAISSÉ AU HASARD.</span></h2><p data-reveal>Une approche claire de la réflexion à l’activation.</p></div>
            <div className="process__steps">{narrativeSteps.map((step) => <article key={step.no} data-row><span>{step.no} / 04</span><h3>{step.name}</h3><p>{step.text}</p><span aria-hidden="true">↗</span></article>)}</div>
          </section>

          <section className="partners section-pad" data-theme="light" aria-labelledby="partners-title">
            <Marker number="08" label="ILS NOUS ACCOMPAGNENT" />
            <div className="partners__heading"><h2 id="partners-title" className="display-heading display-heading--ink" data-reveal>DES LIENS<br /><span>QUI COMPTENT.</span></h2><p data-reveal>Des partenaires engagés à nos côtés.</p></div>
            <div className="partners__grid">
              <div className="partners__logo" data-reveal><Image src="/parthners/1.png" fill sizes="(max-width: 740px) 42vw, 17vw" alt="MANA" /></div>
              <div className="partners__logo" data-reveal><Image src="/parthners/2.png" fill sizes="(max-width: 740px) 42vw, 17vw" alt="L’Apéro Cash" /></div>
              <div className="partners__logo" data-reveal><Image src="/parthners/3.png" fill sizes="(max-width: 740px) 42vw, 17vw" alt="L’agence — communication intégrée" /></div>
              <div className="partners__logo" data-reveal><Image src="/parthners/4.png" fill sizes="(max-width: 740px) 42vw, 17vw" alt="Bridge Asset Management" /></div>
              <div className="partners__logo" data-reveal><Image src="/parthners/5.png" fill sizes="(max-width: 740px) 42vw, 17vw" alt="Salon de l’Épargne, de l’Investissement et du Patrimoine" /></div>
            </div>
          </section>

          <section className="contact section-pad" id="contact" data-theme="light" aria-labelledby="contact-title">
            <Marker number="09" label="PARLONS DE VOTRE PROJET" />
            <div className="contact__body"><p className="contact__eyebrow" data-reveal>CHAQUE GRANDE IDÉE COMMENCE PAR UNE CONVERSATION.</p><h2 id="contact-title" data-reveal>ON FAIT<br /><span>ÉQUIPE ?</span></h2><a className="contact__cta" href={`mailto:${company.email}?subject=Parlons%20de%20mon%20projet%20avec%20ODAS`}>PARLONS DE VOTRE PROJET <span aria-hidden="true">↗</span></a></div>
            <div className="contact__info"><div><span>ÉCRIVEZ-NOUS</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div><span>APPELEZ-NOUS</span><a href={company.phoneHref}>{company.phone}</a></div><div><span>RENDEZ-NOUS VISITE</span><p>{company.address}</p></div></div>
          </section>
        </main>
        <footer className="footer" data-theme="dark">
          <div className="footer__intro"><Image src="/brand/odas-signature.png" width={2048} height={975} alt="Avec ODAS — action de connecter marques et humains" /><a href="#accueil">REMONTER EN HAUT ↗</a></div>
          <div className="footer__brand" aria-hidden="true">ODAS</div>
          <div className="footer__bottom"><span>{company.legal.copyright}</span><span>{company.legal.rccm}</span><span>STRATÉGIE DIGITALE / ABIDJAN</span></div>
        </footer>
      </MotionShell>
    </>
  );
}
