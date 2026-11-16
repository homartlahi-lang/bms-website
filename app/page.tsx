
"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  price: number;
  unit: string;
  category: string;
};

const products: Product[] = [
  { id: 1, name: "Brique creuse", type: "Creuse", dimension: "10 × 20 × 40", price: 310, unit: "pièce", category: "Creuses" },
  { id: 2, name: "Brique creuse", type: "Creuse", dimension: "10 × 20 × 50", price: 320, unit: "pièce", category: "Creuses" },
  { id: 3, name: "Brique creuse", type: "Creuse", dimension: "15 × 20 × 40", price: 450, unit: "pièce", category: "Creuses" },
  { id: 4, name: "Brique creuse", type: "Creuse", dimension: "15 × 20 × 50", price: 490, unit: "pièce", category: "Creuses" },
  { id: 5, name: "Brique creuse", type: "Creuse", dimension: "20 × 20 × 40", price: 450, unit: "pièce", category: "Creuses" },
  { id: 6, name: "Brique creuse", type: "Creuse", dimension: "20 × 20 × 50", price: 610, unit: "pièce", category: "Creuses" },
  { id: 7, name: "Brique pleine", type: "Pleine", dimension: "15 × 20 × 50", price: 680, unit: "pièce", category: "Pleines" },
  { id: 8, name: "Brique pleine", type: "Pleine", dimension: "20 × 20 × 40", price: 640, unit: "pièce", category: "Pleines" },
  { id: 9, name: "Hourdis", type: "Hourdis", dimension: "12 × 20 × 50", price: 410, unit: "pièce", category: "Hourdis" },
  { id: 10, name: "Hourdis", type: "Hourdis", dimension: "16 × 20 × 50", price: 490, unit: "pièce", category: "Hourdis" },
  { id: 11, name: "Hourdis", type: "Hourdis", dimension: "20 × 20 × 50", price: 600, unit: "pièce", category: "Hourdis" },
  { id: 12, name: "Pavé", type: "Pavé", dimension: "Dimension 6", price: 5000, unit: "m²", category: "Pavés" },
  { id: 13, name: "Pavé", type: "Pavé", dimension: "Dimension 8", price: 5500, unit: "m²", category: "Pavés" },
  { id: 14, name: "Pavé", type: "Pavé", dimension: "Dimension 10", price: 8500, unit: "m²", category: "Pavés" },
];

const categories = ["Tous", "Creuses", "Pleines", "Hourdis", "Pavés"];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

