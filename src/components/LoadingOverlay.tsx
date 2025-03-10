"use client";

import { motion, AnimatePresence } from "motion/react";
import useAssetsLoaded from "@/hooks/useAssetsLoaded";

const LoadingOverlay = () => {
  const isLoaded = useAssetsLoaded();

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="loading-overlay"
          className="fixed inset-0 top-0 left-0 flex items-center justify-center bg-white dark:bg-black z-999999999999"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            // y: "-100%", // ← 左にスライド（"100%" にすると右へ）
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="bg-white dark:bg-black fixed flex justify-center items-center w-full h-full">
            <div className="container max-w-5xl mx-auto relative overflow-hidden">
              <div className="items-center text-center">
                <h1 className="font-dela-gothic-one text-black dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-5">
                  ScProfile
                </h1>
                <motion.div
                  className="bg-black dark:bg-white h-[2px]"
                  initial={{ width: 0, opacity: 1 }}
                  animate={{ width: "100%", opacity: [1, 1, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
