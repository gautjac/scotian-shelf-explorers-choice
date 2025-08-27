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
  en: [],
  fr: [],
  mi: []
};