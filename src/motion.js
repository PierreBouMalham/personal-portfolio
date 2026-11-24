// Shared motion language - one rhythm across the whole site
export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

// Trigger slightly before an element is fully on screen; `amount: "some"`
// means even very tall blocks reveal as soon as any part shows
export const viewportOnce = { once: true, amount: "some", margin: "0px 0px -8% 0px" };
