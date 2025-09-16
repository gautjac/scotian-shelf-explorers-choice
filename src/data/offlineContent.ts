import { Language, Scenario, MarineSpecies } from '../types';

// Import local images
import plasticPollutionImg from '../assets/images/plastic-pollution.jpg';
import fishingPracticesImg from '../assets/images/fishing-practices.jpg';
import shippingTrafficImg from '../assets/images/shipping-traffic.jpg';
import oceanAcidificationImg from '../assets/images/ocean-acidification.jpg';
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
      description: 'Plastic bags and bottles are washing up on Nova Scotia beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish and seabirds get tangled up in bottle rings. What should we do to help?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Ban single-use plastics like bags and straws',
          impact: 'neutral',
          consequence: 'Good first step! With less plastic trash, sea animals are much safer. Whales, fish, and sea birds can swim and fly without getting hurt.',
          pros: 'Sea animals will be less likely to be hurt by plastic. Beaches become cleaner over time.',
          cons: 'People need to remember to bring their own bags. Some things might cost a bit more.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Keep using plastic but try and recycle as much as possible',
          impact: 'neutral',
          consequence: 'Good choice, less plastic is getting into the ocean, but many plastics are hard to recycle and may still pollute the environment.',
          pros: 'People don\'t have to change their shopping habits.',
          cons: 'Sea turtles and fish keep getting hurt. Beaches remain dirty.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Organize awesome beach cleanup parties',
          impact: 'neutral',
          consequence: 'Great idea! Every piece of trash we pick up helps protect sea life. Plus, it\'s fun to do with friends!',
          pros: 'Helps animals right away. Actually removes a threat that is already there.',
          cons: 'Only cleans up old trash. New trash keeps coming unless we change our habits.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Fish for the Future',
      description: 'Fishing boats catch many tons of fish every day near Nova Scotia. Fishing gives people jobs and provides heathy food. But if we catch too many fish, nothing will be left for the future. How can we fish smartly and sustainably?',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Set tight limits on how many fish we can catch',
          impact: 'neutral',
          consequence: 'Smart thinking! By only catching some fish, we make sure there are always fish in the ocean. Fishers can keep their jobs forever!',
          pros: 'Fish populations stay healthy and grow. Fishing jobs last for many years.',
          cons: 'Fishers might earn less money at first',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'Catch only species that are most abundant',
          impact: 'neutral',
          consequence: 'Oh no! Even the most abundant species can be overfished. Without clear limits the ocean becomes empty over time. ',
          pros: 'Fishers can make lots of money in the short term.',
          cons: 'Many fish vanish. Fishing jobs decline over time.',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Create special "no fishing" protected zones',
          impact: 'neutral',
          consequence: 'Great! Well-placed protected areas allow populations to multiply. When they swim out they replenish the ocean elsewhere!',
          pros: 'Safe places for fish to grow. More fish over time.',
          cons: 'Less places to fish. Also, this does not solve the problem of overfiishing elsewhere. ',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Whale Highway Danger',
      description: 'Large ships that carry stuff and people across the ocean sometimes accidentally hit North Atlantic Right whales  - with only less than 400 left in the world! How can we help?',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Slow ships down in areas where whales are abundant.',
          impact: 'neutral',
          consequence: '"When ships go slower',
          pros: 'Saves whale lives. Gives most whales time to escape danger ',
          cons: 'Ships take longer to deliver stuff. Shipping costs more money. ',
          ecosystemImpact: 0,
          economicImpact: 0,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Move shipping lanes to avoid whales altogether',
          impact: 'neutral',
          consequence: 'Good idea! Fewer whales get hit and die if ships are moved from the areas where whale are most common.',
          pros: 'Fewer whales get hit',
          cons: 'Ships may take longer to deliver stuff. And whales are only safe when they stay in their area.',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Put whale-spotting personnel and technology on ships',
          impact: 'neutral',
          consequence: 'Cool tech solution! Satellite data  and spotters warn ship captains when whales are nearby. It\'s like whale radar!',
          pros: 'Ships know roughly where whales are swimming.',
          cons: 'Costs money to maintain. Ship crews need training and need to act on information.',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Ocean Wind Power',
      description: 'Nova Scotia wants to build large wind turbines in the ocean to make clean electricity. These spinning wheels could power most of our of homes! But building and operating them might cause noise that disturbs whales, fish, and seabirds. What\'s the best plan?',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan carefully to avoid whale and bird migration routes',
          impact: 'neutral',
          consequence: 'Excellent planning! We get clean energy AND protect animal highways. It\'s like building away from busy ocean neighborhoods.',
          pros: 'Clean energy that doesn\'t hurt sea animals. Best of both worlds!',
          cons: 'Takes longer to plan. Might be further from shore and cost more money.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Ban construction of ocean wind farms',
          impact: 'neutral',
          consequence: 'While some animals are kept safe, we keep burning dirty fuels for electricty, heating up the ocean and affecting all sea life.',
          pros: 'No added stress to whales, fish and seabirds',
          cons: 'Electricity has to be produced by other means. Climate change may get worse.',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Design quieter wind turbines',
          impact: 'neutral',
          consequence: 'Good innovation! New quiet designs minimize construction and operational noise and actually become artificial reefs that attract fish and other sea life.',
          pros: 'Reduces noise pollution and impacts on marine life.',
          cons: 'Costs more to develop. New technology might not always work as expected.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Building by the Beach',
      description: 'More people are moving to Nova Scotia\'s beautiful coastline. New houses, cottages, and hotels are being built. But development can damage coastal habitats and cause pollution and erosion. How should we build responsibly?',
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Use eco-friendly building methods that minimize harm to habitats and water quality.',
          impact: 'neutral',
          consequence: 'Amazing choice! Green building techniques minimize disturbance and pollution.',
          pros: 'Water quality is maintained and the shoreline remains more natural.',
          cons: 'Costs more to build. Takes longer to finish projects.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Protect undeveloped coastal lands.',
          impact: 'neutral',
          consequence: 'This is good for nature! Coastal species thrive where their habitat is protected.',
          pros: 'Keeps the coast natural, maintains public access to the shore and protects our shoreline from storms. ',
          cons: 'Reduces the area available for people to live and forces them to build further inland.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Build further from shore. Leave natural spaces between buildings and water',
          impact: 'neutral',
          consequence: 'Good strategy! These coastal buffers zones work like sponges, cleaning dirty water before it reaches the ocean.',
          pros: 'Water quality is maintained and houses are more safe from storms.',
          cons: 'Less space available for building. Houses might cost more and water views might be reduced.',
          ecosystemImpact: 25,
          economicImpact: -8,
          communityImpact: 12
        }
      ]
    }
  ],
  fr: [
    {
      id: 'plastic-pollution',
      title: 'Attaque de déchets!',
      description: 'Oh non! Des sacs et bouteilles en plastique arrivent sur les plages de Nouvelle-Écosse. Les tortues de mer pensent que les sacs plastiques sont des méduses et essaient de les manger. Que devons-nous faire pour aider?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Interdire les plastiques jetables comme les sacs',
          impact: 'neutral',
          consequence: 'Super choix! Avec moins de déchets plastiques, les animaux marins sont plus en sécurité. Les baleines et dauphins peuvent nager sans se blesser.',
          pros: 'Les animaux marins arrêtent de se blesser. Les plages deviennent plus propres.',
          cons: 'Les gens doivent se rappeler d\'apporter leurs propres sacs.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser le plastique comme avant',
          impact: 'neutral',
          consequence: 'Oh là là! Plus d\'animaux marins tombent malades en mangeant du plastique. L\'océan devient comme une poubelle géante.',
          pros: 'Les gens n\'ont pas à changer leurs habitudes.',
          cons: 'Les tortues et poissons continuent à se blesser.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des fêtes de nettoyage de plage',
          impact: 'neutral',
          consequence: 'Excellente idée! Chaque déchet qu\'on ramasse sauve un animal marin. En plus, c\'est amusant avec des amis!',
          pros: 'Aide les animaux immédiatement. Les gens apprennent pourquoi c\'est important.',
          cons: 'Ne nettoie que les vieux déchets. De nouveaux déchets continuent d\'arriver.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Pêche pour l\'avenir',
      description: 'Les bateaux de pêche attrapent des tonnes de poissons chaque jour près de la Nouvelle-Écosse. La pêche donne du travail et de la nourriture délicieuse. Mais si on attrape trop de poissons, les bébés poissons n\'auront pas de parents. Comment pêcher intelligemment?',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Fixer des limites sur la quantité de poissons à pêcher',
          impact: 'neutral',
          consequence: 'Bonne idée! En ne pêchant qu\'une partie des poissons, on s\'assure qu\'il y en aura toujours dans l\'océan. Les pêcheurs peuvent garder leur emploi pour toujours!',
          pros: 'Les familles de poissons restent ensemble et grandissent. Les emplois de pêche durent longtemps.',
          cons: 'Les pêcheurs pourraient gagner moins d\'argent au début.',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'Pêcher autant que possible',
          impact: 'neutral',
          consequence: 'Oh non! Tous les poissons disparaissent. Sans poissons parents, aucun bébé poisson ne naît. Bientôt, l\'océan sera vide.',
          pros: 'Les pêcheurs gagnent beaucoup d\'argent maintenant.',
          cons: 'Tous les poissons disparaissent. Plus d\'emplois de pêche. Plus de dîners de poisson.',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Créer des zones de sécurité "sans pêche"',
          impact: 'neutral',
          consequence: 'Parfait! Ces zones sont comme des nurseries où les bébés poissons grandissent en sécurité. Puis ils nagent pour remplir tout l\'océan!',
          pros: 'Des endroits sûrs pour les bébés poissons. Plus de poissons partout avec le temps.',
          cons: 'Certains pêcheurs ne peuvent pas pêcher dans ces zones.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Danger sur la route des baleines',
      description: 'De gigantesques cargos passent près de la Nouvelle-Écosse chaque jour. Parfois, ils heurtent accidentellement des baleines car ils vont très vite. Les baleines franches de l\'Atlantique sont presque éteintes - il n\'en reste qu\'environ 340! Comment aider?',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Faire ralentir les navires dans les zones de baleines',
          impact: 'neutral',
          consequence: 'Brillant! Quand les navires vont plus lentement, les baleines ont le temps de s\'écarter. C\'est comme une limite de vitesse pour sauver des vies!',
          pros: 'Sauve des vies de baleines. Donne du temps aux baleines pour éviter le danger.',
          cons: 'Les navires mettent plus de temps à livrer. Le transport coûte plus cher.',
          ecosystemImpact: 15,
          economicImpact: -8,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Laisser les navires aller aussi vite qu\'ils veulent',
          impact: 'neutral',
          consequence: 'Terrible! Plus de baleines sont heurtées et meurent. Ces géants incroyables pourraient disparaître pour toujours.',
          pros: 'Les navires livrent rapidement et à bas prix.',
          cons: 'Les baleines deviennent éteintes. Nous perdons ces animaux incroyables.',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Mettre des technologies de détection de baleines sur les navires',
          impact: 'neutral',
          consequence: 'Solution technologique cool! Des ordinateurs spéciaux avertissent les capitaines quand des baleines sont proches. C\'est comme un radar à baleines!',
          pros: 'Les navires savent exactement où nagent les baleines.',
          cons: 'Coûte cher d\'acheter la technologie. Les équipages doivent être formés.',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'L\'énergie éolienne océanique',
      description: 'La Nouvelle-Écosse veut construire d\'énormes éoliennes dans l\'océan pour produire de l\'électricité propre. Ces tours géantes pourraient alimenter des milliers de maisons! Mais leur construction pourrait déranger les baleines et poissons. Quel est le meilleur plan?',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Planifier soigneusement pour éviter les routes migratoires des baleines',
          impact: 'neutral',
          consequence: 'Excellente planification! On obtient de l\'énergie propre ET on protège les routes des baleines. C\'est comme construire autour des quartiers importants pour les animaux.',
          pros: 'Énergie propre qui ne nuit pas aux animaux marins. Le meilleur des deux mondes!',
          cons: 'Prend plus de temps à planifier. Peut coûter plus cher au départ.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Ne pas construire de parcs éoliens océaniques',
          impact: 'neutral',
          consequence: 'Sans énergie propre, on continue à brûler des combustibles sales qui réchauffent l\'océan et nuisent à toute la vie marine.',
          pros: 'Pas de bruit de construction qui dérange les animaux marins.',
          cons: 'L\'océan continue de chauffer. Le changement climatique s\'aggrave.',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Concevoir des éoliennes respectueuses des poissons',
          impact: 'neutral',
          consequence: 'Innovation super cool! Les nouveaux designs silencieux deviennent en fait des récifs artificiels où les poissons aiment vivre!',
          pros: 'Crée de nouveaux habitats pour les poissons. Plus silencieux pour les baleines.',
          cons: 'Coûte plus cher à développer. La nouvelle technologie peut réserver des surprises.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Construire près de la plage',
      description: 'Plus de familles veulent vivre près de la belle côte de la Nouvelle-Écosse. De nouvelles maisons, magasins et hôtels sont construits. Mais la construction peut faire couler de l\'eau sale dans l\'océan. Comment construire de manière responsable?',
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Utiliser des méthodes de construction écologiques',
          impact: 'neutral',
          consequence: 'Choix incroyable! La construction verte garde l\'eau claire et protège les habitats des animaux marins. Les générations futures nous remercieront!',
          pros: 'Eau propre pour tous. Les animaux gardent leurs habitats en sécurité.',
          cons: 'Coûte plus cher. Prend plus de temps pour finir les projets.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Construire où et comme les gens veulent',
          impact: 'neutral',
          consequence: 'Aïe! L\'eau sale coule dans l\'océan, le rendant trouble. Les nurseries de poissons sont détruites. Les bébés poissons n\'ont nulle part où grandir.',
          pros: 'Construction plus rapide et moins chère. Plus d\'emplois dans la construction tout de suite.',
          cons: 'L\'océan devient pollué. Les animaux perdent leurs habitats.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Laisser des espaces naturels entre les bâtiments et l\'eau',
          impact: 'neutral',
          consequence: 'Stratégie brillante! Ces zones tampons vertes agissent comme des éponges géantes, nettoyant l\'eau sale avant qu\'elle n\'atteigne l\'océan.',
          pros: 'Filtre naturel de l\'eau. Les animaux ont des chemins sûrs pour se déplacer.',
          cons: 'Moins d\'espace pour construire. Les maisons peuvent coûter plus cher.',
          ecosystemImpact: 25,
          economicImpact: -8,
          communityImpact: 12
        }
      ]
    }
  ],
  mi: [
    {
      id: 'plastic-pollution',
      title: 'Kaqawej maqamikew!',
      description: 'Oqwa! Kaqawej aqq plastik ma\'t wetapekl wuskitqamu\'k puksit. Mimkitamuj kisi\'kt wipusultip plastik ma\'t na jellyfish aqq kesalultijik mu\'in. Nkmuj na ji\'nm kesimqwatijik?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Maqamitenej kaqawej plastik ma\'tujik',
          impact: 'neutral',
          consequence: 'Wela wetultip! Apoqnmuej plastik, samqwan napeskamultijik wjit teli nktuei. Puktusk, tuwalskisk, aqq nemitisk kesalayik apoqonmuej.',
          pros: 'Samqwan nkamlamulkwayik. Puksitik wjit apoqonmueyik.',
          cons: 'L\'nuk elt klamnultijik teli weluiktalanku ma\'tajik.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Kmutu kesipkwatultinenej plastik',
          impact: 'neutral',
          consequence: 'Mawi! Samqwan kesipawayik plastik ni\'p. Uktukamkw wjit puktayik kaqawej.',
          pros: 'L\'nuk ma ta\'n teltultijik mu\'in kesalkwatultinenej.',
          cons: 'Mimkitamuj aqq nkmuj kisi\'kt kespayik. Puksitik apoqoneykw.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Mawulkultimkenej apoqonmuewey',
          impact: 'neutral',
          consequence: 'Wela! Kisu\'k kaqawej naskwatimk, ap naskwataq samqwan. Aq wjit wintaponej witapikiktuk!',
          pros: 'Nukwaan ankotunemul samqwanuwa. L\'nuk kesteltanej weluey.',
          cons: 'Mutt kesanskomik amsqwan kaqawej. Skitqamu kaqawej teluewey.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Kesalultijik aqq Kiskukewey',
      description: 'Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk aqq kesalultijik wjit puktuk.',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Kesalultijik aqq Kiskukewey',
      description: 'Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk. Kesalultijik wjit puktuk.',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 15,
          economicImpact: -8,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Kesalultijik aqq Kiskukewey',
      description: 'Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk.',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Kesalultijik aqq Kiskukewey',
      description: 'Kesalultijik wjit Nova Scotia aqq kesalultijik wjit puktuk.',
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Kesalultijik wjit puktuk',
          impact: 'neutral',
          consequence: 'Kesalultijik wjit puktuk',
          pros: 'Kesalultijik wjit puktuk',
          cons: 'Kesalultijik wjit puktuk',
          ecosystemImpact: 25,
          economicImpact: -8,
          communityImpact: 12
        }
      ]
    }
  ]
};