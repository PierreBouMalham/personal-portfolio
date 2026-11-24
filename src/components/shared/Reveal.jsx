import { motion } from "framer-motion";
import { EASE } from "../../motion.js";

// Masked line reveal: text slides up out of an overflow-hidden "curtain".
// The in-view check runs on the outer wrapper: the inner line starts fully
// clipped by the mask, so observing it directly would never fire.
export function MaskLine({ children, delay = 0 }) {
  return (
    <motion.span
      className="mask-line"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    >
      <motion.span
        className="mask-line__inner"
        variants={{
          hidden: { y: "115%" },
          visible: { y: "0%", transition: { duration: 0.9, delay, ease: EASE } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
