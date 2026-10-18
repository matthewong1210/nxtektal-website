import { describe, expect, it } from "vitest";

import { CONTACT, FEATURES, FEATURES_NOTE, GALLERY_NOTE, HERO_STATS, IMAGES, ME74A, ME74A_PRODUCT, ME74A_ROUTE, SPEC_GROUPS, SPEC_NOTE } from "../products/me74a";

const rows = SPEC_GROUPS.flatMap((g) => g.rows);
const row = (name: string) => rows.find((r) => r.name === name)!;
const corpus = [
  ME74A.name, ME74A.nativeName, ME74A.category, ME74A.summary, ME74A.relationship, FEATURES_NOTE, GALLERY_NOTE, SPEC_NOTE,
  CONTACT.body, CONTACT.heading, CONTACT.cta, ME74A_PRODUCT.job,
  ...FEATURES.flatMap((f) => [f.title, f.body]),
  ...IMAGES.flatMap((i) => [i.alt, i.caption, i.label]),
  ...SPEC_GROUPS.flatMap((g) => [g.title, ...g.rows.flatMap((r) => [r.name, r.value, r.note ?? ""])]),
].join(" ");
const lower = corpus.toLowerCase();

describe("ME74A identity and relationship", () => {
  it("is YAWIN's fairway mower, not a greens mower, with NXTektal's plan stated as a plan", () => {
    expect(ME74A.brand).toBe("YAWIN");
    expect(ME74A.model).toBe("ME74A");
    expect(ME74A.name).toBe("ME74A Robotic Fairway Mower");
    expect(ME74A.nativeName).toBe("ME74A 智能球道割草机器人");
    expect(ME74A_ROUTE).toBe("/products/me74a");
    expect(ME74A.relationship).toContain("a YAWIN (亚云) product");
    expect(ME74A.relationship).toContain("not a greens mower");
    expect(ME74A.relationship).toContain("plans to extend");
    expect(lower.split("not a greens mower").join("")).not.toContain("greens mower");
    for (const banned of ["all turf", "any turf", "every turf", "all-terrain", "all terrain"]) expect(lower).not.toContain(banned);
  });

  it("claims no completed integration, customer deployment, orders, hardware authorship, dealership or agreement", () => {
    expect(ME74A.relationship).toContain("not yet integrated with NXTektal’s software");
    expect(ME74A.relationship).toContain("no customer deployment");
    expect(ME74A.relationship).toContain("takes no orders");
    expect(FEATURES_NOTE).toContain("not NXTektal software");
    for (const banned of [
      "fully integrated", "integration is complete", "integrated with nxtektal’s software today", "runs on nxtektal", "deployed at", "in service at", "in operation at",
      "orders open", "order now", "available to order", "accepting orders", "pre-order",
      "developed jointly", "co-developed", "jointly developed", "designed by nxtektal", "built by nxtektal", "manufactured by nxtektal", "nxtektal hardware",
      "authorised dealer", "authorized dealer", "dealer", "distributor", "agreement", "signed", "contracted", "exclusive", "partnership",
    ]) {
      expect(lower).not.toContain(banned);
    }
    // "integrated" appears only in negated form
    expect(lower.split("not yet integrated").join("").split("not integrated").join("")).not.toContain("integrated");
  });

  it("presents the features as the manufacturer's hardware description, with reel (not rotary) cutting units", () => {
    expect(FEATURES).toHaveLength(4);
    expect(FEATURES.map((f) => f.title)).toEqual(["Cutting system", "Positioning and perception", "Automatic operation and cross-area travel", "Battery and recharging"]);
    expect(FEATURES_NOTE.toLowerCase()).toContain("manufacturer’s description");
    expect(FEATURES[0].body).toContain("Three reel cutting units");
    expect(FEATURES[0].body).toContain("brushless DC motor");
    expect(FEATURES[2].body).toContain("The manufacturer describes");
    expect(FEATURES[2].body).toContain("Routes and site fit are confirmed per course");
    expect(FEATURES[3].body).toContain("The manufacturer describes automatic return to the charging station");
    expect(lower).not.toContain("rotary");
    for (const banned of ["centimetre accuracy", "centimeter accuracy", "cm accuracy", "collision-free", "collision free", "never collides", "cannot collide"]) expect(lower).not.toContain(banned);
  });
});

