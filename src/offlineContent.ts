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
      title: '1. Trash Attack!',
      description: 'Plastic bags and bottles are washing up daily on Nova Scotia\'s beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish and seabirds get tangled up in bottle rings. What should we do to help?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Ban certain single-use plastics, like produce bags and cling wrap',
          impact: 'neutral',
          consequence: 'Less plastic trash ends up in our oceans.',
          pros: 'Fewer marine animals will be hurt by plastic. Beaches become cleaner over time.',
          cons: 'People may not have access to products they want. Some things may get more expensive.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Keep using plastic but create better recycling programs',
          impact: 'neutral',
          consequence: 'Less plastic gets into the ocean. But many plastics are hard to recycle and may still pollute the environment.',
          pros: 'People have access to the same products they do now.',
          cons: 'Sea turtles and fish keep getting hurt. Beaches remain littered.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Organize community beach clean ups',
          impact: 'neutral',
          consequence: 'Helps protect marine life right away.',
          pros: 'Every piece of trash we pick up helps keep animals safe and our beaches beautiful. Brings communities together around a shared goal.',
          cons: 'Only cleans up old trash. New plastic keeps coming unless we change our habits.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Fish for the Future',
      description: 'Fishing boats catch many tons of fish every day near Nova Scotia. Fishing gives people jobs and provides nutritious food. But if we catch too many fish, nothing will be left for the future. How can we fish smartly and sustainably?',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Set stricter limits on how many fish we can catch',
          impact: 'neutral',
          consequence: 'By leaving enough fish behind, we make sure the population can continue to regenerate. ',
          pros: 'Fish populations stay healthy and grow. Fishing jobs last for many years.',
          cons: 'Fishers may earn less money at first',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'Catch only species that are most abundant',
          impact: 'neutral',
          consequence: ' Even the most abundant species can be overfished. Without clear limits, they may eventually dissapear. ',
          pros: 'Fishers make more money in the short term.',
          cons: 'Some fish species vanish. Fishing jobs decline in the long term.',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Create protected zones with no fishing allowed',
          impact: 'neutral',
          consequence: ' Well-placed protected zones give fish safe places to grow and reproduce.  When fish leave these areas, they replenish other places too. ',
          pros: 'Fish populations stay healthy and grow.',
          cons: 'Fewer places are left to fish. Overfishing can still continue elsewhere.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Whale Highway Danger',
      description: 'Large ships that carry goods and people across the ocean sometimes hit North Atlantic right whales. With fewer than than 400 left in the world, this species is at risk of extinction. How should we help?',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Slow ships down in areas where whales are abundant.',
          impact: 'neutral',
          consequence: 'When ships move more slowly, they are less likely to kill a whale if they hit one. It\'s like a speed limit for the ocean.',
          pros: 'Saves whale lives.',
          cons: 'Ships take longer to deliver goods, slowing down our supply chain. Shipping also costs more money, which could mean products we rely on get more expensive. ',
          ecosystemImpact: 15,
          economicImpact: -8,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Move shipping lanes to completely avoid feeding ground and migratory routes',
          impact: 'neutral',
          consequence: 'Fewer whales get hit and die if ships are moved from the areas where they are most common.',
          pros: 'The North Atlantic right whale population will have a better chance of recovering.',
          cons: 'It could take longer to get the products we need. Whales can still swim into new shipping lanes.',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Put whale-spotting personnel and technology on ships',
          impact: 'neutral',
          consequence: 'Satellite data  and spotters can alert ship captains when whales are nearby.',
          pros: 'Ships have the informatoin to avoid hitting whales.',
          cons: 'Creates additional costs for shipping companies, which may get passed on to customers.',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Ocean Wind Power',
      description: 'Nova Scotia wants to build large wind turbines in the ocean. These could power our homes with clean electricity, reducing our carbon footprint. But building and operating them might cause noise that disturbs whales, fish, and seabirds. What\'s the best plan?',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan carefully to avoid whale and bird migration routes',
          impact: 'neutral',
          consequence: 'We get more clean energy while protecting busy animal highways.',
          pros: 'We can lower our carbon footprint without hurting marine life.',
          cons: 'Takes longer to plan. May be further from shore and more expensive.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Ban the construction of ocean wind farms',
          impact: 'neutral',
          consequence: 'While some animals are kept safe from noise pollution, we have less clean energy. ',
          pros: 'No added stress to whales, fish and seabirds from noise pollution',
          cons: 'We may have to keep burning fossil fuels, which impacts even more marine species. ',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Design quieter wind turbines',
          impact: 'neutral',
          consequence: 'New quiet designs minimize noise and may become artificial reefs that attract fish and other sea life.',
          pros: 'Reduces noise pollution and its impacts on marine life.',
          cons: 'More expensive to develop. New technology might not always work as expected.',
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
          text: 'Use building methods that minimize the harm to habitats and water quality.',
          impact: 'neutral',
          consequence: 'There is less pollution in the environment.',
          pros: 'Coastal and marine ecosystems are not as badly impacted.',
          cons: 'More expensive to build. Takes longer to finish projects.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Prevent all development on coastal lands',
          impact: 'neutral',
          consequence: 'Coastal habitats and public access to the shoreline are protected',
          pros: 'Ecosystems can thrive.',
          cons: 'Reduces the area available for people to live and forces them to build further inland.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Build further from shore. Leave natural spaces between buildings and water',
          impact: 'neutral',
          consequence: ' These coastal buffers zones work like filters, cleaning dirty water before it reaches the ocean.',
          pros: 'Water quality is maintained and houses are safer from storms.',
          cons: 'Less space available for building. Ocean views are reduced.',
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
      title: 'Les déchets à l’attaque !',
      description: 'Des sacs et des bouteilles en plastique s’échouent quotidiennement sur les plages de la Nouvelle-Écosse. Les tortues de mer prennent ces sacs plastiques pour des méduses, et essaient de les manger. Les poissons et les oiseaux marins se font prendre dans des anneaux de bouteille. Que devrions-nous faire pour aider ?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Interdire certains plastiques à usage unique, comme les sacs en plastique pour les fruits et légumes ainsi que le film alimentaire.',
          impact: 'neutral',
          consequence: 'Moins de déchets plastiques finissent dans nos océans.',
          pros: 'Moins d’animaux marins seront blessés par du plastique. Les plages deviendront plus propres avec le temps.',
          cons: 'Il se peut que les gens n’aient pas accès aux produits qu’ils veulent. Le prix de certaines choses peut augmenter.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser du plastique mais créer de meilleurs programmes de recyclage.',
          impact: 'neutral',
          consequence: 'Moins de plastique se retrouve dans l’océan. Mais de nombreux plastiques sont difficiles à recycler, et il se peut qu’ils continuent à polluer l’environnement.',
          pros: 'Les gens ont accès aux mêmes produits que ceux auxquels ils ont accès présentement.',
          cons: 'Les tortues de mer et les poissons continuent de se faire blesser. Les plages restent jonchées de déchets.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des opérations communautaires de nettoyage des plages.',
          impact: 'neutral',
          consequence: 'Cela aide tout de suite à protéger la faune et la flore marines.',
          pros: 'Chaque déchet que nous ramassons aide à garder les animaux en sécurité et à faire en sorte que nos plages restent magnifiques. Cela réunit les communautés autour d’un objectif commun.',
          cons: 'Cela ne permet que de ramasser les vieux déchets. De nouveaux déchets plastiques continuent d’arriver à moins que nous ne changions nos habitudes.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Pêcher avec l’avenir en tête',
      description: 'Les bateaux de pêche capturent chaque jour de nombreuses tonnes de poissons près de la Nouvelle-Écosse. La pêche fournit aux gens des emplois et des aliments nutritifs. Mais si nous attrapons trop de poissons, il ne restera rien pour l’avenir. Comment pouvons-nous pêcher de manière intelligente et durable ?',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Fixer des limites plus strictes quant à la quantité de poissons que nous pouvons pêcher.',
          impact: 'neutral',
          consequence: 'En laissant suffisamment de poissons dans les océans, nous faisons en sorte que leurs populations puissent continuer à se régénérer.',
          pros: 'Les populations de poissons demeurent en santé et se développent. Les emplois de la pêche sont maintenus pendant de nombreuses années.',
          cons: 'Il se peut que les pêcheur.euse.s gagnent moins d’argent dans un premier temps.',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'N’attraper que les espèces les plus abondantes',
          impact: 'neutral',
          consequence: 'Même les espèces les plus abondantes peuvent être surexploitées. Sans des limites claires, ces espèces pourraient finir par disparaître.',
          pros: 'Les pêcheur.euse.s font plus d’argent à court terme.',
          cons: 'Certaines espèces de poissons disparaissent. Les emplois du domaine de la pêche se rarifient sur le long terme.',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Créer des zones protégées où la pêche est interdite.',
          impact: 'neutral',
          consequence: 'Des zones protégées bien placées offrent aux poissons des endroits sécuritaires où grandir et se reproduire. Quand les poissons quittent ces zones, ils contribuent aussi à « réapprovisionner » d’autres endroits.',
          pros: 'Les populations de poissons demeurent en santé et grandissent.',
          cons: 'Il reste moins d’endroits où pêcher. La surpêche peut quand même se poursuivre ailleurs.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Danger sur les « autoroutes » des baleines',
      description: 'Les grands navires qui transportent des marchandises et des personnes sur l’océan entrent parfois en collision avec des baleines noires de l’Atlantique Nord. Avec moins de 400 spécimens restants dans le monde entier, cette espèce est menacée d’extinction. Que devrions-nous faire pour aider ?',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Ralentir les navires dans les zones où les baleines sont présentes en grand nombre.',
          impact: 'neutral',
          consequence: 'Quand les navires se déplacent plus lentement, il y a moins de risque qu’ils ne tuent une baleine s’ils entrent en collision avec l’une d’elles. C’est comme une limite de vitesse pour l’océan.',
          pros: 'Cela sauve des baleines.',
          cons: 'Cela prend plus de temps aux navires pour livrer les marchandises, ce qui ralentit notre chaîne d’approvisionnement. Le transport de marchandises coûte également plus cher, ce qui pourrait signifier que le prix des produits dont nous avons besoin augmente.',
          ecosystemImpact: 15,
          economicImpact: -8,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Déplacer les voies maritimes pour complètement éviter les aires d’alimentation et les voies migratoires.',
          impact: 'neutral',
          consequence: 'Moins de baleines se font frapper et meurent si les navires sont déplacés des zones où l’on en dénombre le plus.',
          pros: 'La population de baleines noires de l’Atlantique Nord aura plus de chance de récupérer.',
          cons: 'Cela pourrait prendre plus de temps pour obtenir les produits dont nous avons besoin. Les baleines peuvent encore se déplacer vers de nouvelles voies de navigation.',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Prévoir sur les navires du personnel et de la technologie pour observer les baleines.',
          impact: 'neutral',
          consequence: 'Les données satellitaires et les observateur.trice.s peuvent alerter les capitaines des navires quand des baleines se trouvent à proximité.',
          pros: 'Les navires disposent des informations nécessaires pour éviter de frapper des baleines.',
          cons: 'Cela engendre des frais supplémentaires pour les sociétés de transport maritime, des frais qui pourraient être répercutés sur les client.e.s.',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Énergie éolienne marine',
      description: 'La Nouvelle-Écosse veut construire de grandes éoliennes dans l’océan. Celles-ci pourraient alimenter nos maisons en énergie avec de l’électricité propre, réduisant ainsi notre empreinte carbone. Mais leur construction et leur exploitation pourraient engendrer du bruit susceptible de déranger les baleines, les poissons, et les oiseaux marins. Quel est le meilleur plan ?',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Planifier soigneusement d’éviter les voies migratoires des baleines et des oiseaux.',
          impact: 'neutral',
          consequence: 'Nous obtenons plus d’énergie propre tout en protégeant les « autoroutes » très fréquentées des animaux.',
          pros: 'Nous pouvons réduire notre empreinte carbone sans porter atteinte à la faune et à la flore marines.',
          cons: 'Cela prend plus de temps à planifier. Cette solution pourrait impliquer de s’éloigner des côtes, et coûter plus cher.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Interdire la construction de parcs éoliens au large',
          impact: 'neutral',
          consequence: 'Si certains animaux sont épargnés par la pollution sonore, en revanche, nous avons moins d’énergie propre.',
          pros: 'Pas de stress supplémentaire résultant de la pollution sonore pour les baleines, les poissons et les oiseaux marins.',
          cons: 'Il se peut que nous ayons à continuer de brûler des combustibles fossiles, ce qui aurait un impact encore plus important sur les espèces marines.',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Concevoir des éoliennes moins bruyantes',
          impact: 'neutral',
          consequence: 'De nouvelles conceptions de modèles silencieux minimisent le bruit, et pourraient devenir des récifs artificiels qui attireraient les poissons et autres espèces marines.',
          pros: 'Cela réduit la pollution sonore et ses effets sur le milieu biologique marin.',
          cons: 'Option plus dispendieuse à développer. La nouvelle technologie pourrait ne pas toujours fonctionner tel que prévu.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Construire près de la plage',
      description: 'De plus en plus de gens décident de s’installer le long du merveilleux littoral de la Nouvelle-Écosse. On y construit de nouvelles maisons, des chalets ainsi que des hôtels. Mais le développement immobilier peut endommager les habitats naturels côtiers, et causer de la pollution et de l’érosion. Comment devrions-nous nous y prendre pour construire de manière responsable ?',
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'Avoir recours à des méthodes permettant de minimiser les dommages causés aux habitats naturels et à la qualité de l’eau.',
          impact: 'neutral',
          consequence: 'L’environnement est moins pollué.',
          pros: 'Les écosystèmes côtiers et marins ne sont pas aussi durement touchés.',
          cons: 'Option plus dispendieuse pour construire. Cela prend plus de temps pour terminer des projets.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Empêcher tout développement sur les terrains côtiers',
          impact: 'neutral',
          consequence: 'Les habitats naturels côtiers et l’accès public au littoral sont protégés.',
          pros: 'Les écosystèmes peuvent s’épanouir.',
          cons: 'Cela réduit les zones où les gens peuvent vivre, et les force à construire plus à l’intérieur des terres.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Construire plus loin des côtes. Laisser davantage d’espaces naturels entre les constructions et l’eau',
          impact: 'neutral',
          consequence: 'Ces zones tampons côtières fonctionnent comme des filtres nettoyant l’eau sale avant qu’elle n’atteigne l’océan.',
          pros: 'La qualité de l’eau est maintenue, et les maisons sont davantage à l’abri des tempêtes.',
          cons: 'Moins d’espace disponible pour construire. Il y a moins de constructions avec vue sur l’océan.',
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