import { Language, Scenario, MarineSpecies } from '../types';

// Import local images
import plasticPollutionImg from '../assets/images/plastic-pollution.jpg';
import fishingPracticesImg from '../assets/images/fishing-practices.jpg';
import shippingTrafficImg from '../assets/images/shipping-traffic.jpg';

import renewableEnergyImg from '../assets/images/renewable-energy.jpg';
import coastalDevelopmentImg from '../assets/images/coastal-development.jpg';
import lobsterImg from '../assets/images/lobster.jpg';
import codImg from '../assets/images/cod.jpg';
import whaleImg from '../assets/images/whale.jpg';
import kelpImg from '../assets/images/kelp.jpg';

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'mi', name: "Mi'kmaq", nativeName: "Mi'kmaq" }
];

export const marineSpecies: MarineSpecies[] = [
  {
    id: 'lobster',
    name: 'Atlantic Lobster',
    imageUrl: lobsterImg,
    healthStatus: 'stable'
  },
  {
    id: 'cod',
    name: 'Atlantic Cod',
    imageUrl: codImg,
    healthStatus: 'stable'
  },
  {
    id: 'whale',
    name: 'North Atlantic Right Whale',
    imageUrl: whaleImg,
    healthStatus: 'stable'
  },
  {
    id: 'kelp',
    name: 'Kelp Forest',
    imageUrl: kelpImg,
    healthStatus: 'stable'
  }
];

