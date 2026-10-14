# Trust barriers and objections: SME buyers of automation/AI from a small or unknown vendor (FainStudio)

Labels used: [CZ] / [EU] / [US-global] = geography. [SURVEY] = quantitative survey, [QUAL] = qualitative research (focus group), [STUDY] = research report, [FORECAST] = analyst prediction (not measured), [ANECDOTE] = single first-hand story, [PRACTITIONER] = blog or agency content (often with commercial bias), [LEGAL] = law or ruling.

Key primary Czech source used throughout: the AMSP ČR "Rok AI 2026" project. It has two parts. (a) Ipsos quantitative survey: 201 owners, executives or directors of firms with 0–250 employees (51 sole traders, 61 micro, 70 small, 70 medium firms), Feb 2026, Ipsos B2B panel ([Ipsos pro AMSP, PDF](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)). (b) Tempo Ventures online focus group: 20 decision makers from firms with 2–249 employees, 11–18 Mar 2026 ([Tempo Ventures pro AMSP, PDF](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)). Caveats on (b): respondents were paid 700–1,000 CZK and were more engaged than the average owner, as the report itself says. Tempo Ventures is also itself an AI implementation studio, so its headline finding ("they want someone to come and show them") is commercially convenient for it. Respondent statements below are paraphrased, with nicknames and page context, so the copywriter can look up the exact wording.

Note on Reddit: reddit.com is blocked for this research tool (search returned "domain not accessible"), so **no verbatim Reddit threads could be opened or quoted**. Where the brief asked for Reddit, I used other first-hand forums (DigitalOcean, Discourse), review sites (Capterra, Shopify App Store), and secondary summaries of Reddit discussions, all labelled as such.

---

## 1. What goes wrong with freelancers, small dev shops and IT/automation projects (vanishing vendor, no support, lock-in, hidden costs, scope creep, "we paid and nobody uses it")

### Takeaway
The best-documented failure is that **value never materialises**: tools get bought and abandoned, pilots stall, and nobody measures benefit. A Czech owner's distrust of IT suppliers is driven above all by **price opacity**: huge quotes she can't judge, plus the suspicion that vendors profit from the buyer's ignorance. The "vendor disappears / we're locked out" fear is real and vivid, but the evidence for it is anecdotal, not quantified. Small, tightly scoped projects fail far less often than large ones, which works in FainStudio's favour.

