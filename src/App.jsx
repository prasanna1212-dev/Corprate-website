import React, { useEffect, useMemo, useState } from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import "./App.css";
import { allCountries } from "country-telephone-data";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import CardSwap, { Card } from "./components/CardSwap";
import DomeGallery from "./components/DomeGallery";
import kgislLogo from "./assets/kgisl.png";
import bnrLogo from "./assets/bnr.png";
import amenities from "./assets/amenities.png";
import logo from "./assets/wynfra-logo.png";
import leaf from "./assets/leaf.png";
import toast, { Toaster } from "react-hot-toast";
import ChromaGrid from "./components/ChromaGrid";
import SparkleNavbar from "./components/SparkleNavbar";
import team1 from "./assets/Team/team1.jpg";
import Team2 from "./assets/Team/Team2.jpg";
import team3 from "./assets/Team/team3.jpg";
import bnr1 from "./assets/BNR01(1).jpg";
import bnr2 from "./assets/BNR01(2).jpg";
import bnr3 from "./assets/BNR01(3).jpg";
import bnr4 from "./assets/BNR01(4).jpg";
import bnr10 from "./assets/BNR01(10).jpg";
import bnr11 from "./assets/BNR01(11).jpg";
import bnr12 from "./assets/BNR01(12).jpg";
import bnr13 from "./assets/BNR01(13).jpg";
import bnr14 from "./assets/BNR01(14).jpg";
import carousel0 from "./assets/carousel0.jpg";
import carousel1 from "./assets/carousel1.jpg";
import carousel2 from "./assets/carousel2.jpg";
import carousel3 from "./assets/carousel3.jpg";

// clientLogo folder (as per screenshot filenames)
import logo13_jif from "./assets/clientLogo/logo(13).jfif";
import logo13_jpg from "./assets/clientLogo/logo(13).jpg";
import logo13_png from "./assets/clientLogo/logo(13).png";
import logo13_svg from "./assets/clientLogo/logo(13).svg";
import logo13_webp from "./assets/clientLogo/logo(13).webp";
import logo14_jfif from "./assets/clientLogo/logo(14).jfif";
import logo14_jpg from "./assets/clientLogo/logo(14).jpg";
import logo14_png from "./assets/clientLogo/logo(14).png";
import logo14_svg from "./assets/clientLogo/logo(14).svg";
import logo14_webp from "./assets/clientLogo/logo(14).webp";
import logo15_jfif from "./assets/clientLogo/logo(15).jfif";
import logo15_jpg from "./assets/clientLogo/logo(15).jpg";
import logo15_png from "./assets/clientLogo/logo(15).png";
import logo15_webp from "./assets/clientLogo/logo(15).webp";
import logo16_jfif from "./assets/clientLogo/logo(16).jfif";
import logo16_jpg from "./assets/clientLogo/logo(16).jpg";
import logo16_png from "./assets/clientLogo/logo(16).png";
import logo17_jfif from "./assets/clientLogo/logo(17).jfif";
import logo17_png from "./assets/clientLogo/logo(17).png";
import logo18_jfif from "./assets/clientLogo/logo(18).jfif";
import logo18_jpg from "./assets/clientLogo/logo(18).jpg";
import logo18_png from "./assets/clientLogo/logo(18).png";
import logo19_jfif from "./assets/clientLogo/logo(19).jfif";
import logo19_png from "./assets/clientLogo/logo(19).png";
import logo20_png from "./assets/clientLogo/logo(20).png";
import logo21_png from "./assets/clientLogo/logo(21).png";
import logo22_png from "./assets/clientLogo/logo(22).png";
import logo23_png from "./assets/clientLogo/NTTData.png";
import logo24_png from "./assets/clientLogo/logo(24).png";
import logo25_png from "./assets/clientLogo/logo(25).png";
import logo26_png from "./assets/clientLogo/logo(26).png";
import logo27_png from "./assets/clientLogo/logo(27).png";
import logo28_png from "./assets/clientLogo/logo(28).png";
import logo29_png from "./assets/clientLogo/logo(29).png";
import logo30_png from "./assets/clientLogo/logo(30).png";
import logo31_png from "./assets/clientLogo/logo(31).png";
import logo32_png from "./assets/clientLogo/logo(32).png";
import logo33_png from "./assets/clientLogo/logo(33).png";
import logo34_png from "./assets/clientLogo/logo(34).png";
import logo35_png from "./assets/clientLogo/logo(35).png";
import logo36_png from "./assets/clientLogo/logo(36).png";
import logo37_png from "./assets/clientLogo/logo(37).png";
import logo38_png from "./assets/clientLogo/bosch.png";
import logo39_png from "./assets/clientLogo/dell.png";
import logo40_png from "./assets/clientLogo/logo(40).png";
import logo41_png from "./assets/clientLogo/logo(41).png";
import logo42_png from "./assets/clientLogo/logo(42).png";

