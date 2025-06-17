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
      title: 'Plastic in the Water',
      description: 'You see plastic trash washing up on the beach. Sea animals are getting stuck in it and eating it by mistake. What should we do?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Stop using plastic bags and bottles',
          impact: 'positive',
          consequence: 'Great choice! Less plastic trash means sea animals are safer. Fish, whales, and birds won\'t get hurt by plastic.',
          pros: 'No more plastic hurting sea animals, cleaner water for everyone',
          cons: 'People have to use different bags and bottles that might cost more',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Keep using plastic like before',
          impact: 'negative',
          consequence: 'This hurts sea animals. More animals get hurt by plastic trash, and the ocean gets dirtier.',
          pros: 'People don\'t have to change what they do',
          cons: 'Sea animals keep getting hurt, ocean gets more polluted',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Clean up the beach with friends',
          impact: 'positive',
          consequence: 'Great idea! When we pick up trash, we help sea animals stay safe.',
          pros: 'Helps sea animals right away, teaches people about keeping beaches clean',
          cons: 'Only cleans up old trash, doesn\'t stop new trash from coming',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Catching Fish',
      description: 'Fishing gives people jobs and food. But catching too many fish means there won\'t be enough fish left. How should we fish?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Only catch a certain number of fish',
          impact: 'positive',
          consequence: 'Smart choice! This way there will always be fish in the ocean and people can keep fishing.',
          pros: 'Fish families can grow, people can fish forever',
          cons: 'Fishers might make less money at first',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Catch as many fish as you want',
          impact: 'negative',
          consequence: 'This means all the fish will be gone. Baby fish can\'t grow up, and soon there won\'t be any fish left.',
          pros: 'Fishers make more money right now',
          cons: 'All the fish disappear, no more fishing jobs later',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Make safe places where fish can\'t be caught',
          impact: 'positive',
          consequence: 'Perfect! These safe spots are like fish nurseries where baby fish can grow up safely.',
          pros: 'Safe places for fish to have babies, more fish everywhere',
          cons: 'Some fishers can\'t fish in those spots',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Big Ships and Whales',
      description: 'Many big ships sail near Nova Scotia. Sometimes they hit whales by accident. The whales are in danger. What can we do?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Make ships go slower near whales',
          impact: 'positive',
          consequence: 'Great idea! Slow ships give whales time to get out of the way.',
          pros: 'Saves whale lives, whales have time to swim away',
          cons: 'Ships take longer to deliver things, costs more money',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Let ships go as fast as they want',
          impact: 'negative',
          consequence: 'This hurts whales. More whales get hit by ships and die.',
          pros: 'Ships can deliver things quickly and cheaply',
          cons: 'Whales keep dying, they might all disappear',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Put whale detectors on ships',
          impact: 'positive',
          consequence: 'Smart thinking! Special computers can warn ships when whales are near.',
          pros: 'Ships know where whales are, less noise hurts whales',
          cons: 'Costs money to buy the computers, crews need to learn how to use them',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Sour Ocean Water',
      description: 'The ocean is getting more sour because of pollution in the air. This makes it hard for lobsters and other shelled animals to grow. What can we do?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Make less air pollution',
          impact: 'positive',
          consequence: 'Excellent! Less dirty air means the ocean stays healthy for lobsters and other sea animals.',
          pros: 'Helps the whole ocean, good for all sea animals',
          cons: 'People have to change how they do things, takes time to work',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Keep making the same amount of pollution',
          impact: 'negative',
          consequence: 'The ocean gets more sour. Lobsters can\'t make strong shells, and they get sick.',
          pros: 'People don\'t have to change anything',
          cons: 'Sea animals with shells get sick, fishing gets harder',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Add special chemicals to help the water',
          impact: 'neutral',
          consequence: 'This might work but we need to test it more. It could help some small areas.',
          pros: 'Might help some places, trying new ideas',
          cons: 'We don\'t know if it really works, costs a lot, only helps small areas',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Wind Power in the Ocean',
      description: 'Nova Scotia wants to build big wind machines in the ocean to make clean electricity. But building them might bother sea animals. What\'s the best way?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan carefully to avoid hurting sea animals',
          impact: 'positive',
          consequence: 'Great planning! We can make clean energy and keep whale roads and fish homes safe.',
          pros: 'Clean energy that doesn\'t hurt sea animals',
          cons: 'Takes more time to plan, might cost more money',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Don\'t build wind machines in the ocean',
          impact: 'negative',
          consequence: 'Without clean energy, we keep burning dirty fuel that makes the ocean warmer.',
          pros: 'No building bothers sea animals',
          cons: 'Keep using dirty energy, ocean gets warmer and sicker',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Build special wind machines that help fish',
          impact: 'positive',
          consequence: 'Cool idea! New designs are quieter and can become homes for fish.',
          pros: 'Helps some sea animals, makes less noise',
          cons: 'Costs more money, we don\'t know all the effects yet',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Building Near the Beach',
      description: 'More people want to live near the beach in Nova Scotia. Building houses and stores can make the water dirty. How should we build?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Build in ways that keep water clean',
          impact: 'positive',
          consequence: 'Wonderful! Building green keeps the water clean and saves homes for sea animals.',
          pros: 'Clean water, safe homes for sea animals, good for the future',
          cons: 'Costs more money to build, takes longer'
        },
        {
          id: 'unrestricted-development',
          text: 'Build anywhere people want',
          impact: 'negative',
          consequence: 'Dirty water runs into the ocean and hurts fish homes and baby fish areas.',
          pros: 'Builds faster and cheaper, more jobs right away',
          cons: 'Dirty water, sea animals lose their homes'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Leave empty space between buildings and water',
          impact: 'positive',
          consequence: 'Great idea! These empty spaces clean dirty water and give animals paths to move.',
          pros: 'Natural water cleaner, animals can move safely',
          cons: 'Less space to build, might make houses cost more'
        }
      ],
      isEnding: true
    },
    {
      id: 'climate-change',
      title: 'Ocean Getting Warmer',
      description: 'The ocean is getting warmer because of air pollution. This makes fish move to different places. What can help fix this?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Use wind and sun power instead of dirty fuel',
          impact: 'positive',
          consequence: 'Excellent! Clean energy makes less dirty air, so the ocean stays cooler.',
          pros: 'Less dirty air, new clean energy jobs, cooler ocean',
          cons: 'Costs a lot of money to start, weather affects power'
        },
        {
          id: 'ignore-climate',
          text: 'Keep using dirty fuel like coal and oil',
          impact: 'negative',
          consequence: 'This makes the ocean warmer. Fish have to swim far away to find cool water.',
          pros: 'Don\'t have to change how we make energy',
          cons: 'Ocean gets too warm, fish move away, sea animals get sick'
        },
        {
          id: 'carbon-capture',
          text: 'Plant sea grass and protect wetlands',
          impact: 'positive',
          consequence: 'Smart thinking! Sea plants and wetlands suck up dirty air from the sky.',
          pros: 'Nature cleans the air, protects sea animal homes',
          cons: 'Can only clean a little bit, takes a long time, needs big areas'
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
          pros: 'Élimine une source majeure de pollution marine, protège la faune de l\'enchevêtrement et de l\'ingestion',
          cons: 'Peut augmenter les coûts pour les entreprises et consommateurs, nécessite une période d\'adaptation',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser le plastique comme d\'habitude',
          impact: 'negative',
          consequence: 'Ce choix nuit à la vie marine. Plus d\'animaux sont blessés par les débris plastiques, et l\'écosystème océanique devient pollué.',
          pros: 'Aucune perturbation économique immédiate, maintient les niveaux de commodité actuels',
          cons: 'Dommages continus aux animaux marins, aggravation de la pollution océanique',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des événements de nettoyage de plage',
          impact: 'positive',
          consequence: 'Excellent! L\'action communautaire fait une vraie différence. Chaque morceau de plastique retiré protège les animaux marins.',
          pros: 'Impact positif immédiat, sensibilise la communauté, éduque le public sur la pollution',
          cons: 'Ne traite que les déchets existants, ne prévient pas la nouvelle pollution',
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
          pros: 'Assure la santé à long terme des populations de poissons, maintient la viabilité de l\'industrie',
          cons: 'Peut réduire les profits de pêche à court terme, nécessite une surveillance stricte',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Permettre une pêche illimitée',
          impact: 'negative',
          consequence: 'Cela épuise les stocks de poissons. Les espèces comme la morue ont du mal à se reproduire, nuisant à toute la chaîne alimentaire.',
          pros: 'Avantage économique maximal à court terme pour l\'industrie de la pêche',
          cons: 'Conduit à la surpêche et à l\'effondrement des espèces, détruit l\'écosystème marin',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Créer des aires marines protégées',
          impact: 'positive',
          consequence: 'Parfait! Les aires protégées servent de pouponnières où la vie marine peut prospérer et les populations se rétablir.',
          pros: 'Crée des zones de reproduction sûres, permet la récupération de l\'écosystème',
          cons: 'Restreint l\'accès à la pêche dans certaines zones, peut nécessiter une compensation',
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
          pros: 'Réduit significativement les décès de baleines par collision de navire',
          cons: 'Augmente le temps et les coûts de transport, peut affecter les horaires de livraison',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Maintenir les vitesses de navigation actuelles',
          impact: 'negative',
          consequence: 'Cela augmente les décès de baleines par collision. La population de baleines noires en danger continue de décliner.',
          pros: 'Maintient les opérations de transport efficaces et les avantages économiques',
          cons: 'Continue la menace aux espèces de baleines en danger, peut conduire à l\'extinction',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Installer la technologie de détection de baleines',
          impact: 'positive',
          consequence: 'Solution intelligente! Les systèmes d\'alerte précoce aident les navires à éviter les baleines et réduisent la pollution sonore.',
          pros: 'Technologie avancée fournit une détection de baleines en temps réel',
          cons: 'Coûts technologiques initiaux élevés, nécessite une formation pour les équipages',
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
          pros: 'S\'attaque à la cause racine de l\'acidification, profite à tout l\'écosystème océanique',
          cons: 'Nécessite des changements économiques et de mode de vie significatifs',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Maintenir les niveaux d\'émission actuels',
          impact: 'negative',
          consequence: 'L\'acidification océanique s\'aggrave. Les homards et autres crustacés ont du mal à construire des coquilles solides.',
          pros: 'Aucune perturbation économique immédiate, maintient les pratiques industrielles actuelles',
          cons: 'Dommages continus à la vie marine constructrice de coquilles, menace l\'industrie de la pêche',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Créer des zones tampons alcalines',
          impact: 'neutral',
          consequence: 'Cette approche expérimentale est prometteuse mais nécessite plus de recherche. Des améliorations locales sont possibles mais limitées.',
          pros: 'Peut fournir une protection locale pour les zones sensibles, approche innovante',
          cons: 'Technologie non prouvée, coûts élevés, portée limitée',
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
          pros: 'Équilibre les besoins d\'énergie propre avec la protection marine',
          cons: 'Peut limiter les emplacements de placement optimaux, augmente les coûts de planification',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Rejeter le développement éolien offshore',
          impact: 'negative',
          consequence: 'Sans énergie propre, l\'utilisation de combustibles fossiles continue, aggravant le changement climatique.',
          pros: 'Aucune perturbation des habitats marins par la construction de parcs éoliens',
          cons: 'Dépendance continue aux combustibles fossiles, occasion manquée pour l\'énergie propre',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Utiliser des conceptions d\'éoliennes respectueuses des poissons',
          impact: 'positive',
          consequence: 'Innovation intelligente! Les nouvelles conceptions d\'éoliennes réduisent le bruit et fournissent un habitat de récif artificiel.',
          pros: 'Technologie innovante minimise l\'impact marin, peut réellement bénéficier à certaines espèces',
          cons: 'Coûts de développement plus élevés, nouvelle technologie peut avoir des effets inconnus',
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
          pros: 'Protège la qualité de l\'eau et les habitats marins, assure une croissance durable',
          cons: 'Coûts de développement plus élevés, peut ralentir le rythme de croissance'
        },
        {
          id: 'unrestricted-development',
          text: 'Permettre la construction côtière sans restriction',
          impact: 'negative',
          consequence: 'Le ruissellement et la pollution du développement dégradent la qualité de l\'eau, nuisant aux pouponnières de poissons.',
          pros: 'Croissance économique plus rapide, coûts de développement inférieurs',
          cons: 'Dégrade la qualité de l\'eau, détruit les habitats marins'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Créer des zones tampons protectrices',
          impact: 'positive',
          consequence: 'Grande stratégie! Les zones tampons filtrent le ruissellement et fournissent des corridors d\'habitat.',
          pros: 'Système de filtration naturel, préserve les corridors fauniques',
          cons: 'Réduit les terres de développement disponibles, peut augmenter les valeurs immobilières'
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
          pros: 'Réduit les émissions de gaz à effet de serre, crée des emplois d\'énergie propre',
          cons: 'Coûts d\'investissement initiaux élevés, nécessite des changements d\'infrastructure'
        },
        {
          id: 'ignore-climate',
          text: 'Continuer à brûler des combustibles fossiles',
          impact: 'negative',
          consequence: 'Cela accélère le réchauffement océanique. Les espèces marines doivent migrer pour survivre, perturbant l\'écosystème.',
          pros: 'Aucun changement immédiat aux systèmes énergétiques actuels',
          cons: 'Accélère le changement climatique, force la migration des espèces marines'
        },
        {
          id: 'carbon-capture',
          text: 'Soutenir la capture de carbone océanique',
          impact: 'positive',
          consequence: 'Bonne réflexion! Protéger les zones humides côtières et les forêts de kelp aide à absorber le carbone de l\'atmosphère.',
          pros: 'Stockage naturel de carbone, protège les écosystèmes côtiers',
          cons: 'Capacité limitée par rapport à l\'échelle des émissions, nécessite de grandes zones protégées'
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
          pros: 'Pekisk kamkinu\'mk mu teluek, samqwanikatl kepmin',
          cons: 'Ketu pukwelk telo\'ltimk mawi aq apoqnmukultimk',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Apoqon pekisk elitasikatijk',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq samqwanikatl. Pekisk esku\'sk samqwanikatijik.',
          pros: 'Mu pilei ankweyultimk, ankweyei teluek eykisk',
          cons: 'Eykisk wenjo\'taq samqwanikatl, samqwan kamkinu\'mk',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Qospem piskitasin',
          impact: 'positive',
          consequence: 'Kelu! Nukmatuinewikatl nto\'ltimk. Ta\'n pekisk kesnuatl kepmin samqwanikatl.',
          pros: 'Pilei kelu nto\'ltimk, nukmatuin kisikul',
          cons: 'Apoqnmatimkek tep piskitun, mu siawa pekisk wetasnuk',
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
          pros: 'Nkmaq wskitqamu wetultijik, pu\'tu\'newey na\'kwek mawimkewey',
          cons: 'Ketanji apjiw telo\'ltimk pu\'tu\'newk, pukwelk ankweyultimk',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Msit ketu pu\'tu\'n',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq nkmaq qospemkato\'tij. Nkmaq mu nuksi\'tij mijua\'jijik.',
          pros: 'Pukwelk telo\'ltimk pu\'tu\'newk, mu pekisk wenjo\'tnul',
          cons: 'Nkmaq msit qospemkato\'tij, samqwan kamkinu\'mk',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Samqwan tepkunasin pukwelk',
          impact: 'positive',
          consequence: 'Kelu! Pukwelksik tepo\'tij samqwanikatijk ukti\'tij aq nuksi\'tij.',
          pros: 'Pissanji tepo\'tin nuksi\'mkewey, samqwanikatl wskitqamu wetultijik',
          cons: 'Ketanji tepo\'tinkek mu ketu pu\'tu\'n, ketu apoqon telo\'ltimk',
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
          pros: 'Putupul mu wetalkijek kijikewalkek, ketu ketkunato\'tij',
          cons: 'Pukwelk telo\'ltimk aq apoqon, kijikewey na\'kwek',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Eykisk kijikewalk kespekultijik',
          impact: 'negative',
          consequence: 'Ula pukweskinuaq putupul nepnuksin. Putupul telo\'tij.',
          pros: 'Kijikewey eykisk weli nto\'ltimk, mu apoqon',
          cons: 'Epmitasik putupul nepaq, ketu qospemaq',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Putupul wekimukewey kijikewalkek',
          impact: 'positive',
          consequence: 'Pilei! Kisikewey putupul wekimuk aq mu wetulkiesnuk.',
          pros: 'Pilei koqoey putupul wekimuk, mu wetulkiesnuk',
          cons: 'Pukwelk telo\'ltimk, kijikewey kiskulti\'k',
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
          pros: 'Ankite\'skisnul kistamulk, msit samqwanikatl kepmin',
          cons: 'Pukwelk ankamtimk aq telo\'ltimk, siawaju kiskul',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Eykisk apoqon elitasikatijk',
          impact: 'negative',
          consequence: 'Samqwan pas ankite\'sk. Kupkwey aq apoqsuol mu kelu qospem alkewskultijik.',
          pros: 'Mu pilei ankweyultimk, eykisk nto\'ltimk',
          cons: 'Eykisk wenjo\'taq qospem alkewskultijik, pu\'tu\'newey wenjo\'taq',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Tepo\'tin ankite\'waqan',
          impact: 'neutral',
          consequence: 'Pilei koqoey! Ketanji tepo\'tin kelu.',
          pros: 'Ketu kepmikatl ketanji tepo\'tin, pilei koqoey',
          cons: 'Mu kiskulek, pukwelk telo\'ltimk, ketanji tep',
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
          pros: 'Pilei muk\'sunn aq samqwan kepmin nakatmuk',
          cons: 'Ketu ankamtmuk tepo\'tin, pukwelk telo\'ltimk',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Mu ketu pilei muk\'sunn',
          impact: 'negative',
          consequence: 'Puktusk eykisk apoqultijik, samqwan pas kespite\'snul.',
          pros: 'Mu wenjo\'tnuk samqwanikatl ukepmitkuom',
          cons: 'Eykisk puktusk apoqnul, mu ketu pilei muk\'sunn',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Nkmaq-wulaten pilsultinej',
          impact: 'positive',
          consequence: 'Pilei koqoey! Siawa\'ji pilsultinej mu wetasnuk aq tepo\'tij samqwanikatl.',
          pros: 'Pilei koqoey mu wenjo\'tnuk samqwanikatl, ketu kepmikatl',
          cons: 'Pukwelk telo\'ltimk mawimkewey, siawaju mu kiskulek',
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
          pros: 'Samqy aq samqwanikatl ukepmitkuom kepmin, wskitqamu mawiskewey',
          cons: 'Pukwelk telo\'ltimk mawiskewey, ketanji mawite\'snul'
        },
        {
          id: 'unrestricted-development',
          text: 'Msit teluek mawiskulti\'k qospem',
          impact: 'negative',
          consequence: 'Apoqey aq kamkinu\'mk samqy wetasin, nkmaq nuksi\'mkewey wenjo\'taq.',
          pros: 'Wsisk mawiskewey, apjiw telo\'ltimk',
          cons: 'Samqy wetasin, samqwanikatl ukepmitkuom kamkinu\'mk'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Kepmikatl tepo\'tin mawita\'sin',
          impact: 'positive',
          consequence: 'Pilei koqoey! Tepo\'tin apoqey temalkatl aq samqwanikatl ukepmitkuom wejiwikatl.',
          pros: 'Temalkatl apoqey, samqwanikatl tepo\'tin kepmin',
          cons: 'Apjiw mawiskewey tepo\'tin, pukwelk telo\'ltimk'
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
          pros: 'Apoqon mu mawite\'snuk, pilei lukwatewtit',
          cons: 'Pukwelk telo\'ltimk mawimkewey, ankamtimk'
        },
        {
          id: 'ignore-climate',
          text: 'Eykisk puktusk apoqon',
          impact: 'negative',
          consequence: 'Na wenjo\'tiq samqwan pite\'snul. Samqwanikatijk alasulo\'tij ukepmikatil.',
          pros: 'Mu ankweyultimk muk\'sunn ankaptmukewey',
          cons: 'Klama pas elapite\'k, samqwanikatijk alasultijik'
        },
        {
          id: 'carbon-capture',
          text: 'Samqwan apoqon temokein',
          impact: 'positive',
          consequence: 'Kelu elkewek! Qospemi\'ql aq alkewaql tepkunasin apoqon temokato\'tij.',
          pros: 'Apoqon temokein, qospemi\'ql tepkunasin',
          cons: 'Ketanji temokein, pukwelk tepo\'tin, ketanji'
        }
      ],
      isEnding: true
    }
  ]
};
