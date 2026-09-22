"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const contacts = [
  { name: "Omar Abi Farraj", phone: "+96171387946", display: "+961 71 387 946" },
  { name: "Nassir Ghraizi", phone: "+96181670536", display: "+961 81 670 536" },
];

function ContactOptions({ message = "Hi Two Minds Academy! I'd like to know more about your courses." }: { message?: string }) {
  return <div className="contact-options">{contacts.map(person => <article className="contact-person" key={person.phone}>
    <div className="contact-person-heading"><span className="contact-initials" aria-hidden="true">{person.name.split(" ").map(n => n[0]).join("")}</span><div><h3>{person.name}</h3><a className="phone-number" href={`tel:${person.phone}`} aria-label={`Call ${person.name} at ${person.display}`}>{person.display}</a></div></div>
    <div className="contact-actions"><a className="button button-dark" href={`https://wa.me/${person.phone.slice(1)}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${person.name}`}>WhatsApp <Arrow diagonal /></a><a className="call-link" href={`tel:${person.phone}`} aria-label={`Call ${person.name}`}>Call <Arrow diagonal /></a></div>
  </article>)}</div>;
}

type Track = "Development" | "Cybersecurity";
type Program = { title: string; level: string; description: string; modules: string[]; outcome: string; track: Track };
const stages = ["Just getting started", "At university", "Starting my career", "Ready to go deeper"];
const programs: Program[][] = [
  [
    { title: "Your first line of code", level: "FOUNDATIONS", description: "Go from curious to capable. Learn how the web works, then build something of your own.", modules: ["How the web works & computational thinking", "HTML, CSS & JavaScript fundamentals", "Git, GitHub & your first development workflow", "Build and publish your first website"], outcome: "A live website you can explain, change, and share.", track: "Development" },
    { title: "Think like a security researcher", level: "FOUNDATIONS", description: "Understand the systems behind the screen. Build a solid base before you start testing them.", modules: ["Networking essentials", "Operating systems I: Linux & Windows", "Security principles & responsible practice", "Your first isolated security lab"], outcome: "A working lab and a practical understanding of networks and systems.", track: "Cybersecurity" },
  ],
  [
    { title: "Make the theory click", level: "UNIVERSITY SUPPORT", description: "Work through technical courses and turn your project idea into something you understand.", modules: ["Targeted support for your technical coursework", "Project scoping & architecture", "Debugging, implementation & code review", "Documentation & project presentation"], outcome: "A project you built yourself, with the confidence to defend your decisions.", track: "Development" },
    { title: "From networks to web security", level: "CORE SKILLS", description: "Connect your classroom knowledge to practical, controlled security exercises.", modules: ["Networking & operating systems II", "Web security fundamentals", "OWASP vulnerability categories", "Defensive security & lab reporting"], outcome: "A documented lab investigation connecting an attack to its defense.", track: "Cybersecurity" },
  ],
  [
    { title: "Build for the real world", level: "CAREER PATH", description: "Go beyond tutorials. Practice the development workflow behind client-ready applications.", modules: ["React & Next.js frontend development", "Laravel or Node.js backend development", "Git collaboration, testing & code reviews", "Docker, hosting & deployment", "AI-assisted coding with Claude & Codex", "Portfolio, job preparation & freelance delivery"], outcome: "A deployed full-stack application and a portfolio-ready case study.", track: "Development" },
    { title: "Find it. Understand it. Report it.", level: "CAREER PATH", description: "Develop a repeatable approach to testing web applications and communicating risk.", modules: ["Reconnaissance & mapping attack surfaces", "Web vulnerabilities I & II", "Defensive controls & remediation", "Bug bounty fundamentals & scope", "Clear, reproducible vulnerability reports"], outcome: "A lab-based security assessment with evidence and practical fixes.", track: "Cybersecurity" },
  ],
  [
    { title: "Engineer beyond the basics", level: "ADVANCED", description: "Sharpen your judgment around architecture, delivery, and the systems you already build.", modules: ["Application architecture & API design", "Advanced Laravel, React or Node.js", "Performance, testing & maintainability", "Containerized delivery & deployment", "Agentic workflows with human verification"], outcome: "An improved production-style system, backed by clear technical decisions.", track: "Development" },
    { title: "Go beneath the surface", level: "ADVANCED", description: "Investigate complex attack paths across web, API, and mobile application surfaces.", modules: ["Advanced reconnaissance", "Web vulnerabilities III & exploit chains", "API security testing", "Mobile application security fundamentals", "Reporting, remediation & retesting"], outcome: "A deeper assessment of an authorized lab, from discovery to remediation.", track: "Cybersecurity" },
  ],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Sculpture() {
  const paths: { d: string; opacity: number }[] = [];
  for (let ring = 0; ring < 2; ring++) {
    for (let i = 0; i < 62; i++) {
      const u = (i / 62) * Math.PI * 2;
      const points: string[] = [];
      let depth = 0;
      for (let j = 0; j <= 76; j++) {
        const v = (j / 76) * Math.PI * 2;
        const radius = 106 + 39 * Math.cos(v);
        let x = radius * Math.cos(u);
        let y = radius * Math.sin(u);
        let z = 39 * Math.sin(v);
        if (ring === 1) { const oldY = y; y = z; z = oldY; x += 119; }
        else { x -= 20; }
        const rx = x * .84 + z * .54;
        const rz = -x * .54 + z * .84;
        const ry = y * .78 - rz * .63;
        depth = y * .63 + rz * .78;
        points.push(`${j === 0 ? "M" : "L"}${(rx + 214).toFixed(2)},${(ry + 239).toFixed(2)}`);
      }
      paths.push({ d: points.join(" "), opacity: .38 + ((depth + 160) / 320) * .55 });
    }
  }
  return <svg className="sculpture" viewBox="0 0 540 490" role="img" aria-label="Two interlocking wireframe rings representing development and cybersecurity"><g fill="none" stroke="currentColor" strokeWidth=".75">{paths.map((p, i) => <path key={i} d={p.d} opacity={p.opacity.toFixed(4)} />)}</g></svg>;
}

export default function Academy() {
  const [stage, setStage] = useState<number | null>(null);
  const [courseTrack, setCourseTrack] = useState<Track | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [program, setProgram] = useState<Program | null>(null);
  const [modal, setModal] = useState<"enquire" | "program" | null>(null);
  const [interest, setInterest] = useState("Help me choose");
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal) { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }
    else { dialog.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const enquire = (topic = "Help me choose") => { setInterest(topic); setModal("enquire"); setMenuOpen(false); };
  const showProgram = (item: Program, stageIndex: number) => { setStage(stageIndex); setProgram(item); setModal("program"); };
  const browse = (track: Track) => { document.getElementById("paths")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); setInterest(track); setCourseTrack(track); };

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-copy > *", { y: 22, duration: .8, stagger: .08, ease: "power3.out", clearProps: "transform" });
      gsap.from(".hero-art", { opacity: .5, scale: .97, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo(".sculpture", { rotation: -7 }, { rotation: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      root.current?.querySelectorAll(".section-heading, .discipline, .approach-steps article, .university, .contact-section, .closing-inner").forEach(element => {
        gsap.from(element, { y: 26, opacity: .65, duration: .7, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      gsap.from(".target", { scale: .7, opacity: .25, stagger: .12, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".security-art", start: "top 90%", once: true } });
    });
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.revert(); };
  }, { scope: root });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".course-list-item", { y: 12, opacity: .65, stagger: .07, duration: .35, ease: "power2.out", clearProps: "transform,opacity" });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [courseTrack], revertOnUpdate: true });

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return <div ref={root} className="academy-root">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="brand" href="#" aria-label="Two Minds Academy home"><Image src="/tm-logo.svg" alt="Two Minds" width={155} height={28} priority /><span>academy</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#disciplines">What you’ll learn</a><a href="#approach">Our approach</a><a href="#questions">FAQs</a><a href="#contact">Contact</a></nav>
      <button className="header-cta" onClick={() => enquire()}>Talk to us <Arrow diagonal /></button>
      <button className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
    </header>
    {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><a href="#disciplines" onClick={() => setMenuOpen(false)}>What you’ll learn</a><a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#questions" onClick={() => setMenuOpen(false)}>FAQs</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><button onClick={() => enquire()}>Talk to us <Arrow /></button></nav>}

    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> DEVELOPMENT & CYBERSECURITY COURSES</div>
          <h1>Learn to code.<br />Learn to secure.<br /><span>Build your future.</span></h1>
          <p>Practical courses and mentoring for beginners, university students, and graduates. Build real projects, get help with university work, or sharpen your skills for a career in tech.</p>
          <a href="#paths" className="button button-dark">Explore our courses <Arrow diagonal /></a>
          <div className="hero-note"><span className="tiny-lines" aria-hidden="true">{"///"}</span> Beginner to advanced · Projects & personal guidance</div>
        </div>
        <div className="hero-art">
          <div className="art-top"><span>THE TWO MINDS MINDSET</span><span className="art-cross">+</span></div>
          <div className="sculpture-area"><Sculpture /><span className="art-label label-build">01 / BUILD</span><span className="art-label label-secure">02 / SECURE</span></div>
          <div className="art-bottom"><h2>Different disciplines.<br />Stronger together.</h2><span className="art-coordinate">DEVELOPMENT<br />× CYBERSECURITY</span></div>
        </div>
      </section>

      <div className="principles wrap"><span>FROM FIRST STEPS TO WHAT’S NEXT</span><p>Before university</p><i>↗</i><p>During university</p><i>↗</i><p>Career beginnings</p><i>↗</i><p>Beyond the basics</p></div>

      <section className="section wrap" id="disciplines">
        <div className="section-heading"><div><span className="eyebrow">01 — THE DISCIPLINES</span><h2>What do you<br />want to learn?</h2></div><p>Choose what sparks your curiosity.<br />We’ll help you turn it into a skill.</p></div>
        <div className="discipline-grid">
          <article className="discipline development"><div className="card-meta"><span>01 / DEVELOPMENT</span><span aria-hidden="true">&lt;/&gt;</span></div><div className="code-art" aria-hidden="true"><span className="code-bracket">&#123;</span><div><span>idea</span><span className="code-arrow">↳ <b>reality</b><i /></span></div><span className="code-bracket">&#125;</span></div><h3>Build websites.<br />Create applications.</h3><p>Learn to turn ideas into websites, applications, and systems people can actually use.</p><div className="tags"><span>Laravel</span><span>React & Next.js</span><span>Node.js</span><span>Git & Docker</span><span>AI-assisted coding</span></div><button className="card-link" onClick={() => browse("Development")}>Explore development <Arrow diagonal /></button></article>
          <article className="discipline cybersecurity"><div className="card-meta"><span>02 / CYBERSECURITY</span><svg aria-hidden="true" width="25" height="27" viewBox="0 0 24 26" fill="none"><path d="M12 2 3 6v7c0 5 9 11 9 11s9-6 9-11V6z" stroke="currentColor" strokeWidth="1.4" /></svg></div><div className="security-art" aria-hidden="true"><div className="target target-one"/><div className="target target-two"/><div className="target target-three"/><span>+</span><i className="scan-line" /></div><h3>Understand threats.<br />Protect systems.</h3><p>Understand how systems are attacked, find vulnerabilities, and learn to protect what matters.</p><div className="tags"><span>Networking</span><span>Linux</span><span>Web security</span><span>Bug bounty</span><span>API & mobile</span></div><button className="card-link" onClick={() => browse("Cybersecurity")}>Explore cybersecurity <Arrow diagonal /></button></article>
        </div>
      </section>

      <section className="paths-section section" id="paths"><div className="wrap">
        <div className="section-heading"><div><span className="eyebrow">02 — OUR COURSES</span><h2>What would you<br />like to learn?</h2></div><p>Pick a subject to see the courses.<br />There’s a place to start at every level.</p></div>
        <div className="course-choices">
          {(["Development", "Cybersecurity"] as Track[]).map((track, trackIndex) => <article className={`course-choice ${courseTrack === track ? "is-expanded" : ""}`} key={track}>
            <span className="course-symbol" aria-hidden="true">{trackIndex === 0 ? "</>" : "+"}</span>
            <h3>{track}</h3>
            <p>{trackIndex === 0 ? "Learn to code and build websites and apps." : "Learn to find security weaknesses and protect systems."}</p>
            <span className="course-level-note">Beginner to advanced</span>
            <button className="course-toggle" aria-expanded={courseTrack === track} aria-controls={`courses-${trackIndex}`} onClick={() => setCourseTrack(courseTrack === track ? null : track)}>{courseTrack === track ? "Hide courses" : "See courses"}<span className="course-toggle-mark" aria-hidden="true">{courseTrack === track ? "−" : "+"}</span><span className="sr-only"> in {track}</span></button>
            <div id={`courses-${trackIndex}`} hidden={courseTrack !== track} className="course-list">
              {programs.map((pair, index) => <button className="course-list-item" key={pair[trackIndex].title} onClick={() => showProgram(pair[trackIndex], index)}>
                <span><strong>{(trackIndex === 0 ? ["Coding for beginners", "University course & project help", "Job & freelance preparation", "Advanced development"] : ["Cybersecurity for beginners", "Networking & web security", "Security testing & bug bounty", "Advanced web, API & mobile security"])[index]}</strong><small>{["No experience needed", "For university students", "For your next career step", "For learners with experience"][index]}</small><span className="course-details-label">View course details</span></span><Arrow />
              </button>)}
            </div>
          </article>)}
        </div>
        <div className="course-guidance"><div><h3>Not sure what to choose?</h3><p>Tell us your goal. We’ll recommend where to start.</p></div><button className="button button-dark" onClick={() => enquire()}>Help me choose <Arrow /></button></div>
      </div></section>

      <section className="approach section wrap" id="approach"><div className="approach-intro"><span className="eyebrow">03 — THE WAY WE LEARN</span><h2>Less watching.<br />More <span className="underlined">doing.</span></h2><p>Knowledge sticks when you use it. Every path connects the fundamentals to something you can build, test, or explain.</p><a className="agency-link" href="https://twomindsengine.com" target="_blank" rel="noopener noreferrer">An academy by Two Minds.<br /><span>The agency behind the mindset. <Arrow diagonal /></span></a></div><div className="approach-steps">{[{ title: "Understand the why.", text: "Build the foundations. Learn what’s happening behind the code, not just what to type." }, { title: "Get your hands on it.", text: "Work through practical projects and controlled security labs. Try, break, debug, repeat." }, { title: "Make the work yours.", text: "Use feedback to improve your decisions. Leave with work you understand and can confidently show." }].map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

      <section className="university wrap"><div className="uni-symbol" aria-hidden="true">↗</div><div><span className="eyebrow">FOR THE “I HAVE A DEADLINE” MOMENTS</span><h2>University courses.<br />Project support.</h2><p>Technical courses, tricky concepts, and graduation projects.<br />Get guidance that helps you do the work—and understand it.</p></div><button className="button button-outline" onClick={() => enquire("University course / project support")}>Get university support <Arrow diagonal /></button></section>

      <section className="faq-section section wrap" id="questions"><div><span className="eyebrow">04 — GOOD QUESTIONS</span><h2>A little clarity.<br />A better start.</h2></div><div className="faq-list">{[
        ["Do I need any experience?", "No. The foundation paths start from the beginning. If you already have experience, tell us what you’ve worked on so we can recommend a suitable starting point."],
        ["Which path is right for me?", "Choose development if you want to build applications. Choose cybersecurity if you’re curious about how systems work, fail, and stay protected. You can explore both—your starting level matters more than having everything figured out."],
        ["How do schedules, formats, and fees work?", "Share the path you’re interested in and your availability. We’ll discuss the available learning format, schedule, and fees with you before you commit. These details are confirmed individually, not through this website."],
        ["Can you help with my university project?", "Yes—through planning, explanations, debugging, and feedback. You write and own your work. We help you understand it and follow your university’s academic rules."],
        ["Will this guarantee me a job?", "No course can guarantee a job. Our career-focused paths help you practice relevant workflows, improve your portfolio, and prepare to discuss your work with employers or freelance clients."],
        ["Where do cybersecurity exercises happen?", "In isolated labs and environments you have explicit permission to test. Responsible practice, clear scope, reporting, and remediation are part of the learning process."],
      ].map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="contact-section section wrap" id="contact"><div className="section-heading"><div><span className="eyebrow">LET’S PLAN YOUR NEXT STEP</span><h2>Questions?<br />Talk to us directly.</h2></div><p>Ask about courses, schedules, and fees.<br />Choose WhatsApp or call either of us.</p></div><ContactOptions /></section>

      <section className="closing"><div className="wrap closing-inner"><div className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</div><div className="closing-row"><h2>Curiosity got you here.<br />Let’s see <span>where it goes.</span></h2><button className="closing-button" aria-label="Let’s find your path" onClick={() => enquire()}><Arrow diagonal /></button></div><div className="closing-caption"><p>Tell us where you are. We’ll help you work out what’s next.</p><button onClick={() => enquire()}>Let’s find your path <Arrow /></button></div></div></section>
    </main>

    <footer className="wrap footer"><a className="brand" href="#" aria-label="Back to Two Minds Academy home"><Image src="/tm-logo.svg" alt="Two Minds" width={155} height={28} /><span>academy</span></a><span>Two disciplines. One stronger future.</span><a href="https://twomindsengine.com" target="_blank" rel="noopener noreferrer">Meet Two Minds <Arrow diagonal /></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Two Minds Academy</span><a href="#contact">Call or WhatsApp our team <Arrow diagonal /></a><span>Built with purpose.</span></div></footer>

    <dialog ref={dialog} className="detail-dialog" onCancel={() => setModal(null)} onClick={e => { if (e.target === e.currentTarget) setModal(null); }} aria-labelledby="dialog-title"><div className="dialog-inner"><button className="dialog-close" onClick={() => setModal(null)} aria-label="Close dialog">×</button>
      {modal === "program" && program ? <><span className="eyebrow">{program.track} / {program.level}</span><h2 id="dialog-title">{program.title}</h2><p>{program.description}</p><h3>What you’ll work on</h3><ol className="module-list">{program.modules.map(module => <li key={module}>{module}</li>)}</ol><div className="outcome"><span className="eyebrow">WHAT YOU’RE WORKING TOWARD</span><p>{program.outcome}</p></div><p className="fine-print">The scope, format, schedule, and fees are agreed with you before you start.</p><button className="button button-dark" onClick={() => enquire(program.title)}>Talk about this path <Arrow diagonal /></button></> : <><span className="eyebrow">LET’S FIND THE RIGHT COURSE</span><h2 id="dialog-title">Talk to our team.</h2><p>Ask about the learning path, schedule, and fees. Choose who you’d like to speak with.</p>{interest !== "Help me choose" && <div className="contact-interest"><span className="eyebrow">YOU’RE INTERESTED IN</span><p>{interest}</p></div>}<ContactOptions message={`Hi Two Minds Academy! ${interest === "Help me choose" ? "I'd like help choosing a course." : `I'm interested in ${interest}.`}${stage !== null ? ` My starting point: ${stages[stage]}.` : ""} Could you share the schedule and fees?`} /><p className="fine-print">WhatsApp opens with a message you can edit before sending.</p></>}

    </div></dialog>
    <nav className="mobile-action-bar" aria-label="Quick actions"><a href="#paths">View courses <Arrow /></a><button onClick={() => enquire()}>Talk to us <Arrow diagonal /></button></nav>
  </div>;
}


