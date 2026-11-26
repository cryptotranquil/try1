// All site copy lives here. Edit this file to change text, then rebuild.

export const site = {
  name: "Spark Holdings",
  legalName: "Spark Holdings Pty Limited",
  email: "info@sparkholdingsmw.com",
  tel: { label: "+265 (0) 891 000 529", href: "tel:+265891000529" },
  cell: { label: "+265 (0) 888 646 567", href: "tel:+265888646567" },
  securityTels: [
    { label: "+265 999 930 551", href: "tel:+265999930551" },
    { label: "+265 897 643 137", href: "tel:+265897643137" },
  ],
  offices: [
    { name: "Lilongwe office", lines: ["Area 49, Sparrows Street", "House No. 49/2/303", "P.O. Box X289"] },
    { name: "Blantyre office", lines: ["Kameza Gulliver", "P.O. Box 3217"] },
  ],
  tagline: "Spark Holdings Pty Limited and its subsidiaries, Spark Security Solutions and Spark Cleaning Solutions.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/security", label: "Security" },
  { href: "/cleaning", label: "Cleaning" },
  { href: "/supplies", label: "Supplies" },
  { href: "/contact", label: "Contact" },
];

export type Item = { t: string; d?: string };
export type Group = { title: string; note?: string; items: Item[] };
export type Block = { label: string; title: string; cols: 2 | 3 | 4; items: Item[] };

export type Division = {
  slug: "security" | "cleaning" | "supplies";
  name: string;
  /** Full class names so Tailwind can see them. */
  bg: string;
  title: string;
  lead: string;
  description: string;
  homeBlurb: string;
  homeCta: string;
  homeImage: { src: string; alt: string };
  introTitle: string;
  intro: string[];
  vision: string;
  mission: string;
  mainImage: { src: string; alt: string };
  extraImages: { src: string; alt: string }[];
  groupsTitle: string;
  groups: Group[];
  blocks: Block[];
  clients?: Item[];
  quoteLabel: string;
};

export const security: Division = {
  slug: "security",
  name: "Spark Security Solutions",
  bg: "bg-sec",
  title: "Security guards you can check on, report to and rely on",
  lead: "Spark Security Solutions provides guarding, technical systems and security advice across Malawi, and reports to clients on how the service is performing.",
  description:
    "Security guards, VIP protection, CCTV, alarms, electric fencing, consultancy and private investigations in Malawi from Spark Security Solutions.",
  homeBlurb: "Guards, CCTV, alarms and security advice, with a shift report every day.",
  homeCta: "See security services",
  homeImage: { src: "/img/security/lineup.jpg", alt: "Seven Spark Security guards standing in a line" },
  introTitle: "Why we started",
  intro: [
    "Malawi's private security industry has grown quickly, and not every new provider puts service quality first. That leaves clients exposed.",
    "Spark Security Solutions was set up to bring professional policies, better service delivery and high performance standards to the sector. We work alongside the police, not in competition with them, to reduce risk and protect lives and property.",
  ],
  vision: "To be recognised and respected as the security service provider of choice, for both customers and employees.",
  mission:
    "To provide exceptional security services by combining the latest technology with expert guarding, protecting people, property and assets.",
  mainImage: { src: "/img/security/hero.jpg", alt: "Two Spark Security guards in black uniform, one facing the camera" },
  extraImages: [{ src: "/img/security/profile.jpg", alt: "A Spark Security guard in profile" }],
  groupsTitle: "What we provide",
  groups: [
    {
      title: "Manpower",
      note: "Guarding has been the backbone of Spark Security since the start.",
      items: [
        { t: "Standard guards" },
        { t: "Commissionaires" },
        { t: "Dog handlers" },
        { t: "Hotel security detectives" },
        { t: "VIP protection and bodyguarding" },
        { t: "Crowd control management" },
        { t: "Neighbourhood watch services" },
      ],
    },
    {
      title: "Technical services",
      note: "Equipment supplied and installed to suit the site.",
      items: [
        { t: "Access control systems" },
        { t: "Vehicle tracking" },
        { t: "CCTV installation" },
        { t: "Alarm system installation" },
        { t: "Beam sensors" },
        { t: "Electric fencing" },
      ],
    },
    {
      title: "Advice, investigation and training",
      note: "For businesses and individuals who want to improve their own security.",
      items: [
        { t: "Security consultancy", d: "Risk assessment, threat analysis and security strategy." },
        {
          t: "Private investigations",
          d: "Background checks, surveillance, fraud detection, forensic analysis, system audits, and legal and prosecution support in criminal and civil cases.",
        },
        {
          t: "Security management training",
          d: "Crisis management, emergency response, risk mitigation and leadership in security operations.",
        },
      ],
    },
  ],
  blocks: [
    {
      label: "Operations",
      title: "How we run the service",
      cols: 2,
      items: [
        {
          t: "Recruitment",
          d: "Applicants meet written and oral requirements. Employment is confirmed only after police or close-relative clearance, and recruits must meet standards for health, hygiene, fitness and appearance.",
        },
        {
          t: "Training",
          d: "Officers are trained for their specific tasks, evaluated constantly by management, and given refresher training regularly so standards do not slip.",
        },
        { t: "Cover", d: "Guards are posted to one site, and a dedicated reserve team covers absences so the service is not interrupted." },
        {
          t: "Reporting",
          d: "Daily shift reports and incident logging, timely client updates, monthly security reviews and monthly appraisal meetings with the client.",
        },
        {
          t: "Discipline",
          d: "Guards are smartly dressed and equipped, fit, sober and alert. There is zero tolerance for alcohol or drugs, and shift changes are completed within 30 minutes.",
        },
        {
          t: "Oversight",
          d: "Head office supervisors are the last tier of quality control, backed by a management team and the shareholders.",
        },
      ],
    },
    {
      label: "People",
      title: "How we treat our people",
      cols: 3,
      items: [
        { t: "Ethics and integrity", d: "We hold ourselves to the highest standards in how we work." },
        {
          t: "Reward and growth",
          d: "Staff are helped to reach their potential through performance and rewards, and are promoted from within on merit.",
        },
        {
          t: "Fair treatment",
          d: "Diversity, equal opportunity and open communication are part of our HR policy, and we support local employment.",
        },
      ],
    },
  ],
  quoteLabel: "Request a security quote",
};

