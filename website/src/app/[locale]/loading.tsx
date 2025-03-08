"use client";

import { motion } from "motion/react";

function Loading() {
  return (
    <div className="bg-white dark:bg-black fixed z-999999999999 top-0 left-0 flex justify-center items-center w-full h-full">
      <div className="container max-w-5xl mx-auto relative overflow-hidden">
        <div className="items-center text-center">
          <h1 className="font-dela-gothic-one text-black dark:bg-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-5">
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
  );
}

export default Loading;
