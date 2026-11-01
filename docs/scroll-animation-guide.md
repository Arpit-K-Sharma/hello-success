# Scroll-as-Video Guide

How the "scroll plays a video" effect works in this site, and how to extend it with 3D models and rendered frame sequences.

## 1. How it works here

```
ScrollStory (section, pinned)          src/components/ScrollStory.tsx
 ├─ GSAP ScrollTrigger, scrub: 0.6     scroll position → timeline position
 ├─ progress ref (0 → 1)               shared through useScrollProgress()
 └─ children (your markup)
     ├─ [data-beat="n"]                copy blocks that cross-fade in order
     ├─ [data-scrub-step]              items that light up one by one
     ├─ [data-scrub-bar]               a bar that grows 0 → 1 (scaleY)
     ├─ [data-dot="n"]                 indicators (gets data-active)
     └─ visual                         reads progress every frame:
         ├─ HeroScene (React Three Fiber, procedural 3D)
         └─ FrameSequence (canvas image sequence)
```

**The key idea:** the scroll position *is* the playhead.
- `ScrollStory` makes its section `screens × 100svh` tall and pins its content with CSS `position: sticky`.
- GSAP maps scroll distance to a timeline, and also writes scroll progress into a **ref**.
- Visuals read that ref inside their own animation loop (`useFrame` or `requestAnimationFrame`). React never re-renders on scroll, which is why it stays at 60fps.

`screens` controls the playback speed. A larger number means more scrolling per beat, which makes it slower and more cinematic. Current settings:
- hero = `4` (3 beats)
- each outcome chapter = `2.5`

### Fallbacks (built in)
`SCRUB_QUERY = (min-width: 1024px) and (prefers-reduced-motion: no-preference)`.

When that query doesn't match (phones, tablets, or users who asked for reduced motion):
- there is no pinning.
- every beat and step is fully visible as a normal page.
- progress stays at `1`, so visuals show their final state.

The CSS half of this is in `globals.css` under `[data-story]`. **If you change one, change the other.**

### Add a new scroll scene
```tsx
<ScrollStory id="my-scene" screens={3}>
  <div className="shell grid h-full items-center lg:grid-cols-2">
    <div data-beats>
      <div data-beat="0">First message</div>
      <div data-beat="1">Second message</div>
      <div data-beat="2">Third message</div>
    </div>
    <div className="relative h-[60svh] lg:h-full">
      <MyVisual /> {/* client component calling useScrollProgress() */}
    </div>
  </div>
</ScrollStory>
```
Inside `MyVisual`:
```tsx
const progress = useScrollProgress();          // RefObject<number>
useFrame(() => { mesh.current.rotation.y = progress.current * Math.PI * 2; });
```
Map sub-ranges with `THREE.MathUtils.smoothstep(p, start, end)`. `HeroScene.tsx` shows the pattern: converge from 0 to 0.45, links from 0.3 to 0.6, rings from 0.55 to 0.85. Line each range up with the copy beats.

---

## 2. Option A: rendered frame sequences (the "Apple product page" look)

Use this when you want photoreal or cinematic footage, such as a product render, a fly-through or brand film. The video is exported as numbered images, and the canvas draws the frame that matches the scroll position.

> Why images and not `<video>`? Seeking a video file on scroll is jerky in most browsers, because browsers only seek cleanly to keyframes. Images are frame-exact.

### 2.1 Make the footage
Any of these work:

| Tool | Good for | Export |
|---|---|---|
| **Blender** (free) | 3D product shots, abstract tech scenes, camera fly-throughs | Output Properties → PNG sequence, or render to MP4 |
| **Spline** (spline.design) | Quick, stylised 3D without Blender skills | Export → Video (MP4) |
| **After Effects / Premiere** | Motion graphics, brand animation, UI walkthroughs | Render queue → PNG sequence or MP4 |
| **Stock footage** (Pexels, Envato, Artgrid) | Fast placeholder for the board | MP4 download |
| **AI video** (Runway, Sora, Veo, Kling) | Concept shots from a prompt | MP4 |

Creative rules that make it feel like video:
- **One continuous camera move.** Avoid cuts, because scrubbing backwards across a cut looks broken.
- **Start and end on a calm frame.** These are what visitors see before and after the pin.
- **Leave negative space on the left** (in this layout) for the copy beats.
- **Use a dark background matching `--color-void` (`#05070b`)** so the edges blend into the page.

### 2.2 Convert to web frames with ffmpeg
```bash
# 1. Pick a frame count. 90–150 frames is the sweet spot for a 3–4 screen scene.
#    A 5 s clip at 30 fps = 150 frames.
mkdir -p public/frames/hero
ffmpeg -i hero.mp4 -vf "fps=30,scale=1600:-2" -c:v libwebp -quality 72 -start_number 1 public/frames/hero/%04d.webp

# Optional mobile set: smaller and fewer frames
ffmpeg -i hero.mp4 -vf "fps=15,scale=900:-2" -c:v libwebp -quality 65 -start_number 1 public/frames/hero-mobile/%04d.webp
```
Requirements:
- **Naming:** `0001.webp`, `0002.webp` and so on. Four digits, starting at 1. `FrameSequence` expects exactly this.
- **Budget:** aim for under **60 KB per frame** and under **8 MB total**. Check with `du -sh public/frames/hero`. Lower `-quality` or the width if it's over.
- **Count:** `ls public/frames/hero | wc -l` gives the `count` value.

