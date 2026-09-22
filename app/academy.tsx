"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

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
  const [stage, setStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [program, setProgram] = useState<Program | null>(null);
  const [modal, setModal] = useState<"enquire" | "program" | null>(null);
  const [interest, setInterest] = useState("Help me choose");
  const [emailReady, setEmailReady] = useState(false);
  const [emailLink, setEmailLink] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal) { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }
    else { dialog.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const enquire = (topic = "Help me choose") => { setInterest(topic); setEmailReady(false); setModal("enquire"); setMenuOpen(false); };
  const showProgram = (item: Program) => { setProgram(item); setModal("program"); };
  const browse = (track: Track) => { document.getElementById("paths")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); setInterest(track); };

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hi Two Minds Academy,\n\nI'd like to discuss a learning path.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nStarting point: ${data.get("stage")}\nInterest: ${data.get("interest")}\nGoal: ${data.get("goal") || "I'd like help choosing my next step."}\n\nPlease share the available format, schedule, and fees.`;
    const link = `mailto:info@wearetwominds.com?subject=${encodeURIComponent("Academy enquiry — " + data.get("interest"))}&body=${encodeURIComponent(body)}`;
    setEmailLink(link); setEmailReady(true); window.location.href = link;
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="brand" href="#" aria-label="Two Minds Academy home"><Image src="/tm-logo.svg" alt="Two Minds" width={155} height={28} priority /><span>academy</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#disciplines">What you’ll learn</a><a href="#approach">Our approach</a><a href="#questions">FAQs</a></nav>
      <button className="header-cta" onClick={() => enquire()}>Let’s talk <Arrow diagonal /></button>
      <button className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
    </header>
    {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><a href="#disciplines" onClick={() => setMenuOpen(false)}>What you’ll learn</a><a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#questions" onClick={() => setMenuOpen(false)}>FAQs</a><button onClick={() => enquire()}>Let’s talk <Arrow /></button></nav>}

    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> TWO MINDS. YOUR NEXT CHAPTER.</div>
          <h1>Don’t just<br />learn tech.<br /><span>Make your</span><br /><span className="last-line">mark.<span className="asterisk" aria-hidden="true">✳</span></span></h1>
          <p>Build things that work. Understand how they break.<br className="desktop-break" /> Learn development and cybersecurity, from your<br className="desktop-break" /> first step to your next big move.</p>
          <a href="#paths" className="button button-dark">Find your learning path <Arrow diagonal /></a>
          <div className="hero-note"><span className="tiny-lines" aria-hidden="true">{"///"}</span> Real projects. Human guidance. Your pace forward.</div>
        </div>
        <div className="hero-art">
          <div className="art-top"><span>THE TWO MINDS MINDSET</span><span className="art-cross">+</span></div>
          <div className="sculpture-area"><Sculpture /><span className="art-label label-build">01 / BUILD</span><span className="art-label label-secure">02 / SECURE</span></div>
          <div className="art-bottom"><h2>Different disciplines.<br />Stronger together.</h2><span className="art-coordinate">DEVELOPMENT<br />× CYBERSECURITY</span></div>
        </div>
      </section>

      <div className="principles wrap"><span>FROM FIRST STEPS TO WHAT’S NEXT</span><p>Before university</p><i>↗</i><p>During university</p><i>↗</i><p>Career beginnings</p><i>↗</i><p>Beyond the basics</p></div>

      <section className="section wrap" id="disciplines">
        <div className="section-heading"><div><span className="eyebrow">01 — THE DISCIPLINES</span><h2>Two ways in.<br />A world of possibility.</h2></div><p>Choose what sparks your curiosity.<br />We’ll help you turn it into a skill.</p></div>
        <div className="discipline-grid">
          <article className="discipline development"><div className="card-meta"><span>01 / DEVELOPMENT</span><span aria-hidden="true">&lt;/&gt;</span></div><div className="code-art" aria-hidden="true"><span className="code-bracket">&#123;</span><div><span>idea</span><span className="code-arrow">↳ <b>reality</b><i /></span></div><span className="code-bracket">&#125;</span></div><h3>From “what if”<br />to “I built this.”</h3><p>Learn to turn ideas into websites, applications, and systems people can actually use.</p><div className="tags"><span>Laravel</span><span>React & Next.js</span><span>Node.js</span><span>Git & Docker</span><span>AI-assisted coding</span></div><button className="card-link" onClick={() => browse("Development")}>Explore development <Arrow diagonal /></button></article>
          <article className="discipline cybersecurity"><div className="card-meta"><span>02 / CYBERSECURITY</span><svg aria-hidden="true" width="25" height="27" viewBox="0 0 24 26" fill="none"><path d="M12 2 3 6v7c0 5 9 11 9 11s9-6 9-11V6z" stroke="currentColor" strokeWidth="1.4" /></svg></div><div className="security-art" aria-hidden="true"><div className="target target-one"/><div className="target target-two"/><div className="target target-three"/><span>+</span><i className="scan-line" /></div><h3>See the weakness.<br />Be the defense.</h3><p>Understand how systems are attacked, find vulnerabilities, and learn to protect what matters.</p><div className="tags"><span>Networking</span><span>Linux</span><span>Web security</span><span>Bug bounty</span><span>API & mobile</span></div><button className="card-link" onClick={() => browse("Cybersecurity")}>Explore cybersecurity <Arrow diagonal /></button></article>
        </div>
      </section>

      <section className="paths-section section" id="paths"><div className="wrap">
        <div className="section-heading"><div><span className="eyebrow">02 — YOUR STARTING POINT</span><h2>Meet yourself<br />where you are.</h2></div><p>No one-size-fits-all syllabus.<br />Start with your stage. Find your direction.</p></div>
        <div className="stage-tabs" role="group" aria-label="Choose your starting point">{stages.map((name, i) => <button key={name} aria-pressed={stage === i} className={stage === i ? "active" : ""} onClick={() => setStage(i)}><span>0{i + 1}</span>{name}<span className="tab-dot" /></button>)}</div>
        <div className="program-list" aria-live="polite">{programs[stage].map((item, i) => <button key={item.title} className={`program-row ${interest === item.track ? "highlighted" : ""}`} onClick={() => showProgram(item)}><span className="program-number">0{i + 1}</span><div className="program-title"><span className="eyebrow">{item.track} <span className="small-divider">/</span> {item.level}</span><h3>{item.title}</h3><p>{item.description}</p></div><span className="round-arrow"><Arrow diagonal /></span></button>)}</div>
        <div className="path-help"><span>Not sure where you fit? That’s a perfectly good place to start.</span><button onClick={() => enquire()}>Let’s figure it out <Arrow /></button></div>
      </div></section>

      <section className="approach section wrap" id="approach"><div className="approach-intro"><span className="eyebrow">03 — THE WAY WE LEARN</span><h2>Less watching.<br />More <span className="underlined">doing.</span></h2><p>Knowledge sticks when you use it. Every path connects the fundamentals to something you can build, test, or explain.</p><a className="agency-link" href="https://twomindsengine.com" target="_blank" rel="noopener noreferrer">An academy by Two Minds.<br /><span>The agency behind the mindset. <Arrow diagonal /></span></a></div><div className="approach-steps">{[{ title: "Understand the why.", text: "Build the foundations. Learn what’s happening behind the code, not just what to type." }, { title: "Get your hands on it.", text: "Work through practical projects and controlled security labs. Try, break, debug, repeat." }, { title: "Make the work yours.", text: "Use feedback to improve your decisions. Leave with work you understand and can confidently show." }].map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

      <section className="university wrap"><div className="uni-symbol" aria-hidden="true">↗</div><div><span className="eyebrow">FOR THE “I HAVE A DEADLINE” MOMENTS</span><h2>A little stuck at uni?<br />Let’s connect the dots.</h2><p>Technical courses, tricky concepts, and graduation projects.<br />Get guidance that helps you do the work—and understand it.</p></div><button className="button button-outline" onClick={() => enquire("University course / project support")}>Get university support <Arrow diagonal /></button></section>

      <section className="faq-section section wrap" id="questions"><div><span className="eyebrow">04 — GOOD QUESTIONS</span><h2>A little clarity.<br />A better start.</h2></div><div className="faq-list">{[
        ["Do I need any experience?", "No. The foundation paths start from the beginning. If you already have experience, tell us what you’ve worked on so we can recommend a suitable starting point."],
        ["Which path is right for me?", "Choose development if you want to build applications. Choose cybersecurity if you’re curious about how systems work, fail, and stay protected. You can explore both—your starting level matters more than having everything figured out."],
        ["How do schedules, formats, and fees work?", "Share the path you’re interested in and your availability. We’ll discuss the available learning format, schedule, and fees with you before you commit. These details are confirmed individually, not through this website."],
        ["Can you help with my university project?", "Yes—through planning, explanations, debugging, and feedback. You write and own your work. We help you understand it and follow your university’s academic rules."],
        ["Will this guarantee me a job?", "No course can guarantee a job. Our career-focused paths help you practice relevant workflows, improve your portfolio, and prepare to discuss your work with employers or freelance clients."],
        ["Where do cybersecurity exercises happen?", "In isolated labs and environments you have explicit permission to test. Responsible practice, clear scope, reporting, and remediation are part of the learning process."],
      ].map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="closing"><div className="wrap closing-inner"><div className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</div><div className="closing-row"><h2>Curiosity got you here.<br />Let’s see <span>where it goes.</span></h2><button className="closing-button" aria-label="Let’s find your path" onClick={() => enquire()}><Arrow diagonal /></button></div><div className="closing-caption"><p>Tell us where you are. We’ll help you work out what’s next.</p><button onClick={() => enquire()}>Let’s find your path <Arrow /></button></div></div></section>
    </main>

    <footer className="wrap footer"><a className="brand" href="#" aria-label="Back to Two Minds Academy home"><Image src="/tm-logo.svg" alt="Two Minds" width={155} height={28} /><span>academy</span></a><span>Two disciplines. One stronger future.</span><a href="https://twomindsengine.com" target="_blank" rel="noopener noreferrer">Meet Two Minds <Arrow diagonal /></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Two Minds Academy</span><a href="mailto:info@wearetwominds.com">info@wearetwominds.com</a><span>Built with purpose.</span></div></footer>

    <dialog ref={dialog} className="detail-dialog" onCancel={() => setModal(null)} onClick={e => { if (e.target === e.currentTarget) setModal(null); }} aria-labelledby="dialog-title"><div className="dialog-inner"><button className="dialog-close" onClick={() => setModal(null)} aria-label="Close dialog">×</button>
      {modal === "program" && program ? <><span className="eyebrow">{program.track} / {program.level}</span><h2 id="dialog-title">{program.title}</h2><p>{program.description}</p><h3>What you’ll work on</h3><ol className="module-list">{program.modules.map(module => <li key={module}>{module}</li>)}</ol><div className="outcome"><span className="eyebrow">WHAT YOU’RE WORKING TOWARD</span><p>{program.outcome}</p></div><p className="fine-print">The scope, format, schedule, and fees are agreed with you before you start.</p><button className="button button-dark" onClick={() => enquire(program.title)}>Talk about this path <Arrow diagonal /></button></> : <><span className="eyebrow">A CONVERSATION, NOT A COMMITMENT</span><h2 id="dialog-title">Your next step.<br />Let’s find it.</h2><p>Tell us a little about yourself. We’ll help you explore a learning path that makes sense.</p><form onSubmit={submitEnquiry}><div className="form-grid"><label>Your name<input name="name" autoComplete="name" placeholder="What should we call you?" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={180} /></label></div><label>Where are you starting?<select name="stage" defaultValue={stages[stage]}>{stages.map(s => <option key={s}>{s}</option>)}</select></label><label>What are you interested in?<select name="interest" value={interest} onChange={e => setInterest(e.target.value)}>{Array.from(new Set([interest, "Help me choose", "Development", "Cybersecurity", "University course / project support"])).map(s => <option key={s}>{s}</option>)}</select></label><label>What would you like to achieve? <span className="optional">(optional)</span><textarea name="goal" rows={3} maxLength={1500} placeholder="An idea, a skill, a career move…" /></label><p className="fine-print">This opens a prepared message in your email app. Your details are only shared when you send it.</p><button className="button button-dark" type="submit">Prepare my enquiry <Arrow diagonal /></button>{emailReady && <div className="email-feedback" role="status">Your enquiry is ready in your email app. Send it there to reach us. If it didn’t open, <a href={emailLink}>open the draft again</a> or email <a href="mailto:info@wearetwominds.com">info@wearetwominds.com</a>.</div>}</form></>}
    </div></dialog>
  </>;
}