export const scenarios: Record<Language['code'], Scenario[]> = {
  en: [
    {
      id: 'plastic-pollution',
      title: 'Trash Attack!',
      description: 'Oh no! Plastic bags and bottles are washing up on Nova Scotia beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish get tangled up in bottle rings. What should we do to help?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Ban single-use plastics like bags and straws',
          impact: 'positive',
          consequence: 'Awesome choice! With less plastic trash, sea animals are much safer. Whales, dolphins, and sea birds can swim and fly without getting hurt.',
          pros: 'Sea animals stop getting hurt by plastic. Beaches become cleaner and prettier.',
          cons: 'People need to remember to bring their own bags. Some things might cost a bit more.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Keep using plastic like we always have',
          impact: 'negative',
          consequence: 'Uh oh! More sea animals get sick from eating plastic. The ocean becomes like a giant garbage dump.',
          pros: "People don't have to change their shopping habits.",
          cons: 'Sea turtles and fish keep getting hurt. Beaches become gross and dirty.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organize awesome beach cleanup parties',
          impact: 'positive',
          consequence: "Great idea! Every piece of trash we pick up saves a sea animal. Plus, it's fun to do with friends!",
          pros: 'Helps animals right away. People learn why clean beaches matter.',
          cons: 'Only cleans up old trash. New trash keeps coming unless we change our habits.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Fish for the Future',
      description: "Fishing boats catch tons of fish every day near Nova Scotia. Fishing gives people jobs and yummy food. But if we catch too many fish, baby fish won't have parents. How should we fish smartly?",
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Set limits on how many fish we can catch',
          impact: 'positive',
          consequence: 'Smart thinking! By only catching some fish, we make sure there are always fish in the ocean. Fishers can keep their jobs forever!',
          pros: 'Fish families stay together and grow. Fishing jobs last for many years.',
          cons: 'Fishers might earn less money at first.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Catch as many fish as possible',
          impact: 'negative',
          consequence: 'Oh no! All the fish disappear. Without parent fish, no baby fish are born. Soon the ocean becomes empty.',
          pros: 'Fishers make lots of money right now.',
          cons: 'All fish vanish. No more fishing jobs. No more fish dinners.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Create special "no fishing" safe zones',
          impact: 'positive',
          consequence: 'Perfect! These safe zones are like fish nurseries where baby fish grow up safely. Then they swim out to fill the whole ocean!',
          pros: 'Safe places for fish babies. More fish everywhere over time.',
          cons: "Some fishers can't fish in those special spots.",
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Whale Highway Danger',
      description: "Giant cargo ships sail past Nova Scotia every day. Sometimes they accidentally hit whales because they're going super fast. Right whales are almost extinct - there are only about 340 left! How can we help?",
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Make ships slow down in whale areas',
          impact: 'positive',
          consequence: "Brilliant! When ships go slower, whales have time to swim out of the way. It's like a speed limit to save lives!",
          pros: 'Saves whale lives. Gives whales time to escape danger.',
          cons: 'Ships take longer to deliver stuff. Shipping costs more money.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-whales',
          text: 'Let ships go as fast as they want',
          impact: 'negative',
          consequence: 'Terrible news! More whales get hit and die. These amazing giants might disappear forever.',
          pros: 'Ships deliver things quickly and cheaply.',
          cons: 'Whales become extinct. We lose these incredible ocean animals.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'detection-systems',
          text: 'Put whale-spotting technology on ships',
          impact: 'positive',
          consequence: "Cool tech solution! Special computers warn ship captains when whales are nearby. It's like whale radar!",
          pros: 'Ships know exactly where whales are swimming.',
          cons: 'Costs money to buy the technology. Ship crews need training.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Ocean Wind Power',
      description: "Nova Scotia wants to build huge wind turbines in the ocean to make clean electricity. These giant spinning towers could power thousands of homes! But building them might disturb whales and fish. What's the best plan?",
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan carefully to avoid whale migration routes',
          impact: 'positive',
          consequence: "Excellent planning! We get clean energy AND protect whale highways. It's like building around important animal neighborhoods.",
          pros: "Clean energy that doesn't hurt sea animals. Best of both worlds!",
          cons: 'Takes longer to plan. Might cost more money upfront.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: "Don't build any ocean wind farms",
          impact: 'negative',
          consequence: 'Without clean energy, we keep burning dirty fuels that heat up the ocean and hurt ALL sea life.',
          pros: 'No construction noise bothers sea animals.',
          cons: 'Ocean keeps getting hotter. Climate change gets worse.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Design fish-friendly wind turbines',
          impact: 'positive',
          consequence: 'Super cool innovation! New quiet designs actually become artificial reefs where fish love to live!',
          pros: 'Creates new homes for fish. Quieter for whales.',
          cons: 'Costs more to develop. New technology might have surprises.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Building by the Beach',
      description: "More families want to live near Nova Scotia's beautiful coastline. New houses, stores, and hotels are being built. But construction can make dirty water run into the ocean. How should we build responsibly?",
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Use eco-friendly building methods',
          impact: 'positive',
          consequence: 'Amazing choice! Green building keeps the water crystal clear and protects sea animal homes. Future generations will thank us!',
          pros: 'Clean water for everyone. Sea animals keep their homes safe.',
          cons: 'Costs more money to build. Takes longer to finish projects.'
        },
        {
          id: 'unrestricted-development',
          text: 'Build wherever and however people want',
          impact: 'negative',
          consequence: 'Yikes! Dirty water flows into the ocean, turning it murky. Fish nurseries get destroyed. Baby fish have nowhere to grow up.',
          pros: 'Builds faster and cheaper. More construction jobs right away.',
          cons: 'Ocean becomes polluted. Sea animals lose their homes.'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Leave natural spaces between buildings and water',
          impact: 'positive',
          consequence: "Brilliant strategy! These green buffers work like giant sponges, cleaning dirty water before it reaches the ocean.",
          pros: 'Natural water filter system. Animals have safe paths to move around.',
          cons: 'Less space available for building. Houses might cost more.'
        }
      ],
      isEnding: true
    }
  ],
  fr: [
    // French translations with local images
    {
      id: 'plastic-pollution',
      title: 'Attaque de déchets!',
      description: "Oh non! Des sacs et bouteilles en plastique arrivent sur les plages de Nouvelle-Écosse. Les tortues de mer pensent que les sacs plastiques sont des méduses et essaient de les manger. Que devons-nous faire pour aider?",
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Interdire les plastiques jetables comme les sacs',
          impact: 'positive',
          consequence: "Super choix! Avec moins de déchets plastiques, les animaux marins sont plus en sécurité. Les baleines et dauphins peuvent nager sans se blesser.",
          pros: "Les animaux marins arrêtent de se blesser. Les plages deviennent plus propres.",
          cons: "Les gens doivent se rappeler d'apporter leurs propres sacs.",
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser le plastique comme avant',
          impact: 'negative',
          consequence: "Oh là là! Plus d'animaux marins tombent malades en mangeant du plastique. L'océan devient comme une poubelle géante.",
          pros: "Les gens n'ont pas à changer leurs habitudes.",
          cons: 'Les tortues et poissons continuent à se blesser.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des fêtes de nettoyage de plage',
          impact: 'positive',
          consequence: "Excellente idée! Chaque déchet qu'on ramasse sauve un animal marin. En plus, c'est amusant avec des amis!",
          pros: "Aide les animaux immédiatement. Les gens apprennent pourquoi c'est important.",
          cons: "Ne nettoie que les vieux déchets. De nouveaux déchets continuent d'arriver.",
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Pêche pour l\'avenir',
      description: "Les bateaux de pêche attrapent des tonnes de poissons chaque jour près de la Nouvelle-Écosse. La pêche donne du travail et de la nourriture délicieuse. Mais si on attrape trop de poissons, les bébés poissons n'auront pas de parents. Comment pêcher intelligemment?",
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Fixer des limites sur la quantité de poissons à pêcher',
          impact: 'positive',
          consequence: "Bonne idée! En ne pêchant qu'une partie des poissons, on s'assure qu'il y en aura toujours dans l'océan. Les pêcheurs peuvent garder leur emploi pour toujours!",
          pros: "Les familles de poissons restent ensemble et grandissent. Les emplois de pêche durent longtemps.",
          cons: "Les pêcheurs pourraient gagner moins d'argent au début.",
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Pêcher autant que possible',
          impact: 'negative',
          consequence: "Oh non! Tous les poissons disparaissent. Sans poissons parents, aucun bébé poisson ne naît. Bientôt, l'océan sera vide.",
          pros: "Les pêcheurs gagnent beaucoup d'argent maintenant.",
          cons: "Tous les poissons disparaissent. Plus d'emplois de pêche. Plus de dîners de poisson.",
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Créer des zones de sécurité "sans pêche"',
          impact: 'positive',
          consequence: "Parfait! Ces zones sont comme des nurseries où les bébés poissons grandissent en sécurité. Puis ils nagent pour remplir tout l'océan!",
          pros: "Des endroits sûrs pour les bébés poissons. Plus de poissons partout avec le temps.",
          cons: "Certains pêcheurs ne peuvent pas pêcher dans ces zones.",
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Danger sur la route des baleines',
      description: "De gigantesques cargos passent près de la Nouvelle-Écosse chaque jour. Parfois, ils heurtent accidentellement des baleines car ils vont très vite. Les baleines franches de l'Atlantique sont presque éteintes - il n'en reste qu'environ 340! Comment aider?",
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Faire ralentir les navires dans les zones de baleines',
          impact: 'positive',
          consequence: "Brillant! Quand les navires vont plus lentement, les baleines ont le temps de s'écarter. C'est comme une limite de vitesse pour sauver des vies!",
          pros: "Sauve des vies de baleines. Donne du temps aux baleines pour éviter le danger.",
          cons: "Les navires mettent plus de temps à livrer. Le transport coûte plus cher.",
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-whales',
          text: 'Laisser les navires aller aussi vite qu\'ils veulent',
          impact: 'negative',
          consequence: "Terrible! Plus de baleines sont heurtées et meurent. Ces géants incroyables pourraient disparaître pour toujours.",
          pros: "Les navires livrent rapidement et à bas prix.",
          cons: "Les baleines deviennent éteintes. Nous perdons ces animaux incroyables.",
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'detection-systems',
          text: 'Mettre des technologies de détection de baleines sur les navires',
          impact: 'positive',
          consequence: "Solution technologique cool! Des ordinateurs spéciaux avertissent les capitaines quand des baleines sont proches. C'est comme un radar à baleines!",
          pros: "Les navires savent exactement où nagent les baleines.",
          cons: "Coûte cher d'acheter la technologie. Les équipages doivent être formés.",
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: "L'énergie éolienne océanique",
      description: "La Nouvelle-Écosse veut construire d'énormes éoliennes dans l'océan pour produire de l'électricité propre. Ces tours géantes pourraient alimenter des milliers de maisons! Mais leur construction pourrait déranger les baleines et poissons. Quel est le meilleur plan?",
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Planifier soigneusement pour éviter les routes migratoires des baleines',
          impact: 'positive',
          consequence: "Excellente planification! On obtient de l'énergie propre ET on protège les routes des baleines. C'est comme construire autour des quartiers importants pour les animaux.",
          pros: "Énergie propre qui ne nuit pas aux animaux marins. Le meilleur des deux mondes!",
          cons: "Prend plus de temps à planifier. Peut coûter plus cher au départ.",
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: "Ne pas construire de parcs éoliens océaniques",
          impact: 'negative',
          consequence: "Sans énergie propre, on continue à brûler des combustibles sales qui réchauffent l'océan et nuisent à toute la vie marine.",
          pros: "Pas de bruit de construction qui dérange les animaux marins.",
          cons: "L'océan continue de chauffer. Le changement climatique s'aggrave.",
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Concevoir des éoliennes respectueuses des poissons',
          impact: 'positive',
          consequence: "Innovation super cool! Les nouveaux designs silencieux deviennent en fait des récifs artificiels où les poissons aiment vivre!",
          pros: "Crée de nouveaux habitats pour les poissons. Plus silencieux pour les baleines.",
          cons: "Coûte plus cher à développer. La nouvelle technologie peut réserver des surprises.",
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Construire près de la plage',
      description: "Plus de familles veulent vivre près de la belle côte de la Nouvelle-Écosse. De nouvelles maisons, magasins et hôtels sont construits. Mais la construction peut faire couler de l'eau sale dans l'océan. Comment construire de manière responsable?",
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Utiliser des méthodes de construction écologiques',
          impact: 'positive',
          consequence: "Choix incroyable! La construction verte garde l'eau claire et protège les habitats des animaux marins. Les générations futures nous remercieront!",
          pros: "Eau propre pour tous. Les animaux gardent leurs habitats en sécurité.",
          cons: "Coûte plus cher. Prend plus de temps pour finir les projets."
        },
        {
          id: 'unrestricted-development',
          text: 'Construire où et comme les gens veulent',
          impact: 'negative',
          consequence: "Aïe! L'eau sale coule dans l'océan, le rendant trouble. Les nurseries de poissons sont détruites. Les bébés poissons n'ont nulle part où grandir.",
          pros: "Construction plus rapide et moins chère. Plus d'emplois dans la construction tout de suite.",
          cons: "L'océan devient pollué. Les animaux perdent leurs habitats."
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Laisser des espaces naturels entre les bâtiments et l\'eau',
          impact: 'positive',
          consequence: "Stratégie brillante! Ces zones tampons vertes agissent comme des éponges géantes, nettoyant l'eau sale avant qu'elle n'atteigne l'océan.",
          pros: "Filtre naturel de l'eau. Les animaux ont des chemins sûrs pour se déplacer.",
          cons: "Moins d'espace pour construire. Les maisons peuvent coûter plus cher."
        }
      ],
      isEnding: true
    }
  ],
  mi: [
    // Mi'kmaq translations with local images  
    {
      id: 'plastic-pollution',
      title: 'Kaqawej maqamikew!',
      description: "Oqwa! Kaqawej aqq plastik ma't wetapekl wuskitqamu'k puksit. Mimkitamuj kisi'kt wipusultip plastik ma't na jellyfish aqq kesalultijik mu'in. Nkmuj na ji'nm kesimqwatijik?",
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: "Maqamitenej kaqawej plastik ma'tujik",
          impact: 'positive',
          consequence: "Wela wetultip! Apoqnmuej plastik, samqwan napeskamultijik wjit teli nktuei. Puktusk, tuwalskisk, aqq nemitisk kesalayik apoqonmuej.",
          pros: 'Samqwan nkamlamulkwayik. Puksitik wjit apoqonmueyik.',
          cons: "L'nuk elt klamnultijik teli weluiktalanku ma'tajik.",
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Kmutu kesipkwatultinenej plastik',
          impact: 'negative',
          consequence: "Mawi! Samqwan kesipawayik plastik ni'p. Uktukamkw wjit puktayik kaqawej.",
          pros: "L'nuk ma ta'n teltultijik mu'in kesalkwatultinenej.",
          cons: "Mimkitamuj aqq nkmuj kisi'kt kespayik. Puksitik apoqoneykw.",
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Mawulkultimkenej apoqonmuewey',
          impact: 'positive',
          consequence: "Wela! Kisu'k kaqawej naskwatimk, ap naskwataq samqwan. Aq wjit wintaponej witapikiktuk!",
          pros: "Nukwaan ankotunemul samqwanuwa. L'nuk kesteltanej weluey.",
          cons: "Mutt kesanskomik amsqwan kaqawej. Skitqamu kaqawej teluewey.",
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: "Kesalultijik aqq Kiskukewey",
      description: "Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk.",
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: "Kesalultijik wjit puktuk",
          impact: 'negative',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: "Kesalultijik aqq Kiskukewey",
      description: "Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk.",
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-whales',
          text: "Kesalultijik wjit puktuk",
          impact: 'negative',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'detection-systems',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: "Kesalultijik aqq Kiskukewey",
      description: "Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk.",
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: "Kesalultijik wjit puktuk",
          impact: 'negative',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk",
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: "Kesalultijik aqq Kiskukewey",
      description: "Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk.",
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk"
        },
        {
          id: 'unrestricted-development',
          text: "Kesalultijik wjit puktuk",
          impact: 'negative',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk"
        },
        {
          id: 'buffer-zones-coastal',
          text: "Kesalultijik wjit puktuk",
          impact: 'positive',
          consequence: "Kesalultijik wjit puktuk",
          pros: "Kesalultijik wjit puktuk",
          cons: "Kesalultijik wjit puktuk"
        }
      ],
      isEnding: true
    }
  ]
};
