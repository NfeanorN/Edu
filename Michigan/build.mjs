#!/usr/bin/env node
/** Build Michigan/index.html from variant data. */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const ACCENT = '#1e4d8c';
const ACCENT_DARK = '#163a6b';

function q(num, en, options, correct, explain) {
  return { num, en, options, correct, ...(explain ? { explain } : {}) };
}
function opt(id, en) {
  return { id, en };
}

const variant01 = [
  q(1, 'A "Vigorous Petal" represents a supplementary element that:', [
    opt('a', 'Costs the company more than the economic value it generates in the short term'),
    opt('b', 'Is required by law and therefore does not allow any differentiation'),
    opt('c', "Distinguishes the company's value proposition from the competition"),
    opt('d', 'Is eliminated during crisis periods to protect the core product'),
  ], 'c', 'Vigorous petals are differentiating supplementary services (Flower of Service).'),
  q(2, 'In "High Contact Services", the main "Actors" are:', [
    opt('a', 'Exclusively the managers who decide the operational procedures'),
    opt('b', 'Both contact employees and the customers themselves'),
    opt('c', 'Only digital technologies that automate the process'),
    opt('d', 'Raw material suppliers supporting the value chain'),
  ], 'b'),
  q(3, '"Interactional Justice" focuses on:', [
    opt('a', 'Transparent and easy-to-follow rules to access the recovery system'),
    opt('b', 'Economic restitution or discount vouchers for future purchases'),
    opt('c', 'Social media monitoring to identify public complaints'),
    opt('d', 'Honest explanation, genuine effort, and polite treatment'),
  ], 'd', 'Procedural = rules; distributive = compensation; interactional = how people are treated.'),
  q(4, "Which of these is NOT an actor in the company's micro-environment?", [
    opt('a', 'Suppliers'),
    opt('b', 'Climate and weather conditions'),
    opt('c', 'Competitors'),
    opt('d', 'Customers'),
  ], 'b', 'Climate/weather = macro-environment, not micro actors.'),
  q(5, 'Relational marketing differs from transactional marketing by:', [
    opt('a', 'Focusing on maximizing sales volume per single transaction'),
    opt('b', 'Conflict orientation to get the most advantageous purchase price'),
    opt('c', 'Managing large databases aimed at undifferentiated mass promotion'),
    opt('d', 'The goal of initiating, maintaining and improving relationships over the long term'),
  ], 'd'),
  q(6, 'A specific challenge for service management is:', [
    opt('a', 'Totally eliminating human contact to maximize efficiency'),
    opt('b', 'Reducing the number of customers to stabilize irregular demand'),
    opt('c', 'Transforming every immaterial performance into a storable output'),
    opt('d', 'Balancing standardization and customization'),
  ], 'd'),
  q(7, 'Who heavily influenced the Scandinavian approach (SAS) to services?', [
    opt('a', 'Frederick Taylor'),
    opt('b', 'Adam Smith'),
    opt('c', 'Michael Porter'),
    opt('d', 'Jan Carlzon'),
  ], 'd'),
  q(8, 'The transformation of industries into "Industry 4.0" centers on:', [
    opt('a', 'Total replacement of the human workforce with mechanical robotics'),
    opt('b', 'Cyber-physical systems and the integration of Big Data into processes'),
    opt('c', 'Returning to centralized production models for quality control'),
    opt('d', 'Reducing market dynamism through rigid legal standards'),
  ], 'b'),
  q(9, 'The "Order-Taking" petal includes elements such as:', [
    opt('a', 'Personalized advice and suggestions on correct product use'),
    opt('b', 'Management of refunds and warranty repairs after failure'),
    opt('c', 'Reservations, program enrollments and facility check-ins'),
    opt('d', 'Welcoming guests with food, drinks and comfortable waiting areas'),
  ], 'c', 'Order-taking = applications/orders/reservations. A=Consultation, B=Exceptions, D=Hospitality.'),
  q(10, 'What does the term "Consideration Set" indicate?', [
    opt('a', 'Employees considered for internal promotion'),
    opt('b', 'Service flower petals the management decides to enhance'),
    opt('c', 'The set of financial risks associated with a new investment'),
    opt('d', 'The alternatives that a customer seriously evaluates before purchase'),
  ], 'd'),
  q(11, 'The purpose of a "Service Guarantee" is to:', [
    opt('a', 'Increase internal bureaucracy to discourage customer complaints'),
    opt('b', 'Avoid having to train staff thanks to insurance coverage'),
    opt('c', 'Allow the company to increase prices without improving quality'),
    opt('d', 'Reduce perceived risk and force the company to high standards'),
  ], 'd'),
  q(12, 'What is meant by "Undifferentiated Marketing"?', [
    opt('a', 'Niche marketing'),
    opt('b', 'Personalized marketing for each individual'),
    opt('c', 'Mass marketing aimed at a large market with a single offer'),
    opt('d', 'Marketing aimed only at industrial sectors'),
  ], 'c'),
  q(13, 'Psychographic segmentation divides the market based on:', [
    opt('a', 'Age, gender and disposable income'),
    opt('b', 'Geographic location and climate'),
    opt('c', 'Purchase frequency and brand loyalty'),
    opt('d', 'Lifestyle and personality'),
  ], 'd'),
  q(14, 'In the "Old View" of business, service was considered:', [
    opt('a', 'A central strategy for gaining competitive advantage'),
    opt('b', 'A technical post-sales function to solve problems'),
    opt('c', 'An immaterial activity unrelated to physical product quality'),
    opt('d', 'A holistic approach spanning all operations'),
  ], 'b'),
  q(15, 'The corporate "Vision" defines:', [
    opt('a', 'Current ethical principles and socio-economic role'),
    opt('b', 'Quantitative results achieved in the previous year'),
    opt('c', 'The short-term perspective of immediate goals'),
    opt('d', 'Long-term future goals and desired future state'),
  ], 'd', 'Mission/values ≈ current role; vision ≈ desired future.'),
  q(16, 'What characterizes the "Targeted Customer Satisfaction Survey" at FedEx?', [
    opt('a', 'Massive mailing of questionnaires to the entire database to measure brand recall'),
    opt('b', "The use of mystery shoppers to evaluate road couriers' performance"),
    opt('c', 'The analysis of customers who experienced specific processes in the last 3 months'),
    opt('d', 'Measuring employee satisfaction regarding corporate culture'),
  ], 'c'),
  q(17, 'The "Enhancing" supplementary services category includes:', [
    opt('a', 'Information, Billing, Payment and Order-taking'),
    opt('b', 'People, Process, Physical Evidence and Politics'),
    opt('c', 'Sensing, Seizing, Transforming and Testing'),
    opt('d', 'Hospitality, Consultation, Safekeeping and Exceptions'),
  ], 'd', 'Facilitating = Information, Order-taking, Billing, Payment. Enhancing = Hospitality, Consultation, Safekeeping, Exceptions.'),
  q(18, 'A "Low Contact Service" (e.g., Internet Banking) focuses on:', [
    opt('a', 'Managing the "theater" of the service with elegant furnishings and uniforms'),
    opt('b', 'Prolonged face-to-face interactions to build immediate trust'),
    opt('c', 'The physical involvement of the customer in technical back-office processes'),
    opt('d', 'Technological efficiency and ease of navigation in digital channels'),
  ], 'd'),
  q(19, 'The "Close the Loop" process in customer feedback serves to:', [
    opt('a', 'Prevent the customer from switching suppliers after a single dissatisfaction'),
    opt('b', 'Identify the least productive employees to reduce their monthly salary'),
    opt('c', 'Ensure that the problem is resolved and the customer is informed of the outcome'),
    opt('d', 'Close all communication channels to avoid further complaints'),
  ], 'c'),
];

