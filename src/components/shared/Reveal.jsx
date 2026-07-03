import { motion } from "framer-motion";
import { EASE } from "../../motion.js";

// Masked line reveal: text slides up out of an overflow-hidden "curtain"
export function MaskLine({ children, delay = 0 }) {
  return (
    <span className="mask-line">
      <motion.span
        className="mask-line__inner"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
