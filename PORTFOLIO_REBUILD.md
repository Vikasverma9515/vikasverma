# Portfolio Rebuild — Technical Specification
## Vikas Verma | AI Product Builder & Full-Stack Developer

---

## 1. Vision & Design Direction

**Goal**: Award-winning creative portfolio with cinematic scroll, immersive visuals, and audio.  
**Inspiration**: Ameen Abdullah, Bruno Simon, Awwwards SOTD winners  
**Vibe**: Dark, cinematic, brutalist typography + fluid animations  
**Accent**: `#FFB800` (golden) on pure black  

---

## 2. Tech Stack

| Layer | Library | Version | Purpose |
|-------|---------|---------|---------|
| Framework | Next.js | 16+ | App Router, SSR |
| Animation | Framer Motion | 12+ | Component animations, scroll-linked |
| Scroll Engine | GSAP + ScrollTrigger | 3.12+ | Complex scroll sequences, pinning |
| Smooth Scroll | Lenis | 1.1+ | Butter-smooth scroll inertia |
| Text Splits | SplitType | 0.3+ | Word/char level animation |
| Audio | use-sound | 4+ | Background music toggle |
| Styling | Tailwind CSS | 4 | Utility-first |
| Icons | react-icons | 5+ | Social + UI icons |

---

## 3. Site Architecture

```
/
├── Loading Screen          ← Entry animation (2s)
├── Hero                    ← Full-screen, floating particles, giant text
├── About                   ← Split-text word reveal, stats counter
├── Skills                  ← Staggered card grid animation
├── Experience              ← Scroll-pinned vertical timeline
├── Projects                ← Horizontal drag carousel (ReactBits ScrollStack style)
├── Open Source             ← Marquee ticker row
└── Contact + Footer        ← Minimal, clean CTA
```

### Persistent UI
- Custom cursor (magnetic on interactive elements)
- Scroll progress bar (top of viewport)
- Noise texture overlay
- Background ambient music toggle (bottom-left)
- Navbar (scroll-aware: hide on down, show on up)

---

## 4. Animation System

### 4.1 Smooth Scroll (Lenis)
```tsx
// providers/SmoothScrollProvider.tsx
import { ReactLenis } from 'lenis/react'

export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  )
}
```

**Key settings:**
- `duration: 1.2` — Feel of glass sliding on silk
- Custom cubic easing: `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `wheelMultiplier: 0.8` — Slightly slower than native for premium feel
- `touchMultiplier: 2` — Responsive on mobile

### 4.2 GSAP ScrollTrigger Patterns

**Text Reveal (used in About, Hero subtitle):**
```tsx
gsap.from(words, {
  opacity: 0, y: 60, stagger: 0.04,
  scrollTrigger: { trigger: container, start: "top 75%", end: "bottom 50%", scrub: 1 }
})
```

**Section Pin (Experience timeline):**
```tsx
ScrollTrigger.create({
  trigger: "#experience",
  pin: true,
  start: "top top",
  end: "+=2000",
  scrub: 1,
})
```

**Horizontal Projects Scroll:**
```tsx
gsap.to(trackRef.current, {
  x: () => -(trackRef.current.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: { trigger: containerRef.current, pin: true, scrub: 1, end: "+=3000" }
})
```

### 4.3 Framer Motion Patterns

**Viewport entry (all sections):**
```tsx
const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}
<motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} />
```

**Stagger children:**
```tsx
const container = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
```

**Parallax (scroll-linked):**
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
```

---

## 5. Custom Cursor

**Behavior:**
- Default: 12px dot (mix-blend-mode: difference)
- On `data-cursor="hover"` elements: Expands to 48px circle, slows down, shows label
- On `data-cursor="drag"`: Shows "DRAG" text
- On links/buttons: Magnetic pull within 80px radius

**Implementation:**
```tsx
// Two-layer cursor:
// 1. Dot (follows mouse exactly, no lag)
// 2. Ring (follows with spring physics)

const springConfig = { damping: 25, stiffness: 300 }
const dotX = useMotionValue(0)
const ringX = useSpring(dotX, springConfig)
```

**CSS:**
```css
* { cursor: none !important; }
.custom-cursor-dot { width: 8px; height: 8px; mix-blend-mode: difference; }
.custom-cursor-ring { width: 40px; height: 40px; mix-blend-mode: difference; }
```

---

## 6. Floating Particle System (Hero)

**Canvas-based particle system (no library needed):**
- 60 particles floating upward with sine wave drift
- Colors: white, #FFB800, purple (match design system)
- Size: 1–4px, random opacity 0.2–0.8
- On mousemove: Particles near cursor repel outward

```tsx
// useParticles hook
// Each particle has: x, y, vx, vy, size, color, opacity, life
// requestAnimationFrame loop
// Canvas 2D context rendering
```

---

## 7. Background Audio

**File**: `/public/music/ambient.mp3` (lofi ambient, ~3min, loops)

