"use client";

import { useRef, useState } from "react";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=5547992290029&text=Ol%C3%A1!%20Gostaria%20de%20realizar%20uma%20reserva%20no%20Cambori%C3%BA%20Hotel.";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Av.%20do%20Estado%20Dalmo%20Vieira%2C%205029%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC%2C%2088330-663";

const navItems = [
  ["Acomodações", "#acomodacoes"],
  ["Galeria", "#galeria"],
  ["Comodidades", "#comodidades"],
  ["Hotel Camboriú", "#hotel"],
  ["Reserva", "#reserva"],
  ["Contato", "#contato"],
];

const heroImage = {
  src: "/hotel/balneario-camboriu-novo.png",
  alt: "Vista aérea de Balneário Camboriú",
};

const rooms = [
  {
    id: "apartamento-solteiro",
    title: "Apartamento Solteiro",
    capacity: "01 hóspede",
    description:
      "Uma opção prática para quem viaja sozinho e busca descanso, boa localização e estrutura funcional.",
    photos: [
      { src: "/hotel/apartamento-solteiro.jpg", alt: "Apartamento Solteiro do Camboriú Hotel" },
    ],
  },
  {
    id: "apartamento-duplo",
    title: "Apartamento Duplo",
    capacity: "até 02 hóspedes",
    description:
      "Acomodação confortável para duas pessoas, com cama box, ar-condicionado, TV, frigobar e wi-fi.",
    photos: [
      { src: "/hotel/apartamento-duplo.jpg", alt: "Apartamento Duplo do Camboriú Hotel" },
      { src: "/hotel/quarto-casal.jpg", alt: "Detalhe do Apartamento Duplo" },
    ],
  },
  {
    id: "apartamento-casal",
    title: "Apartamento Casal",
    capacity: "casal",
    description:
      "Quarto acolhedor para casais que querem aproveitar Balneário Camboriú com ótimo custo-benefício.",
    photos: [
      { src: "/hotel/quarto-casal-01.jpg", alt: "Apartamento Casal do Camboriú Hotel" },
      { src: "/hotel/quarto-casal.jpg", alt: "Outra foto do Apartamento Casal" },
    ],
  },
  {
    id: "apartamento-triplo",
    title: "Apartamento Triplo",
    capacity: "até 03 hóspedes",
    description:
      "Ideal para pequenos grupos e famílias, com três camas e o essencial para uma estadia tranquila.",
    photos: [
      { src: "/hotel/apartamento-triplo.jpg", alt: "Apartamento Triplo do Camboriú Hotel" },
      { src: "/hotel/quarto-quadruplo-02.jpg", alt: "Outra foto do Apartamento Triplo" },
    ],
  },
  {
    id: "apartamento-quadruplo",
    title: "Apartamento Quadruplo",
    capacity: "até 04 hóspedes",
    description:
      "Mais espaço para famílias e grupos, mantendo a proposta simples, confortável e bem localizada do hotel.",
    photos: [
      { src: "/hotel/quarto-quadruplo-01.jpg", alt: "Apartamento Quadruplo do Camboriú Hotel" },
      { src: "/hotel/quarto-quadruplo-02.jpg", alt: "Outra foto do Apartamento Quadruplo" },
      { src: "/hotel/quarto-quadruplo-03.jpg", alt: "Detalhe do Apartamento Quadruplo" },
      { src: "/hotel/quarto-quadruplo.jpg", alt: "Vista alternativa do Apartamento Quadruplo" },
    ],
  },
];

const amenities = [
  { label: "Ar Condicionado", icon: "icon-air" },
  { label: "Cama Box", icon: "icon-bed" },
  { label: "TV", icon: "icon-tv" },
  { label: "TV a Cabo", icon: "icon-satellite" },
  { label: "Frigobar", icon: "icon-fridge" },
  { label: "Wi-Fi", icon: "icon-wifi" },
  { label: "Cofre", icon: "icon-safe" },
  { label: "Enxoval Completo", icon: "icon-towel" },
  { label: "Vaga de Garagem", icon: "icon-car" },
  { label: "Café da Manhã*", icon: "icon-coffee" },
  { label: "Recepção 24h", icon: "icon-bell" },
];

const AMENITIES_PER_PAGE = 3;

