// Plant species relevant to NYC, mapped to Google Pollen API codes
// NYC's dominant allergens by season

export const PLANT_TYPES = {
  TREE: 'TREE',
  GRASS: 'GRASS',
  WEED: 'WEED',
}

export const PLANTS = {
  // Trees (spring peak: Mar-May)
  OAK: { code: 'OAK', name: 'Oak', type: PLANT_TYPES.TREE, months: [3, 4, 5], nycRelevance: 'high' },
  BIRCH: { code: 'BIRCH', name: 'Birch', type: PLANT_TYPES.TREE, months: [3, 4, 5], nycRelevance: 'high' },
  MAPLE: { code: 'MAPLE', name: 'Maple', type: PLANT_TYPES.TREE, months: [3, 4], nycRelevance: 'high' },
  ELM: { code: 'ELM', name: 'Elm', type: PLANT_TYPES.TREE, months: [2, 3, 4], nycRelevance: 'high' },
  ASH: { code: 'ASH', name: 'Ash', type: PLANT_TYPES.TREE, months: [3, 4, 5], nycRelevance: 'medium' },
  PINE: { code: 'PINE', name: 'Pine', type: PLANT_TYPES.TREE, months: [4, 5, 6], nycRelevance: 'medium' },
  ALDER: { code: 'ALDER', name: 'Alder', type: PLANT_TYPES.TREE, months: [2, 3, 4], nycRelevance: 'low' },
  COTTONWOOD: { code: 'COTTONWOOD', name: 'Cottonwood', type: PLANT_TYPES.TREE, months: [4, 5], nycRelevance: 'medium' },

  // Grasses (summer: May-Jul)
  TIMOTHY_GRASS: { code: 'TIMOTHY_GRASS', name: 'Timothy', type: PLANT_TYPES.GRASS, months: [5, 6, 7], nycRelevance: 'high' },
  BLUEGRASS: { code: 'BLUEGRASS', name: 'Bluegrass', type: PLANT_TYPES.GRASS, months: [5, 6, 7], nycRelevance: 'high' },
  RYEGRASS: { code: 'RYEGRASS', name: 'Ryegrass', type: PLANT_TYPES.GRASS, months: [5, 6, 7], nycRelevance: 'medium' },

  // Weeds (late summer/fall: Aug-Oct)
  RAGWEED: { code: 'RAGWEED', name: 'Ragweed', type: PLANT_TYPES.WEED, months: [8, 9, 10], nycRelevance: 'high' },
  MUGWORT: { code: 'MUGWORT', name: 'Mugwort', type: PLANT_TYPES.WEED, months: [7, 8, 9], nycRelevance: 'medium' },
}

// Grouped for the AllergenPicker
export const PLANT_GROUPS = [
  { type: PLANT_TYPES.TREE, label: 'Trees', plants: ['OAK', 'BIRCH', 'MAPLE', 'ELM', 'ASH', 'PINE'] },
  { type: PLANT_TYPES.GRASS, label: 'Grasses', plants: ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'] },
  { type: PLANT_TYPES.WEED, label: 'Weeds', plants: ['RAGWEED', 'MUGWORT'] },
]

// For the bloom calendar: month ranges each plant is active
export const BLOOM_CALENDAR = [
  { code: 'ELM', name: 'Elm', start: 2, end: 4 },
  { code: 'MAPLE', name: 'Maple', start: 3, end: 4 },
  { code: 'BIRCH', name: 'Birch', start: 3, end: 5 },
  { code: 'OAK', name: 'Oak', start: 4, end: 5 },
  { code: 'ASH', name: 'Ash', start: 3, end: 5 },
  { code: 'PINE', name: 'Pine', start: 4, end: 6 },
  { code: 'GRASS', name: 'Grass', start: 5, end: 7 },
  { code: 'MUGWORT', name: 'Mugwort', start: 7, end: 9 },
  { code: 'RAGWEED', name: 'Ragweed', start: 8, end: 10 },
]