import clearancePDF from "./assets/Enviornment Clearance 18.06.2024-Wynfra.pdf";

const teamData = [
  {
    image: team1,
    title: "Dr.Ashok Bakthavathsalam",
    subtitle: "Founder & Managing Director",
    handle: "@drashokb",
    location: "Wynfra Leadership",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg, #4F46E5 0%, #1a1a2e 100%)",
    url: "mailto:founder@wynfracybercity.in",
  },
  {
    image: Team2,
    title: "Jayamurali Balaguruswamy",
    subtitle: "Director & CEO",
    handle: "@jayamuralib",
    location: "Executive Office",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981 0%, #1a1a2e 100%)",
    url: "mailto:ceo@wynfracybercity.in",
  },
  {
    image: team3,
    title: "Devaraj Palanisamy",
    subtitle: "Group Senior Vice President",
    handle: "@devarajp",
    location: "Strategic Operations",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B 0%, #1a1a2e 100%)",
    url: "mailto:svp@wynfracybercity.in",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.14 });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuickArrow, setShowQuickArrow] = useState(false);
  useEffect(() => {
    const sections = [
      { id: "about", index: 0 },
      { id: "gallery", index: 1 },
      { id: "experience", index: 2 },
      { id: "partners", index: 2 }, // Maps to Experience in nav
      { id: "team", index: 3 },
      { id: "contact", index: 4 },
    ];

    const handleScroll = () => {
      setShowQuickArrow(window.scrollY > 200);

      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      let currentSectionIndex = 0;

      // Special case: if we're near bottom of page, always show contact
      if (window.scrollY + windowHeight >= documentHeight - 100) {
        currentSectionIndex = 4; // Contact section
        console.log(`Active section: contact (index: 4) - Bottom of page`);
      } else {
        sections.forEach(({ id, index }) => {
          const element = document.getElementById(id);
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              currentSectionIndex = index;
              console.log(`Active section: ${id} (index: ${index})`);
            }
          }
        });
      }

      setCurrentSection(currentSectionIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      block: "start",
    });
  };
  const downloadClearance = () => {
    const link = document.createElement("a");
    link.href = clearancePDF;
    link.download = "Environment Clearance 18.06.2024-Wynfra.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // ✅ Scroll-driven hero motion
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 900], [1.05, 1.18]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, -28]);
  const heroTextOpacity = useTransform(scrollY, [0, 420], [1, 0.78]);

  const galleryImages = useMemo(
    () => [
      { src: bnr1, alt: "Campus Overview" },
      { src: bnr2, alt: "Arrival Experience" },
      { src: bnr3, alt: "Landscape & Greens" },
      { src: bnr4, alt: "Modern Architecture" },

      { src: bnr10, alt: "Office Infrastructure" },
      { src: bnr11, alt: "Open Workspaces" },
      { src: bnr12, alt: "Sustainable Design" },
      { src: bnr13, alt: "Community Spaces" },
      { src: bnr14, alt: "Integrated Campus View" },

      { src: carousel0, alt: "Amenities & Facilities" },
      { src: carousel1, alt: "Central Amphitheater" },
      { src: carousel2, alt: "Workplace Environment" },
      { src: carousel3, alt: "Urban Connectivity" },
    ],
    []
  );

  const partnersRow1 = useMemo(
    () => [
      // Row 1 (24 logos)
      logo13_jif,
      logo13_jpg,
      logo13_png,
      logo13_svg,
      logo13_webp,
      logo14_jfif,
      logo14_jpg,
      logo14_png,
      logo14_svg,
      logo14_webp,
      logo15_jfif,
      logo15_jpg,
      logo15_png,
      logo15_webp,
      logo16_jfif,
      logo16_jpg,
      logo16_png,
      logo17_jfif,
      logo17_png,
      logo18_jfif,
      logo18_jpg,
      logo18_png,
      logo41_png,
    ],
    []
  );

  const partnersRow2 = useMemo(
    () => [
      // Row 2 (24 logos)
      logo19_jfif,
      logo19_png,
      logo20_png,
      logo21_png,
      logo22_png,
      logo23_png,
      logo24_png,
      logo25_png,
      logo26_png,
      logo27_png,
      logo28_png,
      logo29_png,
      logo30_png,
      logo31_png,
      logo32_png,
      logo33_png,
      logo34_png,
      logo35_png,
      logo36_png,
      logo37_png,
      logo38_png,
      logo39_png,
      logo40_png,
      logo42_png,
    ],
    []
  );

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    country_iso2: "IN",
    dial_code: "+91",
    phone: "",
    interested_in: [],
    area_sqft_range: "",
    message: "",
  });

  const submitEnquiry = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://172.30.6.12:5190/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          country_iso2: form.country_iso2,
          dial_code: form.dial_code,
          phone_number: form.phone,
          interested_in: form.interested_in,
          area_sqft_range: form.area_sqft_range,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || "Bad request");
      }

      toast.success(
        "Thank you for reaching us. Your Enquiry submitted successfully!"
      );
      setForm({
        name: "",
        company: "",
        email: "",
        country_iso2: "IN",
        dial_code: "+91",
        phone: "",
        area_sqft_range: "",
        interested_in: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Oops! Failed to submit enquiry.");
    }
  };

  return (
    <div className="page">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "14px",
            padding: "12px 14px",
            fontWeight: 700,
          },
        }}
      />
      {/* cinematic fixed background */}
      <div className="fixedBg" aria-hidden="true" />

      <Header currentSection={currentSection} showQuickArrow={showQuickArrow} />

      {/* HERO */}
      <section className="hero" id="top">
        <motion.div
          className="hero__bg"
          style={{ y: heroY, scale: heroScale }}
          aria-hidden="true"
        >
          <img src={bnr1} alt="" />
        </motion.div>

        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__inner">
          <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }}>
            <Reveal>
              <div className="heroCard">
                <div className="eyebrow eyebrow--light">Wynfra Cybercity</div>
                <h1 className="h1">
                  A future-ready tech campus for the next decade.
                </h1>
                <p className="p p--light">
                  A premium, scalable business architecture and sustainable
                  design, stands at the forefront of the KGISL-SEZ Tech Hub in
                  Saravanampatti. Spanning 1.9 million sqft, it offers a blend
                  of Special Economic Zone (SEZ) and Non-SEZ facilities,
                  catering to various business needs.
                </p>

                <div className="ctaRow">
                  <a className="btn btn--primary" href="#about">
                    Explore <FiArrowUpRight />
                  </a>
                  <a className="btn btn--ghost" href="#gallery">
                    View Gallery
                  </a>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>

        <div className="scrollHint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section--tight" id="about">
        <div className="container">
          <div className="grid2">
            <Reveal>
              <div className="whyWrap">
                <div className="whyTitle">
                  WHY &nbsp;WYNFRA &nbsp;CYBERCITY?
                </div>

                <div className="whyMini">
                  <div className="whyMini__head">
                    <span className="whyMini__icon">
                      <TrendingUp size={16} strokeWidth={2.4} />
                    </span>
                    <h3 className="whyMini__h">Market Powerhouse</h3>
                  </div>
                  <ul className="whyMini__list">
                    <li>70,000+ fresh graduates every year</li>
                    <li>120,000+ strong tech talent pool</li>
                    <li>₹1.76 lakh crore tech exports from Tamil Nadu</li>
                    <li>Recognized as a Micro-IT hub by the World Bank</li>
                  </ul>
                </div>

                <div className="whyMini">
                  <div className="whyMini__head">
                    <span className="whyMini__icon">
                      <Sparkles size={16} strokeWidth={2.4} />
                    </span>
                    <h3 className="whyMini__h">Lifestyle at Its Best</h3>
                  </div>
                  <ul className="whyMini__list">
                    <li>Dedicated power & water infrastructure</li>
                    <li>WELLNESS / LEED / NET-ZERO certifications</li>
                    <li>
                      Dedicated transportation connectivity to Coimbatore
                      Junction
                    </li>
                    <li className="whyLegacy">
                      100+ years legacy partnership with
                      <span className="whyLegacy__logos">
                        <img src={kgislLogo} alt="KGISL" />
                        and
                        <img src={bnrLogo} alt="BNR" />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div style={{ height: "400px", position: "relative" }}>
                <CardSwap
                  width={420}
                  height={280}
                  cardDistance={45}
                  verticalDistance={55}
                  delay={4000}
                  pauseOnHover={true}
                  skewAmount={4}
                  easing="elastic"
                >
                  <Card customClass="about-card">
                    <div className="about-card__content">
                      <img src={carousel1} alt="Campus Overview" />
                      <div className="about-card__info">
                        <h4>Campus Overview</h4>
                        <p>
                          Premium infrastructure designed for enterprise growth
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card customClass="about-card">
                    <div className="about-card__content">
                      <img src={carousel0} alt="Arrival Experience" />
                      <div className="about-card__info">
                        <h4>Smart Environment</h4>
                        <p>
                          Future-ready technology ecosystem with sustainable
                          planning
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card customClass="about-card">
                    <div className="about-card__content">
                      <img src={carousel2} alt="Green Landscape" />
                      <div className="about-card__info">
                        <h4>Green Innovation</h4>
                        <p>
                          Eco-friendly campus with modern architectural identity
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card customClass="about-card">
                    <div className="about-card__content">
                      <img src={carousel3} alt="Green Spine" />
                      <div className="about-card__info">
                        <h4>Business Hub</h4>
                        <p>
                          Scalable workspaces for IT, ITES & innovation
                          enterprises
                        </p>
                      </div>
                    </div>
                  </Card>
                </CardSwap>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY (animated cards) */}
      <section className="section section--gallery" id="gallery">
        <div className="container">
          <div className="galleryHead">
            <Reveal>
              <div className="sectionHead sectionHead--center">
                <div className="eyebrow">Visual Experience</div>
                <h2 className="h2">360° Interactive Gallery</h2>
                <p className="p p--muted">
                  Explore our premium campus in an immersive 3D dome experience
                </p>
              </div>
            </Reveal>
          </div>

          <div className="domeGallery-wrapper">
            <DomeGallery
              images={galleryImages}
              fit={0.7} // ✅ Reduced
              fitBasis="auto"
              minRadius={400} // ✅ Reduced
              maxRadius={900} // ✅ Reduced
              padFactor={0.2} // ✅ More padding for viewer
              overlayBlurColor="#f8fafc"
              maxVerticalRotationDeg={12} // ✅ Reduced rotation
              dragSensitivity={18} // ✅ Less sensitive
              enlargeTransitionMs={400} // ✅ Slower transition
              segments={20} // ✅ Fewer segments
              dragDampening={1.0} // ✅ Less dampening
              openedImageWidth="600px" // ✅ Reasonable size
              openedImageHeight="400px" // ✅ Reasonable size
              imageBorderRadius="16px"
              openedImageBorderRadius="20px"
              grayscale={false}
            />
          </div>
        </div>
      </section>

      {/* FEATURE BANNER (split layout like ref) */}
      <section className="section section--banner" id="experience">
        <div className="banner banner--split">
          {/* Left image */}
          <div className="bannerSplit__img" aria-hidden="true">
            <img src={bnr4} alt="" />
          </div>

          {/* Right content panel */}
          <div className="bannerSplit__panel">
            <div className="container bannerSplit__panelInner">
              <Reveal>
                {/* <div className="banner__card"> */}
                <div>
                  <div className="eyebrow eyebrow--light">Experience</div>
                  <h2 className="h2 h2--light">
                    A campus that feels premium, calm, and future-proof.
                  </h2>
                  <p className="p p--light">
                    Seamlessly uniting SEZ and Non-SEZ zones with flexible floor
                    plates from 15,000 to 3,50,000 sq.ft. Choose Warm Shell,
                    Built-to-Suit, or Plug-and-Play workspaces, designed to
                    adapt to your business vision. A vibrant campus experience
                    with landscaped greens and a central amphitheater that
                    encourages collaboration and community.
                  </p>
                  <div className="ctaRow">
                    <a className="btn btn--primary" href="#contact">
                      Schedule a Visit <FiArrowUpRight />
                    </a>
                    <a className="btn btn--ghost" href="#contact">
                      Enquire
                    </a>
                  </div>
                </div>

                {/* ✅ AMENITIES GRID */}
                <Reveal>
                  <div className="bannerAmenities">
                    <img src={amenities} alt="Campus Amenities" />
                  </div>
                </Reveal>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section section--partners" id="partners">
        <div className="container">
          <Reveal>
            <div className="sectionHead sectionHead--center">
              <div className="eyebrow">Trusted By</div>
              <h2 className="h2">Our Clients</h2>
              <p className="p p--muted">
                Leading enterprises trust Wynfra for their business growth
              </p>
            </div>
          </Reveal>

          {/* First Marquee - Left Moving */}
          <div className="partnersMarquee partnersMarquee--first">
            <div className="partnersTrack">
              {partnersRow1.map((src, i) => (
                <div key={i} className="partnerLogo">
                  <img src={src} alt={`Partner ${i + 1}`} loading="lazy" />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partnersRow1.map((src, i) => (
                <div key={`dup-${i}`} className="partnerLogo">
                  <img src={src} alt={`Partner ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="partnersMarquee__fadeLeft" aria-hidden="true"></div>
            <div
              className="partnersMarquee__fadeRight"
              aria-hidden="true"
            ></div>
          </div>

          {/* Second Marquee - Right Moving */}
          <div className="partnersMarquee partnersMarquee--second">
            <div className="partnersTrack partnersTrack--right">
              {partnersRow2.map((src, i) => (
                <div key={i} className="partnerLogo">
                  <img src={src} alt={`Partner ${i + 25}`} loading="lazy" />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partnersRow2.map((src, i) => (
                <div key={`dup2-${i}`} className="partnerLogo">
                  <img src={src} alt={`Partner ${i + 25}`} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="partnersMarquee__fadeLeft" aria-hidden="true"></div>
            <div
              className="partnersMarquee__fadeRight"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </section>

      {/* TEAM SPOTLIGHT */}
      {/* TEAM (Reference design) */}
      <section className="proTeam" id="team">
        <div className="container">
          <div className="proTeam__head">
            <div className="proTeam__kicker">TEAM</div>
            <h2 className="proTeam__title">Our Professional Team</h2>
            <p className="proTeam__sub">
              Our leaders bring together deep domain expertise and forward-thinking
              leadership to create an ecosystem where businesses, talent, and innovation
              thrive.
            </p>
          </div>

          <div className="proTeam__stage">
            <div className="proTeam__dots" aria-hidden="true" />
            <div className="proTeam__bg" aria-hidden="true" />

            <div className="proTeam__grid">
              {teamData.slice(0, 3).map((p, idx) => (
                <article
                  key={idx}
                  className={`proCard ${idx === 1 ? "isMiddle" : ""}`}
                >
                  <div className="proCard__imgWrap">
                    <img src={p.image} alt={p.title} />
                  </div>

                  <div className="proCard__pill">
                    <div className="proCard__name">{p.title}</div>
                    <div className="proCard__role">{p.subtitle}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <div className="footerLeaf">
            <img src={leaf} alt="leaf" />

            <div className="contactGrid">
              <Reveal>
                <div>
                  <div className="eyebrow">Contact</div>
                  <h2 className="h2">Enquire with us</h2>
                  <p className="p p--muted">
                    Share your requirement and our team will connect with you.
                  </p>

                  <div className="infoPills">
                    <div className="pill">
                      <div className="pill__k">
                        <FiMapPin /> Address
                      </div>
                      <div className="pill__v">
                        WYNFRA CYBERCITY LLP, No-7/471, KGISL SEZ, Keeranatham
                        Village, Saravanampatti, Coimbatore - 641035
                      </div>
                    </div>

                    <div className="pill">
                      <div className="pill__k">
                        <FiMail /> Contact
                      </div>
                      <div className="pill__v">
                        74185 05999 &nbsp;|&nbsp; ceo@wynfracybercity.in
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <motion.form
                  className="formGlass"
                  onSubmit={submitEnquiry}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="formRow">
                    <input
                      className="input"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />

                    <input
                      className="input"
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                    />
                  </div>
                  <div className="formRow">
                    <input
                      className="input"
                      placeholder="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    <PhoneInput
                      value={{
                        country_iso2: form.country_iso2,
                        dial_code: form.dial_code,
                        phone: form.phone,
                      }}
                      onChange={(next) => setForm({ ...form, ...next })}
                    />
                  </div>
                  <div className="formRow formRow--full">
                    <div className="formGroup">
                      <label className="formLabel">Interested In</label>

                      <div className="interestRow">
                        <label className="interestOption">
                          <input
                            type="radio"
                            name="interested_in"
                            value="Fully Furnished Workspace"
                            checked={
                              form.interested_in === "Fully Furnished Workspace"
                            }
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                interested_in: e.target.value,
                              }));
                            }}
                          />
                          <span>Fully Furnished Workspace</span>
                        </label>

                        <label className="interestOption">
                          <input
                            type="radio"
                            name="interested_in"
                            value="Unfurnished (Bare Shell) Space"
                            checked={
                              form.interested_in ===
                              "Unfurnished (Bare Shell) Space"
                            }
                            onChange={(e) =>
                              setForm({
                                ...form,
                                interested_in: e.target.value,
                              })
                            }
                          />
                          <span>Unfurnished (Bare Shell) Space</span>
                        </label>
                      </div>
                      {form.interested_in && (
                        <div className="areaRow">
                          <label className="formLabel">
                            Choose Area Sq. ft.
                          </label>
                          <select
                            className="input"
                            value={form.area_sqft_range}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                area_sqft_range: e.target.value,
                              })
                            }
                            required={!!form.interested_in} // ✅ required once selected
                          >
                            <option value="">Choose Area Sq. ft.</option>
                            <option value="< 1000">&lt; 1000</option>
                            <option value="1000 - 10,000">1000 - 10,000</option>
                            <option value="10,001 - 50,000">
                              10,001 - 50,000
                            </option>
                            <option value="> 50,000">&gt; 50,000</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  <textarea
                    className="textarea"
                    placeholder="Message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  <button className="btn btn--full" type="submit">
                    Submit Enquiry
                  </button>
                </motion.form>
              </Reveal>
            </div>
          </div>
          <footer className="footer">
            <div className="footer__left">
              <img className="footer__logo" src={logo} alt="Wynfra" />
              <div>
                <div className="footer__brand">Wynfra Cybercity</div>
                <div className="footer__muted">
                  Future-ready commercial & technology ecosystem.
                </div>
              </div>
            </div>

            <div className="footer__right">
              <a href="#about">About</a>
              <a href="#gallery">Gallery</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
              <div
                className="footer__clearance"
                onClick={downloadClearance}
                type="button"
              >
                Clearance Doc
              </div>
            </div>
          </footer>
        </div>
      </section>

      <motion.button
  className="quickArrow"
  onClick={scrollToTop}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{
    opacity: showQuickArrow ? 1 : 0,
    scale: showQuickArrow ? 1 : 0.8,
    y: showQuickArrow ? 0 : 20
  }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  style={{
    pointerEvents: showQuickArrow ? 'auto' : 'none',
    '--dynamic-color': getSectionColor(currentSection),
    '--dynamic-hover-color': getSectionHoverColor(currentSection),
    '--dynamic-shadow': getSectionShadow(currentSection)
  }}
  aria-label="Back to top"
>
  <FiArrowUpRight style={{ transform: 'rotate(-45deg)' }} />
</motion.button>
    </div>
  );
}

// Update these functions in your App.jsx
const getSectionColor = (sectionIndex) => {
  const colors = {
    0: 'rgba(78, 70, 229, 0.39)',   // About - Lighter on hover
    1: 'rgba(16, 185, 129, 0.38)',  // Gallery
    2: 'rgba(245, 159, 11, 0.38)',  // Experience
    3: 'rgba(138, 92, 246, 0.38)',  // Team
    4: 'rgba(236, 72, 154, 0.39)',  // Contact
  };
 
  return colors[sectionIndex] || 'rgba(79, 70, 229, 1)';
};
 
const getSectionHoverColor = (sectionIndex) => {
    const colors = {
    0: 'rgba(79, 70, 229, 1)',     // About - Primary Blue
    1: 'rgba(16, 185, 129, 1)',    // Gallery - Green
    2: 'rgba(245, 158, 11, 1)',    // Experience - Orange
    3: 'rgba(139, 92, 246, 1)',    // Team - Purple
    4: 'rgba(236, 72, 153, 1)',    // Contact - Pink
  };
 
  return colors[sectionIndex] || 'rgba(78, 70, 229, 0.18)';
};
 
const getSectionShadow = (sectionIndex) => {
  const shadows = {
    0: 'rgba(79, 70, 229, 0.25)',   // About
    1: 'rgba(16, 185, 129, 0.25)',  // Gallery
    2: 'rgba(245, 158, 11, 0.25)',  // Experience
    3: 'rgba(139, 92, 246, 0.25)',  // Team
    4: 'rgba(236, 72, 153, 0.25)',  // Contact
  };
  return shadows[sectionIndex] || 'rgba(79, 70, 229, 0.25)';
};

function Header({ currentSection, showQuickArrow }) {
  const { scrollY } = useScroll();

  // Background: glass → solid white
  const bg = useTransform(
    scrollY,
    [0, 40],
    ["rgba(255, 255, 255, 0.55)", "rgba(255, 255, 255, 1)"]
  );

  // Blur: on → off
  const blur = useTransform(scrollY, [0, 40], ["blur(18px)", "blur(0px)"]);

  // Border becomes slightly stronger
  const border = useTransform(
    scrollY,
    [0, 40],
    ["rgba(11, 19, 34, 0.08)", "rgba(11, 19, 34, 0.12)"]
  );

  // Shadow appears on scroll
  const shadow = useTransform(
    scrollY,
    [0, 40],
    ["0 0 0 rgba(0,0,0,0)", "0 10px 25px rgba(10,18,35,0.10)"]
  );

  const handleNavClick = (item, index) => {
    const sectionMap = {
      About: "#about",
      Gallery: "#gallery",
      Experience: "#experience",
      Team: "#team",
      Contact: "#contact",
    };

    const targetSection = sectionMap[item];
    if (targetSection) {
      document.querySelector(targetSection)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      className="header"
      style={{
        background: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderBottomColor: border,
        boxShadow: shadow,
      }}
    >
      <div className="container header__inner">
        <a className="brand" href="#top" aria-label="Wynfra Cybercity">
          <img className="brand__logo" src={logo} alt="Wynfra logo" />
        </a>

        <SparkleNavbar
          items={["About", "Gallery", "Experience", "Team", "Contact"]}
          color="#6ab9e4ff"
          onItemClick={handleNavClick}
          activeIndex={currentSection}
        />

        <a className="btn btn--small" href="#contact">
          Enquire
        </a>
      </div>
    </motion.header>
  );
}

function PhoneInput({ value, onChange }) {
  const flagUrl = (iso2) =>
    `https://flagcdn.com/24x18/${iso2.toLowerCase()}.png`;

  const countries = useMemo(() => {
    return (allCountries || [])
      .map((c) => {
        const name = Array.isArray(c) ? c[0] : c?.name;
        const iso2Raw = Array.isArray(c) ? c[1] : c?.iso2;
        const dialRaw = Array.isArray(c) ? c[2] : c?.dialCode;
        if (!name || !iso2Raw || !dialRaw) return null;

        const iso2 = String(iso2Raw).toUpperCase();
        const dial = `+${String(dialRaw).replace(/\D/g, "")}`;
        if (iso2.length !== 2) return null;

        return { name: String(name), iso2, dial };
      })
      .filter(Boolean)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!countries.length) return;
    if (selected) return;

    const byValue = countries.find((c) => c.iso2 === value?.country_iso2);
    const india = countries.find((c) => c.iso2 === "IN");
    const initial = byValue || india || countries[0];

    setSelected(initial);
    onChange?.({ country_iso2: initial.iso2, dial_code: initial.dial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries.length]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest(".phoneInput")) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.dial.includes(q)
    );
  }, [countries, query]);

  if (!selected) return null;

  return (
    <div className="phoneInput">
      {/* Left selector */}
      <button
        type="button"
        className="phoneSelect"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <img
          className="phoneSelectFlag"
          src={flagUrl(selected.iso2)}
          alt={`${selected.iso2} flag`}
          loading="lazy"
        />
        <span className="dial">{selected.dial}</span>
        <span className="caret">▾</span>
      </button>

      {/* Right input */}
      <input
        className="phoneNumber"
        placeholder="123-456-7890"
        inputMode="tel"
        value={value?.phone || ""}
        onChange={(e) => onChange?.({ phone: e.target.value })}
      />

      {/* Dropdown */}
      {open && (
        <div className="phoneDropdown">
          <div className="phoneSearch">
            <input
              className="phoneSearchInput"
              placeholder="Search country or code…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="phoneList">
            {filtered.slice(0, 180).map((c) => (
              <button
                key={`${c.iso2}-${c.dial}`}
                type="button"
                className="phoneOption"
                onClick={() => {
                  setSelected(c);
                  setOpen(false);
                  setQuery("");
                  onChange?.({ country_iso2: c.iso2, dial_code: c.dial });
                }}
              >
                <img
                  className="phoneOptionFlag"
                  src={flagUrl(c.iso2)}
                  alt=""
                  loading="lazy"
                />
                <span className="name">
                  {c.name} ({c.dial})
                </span>
              </button>
            ))}
          </div>

          <div className="phoneFooter">
            Showing {Math.min(filtered.length, 180)} of {filtered.length}
          </div>
        </div>
      )}
    </div>
  );
}