const gallery = [
  { src: "/hotel/fachada-camboriu-hotel.png", alt: "Fachada do Camboriú Hotel", caption: "Fachada" },
  { src: "/hotel/apartamento-solteiro.jpg", alt: "Apartamento Solteiro", caption: "Apartamento Solteiro" },
  { src: "/hotel/apartamento-duplo.jpg", alt: "Apartamento Duplo", caption: "Apartamento Duplo" },
  { src: "/hotel/quarto-casal-01.jpg", alt: "Apartamento Casal", caption: "Apartamento Casal" },
  { src: "/hotel/apartamento-triplo.jpg", alt: "Apartamento Triplo", caption: "Apartamento Triplo" },
  { src: "/hotel/quarto-quadruplo-01.jpg", alt: "Apartamento Quadruplo", caption: "Apartamento Quadruplo" },
  { src: "/hotel/quarto-quadruplo-03.jpg", alt: "Detalhe do Apartamento Quadruplo", caption: "Apartamento Quadruplo" },
  { src: "/hotel/banheiro-01.jpg", alt: "Banheiro 01", caption: "Banheiro 01" },
  { src: "/hotel/banheiro.jpg", alt: "Banheiro", caption: "Banheiro" },
  { src: "/hotel/cafe-da-manha.jpg", alt: "Café da Manhã", caption: "Café da Manhã" },
];

function nextIndex(current: number, direction: number, total: number) {
  return (current + direction + total) % total;
}

