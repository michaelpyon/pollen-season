// Realistic mock data mirroring Google Pollen API response structure.
// Simulates a mid-April NYC forecast: tree pollen peaking, grass starting.

function getDateStr(daysFromNow) {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toISOString().split('T')[0]
}

export const MOCK_POLLEN_DATA = {
  regionCode: 'US',
  dailyInfo: [
    {
      date: { year: 2026, month: 4, day: 15 },
      dateStr: getDateStr(0),
      pollenTypeInfo: [
        {
          code: 'TREE',
          displayName: 'Tree',
          indexInfo: {
            code: 'UPI',
            value: 3,
            category: 'High',
            color: { red: 0.76, green: 0.36, blue: 0.23 },
          },
          healthRecommendations: [
            'Take your allergy medication before going outside.',
            'Keep windows closed during peak hours.',
          ],
        },
        {
          code: 'GRASS',
          displayName: 'Grass',
          indexInfo: {
            code: 'UPI',
            value: 1,
            category: 'Low',
            color: { red: 0.42, green: 0.56, blue: 0.44 },
          },
          healthRecommendations: [],
        },
        {
          code: 'WEED',
          displayName: 'Weed',
          indexInfo: {
            code: 'UPI',
            value: 0,
            category: 'None',
            color: { red: 0.42, green: 0.56, blue: 0.44 },
          },
          healthRecommendations: [],
        },
      ],
      plantInfo: [
        { code: 'OAK', displayName: 'Oak', indexInfo: { value: 4, category: 'Very High' }, plantDescription: { type: 'TREE', season: 'Late spring' } },
        { code: 'BIRCH', displayName: 'Birch', indexInfo: { value: 3, category: 'High' }, plantDescription: { type: 'TREE', season: 'Spring' } },
        { code: 'MAPLE', displayName: 'Maple', indexInfo: { value: 2, category: 'Moderate' }, plantDescription: { type: 'TREE', season: 'Early spring' } },
        { code: 'ELM', displayName: 'Elm', indexInfo: { value: 1, category: 'Low' }, plantDescription: { type: 'TREE', season: 'Early spring' } },
        { code: 'ASH', displayName: 'Ash', indexInfo: { value: 2, category: 'Moderate' }, plantDescription: { type: 'TREE', season: 'Spring' } },
        { code: 'PINE', displayName: 'Pine', indexInfo: { value: 1, category: 'Low' }, plantDescription: { type: 'TREE', season: 'Late spring' } },
        { code: 'TIMOTHY_GRASS', displayName: 'Timothy', indexInfo: { value: 1, category: 'Low' }, plantDescription: { type: 'GRASS', season: 'Summer' } },
        { code: 'RAGWEED', displayName: 'Ragweed', indexInfo: { value: 0, category: 'None' }, plantDescription: { type: 'WEED', season: 'Fall' } },
      ],
    },
    {
      date: { year: 2026, month: 4, day: 16 },
      dateStr: getDateStr(1),
      pollenTypeInfo: [
        { code: 'TREE', displayName: 'Tree', indexInfo: { code: 'UPI', value: 4, category: 'Very High' }, healthRecommendations: ['Stay indoors as much as possible.'] },
        { code: 'GRASS', displayName: 'Grass', indexInfo: { code: 'UPI', value: 1, category: 'Low' }, healthRecommendations: [] },
        { code: 'WEED', displayName: 'Weed', indexInfo: { code: 'UPI', value: 0, category: 'None' }, healthRecommendations: [] },
      ],
      plantInfo: [
        { code: 'OAK', displayName: 'Oak', indexInfo: { value: 4, category: 'Very High' } },
        { code: 'BIRCH', displayName: 'Birch', indexInfo: { value: 4, category: 'Very High' } },
        { code: 'MAPLE', displayName: 'Maple', indexInfo: { value: 2, category: 'Moderate' } },
        { code: 'ASH', displayName: 'Ash', indexInfo: { value: 3, category: 'High' } },
      ],
    },
    {
      date: { year: 2026, month: 4, day: 17 },
      dateStr: getDateStr(2),
      pollenTypeInfo: [
        { code: 'TREE', displayName: 'Tree', indexInfo: { code: 'UPI', value: 2, category: 'Moderate' }, healthRecommendations: [] },
        { code: 'GRASS', displayName: 'Grass', indexInfo: { code: 'UPI', value: 1, category: 'Low' }, healthRecommendations: [] },
        { code: 'WEED', displayName: 'Weed', indexInfo: { code: 'UPI', value: 0, category: 'None' }, healthRecommendations: [] },
      ],
      plantInfo: [
        { code: 'OAK', displayName: 'Oak', indexInfo: { value: 2, category: 'Moderate' } },
        { code: 'BIRCH', displayName: 'Birch', indexInfo: { value: 2, category: 'Moderate' } },
      ],
    },
    {
      date: { year: 2026, month: 4, day: 18 },
      dateStr: getDateStr(3),
      pollenTypeInfo: [
        { code: 'TREE', displayName: 'Tree', indexInfo: { code: 'UPI', value: 2, category: 'Moderate' }, healthRecommendations: [] },
        { code: 'GRASS', displayName: 'Grass', indexInfo: { code: 'UPI', value: 2, category: 'Moderate' }, healthRecommendations: [] },
        { code: 'WEED', displayName: 'Weed', indexInfo: { code: 'UPI', value: 0, category: 'None' }, healthRecommendations: [] },
      ],
      plantInfo: [
        { code: 'OAK', displayName: 'Oak', indexInfo: { value: 2, category: 'Moderate' } },
        { code: 'BIRCH', displayName: 'Birch', indexInfo: { value: 1, category: 'Low' } },
        { code: 'TIMOTHY_GRASS', displayName: 'Timothy', indexInfo: { value: 2, category: 'Moderate' } },
      ],
    },
    {
      date: { year: 2026, month: 4, day: 19 },
      dateStr: getDateStr(4),
      pollenTypeInfo: [
        { code: 'TREE', displayName: 'Tree', indexInfo: { code: 'UPI', value: 3, category: 'High' }, healthRecommendations: [] },
        { code: 'GRASS', displayName: 'Grass', indexInfo: { code: 'UPI', value: 1, category: 'Low' }, healthRecommendations: [] },
        { code: 'WEED', displayName: 'Weed', indexInfo: { code: 'UPI', value: 0, category: 'None' }, healthRecommendations: [] },
      ],
      plantInfo: [
        { code: 'OAK', displayName: 'Oak', indexInfo: { value: 3, category: 'High' } },
        { code: 'BIRCH', displayName: 'Birch', indexInfo: { value: 3, category: 'High' } },
        { code: 'ASH', displayName: 'Ash', indexInfo: { value: 2, category: 'Moderate' } },
      ],
    },
  ],
}

