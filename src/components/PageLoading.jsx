import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoading({load}) {


  return (
    <div className="h-screen w-full">
      <AnimatePresence>
        {load && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600"
          >
            <div className="flex flex-col items-center">
              {/* Replace with your logo */}
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-32 h-32 mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.div
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <p className="mt-4 text-white font-medium text-lg">
                Loading, please wait...
              </p>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
}
