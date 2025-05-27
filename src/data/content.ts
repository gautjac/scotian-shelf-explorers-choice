
import { Language, Scenario, MarineSpecies } from '../types';

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'mi', name: "Mi'kmaq", nativeName: "Mi'kmaq" }
];

export const marineSpecies: MarineSpecies[] = [
  {
    id: 'lobster',
    name: 'Atlantic Lobster',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    healthStatus: 'stable'
  },
  {
    id: 'cod',
    name: 'Atlantic Cod',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    healthStatus: 'stable'
  },
  {
    id: 'whale',
    name: 'North Atlantic Right Whale',
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400',
    healthStatus: 'stable'
  },
  {
    id: 'kelp',
    name: 'Kelp Forest',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    healthStatus: 'stable'
  }
];

export const scenarios: Record<Language['code'], Scenario[]> = {
  en: [
    {
      id: 'plastic-pollution',
      title: 'Plastic in Our Waters',
      description: 'You notice plastic waste washing up on the shores of Nova Scotia. Marine animals are getting tangled in debris and mistaking plastic for food. What action should be taken?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Support a ban on single-use plastics',
          impact: 'positive',
          consequence: 'Great choice! Reducing plastic waste helps protect marine life. Fish, whales, and seabirds are safer when there\'s less plastic in the ocean.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Continue using plastics as usual',
          impact: 'negative',
          consequence: 'This choice harms marine life. More animals get injured by plastic debris, and the ocean ecosystem becomes polluted.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organize beach cleanup events',
          impact: 'positive',
          consequence: 'Excellent! Community action makes a real difference. Every piece of plastic removed protects marine animals.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Sustainable Fishing',
      description: 'Fishing is important for Nova Scotia\'s economy, but overfishing threatens marine species like Atlantic cod. How should fishing be managed?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Set sustainable fishing quotas',
          impact: 'positive',
          consequence: 'Wise decision! Sustainable fishing allows fish populations to recover while maintaining the fishing industry.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'unlimited-fishing',
          text: 'Allow unlimited fishing',
          impact: 'negative',
          consequence: 'This depletes fish stocks. Species like cod struggle to reproduce, harming the entire food chain.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'marine-reserves',
          text: 'Create marine protected areas',
          impact: 'positive',
          consequence: 'Perfect! Protected areas serve as nurseries where marine life can thrive and populations can recover.',
          nextScenarioId: 'climate-change'
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Ocean Temperature Rising',
      description: 'Climate change is warming the Atlantic Ocean, affecting where fish live and coral growth. What can help address this challenge?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Invest in renewable energy',
          impact: 'positive',
          consequence: 'Excellent choice! Wind and solar power reduce carbon emissions, helping slow ocean warming.',
        },
        {
          id: 'ignore-climate',
          text: 'Continue burning fossil fuels',
          impact: 'negative',
          consequence: 'This accelerates ocean warming. Marine species must migrate to survive, disrupting the ecosystem.',
        },
        {
          id: 'carbon-capture',
          text: 'Support ocean carbon capture',
          impact: 'positive',
          consequence: 'Great thinking! Protecting coastal wetlands and kelp forests helps absorb carbon from the atmosphere.',
        }
      ],
      isEnding: true
    }
  ],
  fr: [
    {
      id: 'plastic-pollution',
      title: 'Plastique dans nos eaux',
      description: 'Vous remarquez des déchets plastiques qui s\'échouent sur les côtes de la Nouvelle-Écosse. Les animaux marins s\'empêtrent dans les débris et confondent le plastique avec de la nourriture. Quelle action doit être prise?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Soutenir une interdiction des plastiques à usage unique',
          impact: 'positive',
          consequence: 'Excellent choix! Réduire les déchets plastiques aide à protéger la vie marine. Les poissons, baleines et oiseaux marins sont plus sûrs avec moins de plastique dans l\'océan.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser le plastique comme d\'habitude',
          impact: 'negative',
          consequence: 'Ce choix nuit à la vie marine. Plus d\'animaux sont blessés par les débris plastiques, et l\'écosystème océanique devient pollué.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des événements de nettoyage de plage',
          impact: 'positive',
          consequence: 'Excellent! L\'action communautaire fait une vraie différence. Chaque morceau de plastique retiré protège les animaux marins.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Pêche durable',
      description: 'La pêche est importante pour l\'économie de la Nouvelle-Écosse, mais la surpêche menace les espèces marines comme la morue de l\'Atlantique. Comment la pêche devrait-elle être gérée?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Établir des quotas de pêche durables',
          impact: 'positive',
          consequence: 'Décision sage! La pêche durable permet aux populations de poissons de se rétablir tout en maintenant l\'industrie de la pêche.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'unlimited-fishing',
          text: 'Permettre une pêche illimitée',
          impact: 'negative',
          consequence: 'Cela épuise les stocks de poissons. Les espèces comme la morue ont du mal à se reproduire, nuisant à toute la chaîne alimentaire.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'marine-reserves',
          text: 'Créer des aires marines protégées',
          impact: 'positive',
          consequence: 'Parfait! Les aires protégées servent de pouponnières où la vie marine peut prospérer et les populations se rétablir.',
          nextScenarioId: 'climate-change'
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Température océanique en hausse',
      description: 'Le changement climatique réchauffe l\'océan Atlantique, affectant où vivent les poissons et la croissance des coraux. Qu\'est-ce qui peut aider à relever ce défi?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Investir dans les énergies renouvelables',
          impact: 'positive',
          consequence: 'Excellent choix! L\'énergie éolienne et solaire réduit les émissions de carbone, aidant à ralentir le réchauffement océanique.',
        },
        {
          id: 'ignore-climate',
          text: 'Continuer à brûler des combustibles fossiles',
          impact: 'negative',
          consequence: 'Cela accélère le réchauffement océanique. Les espèces marines doivent migrer pour survivre, perturbant l\'écosystème.',
        },
        {
          id: 'carbon-capture',
          text: 'Soutenir la capture de carbone océanique',
          impact: 'positive',
          consequence: 'Bonne réflexion! Protéger les zones humides côtières et les forêts de kelp aide à absorber le carbone de l\'atmosphère.',
        }
      ],
      isEnding: true
    }
  ],
  mi: [
    {
      id: 'plastic-pollution',
      title: 'Pekisk katu samqwan',
      description: 'Kisi\'k pekisk apoqnmatimk Kespek. Kipkwaw samqwanikatijk eliaq aq pekisk wenjo\'tij mijipji\'j. Koqoey ketu\'k?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Mu pekisk apoqon',
          impact: 'positive',
          consequence: 'Kelu wskitqamu! Pekisk apoqonaq samqwan kepmikatl. Nkmaq, putup, aq kikwasulatikewaq pissajik.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Apoqon pekisk elitasikatijk',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq samqwanikatl. Pekisk esku\'sk samqwanikatijik.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Qospem piskitasin',
          impact: 'positive',
          consequence: 'Kelu! Nukmatuinewikatl nto\'ltimk. Ta\'n pekisk kesnuatl kepmin samqwanikatl.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Wskitqamu pu\'tu\'n',
      description: 'Pu\'tu\'n mawimkewey Kespukewatkewk, ketu pukwelk kjipu\'tu\'n msit nkmaq wetasin. Taloq ketu elmikatl pu\'tu\'n?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Wskitqamu pu\'tu\'nkewey',
          impact: 'positive',
          consequence: 'Kelu elkewek! Wskitqamu pu\'tu\'n nkmaq wetasin aq pu\'tu\'newey eykisk.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'unlimited-fishing',
          text: 'Msit ketu pu\'tu\'n',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq nkmaq qospemkato\'tij. Nkmaq mu nuksi\'tij mijua\'jijik.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'marine-reserves',
          text: 'Samqwan tepkunasin pukwelk',
          impact: 'positive',
          consequence: 'Kelu! Pukwelksik tepo\'tij samqwanikatijk ukti\'tij aq nuksi\'tij.',
          nextScenarioId: 'climate-change'
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Samqwan kespite\'sk',
      description: 'Klama elapite\'k Kespukuk, nkmaq alasqo\'tij aq apoqewikatl wetasin. Koqoey ketu ula wetultimk?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Pilei muk\'sunn kepmikatl',
          impact: 'positive',
          consequence: 'Kelu! Pilei aq naqu\'sk muk\'sunn apoqon mu mawite\'snuk samqwan.',
        },
        {
          id: 'ignore-climate',
          text: 'Eykisk puktusk apoqon',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq samqwan pite\'snul. Samqwanikatijk alasulo\'tij ukepmikatil.',
        },
        {
          id: 'carbon-capture',
          text: 'Samqwan apoqon temokein',
          impact: 'positive',
          consequence: 'Kelu elkewek! Qospemi\'ql aq alkewaql tepkunasin apoqon temokato\'tij.',
        }
      ],
      isEnding: true
    }
  ]
};