describe("ME74A specification boundaries", () => {
  it("leads with the three hero figures", () => {
    expect(HERO_STATS.map((s) => `${s.value}${s.unit ? " " + s.unit : ""}`)).toEqual(["1.88 m", "10–60 mm", "3"]);
    expect(HERO_STATS[2].label).toBe("Reel cutting units");
  });

  it("holds every value from the owner's spec table, grouped as given", () => {
    expect(SPEC_GROUPS.map((g) => g.title)).toEqual(["Cutting system", "Work rate", "Battery and charging", "Positioning and perception", "Travel and drive", "Gradient", "Dimensions and weight", "Protection and warranty"]);
    expect(row("Cutting width").value).toBe("1.88 m");
    expect(row("Cutting height").value).toBe("10–60 mm");
    expect(row("Reel cutting units").value).toBe("3");
    expect(row("Reel diameter").value).toBe("203.2 mm (8 in)");
    expect(row("Reel drive").value).toBe("Independent brushless DC motors");
    expect(row("Rated mowing rate").value).toBe("8,000 m²/h");
    expect(row("Rated area per charge").value).toBe("60,000 m²");
    expect(row("Rated run time on a full charge").value).toBe("8–9 h");
    expect(row("Battery type").value).toBe("Lithium iron phosphate (LiFePO₄)");
    expect(row("Battery rating").value).toBe("48 V / 450 Ah");
    expect(row("Rated charging time").value).toBe("4.5 h");
    expect(row("Charging").value).toContain("Wired plug-in and wireless contactless options");
    expect(row("Positioning").value).toBe("Dual-antenna RTK with virtual boundaries");
    expect(row("Obstacle detection").value).toBe("3D lidar, full-colour camera, ultrasonic sensors");
    expect(row("Maximum travel speed").value).toBe("9 km/h");
    expect(row("Drive").value).toBe("Three independent drive motors");
    expect(row("Steering and control").value).toBe("Wide-angle rear-wheel steering with torque vectoring");
    expect(row("Tyres").value).toBe("Turf tyres");
    expect(row("Maximum travel gradient").value).toBe("60% (about 31°)");
    expect(row("Maximum mowing gradient").value).toBe("44% (about 24°)");
    expect(row("Length × width × height").value).toBe("2.78 × 1.98 × 1.56 m");
    expect(row("Weight").value).toBe("950 kg");
    expect(row("Ingress protection").value).toBe("IP65");
    expect(row("Warranty period").value).toContain("2 years");
    expect(rows).toHaveLength(24);
  });

  it("keeps travel and mowing figures apart, and the ratings as the manufacturer's", () => {
    expect(row("Maximum travel gradient").note).toBe("Manufacturer rating for travel only.");
    expect(row("Maximum mowing gradient").note).toBe("Manufacturer rating for mowing.");
    expect(lower).not.toMatch(/mow\w*\s+(on|at|up to)\s+(a\s+)?60\s?%/);
    expect(lower).not.toMatch(/60\s?%\s+(mowing|cutting)/);
    expect(row("Maximum travel speed").note).toContain("not a sustained mowing speed");
    expect(lower).not.toMatch(/mow\w*\s+(at|speed of)\s+9\s?km/);
    expect(row("Rated mowing rate").note).toContain("Manufacturer rating, not measured or guaranteed by NXTektal");
    expect(row("Rated area per charge").note).toContain("Manufacturer rating");
    expect(row("Rated run time on a full charge").note).toContain("Manufacturer rating");
    expect(SPEC_NOTE).toContain("manufacturer’s product literature (YAWIN)");
    expect(SPEC_NOTE).toContain("turf conditions, slope, route, weather and the delivered configuration");
  });

  it("keeps the charging, energy, reel-length and round-the-clock boundaries", () => {
    expect(row("Rated charging time").note).toContain("configuration is to be confirmed");
    for (const banned of ["under 4.5", "< 4.5", "<4.5", "less than 4.5", "within 4.5", "guaranteed under"]) expect(lower).not.toContain(banned);
    expect(lower).not.toMatch(/\b\d+(\.\d+)?\s?kwh?\b/); // no 21.6 kW / kWh energy total
    expect(lower).not.toContain("千瓦");
    for (const banned of ["27 in", "27″", "27\"", "680 mm", "reel length"]) expect(lower).not.toContain(banned);
    for (const banned of ["24/7", "24 hours", "around the clock", "round-the-clock", "unattended", "unmanned", "fully autonomous", "no operator", "without an operator"]) expect(lower).not.toContain(banned);
    expect(row("Charging").note).toContain("neither option is assumed to be included");
    for (const banned of ["charging station included", "includes a charging station", "comes with", "as standard", "standard wireless", "wireless charging is standard", "ships with"]) expect(lower).not.toContain(banned);
    // the charging station appears only inside the manufacturer-described feature
    const mentions = corpus.split("charging station").length - 1;
    expect(mentions).toBe(1);
    expect(FEATURES[3].body).toContain("charging station");
  });

  it("does not expand IP65 or decide the warranty provider, and omits marketing figures", () => {
    expect(row("Ingress protection").note).toBe("As marked by the manufacturer.");
    for (const banned of ["waterproof", "water-proof", "submersion", "submersible", "all-weather", "all weather", "weatherproof", "rainproof", "certified", "certification", "ip67", "ip68"]) expect(lower).not.toContain(banned);
    expect(row("Warranty period").note).toContain("delivery contract");
    for (const banned of ["nxtektal warranty", "yawin warranty", "warranted by", "nxtektal guarantees", "we guarantee", "covered by nxtektal"]) expect(lower).not.toContain(banned);
    for (const banned of ["zero labour", "zero labor", "no labour", "no labor", "100%", "300%", "80%", "1/3", "one third", "40%", "tournament", "zero turf damage", "no turf damage", "maintenance-free", "maintenance free", "no noise", "noiseless", "silent", "night noise"]) expect(lower).not.toContain(banned);
    for (const banned of ["safer by", "fewer faults", "failure rate", "saves", "savings", "cost", "payback", "roi"]) expect(lower).not.toContain(banned);
  });

  it("adds no price, stock, lead time, customer case or purchase flow", () => {
    for (const banned of ["price", "pricing", "in stock", "stock", "lead time", "delivery time", "customers", "customer case", "case study", "buy", "purchase", "checkout", "cart", "book a", "booking", "reserve", "reservation", "demo booked", "confirmed booking"]) {
      expect(lower).not.toContain(banned);
    }
  });
});