export const cleaning: Division = {
  slug: "cleaning",
  name: "Spark Cleaning Solutions",
  bg: "bg-clean",
  title: "Clean offices, homes and grounds, on a schedule you agree",
  lead: "Spark Cleaning Solutions cleans offices and homes for companies and individuals across Malawi, and also handles pest control, landscaping, maintenance, waste and hygiene services.",
  description:
    "Office and home cleaning, pest control, landscaping, property maintenance, waste management and hygiene services in Malawi from Spark Cleaning Solutions.",
  homeBlurb: "Office and home cleaning, pest control, landscaping and hygiene, on a schedule you agree.",
  homeCta: "See cleaning services",
  homeImage: { src: "/img/cleaning/team.jpg", alt: "Spark Cleaning team in hard hats and high-visibility vests" },
  introTitle: "Who we are",
  intro: [
    "Spark Cleaning Solutions Pty Limited is a private limited company incorporated under the Companies Act 2013 of Malawi.",
    "Our staff have experience in office and domestic cleaning for companies and individuals, and we aim for three things: the best cleaning service, a tidy work environment, and cleaning products supplied with a guarantee.",
  ],
  vision:
    "To be a leading cleaning services provider with high standards of sanitation and better work and residential environments across the country.",
  mission:
    "To create real value for clients with quality, effective and guaranteed services that are efficient and economical, so clients stay with us.",
  mainImage: { src: "/img/cleaning/sprayers.jpg", alt: "Spark Cleaning staff carrying sprayers outside a brick building" },
  extraImages: [
    { src: "/img/cleaning/mop.jpg", alt: "A Spark Cleaning worker mopping with a bucket" },
    { src: "/img/cleaning/pest.jpg", alt: "Technician in protective suit spraying a floor edge" },
    { src: "/img/cleaning/lawn.jpg", alt: "A hand holding a turf of healthy grass" },
    { src: "/img/cleaning/maid.jpg", alt: "A Spark Cleaning worker cleaning a washroom" },
  ],
  groupsTitle: "Our services",
  groups: [
    {
      title: "Cleaning",
      note: "Contract cleaning for offices and one-off cleaning for homes and vehicles.",
      items: [
        { t: "Daily staff sanitation cleaning on site" },
        { t: "Daily, weekly and monthly office cleaning on contract" },
        { t: "Office and home carpet cleaning" },
        { t: "Office chair, boardroom chair and sofa cleaning" },
        { t: "Car interior and exterior cleaning" },
        { t: "Wall cleaning" },
        {
          t: "Cleaning products",
          d: "Machines such as vacuum cleaners and polishers, mops, brushes, cloths, toilet rolls, hand towels, refuse sacks, soap and detergents.",
        },
      ],
    },
    {
      title: "Pest control",
      note: "We use chemicals approved by the Government of Malawi and follow the laid-down procedure so they do not harm people or pets.",
      items: [
        { t: "Fumigation of offices, homes, warehouses and factories", d: "Rats, bed bugs, cockroaches, mosquitoes, termites and more." },
        { t: "Pest control on produce", d: "Maize, rice, beans, soya and more." },
      ],
    },
    {
      title: "Landscaping",
      note: "Tailored landscaping for gated communities, corporate institutions and schools.",
      items: [
        { t: "Hard landscaping", d: "Designing and creating a garden from scratch." },
        { t: "Soft landscaping", d: "Improving an existing garden with soil, organic manure and replacement plants." },
        { t: "Gardening", d: "Maintaining a garden with fertiliser, insecticide and weeding." },
      ],
    },
    {
      title: "Property maintenance and facilities",
      note: "Repairs and upkeep for buildings.",
      items: [
        { t: "Lighting repairs" },
        { t: "Plumbing and flooding issues" },
        { t: "Fence, ceiling and roof repairs" },
        { t: "Painting" },
        { t: "Replacing doors" },
        { t: "Tub repairs" },
      ],
    },
    {
      title: "Refuse and waste management",
      note: "Collection and disposal handled for you.",
      items: [{ t: "Pick-up and incineration of biohazard waste" }, { t: "Recycling options" }],
    },
    {
      title: "Hygiene services",
      note: "Supplied, installed and refilled on an agreed schedule.",
      items: [
        {
          t: "Sanitary bins",
          d: "Supply and service, cleaning and sanitising on schedule, and transport and incineration of the waste as the law requires.",
        },
        { t: "Automatic air freshener dispensers", d: "Supply, installation, and replacement of canisters and batteries." },
        { t: "Toilet seat sanitisers", d: "Supply, installation and replacement of sachets." },
        { t: "Hand driers", d: "Supply and installation at a one-time cost." },
      ],
    },
    {
      title: "Maid and staff services",
      note: "Vetted, trained people for homes and offices.",
      items: [
        { t: "Maid service", d: "Housekeeping weekly or twice a month by trained, vetted maids." },
        { t: "Messenger service" },
        { t: "Tea service", d: "Preparing tea and simple meals in the office kitchen and serving visitors." },
        { t: "Training", d: "We train clients' own employees to clean homes and offices to a good standard." },
      ],
    },
  ],
  blocks: [
    {
      label: "Why Spark Cleaning",
      title: "Why clients engage us",
      cols: 4,
      items: [
        { t: "On time", d: "Assignments are carried out when agreed." },
        { t: "Always improving", d: "We keep working on how the service is delivered." },
        { t: "Value for money", d: "Economical services that stay worth the cost." },
        { t: "Confidential and honest", d: "High business confidentiality, and honest dealing at every level." },
      ],
    },
    {
      label: "Values",
      title: "Our values",
      cols: 4,
      items: [
        { t: "Quality", d: "Quality services that help our clients' companies grow." },
        { t: "Effectiveness", d: "Delivery that is effective and in the client's best interest." },
        { t: "Honesty", d: "We work and provide services honestly at all levels." },
        { t: "Integrity", d: "Staff of high integrity who are well trained for quality office services." },
      ],
    },
  ],
  quoteLabel: "Request a cleaning quote",
};

