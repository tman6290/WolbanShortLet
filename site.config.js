/**
 * site.config.js — Wolban Short Lets
 * ─────────────────────────────────────
 * All site-wide configurable values live here.
 * Never hard-code contact details, links, or keys directly in HTML.
 * To update any info, edit ONLY this file.
 */
const SITE_CONFIG = Object.freeze({

  /** Brand */
  name:     "Wolban Short Lets",
  tagline:  "Stay a While, Feel at Home.",
  description:
    "Luxury short-let apartments in Ikeja, Lagos. Experience the perfect blend " +
    "of comfort and elegance with our Vintage and Contemporary apartments.",

  /** Business address & contact */
  contact: Object.freeze({
    addressLine1: "1 Akin Lakanu Close, Adeniyi Jones",
    addressLine2: "Ikeja, Lagos, Nigeria, 101245",
    phone:        "+2348033003352",
    phoneDisplay: "+234 803 300 3352",
    email:        "info@wolbantravels.com",
    whatsapp:     "+2348033003352",          // number only, no spaces/dashes
  }),

  /** Social media */
  social: Object.freeze({
    facebook:  "https://www.facebook.com/WolbanTravelsandTours/",
    instagram: "https://www.instagram.com/wolbantravels",
  }),

  /** Third-party embeds  ← keep these out of HTML so they're easy to rotate */
  embeds: Object.freeze({
    contactForm: "https://docs.google.com/forms/d/e/1FAIpQLSe--RwzNnJs4fHD6NT--K5NsbnLmpEw5EUfr856tqbuDTgsng/viewform?usp=publish-editor", // TODO: Add new Google Form URL here once created
  }),

  /** Derived / computed */
  get copyright() {
    return `&copy; ${new Date().getFullYear()} Wolban Short Lets. All rights reserved.`;
  },
});