const variant02 = [
  q(1, '"All social and economic actors are resource integrators" (Axiom 3) means:', [
    opt('a', 'That actors must accumulate resources without ever exchanging them.'),
    opt('b', 'That the firm must own every resource necessary for production.'),
    opt('c', 'That value emerges by combining resources from multiple sources (market, private, public).'),
    opt('d', 'That customers must surrender their skills to the firm for free.'),
  ], 'c'),
  q(2, '"Blockchain" is cited in the sources as:', [
    opt('a', 'A physical barrier to protect goods from theft.'),
    opt('b', 'A method to block digital customer payments.'),
    opt('c', 'A board game for employees during breaks.'),
    opt('d', 'A key innovation for the secure and transparent management of ecosystems.'),
  ], 'd'),
  q(3, 'Why is a service-centered view defined as "inherently beneficiary oriented"?', [
    opt('a', 'Because service is defined as the application of competences for the benefit of another actor.'),
    opt('b', 'Because it is a legal requirement imposed by consumer protection regulations.'),
    opt('c', 'Because the firm must necessarily please the customer to maximize exchange value.'),
    opt('d', 'Because the beneficiary is the only actor possessing operant resources in the system.'),
  ], 'a'),
  q(4, 'Co-production refers to:', [
    opt('a', 'Phenomenological value.'),
    opt('b', 'Profit sharing.'),
    opt('c', "The customer's participation in the design or production phase."),
    opt('d', 'Creation of value in use.'),
  ], 'c', 'Co-production = participation in design/production; value-in-use / phenomenological = co-creation side.'),
  q(5, 'Which characteristic of services (IHIP) is criticized by S-D Logic as deriving from G-D Logic?', [
    opt('a', 'Interactivity and relational nature.'),
    opt('b', 'Value co-creation in the context of use.'),
    opt('c', 'The operant resource nature of applied knowledge.'),
    opt('d', 'Perishability, since processes and knowledge can be "stored" in goods.'),
  ], 'd'),
  q(6, 'In shifting to the "Actor-to-Actor" (A2A) perspective, S-D Logic intends to:', [
    opt('a', 'Replace humans with software agents equipped with AI.'),
    opt('b', 'Focus exclusively on business-to-business (B2B) transactions.'),
    opt('c', 'Overcome rigid distinctions between the roles of "producer" and "consumer".'),
    opt('d', 'Eliminate the need to integrate private resources within the network.'),
  ], 'c'),
  q(7, '"The whole is greater than the sum of its individual parts" is the definition of:', [
    opt('a', 'Negative entropy (Negentropy).'),
    opt('b', 'Technological equifinality.'),
    opt('c', 'Asymmetric functional hierarchy.'),
    opt('d', 'Holism.'),
  ], 'd'),
  q(8, 'An example of a "Technological Institution" in retail cited in the sources is:', [
    opt('a', 'The mechanical scale for weighing fruit.'),
    opt('b', 'The use of non-recyclable plastic bags.'),
    opt('c', 'Mobile applications for ordering and personalizing the offering.'),
    opt('d', 'The presence of security guards at the entrance.'),
  ], 'c'),
  q(9, 'What is meant by "Symmetric Information" among partners in a service system?', [
    opt('a', 'That everyone must use the same IT hardware.'),
    opt('b', 'That industrial secrets must be protected with asymmetric barriers.'),
    opt('c', 'That the producer must know more than the consumer to guide them.'),
    opt('d', 'That actors openly share information without manipulation for the common good.'),
  ], 'd'),
  q(10, 'Technological integration in "Smart" systems aims to:', [
    opt('a', 'Improve quality of life and sustainability through responsiveness.'),
    opt('b', 'Increase system entropy to generate chaos.'),
    opt('c', "Monitor citizens' private lives for repressive purposes."),
    opt('d', 'Exclude poor subjects from accessing essential services.'),
  ], 'a'),
  q(11, 'The integrative approach to value in service consumption (Kuzgun & Asugman, 2015) is based on three key dimensions:', [
    opt('a', 'Service quality, price, and customer satisfaction in the short term.'),
    opt('b', 'Multi-actor interactions, value co-creation, and long-term relational attributes.'),
    opt('c', 'Exchange value, value-in-use, and individual phenomenological value.'),
    opt('d', 'Staff skills, process efficiency, and physical environment aesthetics.'),
  ], 'c'),
  q(12, '"Contextual value" implies that:', [
    opt('a', 'Value is the same for everyone.'),
    opt('b', 'Value does not exist.'),
    opt('c', 'Value depends on the specific context of time and place.'),
    opt('d', 'Value is only measured in euros.'),
  ], 'c'),
  q(13, 'The extended marketing mix (7Ps) includes, besides the traditional 4Ps:', [
    opt('a', 'Performance, Profit and Strategic Positioning.'),
    opt('b', 'Advertising, Personnel and Ecosystemic Point of Sale.'),
    opt('c', 'Planning, Partnership and Labor Productivity.'),
    opt('d', 'People, Process and Physical evidence.'),
  ], 'd'),
  q(14, 'What is the role of "goods" according to Foundational Premise 3 (FP3) of S-D Logic?', [
    opt('a', 'They represent the ultimate goal of economic activity and the fundamental unit of exchange.'),
    opt('b', 'They are operant resources capable of acting autonomously to generate benefits for the customer.'),
    opt('c', 'They function as distribution mechanisms or tools (appliances) for service provision.'),
    opt('d', 'They are discrete units of output that embed value independently of interaction with the beneficiary.'),
  ], 'c'),
  q(15, '"Entropy" in a viable system indicates:', [
    opt('a', 'The maximum efficiency reached by operational processes.'),
    opt('b', 'Vital energy deriving exclusively from monetary sales.'),
    opt('c', "The system's tendency to fall into disorder if not governed."),
    opt('d', 'Data transmission speed in a Smart City.'),
  ], 'c'),
  q(16, 'Why is "ecosystem survival" the shared goal of retail actors?', [
    opt('a', 'Because the state imposes sanctions in case of systemic failure.'),
    opt('b', 'Because customers prefer buying in monopolistic systems.'),
    opt('c', 'Because management has no other measurable objectives.'),
    opt('d', 'Because interdependence allows individual actors to thrive only if the system is viable.'),
  ], 'd'),
  q(17, 'Value co-creation stimulates innovation because:', [
    opt('a', 'It reduces labor costs for the company.'),
    opt('b', "It forces competitors to copy users' ideas."),
    opt('c', "It integrates the customer's knowledge and usage experience into the creative process."),
    opt('d', 'It allows skipping the product safety testing phase.'),
  ], 'c'),
  q(18, 'Why is technology "institutional" according to S-D Logic?', [
    opt('a', 'Because it is entirely funded by government bodies.'),
    opt('b', 'Because updating software monthly is mandatory by law.'),
    opt('c', 'Because it has fixed and immovable installation costs.'),
    opt('d', 'Because it represents applied knowledge embedded in social norms and practices.'),
  ], 'd'),
  q(19, 'What is the vision of Retail according to Service-Dominant Logic?', [
    opt('a', 'A linear supply chain focused on logistics.'),
    opt('b', 'A simple intermediary adding value to the factory price.'),
    opt('c', 'A pure tertiary sector excluding agriculture.'),
    opt('d', 'A service ecosystem based on resource integration and co-creation.'),
  ], 'd'),
];