// Mock weather data from Open-Meteo
export const MOCK_WEATHER_DATA = {
  hourly: {
    time: Array.from({ length: 48 }, (_, i) => {
      const d = new Date()
      d.setHours(i, 0, 0, 0)
      return d.toISOString()
    }),
    precipitation_probability: [
      // Today: dry morning, rain in afternoon
      0, 0, 0, 0, 0, 0, 5, 5, 10, 10, 15, 20, 30, 45, 55, 60, 50, 35, 20, 10, 5, 0, 0, 0,
      // Tomorrow: dry all day, windy
      0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    wind_speed_10m: [
      // Today: mild
      5, 4, 4, 3, 5, 6, 8, 10, 12, 13, 14, 15, 14, 12, 10, 9, 8, 7, 6, 5, 4, 4, 3, 3,
      // Tomorrow: windy
      8, 9, 10, 12, 15, 18, 20, 22, 24, 25, 26, 25, 23, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7, 7,
    ],
  },
}

// Convert Google's { year, month, day } object to YYYY-MM-DD string
function toDateStr(day) {
  if (day.dateStr) return day.dateStr
  const d = day.date
  return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
}

// Helper to extract a flattened "today" object from the API data
export function getTodayData(data = MOCK_POLLEN_DATA) {
  const today = data.dailyInfo[0]
  const overallUpi = Math.max(...today.pollenTypeInfo.map(t => t.indexInfo.value))
  const topSpecies = (today.plantInfo || [])
    .filter(p => p.indexInfo.value >= 3)
    .sort((a, b) => b.indexInfo.value - a.indexInfo.value)
    .map(p => p.displayName)

  return {
    date: toDateStr(today),
    overallUpi,
    types: today.pollenTypeInfo.map(t => ({
      code: t.code,
      name: t.displayName,
      upi: t.indexInfo.value,
      category: t.indexInfo.category,
    })),
    species: (today.plantInfo || []).map(p => ({
      code: p.code,
      name: p.displayName,
      upi: p.indexInfo.value,
      category: p.indexInfo.category,
    })),
    topSpecies,
  }
}

// Flatten all days for forecast view
export function getForecastData(data = MOCK_POLLEN_DATA) {
  return data.dailyInfo.map(day => {
    const overallUpi = Math.max(...day.pollenTypeInfo.map(t => t.indexInfo.value))
    return {
      date: toDateStr(day),
      overallUpi,
      types: day.pollenTypeInfo.map(t => ({
        code: t.code,
        name: t.displayName,
        upi: t.indexInfo.value,
        category: t.indexInfo.category,
      })),
      species: (day.plantInfo || []).map(p => ({
        code: p.code,
        name: p.displayName,
        upi: p.indexInfo.value,
        category: p.indexInfo.category,
      })),
    }
  })
}

// Weather summary for today and tomorrow
export function getWeatherSummary(weather = MOCK_WEATHER_DATA) {
  const todayPrecip = weather.hourly.precipitation_probability.slice(0, 24)
  const tomorrowPrecip = weather.hourly.precipitation_probability.slice(24, 48)
  const tomorrowWind = weather.hourly.wind_speed_10m.slice(24, 48)

  const todayMaxPrecip = Math.max(...todayPrecip)
  const tomorrowMaxPrecip = Math.max(...tomorrowPrecip)
  const tomorrowMaxWind = Math.max(...tomorrowWind)

  return {
    todayRainLikely: todayMaxPrecip > 40,
    tomorrowRainLikely: tomorrowMaxPrecip > 40,
    tomorrowWindy: tomorrowMaxWind > 20,
    todayMaxPrecipChance: todayMaxPrecip,
    tomorrowMaxPrecipChance: tomorrowMaxPrecip,
    tomorrowMaxWindSpeed: tomorrowMaxWind,
  }
}