describe("ME74A media and contact", () => {
  it("lists the four manufacturer images at their natural sizes, under the ME74A folder", () => {
    expect(IMAGES.map((i) => i.key)).toEqual(["studio", "front", "top", "course"]);
    expect(IMAGES.map((i) => i.src)).toEqual([
      "/products/me74a/me74a-product-studio.webp",
      "/products/me74a/me74a-front.webp",
      "/products/me74a/me74a-top-angle.webp",
      "/products/me74a/me74a-golf-course.webp",
    ]);
    expect(IMAGES.map((i) => [i.width, i.height])).toEqual([[1322, 747], [617, 436], [690, 488], [1920, 1440]]);
    expect(IMAGES.map((i) => i.fit)).toEqual(["contain", "contain", "contain", "cover"]);
    expect(ME74A_PRODUCT.heroImageKey).toBe("studio");
    expect(IMAGES[0].caption).toContain("nothing is cropped");
    expect(IMAGES[0].alt).toContain("wheels");
    expect(IMAGES[1].caption).toContain("natural size");
    expect(IMAGES[2].caption).toContain("natural size");
    expect(IMAGES[3].caption).toContain("not an NXTektal customer deployment");
    expect(GALLERY_NOTE).toContain("YAWIN, Rural Dog");
    expect(GALLERY_NOTE).toContain("kept as supplied");
  });

  it("never passes the manufacturer's images off as NXTektal's own, or shows internals", () => {
    for (const image of IMAGES) {
      const text = `${image.alt} ${image.caption}`.toLowerCase();
      expect(text).toContain("manufacturer");
      expect(text).not.toContain("nxtektal customer deployment at");
      for (const banned of ["exploded", "cutaway", "internal", "inside the", "sensor position", "charging station"]) expect(text).not.toContain(banned);
    }
    for (const banned of [" our customer", " our site", "customer photo", "nxtektal photograph", "nxtektal photo"]) expect(lower).not.toContain(banned);
  });

  it("uses the site's existing contact address with an ME74A subject", () => {
    expect(CONTACT.email).toBe("founders@nxtektal.com");
    expect(CONTACT.mailto).toBe("mailto:founders@nxtektal.com?subject=ME74A%20%E2%80%94%20product%20and%20site%20fit");
    expect(CONTACT.secondaryHref).toBe("/#pilot");
  });
});
