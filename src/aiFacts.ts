// Q: Can you generate a JavaScript array of strings that includes 30 interesting facts about AI? Please format it with each fact as a separate element, incorporating emojis, symbols, and expressive language to make the facts more engaging.

// CHATGPT-3:
export const facts = [
  "1956: The birth of AI term by John McCarthy",
  "TYPES OF AI : (1)ANI (2)AGI (3)ASI",
  "Artificial Intelligence: Man-made thinking power",
  "The Father of AI : John McCarthy",
  "Thinking Humanly : Human reasoning, Human brain’s behavioral(NN)",
  "Thinking Rationally: “laws of thought”approach,in line with “LOGIC”",
  "Acting Humanly : Model of human behavior, Turing Test 1950",
  "Acting Rationally : “black box” approach, to achieve the best expected outcome",
  "Rational behavior: expected to maximize one’s “utility function”",
  " Agent: entity that perceives & acts",
  " F : P*—>A",
  " AI is combination of : reasoning , learning , problem-solving, perception, language understanding",
  " Agent : anything that perceiving its environment through sensors & acting upon that environment through actuator.",
  " Percept sequence : Complete history of percepts (p*)",
  " Performance measure: objective function that determines how does successfully",
  " Rational depends on : Performance measure , Prior knowledge, Actions , Percept sequence to date",
  " Rational agent are not Omniscient",
  " Rational agent should be autonomous",
  " Learning is important for Rationality",
  " Task Environment (PEAS) : Performance Measure , Environment, Actuators , Sensors",
  " Environment types : Fully/Partially Observable , Deterministic/Stochastic, Episodic/Sequential, Static/Dynamic, Discrete/Continuous , Single/Multi-Agent",
  " Agent types : Simple reflex agent , Model-based Reflex, Goal-Based agent , Utility-Based agent , LEARNING AGENT .",
  " Problem solving agent is kind of Goal-based agent",
  " Problem defined by 5 components: Initial state, Actions , Result, Goal test , Path Cost",
  " Uninformed Search Algorithm: given No information about the problem other than its definition",
  " Informed Search Algorithm: can do quite well given some guidance on where to look for solutions",
  " Goal formulation: based on the current situation and the agent’s performance measure, is the first step in problem solving",
  " Problem formulation: is the process of deciding what actions and states to consider, given a goal.",
  " Uninformed Search(blind Search): Breadth-first search ,Depth-first search ,Depth-limited search, Iterative deepening search",
  " Informed Search: Greedy Best-First Search, A* Search",
  " Games: a competitive multiagent environments, in which the agents' goals are in conflict, giving rise to adversarial search problems.",
  " In MIN-MAX Gams: MAX moves first, and then they take turns moving until the game is over.",
  " The problem with Min-Max search : is that the number of game states it has to examine is exponential in the depth of the tree.",
  " Alpha-Beta pruning: it returns the same move as minimax would, but prunes away branches that cannot possibly influence the final decision.",
  " KBAs are composed of 2 parts: Knowledge-base (KB), Inference system.",
  " KB is a central component of a KBA.",
  " Knowledge Base : It is a collection of sentences are expressed in a language which is called (a knowledge representation language.)",
  " KB is required for updating knowledge for an agent",
  " Inference means deriving new sentences from old ones.",
  " Inference system generates new facts so that an agent can update the KB.",
  " inference system works mainly in two rules : ✓ Forward chaining ✓ Backward chaining",
  " Various levels of a knowledge-based agent: 1. Knowledge level 2. Logical level 3. Implementation level",
  " Knowledge representation and reasoning (KR, KRR) is the part of AI which concerned with AI agents thinking and how thinking contributes to the intelligent behaviour of agents.",
  " knowledge representation is responsible for representing information about the real world so that a computer can understand and can utilize this knowledge to solve complex real-world problems such as diagnosis of a medical condition or communicating with humans in natural language.",
  " Knowledge representation is not just storing data in some database, but it also enables an intelligent machine to learn from that knowledge and experiences so that it can behave intelligently like a human.",
  " kind of knowledge which needs to be represented in AI systems: Object, Events ,Performance , Meta-knowledge, Facts, Knowledge-Base",
  " Meta-knowledge: It is knowledge about what we know.(knowledge about knowledge)",
  " Types of knowledge: Declarative Knowledge, Procedural Knowledge , Meta-knowledge, Heuristic knowledge ,Structural knowledge",
  " Structural knowledge:It describes relationships between various concepts or objects such as “kind of”,”part of”",
  " AI knowledge cycle : Perception~>Learning~>Knowledge Representation and Reasoning~>Planning~>Execution",
  " Approaches to knowledge representation: Simple relational knowledge  ,Inheritable-knowledge,Inferential-knowledge, Procedural-knowledge",
  " Simple relational knowledge: It is the simplest way of storing facts which uses the relational method, and each fact about a set of the object is set out systematically in columns.",
  " Simple relational knowledge is famous in database systems",
  " Inferential knowledge represents knowledge in the form of formal logics.",
  " Procedural knowledge approach uses small programs and codes which describe how to do specific things, and how to proceed.",
  " Procedural knowledge approach uses If-Then rule.",
  " 4 techniques of knowledge representation: Logical-Representation, Semantic Network Representation ,Frame-Representation, Production-Rules",
  " Logical representation is a language with some rules which deal with propositions and has no ambiguity in representation.",
  " Logical representation can be categorised into Propositional Logics & Predicate(First-order)logics",
  " Syntaxes are the rules which decide how we can construct legal sentences in the logic.",
  " Semantics are the rules by which we can interpret the sentence in the logic.",
  " In Semantic networks, knowledge can be represented in the form of graphical networks.",
  " A frame is a record which consists of a collection of attributes and their values to describe an entity in the world.",
  " frame representation is also known as slot-filter knowledge representation",
  ' Production rules system consist of (condition, action) pairs which mean, "If condition then action".',
];

var currentFact = Math.floor(Math.random() * facts.length);

export function loadFact() {
  return facts[(currentFact = (currentFact + 1) % facts.length)] as string;
}

export function pullFact() {
  const index = Math.floor(Math.random() * facts.length);
  return facts.splice(index, 1)[0];
}
