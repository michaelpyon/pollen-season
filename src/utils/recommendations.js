// Action tips per severity level
export const ACTION_TIPS = {
  0: [],
  1: [
    'Enjoy the outdoors freely today.',
  ],
  2: [
    'Pre-medicate if you know you react to the active species.',
    'Morning jogs are fine, but consider timing around 5 to 10am peak.',
  ],
  3: [
    'Take your antihistamine before heading outside.',
    'Avoid outdoor exercise between 5 and 10am when counts peak.',
    'Keep car and home windows closed.',
    'Wear sunglasses to keep pollen out of your eyes.',
  ],
  4: [
    'Take allergy meds first thing in the morning.',
    'Stay indoors during peak hours (5 to 10am).',
    'Keep all windows shut. Run AC on recirculate.',
    'Shower and change clothes after any time outside.',
    'Consider a nasal rinse before bed.',
    'Dry laundry indoors, not on a line.',
  ],
}

export function getTips(upi) {
  const level = Math.max(0, Math.min(4, Math.round(upi)))
  return ACTION_TIPS[level]
}
