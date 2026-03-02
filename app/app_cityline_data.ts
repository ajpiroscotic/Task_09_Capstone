export interface CitylineCategory {
  category: string
  department: string
  keywords: string[]
  avgResolutionDays: number
  pressingness: "high" | "medium" | "low"
}

export const CITYLINE_CATEGORIES: CitylineCategory[] = [
  {
    category: "Report a Pothole",
    department: "Department of Public Works – Streets",
    keywords: ["pothole", "hole in road", "road damage", "crater", "asphalt", "road surface", "bump", "dip in road", "broken road", "crumbling road", "street damage"],
    avgResolutionDays: 7,
    pressingness: "high",
  },
  {
    category: "Street Lights",
    department: "Department of Public Works – Electrical",
    keywords: ["street light", "streetlight", "light out", "dark street", "lamp post", "light pole", "broken light", "flickering light", "no light", "light not working", "dim light"],
    avgResolutionDays: 10,
    pressingness: "medium",
  },
  {
    category: "Pavement Markings",
    department: "Department of Public Works – Streets",
    keywords: ["pavement marking", "road marking", "lane line", "crosswalk", "faded line", "road paint", "painted line", "striping", "road stripe", "center line"],
    avgResolutionDays: 21,
    pressingness: "low",
  },
  {
    category: "Traffic & Parking Signs",
    department: "Department of Public Works – Traffic",
    keywords: ["sign", "stop sign", "yield sign", "speed limit", "parking sign", "one way", "no parking", "road sign", "sign missing", "sign damaged", "sign down", "bent sign"],
    avgResolutionDays: 5,
    pressingness: "medium",
  },
  {
    category: "Traffic Signals",
    department: "Department of Public Works – Traffic",
    keywords: ["traffic light", "traffic signal", "red light", "signal malfunction", "signal out", "flashing light", "broken signal", "intersection light"],
    avgResolutionDays: 2,
    pressingness: "high",
  },
  {
    category: "Report an Abandoned Vehicle",
    department: "Syracuse Police Department",
    keywords: ["abandoned vehicle", "abandoned car", "car sitting", "junk car", "derelict vehicle", "car not moved", "inoperable vehicle", "rusted car"],
    avgResolutionDays: 14,
    pressingness: "low",
  },
  {
    category: "Report an Illegally Parked Vehicle",
    department: "Department of Finance – Parking Violations",
    keywords: ["illegally parked", "illegal parking", "double parked", "blocking", "parked in", "fire hydrant", "blocking driveway", "no park zone", "expired meter"],
    avgResolutionDays: 1,
    pressingness: "medium",
  },
  {
    category: "Parking Meter",
    department: "Department of Finance – Parking",
    keywords: ["parking meter", "meter broken", "meter not working", "coin jam", "meter malfunction", "pay station"],
    avgResolutionDays: 5,
    pressingness: "low",
  },
  {
    category: "Parking Tickets",
    department: "Department of Finance – Parking Violations",
    keywords: ["parking ticket", "ticket dispute", "unfair ticket", "wrong ticket", "parking fine", "parking violation"],
    avgResolutionDays: 10,
    pressingness: "low",
  },
  {
    category: "Dog Control",
    department: "Department of Animal Control",
    keywords: ["dog", "stray dog", "loose dog", "barking", "aggressive dog", "dog bite", "unleashed", "dog running", "dangerous dog"],
    avgResolutionDays: 2,
    pressingness: "high",
  },
  {
    category: "Report Roadkill",
    department: "Department of Public Works – Sanitation",
    keywords: ["roadkill", "dead animal", "dead deer", "animal in road", "carcass", "dead raccoon", "dead cat", "dead dog in road"],
    avgResolutionDays: 3,
    pressingness: "medium",
  },
  {
    category: "Animal Control",
    department: "Department of Animal Control",
    keywords: ["animal", "wild animal", "raccoon", "cat", "feral", "stray cat", "animal problem", "critter", "skunk", "opossum", "bat"],
    avgResolutionDays: 3,
    pressingness: "medium",
  },
  {
    category: "Deer Sighting",
    department: "Department of Animal Control",
    keywords: ["deer", "deer sighting", "deer in yard", "deer crossing"],
    avgResolutionDays: 5,
    pressingness: "low",
  },
  {
    category: "Report Improperly Set Out Trash or Recycling (Illegal Setout)",
    department: "Department of Public Works – Sanitation",
    keywords: ["illegal setout", "trash out early", "wrong day", "improper trash", "recycling wrong", "trash violation", "setout"],
    avgResolutionDays: 3,
    pressingness: "low",
  },
  {
    category: "Graffiti on Public Land",
    department: "Department of Public Works – Parks",
    keywords: ["graffiti", "spray paint", "vandalism", "tagging", "graffiti public", "wall paint"],
    avgResolutionDays: 14,
    pressingness: "low",
  },
  {
    category: "Graffiti on Private Land",
    department: "Department of Neighborhood & Business Development",
    keywords: ["graffiti private", "graffiti house", "graffiti building", "spray paint private"],
    avgResolutionDays: 21,
    pressingness: "low",
  },
  {
    category: "Report Litter on Public Land",
    department: "Department of Public Works – Sanitation",
    keywords: ["litter", "trash on ground", "garbage public", "debris public", "trash public", "rubbish", "littering"],
    avgResolutionDays: 5,
    pressingness: "low",
  },
  {
    category: "Report Litter on Private Land",
    department: "Department of Neighborhood & Business Development",
    keywords: ["litter private", "trash private property", "garbage private", "debris private"],
    avgResolutionDays: 14,
    pressingness: "low",
  },
  {
    category: "Tires",
    department: "Department of Public Works – Sanitation",
    keywords: ["tire", "tires", "dumped tires", "old tires", "tire pile"],
    avgResolutionDays: 7,
    pressingness: "low",
  },
  {
    category: "Trash Can on Public Land",
    department: "Department of Public Works – Sanitation",
    keywords: ["trash can public", "garbage can public", "public bin", "overflowing bin", "public trash"],
    avgResolutionDays: 3,
    pressingness: "low",
  },
  {
    category: "Yard Waste",
    department: "Department of Public Works – Sanitation",
    keywords: ["yard waste", "leaves", "branches", "brush", "yard debris", "compost", "lawn clippings", "leaf pile"],
    avgResolutionDays: 7,
    pressingness: "low",
  },
  {
    category: "Home & Building Maintenance",
    department: "Department of Neighborhood & Business Development",
    keywords: ["home maintenance", "building maintenance", "broken window", "roof damage", "siding", "structural", "dilapidated", "unsafe building", "code violation", "building code"],
    avgResolutionDays: 21,
    pressingness: "medium",
  },
  {
    category: "Vacant Buildings",
    department: "Department of Neighborhood & Business Development",
    keywords: ["vacant building", "empty building", "boarded up", "abandoned building", "vacant house", "empty house", "squatter"],
    avgResolutionDays: 30,
    pressingness: "medium",
  },
  {
    category: "Vacant Land",
    department: "Department of Neighborhood & Business Development",
    keywords: ["vacant land", "empty lot", "vacant lot", "abandoned lot", "overgrown lot"],
    avgResolutionDays: 21,
    pressingness: "low",
  },
  {
    category: "Unlawful Dumping on Vacant Land",
    department: "Department of Neighborhood & Business Development",
    keywords: ["dumping", "illegal dumping", "unlawful dumping", "dump site", "dumped trash", "fly tipping"],
    avgResolutionDays: 14,
    pressingness: "medium",
  },
  {
    category: "Report Overgrown Grass on Private Land",
    department: "Department of Neighborhood & Business Development",
    keywords: ["overgrown grass", "tall grass", "unmowed", "lawn overgrown", "grass private", "weeds private"],
    avgResolutionDays: 14,
    pressingness: "low",
  },
  {
    category: "Report Trash/Debris Outside a Home/Building",
    department: "Department of Neighborhood & Business Development",
    keywords: ["trash outside home", "debris outside", "junk outside", "garbage outside house", "trash building"],
    avgResolutionDays: 10,
    pressingness: "low",
  },
  {
    category: "Report Overgrown Grass in Public Spaces",
    department: "Department of Public Works – Parks",
    keywords: ["overgrown public", "grass public space", "park grass", "public lawn"],
    avgResolutionDays: 7,
    pressingness: "low",
  },
  {
    category: "Park Maintenance",
    department: "Department of Public Works – Parks",
    keywords: ["park", "park bench", "park damage", "park maintenance", "park path", "park trail", "park facility"],
    avgResolutionDays: 10,
    pressingness: "low",
  },
  {
    category: "Playground Equipment",
    department: "Department of Public Works – Parks",
    keywords: ["playground", "swing", "slide", "jungle gym", "play equipment", "broken swing", "playground damage", "monkey bars"],
    avgResolutionDays: 7,
    pressingness: "medium",
  },
  {
    category: "Tree Care and Removal",
    department: "Department of Public Works – Parks",
    keywords: ["tree", "fallen tree", "dead tree", "tree branch", "limb", "tree removal", "tree trimming", "hanging branch", "tree blocking", "tree down", "stump"],
    avgResolutionDays: 14,
    pressingness: "medium",
  },
  {
    category: "Report a Problem with a Catch Basin/Storm Drain",
    department: "Department of Public Works – Sewer",
    keywords: ["catch basin", "storm drain", "drain", "clogged drain", "flooded street", "water pooling", "drain blocked", "drain cover", "grate", "sewer grate"],
    avgResolutionDays: 5,
    pressingness: "high",
  },
  {
    category: "Other Sewer-related Concerns",
    department: "Department of Public Works – Sewer",
    keywords: ["sewer", "sewage", "sewer smell", "backup", "sewer backup", "manhole", "sewer overflow", "sewage leak"],
    avgResolutionDays: 3,
    pressingness: "high",
  },
  {
    category: "Water-related Concerns",
    department: "Department of Water",
    keywords: ["water", "water main", "water leak", "hydrant", "fire hydrant", "water pressure", "discolored water", "no water", "water break", "flooding", "burst pipe"],
    avgResolutionDays: 2,
    pressingness: "high",
  },
  {
    category: "Report a Skipped Recycling, Trash or Bulk Pick Up",
    department: "Department of Public Works – Sanitation",
    keywords: ["missed pickup", "skipped trash", "skipped recycling", "missed collection", "didn't pick up", "no pickup", "trash not collected", "recycling not collected", "forgot trash", "bulk pickup missed"],
    avgResolutionDays: 2,
    pressingness: "medium",
  },
  {
    category: "Schedule a Bulk Pick Up",
    department: "Department of Public Works – Sanitation",
    keywords: ["bulk pickup", "bulk item", "large item", "furniture pickup", "couch", "mattress", "appliance", "refrigerator", "bulk waste", "large trash"],
    avgResolutionDays: 10,
    pressingness: "low",
  },
  {
    category: "Report a Sanitation or Recycling Cart Issue",
    department: "Department of Public Works – Sanitation",
    keywords: ["cart", "recycling cart", "trash cart", "broken cart", "missing cart", "cart damaged", "bin broken", "garbage bin"],
    avgResolutionDays: 7,
    pressingness: "low",
  },
  {
    category: "Report a Fallen or Damaged Traffic Light/Traffic Signal",
    department: "Department of Public Works – Traffic (Urgent)",
    keywords: ["fallen traffic light", "traffic light down", "signal down", "traffic light damaged", "signal fallen"],
    avgResolutionDays: 1,
    pressingness: "high",
  },
  {
    category: "Report a Fallen or Damaged Traffic Sign/Road Sign",
    department: "Department of Public Works – Traffic (Urgent)",
    keywords: ["fallen sign", "sign down", "road sign damaged", "sign knocked over", "sign blown over"],
    avgResolutionDays: 1,
    pressingness: "high",
  },
  {
    category: "Health, Safety & Social Services",
    department: "Department of Neighborhood & Business Development",
    keywords: ["health", "safety", "social services", "homeless", "encampment", "needle", "hazard", "public health", "unsafe condition"],
    avgResolutionDays: 5,
    pressingness: "high",
  },
  {
    category: "Feedback to the City",
    department: "SYRCityline Administration",
    keywords: ["feedback", "suggestion", "complaint", "comment", "city feedback", "city suggestion", "compliment"],
    avgResolutionDays: 30,
    pressingness: "low",
  },
  {
    category: "Scooter and Bikeshare Feedback",
    department: "SYRCityline Administration",
    keywords: ["scooter", "bikeshare", "e-scooter", "bike share", "electric scooter", "bike dock", "scooter blocking"],
    avgResolutionDays: 14,
    pressingness: "low",
  },
]

export function classifyIssue(description: string): {
  match: CitylineCategory
  confidence: number
  topMatches: { category: CitylineCategory; score: number }[]
} {
  const text = description.toLowerCase()

  const scored = CITYLINE_CATEGORIES.map((cat) => {
    let score = 0
    for (const kw of cat.keywords) {
      if (text.includes(kw)) {
        score += kw.split(" ").length
      }
    }
    return { category: cat, score }
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) {
    const fallback = CITYLINE_CATEGORIES.find(
      (c) => c.category === "Feedback to the City"
    )!
    return {
      match: fallback,
      confidence: 0.15,
      topMatches: [{ category: fallback, score: 0 }],
    }
  }

  const best = scored[0]
  const maxPossible = best.category.keywords.reduce(
    (sum, kw) => sum + kw.split(" ").length,
    0
  )
  const confidence = Math.min(0.99, 0.4 + (best.score / maxPossible) * 0.55)

  return {
    match: best.category,
    confidence,
    topMatches: scored.slice(0, 3),
  }
}