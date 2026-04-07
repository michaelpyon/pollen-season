# Pollen Season -- Design Token Reference

Data journalism aesthetic (NYT interactive style). NYC-specific pollen tracker.
Cream background, teal primary, 5-level severity scale from calm to urgent.

## Typography

| Token | Value | Usage |
|---|---|---|
| `--font-body` | Plus Jakarta Sans, system-ui, sans-serif | All body text |
| `--font-mono` | Plus Jakarta Sans, ui-monospace, monospace | Monospace / data readouts |

Weight scale: 400 (regular), 500 (medium), 700 (bold), 800 (extrabold).
Section labels use 10px uppercase bold with `tracking-[0.1em]`.

## Color Palette

### Backgrounds

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#fbf9f4` | Page background (cream) |
| `--color-surface` | `#f5f4ed` | Card backgrounds |
| `--color-surface-hover` | `#efeee7` | Card hover state |
| `--color-surface-high` | `#e9e8e1` | Elevated surface, inactive bar fill |
| `--color-bg-glass` | `rgba(251,249,244,0.7)` | Frosted glass navbar |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--color-text` | `#31332e` | Primary body text (dark olive) |
| `--color-text-muted` | `#5e6059` | Secondary text, descriptions |
| `--color-text-subtle` | `#7a7b75` | Tertiary text, section labels |
| `--color-text-disabled` | `rgba(49,51,46,0.4)` | Inactive nav labels |

### Primary (Teal)

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#3a666a` | Primary actions, links, active states |
| `--color-primary-container` | `#bdebef` | Light teal container fill |
| `--color-on-primary` | `#e7fdff` | Text on primary backgrounds (button text, toggle knob) |
| `--color-on-primary-container` | `#2c585c` | Text on primary-container |
| `--color-primary-alpha` | `rgba(58,102,106,0.1)` | Active nav highlight background |

### Borders and Dividers

| Token | Hex | Usage |
|---|---|---|
| `--color-border` | `rgba(49,51,46,0.1)` | Card outlines (1px ring) |
| `--color-border-hover` | `rgba(49,51,46,0.18)` | Hovered card outlines |
| `--color-divider` | `rgba(49,51,46,0.08)` | Progress bar tracks, inactive gauge segments |
| `--color-shadow` | `rgba(49,51,46,0.05)` | Soft box shadows |

### Focus and Selection

| Token | Value | Usage |
|---|---|---|
| `--color-focus-ring` | `var(--color-primary)` | 2px focus outline |
| `--color-selection` | `rgba(58,102,106,0.15)` | Text selection highlight |

## Severity Scale (5 levels)

The core data visualization system. Maps UPI (Universal Pollen Index) to color.
Each level has 3 variants: base (text/icon), light (container fill), bg (subtle background).

| Level | Label | Base | Light | Background | Meaning |
|---|---|---|---|---|---|
| 0 | Clear | `#3a666a` | `#bdebef` | `#eef7f8` | No pollen activity |
| 1 | Low | `#3a666a` | `#bdebef` | `#eef7f8` | Minimal, safe for most |
| 2 | Moderate | `#9A7B4F` | `#f5ecd8` | `#f8f3ea` | Some may feel symptoms |
| 3 | High | `#855335` | `#ffdbc9` | `#fef3ec` | Most allergy sufferers affected |
| 4 | Very High | `#a83836` | `#fce4e4` | `#fdf0f0` | Stay indoors if sensitive |

Gradient progression: teal (calm) -> warm gold (caution) -> peach (warning) -> red-brown (urgent).

### Severity RGB Helper

| Token | Value | Usage |
|---|---|---|
| `--color-severity-3-rgb` | `133, 83, 53` | Dynamic opacity (e.g., peak hours bar intensity) |

## Plant Accent Colors

Used in the bloom calendar to distinguish species by visual category.

| Token | Hex | Plant |
|---|---|---|
| `--color-primary` | `#3a666a` | Elm, Maple, Ash (common trees) |
| `--color-plant-birch` | `#4d7a7e` | Birch (lighter teal) |
| `--color-plant-pine` | `#49664e` | Pine (forest green) |
| `--color-severity-2` | `#9A7B4F` | Grass species (warm gold) |
| `--color-severity-3` | `#855335` | Oak, Mugwort (warm brown) |
| `--color-severity-4` | `#a83836` | Ragweed (red-brown, high allergen) |

## Animation Constants

Defined in `src/constants/theme.js`. Framer Motion variants.

| Export | Type | Usage |
|---|---|---|
| `entrance` | variant | Fade up + blur reveal (0.5s, expo ease) |
| `stagger` | variant | Parent stagger container (80ms between children) |
| `listStagger` | variant | Tighter stagger for lists (50ms) |
| `exitVariant` | variant | Fade out on unmount (150ms) |
| `spring` | transition | Zero-bounce spring (300ms) |
| `press` | whileTap | Scale to 0.96 on press |

Easing curve: `[0.16, 1, 0.3, 1]` (expo out). Used consistently across all entrance animations.

## Card Pattern

Standard card: `rounded-2xl` with `backgroundColor: var(--color-surface)` and `boxShadow: 0 0 0 1px var(--color-border)`.
No drop shadows on cards. Border is a 1px ring using box-shadow, not CSS border.

## Accessibility

- `prefers-reduced-motion: reduce` disables all animations
- Focus ring: 2px solid primary, 2px offset
- Scrollbar: 6px thin, translucent thumb
- Minimum touch target: 44px (buttons use py-3.5 / py-3)
