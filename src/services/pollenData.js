// Realistic NYC pollen data that varies by current date/time.
// Uses the current month to determine seasonal patterns:
// Spring (Mar-May): high tree pollen
// Summer (Jun-Aug): high grass pollen
// Fall (Sep-Oct): ragweed peak
// Winter (Nov-Feb): low everything, mold moderate

function getDateStr(daysFromNow) {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toISOString().split('T')[0]
}

// Deterministic pseudo-random from a seed so data stays stable within a session
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function clampIndex(val) {
  return Math.max(0, Math.min(4, Math.round(val)))
}

function getSeasonalBaselines(month) {
  // Returns base indices for [tree, grass, weed, mold] per month
  const table = {
    1:  [0, 0, 0, 1],
    2:  [0.5, 0, 0, 1],
    3:  [2, 0, 0, 1],
    4:  [3.5, 0.5, 0, 0.5],
    5:  [3, 2, 0, 0.5],
    6:  [1, 3, 0.5, 1],
    7:  [0.5, 3.5, 1, 1.5],
    8:  [0, 2, 3, 2],
    9:  [0, 0.5, 4, 2],
    10: [0, 0, 2.5, 2],
    11: [0, 0, 0.5, 1.5],
    12: [0, 0, 0, 1],
  }
  return table[month] || [0, 0, 0, 1]
}

function getTrend(base, dayOffset) {
  if (dayOffset <= 1) {
    if (base >= 3) return 'rising'
    if (base <= 1) return 'falling'
    return 'stable'
  }
  const noise = seededRandom(dayOffset * 31 + base * 7)
  if (noise > 0.6) return 'rising'
  if (noise < 0.3) return 'falling'
  return 'stable'
}

function getSpeciesForType(typeName, baseIndex, daySeed) {
  const speciesMap = {
    Tree: [
      { name: 'Oak', code: 'OAK', weight: 1.2 },
      { name: 'Birch', code: 'BIRCH', weight: 1.0 },
      { name: 'Maple', code: 'MAPLE', weight: 0.8 },
      { name: 'Elm', code: 'ELM', weight: 0.6 },
      { name: 'Ash', code: 'ASH', weight: 0.7 },
      { name: 'Pine', code: 'PINE', weight: 0.5 },
    ],
    Grass: [
      { name: 'Timothy', code: 'TIMOTHY_GRASS', weight: 1.1 },
      { name: 'Bermuda', code: 'BERMUDA', weight: 0.9 },
      { name: 'Bluegrass', code: 'BLUEGRASS', weight: 0.8 },
    ],
    Weed: [
      { name: 'Ragweed', code: 'RAGWEED', weight: 1.3 },
      { name: 'Mugwort', code: 'MUGWORT', weight: 0.7 },
    ],
    Mold: [
      { name: 'Alternaria', code: 'ALTERNARIA', weight: 1.0 },
      { name: 'Cladosporium', code: 'CLADOSPORIUM', weight: 0.8 },
    ],
  }

  const species = speciesMap[typeName] || []
  return species.map((s, i) => {
    const noise = seededRandom(daySeed * 13 + i * 7 + baseIndex * 3) * 1.2 - 0.3
    const idx = clampIndex(baseIndex * s.weight + noise)
    return { name: s.name, code: s.code, index: idx }
  })
}

function getSeverityLabel(index) {
  if (index <= 0.5) return 'low'
  if (index <= 1.5) return 'low'
  if (index <= 2.5) return 'moderate'
  if (index <= 3.5) return 'high'
  return 'very_high'
}