export const supplies: Division = {
  slug: "supplies",
  name: "Spark Holdings Supplies",
  bg: "bg-supply",
  title: "Everything a site and an office run on, supplied with no minimum order",
  lead: "Spark Holdings supplies hardware, office stationery, computers, safety gear, security wear and casual workers to businesses in Malawi, and will customise products to a client's requirements.",
  description:
    "Hardware, office stationery, computers, industrial safety gear, tactical security uniforms and casual workers supplied across Malawi by Spark Holdings, with no minimum order.",
  homeBlurb: "Hardware, stationery, computers, safety gear and casual workers. No minimum order.",
  homeCta: "See supplies",
  homeImage: { src: "/img/supplies/hardhat.jpg", alt: "A worker in a red hard hat and orange vest" },
  introTitle: "Supply is our core business",
  intro: [
    "Alongside investments, general supply is the core of Spark Holdings. We source from reliable manufacturers so that products meet international standards, and we aim to be one of the trusted general suppliers in Malawi.",
  ],
  vision: "To become a reputable company in the supply chain industry, and to improve the quality of cleaning and security services.",
  mission: "To supply high quality products at affordable rates to individuals and organisations.",
  mainImage: { src: "/img/supplies/tools.jpg", alt: "Work gloves, boots, hard hat, hammer, cable and a drill laid out on a dark table" },
  extraImages: [{ src: "/img/supplies/stationery.jpg", alt: "Stationery including pencils, scissors, notebooks and a stapler" }],
  groupsTitle: "What we supply",
  groups: [
    {
      title: "Products and people",
      note: "A broad range, including customised products that meet a client's requirements.",
      items: [
        { t: "Hardware", d: "Building materials, electrical and plumbing equipment." },
        { t: "Office stationery and equipment" },
        { t: "Computers and accessories", d: "Printers, servers and backup power." },
        { t: "Industrial safety gear and equipment" },
        { t: "Tactical security uniforms and equipment" },
        { t: "General casual workers and related services" },
      ],
    },
  ],
  blocks: [
    {
      label: "Why Spark Supplies",
      title: "Why buy from Spark Holdings",
      cols: 4,
      items: [
        { t: "No minimum order", d: "Order what you need, in the quantity you need." },
        { t: "Proven quality", d: "Quality-proven products from reliable manufacturers." },
        { t: "Reach", d: "A wide distribution network, with logistics support for timely deliveries." },
        { t: "Pricing", d: "Competitive prices and customer service that follows through." },
      ],
    },
    {
      label: "Commitments",
      title: "What we hold ourselves to",
      cols: 3,
      items: [
        { t: "Quality assurance", d: "Quality is a pledge, not a notion. We go to great lengths to supply products that meet international standards." },
        { t: "Customer satisfaction", d: "An ethical approach, with respect and dignity for the individual and concern for society." },
        { t: "Valued clients", d: "Relationships built on respect, transparency and mutual benefit." },
      ],
    },
  ],
  clients: [
    { t: "Leopard Match 2018 Ltd", d: "Casual workers" },
    { t: "OG Match Company Ltd", d: "Stationery and toners" },
    { t: "George Robinson Associates Business Consultants Limited", d: "Stationery and computers" },
    { t: "CEAR, Limbe", d: "Casual workers" },
    { t: "Salima Sugar Limited", d: "Fertiliser, agri-chemicals, PPE, laboratory equipment and chemicals" },
  ],
  quoteLabel: "Request a supplies quote",
};

