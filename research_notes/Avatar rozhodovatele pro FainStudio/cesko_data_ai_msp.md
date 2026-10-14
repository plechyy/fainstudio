# AI and digitalisation adoption among Czech SMEs: who decides, what stops them, what drives them (fact base, 2024–2026)

Research date: 14 Oct 2026. All numbers carry their reference year. "Opened" = the primary document was read in full. "Snippet" = number seen only in search-engine summaries because the page blocked automated access (businessinfo.cz returned HTTP 403). Treat snippet-only numbers as lower confidence.

Key primary sources used:
- ČSÚ, ICT survey of enterprises 2025, full tables (XLSX, opened): https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx (landing page https://csu.gov.cz/ict-v-podnicich). Methodology: enterprises with 10+ employees, about 7,000 completed questionnaires (7,894 sampled), reference period Jan–Aug 2025. Excludes agriculture (A), mining (B), finance (K), and sections O–U.
- Eurostat dataset isoc_eb_ai, queried through the API (opened): https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025 (browser view: https://ec.europa.eu/eurostat/databrowser/view/isoc_eb_ai/default/table)
- AMSP ČR "Rok AI 2026": Ipsos quantitative report, Feb 2026 (opened): https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf. Tempo Ventures qualitative report, Apr 2026 (opened): https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf
- AMSP ČR / Ipsos digitalisation press release, 4 Dec 2024 (opened): https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf
- HK ČR Komorový barometr, autumn 2024, as published in the chamber's magazine Komora 02/2025 (opened): https://cot.cz/wp-content/uploads/K_25_02.pdf

---

## 1. How many Czech enterprises use AI and automation, by size class, and how does Czechia compare with the EU?

### Takeaway
In 2025, 17.6% of Czech enterprises with 10+ employees used at least one AI technology, against an EU average of 19.95%. The share has tripled since 2023 (5.9%). Adoption rises steeply with size: 13.4% of small firms (10–49 employees), 28.8% of medium firms (50–249) and 54.1% of large firms (250+). Czechia is above the EU in generative AI and in AI for marketing and sales. It is below the EU in AI-based workflow automation (RPA), and Czech AI users buy externally built AI much less often than EU users. Firms under 10 employees are not covered by official statistics.

### Cited Findings
**Official statistics (ČSÚ / Eurostat, firms with 10+ employees)**
- AI use in Czechia: 4.5% (2021), 5.9% (2023), 11.3% (2024), 17.6% (2025). ČSÚ describes 2025 as roughly three times the 2023 level. — [ČSÚ ICT v podnicích](https://csu.gov.cz/ict-v-podnicich)
- AI use by size class in Czechia, 2025 (ČSÚ table T11):
  - All firms 10+: 17.6%
  - 10–49 employees: 13.4%
  - 50–249 employees: 28.8%
  - 250+ employees: 54.1%
  — [ČSÚ 2025 XLSX, T11](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)
- The same table broken down by AI technology, Czechia 2025, all firms 10+ (small / medium / large in brackets):

  | AI technology | All 10+ | Small | Medium | Large |
  |---|---|---|---|---|
  | Generating text, code or speech | 12.8% | 9.9% | 20.7% | 36.7% |
  | Generating images, video or music | 9.7% | 7.6% | 15.4% | 26.1% |
  | Advanced text analysis | 7.1% | 4.7% | 13.0% | 31.7% |
  | Machine or deep learning for data analysis | 6.9% | 5.0% | 11.3% | 27.3% |
  | Robotic process automation (routine tasks) | 4.1% | 2.6% | 6.7% | 21.5% |
  | Speech recognition | 3.6% | 2.6% | 4.9% | 17.8% |

  — [ČSÚ 2025 XLSX, T11](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)
- AI use by sector, Czechia 2025:
  - ICT (J): 60.5%
  - Travel agencies (N79): 40.1%
  - Professional, scientific and technical services (M): 33.3%
  - Wholesale (46): 24.2%
  - Accommodation (55): 17.8%
  - Manufacturing (C): 16.7%
  - Real estate (L): 15.9%
  - Retail (47): 14.4%
  - Other administrative and support services: 11.8%
  - Food service (56): 7.9%
  - Construction (F): 7.8%
  - Transport and storage (H): 6.1%

  — [ČSÚ 2025 XLSX, T11](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)
- Czechia compared with the EU and its neighbours, share of firms using any AI, 2024 → 2025 (Eurostat, indicator E_AI_TANY):

  | Country | All 10+ | 10–49 | 50–249 | 250+ |
  |---|---|---|---|---|
  | Czechia | 11.26% → 17.6% | 8.72% → 13.38% | 16.91% → 28.79% | 40.48% → 54.1% |
  | EU27 | 13.48% → 19.95% | 11.21% → 17.0% | 20.97% → 30.36% | 41.17% → 55.03% |
  | Slovakia | 18.0% (2025) | | | |
  | Poland | 8.36% (2025) | | | |
  | Austria | 29.95% (2025) | | | |
  | Germany | 25.97% (2025) | | | |

  — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- Earlier years, all firms 10+: Czechia 4.46% (2021) and 5.9% (2023); EU 7.65% (2021) and 8.06% (2023). — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2021&time=2023)
- Generative AI is where Czechia is ahead. AI that generates written or spoken language or code, 2025: Czechia 12.78% vs EU 8.76%. Small firms: Czechia 9.88% vs EU 6.96%. Medium firms: Czechia 20.71% vs EU 14.79%. — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- Workflow automation (RPA) is where Czechia lags. AI-based software RPA, 2025: Czechia 4.07% vs EU 5.35%. Small firms: Czechia 2.64% vs EU 4.13%. Medium firms: Czechia 6.69% vs EU 8.67%. — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- Purposes of AI use, 2025, as a share of firms that use AI:
  - Marketing or sales: Czechia 59.2% vs EU 34.7%. Among small Czech AI users the share is 66.2%.
  - Business administration or management: Czechia 40.0% vs EU 31.0%.
  - Accounting, controlling or finance: Czechia 24.2% vs EU 23.1%.

  — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025). ČSÚ also reports the 40% administration/management/HR figure. — [MediaGuru, 23 Jan 2026](https://www.mediaguru.cz/umelou-inteligenci-loni-v-cesku-vyuzila-petina-firem)
- How AI was sourced, 2024 (latest year available), as a share of AI users:
  - Ready-to-use commercial AI: Czechia 52.4% vs EU 57.9%.
  - AI developed or modified by external providers: Czechia 17.8% vs EU 28.6%. Among small firms: Czechia 15.2% vs EU 25.8%.

  — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- EU-wide highlights, 2025:
  - EU AI use 19.95%: small 17%, medium 30.36%, large 55.03%.
  - Top countries: Denmark 42.03%, Finland 37.82%, Sweden 35.04%.
  - Bottom countries: Romania 5.21%, Poland 8.36%, Bulgaria 8.55%.

  — [Eurostat Statistics Explained](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises)
- The ČNB (Czech National Bank) says Czech AI use in marketing and sales is above the EU and rising fast (15% in 2025). It sees room for more AI use, especially in manufacturing. Note: I saw this only in a search summary; I did not open the ČNB page. — [ČNB box "AI v evropských firmách"](https://www.cnb.cz/cs/menova-politika/zpravy-o-menove-politice/boxy-a-clanky/AI-v-evropskych-firmach-kde-se-pouziva-a-jak-meni-firemni-procesy)

**Digital baseline of Czech firms, 2025 (ČSÚ, 10+ employees; small firms 10–49 in brackets)**
- Software and analytics:
  - ERP: 49.7% (41.8%)
  - CRM: 36.2% (30.0%)
  - Business intelligence: 17.1% (10.8%)
  - Paid cloud: 54.9% (50.6%)

  — [ČSÚ 2025 XLSX, T8](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx); [ČSÚ ICT v podnicích](https://csu.gov.cz/ict-v-podnicich)
- Websites and online channels:
  - Own website: 82.8% (80.9%)
  - Website allows online ordering or booking: 30.3%
  - Web chat for customer support: 8.2% (7.4%)
  - Web chat with a chatbot: 2.1% (1.5%)

  — [ČSÚ 2025 XLSX, T5/T6](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)
- Size of the population, 2025 (surveyed sectors only): 40,867 enterprises with 10+ employees. Of these, 32,303 are small (10–49), 6,961 medium (50–249) and 1,604 large (250+). — [ČSÚ 2025 XLSX, T1](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)

**Non-official surveys (different definitions, usually higher numbers)**
- HK ČR Komorový barometr, members of the Chamber, n=358, fieldwork 21 Aug – 9 Sep 2024:
  - 28.2% use AI and 69.6% do not.
  - Use by size: large 48.1%, medium 28.3%, micro 23.4%, small 22%.

  — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- AMSP / Ipsos, n=201 owners, jednatelé (managing directors) and directors of firms with 0–250 employees, report dated Feb 2026. Stage of AI adoption across all respondents:
  - 3% integrate AI systematically.
  - 17% actively implement AI (they have a budget or a responsible person).
  - 23% are piloting AI in 1–2 processes.
  - 27% have several employees using AI regularly without dedicated resources.
  - 20% see only ad-hoc use by individuals without rules.
  - 10% do not deal with AI at all. Among micro firms this rises to 20%.

  — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- EIB Investment Survey (EIBIS) 2025, Czech sample n=482: 48% of Czech firms use generative AI vs 37% in the EU, the highest in CESEE. — [EIB press release 2025](https://www.eib.org/en/press/all/2025-499-czech-firms-outpace-eu-peers-in-ai-adoption-and-innovation-eib-survey-finds)
- ČAUI + HK ČR "AI MOMENTUM 2026", n=1,033 firms, online, 1 Nov – 31 Dec 2025 (snippet only): about half of firms already use or test AI and a further 40% plan to. 78% plan at least one new AI project in 2026. — [BusinessInfo (403, snippet)](https://www.businessinfo.cz/clanky/pruzkum-caui-a-hk-cr-ceske-firmy-berou-ai-vazne-celkem-9-z-10-s-ni-uz-v-roce-2026-pocita/)

### Inferences
- The best-fit firms for FainStudio are small firms (10–49 employees), and most of them do not use AI yet. About 86.6% of the ~32,300 small Czech firms (roughly 28,000) do not use AI (2025 ČSÚ shares applied to T1 counts; my calculation). Only 2.6% of small firms use RPA, which is the category FainStudio's "automation" product belongs to.
- Czech firms have adopted chat tools (ChatGPT and similar) quickly. They have not yet adopted process automation or bought AI built by outside suppliers: only 17.8% of Czech AI users had AI developed or modified by an external provider, against 28.6% in the EU. A done-for-you implementer is therefore a less familiar purchase in Czechia than in the EU. The copy probably has to explain what kind of service this is, not just what it delivers.
- Copy that frames AI as "Czechia is behind" is accurate overall (17.6% vs 20%). For generative AI and marketing use, the opposite is true. The defensible line is: Czech firms already use ChatGPT, but few have automated their processes.
- Survey figures range from 17.6% (ČSÚ, 10+ employees, specific technologies) to about 50% (ČAUI/HK, self-selected online sample). For copy, ČSÚ is the most defensible source.

### Gaps
- There is no official AI-use statistic for micro firms (0–9 employees) or OSVČ (sole traders). ČSÚ and Eurostat cover 10+ employees only. The AMSP/Ipsos figures for micro firms rest on n=61.
- I found no Czech official data on non-AI "automation" in general (for example, rule-based e-mail or invoice workflows). RPA as measured by ČSÚ is classified as an AI technology.
- The Czech 2025 breakdown of AI sourcing (ready-made vs external provider) is not published; the latest is 2024.

---

## 2. Which barriers do Czech firms report for not using AI (ČSÚ / Eurostat categories)?

### Takeaway
Czechia has no official barrier data. ČSÚ did not report the "reasons for not using AI" module to Eurostat in any year (2021, 2023, 2024, 2025); the Czech cells are empty in the Eurostat dataset. The nearest benchmarks come from the EU and Slovakia/Poland. In 2025 the EU ranking was: lack of expertise 70%, unclear legal consequences 54%, data protection/privacy 53%, data availability/quality 44%, incompatibility 42%, costs 38%, ethics 25%, "not useful" 18%. Czech private surveys tell a consistent story: lack of know-how comes first, followed by costs or financial burden, data security, and errors or hallucinations.

### Cited Findings
**Official data: Czechia missing**
- The Eurostat dataset isoc_eb_ai has no Czech values for any barrier indicator (E_AI_BCST, BLE, BINC, BDDT, BCDP, BLEG, BEC, BNU) or for "ever considered AI" (E_AI_EC). This holds for 2021, 2023, 2024 and 2025, while EU, SK and PL values exist. I verified this by API query on 14 Oct 2026. — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- The ČSÚ 2025 tables also contain no barrier table. Table T11 covers AI use only. — [ČSÚ 2025 XLSX](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)

**EU and CEE benchmark (Eurostat, 2025)**
- Reasons for not using AI, as a share of non-users that had considered using AI:

  | Reason | EU27 | Slovakia | Poland |
  |---|---|---|---|
  | Lack of relevant expertise | 70.31% | 57.87% | 62.55% |
  | Unclear legal consequences | 53.61% | 54.2% | 52.3% |
  | Data protection / privacy concerns | 52.72% | 51.53% | 49.44% |
  | Data availability or quality | 43.51% | 41.86% | 33.43% |
  | Incompatibility with existing systems | 41.6% | 50.34% | 40.85% |
  | Costs seem too high | 38.37% | 48.5% | 55.52% |
  | Ethical considerations | 24.64% | 17.59% | 26.57% |
  | AI not useful for the firm | 17.79% | 16.58% | 34.58% |

  — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- EU small firms (10–49) look the same: expertise 70.87%, legal 54.79%, privacy 52.49%, costs 38.82% (2025). — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- These barrier shares apply only to a small group of firms. In 2025, 11.1% of all EU firms with 10+ employees had considered AI but did not use it. That is 14.2% of non-users. — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- Year mismatch: the Statistics Explained article quotes 70.89% (expertise), 52.52% (legal), 48.83% (privacy) and 20.68% (not useful). Those values match the 2024 API data, not 2025. The 2025 API values are 70.31%, 53.61%, 52.72% and 17.79%. — [Eurostat Statistics Explained](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises) vs [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)

**Czech private surveys: barriers**
- AMSP/Ipsos, owners and directors of firms with 0–250 employees, Feb 2026. Main obstacles when introducing or using AI:
  - Lack of knowledge and skills: 31%.
  - Data-security concerns: 27%.
  - Hallucinations or AI errors: 26%.
  - Employee resistance to change is described as relatively low, and marginal in micro and growing firms.

  — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); percentages restated in [Tempo report, section 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- AMSP/Ipsos, reasons given by non-users who have no plans (n=20, word cloud without percentages): no trustworthy information; "our business does not need it"; no quality data; "we don't know how it would help"; lack of skills and not knowing where to start; data-security concerns; no time to deal with it; "AI is overrated, just a trend". — [AMSP/Ipsos Rok AI 2026, Q3b](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- HK ČR Komorový barometr, autumn 2024, n=358. Barriers to automation, robotisation, AI and data (any obstacle / major obstacle):
  - Finance (lack of funds, ROI, no suitable subsidies): 55.6% / 23.5%
  - Human capital (staff, management or owners unwilling or unqualified; cost or availability of skilled staff): 49.5% / 15.4%
  - Insufficient know-how and information: 47.2% / 10.3%
  - Regulatory or administrative burden: 45.9% / 16.8%

  — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- AMSP/Ipsos press release, 4 Dec 2024. 36% of SMEs are implementing or planning AI. Another 36% do not consider AI at all, "mainly because of concerns about costs and benefits". Barriers to digitalisation in general:
  - IT outages: 30%
  - Lack of IT experts: 29%
  - Data leaks: 29%
  - Changing digital regulation: 28%

  — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- Deloitte + ČAUI, n=155 firms (larger firms over-represented), published 15 Apr 2026:
  - Barriers to everyday AI use: no clear practical use cases 52%; low tool awareness, low trust in outputs and data security also cited (no percentages).
  - Barriers to scaling: shortage of specialists 43%.
  - Lack of management support: 14%.

  — [Deloitte press release](https://www.deloitte.com/cz-sk/cs/about/press-room/pruzkum-deloitte-a-caui-ai-prestava-byt-experimentem.html)
- Dors & Venabili, June 2025, more than 600 Czech firms (snippet; page returned 403). Barriers: lack of capacity or people 68%; unclear which tools to choose 62%; uncertainty about where and what to start with 57%. — [BusinessInfo (403, snippet)](https://www.businessinfo.cz/clanky/ceske-firmy-neznaji-ai-act-jen-kazda-dvanacta-resi-regulaci-umele-inteligence/)
- ČAUI AI Readiness Index, Oct 2024, more than 1,000 organisations:
  - About 83% lack AI talent in their teams.
  - 71% have low AI literacy.
  - More than 68% say their culture lacks room for experimentation.
  - 54% have already identified specific AI use cases.
  - SMEs face bigger challenges because of limited technical resources.

  — [CNN Prima News, 1 Oct 2024](https://cnn.iprima.cz/dve-tretiny-ceskych-firem-nejsou-ai-gramotne-cukrarna-prekonala-banku-jak-to-zmenit-449208)

### Inferences
- Across sources the ranking is consistent:
  1. Not knowing how or where (expertise, use cases, where to start).
  2. Money or ROI, ranked higher in Czech chamber and AMSP surveys than in the EU, where costs come 6th.
  3. Data security.
  4. Legal uncertainty.
  5. Errors and hallucinations, which show up strongly in Czech owner surveys.
- Slovakia and Poland report costs much higher than the EU (48–56% vs 38%). This suggests price sensitivity is a regional (CEE) trait, so Czech SMEs plausibly behave like their neighbours here. It is a proxy only.
- "Not useful for our business" is a minority view in the EU (18%). In Czech owner surveys it appears among non-users as a myth that AMSP explicitly pushes back on.

### Gaps
- There are no official Czech barrier percentages. They are not collected by ČSÚ, or at least not transmitted to Eurostat. Any claim like "X% of Czech firms say AI is too expensive (ČSÚ)" would be invented.
- The AMSP/Ipsos barrier chart (Q9) shows only three headline percentages in text form (31%, 27%, 26%). The full category list with percentages is only in the chart image, which I could not extract.

---

## 3. What do Czech surveys say about SME owners' attitudes, fears and expectations of AI and digitalisation?

### Takeaway
Czech SME owners are pragmatic and curious, but they cannot picture where AI fits in their own firm (they call it "nedostatek fantazie", a lack of imagination). Their concrete fears are:
- data security: 27–29%, rising to about half in EU-style questions;
- AI errors or hallucinations: 26%;
- cost and uncertain return;
- feeling lost in IT vendors' offers: nearly half of small firms can barely navigate them.

Fear of losing jobs to AI is high among the public (58% of Czechs, Jan 2026). Owners, however, see AI as relief for overloaded existing staff, not as a way to cut headcount; only 4% plan reductions. The top expectation is faster administration (50–65%).

### Cited Findings
**Expectations and benefits**
- AMSP/Ipsos, Feb 2026: 50% of firms expect AI to speed up administration. Automating routine work comes next. Micro firms and OSVČ expect cost savings markedly less often than high-turnover firms. — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- HK ČR, autumn 2024: 64.5% see AI's biggest benefit in faster administrative processes, 37.7% expect cost reduction, 23.7% expect better employee training. The HK ČR president links this to the bureaucratic burden from national and EU law. — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- AMSP/Ipsos, Feb 2026, effects actually seen from AI: 31% see better output quality, roughly a quarter report direct cost savings, and 31% see no effect yet. — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- EY Entrepreneurship Barometer 2025, CESA region, n=1,031: 63% expect higher efficiency and productivity from AI. Main benefits named are automation, marketing, customer service and data analysis. — [EY 2025 CZ PDF](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)
- Deloitte/ČAUI, Apr 2026: expected benefits are efficiency and productivity 85%, decision-making and data 64%, innovation 52%, customer relations 21%, direct revenue growth 18%. — [Deloitte](https://www.deloitte.com/cz-sk/cs/about/press-room/pruzkum-deloitte-a-caui-ai-prestava-byt-experimentem.html)

**Attitudes, experience and competitive pressure (AMSP/Ipsos, Feb 2026)**
- 60% have a good personal experience with AI tools. By size: micro 46%, small 61%, medium 70%.
- 44% feel their firm lags in digitalisation.
- 43% feel strong pressure to adopt AI because of competitors. By size: micro 23%, small 50%, medium 53%.

— [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- Tool awareness, Feb 2026: ChatGPT 82%, Gemini 61%, Microsoft Copilot 47%, DeepL 33%, Midjourney/DALL-E 17%, Claude 15%.
- What "AI in the firm" means to owners: most spontaneous answers are about speeding up work and automation. 34% of answers fall into "other", which AMSP reads as no settled picture of AI in business.

— [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo section 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- Governance, Feb 2026:
  - 36% have a person responsible for AI.
  - 33% have a dedicated AI budget: micro 18%, small 31%, medium 46%.
  - 32% measure AI benefits with KPIs.
  - 29% have AI usage rules: micro 18%, medium 38%.

— [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

**Fear of data leaks and GDPR**
- AMSP/Ipsos, Feb 2026: 27% cite data-security concerns as a barrier. On preventing staff from pasting sensitive data into AI, 37% rely only on a formal ban or directive and 30% have nothing in place or no overview. Real technical safeguards are used by "only a small minority". — [AMSP/Ipsos Rok AI 2026, Q6b/Q9](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- AMSP/Ipsos, Dec 2024: 29% fear data leaks and 30% fear IT outages (digitalisation in general). — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- EY 2025, CESA region (not CZ-only): the biggest AI concerns are data protection 48%, unclear regulation 38% and authorship/IP 27%. 43% of firms have not yet invested in AI. — [EY 2025 CZ PDF](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)
- Tempo qualitative study (n=20 owners and managers, 11–18 Mar 2026):
  - Firms handle data risk pragmatically: they simply do not put sensitive data into AI.
  - Firms handling sensitive data stay inside the Microsoft ecosystem, using paid Copilot for its perceived data protection.
  - One micro-firm owner described feeling she was losing control over who can access and misuse her data.

  — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Fear of errors and hallucinations**
- 26% name hallucinations and AI errors as a barrier (Feb 2026). — [AMSP/Ipsos via Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- In the focus group, hallucinations were among the most frequent topics, even for advanced users. Owners say they must check every output and lack the time to do so. Several compare AI errors with human errors and handle them the same way, through checking and correction. Deloitte/ČAUI also lists low trust in AI outputs as an everyday barrier. — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf); [Deloitte](https://www.deloitte.com/cz-sk/cs/about/press-room/pruzkum-deloitte-a-caui-ai-prestava-byt-experimentem.html)

**Not knowing where to start, and lack of time**
- AMSP's own comment: firms are not against innovation, they just do not know how to go about it. — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- 57% of firms are uncertain where and with what to start, and 68% lack capacity or people (Dors & Venabili, June 2025, snippet). — [BusinessInfo (403, snippet)](https://www.businessinfo.cz/clanky/ceske-firmy-neznaji-ai-act-jen-kazda-dvanacta-resi-regulaci-umele-inteligence/)
- Tempo, Mar 2026 (qualitative): owners spend 80% or more of their time on operations, such as e-mails, coordinating people, admin, invoices and sometimes even packing parcels. Strategy, including AI, gets weekends at best. AI could shrink operations, but implementing it needs exactly the time operations consume. BusinessInfo's headline calls this the "past operativy" (operations trap). Owners say they do not want more webinars or courses. They want someone to come into the firm, map their processes and show them where and how to use AI. — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf); [BusinessInfo headline](https://www.businessinfo.cz/clanky/nastup-ai-do-praxe-brzdi-past-operativy-vyplyva-z-pruzkumu-pro-amsp-cr/)
- Preferred sources of support (Feb 2026): educational institutions 37%, the state 35%, associations 24%. AMSP reads this as demand for trustworthy, non-sales information. — [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf); [AMSP/Ipsos](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

**Cost and distrust of suppliers**
- AMSP, Dec 2024: nearly half of small firms find digital suppliers' offers very hard or impossible to navigate, and another 40% find them quite complicated. Even 25% of larger firms with an IT department have the problem. ROI is one of the primary decision criteria. — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- Tempo, Mar 2026: one micro firm in energy got a quote starting at 800,000 CZK after months of talks with a developer. It found the price unrealistic and suspected vendors profit from clients' ignorance. Experienced users reason in simple payback terms: a Copilot licence of about 700 CZK/month pays for itself if it saves one hour a month. — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Fear of job loss**
- Public opinion: 58% of Czechs (18–65, n=1,010, Jan 2026) fear losing jobs because of AI, and 31% expect new jobs. The global figures are 67% and 43%. — [Ipsos Globální očekávání 2026](https://www.ipsos.com/cs-cz/node/1066901)
- Owners: over the next 3 years, 15% expect headcount to rise (business growth), 34% expect the same headcount with changed roles, 4% plan reductions, 13% say AI will not affect HR plans and 33% do not know (AMSP/Ipsos, Feb 2026). — [AMSP/Ipsos Rok AI 2026, Q11](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- Only 9% see AI as a solution to staff shortages, although 32% of firms suffer from staff shortages (AMSP/Ipsos, Feb 2026). — [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- Focus group: owners use AI so the current team can handle more, not to replace people. Attempts to replace a person with AI failed. The roles they cannot fill (sales, project managers, client contact) are the ones AI cannot do. — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- 24% of (mostly larger) firms expect significant job replacement by AI (Deloitte/ČAUI, Apr 2026). Only 9% of Czech firms plan to reduce staff (EY 2025, CZ n=70). — [Deloitte](https://www.deloitte.com/cz-sk/cs/about/press-room/pruzkum-deloitte-a-caui-ai-prestava-byt-experimentem.html); [EY 2025](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)

**What moves owners from doubt to adoption (qualitative)**
- Turning points come from an outside push: a colleague showing a real use, a consultant helping name the problem, or a first personal success.
- A key shift is moving from "asking AI questions" to "giving AI tasks".
- Owners report savings in the hundreds of thousands of CZK, for example 200–300k CZK saved on migrating ERP data, and analysis shortened from weeks to days. Nobody measures benefits systematically.

— [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

### Inferences
- The strongest objection-handling themes for copy are:
  - "We show you on your own process", which answers "I can't imagine it".
  - "We set it up, you don't need time", which answers the operations trap.
  - "Sensitive data stays protected", for the 27–29% who fear leaks.
  - "Human check and transparent errors", for the 26% who fear hallucinations.
  - "Fixed price, plain language", for the half of small firms lost in IT offers and the 800k-quote distrust.
- Frame the job angle as "relief for your overloaded people", not "replace staff". This matches owners' own framing and avoids triggering the 58% public fear.
- FainStudio's 18–45k CZK price sits far below the 800k CZK quote that shocked a micro firm. It is close to the cost of a few months of a few Copilot licences. That gap is itself a selling point; this is an inference, not measured.

### Gaps
- I found no Czech SME-specific survey with a percentage for "lack of time" as an AI barrier. The 68% "capacity/people" figure (Dors & Venabili) is closest, and it is snippet-only.
- KPMG Czech and PwC CEO Survey 2026 Czech AI chapters were not accessible (the PwC PDF failed to download). Microsoft/LinkedIn has no Czech-specific Work Trend Index figures that I could find. Komerční banka, ČSOB, Raiffeisen, Seznam/Heureka, NAKIT and CzechInvest: no SME AI-attitude survey with numbers was found. KB and CzechInvest appear only as partners and commentators in the AMSP Dec 2024 survey.
- AMSP/Ipsos fieldwork dates are not stated; the report is dated Feb 2026. The Dec 2024 AMSP sample size is not stated in the press release.

---

## 4. Biggest operational pains of Czech SMEs that automation addresses

### Takeaway
The pains are rising costs (about half to over 90% of firms, depending on the survey), bureaucracy and administration (31–81%), staff shortages (32–88%), and owners swallowed by operations (80%+ of their time, qualitative). The labour market remains one of the tightest in the EU: unemployment was 3.1% vs 6.0% in the EU in April 2026, and Czechia was often lowest in the EU in 2025. Wages rose 7.2% nominally in 2025, to an average of 49,215 CZK a month. Slow response to customers is not measured in any recent Czech study. The proxy is that only 2.1% of Czech firms with 10+ employees run a chatbot.

### Cited Findings
**Costs and wages**
- AMSP/Ipsos, Feb 2026: 51% of firms are most troubled by rising costs and price pressure, and 31% by bureaucracy and administration. AMSP calls it a paradox that firms are drowning in paperwork but reluctant to use automation. Fewer than one-fifth of firms report growth; most are holding position. — [AMSP/Ipsos Rok AI 2026, Q_K1/K2](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- EY Barometer 2025 (CZ n=70, H1 2025):
  - Over 90% of Czech firms worry about rising costs.
  - 81% see excessive bureaucracy and complicated regulation as an obstacle.
  - Across the region, 85% name rising operating and wage costs as the biggest threat.
  - Main hiring obstacles in the region: lack of qualified workers, high wage costs and inability to compete on pay.

  — [EY 2025 CZ PDF](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)
- Wages, ČSÚ:
  - Average gross monthly wage 2025: 49,215 CZK, up 7.2% nominally and 4.6% in real terms. Inflation was 2.5%.
  - Q4 2025: 52,283 CZK (+7.4% nominal); median 45,523 CZK (+8.8%).
  - Preliminary figures, released 6 Mar 2026.

  — [ČSÚ rychlá informace Q4 2025](https://csu.gov.cz/rychle-informace/prumerne-mzdy-4-ctvrtleti-2025)

**Labour shortage**
- Unemployment (Eurostat via ČTK): Czechia 3.1% in April 2026, down from 3.2% in March, against an EU average of 6.0%. That made Czechia third-lowest in the EU behind Bulgaria (2.8%) and Poland (3.0%). — [České noviny / ČTK, 2026](https://www.ceskenoviny.cz/zpravy/nezamestnanost-v-eu-v-dubnu-zustala-na-sesti-procentech-v-cesku-se-snizila/2832928)
- Media in 2025 repeatedly reported Czechia as having the lowest unemployment in the EU. One summary cited 2.7% (Eurostat, October, presumably 2025). The exact month was not verified. — [E15 headline](https://www.e15.cz/domaci/nezamestnanost-v-cesku-je-nejnizsi-v-cele-eu-vyrazne-ubylo-volnych-mist-1411501)
- EIB EIBIS 2025 (CZ n=482), long-term obstacles to investment:
  - Staff shortages: 88%, more prominent than the previous year.
  - Uncertainty about the future: 84%.
  - Energy costs: 69%, down from 95% in 2024.

  — [EIB 2025](https://www.eib.org/en/press/all/2025-499-czech-firms-outpace-eu-peers-in-ai-adoption-and-innovation-eib-survey-finds)
- AMSP/Ipsos, Feb 2026: 32% of firms are troubled by a lack of qualified staff. Small and medium firms are hit harder than micro firms. — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- HK ČR barometer, autumn 2024: 49.5% say human capital is a barrier to automation and AI. This covers unwilling or unqualified staff, managers or owners, and the cost or availability of skilled staff. — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- A later HK ČR barometer reportedly found 51.1% of firms naming a lack of qualified labour as a top obstacle, and 57.9% of construction firms (Dec 2025). This is snippet only; the source page was not identified. — (search summary, unverified)

**Administrative burden**
- HK ČR, autumn 2024: 45.9% cite regulatory or administrative burden (data handling, safety and production requirements) as a barrier to automation and AI, and 16.8% call it a major barrier. 64.5% expect AI to speed up admin. — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- AMSP, Dec 2024: 49% of SMEs have fully digitised accounting and invoicing, and only 6% are not considering it. HR and e-commerce lag; up to 46% of small firms do not plan digital HR tools. Small firms criticise bureaucracy and complicated dealings with authorities. — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- Tempo, Mar 2026: one firm still prints documents and retypes them into the system by hand. Owners name invoice approval, coordinating people, e-mail flood and process checks as their main time sinks. — [Tempo report, s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Owner overload**
- Owners and managers in the focus group (n=20) report 80% or more of their time in operations: customer support, orders, accounting paperwork, staff questions and e-mails. Strategic work happens on weekends. — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

**Customer response (proxy only)**
- Firms with 10+ employees, 2025: web-chat customer support 8.2% (small firms 7.4%); web chat with a chatbot 2.1% (small 1.5%, large 8.2%); website that allows online ordering or booking 30.3%. — [ČSÚ 2025 XLSX, T6](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx); [ČSÚ ICT v podnicích](https://csu.gov.cz/ict-v-podnicich)

### Inferences
- FainStudio's automation set maps directly onto the documented pains:
  - Inbound inquiry handling → owner overload and slow replies.
  - Invoice, order and contract processing → admin burden, and the 50–65% who expect AI to speed up admin.
  - Price and competitor monitoring → cost pressure.
  - AI chat over documents → staff shortage and knowledge bottlenecks.
- Wages grew 7.2% in 2025 and the labour market is tight, so "doing more with the same team" is the economic argument. FainStudio's 18–45k CZK equals about 0.4–0.9 of one average gross monthly wage in 2025 (my calculation from 49,215 CZK).
- Fewer than 1 in 10 Czech firms offer any web chat. That leaves a wide-open field for "instant reply to inquiries".

### Gaps
- No recent (2024–2026) Czech study measures how fast SMEs reply to e-mail or web inquiries. The latest mystery-mailing studies found are from 2016 or older and cover banks.
- I found no Czech figure for hours per week SMEs spend on administration. Only "share of firms troubled by bureaucracy" exists.
- The MPO "Zpráva o vývoji MSP" for 2024/2025 (SME counts and employment share) was not located. Older reports give SMEs as 99.8% of active businesses and about 59–60% of business-sector employees (2013–2016 data); these are too old to cite as current.

---

## 5. Who is the typical decision maker, how are purchases of this size decided in a Czech SME, and what size are the firms that adopt?

### Takeaway
In Czech SMEs the decision maker is the owner, jednatel or director. In small firms "management = owner": if the owner does not engage, nobody does. Purchases are judged on simple payback (ROI is a primary criterion) and are mostly self-financed (75%). Small firms struggle to understand vendor offers and to justify even small sums internally. The most active adopters are small-to-medium firms (11–250 employees), not micro firms. 20% of micro firms ignore AI, and only 18% of micro firms have any AI budget, against 46% of medium firms. No study measures the role-by-role sign-off process or buying-cycle length for a 20–50k CZK purchase.

### Cited Findings
**Who decides**
- Both AMSP studies deliberately target the decision maker. The Ipsos survey sample is "owners, jednatelé or directors of micro, small and medium enterprises (0–250 employees)". The Tempo focus group consisted of "owners, jednatelé or senior managers, people who decide in the firm". — [AMSP/Ipsos](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [Tempo report, methodology](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- Tempo, Mar 2026 (qualitative):
  - The owner's attitude decides whether the firm adopts AI.
  - In small firms the leadership is the owner, and if the owner is not interested nobody else will drive it.
  - Where the owner delegated without understanding, nothing moved.
  - Where leadership lacks the will, firms hire more people instead of changing processes.
  - Employees split into those who start on their own and those who need ready-made solutions built into processes.

  — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- AMSP/Ipsos, Feb 2026: 36% of firms have a designated AI person or "ambassador": micro 27%, small 33%, medium 46%. — [AMSP/Ipsos](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- HK ČR, autumn 2024: the "human capital" barrier (49.5%) explicitly includes unwillingness or insufficient qualification of "management or owners". — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)

**How purchases are decided and financed**
- AMSP, Dec 2024:
  - SMEs are typically motivated by purely practical benefits: efficiency and productivity at lower cost.
  - ROI is one of the primary decision criteria (AMSP vice-chair Pavla Břečková).
  - 75% will finance digitalisation solely from own resources. In manufacturing, nearly 30% rely on subsidies.
  - Only 12% have a clear digital strategy: medium firms about 20%, small firms 5%, with 41% of smaller firms working on one.

  — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- AMSP, Dec 2024, understanding offers: nearly half of small firms navigate supplier offers with great difficulty or not at all, and another 40% find them quite complicated. Small firms are therefore very cautious about investing larger sums in something they do not fully understand. AMSP's recommendation is to communicate "in the language of business, not technology" and to demonstrate successful implementations. — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- Tempo, Mar 2026:
  - Experienced owners compute payback simply (licence cost vs hours saved).
  - Less experienced ones cannot judge whether a quote is fair.
  - For small firms even a low amount is a problem if it must be defended to others in the firm, for example members of an association.

  — [Tempo report](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)
- EIB 2025: internal funds finance 65% of Czech firms' investment. Among users of external finance, 21% use grants or subsidies, against 37% in the EU. — [EIB 2025](https://www.eib.org/en/press/all/2025-499-czech-firms-outpace-eu-peers-in-ai-adoption-and-innovation-eib-survey-finds)
- EY 2025: Czech firms show high reliance on own capital. — [EY 2025 CZ PDF](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)
- AMSP/Ipsos, Feb 2026, plans for the next 12 months:
  - 8% plan systematic company-wide use.
  - 30% plan rollout into specific processes or departments.
  - 35% will leave AI to individual employees.
  - 17% plan no changes.
  - 10% do not know.

  — [AMSP/Ipsos Rok AI 2026, Q10](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

**Size of adopting firms**
- AMSP/Ipsos, Feb 2026:
  - Small and medium firms lead in testing AI; medium-sized and digitalised firms are the "innovation leaders".
  - 20% of micro firms do not deal with AI at all.
  - OSVČ adopt AI markedly less.
  - Dedicated AI budget: micro 18%, small 31%, medium 46%.

  — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- HK ČR, autumn 2024: firms that neither use nor plan AI make up nearly 48% of micro firms and 43% of small firms. — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- ČSÚ 2025: AI use doubles from small (13.4%) to medium (28.8%) firms. CRM use: small 30.0%, medium 57.2%. ERP use: small 41.8%, medium 76.4%. — [ČSÚ 2025 XLSX](https://csu.gov.cz/docs/107516/72eccf64-365a-0c52-e4e7-22959c5364b8/1_it_podniky_cz_2025.xlsx)
- Sample structure of AMSP/Ipsos, Feb 2026: turnover under 10m CZK 34%, 10–99.99m CZK 39%, 100m CZK or more 22%. — [AMSP/Ipsos, sample structure](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)

### Inferences
- FainStudio's avatar is most likely an owner or jednatel of a firm with roughly 10–50 employees (possibly up to about 100). Such a person is personally overloaded with operations and already uses ChatGPT. They feel competitive pressure: 50% of small firms do. They have a small or no AI budget, finance it from cash flow, and decide alone or with a partner on gut feel plus a simple payback calculation.
- Micro firms and OSVČ are a weaker segment: lower pressure (23%), lower expected savings, 20% ignoring AI and 18% with a budget.
- An 18–45k CZK one-off purchase is probably below any formal approval threshold in such firms. The owner's own understanding and trust is the gate, not procurement. This is an inference; no data on approval thresholds was found.

### Gaps
- No Czech data on the role split of buyers (owner vs COO vs finance) for digital or AI services. No data on purchase-cycle length, number of quotes requested, or approval thresholds in SMEs.
- No Czech data on what share of SMEs are owner-managed or family firms with current numbers. AMSP mentions family firms as a focus but gives no figure in the sources read.

---

## 6. EU AI Act and regulatory worries among Czech firms; subsidies (OP TAK, vouchers) as a trigger

### Takeaway
Most Czech firms are unaware of or unprepared for the AI Act. In June 2025 only 8% had taken concrete steps and only 18% knew it well (snippet-sourced). Regulation is a background worry: 28% fear changing digital regulation (AMSP 2024), 45.9% see regulatory or admin burden as a barrier to automation (HK ČR 2024), and in the EU 54% of firms that considered AI cite legal uncertainty (2025). It is not the top barrier for SMEs. Subsidies are not a realistic trigger at FainStudio's price point:
- The main OP TAK call "Digitální podnik – Digitální technologie I" (2025–26) requires at least 2.5m CZK of eligible project costs.
- The whole allocation goes to "transition regions", which excludes Prague.
- 75% of SMEs self-finance digitalisation.

### Cited Findings
**AI Act and regulation**
- Dors & Venabili, June 2025, more than 600 Czech firms (snippet; page 403):
  - Only 8% have taken concrete steps regarding the AI Act.
  - More than half do not know about it or think it does not apply to them.
  - Only 18% know it well.
  - 45% use AI, but only 14% use it fully.

  — [BusinessInfo (403, snippet)](https://www.businessinfo.cz/clanky/ceske-firmy-neznaji-ai-act-jen-kazda-dvanacta-resi-regulaci-umele-inteligence/)
- AMSP, Dec 2024: 28% of SMEs fear changing regulation in digital technologies. — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- HK ČR, autumn 2024: regulatory or administrative burden is a barrier to automation, robotisation and AI for 45.9% of firms, and a major barrier for 16.8%. HK ČR proposes an "anti-bureaucracy law". — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- AMSP's own position, Feb 2026: "stop dealing with regulation and start dealing with education" (paraphrase of the AMSP comment on the knowledge barrier). — [AMSP/Ipsos Rok AI 2026](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf)
- EY 2025, CESA region (not CZ-only): unclear regulation is the second-biggest AI concern at 38%. Only 6% of firms rate the regulatory environment as favourable. — [EY 2025 CZ PDF](https://www.ey.com/content/dam/ey-unified-site/ey-com/cs-cz/newsroom/2025/05/ey-entrepreneurship-barometer-survey-2025-cz.pdf)
- Deloitte/ČAUI, Apr 2026: in relation to European AI regulation, data protection and cybersecurity are the biggest concerns (no percentages). — [Deloitte](https://www.deloitte.com/cz-sk/cs/about/press-room/pruzkum-deloitte-a-caui-ai-prestava-byt-experimentem.html)
- EU benchmark, 2025: lack of clarity about legal consequences is cited by 53.6% of EU firms that considered but do not use AI (EU small firms 54.8%; SK 54.2%; PL 52.3%). Czech values are not reported. — [Eurostat isoc_eb_ai API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_eb_ai?format=JSON&lang=EN&geo=CZ&geo=EU27_2020&time=2024&time=2025)
- Industry lobbying (snippet; not opened): in Feb 2025 the Svaz průmyslu a dopravy ČR and Prg.ai co-signed an open letter warning the European Commission that over-regulation, notably the GPAI code of practice, stifles innovation especially for SMEs. In July 2025 Czechia proposed postponing parts of the AI Act, and the Commission refused. — [Lupa.cz](https://www.lupa.cz/aktuality/eu-se-stane-byrokratickym-monstrem-a-ztrati-konkurenceschopnost-v-ai-pisi-ceske-firmy-do-bruselu/); [Lupa.cz](https://www.lupa.cz/clanky/zadne-odklady-regulace-ai-nebudou-jede-se-podle-planu-vzkazuje-statum-a-firmam-evropska-komise/)
- Only 29% of SMEs have AI usage rules (AMSP/Ipsos, Feb 2026). The AI Act's AI-literacy obligation for deployers has applied since Feb 2025 (per the Dors & Venabili summary, snippet). — [AMSP/Ipsos](https://www.amsp.cz/media/amsp/16310/vysledky-pruzkumu-ipsos-ai-2026.pdf); [BusinessInfo (snippet)](https://www.businessinfo.cz/clanky/ceske-firmy-neznaji-ai-act-jen-kazda-dvanacta-resi-regulaci-umele-inteligence/)

**Subsidies as a trigger**
- OP TAK "Digitální podnik – Digitální technologie – výzva I":
  - Announced 26 Sep 2025; applications 20 Oct 2025 – 18 Feb 2026; allocation 1 bn CZK.
  - Main target group: SMEs. Supported: automation, data digitalisation, process connection.
  - Total eligible costs must be at least 2.5m CZK and at most 100m CZK. Projects below the minimum are inadmissible.
  - Support rate: small firms 35–45%, medium 25–35%, depending on region. The beneficiary pays at least 25%.
  - The whole allocation goes only to projects located in transition regions. The rate table lists regions in Střední Čechy, Jihozápad and Jihovýchod only; Prague is not among them.

  — [OP TAK call text (PDF)](https://optak.gov.cz/UserFiles/File/1758822140v-zva-digit-ln-technologie.pdf)
- OP TAK "Poradenství" (digital/circular audit), 2nd call: 150m CZK allocation, applications 2 Apr – 1 Dec 2025 (snippet; probably closed). — [BusinessInfo (snippet)](https://www.businessinfo.cz/clanky/dotace-z-op-tak-podpori-digitalni-a-cirkularni-audit-v-ramci-nove-vyzvy-pripraveno-je-150-milionu/)
- AMSP, Dec 2024: 75% of SMEs will finance digitalisation solely from own resources, and only 7% do not plan digitalisation at all. In manufacturing nearly 30% rely on subsidies. Nearly two in three firms rate state support for digitalisation as insufficient, and small firms criticise bureaucratic burden. — [AMSP TZ 4 Dec 2024](https://amsp.cz/wp-content/uploads/2024/12/TZ-AMSP-CR-2024-12-04-Podnikani-v-digitalni-ere_RNE-2024_FINAL-1.pdf)
- HK ČR, autumn 2024: "absence of suitable subsidy titles" is part of the finance barrier, which 55.6% cite. — [Komora 02/2025](https://cot.cz/wp-content/uploads/K_25_02.pdf)
- EIB 2025: Czech firms use grants or subsidised finance less than EU peers (21% vs 37% of external-finance users). — [EIB 2025](https://www.eib.org/en/press/all/2025-499-czech-firms-outpace-eu-peers-in-ai-adoption-and-innovation-eib-survey-finds)
- AMSP/Ipsos, Feb 2026: 35% would welcome support from the state when implementing AI. — [Tempo s. 07](https://www.amsp.cz/media/amsp/16307/vysledky-tempo-report-ke-kvalitativnimu-vyzkumu-pro-rok-ai-2026.pdf)

### Inferences
- The AI Act is a low-salience but useful trust lever. Most SMEs do not know what it requires, and 70% have no AI rules. "Set up in line with GDPR and the AI Act, with clear rules for your staff" can reassure without frightening, and positions FainStudio as the knowledgeable party.
- Subsidies should not be part of the pitch. An 18–45k CZK project is about 1/55 to 1/140 of the 2.5m CZK OP TAK minimum, and Prague (FainStudio's base) is outside the call's regions. Copy can instead stress "pays for itself without grant paperwork", which matches the 75% self-financing norm and the dislike of bureaucracy.

### Gaps
- No national "digitalisation voucher" scheme for SMEs was found for 2024–2026. Regional innovation vouchers (for example Prague or regional authorities) were not researched and may exist.
- No representative Czech SME survey quantifies AI Act fear as a reason not to adopt. The Dors & Venabili numbers are snippet-only, with unknown sampling. The ČAUI/HK "AI MOMENTUM 2026" reportedly lists regulatory uncertainty (AI Act) among barriers, but no percentage was verifiable (page 403).
- The NPO (Národní plán obnovy) "Digitální podnik" calls and any 2026 OP TAK follow-up calls were not checked.