function buildDayData(daysFromNow) {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  const month = date.getMonth() + 1
  const dayOfMonth = date.getDate()
  const daySeed = month * 100 + dayOfMonth + daysFromNow

  const [treeBase, grassBase, weedBase, moldBase] = getSeasonalBaselines(month)

  // Add daily variation
  const dayNoise = (idx) => {
    const n = seededRandom(daySeed * 17 + idx * 11)
    return (n - 0.5) * 1.2
  }

  const treeIndex = clampIndex(treeBase + dayNoise(0))
  const grassIndex = clampIndex(grassBase + dayNoise(1))
  const weedIndex = clampIndex(weedBase + dayNoise(2))
  const moldIndex = clampIndex(moldBase + dayNoise(3))

  const overallIndex = Math.max(treeIndex, grassIndex, weedIndex, moldIndex)

  const types = [
    {
      name: 'Tree',
      index: treeIndex,
      species: getSpeciesForType('Tree', treeIndex, daySeed).map(s => s.name),
      speciesDetail: getSpeciesForType('Tree', treeIndex, daySeed),
      trend: getTrend(treeIndex, daysFromNow),
    },
    {
      name: 'Grass',
      index: grassIndex,
      species: getSpeciesForType('Grass', grassIndex, daySeed).map(s => s.name),
      speciesDetail: getSpeciesForType('Grass', grassIndex, daySeed),
      trend: getTrend(grassIndex, daysFromNow),
    },
    {
      name: 'Weed',
      index: weedIndex,
      species: getSpeciesForType('Weed', weedIndex, daySeed).map(s => s.name),
      speciesDetail: getSpeciesForType('Weed', weedIndex, daySeed),
      trend: getTrend(weedIndex, daysFromNow),
    },
    {
      name: 'Mold',
      index: moldIndex,
      species: getSpeciesForType('Mold', moldIndex, daySeed).map(s => s.name),
      speciesDetail: getSpeciesForType('Mold', moldIndex, daySeed),
      trend: getTrend(moldIndex, daysFromNow),
    },
  ]

  // Peak hours shift slightly by season
  const isSpring = month >= 3 && month <= 5
  const peakStart = isSpring ? 5 : 10
  const peakEnd = isSpring ? 10 : 15
  const peakPeak = isSpring ? 7 : 12

  // Weather varies by day
  const tempBase = month >= 5 && month <= 9 ? 82 : month >= 3 && month <= 4 ? 62 : 38
  const tempNoise = Math.round((seededRandom(daySeed * 23) - 0.5) * 16)
  const humidityBase = month >= 6 && month <= 8 ? 75 : 55
  const humidityNoise = Math.round((seededRandom(daySeed * 29) - 0.5) * 20)
  const windBase = 8
  const windNoise = Math.round(seededRandom(daySeed * 37) * 12)

  return {
    date: getDateStr(daysFromNow),
    overallIndex,
    severity: getSeverityLabel(overallIndex),
    types,
    peakHours: { start: peakStart, end: peakEnd, peak: peakPeak },
    weather: {
      temp: tempBase + tempNoise,
      humidity: Math.max(20, Math.min(95, humidityBase + humidityNoise)),
      wind: windBase + windNoise,
    },
  }
}

export function getTodayData() {
  return buildDayData(0)
}

export function getForecastData() {
  return Array.from({ length: 7 }, (_, i) => buildDayData(i))
}

export function getBoroughData() {
  const today = getTodayData()
  const baseIndex = today.overallIndex

  // Each borough gets a slightly different severity
  const boroughs = [
    { name: 'Manhattan', code: 'manhattan', offset: 0 },
    { name: 'Brooklyn', code: 'brooklyn', offset: -0.3 },
    { name: 'Queens', code: 'queens', offset: 0.2 },
    { name: 'Bronx', code: 'bronx', offset: 0.5 },
    { name: 'Staten Island', code: 'staten_island', offset: -0.5 },
  ]

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )

  return boroughs.map((b) => {
    const noise = (seededRandom(dayOfYear * 7 + b.code.length * 13) - 0.5) * 0.8
    const index = clampIndex(baseIndex + b.offset + noise)
    return {
      name: b.name,
      code: b.code,
      index,
      severity: getSeverityLabel(index),
      dominantType: today.types.reduce((a, c) => (c.index > a.index ? c : a), today.types[0]).name,
    }
  })
}

export function getSeasonalComparison() {
  const now = new Date()
  const month = now.getMonth() + 1
  const dayOfMonth = now.getDate()

  // Generate "this week" data (7 days)
  const thisWeek = Array.from({ length: 7 }, (_, i) => {
    const d = buildDayData(i - 3) // 3 days back, today, 3 days forward
    return { day: i, index: d.overallIndex, date: d.date }
  })

  // Generate "last year" data (same 7 days, different values)
  const lastYear = thisWeek.map((d, i) => {
    const seed = (month * 100 + dayOfMonth + i) * 97 + 2025
    const lastYearBase = getSeasonalBaselines(month)
    const maxBase = Math.max(...lastYearBase)
    const noise = (seededRandom(seed) - 0.5) * 1.5
    return { day: i, index: clampIndex(maxBase + noise - 0.3), date: d.date }
  })

  // Calculate delta
  const thisAvg = thisWeek.reduce((s, d) => s + d.index, 0) / thisWeek.length
  const lastAvg = lastYear.reduce((s, d) => s + d.index, 0) / lastYear.length
  const deltaPct = lastAvg > 0
    ? Math.round(((thisAvg - lastAvg) / lastAvg) * 100)
    : 0

  return {
    thisWeek,
    lastYear,
    thisYearAvg: Math.round(thisAvg * 10) / 10,
    lastYearAvg: Math.round(lastAvg * 10) / 10,
    deltaPct,
    deltaLabel: deltaPct > 0
      ? `${deltaPct}% worse than last year`
      : deltaPct < 0
        ? `${Math.abs(deltaPct)}% better than last year`
        : 'Same as last year',
  }
}
