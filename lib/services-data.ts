export interface ServiceProcess {
  num: string
  title: string
  desc: string
}

export interface ServiceBenefit {
  title: string
  desc: string
}

export interface ServiceData {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  metaDescription: string
  heroImage: string
  heroImageAlt: string
  /** Used on the /services listing page */
  listingParagraphs: string[]
  /** Used on the detail page — overview section */
  overviewParagraphs: string[]
  process: ServiceProcess[]
  benefits: ServiceBenefit[]
  /** Slugs of 2 related services shown at the bottom of the detail page */
  relatedSlugs: [string, string]
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'fractional-cfo',
    title: 'Fractional CFO Services',
    shortTitle: 'Fractional CFO',
    tagline: 'Executive financial leadership, without the full-time cost',
    metaDescription:
      'Finvesco International provides fractional CFO services for small and midsize businesses in Kenya — offering expert financial leadership, strategy, budgeting, cash flow management, and board-level reporting on a flexible engagement model.',
    heroImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Financial executive at work reviewing strategic reports',
    listingParagraphs: [
      'We provide high-level financial management and strategic guidance to both small and midsize companies — delivering executive-calibre financial leadership without the cost of a full-time hire.',
      'Our fractional CFO services cover financial strategy development, budget and cash flow management, reporting and compliance oversight, risk mitigation, and operational streamlining. We engage on a project or retainer basis, offering the flexibility your business needs at every growth stage.',
      'Whether you are navigating fundraising, preparing for a merger, solving profitability challenges, or managing rapid expansion, our fractional CFOs bring the clarity and execution expertise to move with confidence.',
    ],
    overviewParagraphs: [
      'Many growing businesses need CFO-level financial leadership but cannot yet justify — or afford — a full-time executive. Our fractional CFO service bridges that gap precisely, providing experienced financial leadership on a flexible, part-time or project basis tailored to your operational reality.',
      'We provide high-level financial management and strategic guidance to both small and midsize companies. Our fractional CFOs develop financial strategies, manage budgets and cash flow, oversee reporting and regulatory compliance, mitigate financial risk, and streamline operations for sustained profitability.',
      'Ideal for businesses at critical inflection points — fundraising rounds, mergers and acquisitions, rapid expansion, or profitability restructuring — our engagement model scales to fit your situation. We embed with your leadership team and act as a genuine financial partner, not just an external advisor.',
      'By engaging on a project or hourly basis, our clients gain the CFO-level clarity they need to make high-stakes decisions, satisfy investor expectations, and build robust financial infrastructure — at a fraction of the cost of a full-time hire.',
    ],
    process: [
      { num: '01', title: 'Onboarding', desc: 'We begin with a deep-dive into your current financial structure, reporting cadence, and growth objectives to establish baseline clarity.' },
      { num: '02', title: 'Diagnosis', desc: 'We identify gaps, inefficiencies, and risks across your financial operations — from cash flow management to reporting accuracy.' },
      { num: '03', title: 'Strategy Design', desc: 'We develop a tailored financial strategy aligned with your growth objectives, capital structure, and risk appetite.' },
      { num: '04', title: 'Implementation', desc: 'We work directly within your team to implement processes, reporting frameworks, controls, and management dashboards.' },
      { num: '05', title: 'Ongoing Review', desc: 'We provide regular financial reviews, board reporting, and strategy adaptation as your business evolves and markets shift.' },
    ],
    benefits: [
      { title: 'Cost-Effective Expertise', desc: 'Access CFO-level guidance at a fraction of the cost of a full-time executive hire — maximising your financial leadership ROI.' },
      { title: 'Flexible Engagement', desc: 'Engage on a project basis, monthly retainer, or for specific growth phases only — no long-term commitment required.' },
      { title: 'Immediate Impact', desc: 'Our fractional CFOs are operational within days, not months — no lengthy onboarding or recruitment cycles to slow you down.' },
      { title: 'Scalable Support', desc: 'Scale involvement up or down as your business needs change — from a single strategic sprint to a sustained multi-year engagement.' },
    ],
    relatedSlugs: ['consulting', 'financial-forecasts'],
  },

  {
    slug: 'consulting',
    title: 'Consulting Services',
    shortTitle: 'Consulting',
    tagline: 'Strategic clarity for your most complex financial decisions',
    metaDescription:
      'Finvesco International offers expert financial consulting services in Kenya — covering financial planning, cash flow optimisation, investment strategy, tax planning, and business growth advisory for small businesses and startups.',
    heroImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Strategy session with financial charts and business data',
    listingParagraphs: [
      'Our consulting services provide expert guidance tailored to your unique financial needs. As your trusted advisor, we offer strategic insights to help you make well-informed decisions, improve business performance, and achieve your financial goals with confidence.',
      'We assist with financial planning, cash flow optimisation, investment strategies, and tax planning and compliance — identifying opportunities to reduce liabilities and improve your overall financial position.',
      'For businesses looking to scale, our growth strategy consulting supports you in identifying new revenue streams, improving operational efficiency, and expanding market reach. With experienced consultants embedded alongside your team, you can navigate complex financial challenges and achieve lasting success.',
    ],
    overviewParagraphs: [
      'Our consulting services provide expert, tailored guidance built around your unique business context. Unlike generic advisory engagements, we invest time to understand your operations, markets, and ambitions deeply before recommending any course of action.',
      'We assist with financial planning — setting clear, achievable goals and creating actionable roadmaps to reach them. We advise on cash flow management, helping you optimise your finances, reduce costs, and increase profitability through disciplined operational financial management.',
      'Our consultants bring specialised expertise in investment strategies, ensuring your capital is deployed effectively while balancing risk and return to your strategic objectives. We also assist with tax planning and compliance, identifying opportunities to reduce liabilities legally and optimise your tax position.',
      'For businesses in growth mode, our advisory services extend to growth strategy — identifying new revenue streams, improving operational efficiency, and expanding your market reach. We remain engaged as your financial partner through execution, not just recommendation.',
    ],
    process: [
      { num: '01', title: 'Discovery', desc: 'We conduct a comprehensive review of your business model, financial position, market environment, and strategic ambitions.' },
      { num: '02', title: 'Gap Analysis', desc: 'We identify where your current financial strategy falls short of your growth ambitions and where value is being left on the table.' },
      { num: '03', title: 'Strategy Development', desc: 'We design a clear, actionable financial strategy tailored specifically to your business context, goals, and constraints.' },
      { num: '04', title: 'Action Planning', desc: 'We translate strategy into a detailed implementation roadmap with defined owners, timelines, milestones, and measurable KPIs.' },
      { num: '05', title: 'Progress Reviews', desc: 'We hold regular review sessions to track results, refine the approach, and hold all parties accountable to the plan.' },
    ],
    benefits: [
      { title: 'Tailored Guidance', desc: 'Every recommendation is built specifically for your business context — not a generic template applied across clients.' },
      { title: 'Multi-Domain Expertise', desc: 'From cash flow and tax to investment strategy and growth planning, we cover the full financial advisory spectrum.' },
      { title: 'Actionable Plans', desc: "We don't just advise — we produce concrete implementation plans your team can execute with confidence and clarity." },
      { title: 'Long-Term Partnership', desc: 'We remain engaged as your financial partner, providing continuity and accountability through the full execution cycle.' },
    ],
    relatedSlugs: ['fractional-cfo', 'financial-forecasts'],
  },

  {
    slug: 'business-acquisitions',
    title: 'Business Acquisitions & Due Diligence',
    shortTitle: 'Acquisitions',
    tagline: 'Informed acquisitions built on rigorous due diligence',
    metaDescription:
      'Finvesco International provides business acquisition advisory and due diligence services in Kenya — including business valuation, financial analysis, deal structuring, risk assessment, and post-acquisition integration planning.',
    heroImage:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Business professionals finalising a strategic acquisition agreement',
    listingParagraphs: [
      'Our advisory services for business acquisitions and due diligence ensure you make informed, strategic decisions while minimising risk. We provide accurate business valuation to determine fair market value, analyse financial statements, and assess profitability through comprehensive financial and operational due diligence.',
      'We assist in structuring and negotiating deals to secure favourable terms, while advising on optimal funding strategies including debt and equity financing. Our experts develop post-acquisition integration plans for seamless transition, cost optimisation, and performance monitoring.',
      'From identifying operational synergies to ensuring legal and regulatory compliance, we help you unlock value and position your business for long-term success at every step of the acquisition process.',
    ],
    overviewParagraphs: [
      'Acquiring a business is one of the most consequential decisions a company can make. Without rigorous due diligence and expert financial guidance, even well-priced acquisitions can become costly liabilities. Our advisory services ensure every acquisition decision is grounded in complete, accurate financial intelligence.',
      'We provide accurate business valuation to determine fair market value, analyse financial statements, and assess profitability and sustainability through comprehensive financial and operational due diligence. We uncover hidden liabilities, tax exposures, and any compliance gaps with GAAP standards that could affect the true cost of the acquisition.',
      'Our team assists in structuring and negotiating deal terms to secure the most favourable outcome, while advising on optimal funding strategies — including debt and equity financing. We develop post-acquisition integration plans designed for seamless transition, cost optimisation, and performance monitoring.',
      'From identifying operational synergies to ensuring legal and regulatory compliance throughout the transaction, we help you unlock value at every step — and position your expanded business for long-term, compounding growth.',
    ],
    process: [
      { num: '01', title: 'Target Assessment', desc: 'We help identify and evaluate acquisition targets against your strategic criteria, financial goals, and market positioning objectives.' },
      { num: '02', title: 'Business Valuation', desc: 'We determine fair market value through detailed financial modelling, comparable transaction analysis, and GAAP-compliant assessment.' },
      { num: '03', title: 'Due Diligence', desc: 'We conduct thorough financial, operational, and legal due diligence to surface all risks, liabilities, and compliance exposures.' },
      { num: '04', title: 'Deal Structuring', desc: 'We design and negotiate the optimal deal structure, payment terms, and financing arrangements to protect your interests and maximise value.' },
      { num: '05', title: 'Post-Acquisition Integration', desc: 'We develop integration plans to align operations, reporting systems, and team structures for a smooth and value-accretive transition.' },
    ],
    benefits: [
      { title: 'Risk Mitigation', desc: 'Comprehensive due diligence surfaces hidden liabilities and risks before you commit capital, protecting your investment from day one.' },
      { title: 'Fair Value Assurance', desc: 'Independent valuation ensures you pay the right price and enter negotiations from a position of informed strength.' },
      { title: 'Compliance Protection', desc: 'We ensure full GAAP compliance and regulatory adherence throughout the acquisition, minimising legal and financial exposure.' },
      { title: 'Negotiation Leverage', desc: 'Our deal structuring expertise equips you to negotiate favourable terms and walk away from deals that do not meet the standard.' },
    ],
    relatedSlugs: ['consulting', 'financial-forecasts'],
  },

  {
    slug: 'financial-forecasts',
    title: 'Financial Forecasts & Pro Forma Financials',
    shortTitle: 'Financial Forecasts',
    tagline: 'See your financial future before it happens',
    metaDescription:
      'Finvesco International delivers financial forecasting and pro forma financial services in Kenya — including revenue projections, expense modelling, cash flow forecasts, and investor-ready pro forma income statements, balance sheets, and cash flow statements.',
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Financial analyst reviewing detailed forecasting charts and projections',
    listingParagraphs: [
      'Accurate financial forecasts are vital for making informed business decisions and planning for growth. We provide detailed projections of your revenues, expenses, and cash flow to help you navigate your financial future with confidence.',
      'Our pro forma financial statements — including income statements, balance sheets, and cash flow statements — allow you to analyse future scenarios, anticipate risks, and identify opportunities before they arise. This gives leadership the clarity to commit capital and resources strategically.',
      'Whether you are preparing for fundraising, planning an acquisition, or managing a business pivot, our financial forecasting services deliver the rigorous modelling and scenario analysis needed to support your most consequential decisions.',
    ],
    overviewParagraphs: [
      'Accurate financial forecasts transform uncertainty into strategic clarity. Whether you are planning a funding round, evaluating an expansion, or stress-testing your business model, our forecasting services provide the rigorous, data-driven projections you need to make decisions with confidence.',
      'We deliver detailed projections of your revenues, expenses, and cash flow — built on validated historical data, realistic market assumptions, and scenario-tested growth models. Our process is methodical: we gather data, stress-test assumptions, build multi-scenario models, and produce outputs that leadership and investors can rely on.',
      'Our pro forma financial statements — including income statements, balance sheets, and cash flow statements — allow you to analyse future scenarios in granular detail. We present base, upside, and downside cases so you can understand the full range of outcomes and plan accordingly.',
      'From early-stage startups seeking investor-ready financial models to established businesses planning major capital decisions, our forecasting services are built to match the rigour your stakeholders demand and the insight your leadership needs.',
    ],
    process: [
      { num: '01', title: 'Data Gathering', desc: 'We collect and validate your historical financial data, market data, operational metrics, and any existing forecasting assumptions.' },
      { num: '02', title: 'Assumption Setting', desc: 'We work with your leadership team to define realistic growth assumptions, cost drivers, pricing models, and macroeconomic inputs.' },
      { num: '03', title: 'Model Building', desc: 'We construct detailed, integrated financial models covering revenue, costs, working capital, cash flow, and balance sheet projections.' },
      { num: '04', title: 'Scenario Analysis', desc: 'We run base, upside, and downside scenarios to stress-test your assumptions and equip decision-makers with a full range of outcomes.' },
      { num: '05', title: 'Reporting & Delivery', desc: 'We deliver clear, investor-ready outputs with narrative explanations, key assumptions documented, and actionable strategic insights.' },
    ],
    benefits: [
      { title: 'Decision Confidence', desc: 'Replace intuition-led decisions with data-driven projections that clarify the financial impact of every strategic choice.' },
      { title: 'Investor-Ready Outputs', desc: 'Pro forma financials built to the presentation standards that investors, banks, and boards expect and trust.' },
      { title: 'Risk Anticipation', desc: 'Scenario modelling lets you identify financial risks and plan mitigation strategies before they materialise into real costs.' },
      { title: 'Growth Planning', desc: 'Detailed forecasts give you the financial roadmap to plan hiring, capital deployment, and market expansion with precision.' },
    ],
    relatedSlugs: ['fractional-cfo', 'financial-reporting'],
  },

  {
    slug: 'sales-leaseback',
    title: 'Sales & Leaseback Negotiations',
    shortTitle: 'Sales Leaseback',
    tagline: 'Unlock the capital in your assets without losing control',
    metaDescription:
      'Finvesco International provides sales and leaseback advisory services in Kenya — helping businesses unlock capital tied up in property and equipment while retaining operational control through expert negotiation of leaseback terms.',
    heroImage:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Commercial property building — candidate for a sale and leaseback transaction',
    listingParagraphs: [
      'Our advisory services in sales and leaseback negotiations help businesses unlock capital tied up in assets — including property and equipment — while maintaining full operational flexibility and control.',
      'We negotiate favourable leaseback terms that offer stability, cost-efficiency, and long-term financial sustainability. Our team ensures the transaction structure aligns with your cash flow needs and preserves your balance sheet while improving liquidity for reinvestment or debt reduction.',
      'We also provide insights into market conditions, tax implications, and optimal timing for asset sales to maximise returns. With our support, you improve your financial position, enhance growth opportunities, and secure the capital you need without losing access to your critical assets.',
    ],
    overviewParagraphs: [
      'Capital tied up in property and equipment cannot be invested in growth. A sale-leaseback transaction unlocks that capital — allowing you to sell an asset to a buyer while simultaneously leasing it back, retaining full operational use of it while receiving the proceeds from the sale.',
      'Our advisory services guide you through every stage of this process. We assess your asset portfolio, identify the most suitable candidates for a sale-leaseback, and conduct thorough market valuations to ensure you receive fair and optimal pricing from qualified buyers.',
      'We negotiate leaseback terms with precision, ensuring the agreement provides operational stability, cost-efficiency, and flexibility. Our team ensures the transaction structure aligns with your cash flow requirements and preserves the overall health of your balance sheet.',
      'Beyond the transaction itself, we provide deep analysis of market conditions, tax implications, and optimal timing to maximise your return. Sale-leaseback structures, when executed well, improve liquidity, enhance balance sheet ratios, and often deliver significant tax advantages — we ensure you capture all of them.',
    ],
    process: [
      { num: '01', title: 'Asset Assessment', desc: 'We evaluate your full asset portfolio to identify the best candidates for a sale-leaseback based on value, operational criticality, and market conditions.' },
      { num: '02', title: 'Market Valuation', desc: 'We determine current fair market value for the identified assets to ensure you negotiate from a position of informed strength.' },
      { num: '03', title: 'Buyer Identification', desc: 'We identify and approach qualified buyers — including institutional investors, property funds, and asset-backed lenders — best suited to your needs.' },
      { num: '04', title: 'Term Negotiation', desc: 'We negotiate leaseback terms that protect your operational interests, cash flow needs, renewal options, and long-term flexibility.' },
      { num: '05', title: 'Transaction Closure', desc: 'We manage the full transaction process through to close, coordinating legal, financial, and tax compliance at every stage.' },
    ],
    benefits: [
      { title: 'Immediate Liquidity', desc: 'Convert illiquid fixed assets into working capital without disrupting business operations or losing operational access to those assets.' },
      { title: 'Retained Operations', desc: 'Continue using your assets under the leaseback agreement — business continuity is fully preserved throughout and after the transaction.' },
      { title: 'Balance Sheet Optimisation', desc: 'Improve your balance sheet leverage ratios and free capital for higher-return investments or debt reduction.' },
      { title: 'Tax Advantages', desc: 'Lease payments may be fully tax-deductible as a business operating expense, improving your effective tax rate and cash position.' },
    ],
    relatedSlugs: ['business-acquisitions', 'consulting'],
  },

  {
    slug: 'financial-reporting',
    title: 'Financial Reporting',
    shortTitle: 'Financial Reporting',
    tagline: 'Accurate reporting that powers confident decision-making',
    metaDescription:
      'Finvesco International delivers accurate, compliant financial reporting services in Kenya — including monthly, quarterly, and annual financial statements, balance sheets, income statements, cash flow statements, and management reporting for businesses of all sizes.',
    heroImage:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80',
    heroImageAlt: 'Financial reports and statements displayed on a professional laptop screen',
    listingParagraphs: [
      "Effective financial reporting is crucial for informed decision-making and regulatory compliance. Our financial reporting services deliver accurate, timely, and transparent reports — giving you a clear and complete picture of your business's financial health at all times.",
      'We prepare monthly, quarterly, and annual financial statements including balance sheets, income statements, and statements of cash flow. Our team ensures full compliance with industry standards and regulatory requirements, reducing the risk of errors and minimising audit exposure.',
      'By providing detailed insights into financial data, trends, and variances, we help you make strategic decisions, optimise cash flow, and plan confidently for the future — whether preparing for audits, investor presentations, or strategic growth initiatives.',
    ],
    overviewParagraphs: [
      'Financial reporting is the backbone of sound business management. Without accurate, timely, and well-structured financial statements, leadership cannot make informed decisions, investors lose confidence, and regulatory risk accumulates. Our financial reporting services eliminate all of that uncertainty.',
      "We prepare monthly, quarterly, and annual financial statements — including balance sheets, income statements, and statements of cash flow — to the standards your business, investors, and regulators require. Every report we produce gives you a complete, unambiguous picture of your business's financial health.",
      'Our team ensures full compliance with industry standards and regulatory requirements, reducing the risk of errors, misstatements, and audit findings. We conduct thorough reconciliation and validation at every stage of the reporting cycle to ensure the numbers are right before they reach any stakeholder.',
      'Beyond compliance, we provide financial analysis that turns raw numbers into actionable business intelligence. We highlight key trends, explain variances from budget, and flag risks and opportunities — so your reports are a tool for strategic decision-making, not just a compliance obligation.',
    ],
    process: [
      { num: '01', title: 'Data Collection', desc: 'We gather all financial transactions, account records, and source data from your accounting systems and third-party platforms.' },
      { num: '02', title: 'Reconciliation', desc: 'We reconcile all accounts, verify data accuracy and completeness, and resolve any discrepancies before proceeding to statement preparation.' },
      { num: '03', title: 'Statement Preparation', desc: 'We prepare balance sheets, income statements, and cash flow statements in full compliance with GAAP and applicable regulatory standards.' },
      { num: '04', title: 'Analysis & Commentary', desc: 'We provide financial analysis covering key trends, budget variances, risks, and opportunities — turning data into strategic insight.' },
      { num: '05', title: 'Review & Delivery', desc: 'We walk your leadership team through the findings in a structured review session, answer questions, and document actions arising.' },
    ],
    benefits: [
      { title: 'Audit Readiness', desc: 'Clean, compliant, well-documented financial statements prepared to the standard that external auditors and regulators require.' },
      { title: 'Compliance Assurance', desc: 'Full adherence to GAAP standards and regulatory requirements — reducing penalty risk and protecting your business reputation.' },
      { title: 'Management Insights', desc: "We don't just produce numbers — we translate them into actionable business intelligence that informs leadership decisions." },
      { title: 'Investor Confidence', desc: 'Accurate, transparent reporting builds the trust of investors, lenders, and board members who rely on your financials to make decisions.' },
    ],
    relatedSlugs: ['fractional-cfo', 'consulting'],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug)
}

export function getRelatedServices(relatedSlugs: [string, string]): ServiceData[] {
  return relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceData => s !== undefined)
}
