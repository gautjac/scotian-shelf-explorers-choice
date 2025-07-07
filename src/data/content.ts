
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
      title: 'Trash Attack!',
      description: 'Oh no! Plastic bags and bottles are washing up on Nova Scotia beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish get tangled up in bottle rings. What should we do to help?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
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
          pros: 'People don\'t have to change their shopping habits.',
          cons: 'Sea turtles and fish keep getting hurt. Beaches become gross and dirty.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organize awesome beach cleanup parties',
          impact: 'positive',
          consequence: 'Great idea! Every piece of trash we pick up saves a sea animal. Plus, it\'s fun to do with friends!',
          pros: 'Helps animals right away. People learn why clean beaches matter.',
          cons: 'Only cleans up old trash. New trash keeps coming unless we change our habits.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Fish for the Future',
      description: 'Fishing boats catch tons of fish every day near Nova Scotia. Fishing gives people jobs and yummy food. But if we catch too many fish, baby fish won\'t have parents. How should we fish smartly?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
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
          cons: 'Some fishers can\'t fish in those special spots.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Whale Highway Danger',
      description: 'Giant cargo ships sail past Nova Scotia every day. Sometimes they accidentally hit whales because they\'re going super fast. Right whales are almost extinct - there are only about 340 left! How can we help?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Make ships slow down in whale areas',
          impact: 'positive',
          consequence: 'Brilliant! When ships go slower, whales have time to swim out of the way. It\'s like a speed limit to save lives!',
          pros: 'Saves whale lives. Gives whales time to escape danger.',
          cons: 'Ships take longer to deliver stuff. Shipping costs more money.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Let ships go as fast as they want',
          impact: 'negative',
          consequence: 'Terrible news! More whales get hit and die. These amazing giants might disappear forever.',
          pros: 'Ships deliver things quickly and cheaply.',
          cons: 'Whales become extinct. We lose these incredible ocean animals.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Put whale-spotting technology on ships',
          impact: 'positive',
          consequence: 'Cool tech solution! Special computers warn ship captains when whales are nearby. It\'s like whale radar!',
          pros: 'Ships know exactly where whales are swimming.',
          cons: 'Costs money to buy the technology. Ship crews need training.',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'The Sour Ocean Problem',
      description: 'The ocean is becoming more acidic (sour) because it\'s absorbing pollution from the air. This makes it super hard for lobsters and crabs to build strong shells. It\'s like trying to build with weak blocks!',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Cut down on air pollution from cars and factories',
          impact: 'positive',
          consequence: 'Fantastic! Less pollution in the air means the ocean stays healthy. Lobsters can build super strong shells again!',
          pros: 'Helps the whole ocean ecosystem. Good for all sea creatures.',
          cons: 'People need to change how they travel and make things.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Keep polluting the air like before',
          impact: 'negative',
          consequence: 'Bad news! The ocean gets more and more sour. Lobsters\' shells become weak and crumbly. They can\'t protect themselves.',
          pros: 'No one has to change their lifestyle.',
          cons: 'Shell animals get sick and die. Lobster fishing becomes impossible.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Add special chemicals to neutralize the acid',
          impact: 'neutral',
          consequence: 'Interesting idea! This might work in small areas, but we need to test it more. It\'s like adding baking soda to sour water.',
          pros: 'Could help protect important areas. Shows we\'re trying new solutions.',
          cons: 'We don\'t know if it really works. Very expensive. Only helps tiny areas.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Ocean Wind Power',
      description: 'Nova Scotia wants to build huge wind turbines in the ocean to make clean electricity. These giant spinning towers could power thousands of homes! But building them might disturb whales and fish. What\'s the best plan?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Plan carefully to avoid whale migration routes',
          impact: 'positive',
          consequence: 'Excellent planning! We get clean energy AND protect whale highways. It\'s like building around important animal neighborhoods.',
          pros: 'Clean energy that doesn\'t hurt sea animals. Best of both worlds!',
          cons: 'Takes longer to plan. Might cost more money upfront.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Don\'t build any ocean wind farms',
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
      description: 'More families want to live near Nova Scotia\'s beautiful coastline. New houses, stores, and hotels are being built. But construction can make dirty water run into the ocean. How should we build responsibly?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
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
          consequence: 'Brilliant strategy! These green buffers work like giant sponges, cleaning dirty water before it reaches the ocean.',
          pros: 'Natural water filter system. Animals have safe paths to move around.',
          cons: 'Less space available for building. Houses might cost more.'
        }
      ],
      isEnding: true
      },
      {
        id: 'invasive-species',
        title: 'Underwater Invaders',
        description: 'Strange new sea creatures are moving into Nova Scotia waters! Green crabs from Europe and other invasive species are eating local fish food and taking over their homes. It\'s like bullies moving into your neighborhood! How can we protect our local sea friends?',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
        choices: [
          {
            id: 'removal-programs',
            text: 'Set up special traps to catch the invaders',
            impact: 'positive',
            consequence: 'Great idea! By catching these underwater bullies, local fish can get their homes back. It\'s like a superhero rescue mission!',
            pros: 'Local sea animals get their space back. Fishing gets better for everyone.',
            cons: 'Costs money to set up traps. Takes lots of work to catch them all.',
            nextScenarioId: 'climate-change'
          },
          {
            id: 'ignore-invaders',
            text: 'Let the new species stay and see what happens',
            impact: 'negative',
            consequence: 'Uh oh! The invaders multiply like crazy and take over completely. Local fish lose their homes and food forever.',
            pros: 'No extra work or money needed right now.',
            cons: 'Local sea life disappears. Ocean ecosystem gets totally mixed up.',
            nextScenarioId: 'climate-change'
          },
          {
            id: 'education-prevention',
            text: 'Teach people how to stop new invaders from arriving',
            impact: 'positive',
            consequence: 'Smart prevention! When people clean their boats and don\'t dump aquarium fish, fewer invaders arrive. It\'s like border security for the ocean!',
            pros: 'Stops the problem before it starts. People learn to be ocean protectors.',
            cons: 'Takes time for everyone to learn. Some invaders are already here.',
            nextScenarioId: 'climate-change'
          }
        ]
      },
      {
        id: 'climate-change',
        title: 'The Warming Waters',
        description: 'Ocean temperatures are rising because of climate change. Fish are swimming to colder waters up north, and coral reefs are getting stressed. It\'s like the ocean has a fever! What can help cool things down?',
        imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
        choices: [
          {
            id: 'renewable-energy',
            text: 'Switch to wind and solar power',
            impact: 'positive',
            consequence: 'Awesome! Clean energy produces way less pollution. It\'s like giving the ocean medicine to bring down its fever.',
            pros: 'Stops heating up the ocean. Creates new green jobs.',
            cons: 'Expensive to build at first. Weather affects how much power we get.'
          },
          {
            id: 'ignore-climate',
            text: 'Keep using coal and oil for energy',
            impact: 'negative',
            consequence: 'Oh no! The ocean gets even hotter. Fish have to swim far away to find cool water. Some might not survive the journey.',
            pros: 'Don\'t have to change our energy systems.',
            cons: 'Ocean fever gets worse. Fish communities break apart.'
          },
          {
            id: 'carbon-capture',
            text: 'Protect kelp forests and salt marshes',
            impact: 'positive',
            consequence: 'Smart nature solution! These underwater plants are like giant vacuum cleaners that suck carbon out of the air.',
            pros: 'Nature does the work for us. Protects important sea habitats too.',
            cons: 'Takes a long time to work. Needs huge areas to make a big difference.'
          }
        ],
        isEnding: true
      }
  ],
  fr: [
    {
      id: 'plastic-pollution',
      title: 'Attaque de déchets!',
      description: 'Oh non! Des sacs et bouteilles en plastique arrivent sur les plages de Nouvelle-Écosse. Les tortues de mer pensent que les sacs plastiques sont des méduses et essaient de les manger. Que devons-nous faire pour aider?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Interdire les plastiques jetables comme les sacs',
          impact: 'positive',
          consequence: 'Super choix! Avec moins de déchets plastiques, les animaux marins sont plus en sécurité. Les baleines et dauphins peuvent nager sans se blesser.',
          pros: 'Les animaux marins arrêtent de se blesser. Les plages deviennent plus propres.',
          cons: 'Les gens doivent se rappeler d\'apporter leurs propres sacs.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Continuer à utiliser le plastique comme avant',
          impact: 'negative',
          consequence: 'Oh là là! Plus d\'animaux marins tombent malades en mangeant du plastique. L\'océan devient comme une poubelle géante.',
          pros: 'Les gens n\'ont pas à changer leurs habitudes.',
          cons: 'Les tortues et poissons continuent à se blesser.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Organiser des fêtes de nettoyage de plage',
          impact: 'positive',
          consequence: 'Excellente idée! Chaque déchet qu\'on ramasse sauve un animal marin. En plus, c\'est amusant avec des amis!',
          pros: 'Aide les animaux immédiatement. Les gens apprennent pourquoi c\'est important.',
          cons: 'Ne nettoie que les vieux déchets. De nouveaux déchets continuent d\'arriver.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Pêche pour l\'avenir',
      description: 'Les bateaux de pêche attrapent des tonnes de poissons chaque jour près de la Nouvelle-Écosse. Mais si on attrape trop de poissons, les bébés poissons n\'auront plus de parents. Comment pêcher intelligemment?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Fixer des limites sur combien de poissons on peut attraper',
          impact: 'positive',
          consequence: 'Brillante idée! En attrapant seulement quelques poissons, on s\'assure qu\'il y en a toujours dans l\'océan!',
          pros: 'Les familles de poissons restent ensemble. Les emplois de pêche durent longtemps.',
          cons: 'Les pêcheurs gagnent peut-être moins d\'argent au début.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Attraper autant de poissons que possible',
          impact: 'negative',
          consequence: 'Oh non! Tous les poissons disparaissent. Sans poissons parents, aucun bébé poisson ne naît.',
          pros: 'Les pêcheurs gagnent beaucoup d\'argent maintenant.',
          cons: 'Tous les poissons disparaissent. Plus d\'emplois de pêche.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'marine-reserves',
          text: 'Créer des zones spéciales "sans pêche"',
          impact: 'positive',
          consequence: 'Parfait! Ces zones sûres sont comme des pouponnières où les bébés poissons grandissent en sécurité!',
          pros: 'Endroits sûrs pour les bébés poissons. Plus de poissons partout.',
          cons: 'Certains pêcheurs ne peuvent pas pêcher dans ces endroits spéciaux.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Danger sur l\'autoroute des baleines',
      description: 'D\'énormes navires cargo passent près de la Nouvelle-Écosse chaque jour. Parfois ils frappent accidentellement des baleines parce qu\'ils vont super vite. Il ne reste que 340 baleines noires! Comment aider?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Faire ralentir les navires dans les zones de baleines',
          impact: 'positive',
          consequence: 'Brillant! Quand les navires vont plus lentement, les baleines ont le temps de nager ailleurs. C\'est comme une limite de vitesse pour sauver des vies!',
          pros: 'Sauve la vie des baleines. Donne aux baleines le temps d\'échapper au danger.',
          cons: 'Les navires prennent plus de temps pour livrer. Coûte plus cher.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Laisser les navires aller aussi vite qu\'ils veulent',
          impact: 'negative',
          consequence: 'Terrible nouvelle! Plus de baleines sont frappées et meurent. Ces géants incroyables pourraient disparaître pour toujours.',
          pros: 'Les navires livrent rapidement et pas cher.',
          cons: 'Les baleines deviennent éteintes. On perd ces animaux océaniques incroyables.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Mettre de la technologie de détection de baleines sur les navires',
          impact: 'positive',
          consequence: 'Solution technologique cool! Des ordinateurs spéciaux avertissent les capitaines quand les baleines sont proches. C\'est comme un radar à baleines!',
          pros: 'Les navires savent exactement où nagent les baleines.',
          cons: 'Coûte de l\'argent pour acheter la technologie.',
          nextScenarioId: 'ocean-acidification'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Le problème de l\'océan aigre',
      description: 'L\'océan devient plus acide (aigre) parce qu\'il absorbe la pollution de l\'air. Cela rend super difficile pour les homards et crabes de construire des coquilles solides. C\'est comme essayer de construire avec des blocs faibles!',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Réduire la pollution de l\'air des voitures et usines',
          impact: 'positive',
          consequence: 'Fantastique! Moins de pollution dans l\'air signifie que l\'océan reste en santé. Les homards peuvent construire des coquilles super solides encore!',
          pros: 'Aide tout l\'écosystème océanique. Bon pour toutes les créatures marines.',
          cons: 'Les gens doivent changer comment ils voyagent et fabriquent les choses.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Continuer à polluer l\'air comme avant',
          impact: 'negative',
          consequence: 'Mauvaises nouvelles! L\'océan devient de plus en plus aigre. Les coquilles des homards deviennent faibles et s\'effritent.',
          pros: 'Personne n\'a à changer son style de vie.',
          cons: 'Les animaux à coquilles tombent malades. La pêche au homard devient impossible.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Ajouter des produits chimiques spéciaux pour neutraliser l\'acide',
          impact: 'neutral',
          consequence: 'Idée intéressante! Cela pourrait marcher dans de petites zones, mais on doit le tester plus. C\'est comme ajouter du bicarbonate à l\'eau aigre.',
          pros: 'Pourrait aider à protéger des zones importantes.',
          cons: 'On ne sait pas si ça marche vraiment. Très cher.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Énergie éolienne océanique',
      description: 'La Nouvelle-Écosse veut construire d\'énormes éoliennes dans l\'océan pour faire de l\'électricité propre. Ces tours géantes qui tournent pourraient alimenter des milliers de maisons! Mais les construire pourrait déranger les baleines. Quel est le meilleur plan?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Planifier soigneusement pour éviter les routes de migration des baleines',
          impact: 'positive',
          consequence: 'Excellente planification! On obtient de l\'énergie propre ET on protège les autoroutes des baleines!',
          pros: 'Énergie propre qui ne blesse pas les animaux marins.',
          cons: 'Prend plus de temps à planifier. Pourrait coûter plus cher.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Ne construire aucune ferme éolienne océanique',
          impact: 'negative',
          consequence: 'Sans énergie propre, on continue à brûler des combustibles sales qui réchauffent l\'océan.',
          pros: 'Aucun bruit de construction ne dérange les animaux marins.',
          cons: 'L\'océan continue de se réchauffer. Les changements climatiques empirent.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Concevoir des éoliennes amies des poissons',
          impact: 'positive',
          consequence: 'Innovation super cool! Les nouveaux designs silencieux deviennent des récifs artificiels où les poissons adorent vivre!',
          pros: 'Crée de nouvelles maisons pour les poissons. Plus silencieux pour les baleines.',
          cons: 'Coûte plus cher à développer. Nouvelle technologie pourrait avoir des surprises.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Construire près de la plage',
      description: 'Plus de familles veulent vivre près du magnifique littoral de la Nouvelle-Écosse. De nouvelles maisons, magasins et hôtels sont construits. Mais la construction peut faire couler de l\'eau sale dans l\'océan. Comment construire de façon responsable?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Utiliser des méthodes de construction écologiques',
          impact: 'positive',
          consequence: 'Choix incroyable! La construction verte garde l\'eau cristalline et protège les maisons des animaux marins!',
          pros: 'Eau propre pour tout le monde. Les animaux marins gardent leurs maisons sûres.',
          cons: 'Coûte plus cher à construire. Prend plus de temps à finir.'
        },
        {
          id: 'unrestricted-development',
          text: 'Construire où et comme les gens veulent',
          impact: 'negative',
          consequence: 'Zut! L\'eau sale coule dans l\'océan, le rendant trouble. Les pouponnières de poissons sont détruites.',
          pros: 'Construit plus vite et moins cher. Plus d\'emplois de construction.',
          cons: 'L\'océan devient pollué. Les animaux marins perdent leurs maisons.'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Laisser des espaces naturels entre les bâtiments et l\'eau',
          impact: 'positive',
          consequence: 'Stratégie brillante! Ces tampons verts fonctionnent comme des éponges géantes, nettoyant l\'eau sale!',
          pros: 'Système de filtre à eau naturel. Les animaux ont des chemins sûrs.',
          cons: 'Moins d\'espace pour construire. Les maisons pourraient coûter plus cher.'
        }
      ],
      isEnding: true
    },
    {
      id: 'invasive-species',
      title: 'Envahisseurs sous-marins',
      description: 'D\'étranges nouvelles créatures marines arrivent dans les eaux de Nouvelle-Écosse! Des crabes verts d\'Europe et d\'autres espèces envahissantes mangent la nourriture des poissons locaux et prennent leurs maisons. C\'est comme des intimidateurs qui s\'installent dans ton quartier! Comment protéger nos amis marins locaux?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'removal-programs',
          text: 'Installer des pièges spéciaux pour attraper les envahisseurs',
          impact: 'positive',
          consequence: 'Super idée! En attrapant ces intimidateurs sous-marins, les poissons locaux peuvent retrouver leurs maisons. C\'est comme une mission de sauvetage de superhéros!',
          pros: 'Les animaux marins locaux récupèrent leur espace. La pêche s\'améliore pour tout le monde.',
          cons: 'Coûte de l\'argent pour installer des pièges. Beaucoup de travail pour tous les attraper.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'ignore-invaders',
          text: 'Laisser les nouvelles espèces rester et voir ce qui arrive',
          impact: 'negative',
          consequence: 'Oh là là! Les envahisseurs se multiplient comme des fous et prennent tout contrôle. Les poissons locaux perdent leurs maisons et nourriture pour toujours.',
          pros: 'Pas de travail ou d\'argent supplémentaire nécessaire maintenant.',
          cons: 'La vie marine locale disparaît. L\'écosystème océanique devient complètement mélangé.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'education-prevention',
          text: 'Enseigner aux gens comment empêcher de nouveaux envahisseurs d\'arriver',
          impact: 'positive',
          consequence: 'Prévention intelligente! Quand les gens nettoient leurs bateaux et ne jettent pas de poissons d\'aquarium, moins d\'envahisseurs arrivent. C\'est comme la sécurité frontalière pour l\'océan!',
          pros: 'Arrête le problème avant qu\'il commence. Les gens apprennent à être des protecteurs de l\'océan.',
          cons: 'Prend du temps pour que tout le monde apprenne. Certains envahisseurs sont déjà ici.',
          nextScenarioId: 'climate-change'
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Les eaux qui se réchauffent',
      description: 'Les températures océaniques augmentent à cause des changements climatiques. Les poissons nagent vers des eaux plus froides au nord. C\'est comme si l\'océan avait de la fièvre! Qu\'est-ce qui peut aider à refroidir les choses?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Passer à l\'énergie éolienne et solaire',
          impact: 'positive',
          consequence: 'Génial! L\'énergie propre produit beaucoup moins de pollution. C\'est comme donner un médicament à l\'océan pour faire baisser sa fièvre.',
          pros: 'Arrête de réchauffer l\'océan. Crée de nouveaux emplois verts.',
          cons: 'Cher à construire au début. La météo affecte combien d\'énergie on obtient.'
        },
        {
          id: 'ignore-climate',
          text: 'Continuer à utiliser le charbon et le pétrole',
          impact: 'negative',
          consequence: 'Oh non! L\'océan devient encore plus chaud. Les poissons doivent nager loin pour trouver de l\'eau fraîche.',
          pros: 'Pas besoin de changer nos systèmes d\'énergie.',
          cons: 'La fièvre de l\'océan empire. Les communautés de poissons se séparent.'
        },
        {
          id: 'carbon-capture',
          text: 'Protéger les forêts de kelp et les marais salés',
          impact: 'positive',
          consequence: 'Solution naturelle intelligente! Ces plantes sous-marines sont comme des aspirateurs géants qui sucent le carbone de l\'air.',
          pros: 'La nature fait le travail pour nous. Protège aussi les habitats marins importants.',
          cons: 'Prend longtemps à marcher. A besoin de zones énormes pour faire une grande différence.'
        }
      ],
      isEnding: true
    }
  ],
  mi: [
    {
      id: 'plastic-pollution',
      title: 'Pekisk kamkinu\'mk!',
      description: 'Mu kelu! Pekisk mawi aq apoqsuol Kespuk qospemkuk wejkiskultijik. Mikjikewalk sisipkol pekisk mawiol menaqanej aq kijatqulutijik mijua\'tij. Koqoey ketu wetultekl?',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Pekisk mawi mu apoqnmatimk',
          impact: 'positive',
          consequence: 'Kelu elkewek! Apjiw pekisk kamkinu\'mk samqwanikatl pas kepmin. Putupkuatl aq nmultikewey mu wejoqtaqo\'tij.',
          pros: 'Samqwanikatl mu kijataqo\'tij pekiskek. Qospemkuom pilei wlaoliwaq.',
          cons: 'L\'nuk elmi\'tij pukujink nkutey apoqnmatimk.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'ignore-problem',
          text: 'Eykisk apoqon pekisk elitasikatijk',
          impact: 'negative',
          consequence: 'Mu kelu! Esku\'sk samqwanikatijk esku\'sk pekisk mijua\'tij. Samqwan kamkinu\'mk teluek.',
          pros: 'L\'nuk mu ketu ankamtultimkwaw.',
          cons: 'Mikjikewalk aq nkmaq eykisk kijataqo\'tij.',
          nextScenarioId: 'fishing-practices'
        },
        {
          id: 'beach-cleanup',
          text: 'Qospem piskitasin wuli eluwemkatimk',
          impact: 'positive',
          consequence: 'Kelu koqoey! Ta\'n pekisk kesnuekl nkutey samqwanikatl ukepmin. Aq weli eluwek nijgalk!',
          pros: 'Pilei kepmin samqwanikatl. L\'nuk nukmatuinewaql.',
          cons: 'Anke\'k pekisk tep piskitun. Siawa pekisk eykisk wejkiskul.',
          nextScenarioId: 'fishing-practices'
        }
      ]
    },
    {
      id: 'fishing-practices',
      title: 'Ap nkato\'m pu\'tu\'n',
      description: 'Pu\'tu\'newk mskekul pukwelk nkmaq ta\'n tqospoq kisikuk Kespukek. Ketu pukwelk pu\'tu\'ltijik, mijua\'jijik nkmaq ma ketu ukumijuuol. Tan teluek wskitqamu pu\'tu\'n?',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      choices: [
        {
          id: 'sustainable-quotas',
          text: 'Lukwateweya\'timk tasipoq nkmaq ketu pu\'tu\'tmekl',
          impact: 'positive',
          consequence: 'Pilei ankamkewey! Ketanji nkmaq pu\'tu\'ltek, msita\'q nkmaq eykisk wetultijik samqwankook!',
          pros: 'Nkmaq otinuo\'kuom nakato\'m wetultijik. Pu\'tu\'newey lukwateweya\'q nagowei.',
          cons: 'Pu\'tu\'newk ketu apjiw telo\'qon nutakoq.',
          nextScenarioId: 'shipping-traffic'
        },
        {
          id: 'unlimited-fishing',
          text: 'Msit koqwa nkmaq pu\'tu\'n',
          impact: 'negative',
          consequence: 'Mu kelu! Msit nkmaq qospemkato\'tij. Mijua\'jijik nkmaq ma wetultijik, samqwan kamkinu\'tm.',
          pros: 'Pu\'tu\'newk pukwelk telo\'qon nutakoq.',
          cons: 'Msit nkmaq qospemkatultijik. Mu esku\'sk pu\'tu\'newey.'
        },
        {
          id: 'marine-reserves',
          text: 'Puksit tepo\'tin "mu pu\'tu\'n" kepmikatl',
          impact: 'positive',
          consequence: 'Kelu! Na puksit tepo\'tin elitasik mijua\'jijik nkmaq kepmin mesknu\'tikik!',
          pros: 'Pissanji tepo\'tin mijua\'jijik nkmaq. Esku\'sk nkmaq msita\'n.',
          cons: 'Ketanji pu\'tu\'newk na tepo\'tinewkek mu ketu pu\'tu\'n.',
          nextScenarioId: 'shipping-traffic'
        }
      ]
    },
    {
      id: 'shipping-traffic',
      title: 'Putupkuatl awti mimajikek',
      description: 'Msit kisikuk mekitkonol wkitasin Kespukek. Ketiskek putupkuatl wetkaltijik pas kespekultijik. Kepnukek putupkuatl neqt 340 wetultijik! Koqoey ketu wetultekl?',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600',
      choices: [
        {
          id: 'speed-restrictions',
          text: 'Wkitnol telo\'lkitijik putupkuatl tepo\'tinewkek',
          impact: 'positive',
          consequence: 'Pilei! Wkitnol telo\'lkitijik, putupkuatl ketu eykiskek alasqultijik. Elitasik kespekultinol kepmin memaju\'nk!',
          pros: 'Kepmin putupkuatl memaju\'nk. Kunuatul ketkunato\'tij awti.',
          cons: 'Wkitnol na\'kwekek nto\'ltultijik. Esku\'sk telo\'q.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'ignore-whales',
          text: 'Wkitnol telo\'lkitijik koqwa tan telultijik',
          impact: 'negative',
          consequence: 'Maw koqoey! Esku\'sk putupkuatl wetkaltijik aq nepnukultijik. Na mekiteyul ketu qospemkultijik kiskaja\'q!',
          pros: 'Wkitnol wsisk aq apjiw telo\'q nto\'ltultijik.',
          cons: 'Putupkuatl ma wetultijik. Wanjukultekw na mekiteyul samqwanikatl.',
          nextScenarioId: 'ocean-acidification'
        },
        {
          id: 'detection-systems',
          text: 'Putupkuatl newmatikewey kisikewey wkitnolknook',
          impact: 'positive',
          consequence: 'Kelu ekmulti\'k! Puksit kisikewalk pissawtiwutijik wkitn-nukultijik putupkuatl nekm wetultijik. Putupkuatl-wekimukewey elitasik!',
          pros: 'Wkitnol kiskulti\'k tame putupkuatl koqma alasqultijik.',
          cons: 'Telo\'q kisikewey kelulnek. Wkitn-nukewey kiskulti\'kewey ketu.'
        }
      ]
    },
    {
      id: 'ocean-acidification',
      title: 'Samqwan ankite\'skisnul',
      description: 'Samqwan ankite\'sk (majuapskw) mskiku apoqon temokein. Na wenjo\'tiq kupkwey aq apoqsuol mekij qospem alkewskultijik. Elitasik telokewe\'k apoqon meskenul alkewskulti\'k!',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'reduce-emissions',
          text: 'Apjimk apoqon telokolulk aq mawiokeweyk',
          impact: 'positive',
          consequence: 'Kelu wetulti\'k! Apjiw apoqon mskikuktook samqwan kepmin wetasin. Kupkwey esku\'sk kelu puktusk qospem alkewskultijik!',
          pros: 'Weskitpin msit samqwan ukamkinu\'kuom. Kelu msit samqwanikatl.',
          cons: 'L\'nuk ketu ankamtulti\'k tan telokolulti\'k aq alkewskulti\'k koqoey.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'ignore-acidity',
          text: 'Eykisk apoqon mskiku elitasikatijk',
          impact: 'negative',
          consequence: 'Maw teptaqan! Samqwan esku\'sk ankite\'snul. Kupkwey uqospem teluek menoktek aq si\'stoktek.',
          pros: 'Apech l\'nu mu ketu ankamtaq ukwsitaqann.',
          cons: 'Qospem-alkewskultijik esku\'sk aq nepnukultijik.',
          nextScenarioId: 'renewable-energy'
        },
        {
          id: 'buffer-zones',
          text: 'Apoqon ankite\'waqann puksit tepo\'tinewk',
          impact: 'neutral',
          consequence: 'Kelu koqoey! Na ketu wetulnekul ketanji tepo\'tinewktook, ketu esku\'sk kojua\'tumekl. Elitasik apoqon-kamtoqan samqy ankite\'sk!',
          pros: 'Ketu kepmikatl msaakeyul tepo\'tin.',
          cons: 'Mu kiskulukw ketu wetulnekul. Pukwelk telo\'q.',
          nextScenarioId: 'renewable-energy'
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Samqwan muk\'sunn-alkewskulti\'k',
      description: 'Kespek ketu alkewskulanej mekitkonoal muk\'sunn-alkewskulti\'tinej samqwankook pilei napskewey alkewskulti\'k. Na mekteyal muk\'sunn-alkewskulti\'tinej ketu napskewi\'tij puktapskitponil wkuomol! Ketu alkewskulti\'k ketu wenjo\'taq putupkuatl. Koqoey teliskek ankaptmukewey?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'careful-planning',
          text: 'Kelu ankaptmukewey putupkuatl alasutkewey awti mu wetasnuk',
          impact: 'positive',
          consequence: 'Kelu ankaptmukewey! Pilei napskewey nepekl aq kepmin putupkuatl uawti! Elitasik tabukkek samqwanikatl ujit mawio\'kuom!',
          pros: 'Pilei napskewey mu wenjo\'tnuk samqwanikatl.',
          cons: 'Na\'kwek ankaptmukewey. Ketu esku\'sk telo\'q nutakoq.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'no-renewables',
          text: 'Mu samqwankook muk\'sunn-alkewskulti\'tinej alkewskulan',
          impact: 'negative',
          consequence: 'Pilei napskewey apoqnul, eykisk puktusk apoqnul koqoey samqwan kespite\'snuek aq wenjo\'tnuek MSIT samqwanikatl.',
          pros: 'Mu alkewskulti\'kewey etkewek wenjo\'tnuk samqwanikatl.',
          cons: 'Samqwan eykisk kespite\'snul. Klama ankamkewey pas maw.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'adaptive-technology',
          text: 'Alkewskulanej nkmaq-wulamatimk muk\'sunn-alkewskulti\'tinej',
          impact: 'positive',
          consequence: 'Pas kelu siawa koqoey! Siawa\'ji pilei alkewskulti\'tinej ketanji etkewe\'k teluek aq ketu wejioktultijik nkmaq ukwkuom!',
          pros: 'Alkewskulin siawa\'ji wkuomol nkmaq. Ketanji etkewe\'k putupkuatl.',
          cons: 'Esku\'sk telo\'q alkewskulti\'k. Siawa\'ji kisikewey ketu surpriseol.',
          nextScenarioId: 'coastal-development'
        }
      ]
    },
    {
      id: 'coastal-development',
      title: 'Qospem alkewskulti\'k',
      description: 'Esku\'sk otinuo\'kuom ketu poktultijik Kespuk pilei qospemktook. Siawa\'ji wkuomol, atoqewikamikol aq kiskukatikewikamikol wejalkewskultijik. Ketu alkewskulti\'kewey ketu wenjo\'taq kamkinu\'k samqy samqwankook. Tan teluek wlieiskek alkewskulti\'k?',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600',
      choices: [
        {
          id: 'green-development',
          text: 'Apoqon klusuwakon-kispek alkewskulti\'kewey',
          impact: 'positive',
          consequence: 'Mekite\'k elkewek! Klusuwakon alkewskulti\'kewey kepmin samqy puktekek aq kepmin samqwanikatl uwkuomol!',
          pros: 'Wlusit samqy msita\'n. Samqwanikatl ukepmin uwkuomol.',
          cons: 'Esku\'sk telo\'q alkewskulti\'k. Na\'kwek kiskultimekel.'
        },
        {
          id: 'unrestricted-development',
          text: 'Alkewskulan tame aq tan teluek l\'nuk menaqanej',
          impact: 'negative',
          consequence: 'Mu kelu! Kamkinu\'k samqy alukitasin samqwankook, ketmultek. Nkmaq wmitinaswahtikuom kamkino\'tk.',
          pros: 'Wsisk aq apjiw telo\'q alkewskulanek. Esku\'sk lukwateweya\'q pilei.',
          cons: 'Samqwan kamkino\'tm. Samqwanikatl wanjukultijik uwkuomol.'
        },
        {
          id: 'buffer-zones-coastal',
          text: 'Tepo\'tin tepkunatimk alkewskulti\'kewikamikol aq samqy kjikuyk',
          impact: 'positive',
          consequence: 'Pilei ankaptmukewey! Na klusuwakon tepkunatimkol elitasultijik mekteyal apoqsulekol, kamkinu\'k samqy temalakatultijik!',
          pros: 'Klusuwakon samqy-temalakato\'k. Samqwanikatl kepmin awti.',
          cons: 'Apjiw alkewskulti\'kewey tepo\'tin. Wkuomol ketu esku\'sk telo\'qoltijik.'
        }
      ],
      isEnding: true
    },
    {
      id: 'invasive-species',
      title: 'Siawa\'jijik samqwanikatl',
      description: 'Kjikuwanji siawa\'jijik samqwanikatl wejkiskultijik Kespuk usamqy! Pasit klusuwakon apoqsuol Europe\'ktook aq aq ktanji ankamoltijik samqwanikatl mijultijik tepo\'tin nkmaq umijuwakonol aq otijkultijik uwkuomol. Elitasik mekiteliji\'jik ukwkuomktinikitipa\'kek wejultijik! Koqoey ketu kepmin tepo\'tin nkmaq nijgalk?',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      choices: [
        {
          id: 'removal-programs',
          text: 'Puksit elsitaqann klkukinomkon ankamoltijik kesnuekl',
          impact: 'positive',
          consequence: 'Kelu koqoey! Kesnuekl na samqwankitijk mekiteliji\'jik, tepo\'tin nkmaq ketu apisultijik uwkuomol. Elitasik superhero ukepmikatimkewey!',
          pros: 'Tepo\'tin samqwanikatl apisultijik utepo\'tin. Pu\'tu\'newey weskitpin msita\'n.',
          cons: 'Telo\'q klkukinomkonol puksitlulnek. Pukwelk nto\'ltimkewey msit kesnuekl.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'ignore-invaders',
          text: 'Teliulkitijik siawa\'jijik ankamoltijik aq nemi\'j koqoey ketu kiskul',
          impact: 'negative',
          consequence: 'Mu kelu! Ankamoltijik alsultijik alokteliji\'k aq msit koqoey owokatultijik. Tepo\'tin nkmaq wanjukultijik uwkuomol aq umijuwakonol kiskaja\'q.',
          pros: 'Mu esku\'sk nto\'ltimkewey kije telo\'q nutakoq.',
          cons: 'Tepo\'tin samqwanikatl qospemkultijik. Samqwan ukamkinu\'kuom keknuo\'tm.',
          nextScenarioId: 'climate-change'
        },
        {
          id: 'education-prevention',
          text: 'Kenu\'matimk l\'nuk tan ketu kistamulnekw siawa\'jijik ankamoltijik wejkiskultijik',
          impact: 'positive',
          consequence: 'Pilei aweskewey! L\'nuk malkeknumatultijik uwkitnol aq mu kjikuwatajik mijuaokik nkmaq, apjiw ankamoltijik wejkiskultijik. Elitasik samqwan utepkunikatimkewey!',
          pros: 'Kistamulnul na\'kumin mu tu welaku. L\'nuk nukmatuinewaql samqwan ukepmikatl.',
          cons: 'Na\'kwek msit koqwa l\'nu nukmatqamkimekl. Ketanji ankamoltijik kije atu.',
          nextScenarioId: 'climate-change'
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Samqy kespite\'skisnul',
      description: 'Samqy kespite\'sk klama ankamkewey. Nkmaq alasqultijik unaqsktoq samqy newtek, aq apoqewikatl meskewakanatijik. Elitasik samqwan apiskanul! Koqoey ketu wetultekl tetpiktek?',
      imageUrl: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600',
      choices: [
        {
          id: 'renewable-energy',
          text: 'Ankamtulti\'k muk\'sunn aq naqu\'sk napskewey',
          impact: 'positive',
          consequence: 'Kelu! Pilei napskewey apjiw apoqon alkewskulin. Elitasik samqwan maqamikewey kunuataqal ukwspisomal tetpiktekl!',
          pros: 'Kistamulnul samqwan kespite\'skisnul. Alkewskulin pilei lukwateweya\'timkol.',
          cons: 'Pukwelk telo\'q nutakoq alkewskulti\'k. Eski\'k koqwa napskewey nepemekl.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'ignore-climate',
          text: 'Eykisk apoqon espaqtaqan aq nkitpoql napskewey',
          impact: 'negative',
          consequence: 'Mu kelu! Samqwan esku\'sk kespite\'snul. Nkmaq ketu alasqultijik kweyu samqy newtek.',
          pros: 'Mu ketu ankamtultimkwaw napskewey ankaptmukeweyl.',
          cons: 'Samqwan uapiskanul pas maw. Nkmaq uwpoqsuwakonol si\'stokultijik.',
          nextScenarioId: 'coastal-development'
        },
        {
          id: 'carbon-capture',
          text: 'Kepmin alkewaql samqwankook aq lamiql samqy',
          impact: 'positive',
          consequence: 'Pilei klusuwakon wetultimk! Na samqwankitijk alkskitaqanik elitasultijik mekteyal apoqon-temokeykil apoqon mskiktuktook!',
          pros: 'Klusuwakon nto\'ltin kinuwaw. Kepmin msaakeyul samqwanikatl uwkuomol.',
          cons: 'Na\'kwek wetultimekl. Ketu mekiteyul tepo\'tin mekite\'k ankamkewey teluskek.'
        }
      ],
      isEnding: true
    }
  ]
};