function BrandLogo() {
  return <img className="brand-logo" src="/hotel/camboriu-logo.png" alt="Camboriú Hotel" />;
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.7 12 3l9 7.7v9.8h-6.1v-6.2H9.1v6.2H3z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.601 2.326A7.86 7.86 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.607M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.473.205.842.326 1.13.418.475.152.904.13 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.4" cy="7.8" r="1" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8.1h2.1V4.7c-.4-.1-1.7-.2-3.1-.2-3 0-5 1.8-5 5.1v2.9H4.7v3.8H8v7.2h4v-7.2h3.3l.5-3.8H12V10c0-1.1.3-1.9 2-1.9Z" />
    </svg>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [roomPhotoIndexes, setRoomPhotoIndexes] = useState<Record<string, number>>({});
  const [amenitiesPage, setAmenitiesPage] = useState(0);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  const activeGallery = gallery[galleryIndex];
  const galleryThumbs = gallery.map((photo, index) => ({ ...photo, index }));
  const amenitiesPageCount = Math.ceil(amenities.length / AMENITIES_PER_PAGE);

  function setRoomPhoto(roomId: string, index: number) {
    setRoomPhotoIndexes((current) => ({ ...current, [roomId]: index }));
  }

  function moveRoomPhoto(roomId: string, direction: number, total: number) {
    setRoomPhotoIndexes((current) => ({
      ...current,
      [roomId]: nextIndex(current[roomId] ?? 0, direction, total),
    }));
  }

  function setAmenitiesCarouselPage(index: number) {
    setAmenitiesPage(index);
    amenitiesRef.current?.scrollTo({
      left: index * amenitiesRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function moveAmenitiesPage(direction: number) {
    setAmenitiesCarouselPage(nextIndex(amenitiesPage, direction, amenitiesPageCount));
  }

  function syncAmenitiesPage() {
    const carousel = amenitiesRef.current;

    if (!carousel) {
      return;
    }

    const nextPage = Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth, 1));
    setAmenitiesPage(Math.min(amenitiesPageCount - 1, Math.max(0, nextPage)));
  }

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-media" aria-hidden="true">
          <img className="is-active" src={heroImage.src} alt="" />
        </div>
        <div className="hero-shade" />

        <header className="header">
          <div className="top-bar">
            <div className="melo-container top-bar-inner">
              <a className="top-icon-link" href="#home" aria-label="Ir para o início">
                <HomeIcon className="top-icon home-icon" />
              </a>
              <a className="top-phone" href={whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="top-icon whats-icon" />
                47 99229-0029
              </a>
              <div className="top-social" aria-label="Redes sociais">
                <a
                  href="https://www.instagram.com/camboriuhotel/?hl=pt-br"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram do Camboriú Hotel"
                >
                  <InstagramIcon className="top-icon instagram-icon" />
                </a>
                <a
                  href="https://www.facebook.com/Cambori%C3%BA-Hotel-Ltda-105434390981951"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook do Camboriú Hotel"
                >
                  <FacebookIcon className="top-icon facebook-icon" />
                </a>
              </div>
            </div>
          </div>

          <div className="melo-container nav-row">
            <a className="logo-wrap" href="#home" aria-label="Camboriú Hotel">
              <BrandLogo />
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-controls="site-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="menu-toggle-icon" aria-hidden="true" />
              Menu
            </button>

            <nav
              className={`nav-menu${isMenuOpen ? " is-open" : ""}`}
              id="site-menu"
              aria-label="Navegação principal"
            >
              {navItems.map(([label, href]) => (
                <a href={href} key={label} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="hero-slider-controls hero-single-control">
          <a className="hero-down" href="#reserva" aria-label="Ver reserva">
            ⌄
          </a>
        </div>
      </section>

      <section className="booking-strip" id="reserva" aria-label="Reserva direta pelo WhatsApp">
        <div className="melo-container booking-inner">
          <div className="booking-panel">
            <div className="booking-field">
              <span>Reservas</span>
              <strong>Das 08h às 18h</strong>
            </div>
            <div className="booking-field">
              <span>WhatsApp</span>
              <strong>(47) 99229-0029</strong>
            </div>
            <div className="booking-field wide">
              <span>Endereço</span>
              <strong>Centro de Balneário Camboriú</strong>
            </div>
          </div>
          <a className="reserve-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Reservar agora
          </a>
        </div>
      </section>

      <section className="tradition" id="hotel">
        <div className="melo-container tradition-grid">
          <div className="section-title">
            <span>Hotel Camboriú</span>
            <h1>Tradição, localização e atendimento familiar.</h1>
          </div>
          <div className="tradition-copy">
            <p>
              Somos um hotel familiar, construído em 1975 e ampliado em 1980. O
              Camboriú Hotel se tornou referência em atendimento e hospedagem
              qualificada para que você tenha uma estadia agradável e tranquila.
            </p>
            <p>
              Em ótima localização no Centro de Balneário Camboriú, próximo ao
              Shopping e à BR-101, o hotel oferece acesso fácil às praias,
              comércios e pontos turísticos da cidade.
            </p>
          </div>
        </div>
      </section>

      <section className="photo-feature">
        <div className="melo-container feature-grid">
          <div className="feature-frame">
            <span className="line-square" />
            <img className="feature-full-photo" src="/hotel/fachada-camboriu-hotel.png" alt="Fachada do Camboriú Hotel" />
          </div>
          <div className="feature-copy">
            <span>Hospedagem simples e acolhedora</span>
            <h2>O essencial para aproveitar Balneário Camboriú sem complicação.</h2>
            <p>
              Você pode deixar o carro na garagem e aproveitar compras, passeios
              e momentos em família. A equipe oferece suporte para quem deseja
              conhecer as atrações do turismo local.
            </p>
            <a className="outline-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Falar com a recepção
            </a>
          </div>
        </div>
      </section>

      <section className="rooms" id="acomodacoes">
        <div className="melo-container">
          <div className="main-title">
            <span className="title-icon title-icon-room" />
            <h1>Acomodações</h1>
            <p>
              Apartamentos para viagens individuais, casais, famílias e grupos.
              Quando o quarto tiver mais fotos, use as setas ou miniaturas para ver os detalhes.
            </p>
          </div>

          <div className="room-tabs" aria-label="Tipos de acomodação">
            {rooms.map((room) => (
              <a href={`#${room.id}`} key={room.id}>
                {room.title}
              </a>
            ))}
          </div>

          <div className="room-showcase">
            {rooms.map((room, index) => {
              const activePhotoIndex = roomPhotoIndexes[room.id] ?? 0;
              const activePhoto = room.photos[activePhotoIndex];

              return (
                <article className="room-item" id={room.id} key={room.id}>
                  <div className="room-photo">
                    <img className="room-photo-main" src={activePhoto.src} alt={activePhoto.alt} />
                    {room.photos.length > 1 ? (
                      <div className="room-photo-controls" aria-label={`Fotos do ${room.title}`}>
                        <button
                          type="button"
                          onClick={() => moveRoomPhoto(room.id, -1, room.photos.length)}
                          aria-label={`Foto anterior do ${room.title}`}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={() => moveRoomPhoto(room.id, 1, room.photos.length)}
                          aria-label={`Próxima foto do ${room.title}`}
                        >
                          ›
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="room-copy">
                    <small>{String(index + 1).padStart(2, "0")} / {room.capacity}</small>
                    <h2>{room.title}</h2>
                    <p>{room.description}</p>
                    {room.photos.length > 1 ? (
                      <div className="room-photo-thumbs" aria-label={`Selecionar foto do ${room.title}`}>
                        {room.photos.map((photo, photoIndex) => (
                          <button
                            className={photoIndex === activePhotoIndex ? "is-active" : ""}
                            type="button"
                            onClick={() => setRoomPhoto(room.id, photoIndex)}
                            aria-label={`Ver foto ${photoIndex + 1} do ${room.title}`}
                            key={photo.src}
                          >
                            <img src={photo.src} alt="" />
                          </button>
                        ))}
                      </div>
                    ) : null}
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      Reservar agora
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="amenities" id="comodidades">
        <div className="melo-container">
          <div
            className="amenities-grid"
            aria-label="Comodidades do hotel"
            ref={amenitiesRef}
            onScroll={syncAmenitiesPage}
          >
            {amenities.map(({ label, icon }) => (
              <div className="amenity" key={label}>
                <span className={`line-icon ${icon}`} aria-hidden="true" />
                <p>{label}</p>
              </div>
            ))}
          </div>

          <div className="amenities-pager" aria-label="Navegar comodidades">
            <button type="button" onClick={() => moveAmenitiesPage(-1)} aria-label="Comodidades anteriores">
              ‹
            </button>
            <div className="amenities-dots" aria-hidden="true">
              {Array.from({ length: amenitiesPageCount }).map((_, index) => (
                <span className={index === amenitiesPage ? "is-active" : ""} key={index} />
              ))}
            </div>
            <button type="button" onClick={() => moveAmenitiesPage(1)} aria-label="Próximas comodidades">
              ›
            </button>
          </div>

          <div className="important-box">
            <h1>Informações Importantes</h1>
            <p>
              <span>Recepção 24 horas.</span> Reservas das <span>08h às 18h</span>.
              Café da manhã incluído apenas nos meses de <span>dezembro, janeiro e fevereiro</span>.
              Para outros períodos, consulte a equipe pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="breakfast-video" aria-label="Vídeo do café da manhã">
        <div className="melo-container breakfast-grid">
          <div className="section-title">
            <span>Café da manhã</span>
            <h1>Comece o dia com praticidade.</h1>
            <p>
              O café da manhã é incluído nos meses de dezembro, janeiro e fevereiro.
              Para outros períodos, consulte a equipe do hotel pelo WhatsApp.
            </p>
          </div>
          <video
            className="breakfast-player"
            controls
            muted
            playsInline
            preload="metadata"
            poster="/hotel/cafe-da-manha.jpg"
          >
            <source src="/hotel/cafe-manha-video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="gallery" id="galeria">
        <div className="melo-container">
          <div className="main-title">
            <span className="title-icon title-icon-gallery" />
            <h1>Galeria</h1>
            <p>Quartos, banheiro, café da manhã e fachada com fotos reais do Camboriú Hotel.</p>
          </div>

          <div className="gallery-carousel" aria-label="Galeria de fotos">
            <button
              className="gallery-arrow"
              type="button"
              onClick={() => setGalleryIndex((current) => nextIndex(current, -1, gallery.length))}
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <figure className="gallery-stage">
              <img src={activeGallery.src} alt={activeGallery.alt} />
              <figcaption>{activeGallery.caption}</figcaption>
            </figure>
            <button
              className="gallery-arrow"
              type="button"
              onClick={() => setGalleryIndex((current) => nextIndex(current, 1, gallery.length))}
              aria-label="Próxima foto"
            >
              ›
            </button>
          </div>

          <div className="gallery-thumbs" aria-label="Selecionar foto da galeria">
            {galleryThumbs.map((photo) => (
              <button
                className={photo.index === galleryIndex ? "is-active" : ""}
                type="button"
                onClick={() => setGalleryIndex(photo.index)}
                aria-label={`Ver ${photo.caption}`}
                key={photo.src}
              >
                <img src={photo.src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="location" id="localizacao">
        <div className="melo-container location-grid">
          <div className="section-title">
            <span>Onde estamos</span>
            <h1>No Centro de Balneário Camboriú.</h1>
            <p>
              Av. do Estado Dalmo Vieira, 5029 - Centro, Balneário Camboriú - SC,
              88330-663.
            </p>
            <a className="outline-button" href={mapsUrl} target="_blank" rel="noreferrer">
              Ver rota no mapa
            </a>
          </div>
          <iframe
            title="Mapa do Camboriú Hotel"
            className="map"
            src="https://www.google.com/maps?q=Av.%20do%20Estado%20Dalmo%20Vieira%2C%205029%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC%2C%2088330-663&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div className="melo-container final-grid">
          <div>
            <h1>Reserve sua hospedagem direto com o Camboriú Hotel.</h1>
            <p>
              Chame no WhatsApp para consultar valores, disponibilidade e tirar
              dúvidas com a equipe.
            </p>
          </div>
          <a className="reserve-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="melo-container footer-grid">
          <div>
            <BrandLogo />
          </div>
          <div>
            <h3>Menu</h3>
            <a href="#acomodacoes">Acomodações</a>
            <a href="#galeria">Galeria</a>
            <a href="#localizacao">Localização</a>
            <a href="#contato">Contato</a>
          </div>
          <div>
            <h3>Contato</h3>
            <p>
              (47) 99229-0029<br />
              balneário.camboriuhotel@gmail.com<br />
              Av. do Estado Dalmo Vieira, 5029
            </p>
          </div>
          <div>
            <h3>Redes sociais</h3>
            <a href="https://www.instagram.com/camboriuhotel/?hl=pt-br" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/Cambori%C3%BA-Hotel-Ltda-105434390981951" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Reservar pelo WhatsApp">
        <WhatsAppIcon className="float-whats-icon" />
      </a>
    </main>
  );
}
