import { MapPin, Star, Wifi, Car, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/app/utils/ImageWithFallback";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { fadeUp, scaleIn, stagger } from "@/app/components/ui/animation";
import { cn } from "./ui/utils";

const amenityIcons: Record<string, React.ElementType> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Breakfast: Coffee,
  Valet: Car,
  Kitchen: Coffee
};

export function AccommodationSection() {
  const { t } = useTheme();
  const { accommodation } = useSiteContent();
  const hotels = accommodation?.hotels ?? [];

  return (
    <section
      id="accommodation"
      className="relative py-24 overflow-hidden"
      style={{ background: t.sectionBgAlt2, transition: "background 0.4s ease" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: t.topDivider }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: `rgba(${t.accentRgb},0.4)` }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: t.goldAccent
              }}
              className="uppercase text-xs tracking-widest"
            >
              {accommodation.sectionLabel}
            </span>
            <div
              className="h-px w-12"
              style={{ background: `rgba(${t.accentRgb},0.4)` }}
            />
          </div>

          <h2
            className="uppercase mb-3"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: t.textPrimary
            }}
          >
            {accommodation.headingPlain}{" "}
            <span
              style={{
                backgroundImage: t.titleGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {accommodation.headingAccent}
            </span>
          </h2>

          <p
            className="max-w-lg mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: t.textMuted
            }}
          >
            {accommodation.description}
          </p>
        </motion.div>

        {/* Partner Banner (HIDDEN) */}
        {/* <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 mb-8 p-4 rounded-xl max-w-2xl mx-auto"
          style={{
            background: t.accomPartnerBg,
            border: `1px solid ${t.accomPartnerBorder}`
          }}
        >
          <Check size={18} style={{ color: t.goldAccent }} />
          <p
            className="text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: t.textSecondary
            }}
          >
            Hotels marked with{" "}
            <strong style={{ color: t.goldAccent }}>Partner Rate</strong> offer
            discounted pricing. Use code{" "}
            <strong style={{ color: t.goldAccent }}>
              {accommodation.partnerCode}
            </strong>
          </p>
        </motion.div> */}

        {/* Hotels */}
        <motion.div
          variants={stagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.name}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden group"
              style={{
                background: t.accomCardBg,
                border: `1px solid ${t.accomCardBorder}`,
                willChange: "transform"
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={hotel.imgUrl}
                  alt={hotel.name}
                  className={cn("w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", hotel.imgPosition)}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: t.accomCardImgGradient }}
                />

                {/* Badge */}
                {hotel.badge && (
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                    style={{
                      background: `${hotel.badgeColor}`,
                      border: `1px solid ${hotel.badgeColor}60`,
                      color: hotel.badgeTextColor,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600
                    }}
                  >
                    {hotel.badge}
                  </div>
                )}

                {hotel.partnerRate && (
                  <div
                    className="absolute top-3 left-3 px-2 py-1 rounded text-xs uppercase tracking-wider"
                    style={{
                      background: "rgba(232,192,51,0.9)",
                      color: "#080B1A",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700
                    }}
                  >
                    Partner Rate
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: t.textPrimary
                      }}
                    >
                      {hotel.name}
                    </h3>

                    <p
                      className="text-sm mt-0.5"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.05em",
                        color: "rgba(232,192,51,0.8)"
                      }}
                    >
                      {hotel.category}
                    </p>
                  </div>

                  {hotel.stars > 0 && (
                    <div className="flex gap-0.5 shrink-0 mt-1">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={t.goldAccent}
                          style={{ color: t.goldAccent }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p
                  className="text-sm mb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: t.textMuted
                  }}
                >
                  {hotel.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={13} style={{ color: t.textDim }} />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: t.textVeryMuted
                    }}
                  >
                    {hotel.distance}
                  </span>
                  <span style={{ color: t.textDim }}>·</span>
                  <span
                    className="text-base tracking-wide"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 500,
                      color: t.goldAccent
                    }}
                  >
                    {hotel.price}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {hotel.amenities?.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                      <motion.span
                        key={amenity}
                        variants={fadeUp}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                        style={{
                          background: t.accomAmenityBg,
                          border: `1px solid ${t.accomAmenityBorder}`,
                          color: t.accomAmenityColor,
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        <Icon size={10} />
                        {amenity}
                      </motion.span>
                    );
                  })}
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={hotel.bookUrl}
                  target="_blank"
                  className="block w-full py-2.5 rounded text-center text-sm uppercase tracking-wider cursor-pointer"
                  style={{
                    background: hotel.partnerRate
                      ? t.ctaGradient
                      : t.accomAmenityBg,
                    color: hotel.partnerRate
                      ? t.ctaText
                      : t.textPrimary,
                    border: hotel.partnerRate
                      ? "none"
                      : `1px solid ${t.cardBorder}`,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700
                  }}
                >
                  {hotel.partnerRate
                    ? "Book with Partner Rate"
                    : "View Options"}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="text-center text-sm mt-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: t.textDim
          }}
        >
          {accommodation.footnote}
        </motion.p>
      </motion.div>
    </section>
  );
}