export const divisions: Division[] = [security, cleaning, supplies];

export const proof: Item[] = [
  { t: "Reports you can read", d: "Daily shift reports, incident logs and a monthly review meeting with your security team." },
  { t: "Cover without gaps", d: "A dedicated reserve team covers absences, so the service is not interrupted." },
  { t: "People we have checked", d: "Guards are confirmed only after police or close-relative clearance." },
  { t: "Order what you need", d: "No minimum order on supplies, with logistics support for timely deliveries." },
];

export const facts = [
  { n: "3", c: "Divisions: security, cleaning and supplies" },
  { n: "2", c: "Offices, in Lilongwe and Blantyre" },
  { n: "30", c: "Minutes or less to complete a guard shift change" },
  { n: "5", c: "Supply clients who can give a reference" },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "How do you choose and check your guards?",
    a: "Applicants meet written and oral requirements. Employment is confirmed only after police or close-relative clearance, and recruits must meet standards for health, hygiene, fitness and appearance.",
  },
  {
    q: "What happens when a guard is absent?",
    a: "Guards are posted to one site, and a dedicated reserve team covers absences so the service is not interrupted.",
  },
  {
    q: "How will I know how the security service is performing?",
    a: "You get daily shift reports and incident logging, timely client updates, monthly security reviews and monthly appraisal meetings.",
  },
  {
    q: "Are your pest control chemicals safe?",
    a: "We use chemicals approved by the Government of Malawi and follow the laid-down procedure so they do not harm people or pets.",
  },
  {
    q: "Is there a minimum order for supplies?",
    a: "No. You can order what you need, in the quantity you need, and we can customise products to your requirements.",
  },
  {
    q: "Can I speak to a client before I decide?",
    a: "Yes. The clients listed on the supplies page can speak about our work. Ask us for contact details when you need them.",
  },
];
