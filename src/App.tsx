import { useState, useRef, useEffect } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

type MotoType = "Deportiva" | "Naked" | "Adventure" | "Cruiser" | "Touring";
type BrandName =
  | "Ducati"
  | "BMW"
  | "Kawasaki"
  | "Aprilia"
  | "Honda"
  | "Triumph"
  | "Harley-Davidson"
  | "KTM";

interface Moto {
  id: number;
  name: string;
  brand: BrandName;
  type: MotoType;
  cc: number;
  price: number;
  imageId: string;
  tagline: string;
  hp: number;
  torque: number;
  weight: number;
  topSpeed: number;
  year: number;
}

const MOTOS: Moto[] = [
  {
    id: 1,
    name: "Panigale V4 S",
    brand: "Ducati",
    type: "Deportiva",
    cc: 1103,
    price: 38900,
    imageId: "photo-1558618666-fcd25c85cd64",
    tagline: "La superbike definitiva. Pura adrenalina italiana.",
    hp: 214,
    torque: 124,
    weight: 195,
    topSpeed: 299,
    year: 2024,
  },
  {
    id: 2,
    name: "M 1000 RR Competition",
    brand: "BMW",
    type: "Deportiva",
    cc: 999,
    price: 44500,
    imageId: "photo-1568772585407-9361f9bf3a87",
    tagline: "Precision alemana en su forma mas extrema.",
    hp: 212,
    torque: 113,
    weight: 192,
    topSpeed: 306,
    year: 2024,
  },
  {
    id: 3,
    name: "Ninja ZX-10R KRT Edition",
    brand: "Kawasaki",
    type: "Deportiva",
    cc: 998,
    price: 21990,
    imageId: "photo-1609630875171-b1321377ee65",
    tagline: "Tecnologia superbike directo del World Superbike Championship.",
    hp: 203,
    torque: 114,
    weight: 207,
    topSpeed: 299,
    year: 2024,
  },
  {
    id: 4,
    name: "RSV4 Factory",
    brand: "Aprilia",
    type: "Deportiva",
    cc: 1099,
    price: 34900,
    imageId: "photo-1526726538690-5cbf956ae2fd",
    tagline: "Campeona del mundo. Ahora en tus manos.",
    hp: 217,
    torque: 125,
    weight: 199,
    topSpeed: 299,
    year: 2024,
  },
  {
    id: 5,
    name: "CB1000R Black Edition",
    brand: "Honda",
    type: "Naked",
    cc: 998,
    price: 17990,
    imageId: "photo-1558618047-3c8bdb7f79a8",
    tagline: "Neo Sports Cafe. Estilo y potencia sin concesiones.",
    hp: 145,
    torque: 104,
    weight: 212,
    topSpeed: 249,
    year: 2024,
  },
  {
    id: 6,
    name: "Tiger 1200 GT Pro",
    brand: "Triumph",
    type: "Adventure",
    cc: 1160,
    price: 26000,
    imageId: "photo-1591637333184-19aa84b3e01f",
    tagline: "El aventurero mas sofisticado del planeta.",
    hp: 150,
    torque: 130,
    weight: 243,
    topSpeed: 220,
    year: 2024,
  },
  {
    id: 7,
    name: "Fat Bob 114",
    brand: "Harley-Davidson",
    type: "Cruiser",
    cc: 1868,
    price: 24995,
    imageId: "photo-1449426468159-d96dbf08f19f",
    tagline: "Potencia bruta. Alma americana. Leyenda viva.",
    hp: 100,
    torque: 161,
    weight: 303,
    topSpeed: 180,
    year: 2024,
  },
  {
    id: 8,
    name: "1290 Super Duke R EVO",
    brand: "KTM",
    type: "Naked",
    cc: 1301,
    price: 23990,
    imageId: "photo-1611241443322-7b0acab35c5d",
    tagline: "La bestia. Sin limites, sin compromisos.",
    hp: 180,
    torque: 140,
    weight: 189,
    topSpeed: 282,
    year: 2024,
  },
];

const PARTS_CATEGORIES = [
  { name: "Cascos", icon: "🪖", count: 124, sub: ["Integral", "Modular", "Jet", "Cross"] },
  { name: "Frenos", icon: "⚙️", count: 89, sub: ["Discos", "Pastillas", "Lineas", "Bombas"] },
  { name: "Escape", icon: "💨", count: 67, sub: ["Full System", "Slip-on", "Headers", "Silenciadores"] },
  { name: "Suspension", icon: "🔧", count: 43, sub: ["Horquillas", "Amortiguadores", "Preload", "Kits"] },
  { name: "Neumaticos", icon: "⭕", count: 98, sub: ["Sport", "Touring", "Mixto", "Racing"] },
  { name: "Electronica", icon: "💡", count: 56, sub: ["Quick Shifter", "Autocom", "GPS", "USB"] },
  { name: "Protecciones", icon: "🛡️", count: 78, sub: ["Chaquetas", "Guantes", "Botas", "Espaldera"] },
  { name: "Accesorios", icon: "✨", count: 112, sub: ["Alforjas", "Tankbags", "Manillares", "Espejos"] },
];

