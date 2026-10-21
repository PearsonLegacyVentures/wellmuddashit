import { useEffect, useMemo, useRef, useState } from "react";

const nav = [
  ["The Roll", "roll"],
  ["Hospitality", "hospitality"],
  ["Our Story", "story"],
  ["FAQ", "faq"],
];

const ticker = [
  "SOFT WHERE IT MATTERS",
  "BORN IN THE BAHAMAS",
  "GOOD PAPER. BAD TIMING.",
  "WELL MUDDA S____",
];

const blankWords = ["SOFT.", "SERIOUS.", "STOCKED.", "SMOOTH.", "S____."];

function Logo({ compact = false }) {
  return (
    <div className={compact ? "logo logo--compact" : "logo"} aria-label="Well Mudda S blank">
      <span>WELL</span>
      <span>MUDDA</span>
      <span className="logo__last">S<span className="redact" /></span>
    </div>
  );
}

function Pack({ dark = false, small = false }) {
  return (
    <div className={`pack ${dark ? "pack--dark" : ""} ${small ? "pack--small" : ""}`}>
      <div className="pack__gloss" />
      <span className="pack__count">{small ? "48" : "12"}<small>ROLLS</small></span>
      <Logo compact={small} />
      <div className="pack__meta">{small ? "HOSPITALITY / COMMERCIAL" : "PREMIUM 3-PLY · IN DEVELOPMENT"}</div>
      <div className="pack__stripe" />
      <div className="pack__rolls" aria-hidden="true">
        {Array.from({ length: small ? 6 : 8 }).map((_, i) => <i key={i} />)}
      </div>
      <span className="pack__born">BORN IN<br />THE BAHAMAS</span>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [blankIndex, setBlankIndex] = useState(0);
  const [faq, setFaq] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setBlankIndex((v) => (v + 1) % blankWords.length), 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onPointer = (event) => {
      if (!heroRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * -9;
      heroRef.current.style.setProperty("--rx", `${y}deg`);
      heroRef.current.style.setProperty("--ry", `${x}deg`);
    };
    window.addEventListener("pointermove", onPointer);
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  const faqs = useMemo(() => [
    ["Can I buy it yet?", "Not yet. Well Mudda S____ is currently in product development. We are validating the roll, packaging, manufacturing route and launch economics before taking orders."],
    ["Is it made in The Bahamas?", "Well Mudda S____ is a Bahamian brand. We are evaluating third-party manufacturing partners. The final manufacturing origin will be stated clearly before launch."],
    ["What will the first product be?", "The current launch concept is a premium 3-ply household roll in a bold 12-roll consumer pack, with a hospitality case format using the same core product. Final specifications are still being validated."],
    ["Are you supplying hotels and villas?", "That is one of our first intended channels. Villas, short-term rental operators, boutique hotels and other hospitality businesses can register interest for early supply conversations."],
  ], []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="nav">
        <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>WMS____</button>
        <nav className={menu ? "nav__links nav__links--open" : "nav__links"}>
          {nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        </nav>
        <button className="nav__cta" onClick={() => go("launch")}>GET FIRST DIBS <span>↗</span></button>
        <button className="menu" onClick={() => setMenu(v => !v)} aria-label="Toggle navigation">{menu ? "×" : "≡"}</button>
      </header>

      <section className="hero">
        <div className="hero__noise" />
        <div className="hero__copy">
          <span className="eyebrow"><i /> PRE-LAUNCH · NASSAU, THE BAHAMAS</span>
          <h1>
            THE BAHAMAS<br />
            HAS ENOUGH<br />
            <span>BORING</span> TOILET<br />
            PAPER.
          </h1>
          <p>A new Bahamian paper brand built to sit pretty in your bathroom, your villa, your hotel — and eventually, a shelf far beyond the 242.</p>
          <div className="hero__actions">
            <button className="button button--black" onClick={() => go("roll")}>MEET THE ROLL <span>↓</span></button>
            <button className="button button--ghost" onClick={() => go("hospitality")}>FOR HOSPITALITY</button>
          </div>
        </div>

        <div className="hero__visual" ref={heroRef}>
          <div className="sun" />
          <div className="hero__pack"><Pack /></div>
          <div className="stamp stamp--one">GOOD<br />PAPER.</div>
          <div className="stamp stamp--two">BAD<br />TIMING.</div>
          <div className="micro-copy">THE LITTLE DETAILS<br />MAKE THE BIGGER STAYS.</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          {[...ticker, ...ticker].map((item, i) => <span key={i}>{item}<b>✦</b></span>)}
        </div>
      </div>

      <section className="blank-section">
        <span className="section-tag">01 / THE BRAND</span>
        <div className="blank-section__grid">
          <h2>YOU ALREADY<br />FINISHED THE<br />SENTENCE.</h2>
          <div className="blank-section__right">
            <div className="blank-live">WELL MUDDA <span key={blankWords[blankIndex]}>{blankWords[blankIndex]}</span></div>
            <p>The blank is the joke. The restraint is the brand. Clean enough for a hotel. Loud enough to stop somebody in the aisle.</p>
          </div>
        </div>
      </section>

      <section className="roll" id="roll">
        <div className="roll__head">
          <span className="section-tag section-tag--light">02 / THE ROLL</span>
          <h2>SOFT WHERE<br />IT MATTERS.</h2>
          <p>One launch product. No SKU circus. We are developing a premium household roll that can work for consumers and hospitality without pretending the final spec is finished before it is.</p>
        </div>

        <div className="roll__stage">
          <div className="roll-object">
            <div className="roll-object__side"><Logo compact /></div>
            <div className="roll-object__hole" />
          </div>
          <div className="roll__specs">
            <div><strong>3</strong><span>PLY<br /><small>LAUNCH TARGET</small></span></div>
            <div><strong>12</strong><span>ROLLS<br /><small>CONSUMER PACK</small></span></div>
            <div><strong>01</strong><span>CORE SKU<br /><small>KEEP IT LEAN</small></span></div>
            <p>Final sheet count, fibre composition, embossing and performance claims will be published after supplier sampling and production validation.</p>
          </div>
        </div>
      </section>

      <section className="hospitality" id="hospitality">
        <div className="hospitality__copy">
          <span className="section-tag">03 / HOSPITALITY</span>
          <h2>YOUR GUEST<br />NOTICES THE<br /><em>LITTLE</em> S____.</h2>
          <p>Our intended first wedge: villas, short-term rentals, boutique hotels and hospitality operators that care about presentation, reliable restocking and the details guests actually touch.</p>
          <button className="text-link" onClick={() => go("launch")}>REGISTER HOSPITALITY INTEREST <span>↗</span></button>
        </div>
        <div className="hospitality__visual">
          <div className="hotel-card">
            <span>WELL MUDDA S____</span>
            <strong>48</strong>
            <small>ROLL HOSPITALITY CASE<br />CONCEPT FORMAT</small>
          </div>
          <Pack dark small />
        </div>
      </section>

      <section className="manifesto" id="story">
        <span className="section-tag section-tag--light">04 / WHY THIS EXISTS</span>
        <p className="manifesto__kicker">WE ARE NOT TRYING TO INVENT TOILET PAPER.</p>
        <h2>WE'RE TRYING TO MAKE<br />PEOPLE <span>CARE</span> WHICH<br />ONE THEY BUY.</h2>
        <div className="manifesto__bottom">
          <p>Born in The Bahamas. Designed with enough personality to travel. Well Mudda S____ is being built as a serious consumer brand first — with hospitality as a practical route to prove demand.</p>
          <div className="bahamas-mark"><i /> 25.0° N<br />77.4° W</div>
        </div>
      </section>

      <section className="campaign">
        <div className="campaign__panel campaign__panel--blue">
          <span>CAMPAIGN 001</span>
          <h3>WELL MUDDA…<br />WE MADE SOME<br />S____.</h3>
          <p>Launch loud. Sell clean.</p>
        </div>
        <div className="campaign__panel campaign__panel--bone">
          <span>CAMPAIGN 002</span>
          <h3>GOOD PAPER.<br />BAD TIMING.</h3>
          <div className="mini-roll" />
        </div>
        <div className="campaign__panel campaign__panel--black">
          <span>CAMPAIGN 003</span>
          <h3>SOFT<br />WHERE IT<br />MATTERS.</h3>
          <p>Some things should never be rough.</p>
        </div>
      </section>

      <section className="faq" id="faq">
        <span className="section-tag">05 / FAQ</span>
        <div className="faq__grid">
          <h2>THE S____<br />PEOPLE ASK.</h2>
          <div className="faq__list">
            {faqs.map(([q, a], i) => (
              <button className={faq === i ? "faq__item faq__item--open" : "faq__item"} onClick={() => setFaq(faq === i ? -1 : i)} key={q}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{q}</strong>{faq === i && <p>{a}</p>}</div>
                <b>{faq === i ? "−" : "+"}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="launch" id="launch">
        <div className="launch__inner">
          <span className="eyebrow eyebrow--light"><i /> BUILDING IN PUBLIC · PRE-LAUNCH</span>
          <h2>GET FIRST<br />DIBS ON THE<br />GOOD S____.</h2>
          <p>We're still developing the product, validating manufacturing and building the first release. Consumer and hospitality launch details are coming next.</p>
          <div className="launch__actions">
            <button className="button button--bone" onClick={() => go("roll")}>SEE THE PRODUCT CONCEPT</button>
            <button className="button button--outline-light" onClick={() => go("hospitality")}>HOSPITALITY INTEREST</button>
          </div>
          <small>No fake countdowns. No fake stock. We'll launch when the product earns it.</small>
        </div>
        <div className="launch__mark"><Logo /></div>
      </section>

      <footer>
        <Logo compact />
        <div>
          <span>BAHAMIAN BRAND · IN DEVELOPMENT</span>
          <span>© 2026 WELL MUDDA S____</span>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
      </footer>
    </main>
  );
}

export default App;