### Cited Findings
**"We paid and nobody uses it" / no measurable value**
- [CZ][SURVEY] 31% of firms using AI report no effect from it yet. Only 32% measure AI benefits with KPIs, and only 29% have clear AI usage rules. — [Ipsos pro AMSP, Rok AI 2026, Q8, Q6a](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][QUAL] Owners try many tools and quickly drop most of them. One trader (panmotycka, micro, retail) said a tool without a process or workflow is useless. Another (liborf, small, retail) cancelled licences for management-accounting software and contract/data-box software because they never used them effectively. The report's summary: tools get bought on recommendation or enthusiasm, then abandoned once it turns out they solve a problem the firm doesn't have. — [Tempo Ventures pro AMSP, pp. "Digitální nástroje mají, ale málokdy je využívají systematicky" and "Co říkají čísla"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Overpromising backfires. A micro retailer (skippy) tested AI customer support that had been *sold to them as able to replace live staff*. Results were substantially worse than human colleagues, so they would rather invest in a better human salesperson. The report also notes that respondents who tried deploying AI *instead of* a person failed. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [US-global][STUDY] MIT NANDA, "The GenAI Divide: State of AI in Business 2025": about 5% of enterprise GenAI pilots achieve rapid revenue acceleration, and the vast majority deliver little or no measurable P&L impact. Method: 150 leader interviews, a survey of 350 employees, and analysis of 300 public deployments. **Key nuance for a small vendor:** purchasing from specialised vendors or building partnerships succeeded about 67% of the time, while internal builds succeeded about one-third as often. — [Fortune, 18 Aug 2025](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/). Caveat: enterprise-focused and a single study; "95% failure" means no P&L impact, not that the systems broke.
- [US-global][FORECAST] Gartner (July 2024): at least 30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value. Based on a survey of 822 business leaders (Sep–Nov 2023). — [Intelligent CIO, reporting the Gartner release](https://www.intelligentcio.com/eu/2024/08/05/gartner-predicts-30-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025/) (Gartner's own page returned 403)
- [US-global][FORECAST] Gartner (June 2025): over 40% of agentic AI projects will be cancelled by the end of 2027 because of rising costs, unclear business value and weak risk controls. Gartner also flags "agent washing" (vendors relabelling chatbots or RPA as agents) and estimates only about 130 of thousands of "agentic AI" vendors are genuine. — [Outlook Business](https://www.outlookbusiness.com/artificial-intelligence/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-says-gartner)
- [EU/US][SURVEY] S&P Global Market Intelligence 2025 (1,006 IT and business professionals, North America and Europe): 42% of companies abandoned most of their AI initiatives, up from 17% in 2024, and the average organisation scrapped 46% of proofs of concept before production. — [WorkOS blog summary](https://workos.com/blog/why-most-enterprise-ai-projects-fail-patterns-that-work). **Conflict:** some roundups attribute the 42% to McKinsey, and some paraphrase it as "at least one" initiative rather than "most". Verify against S&P before using it in copy.

**Vanishing vendor / lock-in / no support after launch (anecdotal)**
- [US][ANECDOTE] A nonprofit's web developer stopped answering calls, texts and emails mid-way through a list of bug fixes. The site was hosted on DigitalOcean *under the developer's personal account*. — [DigitalOcean Community, July 2021](https://www.digitalocean.com/community/questions/our-website-developer-disappeared-what-do-we-do-now)
- [US][ANECDOTE] Podcast story: a small-business owner's developer changed the site credentials and vanished, locking the owner out during a key sales period (per search-result summary; episode not opened). — [Side Hustle School ep. 2792 "Failure Friday"](https://sidehustleschool.com/episode/2792/)
- [ANECDOTE] A forum thread about a developer who went AWOL after taking payment without completing the agreed work. — [Discourse Meta](https://meta.discourse.org/t/advice-for-when-a-developer-project-goes-bad/128171)
- [PRACTITIONER, outsourcing vendor] A company's freelancers were nowhere to be found when tweaks or a version 2.0 were needed, leaving the client "holding the bag". The article advises having code audited and documented so any developer can take over. — [CoDev](https://www.codev.com/article/how-not-to-hire-a-developer) (seller of dev outsourcing, so biased; read via search summary)
- [PRACTITIONER, low-code agency] Red flag: a Zapier/automation developer with no clear support model leaves the client holding all the risk once automations break. — [LowCode Agency](https://www.lowcode.agency/blog/zapier-developer-red-flags) (agency with commercial interest)

**Hidden and ongoing costs**
- [US-global][REVIEWS] Zapier user reviews complain about monthly fees that are hard to justify for a handful of low-volume automations. One reviewer was still paying 6 months after they stopped using it and was refused a refund. On the other side, one Shopify merchant paid a consultant to build the integration in n8n instead and reports no overhead costs and almost no maintenance. — [Capterra Zapier reviews p.2](https://www.capterra.com/p/130182/Zapier/reviews?page=2); [Shopify App Store, Zapier](https://apps.shopify.com/zapier?locale=cs) (self-selected reviews)
- [CZ][QUAL] A micro firm in energy (libuse) asked a dev company for a solution. After *months* of talks they got a beautiful analysis and a price starting at 800,000 CZK, which was completely unrealistic for them. She says this makes her deeply distrustful and asks "jestli je to kalkul těch firem, kdy vydělávají na neznalosti nás zákazníků?" She also has to justify costs to the association's members. — [Tempo Ventures pro AMSP, "Kdo si to spočítá, ten investici obhájí"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Report summary: less experienced owners run into high supplier prices, cannot judge whether an offer is reasonable, and for small firms *even a low amount is a problem if it must be defended to others in the firm*. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Project size and failure (scope creep and complexity)**
- [US-global][STUDY] Standish Group (1999 CHAOS): smaller projects are consistently more successful because of reduced confusion, complexity and cost. — [1999 Standish CHAOS PDF](https://wwwbroy.in.tum.de/lehre/vorlesungen/vse/WS2004/1999_Standish_Chaos.pdf)
- [US-global][STUDY] Standish 2013 report: compared with small projects, large projects have twice the chance of being late, over budget and missing critical features, and are roughly 10x more likely to fail outright. In 2012, small projects (under US$1M labour content) had a 76% success rate. — [Standish 2013 report PDF](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Proj-Success-Failure/standish-2013-report.pdf); [OpenCommons summary](https://opencommons.org/CHAOS_Report_on_IT_Project_Outcomes). A 2020 figure of about 90% success for small projects circulates but could not be verified against Standish. Standish methodology is criticised (survey-based, contested definitions of "success").

### Inferences
- For a Czech SME owner, the strongest "small IT vendor" fear is less "they will vanish" and more **"I can't judge the price or the outcome, and I'll pay for something nobody uses."** FainStudio's fixed 18–45k CZK price and 10-day delivery directly contrast with the 800k CZK, months-of-analysis experience. That contrast is probably the most persuasive single message, but it should be framed without attacking competitors.
- "Balance paid after handover" plus "14 days of tuning" answers the shelfware fear only if the copy also commits to a **usage outcome** (e.g. "we tune until your team actually uses it"), not just a technical delivery.
- The vanishing-vendor anecdotes all share one root cause: **accounts, hosting or code held by the vendor**. The cheapest trust fix is a written promise that everything runs on the client's own accounts, with documentation handed over.
- The MIT "buy from specialised vendors beats internal builds" finding can counter the "we'll just do it ourselves with ChatGPT" objection, but it is enterprise data and should be cited cautiously.

### Gaps
- No verbatim Reddit (r/smallbusiness, r/Entrepreneur, r/automation, r/nocode) quotes: the domain is blocked for this tool. A human should collect 5–10 threads manually if voice-of-customer quotes are needed.
- No systematic Clutch/G2/Upwork review-pattern analysis was found (no published study of complaint categories).
- No data quantifying how often small vendors actually disappear (a "bus factor" incidence rate).
- No Czech forum or Facebook-group discussions surfaced in media coverage. The AMSP focus group is the only Czech voice-of-customer source found.

---

## 2. AI-specific worries: errors/hallucinations sent to customers, GDPR and data location, API changes and cost, silent breakage, staff resistance and fear of replacement

### Takeaway
Across EU and Czech data, the top three AI worries are: **(1) not knowing what AI can do for us / lacking expertise, (2) data protection and privacy, (3) errors and hallucinations**. Legal uncertainty is a strong fourth at EU level. Staff resistance is *lower* in Czech SMEs than commonly assumed. Owners frame AI as relief for overloaded staff, not as replacement, and pitches that promise replacement backfire.

### Cited Findings
**Expertise, data protection, legal uncertainty: EU**
- [EU][SURVEY] Eurostat 2025: among EU enterprises (10+ employees) that *considered* AI but don't use it, 70.31% cite lack of relevant expertise, 53.61% lack of clarity about legal consequences, and 52.72% concerns about breaching data protection and privacy (up from 48.83% in 2024). Only 17.79% said AI is not useful. The base is small: only 11.1% of EU enterprises in scope had considered AI. — [BCCI AI Council analysis of Eurostat](https://ai.bcci.bg/en/news/why-companies-that-considered-ai-decided-against-it). **Conflict:** an EESC policy note gives 70.89% / 52.52% / 48.83%, probably a different table or base year. — [EESC AI policy note, Mar 2026](https://www.eesc.europa.eu/sites/default/files/2026-03/ai_policy_note_final.pdf)

**Czech SMEs: barriers and data handling**
- [CZ][SURVEY] Main barriers to deploying or using AI: lack of knowledge and skills 31% (the top barrier), data-security concerns 27%, hallucinations and AI error rate 26%. — [Tempo report quoting Ipsos Q9](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf); [Ipsos pro AMSP, Q9](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][SURVEY] To stop staff putting sensitive data into AI, 37% of firms rely only on a formal ban or directive, and 30% have nothing in place or no overview. Real technical protection (closed in-house solutions, secure business licences, technical blocking) is a minority. — [Ipsos pro AMSP, Q6b](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][SURVEY] Reasons given by non-users who don't plan to adopt AI (small sub-sample, N=20) include: lack of trustworthy information, "our business doesn't need it", no quality data, not knowing how it would help, lack of skills, data-security concerns, no time, and "AI is overrated and just a trend". Ipsos summarises the refusers as held back by fear for data, ignorance, or a feeling it is just a fashion bubble. — [Ipsos pro AMSP, Q3b and summary p. 7](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][SURVEY] Spontaneous associations with "AI in the company" include, at 1–5% each, "replacing people", "threat" and "distrust". Most associate it with speeding up work, help and automation. — [Ipsos pro AMSP, Q1](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

**Hallucinations and errors (Czech qualitative)**
- [CZ][QUAL] Hallucinations were among the most-discussed topics, *even among advanced users*. Everyone checks outputs. One respondent (liborf) accepts errors in marketing copy, but for numbers and exact outputs his distrust stays very high. He also says AI wraps untrue results very convincingly. — [Tempo Ventures pro AMSP, "Halucinace, nedostatek času a nesplněná očekávání"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Trust in AI correlates with the user's own expertise: if the owner knows what the result should look like, they trust AI to speed it up; if not, they can't rely on it. — [Tempo Ventures pro AMSP, "Vím, jak má výsledek vypadat"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Data (Czech qualitative)**
- [CZ][QUAL] Firms handle data pragmatically: the report's own headline is "Citlivá data do AI nedáváme. A tím to končí". Those who must use company data choose paid enterprise tools, often only the Microsoft ecosystem (Copilot), for data-protection reasons. One micro owner said she feels she is losing control over who accesses her data and how it could be misused. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][PRACTITIONER/event] AMSP flags "Shadow AI" as a risk: employees put work documents into private or free AI tools because company security slows them down. — [BusinessInfo.cz, Rok AI 2026](https://www.businessinfo.cz/clanky/rok-ai-2026-amsp-cr-jak-dostat-ai-do-provozu-a-neshoret/)

**Where data goes (OpenAI etc.)**
- [US-global][VENDOR PRIMARY] OpenAI: by default it does not train models on data from ChatGPT business plans or the API unless the customer opts in. EU data residency is available for *new* API projects, which are processed in-region; a DPA covers GDPR roles. — [OpenAI, Introducing data residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/). **Caveat:** a 2026 guide says zero data retention and modified abuse monitoring still require approval, and that "no training" is separate from "not logged/stored". — [Wavect, EU data residency for AI apps 2026](https://wavect.io/blog/eu-data-residency-ai-apps-2026.md)

**Errors sent to customers: legal liability**
- [LEGAL][CA] *Moffatt v. Air Canada*, 2024 BCCRT 149 (14 Feb 2024). Air Canada's website chatbot wrongly told a customer he could claim a bereavement fare retroactively. The tribunal held the airline liable for negligent misrepresentation and rejected the argument that the chatbot was a separate entity responsible for its own actions. — [American Bar Association, Business Law Today](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/); [McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot). Small-claims tribunal, so limited precedent, but widely cited.
- [LEGAL][EU] EU AI Act Article 50(1): from 2 August 2026, AI systems that interact directly with people (e.g. website chatbots) must inform users they are interacting with AI, at the latest at the first interaction (not just in T&Cs). The duty sits mainly with the *provider* (whoever built the system). Secondary sources disagree on exactly how the duties split between provider and deployer. — [Jorijn: website chatbot disclosure](https://www.jorijn.com/en/blog/eu-ai-act-website-chatbot-disclosure-august-2026/); [noze.it AI Act checklist](https://www.noze.it/en/insights/ai-act-checklist-obligations-august-2026/) (secondary commentary; verify against Regulation (EU) 2024/1689)

**API change, cost growth, silent breakage**
- [FORECAST] Gartner cites "escalating costs" and "rising costs" as leading reasons for abandoning GenAI and agentic projects. — [Intelligent CIO](https://www.intelligentcio.com/eu/2024/08/05/gartner-predicts-30-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025/); [Outlook Business](https://www.outlookbusiness.com/artificial-intelligence/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-says-gartner)
- [PRACTITIONER, vendor-biased] Summaries of Reddit discussions by AI-agency operators list technical integration issues as the top challenge, followed by client expectation management, and note that rapid AI change requires ongoing maintenance. — [Callin.io, "AI automation agency Reddit"](https://callin.io/ai-automation-agency-reddit/); [Ciela AI](https://ciela.ai/blogs/ai-automation-agency-reddit-honest-truth) (Ciela sells an agency programme)

**Staff resistance and fear of replacement**
- [CZ][SURVEY] Ipsos/AMSP 2026: the biggest barrier is *not* staff resistance to change, which is relatively low and marginal in micro and growing firms. It is staff's lack of knowledge and skills. On headcount over 3 years, about a third expect the same headcount with changed roles and about a third don't know. Only 9% see AI as a solution to labour shortages, although 32% suffer from them. — [Ipsos pro AMSP, summary p. 8, Q9, Q11](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo "Co říkají čísla"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][SURVEY] Earlier AMSP/Ipsos survey (Feb 2025): firms' own employees can be an obstacle because they worry about technological change. Lack of finance was the main brake (40%). — [BusinessInfo.cz](https://www.businessinfo.cz/clanky/male-a-stredni-firmy-jsou-pripraveny-na-zmeny-ale-brzdi-je-prekazky/) (via search summary; page returned 403 on fetch)
- [CZ][QUAL] Owners frame AI as relief, not replacement. One said they lack people who *can't* be replaced by AI, not people AI could replace. Another said they adopt AI to handle more with current staff and don't want layoffs. Some staff need ready-made solutions built into processes and "don't even need to know they're working with AI". — [Tempo Ventures pro AMSP, "AI lidi nenahradí"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

### Inferences
- For FainStudio's AI chat over company documents and its inquiry handling, the objection to pre-empt is **"what if it tells a customer something wrong?"** Answers: a human-in-the-loop / approval step for outbound messages, answers restricted to the company's documents with source citations, an "I don't know, passing to a colleague" fallback, and AI Act-compliant disclosure.
- The data objection is concrete: **which provider, which region, is it used for training, who holds the keys**. Naming the provider, EU residency where available, no training by default, and the client owning the API account answers it in one line.
- "Relief for your people, not replacement" fits Czech owners' own framing better than "replace an employee". Replacement-style claims are explicitly linked to a failed purchase in the focus group.
- No source covered "silent breakage". It is a reasonable worry to answer with monitoring, an error alert to a named person, and a clear post-tuning support price, but this is inference, not evidence.

### Gaps
- No survey found quantifying SME fear of API price rises or model deprecation specifically.
- No data on how often SME automations fail silently.
- The Euronews 2026 piece on why European businesses don't use AI gives different percentages on a different base (e.g. 10.51% of 50–249-employee firms cite lack of expertise); not reconciled. — [Euronews, 25 May 2026](https://euronews.com/next/2026/05/25/why-european-businesses-are-not-using-ai-tools)

---

## 3. Which proof and risk-reversal mechanisms most increase trust for a small vendor without logos

### Takeaway
The strongest evidence, for Czech SMEs specifically, is that **trust in AI is built by seeing it work on one's own process**, through a concrete person showing it and small early wins, not by webinars or generic claims. B2B buyers in general trust peers far more than vendor content, and they discount on-site testimonials. Upfront pricing and visible real people raise credibility. For guarantees and pay-later there is only weak, mostly consumer-side evidence: they help most when the buyer is cautious, fees feel high, and referrals are unavailable, which is exactly FainStudio's situation.

### Cited Findings
**Demo on own process / seeing it work (Czech)**
- [CZ][QUAL] Trust in AI isn't built by theory, webinars or presentations but by repeated small practical successes. Respondents describe trying one small task, seeing it work, then trying the next. — [Tempo Ventures pro AMSP, "Začal jsem věřit, až když jsem to sám zkusil"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Respondents repeatedly name a specific person (a colleague, acquaintance or lecturer) who got them started; one person whose example is close and convincing is enough. One respondent was moved most by a collaborator who showed real uses of AI where she wouldn't have thought of them. — [Tempo Ventures pro AMSP, "Když mi to někdo ukázal, začal jsem tomu věřit"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Owners don't want more courses. They want someone to come into the firm, map the processes and say where and how to use AI. When shown a draft of educational content, they rejected anything generic and wanted step-by-step procedures, a trustworthy source and a clear benefit. One respondent (libor) actually did this with an implementer: answering their questions produced an analysis of where AI would improve processes. — [Tempo Ventures pro AMSP, "Nechci další kurz…" and "Co říkají čísla"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf) (bias: Tempo sells exactly this service)
- [CZ][QUAL] The barrier is described as a lack of imagination ("nedostatek fantazie"): owners know AI exists but can't picture it on their own problem. Those who broke through did so after an external prompt from a colleague, consultant or worked example. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf). The AMSP commentary in the Ipsos report likewise says concrete practical examples are missing. — [Ipsos pro AMSP, Q1 commentary](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][SURVEY] 60% of those who have used AI report a good personal experience, and this rises with firm size and digitalisation (46% for 0–10 employees, 70% for 51–250). — [Ipsos pro AMSP, Q4_1](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

**Who SMEs trust for help (Czech)**
- [CZ][SURVEY] Asked whom they'd welcome support from when deploying AI, Czech SMEs said educational institutions 37%, the state 35%, business associations 24%. AMSP's comment: there is big demand for *trustworthy information, not just commercial licence sales*. — [Ipsos pro AMSP, Q12](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo "Co říkají čísla"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf). (The share choosing commercial suppliers or consultants is not shown in the extracted text.)

**Peers and reviews over vendor content (global B2B)**
- [US-global][SURVEY] SurveyMonkey × Reddit, "The Hidden B2B Journey" (2026): 73% of B2B decision makers trust peer insights, against 55% for vendor websites, 54% search engines, 46% review sites and 39% AI chatbots. 46% struggle to find genuine user testimonials, and 83% complete research before talking to sales. — [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/) (Reddit co-authored, so it has an interest in "peer communities")
- [US-global][SURVEY] Blue Whale Research 2025 Tech Buyer Preferences: 59.35% of tech buyers are most influenced by peer recommendations when first considering a solution. — [Blue Whale Research](https://bluewhaleresearch.com/blog/evolution-of-b2b-tech-buyers-priorities/) (sample details not published in the source)
- [US][SURVEY, old] Elance 2010 survey of SMBs hiring online freelancers: the top factor was feedback from previous projects, then work samples, then pay rate. — [Upwork press release](https://www.upwork.com/press/releases/elance-survey-reveals-majority-of-small-businesses-prefer-hiring-online-vs-in-person) (dated, freelancers not agencies)

**Website credibility: real people, upfront price, external reviews**
- [US-global][STUDY, usability] Nielsen Norman Group (2016) names four trust factors: design quality; *upfront disclosure* of all costs, fees and policies; comprehensive, correct, current content that *shows the work process*; and connection to the rest of the web (external reviews). Service sites should show the process and the *people doing the work*. A cleaning company showing only clean rooms drew less attention than competitors showing their actual cleaners. One user left a site after 35 seconds because it didn't state its rate and required contacting the company, and users disliked long quote forms. Every participant said they would read reviews before hiring a company, and they trusted external reviews more than on-site testimonials. — [NN/g, "Trustworthiness in Web Design"](https://www.nngroup.com/articles/trustworthy-design/)

**Guarantees, risk reversal, pay after delivery**
- [STUDY, mostly consumer] Service guarantees are generally found to reduce perceived purchase risk. The foundational work is Hart (1988), "The Power of Unconditional Service Guarantees" (HBR), with a professional-services follow-up in Sloan Management Review (1992). — [Wikipedia: Service guarantee](https://en.wikipedia.org/wiki/Service_guarantee)
- [TEXTBOOK passage, unverified origin] An unconditional guarantee can be an effective marketing tool if the client is very cautious, fees are high, the consequences of bad service are grave, or business is hard to obtain through referrals and word of mouth. The same passage warns that a guarantee may paradoxically make clients doubt the firm's ability, by implying failure is possible. — [Beat The GMAT forum reproduction](https://www.beatthegmat.com/viewtopic.php?p=449594) (verify before quoting)
- [STUDY, hotel scenarios] Specific guarantees reduced perceived performance and financial risk compared with unconditional ones, but increased the intention to invoke them. Another experiment found unconditional guarantees less important than the literature suggests. — summarised via [search of service-guarantee literature, e.g. SAJBM](https://sajbm.org/index.php/sajbm/article/download/676/608) (mixed evidence, not B2B)

**Small scope and specialised vendors as proof of lower risk**
- [STUDY] Standish: small projects are about 10x less likely to fail outright than large ones. — [Standish 2013 PDF](https://people.eecs.ku.edu/~saiedian/Teaching/811/Papers/Proj-Success-Failure/standish-2013-report.pdf)
- [STUDY] MIT NANDA: solutions bought from specialised vendors and partnerships succeed about 67% of the time, versus about one-third as often for internal builds. — [Fortune](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)

### Inferences
- Ranked by strength of evidence for FainStudio's situation (no logos, unknown name):
  1. **A demo on the prospect's own data or process** (e.g. "send us 5 real inquiries or 3 invoices and we'll show you the output"). This is directly supported by the Czech qualitative findings on how trust forms.
  2. **A named, visible founder who shows the work process.** Supported by NN/g ("show the people doing the work") and the Czech "someone showed me" pattern. In a one-person studio the founder *is* the "close, convincing person".
  3. **A transparent fixed price on the site.** Supported by NN/g upfront disclosure and the Czech price-opacity distrust (the 800k quote).
  4. **Pay the balance after handover, plus a tuning period.** A risk-reversal mechanism; the evidence is weaker and mostly consumer, but theory says it is most effective exactly where referrals are lacking.
  5. **Anonymised case studies with numbers** (savings in hours or CZK). Czech owners think in ROI terms; see section 4.
  6. **Peer referrals and external reviews.** Most trusted overall, but FainStudio can't show them yet, so the substitute is a referral ask after every project plus third-party review profiles (Google Business Profile, Firmy.cz).
- A guarantee should be **specific** (e.g. "if it isn't in use within the 14-day tuning, you don't pay the balance") rather than a vague "satisfaction guaranteed". The literature suggests specific guarantees reduce perceived performance and financial risk.
- On-site testimonials without names or logos will be discounted (NN/g, SurveyMonkey/Reddit). A short anonymised before/after with hard numbers and a process walkthrough is likely more credible than unattributed praise.

### Gaps
- No controlled or practitioner data comparing pilot vs. pay-after-delivery vs. money-back guarantee for small B2B service vendors.
- No B2B-specific study on the effect of a founder's face or name on conversion; NN/g's cleaning-company example is the closest.
- No Czech data on how often SMEs choose IT/AI suppliers via referral versus search.

---

## 4. Czech-specific business culture: scepticism toward AI hype and salespeople, preference for personal recommendation, price sensitivity, distrust of cold calls

### Takeaway
Czech evidence supports: (a) a visible **"it's just a fashion bubble"** scepticism, strongest among micro firms; (b) adoption that **spreads through a trusted person or colleague** rather than marketing; (c) strong **cost pressure and ROI-calculation** thinking; (d) **institutionalised hostility to cold calls**, since marketing calls require prior opt-in by law since 2022. Cultural-dimension data (Hofstede uncertainty avoidance 74) is suggestive but methodologically weak.

### Cited Findings
**AI-hype scepticism**
- [CZ][SURVEY] A fifth of micro firms and sole traders ignore AI entirely (10% of all firms). Held back by fear for data, ignorance, or the sense that it's just a fashion bubble ("módní bublina"). "AI is overrated and just a trend" is one of the listed reasons for non-use. — [Ipsos pro AMSP, summary p. 6, Q3a, Q3b](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][QUAL] A medium manufacturing manager (jaroslav) first saw AI as a passing "módní výstřelek". He came round through curiosity because colleagues were enthusiastically discussing it, and now uses it daily. Another (libuse) sees AI as a trend she respects but is wary of. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Counter-pressure: fatigue with AI-generated content and fear of losing authenticity. One respondent sometimes avoids AI because there is so much bad AI content around. — [Tempo Ventures pro AMSP, "Kdo nenaskočí, zůstane pozadu"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][SURVEY] 43% feel strong competitive pressure to adopt AI, but only 23% of micro firms (0–10 employees) do, versus 50–53% of small and medium firms. 44% feel their firm lags in digitalisation. — [Ipsos pro AMSP, Q4_2, Q4_3](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [US-global][FORECAST] Gartner's "agent washing" warning (only about 130 genuine agentic vendors among thousands) gives external validation to buyers' hype scepticism. — [Outlook Business](https://www.outlookbusiness.com/artificial-intelligence/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-says-gartner)

**Recommendation and personal example**
- [CZ][QUAL] Adoption is triggered by a concrete person (colleague, acquaintance, lecturer, consultant), and tools are acquired on recommendation or enthusiasm. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] The owner's personal stance decides adoption. In small firms management *is* the owner, and if the owner isn't interested nobody else will drive it. — [Tempo Ventures pro AMSP, "Postoj majitele rozhoduje"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Price sensitivity and ROI thinking**
- [CZ][SURVEY] The top thing troubling firms is rising costs and price pressure (51%), followed by bureaucracy and administration (31%). 74% describe themselves as "holding position" (stability), and growth is declared by under a fifth. — [Ipsos pro AMSP, Q_K1, Q_K2](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo "Co říkají čísla"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][SURVEY] Only 33% have a dedicated AI budget: 18% of micro firms, 46% of medium firms. AMSP says micro firms rely on free versions. — [Ipsos pro AMSP, Q6a_2](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- [CZ][QUAL] Experienced owners calculate simply: a Copilot licence at about 700 CZK/month pays for itself if it saves one hour of work a month. One firm saved an estimated 200–300k CZK by using AI for an ERP data migration instead of hiring external help. "Whoever calculates it can defend the investment." — [Tempo Ventures pro AMSP, "Kdo si to spočítá, ten investici obhájí"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][SURVEY] Earlier AMSP/Ipsos (Feb 2025): lack of finance was the main brake on digitalisation and automation (40%). — [BusinessInfo.cz](https://www.businessinfo.cz/clanky/male-a-stredni-firmy-jsou-pripraveny-na-zmeny-ale-brzdi-je-prekazky/)
- [CZ][QUAL] Owners spend 80%+ of their time on operations (e-mail, coordination, admin, even packing parcels) and do strategy at weekends. AI could shrink that load, but the time to implement it is exactly what operations consume. — [Tempo Ventures pro AMSP, "Operativa pohlcuje strategii"](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Cold calls and telemarketing**
- [CZ][LEGAL] Since 1 July 2022 (after a transition period), an amendment to the Electronic Communications Act switched marketing calls from opt-out to **opt-in**: numbers may be called for marketing only with the owner's prior consent. The change explicitly responded to widespread cold calling of both businesses and consumers. Supervised by ČTÚ; fines up to 50M CZK. In the first year ČTÚ handled over 1,380 complaints and made 75 in-depth inspections. — [Právní prostor](https://pravniprostor.cz/clanky/ostatni-pravo/navolavani-jen-se-souhlasem-analyza-novely-zakona-o-elektronickych-komunikacich-pro-oblast-telemarketingu); [BusinessInfo.cz / dTest](https://www.businessinfo.cz/clanky/dtest-nastane-definitivni-konec-telesmejdu/); [Lupa.cz](https://www.lupa.cz/clanky/ctu-jako-bojovnik-s-otravnymi-marketingovymi-hovory-po-roce-zatim-bez-pokuty/). Lupa.cz reports that the stricter law has not eradicated unsolicited calls. — [Lupa.cz](https://www.lupa.cz/clanky/nevyzadane-marketingove-hovory-prisnejsi-zakon-nevymytil-na-slovensku-jsou-poznat-podle-predcisli/) (fine totals differ between sources)

**Cultural dimension (weak evidence)**
- [CZ][STUDY, contested] The Czech Republic scores 74 on Hofstede's Uncertainty Avoidance Index (high). However, Czechia was not in Hofstede's original studies, so the score comes from later replications. — [Wikiversity, Uncertainty avoidance](https://en.wikiversity.org/wiki/Motivation_and_emotion/Book/2022/Uncertainty_avoidance); [ČZU paper](https://sab.czu.cz/dl/44634?lang=en)

**Adoption context (conflicting levels)**
- [CZ][SURVEY] EIB Investment Survey 2025: 48% of Czech firms say they systematically use generative AI tools, versus 37% EU-wide. Top obstacles were lack of skilled staff (88%) and uncertainty (84%); these are probably general investment barriers, not AI-specific. — [EIB press release](https://www.eib.org/en/press/all/2025-499-czech-firms-outpace-eu-peers-in-ai-adoption-and-innovation-eib-survey-finds?lang=cs)
- [CZ][OFFICIAL STAT, via AMSP] ČSÚ: 18% of enterprises used AI in 2025, against 54% of large firms (250+). — [BusinessInfo.cz, Rok AI 2026](https://www.businessinfo.cz/clanky/rok-ai-2026-amsp-cr-jak-dostat-ai-do-provozu-a-neshoret/) (via search summary). The EIB and ČSÚ figures differ greatly because of different definitions and samples.
- [CZ][SURVEY] Czech AI Association literacy index: about 71% of organisations show low AI literacy, and about 83% say they lack AI talent. — [CNN Prima News](https://cnn.iprima.cz/dve-tretiny-ceskych-firem-nejsou-ai-gramotne-cukrarna-prekonala-banku-jak-to-zmenit-449208) (methodology not given)

### Inferences
- Copy should avoid AI-hype vocabulary ("revolution", "agents", "replace employees") and lead with **specific, boring, measurable outcomes** (e.g. "invoices from e-mail into the accounting system without retyping"). Czech owners' own framing is relief from operations ("operativa"), and AMSP calls for concrete examples.
- Outreach: cold calling is legally restricted and culturally resented. Warm channels (referrals, associations such as AMSP events, local business networks, content showing real demos) fit better. This is inference from the law and the qualitative data; no direct Czech study of B2B referral preference was found.
- Price sensitivity is about **defensibility** more than absolute price: owners need a number they can justify internally. Showing a simple payback calculation next to the price (hours saved × hourly cost) matches how successful Czech adopters already reason.
- Micro firms (0–10) are the least receptive: least pressure, least budget, most "bubble" scepticism. Small and medium firms (11–250) feel more competitive pressure and more often have budgets. That argues for targeting the 10–100 employee range.

### Gaps
- No Czech survey found on distrust of salespeople or vendors in B2B services specifically, or on the share of IT suppliers found via personal recommendation.
- No Czech media reports of Facebook-group or forum discussions about bad experiences with freelancers or automation vendors.
- No Czech data on attitudes to "studio vs. agency vs. freelancer".

---

## 5. Questions buyers ask before paying for an automation (code and account ownership, who pays AI API costs, maintenance price, what if an employee leaves)

### Takeaway
No survey systematically lists SME pre-purchase questions about automations. The question set below is reconstructed from failure anecdotes, review complaints, legal developments and practitioner checklists. Each question maps to a documented failure, but how often each is asked is not measured.

### Cited Findings
- [PRACTITIONER, vendor-biased] Recommended questions to ask an AI agency before paying: Can you show case studies with measurable results for businesses like ours? What happens when an integration breaks, and who maintains it after launch? What exactly is included in the price, and what are the ongoing costs (software, compute, retainers)? — [Ciela AI, summarising Reddit discussions](https://ciela.ai/blogs/ai-automation-agency-scam-reddit) (seller of agency courses)
- [ANECDOTE] Ownership of hosting and accounts. The documented lock-out cases stem from hosting or credentials held on the developer's personal account. — [DigitalOcean Community](https://www.digitalocean.com/community/questions/our-website-developer-disappeared-what-do-we-do-now); [Side Hustle School](https://sidehustleschool.com/episode/2792/)
- [PRACTITIONER] Documentation and handover: have code audited and documented so any developer can take over at any point. — [CoDev](https://www.codev.com/article/how-not-to-hire-a-developer)
- [PRACTITIONER] Support model: a developer without a clear support model leaves the client with all the risk once automations break. — [LowCode Agency](https://www.lowcode.agency/blog/zapier-developer-red-flags)
- [REVIEWS] Ongoing subscription costs: complaints about paying monthly platform fees for low-volume automations and about refunds. — [Capterra](https://www.capterra.com/p/130182/Zapier/reviews?page=2); [Shopify App Store](https://apps.shopify.com/zapier?locale=cs)
- [VENDOR PRIMARY] Data location and training: OpenAI API/business data is not used for training by default, and EU residency is available for new API projects. — [OpenAI](https://openai.com/index/introducing-data-residency-in-europe/)
- [LEGAL] Liability for AI answers given to customers rests with the company running the chatbot. — [ABA Business Law Today on Moffatt v. Air Canada](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/)
- [LEGAL] AI disclosure duty for chatbots from 2 Aug 2026 (AI Act Art. 50). — [Jorijn](https://www.jorijn.com/en/blog/eu-ai-act-website-chatbot-disclosure-august-2026/)
- [CZ][QUAL] Internal justification: buyers often must defend cost to co-owners, members or colleagues, so they need a figure and a rationale. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- [CZ][QUAL] Dependency on people: some staff will only use ready-made solutions embedded in the process, while adoption elsewhere depends on one AI "ambassador". Only 36% of firms have a named person responsible for AI. — [Tempo Ventures pro AMSP](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf); [Ipsos pro AMSP, Q6a_1](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

### Inferences
**Likely buyer questions** (inferred from the evidence above) with the answer FainStudio's copy should give. The answers are suggestions; the founder must confirm what is actually offered.
1. *Who owns the code, accounts and data?* → Everything runs on the client's own accounts (API keys, automation platform, hosting); credentials and documentation are handed over at handover.
2. *Who pays the AI/API and platform costs, and how much per month?* → State it explicitly: the client pays the provider directly, and give a typical monthly range per use case, plus what drives it up.
3. *What happens after the 14 days of tuning: what does a fix or change cost?* → Publish a maintenance option or hourly rate and a response time. Silence here re-triggers the "vanishing vendor" fear.
4. *What if you (the founder) get sick or stop?* (bus factor) → Documentation plus standard tools any developer can pick up, and no proprietary lock-in. A one-person studio should answer this proactively, because "the founder is the person you talk to" is both the trust asset and the perceived risk.
5. *Where is our data processed, and is it used for training?* → Name the provider, region (EU where available), no training by default, and what is never sent (e.g. personal data minimisation).
6. *What if the AI tells a customer something wrong?* → Answers limited to the client's documents, a human approval step for outgoing messages where needed, an "I don't know" fallback, and AI disclosure per the AI Act.
7. *What if the employee who uses it leaves?* → A short how-to and handover for whoever replaces them, with automation embedded in the existing process rather than dependent on one person's skills.
8. *What happens if the API or model changes or breaks?* → Monitoring or an error alert, and who gets notified.
9. *How do we know it pays off?* → An agreed metric before the start (hours per week, response time, invoices processed), checked at the end of tuning.
10. *What if we don't end up using it?* → The balance is paid after handover. A specific usage-based condition would strengthen this further.

**Ranked barrier → answer map (synthesis across all sections).** Ranking is by how often and how strongly each barrier appears across sources, with Czech data weighted highest.

| Rank | Barrier / objection | Evidence of frequency | Evidence-backed answer |
|---|---|---|---|
| 1 | "We don't know what AI could do for *us* / we lack expertise" (and so can't evaluate the vendor) | Eurostat 70% of considerers; CZ Ipsos 31% top barrier; central theme of the Tempo focus group | Concrete demo on the prospect's own data or process; a specific use-case menu with examples |
| 2 | Data protection / GDPR / where data goes | Eurostat 52.7%; CZ Ipsos 27%; Tempo "we don't put sensitive data in AI" | Name the provider and region, no-training default, client-owned accounts, data minimisation |
| 3 | Errors and hallucinations, especially sent to customers or in numbers | CZ Ipsos 26%; most-discussed topic in Tempo; Air Canada liability | Human-in-the-loop, answers grounded in the client's docs, fallback to a human, tuning period |
| 4 | Price opacity / fear of overpaying / can't justify cost internally | Tempo 800k CZK anecdote and distrust; Ipsos 51% cost pressure, 33% have an AI budget; NN/g upfront pricing | Fixed published price, payback calculation, small scope |
| 5 | Paid but nobody uses it / no measurable benefit | CZ Ipsos 31% no effect; Tempo cancelled licences; MIT 95%; Gartner 30%; S&P 42% (contested) | Agreed metric up front, tuning until in use, balance after handover |
| 6 | Legal uncertainty (AI Act, liability) | Eurostat 53.6% | Explain AI Act disclosure handling and who is responsible |
| 7 | AI hype / overpromising / "just a bubble" | CZ Ipsos refusers; Tempo "sold as replacing staff, worse"; Gartner agent washing | Plain, specific, modest claims; relief not replacement |
| 8 | Vendor disappears / no support / lock-in (bus factor) | Vivid but anecdotal (DigitalOcean, Discourse, podcast, CoDev); practitioner checklists | Client owns accounts, documentation, published support price, named founder |
| 9 | Ongoing hidden costs (API, platform subscriptions) | Zapier reviews; Gartner "escalating costs" | Upfront monthly running-cost estimate; client pays providers directly |
| 10 | Staff resistance / fear of replacement | CZ Ipsos: *relatively low*, marginal in micro firms; Feb 2025 AMSP mentions employee fears | Frame as relief for current staff; build into existing process |
| (cross-cutting) | No time to implement (owners spend 80%+ on operations) | Tempo qualitative | Done-for-you, 10-day delivery, minimal client time required, stated explicitly |

### Gaps
- No primary survey of the actual questions SMEs ask automation vendors before purchase. The list above is inferred and should be validated in the first 5–10 sales calls (log every question asked).
- No data on typical maintenance-contract expectations or prices among Czech SMEs.
- No evidence on how SMEs weigh a solo founder against a team on bus-factor risk.
