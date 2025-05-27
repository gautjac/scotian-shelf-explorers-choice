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
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Allow unlimited fishing',
          impact: 'negative',
          consequence: 'This depletes fish stocks. Species like cod struggle to reproduce, harming the entire food chain.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Create marine protected areas',
          impact: 'positive',
          consequence: 'Perfect! Protected areas serve as nurseries where marine life can thrive and populations can recover.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Busy Shipping Lanes',
      description: 'Heavy ship traffic through Halifax Harbor and the Scotian Shelf poses risks to marine mammals, especially endangered North Atlantic Right Whales. What measures should be taken?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Implement ship speed limits in whale areas',
          impact: 'positive',
          consequence: 'Excellent choice! Slower ships give whales time to avoid collisions and reduce fatal strikes.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Maintain current shipping speeds',
          impact: 'negative',
          consequence: 'This increases whale deaths from ship strikes. The endangered Right Whale population continues to decline.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Install whale detection technology on ships',
          impact: 'positive',
          consequence: 'Smart solution! Early warning systems help ships avoid whales and reduce harmful noise pollution.',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Ocean Chemistry Changes',
      description: 'The ocean is absorbing more carbon dioxide from the atmosphere, making it more acidic. This affects shellfish like lobsters and scallops that build shells. How can we address this?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Support carbon emission reductions',
          impact: 'positive',
          consequence: 'Great choice! Less CO2 in the atmosphere means less ocean acidification, protecting shellfish and coral.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Continue current emission levels',
          impact: 'negative',
          consequence: 'Ocean acidification worsens. Lobsters and other shellfish struggle to build strong shells, affecting the food chain.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Create alkaline buffer zones',
          impact: 'neutral',
          consequence: 'This experimental approach shows promise but needs more research. Local improvements are possible but limited.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Offshore Wind Power',
      description: 'Nova Scotia is developing offshore wind farms to generate clean energy. However, construction and operation might affect marine life. What\'s the best approach?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan wind farms to avoid sensitive habitats',
          impact: 'positive',
          consequence: 'Excellent planning! Clean energy development that protects whale migration routes and fish spawning areas.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Reject offshore wind development',
          impact: 'negative',
          consequence: 'Without clean energy, fossil fuel use continues, worsening climate change and ocean warming.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Use fish-friendly turbine designs',
          impact: 'positive',
          consequence: 'Smart innovation! New turbine designs reduce noise and provide artificial reef habitat for marine life.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Coastal Community Growth',
      description: 'Coastal communities in Nova Scotia are growing, bringing more development near the shore. This can affect water quality and marine habitats. How should development proceed?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Require sustainable coastal development',
          impact: 'positive',
          consequence: 'Wonderful! Green building practices protect water quality and preserve coastal ecosystems for future generations.',
        },
        {
          id: 'unrestricted-development',
          text: 'Allow unrestricted coastal building',
          impact: 'negative',
          consequence: 'Runoff and pollution from development degrades water quality, harming fish nurseries and coastal habitats.',
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Create protective buffer zones',
          impact: 'positive',
          consequence: 'Great strategy! Buffer zones filter runoff and provide habitat corridors connecting land and sea ecosystems.',
        }
      ],
      isEnding: true
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
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Permettre une pêche illimitée',
          impact: 'negative',
          consequence: 'Cela épuise les stocks de poissons. Les espèces comme la morue ont du mal à se reproduire, nuisant à toute la chaîne alimentaire.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Créer des aires marines protégées',
          impact: 'positive',
          consequence: 'Parfait! Les aires protégées servent de pouponnières où la vie marine peut prospérer et les populations se rétablir.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Voies de navigation achalandées',
      description: 'Le trafic maritime intense dans le port d\'Halifax et le plateau continental scotian pose des risques aux mammifères marins, en particulier aux baleines noires de l\'Atlantique Nord en voie de disparition. Quelles mesures devraient être prises?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Imposer des limites de vitesse dans les zones de baleines',
          impact: 'positive',
          consequence: 'Excellent choix! Les navires plus lents donnent aux baleines le temps d\'éviter les collisions et réduisent les frappes mortelles.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Maintenir les vitesses de navigation actuelles',
          impact: 'negative',
          consequence: 'Cela augmente les décès de baleines par collision. La population de baleines noires en danger continue de décliner.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Installer la technologie de détection de baleines',
          impact: 'positive',
          consequence: 'Solution intelligente! Les systèmes d\'alerte précoce aident les navires à éviter les baleines et réduisent la pollution sonore.',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Changements chimiques océaniques',
      description: 'L\'océan absorbe plus de dioxyde de carbone de l\'atmosphère, le rendant plus acide. Cela affecte les crustacés comme les homards et les pétoncles qui construisent des coquilles. Comment peut-on remédier à cela?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Soutenir la réduction des émissions de carbone',
          impact: 'positive',
          consequence: 'Excellent choix! Moins de CO2 dans l\'atmosphère signifie moins d\'acidification océanique, protégeant les crustacés et les coraux.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Maintenir les niveaux d\'émission actuels',
          impact: 'negative',
          consequence: 'L\'acidification océanique s\'aggrave. Les homards et autres crustacés ont du mal à construire des coquilles solides.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Créer des zones tampons alcalines',
          impact: 'neutral',
          consequence: 'Cette approche expérimentale est prometteuse mais nécessite plus de recherche. Des améliorations locales sont possibles mais limitées.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Énergie éolienne offshore',
      description: 'La Nouvelle-Écosse développe des parcs éoliens offshore pour générer de l\'énergie propre. Cependant, la construction et l\'exploitation pourraient affecter la vie marine. Quelle est la meilleure approche?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Planifier les parcs éoliens pour éviter les habitats sensibles',
          impact: 'positive',
          consequence: 'Excellente planification! Développement d\'énergie propre qui protège les routes migratoires des baleines et les zones de frai.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Rejeter le développement éolien offshore',
          impact: 'negative',
          consequence: 'Sans énergie propre, l\'utilisation de combustibles fossiles continue, aggravant le changement climatique.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Utiliser des conceptions d\'éoliennes respectueuses des poissons',
          impact: 'positive',
          consequence: 'Innovation intelligente! Les nouvelles conceptions d\'éoliennes réduisent le bruit et fournissent un habitat de récif artificiel.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Croissance des communautés côtières',
      description: 'Les communautés côtières de la Nouvelle-Écosse grandissent, apportant plus de développement près du rivage. Cela peut affecter la qualité de l\'eau et les habitats marins. Comment le développement devrait-il procéder?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Exiger un développement côtier durable',
          impact: 'positive',
          consequence: 'Merveilleux! Les pratiques de construction verte protègent la qualité de l\'eau et préservent les écosystèmes côtiers.',
        },
        {
          id: 'unrestricted-development',
          text: 'Permettre la construction côtière sans restriction',
          impact: 'negative',
          consequence: 'Le ruissellement et la pollution du développement dégradent la qualité de l\'eau, nuisant aux pouponnières de poissons.',
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Créer des zones tampons protectrices',
          impact: 'positive',
          consequence: 'Grande stratégie! Les zones tampons filtrent le ruissellement et fournissent des corridors d\'habitat.',
        }
      ],
      isEnding: true
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
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Msit ketu pu\'tu\'n',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq nkmaq qospemkato\'tij. Nkmaq mu nuksi\'tij mijua\'jijik.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Samqwan tepkunasin pukwelk',
          impact: 'positive',
          consequence: 'Kelu! Pukwelksik tepo\'tij samqwanikatijk ukti\'tij aq nuksi\'tij.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Kijikewalk wkitasin',
      description: 'Pukwelk kijikewalk Kialitekewkek aq Kespukek wenjo\'tij putupkuatl, pas epmitasik putupul. Koqoey ketu\'k?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Kijikewalk telo\'lkitijik putupuk',
          impact: 'positive',
          consequence: 'Kelu! Ketanji kijikewalk putupul ketkunato\'tij aq mu wetalkijek.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Eykisk kijikewalk kespekultijik',
          impact: 'negative',
          consequence: 'Ula pukweskinuaq putupul nepnuksin. Putupul telo\'tij.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Putupul wekimukewey kijikewalkek',
          impact: 'positive',
          consequence: 'Pilei! Kisikewey putupul wekimuk aq mu wetulkiesnuk.',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Samqwan ankite\'skisnul',
      description: 'Samqwan temoksitu\'k mskiku aq ankite\'sk. Na wenjo\'tiq kupkwey aq apoqsuol qospemi\'jijik. Koqoey ketu\'k?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Apoqon mu pukwelk',
          impact: 'positive',
          consequence: 'Kelu! Apjiw apoqon samqwan mu ankite\'snuk, kupkwey kepmin.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Eykisk apoqon elitasikatijk',
          impact: 'negative',
          consequence: 'Samqwan pas ankite\'sk. Kupkwey aq apoqsuol mu kelu qospem alkewskultijik.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Tepo\'tin ankite\'waqan',
          impact: 'neutral',
          consequence: 'Pilei koqoey! Ketanji tepo\'tin kelu.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Samqwankook pilei muk\'sunn',
      description: 'Kespek mawimkatl pilei muk\'sunn samqwankook. Ketu ula wenjo\'taq samqwanikatl. Taloq kelu?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Kelu ankaptmukewey mu wenjo\'tnuk tepo\'tij',
          impact: 'positive',
          consequence: 'Kelu ankamtimuk! Pilei muk\'sunn kepmin putupul alasumkewey aq nkmaq nuksi\'mkewey.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Mu ketu pilei muk\'sunn',
          impact: 'negative',
          consequence: 'Puktusk eykisk apoqultijik, samqwan pas kespite\'snul.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Nkmaq-wulaten pilsultinej',
          impact: 'positive',
          consequence: 'Pilei koqoey! Siawa\'ji pilsultinej mu wetasnuk aq tepo\'tij samqwanikatl.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Qospemi mawiomi mawiskultijik',
      description: 'Qospemi mawiomi Kespukek mawiskultijik, kijaq tepo\'tin qospem. Na ketu wenjo\'taq samqy aq samqwanikatl ukepmitkuuom. Taloq ketu mawiskultimk?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Wskitqamu qospemi mawiskulti\'k',
          impact: 'positive',
          consequence: 'Kelu wskitqamu! Pilei alkewskulti\'k samqy kepmin aq tepo\'tin ukamkinu\'k.',
        },
        {
          id: 'unrestricted-development',
          text: 'Msit teluek mawiskulti\'k qospem',
          impact: 'negative',
          consequence: 'Apoqey aq kamkinu\'mk samqy wetasin, nkmaq nuksi\'mkewey wenjo\'taq.',
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Kepmikatl tepo\'tin mawita\'sin',
          impact: 'positive',
          consequence: 'Pilei koqoey! Tepo\'tin apoqey temalkatl aq samqwanikatl ukepmitkuom wejiwikatl.',
        }
      ],
      isEnding: true
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
