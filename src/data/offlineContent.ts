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
  { code: 'mi', name: "Mi'kmaq", nativeName: "Mi'kmaq" },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' }
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
      description: 'Plastic bags and bottles are washing up daily on Nova Scotia\'s beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish and seabirds get tangled up in bottle rings. What should we do to help?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Ban certain single-use plastics, like produce bags and cling wrap',
          impact: 'neutral',
          consequence: 'Less plastic trash ends up in our oceans. ',
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
          consequence: 'Helps protect marine life right away.  ',
          pros: ' Every piece of trash we pick up helps keep animals safe and our beaches beautiful. Brings communities together around a shared goal.',
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
          cons: 'Some fish species vanish. Fishing jobs decline in the long term. ',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Create protected zones with no fishing allowed',
          impact: 'neutral',
          consequence: ' Well-placed protected zones give fish safe places to grow and reproduce.  When fish leave these areas, they replenish other places too. ',
          pros: 'Fish populations stay healthy and grow. ',
          cons: 'Fewer places are left to fish. Overfishing can still continue elsewhere. ',
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
          consequence: '"When ships move more slowly',
          pros: 'Saves whale lives.',
          cons: 'Ships take longer to deliver goods, slowing down our supply chain. Shipping also costs more money, which could mean products we rely on get more expensive. ',
          ecosystemImpact: 0,
          economicImpact: 0,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Move shipping lanes to completely avoid feeding ground and migratory routes',
          impact: 'neutral',
          consequence: 'Fewer whales get hit and die if ships are moved from the areas where they are most common.',
          pros: 'The North Atlantic right whale population will have a better chance of recovering. ',
          cons: 'It could take longer to get the products we need. Whales can still swim into new shipping lanes. ',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Put whale-spotting personnel and technology on ships',
          impact: 'neutral',
          consequence: ' Satellite data  and spotters can alert ship captains when whales are nearby. ',
          pros: 'Ships have the informatoin to avoid hitting whales. ',
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
          consequence: ' We get more clean energy while protecting busy animal highways.',
          pros: 'We can lower our carbon footprint without hurting marine life.',
          cons: 'Takes longer to plan. May be further from shore and more expensive.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Ban the construction of ocean wind farms ',
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
          consequence: ' New quiet designs minimize noise and may become artificial reefs that attract fish and other sea life.',
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
          consequence: 'There is less pollution in the environment. ',
          pros: 'Coastal and marine ecosystems are not as badly impacted. ',
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
          pros: 'Ecosystems can thrive. ',
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
          cons: 'Less space available for building. Ocean views are reduced. ',
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
      title: 'Ejiklekemk Matne’n!',
      description: 'Plastic’l munti’l aqq pu’tayk na ne’yijuwultijik te’sikiskek ta’n No’pa Sko’saewe’l atuomkl. Apaqtukewe’k mikjikjik telte’tmi’titl na plastic’l munti’l na sasap aqq wetnu’kwalsultijik malqotminew. Nme’j aqq apaqtukewe’k-jipji’jk na amjimoqpilsultijik ta’n na pu’taye’l wasoqa’taqnn. Kisi-tal-lukwutitesnu apoqnmatminew?',
      imageUrl: plasticPollutionImg,
      choices: [
        {
          id: 'ban-plastics',
          text: 'Naqa’te’n piltuwamu’k newte’jk-ewe’wasik plasticel, nkutey eltasikl munti’l aqq esqutatesk anquna’tikek',
          impact: 'neutral',
          consequence: 'Naji-tekle’jk plasticey mjikey ika’q ta’n na kinu apaqteminal.',
          pros: 'Naji-tekle’jultijik apaqtukewe’k waisisk ksito’kutitaq wejiaq plastic. Atuomkl naji-waqme’kl asoqma’sik ajiaq.',
          cons: 'Mimajuinu’k jiptuk ma ala’tu’tik msnmnew pikwelkl etekl ta’n mnueke’titl. Kijka’ taqoe’l jiptuk me’ naji-mko’tiktital.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 5
        },
        {
          id: 'ignore-problem',
          text: 'Siawi-we’we’n plastic katu elte’n naji-petlewik il-we’wasikl kisitasikl',
          impact: 'neutral',
          consequence: 'Naji-tekle’jk plastic piskwa’q ta’n na apaqtuk. Katu pikwelkl plasticel na metuwe’kl na il-we’wasiktn aqq jiptuk me’ mjika’tutew ta’n weji-mimajultimk.',
          pros: 'Mimajuinu’k ala’tu’tij msnmew ta’n na newte’ teltekl etekl nkutey nike’',
          cons: 'Apaqtukewe’k mikjikjik aqq nme’jk me’ kesito’kutijik. Atuomkl siawimjika’tasikl.',
          ecosystemImpact: -30,
          economicImpact: 0,
          communityImpact: -10
        },
        {
          id: 'beach-cleanup',
          text: 'Maliapte’n utane’l atuomke’l waqma’tikemkewe’l',
          impact: 'neutral',
          consequence: 'Apoqnmatk klpitmn apaqtukewey mimajuaqn ankmayiw.',
          pros: 'Msit kwesikn ke’sk mjikey na mekenmu’k apoqnmatk kleywan waisisk kelpitujik aqq atuomkeminal wltektn. Pekisitoql utann toqita’qtn kito’qu na naskwa’tasik mesnmk.',
          cons: 'Pasik waqma’toq sa’qewey mejike’k. Piley plastic siawi-juku’waqtitew mu sa’se’wa’tuwk tel-lukwuti’k.',
          ecosystemImpact: 10,
          economicImpact: 0,
          communityImpact: 20
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Kwitame ukjit ta’n elmi’knik',
      description: 'Ekwitamemkewe’l walipotl mesna’tiji pituimtlnaqnn ta’n nme’jk te’sikiskek kijkuk No’pa Sko’sa. Ekwitamemk iknmuaj mimajuinu’k lukwaqn aqq iknmuetoq tajikamu’k mijipjewey. Katu na kinu msnu’k asamelkik nme’jk, ma koqoey wkskwiaqtnuk ukjit elmi’knik. Tal-kisi kwitamtitesnu seskwo’ltimk aqq westawiatmk?',
      imageUrl: fishingPracticesImg,
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Ika’tmkl naji-mtuwe’kl te’sekl ta’n te’sijik nme’jk wen kisi-msnataq',
          impact: 'neutral',
          consequence: 'Naqluj tepiet nme’j paqmk, kinu kejitu’k ta’n te’sultijik kisi-ili’sultitaq.',
          pros: 'Nme’jk te’sultijik siawi-tajiko’ltijik aqq nikwutijik. Ekwitamemkewe’l lukwaqnn pemiaql pikwelipunqwekl.',
          cons: 'Ekwitamtite’wk jiptuk naji-tekle’jk pkwatutaq suliewey tmk',
          ecosystemImpact: 25,
          economicImpact: -5,
          communityImpact: 10
        },
        {
          id: 'unlimited-fishing',
          text: 'Msn pasik nme’jk ta’n maw-pikwelkik',
          impact: 'neutral',
          consequence: 'Jel ta’n maw-pikwelkik nme’jk kisi-asami-kwitamasitaq. Mu tektnuk nemitasikl te’sekl, na jiptuk klapis ksika’titaq.',
          pros: 'Ekwitamtite’wk me’ najelk suliewey eltutaq naji-tekle’jk elukwutijik.',
          cons: 'Kijka’ nme’jk waisisk keskatesultijik. Ekwitamemkewe’l lukwaqnn nisiaql ta’n na pekijiaqewe’l.',
          ecosystemImpact: -35,
          economicImpact: 15,
          communityImpact: -15
        },
        {
          id: 'marine-reserves',
          text: 'Elte’n kelpitasikl etekl ta’n mu ekwitamemk asite’tasiktnuk',
          impact: 'neutral',
          consequence: 'Weli-ika’tasikl kelpitasikl etekl iknmuaj nme’jk kelpitasikl etekl ukjit nikwemk aqq ilitekemk. Ta’n tujiw nme’j maja’sij ula etekl, apaji-pitkmalsultijik ktikl etekl ma’wt.',
          pros: 'Nme’jk te’sultijik siawi-tajiko’ltijik aqq nikwutijik',
          cons: 'Naji-tekle’jkl etekl na ukjit ekwitamemk. Asami-kwitamemk me’ kisi-siawtaqa’tasiktitew tami-se’k.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Putupey Espawti Anko’tmk',
      description: 'Meski’kl puktewu’lkl ta’n kelnekl welamu’kl aqq mimajuinu’k asoqmtaqtek apaqt jijuaqa me’ta’tiji Oqwatnukewe’k Atlantice’k inaqne’k putupk. Elt naji-tekle’jijik jel mu 400 weskwiejik ula wksitqamuk, ula nme’jk na ta’n lukwaqna’lujik na ketmaqsenujik. Tal-kisi apoqnmua’titisnen?',
      imageUrl: shippingTrafficImg,
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Pawiaql puktewu’lkl metoqiaql ta’n etekl ta’n putupk na pikwelkik',
          impact: 'neutral',
          consequence: 'Ta’n tujiw puktewu’lkl naji-pawita’q, na jiptuk ma ne’pa’tikl putupl me’ta’tij newte’jlitl. Nkutey na tel-pmiemk ukjit ta’n apaqtuk.',
          pros: 'Wksitawiate’n Putupue’l mimajuaqnn',
          cons: 'Puktewu’lk naji-pkwittoq ukjit pkisitun welamu’kl, pawa’toq ninen iknmuemkewey nastaqtek. Elkitmk ma’wt awtik me’ suliewey, ta’n na kisi-tluektitew etekl ta’n elita’suwatmekl na me’ naji-mko’tultikl.',
          ecosystemImpact: 15,
          economicImpact: -8,
          communityImpact: 0
        },
        {
          id: 'ignore-whales',
          text: 'Aja’tmkl alkitekemkl tepkistekl ukjit msit smuktmn esmuwemkewey maqmikew aqq wikultijik awti’l',
          impact: 'neutral',
          consequence: 'Naji-tekle’jultijik putupk me’teskujik aqq nepu’tijik ta’n tujiw puktewu’lkl na aja’tasikl ta’n etekl ta’n na mawi pikwel tlitpiaq.',
          pros: 'Ta’n Oqwatnukewey Atlanticey inaqney putup te’sultijik na ala’tutaq naji-petlewik msnmnew na ila’sultinew.',
          cons: 'Kisi-naji pkwija’tikektitew ukjit msnmn etekl nuta’ykl. Putupk me’ kisi-kismultitaq ta’n na pile’l ajo’tasultimkewe’l tepkistekewe’l.',
          ecosystemImpact: 10,
          economicImpact: -5,
          communityImpact: 0
        },
        {
          id: 'detection-systems',
          text: 'Ika’l putupk nemia’tiji mimajuinu’k aqq espitasik ta’n puktewu’lkl',
          impact: 'neutral',
          consequence: 'Satellite-ey piskwitaqta’sik aqq nemitaqetijik kisi tlimataq puktewu’lk alayjitu’tij ta’n tujiw putupk kikjuk eymu’tijik.',
          pros: 'Puktewu’lkl ala’tu’tij ta’n ewikasik ukjit smuktmn wnaqteskujik putupk.',
          cons: 'Eltoql ankuawtikl ukjit alkitekekewe’l tel-lukwutikl, ta’n jiotuk siawkitasiktitew ta’n poqitelemi’tij.',
          ecosystemImpact: 25,
          economicImpact: -15,
          communityImpact: 5
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Apaqtukewey Pju’sney Mlkikno’ti',
      description: 'No’pa Sko’sa ketu’ eltoq meski’k pju’sne’l turbine-el ta’n na apaqtuk. Ula na kisi-mlkiknewa’tutal kiknal elt waqme’k wetatenemamk, nisa’toq carboney telteskmk. Katu eltmk aqq maliaptmk nekemowe’l jiptuk kisa’tutew kesikawta’q ta’n lukwaqna’lata putupk, nme’jk, aqq apaqtukewe’k-jipji’jk. Koqoey maw-klu’k kisitasiktitew?',
      imageUrl: renewableEnergyImg,
      choices: [
        {
          id: 'careful-planning',
          text: 'Elte’n kla’qej ukjit smuktmn youtube’l aqq jipji’je’l wikultimkewe’l awti’l',
          impact: 'neutral',
          consequence: 'Mesnmekl me’ waqme’kl wejiknaql ke’sk kelpitasikl pikwelitpiaql waisisue’l espawti’l.',
          pros: 'Kisi-nisa’tutisnen ninen carboney elteskmkewey keskmna’q kesito’j apaqtukewey mimajuaqn.',
          cons: 'Naji-pkwija’tikek eltun. Jiotuk naji-knekk wejiaq qasqe’k aqq me’ najawtik.',
          ecosystemImpact: 15,
          economicImpact: 5,
          communityImpact: 20
        },
        {
          id: 'no-renewables',
          text: 'Naqa’te’n eltasikl ju’sine’l lakla’nsl',
          impact: 'neutral',
          consequence: 'Ke’sk kijka’ waisisk na keleyujik kelpitujik wejiaq kesikawta’q mejika’tikek, ala’tu’k naji-tekle’jk waqme’k teliknaq.',
          pros: 'Mu ankuwa’tasiktnuk lukwaqna’lujik ta’n putupk, nme’jk aqq apaqtukewe’k-jipji’jk wejiaq kesikawta’q mejika’tikek',
          cons: 'Miamujpa etuk siawi-nu’kwa’tutesnu waqntewe’l pitkmatmkl, ta’n we’tuwo’tk elt me’ apaqtukewe’k waisisk.',
          ecosystemImpact: -10,
          economicImpact: -5,
          communityImpact: -15
        },
        {
          id: 'adaptive-technology',
          text: 'Liatsk mu kesikawtoqsik pju’sne’k turbineaq',
          impact: 'neutral',
          consequence: 'Piley meteta’qtnuk eltoq nisa’tun kesikawta’q aqq jiptuk pquji-kesnoqowe’ktital reefel ta’n pejeywaji nme’jk aqq pilewey samqwaney mimajuaqn.',
          pros: 'Nisa’toq kesikawta’q mejika’tikek aqq ta’n wetuwa’tikekl ta’n samqwaney mimajuaqn.',
          cons: 'Me’ najawtik ukjit eltun, piley espitasik jiptuk ma kaqisk lukwenuk ta’n teli-ajipjutasik.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Eltmk ta’n Atuomkiktuke’l',
      description: 'Me’ mimajuinu’k na eluksultijik No’pa Sko’saewey welamu’k qasqe’ke’l. Pilikann, wenji’kuo’mji’jl, aqq hotel na eltasikl. Katu eltasik kisi-sioqte’tal qasqe’kewe’l wikultimkl aqq kisa’tutew mejike’k aqq nisukwiaq. Tal-kisi eltutisnen mnaqaj?',
      imageUrl: coastalDevelopmentImg,
      choices: [
        {
          id: 'green-development',
          text: 'We’we’n eltmk teltekl ta’n naji-tekle’jk kisa’toq lukwaqna’tasik ukjit wikultimkl aqq samqwan telamu’k.',
          impact: 'neutral',
          consequence: 'Etek naji-tekle’jk mejika’tikek ta’n na weji-mimajultimk.',
          pros: 'Qasqe’k aqq samqwane’l ecoe’l-kisitasikl na mu asa teli ewli we’tuwe’ktnukl.',
          cons: 'Me’ najawtik ukjit eltun. Naji-pkwija’tikek ukjit kaqi-kisa’tasiktn kisitasikl.',
          ecosystemImpact: 20,
          economicImpact: -5,
          communityImpact: 15
        },
        {
          id: 'unrestricted-development',
          text: 'Naqa’te’n msit eltasik ta’n qasqe’kewe’l maqmikal',
          impact: 'neutral',
          consequence: 'Qaske’kewe’l wikultimkl aqq msit piskwita’mk ta’n qasqe’ke’l na kelpitasik.',
          pros: 'Eco-kisitasikl kisi-nikwutital',
          cons: 'Nisa’toq ta’n etek mesnmk ukjit mimajuinu’k ukjit mimajultinew aqq ketmoqja’laji eltunew naji-knekk piskwa’q-maqmikewiktuk.',
          ecosystemImpact: 30,
          economicImpact: -10,
          communityImpact: -10
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Elte’n me’ knekk ta’n qasqe’k. Nqate’n maqmikewe’l etekl mekwaye’k wenji’kuo’ml aqq samqwan',
          impact: 'neutral',
          consequence: 'Ula qasqe’kewe’l waqme’kewe’l etekl elukwekl nkutey waqma’tikekewe’l, waqma’toq mejikapuwa’q keskmna’q mu ika’qtnuk apaqtuk.',
          pros: 'Samqwan telamu’k na maliaptasik aqq wenji’kuo’ml na naji-wl-klpitasikl ta’n tujiw metu’na’q.',
          cons: 'Naji-tekle’jk etek ukjit eltmk Apaqtukewe’l-wetapimkewe’l na nisa’tasikl',
          ecosystemImpact: 25,
          economicImpact: -8,
          communityImpact: 12
        }
      ]
    }
  ]
};