/** Service Management – PART 1 – Exam (19/30) */
const variant03 = [
  q(1, 'What is an example of an "Asset rental service"?', [
    opt('a', 'Access to a Wi-Fi network via subscription'),
    opt('b', 'Requesting professional legal advice'),
    opt('c', 'Renting a car or a suit'),
    opt('d', 'Attending an educational seminar'),
  ], 'c'),
  q(2, '"Good-dominant logic" is typical of:', [
    opt('a', 'Modern Service Management focused on co-creation'),
    opt('b', 'Traditional management focused on tangible goods and mass production'),
    opt('c', 'Relational marketing oriented towards consumer loyalty'),
    opt('d', 'Purely digital service environments'),
  ], 'b'),
  q(3, '"Responsible Research in Business and Management" (RRBM) aims to:', [
    opt('a', 'Maximize academic prestige through purely theoretical publications'),
    opt('b', 'Protect corporate industrial secrets during R&D'),
    opt('c', 'Develop knowledge that brings benefits to both business and society'),
    opt('d', 'Develop business models exclusively focused on shareholder profit'),
  ], 'c'),
  q(4, 'What is meant by "Service Tiering"?', [
    opt('a', 'Reducing the number of flower petals to lower the offer cost'),
    opt('b', 'Exclusively using sub-brands to cover all market segments'),
    opt('c', 'Differentiating products based on different service levels and prices'),
    opt('d', 'Standardizing the core offer by eliminating differences between service classes'),
  ], 'c'),
  q(5, 'A "High Contact Service" implies:', [
    opt('a', 'Exclusive use of self-service technologies with no human presence'),
    opt('b', "That the customer receives the benefit without ever visiting the supplier's location"),
    opt('c', 'Significant and prolonged interactions between customer and staff/facilities'),
    opt('d', 'Centralized factory production with distribution via agents'),
  ], 'c'),
  q(6, 'In a "Service Blueprint", the "Line of Visibility" separates:', [
    opt('a', 'Actions performed by the customer from those performed by the employee'),
    opt('b', 'Revenues generated from individual transactions from total operating costs'),
    opt('c', 'Positive moments of truth from those leading to failure'),
    opt('d', 'Visible front-stage activities from supporting back-stage activities'),
  ], 'd'),
  q(7, '"Positioning" serves to:', [
    opt('a', 'Physically place the product on shelves'),
    opt('b', 'Decide the geographic location of the company headquarters'),
    opt('c', 'Calculate the ROI of advertising campaigns'),
    opt('d', 'Establish a perception of the product offering in the minds of customers relative to competition'),
  ], 'd'),
  q(8, 'In a startup, who usually makes up the first sales team?', [
    opt('a', 'External sales experts hired to handle the mainstream market'),
    opt('b', 'The founder and the founding team'),
    opt('c', 'The founder and the logistics management staff'),
    opt('d', 'Sales agencies specialized in crossing the technological chasm'),
  ], 'b'),
  q(9, 'Which EU country showed the highest percentage of employed people in services in 2019?', [
    opt('a', 'Romania'),
    opt('b', 'Italy'),
    opt('c', 'Luxembourg'),
    opt('d', 'Netherlands'),
  ], 'c'),
  q(10, 'In terms of efficiency, Service Management prioritizes:', [
    opt('a', 'Internal efficiency based exclusively on technical criteria'),
    opt('b', 'The execution speed of machinery within the sites'),
    opt('c', 'External efficiency and the recognition of quality by the user'),
    opt('d', 'Purely financial efficiency measures'),
  ], 'c'),
  q(11, '"Service-Dominant Logic" (Vargo and Lusch) argues that:', [
    opt('a', 'Service is a necessary accessory extension to sell tangible products'),
    opt('b', 'Service logic must dominate customer desires through marketing'),
    opt('c', 'Service is the fundamental basis of exchange, where goods are service vehicles'),
    opt('d', 'Physical goods have an intrinsic value superior to service performance'),
  ], 'c'),
  q(12, 'The "Courtyard by Marriott" brand is an example of:', [
    opt('a', 'A style extension that does not modify core hotel operational processes'),
    opt('b', 'A "House of Brands" strategy where the Marriott name is completely absent'),
    opt('c', 'A product designed via trade-off analysis (conjoint analysis) of travelers'),
    opt('d', 'A niche service aimed exclusively at backpacker tourists'),
  ], 'c'),
  q(13, 'What characterizes "Information Processing" (e.g., Insurance)?', [
    opt('a', 'Constant physical contact between the supplier and the customer\'s body'),
    opt('b', 'The impossibility of automating processes via artificial intelligence'),
    opt('c', 'Exclusive use of paper documentation to maintain tradition'),
    opt('d', 'The processing of data to create value in intangible assets'),
  ], 'd'),
  q(14, 'A guideline for staff in handling complaints (LOS) is:', [
    opt('a', 'Deny the error until irrefutable proof emerges from the back-office'),
    opt('b', 'Give the customer the benefit of the doubt and do not get defensive'),
    opt('c', 'Ask the customer to submit a written complaint exclusively via lawyer'),
    opt('d', 'Immediately offer the maximum possible compensation before investigating'),
  ], 'b'),
  q(15, 'Psychographic segmentation analyzes:', [
    opt('a', 'Geographic location'),
    opt('b', 'Age and gender'),
    opt('c', 'Purchase frequency'),
    opt('d', 'Lifestyle and personality'),
  ], 'd'),
  q(16, 'A "Lead" becomes an "SQL" (Sales Qualified Lead) when:', [
    opt('a', 'They only provide an email address'),
    opt('b', 'They visit the website for the first time'),
    opt('c', 'They ask for a refund'),
    opt('d', 'They are reviewed by the sales team and confirmed as a real potential customer'),
  ], 'd'),
  q(17, 'The ATECO classification in Italy serves to:', [
    opt('a', 'Measure the perceived quality of services provided nationally'),
    opt('b', 'Distinguish between public and private sector employment contracts'),
    opt('c', 'Classify economic activities for statistical and fiscal purposes'),
    opt('d', 'Classify economic activities for administrative and marketing purposes'),
  ], 'c'),
  q(18, 'The term "Service Management" was originally introduced in:', [
    opt('a', 'Finnish in 1980 and Swedish in 1982'),
    opt('b', 'Swedish in 1982 and English in 1984'),
    opt('c', 'English in 1978 and French in 1980'),
    opt('d', 'Swedish in 1980 and English in 1982'),
  ], 'd'),
  q(19, 'A risk of AI-based over-personalization (Filter Bubbles) is:', [
    opt('a', 'The excessive increase in choices for the inexperienced consumer'),
    opt('b', 'The loss of efficiency in mass market segmentation processes'),
    opt('c', 'The increase in cognitive load during the pre-purchase phase'),
    opt('d', 'The reduction of "serendipity" and exposure to algorithmic bias'),
  ], 'd'),
];