**Controls:**
- Bottom-left floating button: 🔇 / 🔊
- Fades in/out on toggle (0.5s volume transition)
- Remembers state in localStorage
- Muted by default (browser autoplay policy)

```tsx
const [play, { stop, sound }] = useSound('/music/ambient.mp3', {
  loop: true,
  volume: 0.3,
  onload: () => console.log('Audio ready')
})
```

---

## 8. Hero Section (Rebuild)

**Layout:** Full-screen, pure black, centered content  
**Background:** Canvas particles + radial gradient glow  
**Typography:** Giant `clamp(80px, 12vw, 160px)` heading

**Animation sequence (on page load):**
1. `0ms` — Black screen
2. `200ms` — "VIKAS" slides up from bottom (y: 100 → 0)
3. `400ms` — "VERMA" slides up (staggered)
4. `600ms` — Subtitle fades in
5. `800ms` — Status badge, CTA buttons fade in
6. `1000ms` — Particle system starts
7. **On scroll** — Text moves upward (parallax), fades out

**Elements:**
- `REC` badge (top-left) with pulsing red dot
- Name in split lines with scramble effect
- Subtitle: "Full-Stack Developer • AI Product Builder"
- CTA: "View Projects →" + GitHub + LinkedIn
- Scroll indicator (bouncing arrow)

---

## 9. Projects Section (Horizontal Carousel)

**Behavior:**
- Section pins to viewport for 3000px of scroll
- Cards slide horizontally left as user scrolls down
- Cursor changes to "DRAG" on hover
- Each card: 600×450px, border-radius 24px

**Card hover:**
- Scale up 1.03
- Shows project link overlay
- Chromatic aberration filter (glitch effect)

```tsx
// GSAP horizontal scroll
gsap.to(trackRef.current, {
  x: () => -(trackRef.current.scrollWidth - window.innerWidth + 200),
  ease: "none",
  scrollTrigger: {
    trigger: containerRef.current,
    pin: true, scrub: 1,
    end: () => "+=" + (trackRef.current.scrollWidth - window.innerWidth + 200)
  }
})
```

---

## 10. Performance Checklist

| Item | Method |
|------|--------|
| GPU-only animation | transform + opacity only |
| Layout thrashing | Batch reads before writes |
| GSAP cleanup | Kill all ScrollTriggers on unmount |
| Lenis + GSAP sync | `lenis.on('scroll', ScrollTrigger.update)` |
| Image optimization | Next.js `<Image>` with sizes prop |
| Code splitting | `dynamic()` imports for heavy components |
| Font loading | `next/font/google` with `display: swap` |
| Audio loading | Lazy-load, async, user-gesture-gated |
| Reduced motion | `@media (prefers-reduced-motion)` respected |

---

## 11. File Structure

```
app/
├── providers/
│   └── SmoothScrollProvider.tsx     ← Lenis root provider
├── components/
│   ├── cursor/
│   │   └── CustomCursor.tsx         ← Two-layer magnetic cursor
│   ├── audio/
│   │   └── AudioPlayer.tsx          ← Music toggle button
│   ├── ui/
│   │   ├── ScrollProgress.tsx       ← Top progress bar
│   │   └── MagneticButton.tsx       ← Magnetic hover wrapper
│   ├── Hero.tsx                     ← Particles + giant text
│   ├── About.tsx                    ← Word-by-word reveal
│   ├── Skills.tsx                   ← Staggered grid
│   ├── Experience.tsx               ← Pinned timeline
│   ├── Projects.tsx                 ← Horizontal drag
│   ├── Contact.tsx                  ← Clean CTA
│   ├── Navbar.tsx                   ← Scroll-aware
│   ├── Footer.tsx                   ← Minimal
│   └── LoadingScreen.tsx            ← Entry animation
├── hooks/
│   ├── useScramble.tsx              ← (existing)
│   ├── useMagnet.tsx                ← Magnetic button hook
│   └── useParticles.tsx             ← Canvas particle hook
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## 12. Deployment Notes

- **Vercel**: Enable Speed Insights and Web Analytics
- **Audio**: Must be user-gesture triggered (button click), not autoplay
- **GSAP**: Install `gsap` (free tier includes ScrollTrigger)
- **Lenis**: Use `lenis/react` sub-package for Next.js integration
- **Bundle size**: Target < 250kb JS (gzipped). Use `@next/bundle-analyzer` to audit.

---

## 13. Inspiration & References

- [Ameen Abdullah Portfolio](https://ameenabdullah.com) — Island 3D, Japanese/English, live cam
- [Bruno Simon](https://bruno-simon.com) — Three.js 3D interactive world  
- [Awwwards Portfolio Winners](https://www.awwwards.com/websites/portfolio/)
- [CSSDA Best Portfolios](https://www.cssdesignawards.com/categories/portfolio)
- [ReactBits.dev](https://reactbits.dev) — Pre-built React animation components
- [GSAP ScrollTrigger Demos](https://gsap.com/showcase/)
- [Lenis Documentation](https://lenis.darkroom.engineering/)
- [Motion.dev (Framer Motion)](https://motion.dev/)