export default function Home() {
  const [category, setCategory] = useState("Tous");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [delivery, setDelivery] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  const filteredProducts =
    category === "Tous"
      ? products
      : products.filter((product) => product.category === category);

  const selectedProducts = useMemo(
    () =>
      products
        .filter((product) => (quantities[product.id] || 0) > 0)
        .map((product) => ({
          ...product,
          quantity: quantities[product.id],
          subtotal: product.price * quantities[product.id],
        })),
    [quantities]
  );

  const total = selectedProducts.reduce(
    (sum, product) => sum + product.subtotal,
    0
  );

  const updateQuantity = (id: number, value: number) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, value),
    }));
  };

  const sendOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Veuillez renseigner votre nom et votre téléphone.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Veuillez sélectionner au moins un produit.");
      return;
    }

    const lines = selectedProducts.map(
      (p) =>
        `• ${p.name} (${p.dimension}) : ${p.quantity} ${p.unit}(s) — ${formatPrice(p.subtotal)}`
    );

    const message = [
      "Bonjour Briqueterie Moderne du Sénégal (BMS),",
      "",
      "Je souhaite effectuer une commande.",
      "",
      `Nom : ${customerName}`,
      `Téléphone : ${customerPhone}`,
      `Adresse de livraison : ${delivery || "À préciser"}`,
      "",
      "MA COMMANDE :",
      ...lines,
      "",
      `TOTAL ESTIMATIF : ${formatPrice(total)}`,
      "",
      "Merci de me confirmer la disponibilité, les frais de livraison et les modalités de paiement.",
    ].join("\n");

    window.open(
      `https://wa.me/221775060367?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#292929]">
      {/* BARRE D'ANNONCE */}
      <div className="bg-[#9e292d] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        BRIQUETERIE MODERNE DU SÉNÉGAL — La qualité au service de vos constructions
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#accueil" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9e292d] text-2xl text-white">
              🧱
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-[#9e292d]">
                BMS
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Briqueterie Moderne du Sénégal
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            <a href="#accueil" className="transition hover:text-[#b02f34]">Accueil</a>
            <a href="#produits" className="transition hover:text-[#b02f34]">Nos produits</a>
            <a href="#apropos" className="transition hover:text-[#b02f34]">À propos</a>
            <a href="#contact" className="transition hover:text-[#b02f34]">Contact</a>
          </nav>

          <a
            href="#commander"
            className="rounded-full bg-[#a52b30] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-[#812126] sm:text-sm"
          >
            Commander
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="relative overflow-hidden bg-[#252525] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(177,47,52,0.45),transparent_40%),linear-gradient(110deg,#202020,#343434)]" />
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
          <div className="animate-[fadeIn_0.8s_ease-out]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-200">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Votre partenaire construction
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Des briques de qualité pour bâtir{" "}
              <span className="text-[#e66b6f]">l&apos;avenir.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
              Découvrez les produits des Briques du Sénégal. Des solutions
              adaptées aux professionnels du bâtiment et aux particuliers,
              pour des constructions solides et durables.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#produits"
                className="rounded-lg bg-[#b32f35] px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#c63c42]"
              >
                Découvrir nos produits →
              </a>
              <a
                href="https://wa.me/221775060367"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/40 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Nous contacter
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
              <div>
                <div className="text-2xl font-black text-white">BMS</div>
                <div className="text-xs text-gray-400">Notre entreprise</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">4+</div>
                <div className="text-xs text-gray-400">Familles de produits</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-xs text-gray-400">Engagement qualité</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#b32f35]/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-gray-700 via-gray-900 to-[#171717] p-4 shadow-2xl sm:p-5">
              <video
                className="mx-auto max-h-[620px] w-full max-w-[350px] rounded-2xl object-contain"
                controls
                playsInline
                preload="metadata"
                aria-label="Présentation de la Briqueterie Moderne du Sénégal"
              >
                <source src="/video-bms.mp4" type="video/mp4" />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section id="apropos" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ae3035]">
            Qui sommes-nous ?
          </span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Construire aujourd'hui, <span className="text-[#ae3035]">durablement.</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-gray-500">
            Briqueterie Moderne du Sénégal (BMS) propose une gamme de briques et de
            matériaux de construction pour répondre aux besoins des particuliers,
            des artisans, des entrepreneurs et des professionnels du bâtiment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            ["01", "Qualité des produits", "Des matériaux conçus pour accompagner vos projets de construction."],
            ["02", "Une offre diversifiée", "Des briques creuses, pleines, hourdis et pavés selon vos besoins."],
            ["03", "Service client", "Une équipe à votre écoute pour vos demandes et commandes."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-gray-100 bg-gray-50 p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-3xl font-black text-[#b12f35]/90">{number}</div>
              <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUITS */}
      <section id="produits" className="bg-[#f7f7f7] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ae3035]">
                Notre catalogue
              </span>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Découvrez nos produits
              </h2>
              <p className="mt-3 text-sm text-gray-500">
                Sélectionnez vos produits et préparez votre commande.
              </p>
            </div>
            <a href="#commander" className="font-bold text-[#ae3035] hover:underline">
              Passer une commande →
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  category === item
                    ? "bg-[#a52b30] text-white shadow-lg"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-[#a52b30] hover:text-[#a52b30]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
                  <div className="text-7xl transition duration-300 group-hover:scale-110">🧱</div>
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase text-[#ae3035]">
                    {product.category}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Dimension : {product.dimension}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="font-black text-[#ae3035]">
                      {formatPrice(product.price)}
                      <span className="ml-1 text-xs font-medium text-gray-400">/ {product.unit}</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      value={quantities[product.id] || ""}
                      onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                      placeholder="Quantité"
                      className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#ae3035]"
                    />
                    <button
                      onClick={() => {
                        if ((quantities[product.id] || 0) < 1) {
                          updateQuantity(product.id, 1);
                        }
                        setShowOrder(true);
                      }}
                      className="rounded-lg bg-[#a52b30] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#812126]"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMANDE */}
      <section id="commander" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ae3035]">
              Votre projet commence ici
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Préparez votre commande
            </h2>
            <p className="mt-5 leading-8 text-gray-500">
              Choisissez les produits, renseignez les quantités et transmettez
              votre demande directement à notre équipe sur WhatsApp.
            </p>
            <div className="mt-8 rounded-2xl bg-[#a52b30] p-7 text-white">
              <div className="text-3xl">📦</div>
              <h3 className="mt-4 text-xl font-extrabold">Une commande sur mesure</h3>
              <p className="mt-3 text-sm leading-7 text-red-100">
                Notre équipe pourra vous confirmer la disponibilité, le montant
                définitif et les conditions de livraison.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
            <h3 className="text-xl font-black">Récapitulatif de commande</h3>
            <p className="mt-2 text-sm text-gray-500">
              Vos produits sélectionnés apparaîtront ici.
            </p>

            <div className="mt-6 space-y-3">
              {selectedProducts.length === 0 ? (
                <div className="rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-400">
                  Aucun produit sélectionné pour le moment.
                </div>
              ) : (
                selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 text-sm">
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-xs text-gray-500">
                        {product.dimension} · {product.quantity} {product.unit}(s)
                      </div>
                    </div>
                    <div className="font-bold text-[#ae3035]">
                      {formatPrice(product.subtotal)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 flex justify-between border-t border-gray-200 pt-5 text-lg font-black">
              <span>Total estimatif</span>
              <span className="text-[#ae3035]">{formatPrice(total)}</span>
            </div>

            <div className="mt-7 space-y-4">
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Votre nom complet *"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#ae3035]"
              />
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Votre numéro de téléphone *"
                type="tel"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#ae3035]"
              />
              <input
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                placeholder="Adresse de livraison (facultatif)"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#ae3035]"
              />
              <button
                onClick={sendOrder}
                className="w-full rounded-lg bg-[#168b55] px-5 py-4 font-extrabold text-white shadow-lg transition hover:bg-[#116c42]"
              >
                Envoyer ma commande sur WhatsApp →
              </button>
              <p className="text-center text-xs leading-5 text-gray-400">
                Le montant est estimatif. Les frais de livraison et les modalités
                de paiement seront confirmés par BMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#252525] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <div className="text-2xl font-black">BRIQUETERIE MODERNE DU SÉNÉGAL</div>
            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              Votre partenaire pour la fourniture de briques et matériaux de
              construction. Contactez-nous pour vos commandes et demandes de devis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-extrabold">Contactez notre équipe</h3>
            <div className="mt-5 space-y-4 text-sm">
              <a href="tel:+221762397283" className="block hover:text-red-300">
                ☎ 76 239 72 83
              </a>
              <a href="tel:+221775060367" className="block hover:text-red-300">
                ☎ 77 506 03 67
              </a>
              <a
                href="https://wa.me/221775060367"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-lg bg-[#168b55] px-5 py-3 font-bold text-white transition hover:bg-[#116c42]"
              >
                WhatsApp : discuter avec BMS
              </a>
            </div>
          </div>
        </div>
        
<div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-center text-xs text-gray-500">
  <div>
    © 2026 Briqueterie Moderne du Sénégal (BMS). Tous droits réservés.
  </div>

  <div className="mt-3 text-sm text-gray-400">
    La qualité au service de vos constructions.
  </div>

  <div className="mt-8 border-t border-white/10 pt-8">
    <p className="text-sm font-bold text-white">
      Site web conçu par BCO — Better Call Omar
    </p>

    <p className="mt-3 text-sm text-gray-400">
      Vous souhaitez un site web professionnel pour votre entreprise ?
    </p>

    <a
      href={`https://wa.me/221762704731?text=${encodeURIComponent("Bonjour BCO – Better Call Omar, je viens de visiter un des sites web que vous avez créé et je souhaiterais avoir plus d'informations sur vos services.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-block rounded-full bg-[#00A943] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#008f38] hover:scale-105"
    >
      Contactez BCO sur WhatsApp
    </a>

    <p className="mt-3 text-sm text-gray-500">
      76 270 47 31
    </p>
  </div>
</div>

      </section>

      {/* BOUTON WHATSAPP FLOTTANT */}
      <a
        href="https://wa.me/221775060367"
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter BMS sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#168b55] text-2xl text-white shadow-2xl transition hover:scale-110"
      >
        ☎
      </a>
    </main>
  );
}