### 2.3 Switch the hero to frames
In `src/content/site.ts`:
```ts
frames: { dir: "/frames/hero", count: 150, ext: "webp" },
```
The 3D scene is replaced automatically (see `HeroVisual.tsx`). Set it back to `null` to return to 3D.

To use a sequence elsewhere, render `<FrameSequence dir=… count=… ext=… />` inside any `ScrollStory`. It must be imported through `next/dynamic` with `ssr: false`, as in `HeroVisual.tsx`.

### 2.4 How `FrameSequence` behaves
- It preloads every frame on mount, and the browser decodes them asynchronously.
- Each animation frame, it computes `index = round(progress × (count − 1))` and draws only when the index changes.
- It draws like `object-fit: cover` and is DPR-aware, capped at 2×.

**Upgrade path if frames pop in on slow networks:** preload the first 10 frames, then the rest on idle (`requestIdleCallback`), and show frame 1 as a poster until the set is ready.

---

## 3. Option B: real-time 3D models

Use this when the visual should react live: rotate, respond to the pointer, recolour by section. That's what the hero does now with procedural geometry. To use a designed model instead:

### 3.1 Get or make a model
- **Formats:** use **glTF/GLB** only, the "JPEG of 3D". Convert FBX, OBJ and Blend files in Blender (File → Export → glTF 2.0, GLB, "Apply Modifiers" on).
- **Sources:**
  - Sketchfab (filter "Downloadable", check the licence)
  - Poly Pizza (CC0 low-poly)
  - Quaternius (CC0)
  - Spline (export as glTF)
  - your own Blender work
- **Keep it light:** under **50k triangles** and under **2 MB** after compression, with textures at 1024px or smaller.

### 3.2 Compress
```bash
npx @gltf-transform/cli optimize model.glb public/models/core.glb --compress draco --texture-compress webp --texture-size 1024
```

### 3.3 Load it
```bash
npm i @react-three/drei   # not installed yet; add it when you use a model
```
```tsx
import { useGLTF } from "@react-three/drei";

function Core() {
  const { scene } = useGLTF("/models/core.glb");
  const ref = useRef<THREE.Group>(null);
  const progress = useScrollProgress();
  useFrame(() => {
    ref.current!.rotation.y = progress.current * Math.PI * 2;
    ref.current!.position.z = THREE.MathUtils.lerp(-2, 0, progress.current);
  });
  return <primitive ref={ref} object={scene} />;
}
useGLTF.preload("/models/core.glb");
```
- Put it inside the `<Canvas>` in `HeroScene.tsx`, wrapped in `<Suspense fallback={null}>`.
- Lit models need lights. Add `<ambientLight intensity={0.6} />` and `<directionalLight position={[3, 5, 2]} />`, or drei's `<Environment preset="city" />` for reflections.

### 3.4 Camera moves (the "video" feel in 3D)
Animate the **camera**, not just the object, for a cinematic result:
```tsx
useFrame(({ camera }) => {
  const p = progress.current;
  camera.position.set(Math.sin(p * Math.PI) * 4, 1 + p, 10 - p * 4);
  camera.lookAt(0, 0, 0);
});
```
**Smoothing:** always damp towards the target (`THREE.MathUtils.damp`, see `HeroScene.tsx`) so a fast scroll-wheel flick still glides.

---

## 4. Performance budget and checklist

| Item | Budget / rule |
|---|---|
| JavaScript for 3D | Loaded only via `next/dynamic(..., { ssr: false })` |
| Off-screen rendering | Paused (`frameloop="never"` via IntersectionObserver in `HeroScene`) |
| Device pixel ratio | Capped at 1.75–2 |
| Frames per scene | 90–150, under 8 MB total |
| GLB per model | Under 2 MB, Draco-compressed |
| Scroll handlers | Never `setState` on scroll; write to refs |
| Reduced motion | Must show a sensible static final state |
| Mobile | No pinning; visuals render the final state at 60svh height |

Before showing the board:
1. `npm run build` passes.
2. Chrome DevTools → Performance: scroll the hero and confirm no long tasks over 50 ms.
3. DevTools → Rendering → "Emulate prefers-reduced-motion: reduce": the page reads top to bottom with nothing hidden.
4. Test at 390 px wide: no horizontal scroll and every beat readable.
5. Throttle the network to "Fast 4G": frames or models should fill in without layout jumps.

## 5. Where to go next
- **Smooth wheel scrolling:** add `lenis` and call `ScrollTrigger.update` from its `scroll` event, but only if trackpad or wheel scrubbing feels steppy. Native scroll is fine today.
- **Post-processing glow:** `@react-three/postprocessing` `<Bloom>` makes the core and rings glow. It costs GPU, so test on a laptop.
- **Per-section scenes:** each outcome chapter could get its own small 3D object, such as a funnel for Grow, a chat bubble for Serve and gears for Run. Use the same `useScrollProgress()` pattern.