function tag(variantId, items) {
  const label = String(variantId).padStart(2, '0');
  return items.map((item, i) => ({
    ...item,
    num: `Variant ${label} · Q${i + 1}`,
    id: `v${label}_mcq${i + 1}`,
    section: `Variant ${label} — Part I (MCQ)`,
  }));
}

const QUESTIONS = [...tag('01', variant01), ...tag('02', variant02), ...tag('03', variant03)];

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Michigan — Service Marketing Exams</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 2rem 1rem 3rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
      min-height: 100vh;
    }
    .wrap { max-width: 860px; margin: 0 auto; }
    .back { margin-bottom: 1rem; }
    .back a { color: ${ACCENT}; text-decoration: none; }
    .back a:hover { text-decoration: underline; }
    h1 {
      color: #2c3e50;
      border-bottom: 4px solid ${ACCENT};
      padding-bottom: 12px;
      font-size: 1.75rem;
    }
    .sub { color: #555; margin: 0.5rem 0 1.5rem; }
    .rules {
      background: #fff;
      border-left: 4px solid ${ACCENT};
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
    .section-title {
      font-size: 1.15rem;
      color: ${ACCENT};
      margin: 2rem 0 1rem;
      font-weight: 600;
    }
    .q {
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      border: 1px solid #e8ecf1;
    }
    .q.unanswered { border-color: #e74c3c; }
    .q.correct { border-color: #27ae60; background: #f6fff9; }
    .q.wrong { border-color: #e74c3c; background: #fff8f8; }
    .q-num { font-weight: 700; color: ${ACCENT}; margin-bottom: 0.35rem; }
    .q-en { font-size: 1.02rem; margin-bottom: 0.35rem; }
    .opts { display: grid; gap: 0.45rem; }
    label.opt {
      display: flex;
      gap: 0.55rem;
      align-items: flex-start;
      padding: 0.45rem 0.55rem;
      border-radius: 6px;
      cursor: pointer;
    }
    label.opt:hover { background: #eef2f8; }
    .result-opt { cursor: default; }
    label.opt input { margin-top: 0.25rem; flex-shrink: 0; }
    .opt-en { font-size: 0.95rem; }
    .feedback {
      margin-top: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      font-size: 0.92rem;
    }
    .feedback.ok { background: #e8f8ef; color: #1e7e45; }
    .feedback.bad { background: #fdecea; color: #c0392b; }
    .actions {
      position: sticky;
      bottom: 0;
      background: rgba(245,247,250,.95);
      backdrop-filter: blur(6px);
      padding: 1rem 0;
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }
    button {
      background: ${ACCENT};
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover { background: ${ACCENT_DARK}; }
    button.secondary {
      background: #fff;
      color: ${ACCENT};
      border: 2px solid ${ACCENT};
    }
    #results {
      display: none;
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      margin-top: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,.1);
      border: 2px solid ${ACCENT};
    }
    #results.visible { display: block; }
    .score { font-size: 1.35rem; font-weight: 700; color: #2c3e50; }
    .score-detail { color: #555; margin-top: 0.35rem; }
    .warn { color: #e74c3c; font-weight: 600; margin-top: 0.5rem; }
    mark.correct-mark { background: #d5f5e3; padding: 0 4px; border-radius: 3px; }
    mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }
    .explain { margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }
    .page-hidden { display: none !important; }
    .paginator {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin: 1rem 0;
      padding: 0.85rem 1rem;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #e8ecf1;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .paginator-top { position: sticky; top: 0; z-index: 5; }
    .paginator-info { font-weight: 600; color: #2c3e50; font-size: 0.95rem; }
    .paginator-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .paginator-btns button:disabled { opacity: 0.45; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="back"><a href="../index.html">← Edu materials</a></p>
    <h1>Michigan — Service Marketing</h1>
    <p class="sub">3 variants · 57 MCQ · 1 mark each (19/30)</p>
    <div class="rules"><strong>Exam variants</strong> — one variant per page (19 MCQ). Variant 01: Flower of Service. Variant 02: S-D Logic (Part 2). Variant 03: Service Management Part 1. Use <em>Previous / Next</em>; click <em>Check this page</em> to score.</div>
    <form id="test-form">
      <div id="questions"></div>
      <div class="actions">
        <button type="submit">Check answers</button>
        <button type="button" class="secondary" id="reset-btn">Reset</button>
      </div>
    </form>
    <div id="results">
      <div class="score" id="score-text"></div>
      <p class="score-detail" id="score-detail"></p>
      <p class="warn" id="warn-text" hidden></p>
    </div>
  </div>
  <script>
    const SCORING = {"correct":1,"wrong":0,"max":null};
    const QUESTIONS = ${JSON.stringify(QUESTIONS)};
    const OPEN_ITEMS = [];
    const SNA_ITEMS = [];

    const form = document.getElementById('test-form');
    const container = document.getElementById('questions');
    const resultsBox = document.getElementById('results');

    const VARIANT_PAGES = (() => {
      const order = [];
      const map = new Map();
      QUESTIONS.forEach((q) => {
        const m = q.section?.match(/Variant (\\d+)/);
        if (!m) return;
        const v = m[1];
        if (!map.has(v)) {
          map.set(v, order.length);
          order.push(v);
        }
      });
      return { order, map };
    })();

    let currentPage = 0;
    let paginatorTop = null;
    let paginatorBottom = null;
    let paginationLocked = false;

    function pageForQuestion(q) {
      const m = q.section?.match(/Variant (\\d+)/);
      if (!m) return 0;
      return VARIANT_PAGES.map.get(m[1]) ?? 0;
    }

    function totalPageCount() {
      return Math.max(1, VARIANT_PAGES.order.length);
    }

    function needsPagination() {
      return totalPageCount() > 1;
    }

    function pageLabel(page) {
      const v = VARIANT_PAGES.order[page];
      const count = QUESTIONS.filter((q) => pageForQuestion(q) === page).length;
      const titles = { '01': 'Service flower / management', '02': 'S-D Logic (Part 2)', '03': 'Service Management Part 1' };
      return 'Variant ' + v + ' · ' + (titles[v] || '') + ' · ' + count + ' MCQ · page ' + (page + 1) + ' of ' + totalPageCount();
    }

    function createPaginator(className) {
      const el = document.createElement('div');
      el.className = className;
      el.innerHTML = '<span class="paginator-info"></span><div class="paginator-btns">' +
        '<button type="button" class="secondary" data-nav="prev">← Previous</button>' +
        '<button type="button" class="secondary" data-nav="next">Next →</button></div>';
      el.querySelector('[data-nav="prev"]').addEventListener('click', () => goToPage(currentPage - 1));
      el.querySelector('[data-nav="next"]').addEventListener('click', () => goToPage(currentPage + 1));
      return el;
    }

    function updatePaginator() {
      const show = needsPagination() && !paginationLocked;
      [paginatorTop, paginatorBottom].forEach((p) => {
        if (!p) return;
        p.style.display = show ? '' : 'none';
        if (!show) return;
        p.querySelector('.paginator-info').textContent = pageLabel(currentPage);
        p.querySelector('[data-nav="prev"]').disabled = currentPage <= 0;
        p.querySelector('[data-nav="next"]').disabled = currentPage >= totalPageCount() - 1;
      });
      updateCheckButton();
    }

    function applyPageVisibility() {
      container.querySelectorAll('[data-page]').forEach((el) => {
        const p = Number(el.dataset.page);
        el.classList.toggle('page-hidden', paginationLocked ? false : p !== currentPage);
      });
      updatePaginator();
    }

    function goToPage(page) {
      if (paginationLocked) return;
      currentPage = Math.max(0, Math.min(totalPageCount() - 1, page));
      applyPageVisibility();
      const target = paginatorTop || container;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function setupPagination() {
      paginationLocked = false;
      currentPage = 0;
      if (paginatorTop) {
        paginatorTop.remove();
        paginatorBottom.remove();
        paginatorTop = paginatorBottom = null;
      }
      if (!needsPagination()) {
        updateCheckButton();
        return;
      }
      paginatorTop = createPaginator('paginator paginator-top');
      paginatorBottom = createPaginator('paginator paginator-bottom');
      container.before(paginatorTop);
      const actions = form.querySelector('.actions');
      form.insertBefore(paginatorBottom, actions);
      goToPage(0);
      updateCheckButton();
    }

    function questionsForPage(page) {
      return QUESTIONS.filter((q) => pageForQuestion(q) === page);
    }

    function questionsToCheck() {
      if (needsPagination()) return questionsForPage(currentPage);
      return QUESTIONS;
    }

    function updateCheckButton() {
      const btn = form.querySelector('.actions button[type="submit"]');
      if (!btn) return;
      if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.textContent;
      if (needsPagination()) {
        btn.textContent = 'Check this page (' + questionsForPage(currentPage).length + ')';
      } else {
        btn.textContent = btn.dataset.defaultLabel;
      }
    }

    function renderQuestions() {
      container.innerHTML = '';
      let currentSection = '';
      QUESTIONS.forEach((q) => {
        const page = pageForQuestion(q);
        if (q.section && q.section !== currentSection) {
          currentSection = q.section;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.dataset.page = String(page);
          h.textContent = q.section;
          container.appendChild(h);
        }
        const card = document.createElement('div');
        card.className = 'q';
        card.dataset.id = q.id;
        card.dataset.page = String(page);
        card.innerHTML = \`
          <div class="q-num">Question \${q.num}</div>
          <div class="q-en">\${q.en}</div>
          <div class="opts">
            \${q.options.map(o => \`
              <label class="opt">
                <input type="radio" name="\${q.id}" value="\${o.id}" />
                <span>
                  <div class="opt-en"><strong>\${o.id.toUpperCase()})</strong> \${o.en}</div>
                </span>
              </label>\`).join('')}
          </div>
          <div class="feedback" hidden></div>\`;
        container.appendChild(card);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let unanswered = 0;
      let correct = 0;
      let wrong = 0;
      const warnEl = document.getElementById('warn-text');
      const toCheck = questionsToCheck();
      const checkingAll = toCheck.length === QUESTIONS.length;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        card.classList.remove('unanswered', 'correct', 'wrong');
        const fb = card.querySelector('.feedback');
        fb.hidden = true;
        fb.textContent = '';
        card.querySelectorAll('label.opt').forEach((lbl) => {
          lbl.classList.remove('result-opt');
          lbl.style.background = '';
          lbl.querySelector('input').disabled = false;
        });
        if (!selected) {
          unanswered++;
          card.classList.add('unanswered');
        }
      });

      if (unanswered > 0) {
        resultsBox.classList.remove('visible');
        warnEl.hidden = false;
        warnEl.textContent = checkingAll
          ? 'Answer all multiple-choice questions (' + unanswered + ' unanswered).'
          : 'Answer all questions on this page (' + unanswered + ' unanswered).';
        const first = container.querySelector('.q.unanswered');
        if (first) {
          const p = Number(first.dataset.page);
          if (!isNaN(p)) goToPage(p);
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      warnEl.hidden = true;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        const fb = card.querySelector('.feedback');
        fb.hidden = false;
        card.classList.remove('unanswered', 'correct', 'wrong');

        if (!selected) {
          unanswered++;
          card.classList.add('unanswered');
          fb.className = 'feedback bad';
          fb.innerHTML = '⚠️ No answer selected. Correct: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>';
          return;
        }

        const ok = selected.value === q.correct;
        if (ok) {
          correct++;
          card.classList.add('correct');
          fb.className = 'feedback ok';
          fb.innerHTML = '✓ Correct' + (q.explain ? '<div class="explain">' + q.explain + '</div>' : '');
        } else {
          wrong++;
          card.classList.add('wrong');
          fb.className = 'feedback bad';
          fb.innerHTML = '✗ Wrong. Your answer: <mark class="wrong-mark">' + selected.value.toUpperCase() +
            '</mark>. Correct: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>' +
            (q.explain ? '<div class="explain">' + q.explain + '</div>' : '');
        }

        card.querySelectorAll('label.opt').forEach((lbl) => {
          const inp = lbl.querySelector('input');
          lbl.classList.add('result-opt');
          if (inp.value === q.correct) lbl.style.background = '#e8f8ef';
          if (inp.checked && inp.value !== q.correct) lbl.style.background = '#fdecea';
          inp.disabled = true;
        });
      });

      const total = checkingAll ? QUESTIONS.length : toCheck.length;
      let score = correct * SCORING.correct + wrong * SCORING.wrong;
      if (SCORING.max !== null) score = Math.max(0, Math.min(SCORING.max, score));

      document.getElementById('score-text').textContent = checkingAll
        ? 'Score: ' + correct + ' of ' + total + ' (' + Math.round(correct/total*100) + '%)'
        : 'This page: ' + correct + ' of ' + total + ' (' + Math.round(correct/total*100) + '%)';
      document.getElementById('score-detail').textContent =
        'Correct: ' + correct + ' · Wrong: ' + wrong + ' · Unanswered: ' + unanswered;

      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      form.reset();
      resultsBox.classList.remove('visible');
      document.getElementById('warn-text').hidden = true;
      renderQuestions();
      setupPagination();
    });

    renderQuestions();
    setupPagination();
  </script>
</body>
</html>
`;

writeFileSync(join(ROOT, 'index.html'), html, 'utf8');
console.log(`Michigan/index.html — ${QUESTIONS.length} MCQ (3 variants)`);
