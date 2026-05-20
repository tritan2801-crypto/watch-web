import React from "react";
import { motion } from "framer-motion";
import MenuColumn from "./MenuColumn";
import BannerCard from "./BannerCard";
import LimitedEditionGrid from "./LimitedEditionGrid";

export default function MenuContent({ currentTab }) {
  // Animation settings for the active tab transition
  const contentVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const renderContent = () => {
    switch (currentTab.layout) {
      case "three-cols-with-banner":
        return (
          <div className="grid grid-cols-12 gap-8 h-full items-start">
            {/* Columns (Col-Span 9 total) */}
            <div className="col-span-9 grid grid-cols-3 gap-8">
              {currentTab.columns.map((col, idx) => (
                <MenuColumn key={idx} title={col.title} links={col.links} />
              ))}
            </div>

            {/* Banner (Col-Span 3) */}
            {currentTab.banner && (
              <div className="col-span-3 flex justify-end">
                <BannerCard
                  image={currentTab.banner.image}
                  caption={currentTab.banner.caption}
                  cta={currentTab.banner.cta}
                  href={currentTab.banner.href}
                />
              </div>
            )}
          </div>
        );

      case "three-cols-equal":
        return (
          <div className="grid grid-cols-3 gap-8 h-full items-start">
            {currentTab.columns.map((col, idx) => (
              <MenuColumn key={idx} title={col.title} links={col.links} />
            ))}
          </div>
        );

      case "gifting-special":
        return (
          <div className="grid grid-cols-12 gap-8 h-full items-start">
            {/* Left Column */}
            <div className="col-span-4">
              {currentTab.columns.map((col, idx) => (
                <MenuColumn key={idx} title={col.title} links={col.links} />
              ))}
            </div>

            {/* Right Lifestyle Cards */}
            <div className="col-span-8 flex space-x-6 justify-end">
              {currentTab.banners &&
                currentTab.banners.map((banner, idx) => (
                  <BannerCard
                    key={idx}
                    image={banner.image}
                    caption={banner.caption}
                    cta={banner.cta}
                    href={banner.href}
                  />
                ))}
            </div>
          </div>
        );

      case "limited-edition-grid":
        return <LimitedEditionGrid items={currentTab.items} />;

      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {renderContent()}
    </motion.div>
  );
}