const SERVICES = [
  {
    name: "Mantenimiento Preventivo",
    desc: "Revision completa con 50 puntos de inspeccion, cambio de fluidos, ajuste de cadena y calibracion de frenos.",
    duration: "3–4 horas",
    price: "desde $89",
    icon: "🔧",
  },
  {
    name: "Configuracion de Suspension",
    desc: "Ajuste personalizado de horquilla y amortiguador segun peso del piloto y estilo de conduccion.",
    duration: "2 horas",
    price: "desde $120",
    icon: "⚙️",
  },
  {
    name: "Instalacion de Accesorios",
    desc: "Montaje profesional de escape, electronica, protecciones y cualquier accesorio aftermarket.",
    duration: "Variable",
    price: "desde $45",
    icon: "🛠️",
  },
  {
    name: "Diagnostico Electronico",
    desc: "Analisis completo con scanner OBD, lectura de errores, mapeo de ECU y actualizacion de firmware.",
    duration: "1–2 horas",
    price: "desde $65",
    icon: "💻",
  },
  {
    name: "Preparacion para Pista",
    desc: "Setup completo para trackday: frenos, suspension, neumaticos racing, supresion de luces.",
    duration: "1 dia",
    price: "desde $350",
    icon: "🏁",
  },
  {
    name: "Detailing Premium",
    desc: "Limpieza profunda, pulido, proteccion ceramica y presentacion de showroom para tu moto.",
    duration: "4–6 horas",
    price: "desde $180",
    icon: "✨",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

type Page = "home" | "catalog" | "detail" | "parts" | "services" | "contact";

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function img(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);

  const links: { label: string; id: Page }[] = [
    { label: "Inicio", id: "home" },
    { label: "Catalogo", id: "catalog" },
    { label: "Repuestos", id: "parts" },
    { label: "Servicios", id: "services" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-1.5 shrink-0"
        >
          <span
            className="font-display font-black text-2xl tracking-tight"
            style={{ color: "#E5001B" }}
          >
            APEX
          </span>
          <span className="font-display font-light text-2xl tracking-widest text-white">
            MOTO
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => setPage(l.id)}
                className={`text-xs font-body font-medium tracking-[0.2em] uppercase transition-colors ${
                  page === l.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
                style={page === l.id ? { color: "#E5001B" } : undefined}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <button
            onClick={() => setPage("contact")}
            className="px-5 py-2 text-xs font-body font-bold tracking-widest uppercase text-white rounded-sm transition-all active:scale-95"
            style={{ backgroundColor: "#E5001B" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#FF1A32";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#E5001B";
            }}
          >
            Cotizar Ahora
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-1"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-white transition-all duration-200 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-200 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/5 px-4 py-3 flex flex-col">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setPage(l.id);
                setOpen(false);
              }}
              className={`text-left py-3 text-xs font-body font-bold tracking-[0.2em] uppercase border-b border-white/5 transition-colors ${
                page === l.id ? "text-white" : "text-white/40"
              }`}
              style={page === l.id ? { color: "#E5001B" } : undefined}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setPage("contact");
              setOpen(false);
            }}
            className="mt-3 py-3 text-xs font-body font-bold tracking-widest uppercase text-white rounded-sm"
            style={{ backgroundColor: "#E5001B" }}
          >
            Cotizar Ahora
          </button>
        </div>
      )}
    </header>
  );
}

// ── Moto Card ─────────────────────────────────────────────────────────────────

function MotoCard({
  moto,
  onDetail,
}: {
  moto: Moto;
  onDetail: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative bg-[#111111] rounded-sm overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        border: hovered
          ? "1px solid rgba(229,0,27,0.4)"
          : "1px solid rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(229,0,27,0.12)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onDetail}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
        <img
          src={img(moto.imageId, 800, 500)}
          alt={moto.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className="text-white text-xs font-body font-bold px-2 py-1 tracking-wider uppercase"
            style={{ backgroundColor: "#E5001B" }}
          >
            {moto.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 text-white/60 text-xs font-mono px-2 py-1 border border-white/10">
            {moto.cc}cc
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="text-white/30 text-xs font-mono tracking-widest uppercase mb-1">
          {moto.brand}
        </div>
        <h3 className="font-display font-black text-xl uppercase leading-tight mb-3">
          {moto.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-black text-xl" style={{ color: "#E5001B" }}>
            {fmt(moto.price)}
          </div>
          <div className="text-white/30 text-xs font-mono">{moto.hp} HP</div>
        </div>
        <button
          className="w-full py-2.5 text-xs font-body font-bold tracking-widest uppercase rounded-sm transition-all"
          style={{
            border: "1px solid rgba(229,0,27,0.4)",
            color: "#E5001B",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#E5001B";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "transparent";
            el.style.color = "#E5001B";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDetail();
          }}
        >
          Explora 360 →
        </button>
      </div>
    </article>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({
  setPage,
  setSelectedMoto,
}: {
  setPage: (p: Page) => void;
  setSelectedMoto: (m: Moto) => void;
}) {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5500);
    return () => clearInterval(t);
  }, []);

  const heroMoto = MOTOS[heroIdx];

  return (
    <div className="bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${img(heroMoto.imageId, 1600, 900)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/20" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-20">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-mono font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "#E5001B" }}
            >
              {heroMoto.brand} — {heroMoto.year}
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none mb-4">
              {heroMoto.name}
            </h1>
            <p className="text-white/50 text-base sm:text-lg mb-8 font-body">
              {heroMoto.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedMoto(heroMoto);
                  setPage("detail");
                }}
                className="px-8 py-4 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-all active:scale-95"
                style={{ backgroundColor: "#E5001B" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#FF1A32")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#E5001B")
                }
              >
                Explora 360
              </button>
              <button
                onClick={() => setPage("catalog")}
                className="px-8 py-4 border border-white/25 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm hover:border-white/50 transition-all"
              >
                Ver Catalogo
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
              {[
                { label: "Potencia", val: `${heroMoto.hp} HP` },
                { label: "Torque", val: `${heroMoto.torque} Nm` },
                { label: "Vel. Max.", val: `${heroMoto.topSpeed} km/h` },
                { label: "Precio", val: fmt(heroMoto.price) },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-white/30 text-xs font-mono uppercase tracking-wider mb-1">
                    {s.label}
                  </div>
                  <div className="font-display font-bold text-base sm:text-xl text-white">
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === heroIdx ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  backgroundColor:
                    i === heroIdx ? "#E5001B" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick links bar */}
      <div className="py-3 overflow-x-auto" style={{ backgroundColor: "#E5001B" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 min-w-max">
          {["Sportbikes", "Naked", "Adventure", "Cruiser", "Touring", "Ofertas Especiales"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setPage("catalog")}
                className="text-white/90 font-body font-bold text-xs tracking-widest uppercase whitespace-nowrap hover:text-white transition-colors"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Featured models */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: "#E5001B" }}
            >
              Modelos Destacados
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1">
              Las Mas Codiciadas
            </h2>
          </div>
          <button
            onClick={() => setPage("catalog")}
            className="text-white/30 hover:text-white/60 text-xs font-mono tracking-wider underline underline-offset-4 transition-colors hidden sm:block"
          >
            Ver todas →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOTOS.slice(0, 3).map((moto) => (
            <MotoCard
              key={moto.id}
              moto={moto}
              onDetail={() => {
                setSelectedMoto(moto);
                setPage("detail");
              }}
            />
          ))}
        </div>
      </section>

      {/* Store intro */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: "#0052CC" }}
            >
              Quienes Somos
            </span>
            <h2 className="font-display text-4xl font-black uppercase mt-2 mb-6">
              La Elite del Mundo Moto
            </h2>
            <p className="text-white/45 leading-relaxed mb-4 font-body text-sm">
              APEX MOTO es el concesionario premium lider en la region. Llevamos mas de 15
              anos conectando a los pilotos mas exigentes con las maquinas mas extraordinarias
              del planeta.
            </p>
            <p className="text-white/45 leading-relaxed mb-10 font-body text-sm">
              Distribuidores oficiales de Ducati, BMW Motorrad, Kawasaki, Aprilia, Honda,
              Triumph, Harley-Davidson y KTM. Cada modelo en nuestro showroom pasa por un
              exhaustivo proceso de preparacion y control de calidad.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "15+", label: "Anos de experiencia" },
                { val: "8", label: "Marcas oficiales" },
                { val: "2.400+", label: "Clientes satisfechos" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-white/8 p-4 rounded-sm"
                >
                  <div
                    className="font-display text-3xl font-black"
                    style={{ color: "#E5001B" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-white/35 text-xs mt-1 font-body">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <img
              src={img("photo-1591637333184-19aa84b3e01f", 800, 600)}
              alt="Showroom APEX MOTO"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="font-display font-black text-lg uppercase">
                Showroom Principal
              </div>
              <div className="text-white/55 text-sm font-body">
                Bogota, Colombia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <div className="bg-[#0f0f0f] border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { icon: "🔧", title: "Taller Certificado", desc: "Mecanicos especializados por marca" },
            { icon: "🚚", title: "Envio Nacional", desc: "Repuestos a cualquier ciudad" },
            { icon: "💳", title: "Financiacion", desc: "Hasta 60 meses sin intereses" },
            { icon: "📋", title: "Garantia Total", desc: "2 anos o 20.000 km" },
          ].map((s) => (
            <div key={s.title} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{s.icon}</span>
              <div>
                <div className="font-display font-bold text-sm uppercase tracking-wide text-white">
                  {s.title}
                </div>
                <div className="text-white/35 text-xs mt-0.5 font-body">
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${img("photo-1558618666-fcd25c85cd64", 1600, 500)})`,
          }}
        >
          <div className="absolute inset-0 bg-black/82" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl sm:text-7xl font-black uppercase mb-4">
            Lista tu proxima moto?
          </h2>
          <p className="text-white/45 mb-8 font-body">
            Agenda una cita y vivela antes de comprarla.
          </p>
          <button
            onClick={() => setPage("services")}
            className="px-10 py-4 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-all active:scale-95"
            style={{ backgroundColor: "#E5001B" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#FF1A32")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#E5001B")
            }
          >
            Agendar Test Ride
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-10">
          <div>
            <div
              className="font-display font-black text-2xl mb-4"
              style={{ color: "#E5001B" }}
            >
              APEX MOTO
            </div>
            <p className="text-white/25 text-xs leading-relaxed font-body">
              El destino premium para los amantes de las dos ruedas.
            </p>
          </div>
          {[
            {
              title: "Explorar",
              links: ["Catalogo", "Repuestos", "Servicios", "Contacto"],
            },
            {
              title: "Marcas",
              links: ["Ducati", "BMW Motorrad", "Kawasaki", "Aprilia"],
            },
            {
              title: "Contacto",
              links: ["Cra. 7 #120-15, Bogota", "+57 1 234 5678", "info@apexmoto.co"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-white font-display font-bold text-xs tracking-widest uppercase mb-4">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li
                    key={l}
                    className="text-white/25 text-xs font-body hover:text-white/50 transition-colors cursor-pointer"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-white/15 text-xs font-body">
          <span>2024 APEX MOTO. Todos los derechos reservados.</span>
          <span>Bogota, Colombia</span>
        </div>
      </footer>
    </div>
  );
}

// ── Catalog Page ──────────────────────────────────────────────────────────────

function CatalogPage({
  setPage,
  setSelectedMoto,
}: {
  setPage: (p: Page) => void;
  setSelectedMoto: (m: Moto) => void;
}) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [type, setType] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState<"grid" | "list">("grid");

  const brands = ["Todas", ...Array.from(new Set(MOTOS.map((m) => m.brand)))];
  const types = ["Todos", ...Array.from(new Set(MOTOS.map((m) => m.type)))];

  let filtered = MOTOS.filter((m) => brand === "Todas" || m.brand === brand)
    .filter((m) => type === "Todos" || m.type === type)
    .filter((m) => m.price <= maxPrice)
    .filter(
      (m) =>
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.brand.toLowerCase().includes(search.toLowerCase())
    );

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "hp") filtered = [...filtered].sort((a, b) => b.hp - a.hp);

  const selStyle =
    "bg-[#0d0d0d] border border-white/10 text-white px-3 py-2.5 text-xs font-body rounded-sm focus:outline-none transition-colors appearance-none";

  return (
    <div className="bg-[#080808] text-white min-h-screen pt-16">
      <div className="border-b border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "#E5001B" }}
          >
            Catalogo Completo
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1">
            Nuestros Modelos
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-[#111111] border border-white/5 rounded-sm p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Buscar modelo o marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white placeholder-white/20 px-3 py-2.5 text-xs font-body rounded-sm focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={selStyle}
            >
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selStyle}
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={selStyle}
            >
              <option value="default">Ordenar por</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="hp">Mayor potencia</option>
            </select>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-white/30 text-xs font-mono whitespace-nowrap">
              Precio max:
            </span>
            <input
              type="range"
              min={15000}
              max={50000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="flex-1"
              style={{ accentColor: "#E5001B" }}
            />
            <span className="text-white font-mono text-xs whitespace-nowrap">
              {fmt(maxPrice)}
            </span>
            <div className="flex border border-white/10 rounded-sm overflow-hidden">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-3 py-2 text-xs transition-colors"
                  style={{
                    backgroundColor: view === v ? "#E5001B" : "transparent",
                    color: view === v ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {v === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-white/30 text-xs font-mono">
            {filtered.length} modelos encontrados
          </span>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((moto) => (
              <MotoCard
                key={moto.id}
                moto={moto}
                onDetail={() => {
                  setSelectedMoto(moto);
                  setPage("detail");
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((moto) => (
              <div
                key={moto.id}
                className="bg-[#111111] border border-white/5 rounded-sm p-4 flex items-center gap-5 hover:border-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedMoto(moto);
                  setPage("detail");
                }}
              >
                <img
                  src={img(moto.imageId, 240, 140)}
                  alt={moto.name}
                  className="w-28 h-16 sm:w-36 sm:h-20 object-cover rounded-sm bg-[#0d0d0d] shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white/30 text-xs font-mono uppercase">
                    {moto.brand} — {moto.type}
                  </div>
                  <div className="font-display font-black text-xl uppercase">
                    {moto.name}
                  </div>
                  <div className="flex gap-4 mt-1.5">
                    {[
                      `${moto.cc}cc`,
                      `${moto.hp} HP`,
                      `${moto.weight} kg`,
                      `${moto.topSpeed} km/h`,
                    ].map((v) => (
                      <span key={v} className="text-white/30 text-xs font-mono">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="font-display font-black text-2xl"
                    style={{ color: "#E5001B" }}
                  >
                    {fmt(moto.price)}
                  </div>
                  <button
                    className="mt-2 px-4 py-1.5 text-xs font-body font-bold tracking-wider uppercase rounded-sm transition-all"
                    style={{
                      border: "1px solid rgba(229,0,27,0.4)",
                      color: "#E5001B",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#E5001B";
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#E5001B";
                    }}
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-24 text-center text-white/20 font-body text-sm">
            No se encontraron modelos con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
}

// ── 360 Viewer ────────────────────────────────────────────────────────────────

function ThreeSixtyViewer({ moto }: { moto: Moto }) {
  const [deg, setDeg] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startDeg = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    startX.current = e.clientX;
    startDeg.current = deg;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const delta = (e.clientX - startX.current) * 0.55;
    setDeg(startDeg.current + delta);
  };
  const onPointerUp = () => setDragging(false);

  const normalDeg = Math.round(((deg % 360) + 360) % 360);

  return (
    <div
      className="bg-[#090909] rounded-sm overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="relative aspect-video overflow-hidden"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={img(moto.imageId, 1000, 560)}
            alt={`${moto.name} 360`}
            className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
            style={{
              transform: `perspective(900px) rotateY(${deg * 0.12}deg) scale(${dragging ? 1.04 : 1})`,
            }}
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />

        {!dragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="px-4 py-2 rounded-full flex items-center gap-2 text-white/50 text-xs font-mono"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span>↔</span> Arrastra para rotar
            </div>
          </div>
        )}

        <div
          className="absolute bottom-4 right-4 px-3 py-1 font-mono text-xs"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#00E676",
          }}
        >
          {normalDeg}° / 360°
        </div>

        <div
          className="absolute top-4 left-4 px-3 py-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="font-display font-black text-xs uppercase text-white/60">
            {moto.brand}
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-2">
          {[
            { label: "← 45°", delta: -45 },
            { label: "Reset", delta: null },
            { label: "45° →", delta: 45 },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() =>
                btn.delta === null
                  ? setDeg(0)
                  : setDeg((d) => d + (btn.delta as number))
              }
              className="px-3 py-1 text-white/30 text-xs font-body hover:text-white transition-colors rounded-sm"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <span className="text-white/20 text-xs font-mono">Vista 360</span>
      </div>

      <div className="px-4 pb-3">
        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${(normalDeg / 360) * 100}%`,
              backgroundColor: "#E5001B",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Product Detail ────────────────────────────────────────────────────────────

function ProductDetailPage({
  moto,
  setPage,
}: {
  moto: Moto;
  setPage: (p: Page) => void;
}) {
  const [tab, setTab] = useState<"360" | "gallery" | "specs">("360");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const specs = [
    { label: "Motor", val: `${moto.cc}cc, 4 cilindros en linea` },
    { label: "Potencia maxima", val: `${moto.hp} HP @ 13.000 rpm` },
    { label: "Torque maximo", val: `${moto.torque} Nm @ 11.000 rpm` },
    { label: "Peso en seco", val: `${moto.weight} kg` },
    { label: "Velocidad maxima", val: `${moto.topSpeed} km/h` },
    { label: "Deposito combustible", val: "17 litros" },
    { label: "Caja de cambios", val: "6 velocidades + quickshifter" },
    { label: "Freno delantero", val: "Doble disco 330 mm, Brembo Stylema" },
    { label: "Freno trasero", val: "Disco 245 mm, pinza Brembo, ABS" },
    { label: "Suspension delantera", val: "Horquilla invertida Ohlins NIX 43mm" },
    { label: "Suspension trasera", val: "Amortiguador Ohlins TTX 36" },
    { label: "Ano modelo", val: String(moto.year) },
  ];

  const galleryIds = [
    moto.imageId,
    "photo-1568772585407-9361f9bf3a87",
    "photo-1558618047-3c8bdb7f79a8",
    "photo-1526726538690-5cbf956ae2fd",
    "photo-1609630875171-b1321377ee65",
  ];

  return (
    <div className="bg-[#080808] text-white min-h-screen pt-16">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-white/25">
          <button onClick={() => setPage("home")} className="hover:text-white/50 transition-colors">
            Inicio
          </button>
          <span>/</span>
          <button onClick={() => setPage("catalog")} className="hover:text-white/50 transition-colors">
            Catalogo
          </button>
          <span>/</span>
          <span className="text-white/50">{moto.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Media column */}
          <div className="lg:col-span-3 space-y-4">
            <div
              className="flex gap-1 p-1 rounded-sm"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {(["360", "gallery", "specs"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-2 text-xs font-body font-bold tracking-widest uppercase transition-colors rounded-sm"
                  style={{
                    backgroundColor: tab === t ? "#E5001B" : "transparent",
                    color: tab === t ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {t === "360" ? "Vista 360" : t === "gallery" ? "Galeria" : "Ficha Tecnica"}
                </button>
              ))}
            </div>

            {tab === "360" && <ThreeSixtyViewer moto={moto} />}

            {tab === "gallery" && (
              <div className="grid grid-cols-2 gap-3">
                {galleryIds.map((id, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-sm bg-[#0d0d0d] ${i === 0 ? "col-span-2" : ""}`}
                    style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                  >
                    <img
                      src={img(id, 800, 500)}
                      alt={`${moto.name} vista ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {tab === "specs" && (
              <div
                className="rounded-sm overflow-hidden"
                style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="px-5 py-4 border-b border-white/5">
                  <span className="font-display font-black text-sm uppercase tracking-wider">
                    Ficha Tecnica Completa
                  </span>
                </div>
                <div>
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className="flex items-center px-5 py-3"
                      style={{
                        borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      }}
                    >
                      <span className="text-white/35 text-xs font-mono w-48 shrink-0">
                        {s.label}
                      </span>
                      <span className="text-white text-sm font-body">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span
                className="text-xs font-mono tracking-[0.3em] uppercase"
                style={{ color: "#E5001B" }}
              >
                {moto.brand} — {moto.type}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1 leading-none">
                {moto.name}
              </h1>
              <p className="text-white/45 mt-3 font-body text-sm leading-relaxed">
                {moto.tagline}
              </p>
            </div>

            <div
              className="rounded-sm p-5"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="text-white/30 text-xs font-mono uppercase mb-1">
                Precio de lista
              </div>
              <div
                className="font-display text-4xl font-black"
                style={{ color: "#E5001B" }}
              >
                {fmt(moto.price)}
              </div>
              <div className="text-white/25 text-xs font-body mt-1">
                Impuestos incluidos · Financiacion disponible
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Potencia", val: `${moto.hp} HP`, color: "#E5001B" },
                { label: "Cilindrada", val: `${moto.cc}cc`, color: "#0052CC" },
                { label: "Torque", val: `${moto.torque} Nm`, color: "#00E676" },
                { label: "Vel. Max.", val: `${moto.topSpeed} km/h`, color: "#888" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-sm p-3"
                  style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="text-white/30 text-xs font-mono mb-1">{s.label}</div>
                  <div className="font-display font-black text-xl" style={{ color: s.color }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full py-4 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-all active:scale-95"
                style={{ backgroundColor: "#E5001B" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#FF1A32")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#E5001B")
                }
              >
                Solicitar Cotizacion
              </button>
              <button
                onClick={() => setPage("services")}
                className="w-full py-4 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-all hover:border-white/40"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Agendar Test Ride
              </button>
              <button
                onClick={() => setPage("contact")}
                className="w-full py-4 text-white/45 font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-all hover:text-white/65"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Contactar Asesor
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Garantia 2 anos", "Test ride disponible", "Financiacion 0%", "Envio incluido"].map(
                (b) => (
                  <span
                    key={b}
                    className="text-white/40 text-xs px-3 py-1 rounded-full font-body"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {b}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quote modal */}
      {quoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
          onClick={() => setQuoteOpen(false)}
        >
          <div
            className="rounded-sm p-8 w-full max-w-md"
            style={{
              backgroundColor: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {quoteSubmitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display font-black text-2xl uppercase mb-2">
                  Solicitud Enviada
                </h3>
                <p className="text-white/45 font-body text-sm">
                  Un asesor te contactara en menos de 2 horas.
                </p>
                <button
                  onClick={() => {
                    setQuoteOpen(false);
                    setQuoteSubmitted(false);
                  }}
                  className="mt-6 px-6 py-2.5 text-white/50 text-xs font-body font-bold tracking-widest uppercase rounded-sm border border-white/15 hover:border-white/30 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display font-black text-xl uppercase">
                      Solicitar Cotizacion
                    </h3>
                    <p className="text-white/35 text-xs font-body mt-0.5">
                      {moto.brand} {moto.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setQuoteOpen(false)}
                    className="text-white/25 hover:text-white text-2xl leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>
                <ContactFormInline
                  onSubmit={() => setQuoteSubmitted(true)}
                  prefillMsg={`Hola, me interesa el ${moto.brand} ${moto.name} (${fmt(moto.price)}). Por favor enviame una cotizacion detallada.`}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Parts Page ────────────────────────────────────────────────────────────────

function PartsPage() {
  const [search, setSearch] = useState("");
  const [activecat, setActivecat] = useState<string | null>(null);

  const filtered = PARTS_CATEGORIES.filter(
    (c) =>
      !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#080808] text-white min-h-screen pt-16">
      <div className="border-b border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "#0052CC" }}
          >
            Tienda Online
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1">
            Repuestos y Accesorios
          </h1>
          <p className="text-white/35 mt-2 font-body text-sm">
            Piezas originales y aftermarket para todas las marcas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            type="text"
            placeholder="Buscar repuesto, categoria o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#111111] border border-white/10 text-white placeholder-white/20 px-4 py-3 text-xs font-body rounded-sm focus:outline-none focus:border-white/20 transition-colors"
          />
          <select className="bg-[#111111] border border-white/10 text-white px-4 py-3 text-xs font-body rounded-sm focus:outline-none appearance-none">
            <option>Todas las marcas</option>
            {Array.from(new Set(MOTOS.map((m) => m.brand))).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((cat) => (
            <div
              key={cat.name}
              className="rounded-sm p-5 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: activecat === cat.name ? "rgba(0,82,204,0.08)" : "#111111",
                border:
                  activecat === cat.name
                    ? "1px solid rgba(0,82,204,0.4)"
                    : "1px solid rgba(255,255,255,0.05)",
                transform: activecat === cat.name ? "none" : undefined,
              }}
              onMouseEnter={(e) => {
                if (activecat !== cat.name)
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (activecat !== cat.name)
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.05)";
              }}
              onClick={() =>
                setActivecat((prev) => (prev === cat.name ? null : cat.name))
              }
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <div className="font-display font-black text-lg uppercase">
                {cat.name}
              </div>
              <div className="text-white/25 text-xs font-mono mt-1">
                {cat.count} productos
              </div>

              {activecat === cat.name && (
                <div
                  className="mt-4 pt-4 space-y-1"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {cat.sub.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors font-body cursor-pointer py-0.5"
                    >
                      <span style={{ color: "#0052CC" }}>›</span> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-14 rounded-sm p-8 flex flex-col sm:flex-row items-center gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(0,82,204,0.15), rgba(0,82,204,0.04))",
            border: "1px solid rgba(0,82,204,0.2)",
          }}
        >
          <div className="text-5xl">🔩</div>
          <div className="flex-1">
            <div className="font-display font-black text-xl uppercase">
              No encuentras tu repuesto?
            </div>
            <p className="text-white/45 text-sm font-body mt-1">
              Nuestro equipo tecnico te ayuda a identificar la pieza correcta para tu modelo.
            </p>
          </div>
          <button
            className="px-6 py-3 text-white font-body font-bold text-xs tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
            style={{ backgroundColor: "#0052CC" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0066FF")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0052CC")
            }
          >
            Consultar Tecnico
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Services Page ─────────────────────────────────────────────────────────────

function ServicesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    moto: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle =
    "w-full bg-[#080808] border border-white/10 text-white placeholder-white/20 px-3 py-2.5 text-xs font-body rounded-sm focus:outline-none transition-colors";

  return (
    <div className="bg-[#080808] text-white min-h-screen pt-16">
      <div className="border-b border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "#00E676" }}
          >
            Taller Certificado
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1">
            Servicios
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SERVICES.map((srv) => (
            <div
              key={srv.name}
              className="rounded-sm p-6 transition-colors"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(0,230,118,0.2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.05)")
              }
            >
              <div className="text-3xl mb-4">{srv.icon}</div>
              <h3 className="font-display font-black text-lg uppercase mb-2">
                {srv.name}
              </h3>
              <p className="text-white/40 text-sm font-body leading-relaxed mb-4">
                {srv.desc}
              </p>
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-white/30 text-xs font-mono">{srv.duration}</span>
                <span className="font-display font-bold" style={{ color: "#00E676" }}>
                  {srv.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: "#00E676" }}
            >
              Agenda en linea
            </span>
            <h2 className="font-display text-3xl font-black uppercase mt-2 mb-4">
              Reservar Cita
            </h2>
            <p className="text-white/40 font-body text-sm mb-6">
              Agenda tu cita en minutos. Confirmacion inmediata por WhatsApp y email.
            </p>
            <div className="space-y-2.5">
              {[
                "Atencion de lunes a sabado",
                "Horario: 8:00 AM - 6:00 PM",
                "Confirma tu cita 24h antes",
                "Tiempo de espera: 0 minutos si agendas",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-white/35 text-sm font-body"
                >
                  <span style={{ color: "#00E676" }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div
              className="rounded-sm p-10 text-center"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(0,230,118,0.25)" }}
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display font-black text-2xl uppercase mb-2">
                Cita Agendada
              </h3>
              <p className="text-white/45 font-body text-sm">
                Recibiras una confirmacion en tu email y WhatsApp en los proximos minutos.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-white/45 text-xs font-body font-bold tracking-widest uppercase rounded-sm border border-white/15 hover:border-white/30 transition-colors"
              >
                Agendar otra cita
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-sm p-6 space-y-4"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className={fieldStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                    className={fieldStyle}
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  className={fieldStyle}
                />
              </div>
              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                  Servicio
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                  required
                  className={fieldStyle + " appearance-none"}
                >
                  <option value="">Seleccionar servicio...</option>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                  Modelo de moto
                </label>
                <input
                  type="text"
                  value={form.moto}
                  onChange={(e) => setForm((f) => ({ ...f, moto: e.target.value }))}
                  placeholder="Ej: Ducati Panigale V4"
                  className={fieldStyle}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className={fieldStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                    Hora
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    required
                    className={fieldStyle + " appearance-none"}
                  >
                    <option value="">Seleccionar hora...</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
                  Notas adicionales
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  placeholder="Describe el problema o requerimiento..."
                  className={fieldStyle + " resize-none"}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-black font-body font-black text-xs tracking-widest uppercase rounded-sm transition-all active:scale-95"
                style={{ backgroundColor: "#00E676" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#33FFa0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#00E676")
                }
              >
                Confirmar Cita
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contact Page ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#080808] text-white min-h-screen pt-16">
      <div className="border-b border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "#0052CC" }}
          >
            Estamos aqui para ayudarte
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1">
            Contacto
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {[
            { icon: "📍", title: "Showroom Principal", lines: ["Cra. 7 #120-15", "Bogota, Colombia"] },
            { icon: "📞", title: "Telefonos", lines: ["+57 1 234 5678", "+57 310 987 6543"] },
            { icon: "✉️", title: "Email", lines: ["info@apexmoto.co", "ventas@apexmoto.co"] },
            { icon: "🕐", title: "Horario", lines: ["Lun-Vie: 8:00–18:00", "Sab: 8:00–14:00"] },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="font-display font-bold text-sm uppercase tracking-wider mb-1">
                  {c.title}
                </div>
                {c.lines.map((l) => (
                  <div key={l} className="text-white/35 text-sm font-body">
                    {l}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            className="relative aspect-video rounded-sm overflow-hidden"
            style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <img
              src={img("photo-1477959858617-67f85cf4f1df", 600, 340)}
              alt="Ubicacion APEX MOTO"
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">📍</div>
                <div className="font-display font-bold text-sm uppercase">
                  Ver en Google Maps
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {submitted ? (
            <div
              className="rounded-sm p-12 text-center"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(0,82,204,0.25)" }}
            >
              <div className="text-5xl mb-4">🏍️</div>
              <h3 className="font-display font-black text-2xl uppercase mb-2">
                Mensaje Enviado
              </h3>
              <p className="text-white/45 font-body text-sm">
                Un asesor se pondra en contacto contigo en menos de 2 horas.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-white/45 text-xs font-body font-bold tracking-widest uppercase rounded-sm border border-white/15 hover:border-white/30 transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <ContactFormInline onSubmit={() => setSubmitted(true)} showDept />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared contact form ───────────────────────────────────────────────────────

function ContactFormInline({
  onSubmit,
  prefillMsg = "",
  showDept = false,
}: {
  onSubmit: () => void;
  prefillMsg?: string;
  showDept?: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    message: prefillMsg,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const fieldStyle =
    "w-full bg-[#080808] border border-white/10 text-white placeholder-white/20 px-3 py-2.5 text-xs font-body rounded-sm focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
            Nombre completo
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className={fieldStyle}
          />
        </div>
        <div>
          <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
            Telefono
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={fieldStyle}
          />
        </div>
      </div>
      <div>
        <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
          className={fieldStyle}
        />
      </div>
      {showDept && (
        <div>
          <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
            Departamento (opcional)
          </label>
          <select
            value={form.dept}
            onChange={(e) => setForm((f) => ({ ...f, dept: e.target.value }))}
            className={fieldStyle + " appearance-none"}
          >
            <option value="">Seleccionar departamento...</option>
            <option>Ventas</option>
            <option>Servicio Tecnico</option>
            <option>Repuestos</option>
            <option>Financiacion</option>
            <option>Garantias</option>
          </select>
        </div>
      )}
      <div>
        <label className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">
          Mensaje
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={5}
          required
          placeholder="En que podemos ayudarte?"
          className={fieldStyle + " resize-none"}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 text-white font-body font-black text-xs tracking-widest uppercase rounded-sm transition-all active:scale-95"
        style={{ backgroundColor: "#E5001B" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FF1A32")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E5001B")
        }
      >
        Enviar Mensaje
      </button>
    </form>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedMoto, setSelectedMoto] = useState<Moto>(MOTOS[0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = (p: Page) => setPage(p);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Nav page={page} setPage={navigate} />
      {page === "home" && (
        <HomePage setPage={navigate} setSelectedMoto={setSelectedMoto} />
      )}
      {page === "catalog" && (
        <CatalogPage setPage={navigate} setSelectedMoto={setSelectedMoto} />
      )}
      {page === "detail" && (
        <ProductDetailPage moto={selectedMoto} setPage={navigate} />
      )}
      {page === "parts" && <PartsPage />}
      {page === "services" && <ServicesPage />}
      {page === "contact" && <ContactPage />}
    </div>
  );
}
