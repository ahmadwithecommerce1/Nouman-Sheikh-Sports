export interface CategoryLevel3Item {
  id: string;
  name: string; // e.g. "Bats"
  label: string; // e.g. "Bats (English Willow, Kashmir & Tape Ball)"
  path: string; // e.g. "Sports/Cricket/Bats"
  displayPath: string; // e.g. "Sports > Cricket > Bats"
  hierarchy: [string, string, string]; // ["Sports", "Cricket", "Bats"]
  popularBrands: string[];
  level4Items?: string[]; // e.g. ["English Willow Grade 1+", "Kashmir Willow", "Tape Ball Power"]
}

export interface CategoryLevel2Group {
  id: string;
  name: 'Cricket' | 'Football' | 'Gym & Fitness' | 'Racket Sports' | 'Outdoor & Athletics';
  icon: string;
  label: string;
  path: string; // "Sports/Cricket"
  displayPath: string; // "Sports > Cricket"
  hierarchy: [string, string]; // ["Sports", "Cricket"]
  subCategories: CategoryLevel3Item[];
  defaultBrands: string[];
}

export interface CategoryTreeRoot {
  id: string;
  name: string; // "Sports"
  label: string; // "Sports & Games Gear"
  icon: string;
  categories: CategoryLevel2Group[];
}

export const CATEGORY_TREE_DATA: CategoryTreeRoot = {
  id: 'sports-root',
  name: 'Sports',
  label: 'Sports & Games Gear',
  icon: '🏆',
  categories: [
    {
      id: 'cricket',
      name: 'Cricket',
      icon: '🏏',
      label: 'Cricket Equipment & Accessories',
      path: 'Sports/Cricket',
      displayPath: 'Sports > Cricket',
      hierarchy: ['Sports', 'Cricket'],
      defaultBrands: [
        'Sheikh Nouman Pro',
        'CA Plus',
        'MB Malik',
        'Gray-Nicolls',
        'Kookaburra',
        'Ihsan Sports',
        'SS Sunridges',
        'New Balance',
        'DSC',
        'Gunn & Moore',
      ],
      subCategories: [
        {
          id: 'cricket-bats',
          name: 'Bats',
          label: 'Cricket Bats (English Willow & Kashmir Willow)',
          path: 'Sports/Cricket/Bats',
          displayPath: 'Sports > Cricket > Bats',
          hierarchy: ['Sports', 'Cricket', 'Bats'],
          popularBrands: ['Sheikh Nouman Pro', 'CA Plus', 'MB Malik', 'Gray-Nicolls', 'Kookaburra', 'SS Sunridges'],
          level4Items: ['English Willow Grade 1+', 'Kashmir Willow Pro', 'Tape Ball Monster', 'Hard Ball Master'],
        },
        {
          id: 'cricket-balls',
          name: 'Balls',
          label: 'Cricket Balls (Leather Match, Tape & Tennis)',
          path: 'Sports/Cricket/Balls',
          displayPath: 'Sports > Cricket > Balls',
          hierarchy: ['Sports', 'Cricket', 'Balls'],
          popularBrands: ['Sheikh Nouman Pro', 'Kookaburra', 'CA Plus', 'Dukes', 'Ihsan Sports'],
          level4Items: ['4-Piece Test Match Leather', '2-Piece Club Leather', 'Tournament Tape Ball', 'Wind Ball'],
        },
        {
          id: 'cricket-protective',
          name: 'Protective Gear',
          label: 'Protective Gear (Batting Pads, Gloves & Helmets)',
          path: 'Sports/Cricket/Protective Gear',
          displayPath: 'Sports > Cricket > Protective Gear',
          hierarchy: ['Sports', 'Cricket', 'Protective Gear'],
          popularBrands: ['CA Plus', 'Sheikh Nouman Pro', 'Gray-Nicolls', 'Masuri', 'Shrey', 'Kookaburra'],
          level4Items: ['Batting Legguards (Pads)', 'Batting Gloves', 'Titanium Grill Helmets', 'Thigh & Chest Guards'],
        },
        {
          id: 'cricket-kits',
          name: 'Kitbags & Luggage',
          label: 'Kitbags, Duffle Bags & Team Wheelies',
          path: 'Sports/Cricket/Kitbags & Luggage',
          displayPath: 'Sports > Cricket > Kitbags & Luggage',
          hierarchy: ['Sports', 'Cricket', 'Kitbags & Luggage'],
          popularBrands: ['Sheikh Nouman Pro', 'CA Plus', 'MB Malik', 'Gray-Nicolls'],
          level4Items: ['Full Wheelie Kitbag', 'Player Duffle Bag', 'Bat Protective Sleeve'],
        },
        {
          id: 'cricket-footwear',
          name: 'Shoes & Spikes',
          label: 'Cricket Shoes (Metal Spikes & Rubber Cleats)',
          path: 'Sports/Cricket/Shoes & Spikes',
          displayPath: 'Sports > Cricket > Shoes & Spikes',
          hierarchy: ['Sports', 'Cricket', 'Shoes & Spikes'],
          popularBrands: ['Nike', 'Adidas', 'New Balance', 'CA Plus', 'Asics'],
          level4Items: ['Full Metal Bowling Spikes', 'Rubber All-Rounder Cleats', 'Turf Training Trainers'],
        },
      ],
    },
    {
      id: 'football',
      name: 'Football',
      icon: '⚽',
      label: 'Football & Soccer Gear',
      path: 'Sports/Football',
      displayPath: 'Sports > Football',
      hierarchy: ['Sports', 'Football'],
      defaultBrands: [
        'Nike',
        'Adidas',
        'Puma',
        'Sheikh Nouman Pro',
        'Select',
        'Uhlsport',
        'Molten',
        'Kipsta',
      ],
      subCategories: [
        {
          id: 'football-balls',
          name: 'Match Balls',
          label: 'Official Match Balls (FIFA Quality Pro)',
          path: 'Sports/Football/Match Balls',
          displayPath: 'Sports > Football > Match Balls',
          hierarchy: ['Sports', 'Football', 'Match Balls'],
          popularBrands: ['Nike', 'Adidas', 'Sheikh Nouman Pro', 'Select', 'Puma'],
          level4Items: ['FIFA Quality Pro Match Ball', 'Thermo-Bonded Training Ball', 'Futsal Low-Bounce Ball'],
        },
        {
          id: 'football-shoes',
          name: 'Shoes & Cleats',
          label: 'Football Boots (Firm Ground, Turf & Futsal)',
          path: 'Sports/Football/Shoes & Cleats',
          displayPath: 'Sports > Football > Shoes & Cleats',
          hierarchy: ['Sports', 'Football', 'Shoes & Cleats'],
          popularBrands: ['Nike', 'Adidas', 'Puma'],
          level4Items: ['Firm Ground (FG) Cleats', 'Artificial Turf (TF) Boots', 'Indoor Court (IC) Shoes'],
        },
        {
          id: 'football-gk',
          name: 'Goalkeeper Gear',
          label: 'Goalkeeper Gloves & Shin Guards',
          path: 'Sports/Football/Goalkeeper Gear',
          displayPath: 'Sports > Football > Goalkeeper Gear',
          hierarchy: ['Sports', 'Football', 'Goalkeeper Gear'],
          popularBrands: ['Adidas', 'Nike', 'Uhlsport', 'Reusch', 'Puma'],
          level4Items: ['Finger-Protection Pro Gloves', 'Anatomical Shin Guards', 'Padded Goalkeeper Jersey'],
        },
        {
          id: 'football-accessories',
          name: 'Training & Pitch',
          label: 'Training Cones, Bibs, Agility & Pumps',
          path: 'Sports/Football/Training & Pitch',
          displayPath: 'Sports > Football > Training & Pitch',
          hierarchy: ['Sports', 'Football', 'Training & Pitch'],
          popularBrands: ['Sheikh Nouman Pro', 'Nike', 'Adidas', 'Select'],
          level4Items: ['High-Pressure Ball Pump with Gauge', 'Space Marker Cones (Set of 50)', 'Training Pinnies'],
        },
      ],
    },
    {
      id: 'gym',
      name: 'Gym & Fitness',
      icon: '🏋️',
      label: 'Gym Equipment & Free Weights',
      path: 'Sports/Gym & Fitness',
      displayPath: 'Sports > Gym & Fitness',
      hierarchy: ['Sports', 'Gym & Fitness'],
      defaultBrands: [
        'Sheikh Nouman Pro',
        'Bowflex',
        'Rogue Fitness',
        'Eleiko',
        'Harbinger',
        'Reebok',
        'Under Armour',
      ],
      subCategories: [
        {
          id: 'gym-dumbbells',
          name: 'Dumbbells',
          label: 'Hex Rubber & Chrome Free Weight Dumbbells',
          path: 'Sports/Gym & Fitness/Dumbbells',
          displayPath: 'Sports > Gym & Fitness > Dumbbells',
          hierarchy: ['Sports', 'Gym & Fitness', 'Dumbbells'],
          popularBrands: ['Sheikh Nouman Pro', 'Bowflex', 'Rogue Fitness'],
          level4Items: ['Rubber Hex Commercial Dumbbells', 'Adjustable Quick-Select Dumbbells', 'Cast Iron Pairs'],
        },
        {
          id: 'gym-kettlebells',
          name: 'Kettlebells & Barbells',
          label: 'Heavy Cast Kettlebells, Barbells & Olympic Plates',
          path: 'Sports/Gym & Fitness/Kettlebells & Barbells',
          displayPath: 'Sports > Gym & Fitness > Kettlebells & Barbells',
          hierarchy: ['Sports', 'Gym & Fitness', 'Kettlebells & Barbells'],
          popularBrands: ['Sheikh Nouman Pro', 'Eleiko', 'Rogue Fitness'],
          level4Items: ['Cast Iron Competition Kettlebells', 'Olympic 7ft Barbell 20kg', 'Tri-Grip Rubber Plates'],
        },
        {
          id: 'gym-accessories',
          name: 'Strength Accessories',
          label: 'Weightlifting Belts, Wrist Wraps & Speed Ropes',
          path: 'Sports/Gym & Fitness/Strength Accessories',
          displayPath: 'Sports > Gym & Fitness > Strength Accessories',
          hierarchy: ['Sports', 'Gym & Fitness', 'Strength Accessories'],
          popularBrands: ['Harbinger', 'Sheikh Nouman Pro', 'Nike', 'Rogue Fitness'],
          level4Items: ['Leather Powerlifting Lever Belt', 'Heavy Duty Wrist Wraps', 'High-Speed Bearing Jump Rope'],
        },
      ],
    },
    {
      id: 'rackets',
      name: 'Racket Sports',
      icon: '🏸',
      label: 'Badminton, Tennis & Squash',
      path: 'Sports/Racket Sports',
      displayPath: 'Sports > Racket Sports',
      hierarchy: ['Sports', 'Racket Sports'],
      defaultBrands: [
        'Yonex',
        'Wilson',
        'Babolat',
        'Head',
        'Victor',
        'Li-Ning',
        'Dunlop',
        'Technifibre',
      ],
      subCategories: [
        {
          id: 'racket-badminton',
          name: 'Badminton',
          label: 'Badminton Rackets, Shuttles & Stringing',
          path: 'Sports/Racket Sports/Badminton',
          displayPath: 'Sports > Racket Sports > Badminton',
          hierarchy: ['Sports', 'Racket Sports', 'Badminton'],
          popularBrands: ['Yonex', 'Victor', 'Li-Ning', 'Sheikh Nouman Pro'],
          level4Items: ['High-Modulus Carbon Racket', 'Goose Feather Tournament Shuttles', 'High-Tension Strings'],
        },
        {
          id: 'racket-tennis',
          name: 'Tennis',
          label: 'Touring Tennis Rackets & Championship Balls',
          path: 'Sports/Racket Sports/Tennis',
          displayPath: 'Sports > Racket Sports > Tennis',
          hierarchy: ['Sports', 'Racket Sports', 'Tennis'],
          popularBrands: ['Wilson', 'Babolat', 'Head', 'Yonex'],
          level4Items: ['Pro Staff Tour Racket', 'Pressurized Championship Cans', 'Overgrips & Dampeners'],
        },
        {
          id: 'racket-squash',
          name: 'Squash',
          label: 'Squash Rackets & Double Yellow Dot Balls',
          path: 'Sports/Racket Sports/Squash',
          displayPath: 'Sports > Racket Sports > Squash',
          hierarchy: ['Sports', 'Racket Sports', 'Squash'],
          popularBrands: ['Dunlop', 'Head', 'Prince', 'Technifibre'],
          level4Items: ['Graphite Squash Racket', 'Double Yellow Dot Pro Balls', 'Anti-Fog Protective Eyewear'],
        },
      ],
    },
    {
      id: 'outdoor',
      name: 'Outdoor & Athletics',
      icon: '🏃',
      label: 'Track, Agility & Court Athletics',
      path: 'Sports/Outdoor & Athletics',
      displayPath: 'Sports > Outdoor & Athletics',
      hierarchy: ['Sports', 'Outdoor & Athletics'],
      defaultBrands: [
        'Sheikh Nouman Pro',
        'Nike',
        'SKLZ',
        'Stiga',
        'Butterfly',
        'Spalding',
        'Molten',
      ],
      subCategories: [
        {
          id: 'outdoor-speed',
          name: 'Speed & Agility',
          label: 'Agility Ladders, Cones & Resistance Parachutes',
          path: 'Sports/Outdoor & Athletics/Speed & Agility',
          displayPath: 'Sports > Outdoor & Athletics > Speed & Agility',
          hierarchy: ['Sports', 'Outdoor & Athletics', 'Speed & Agility'],
          popularBrands: ['Sheikh Nouman Pro', 'SKLZ', 'Nike'],
          level4Items: ['6m Quick-Foot Agility Ladder', 'Adjustable Speed Hurdles', 'Sprint Resistance Chute'],
        },
        {
          id: 'outdoor-tabletennis',
          name: 'Table Tennis',
          label: 'Table Tennis Bats, 3-Star Balls & Tables',
          path: 'Sports/Outdoor & Athletics/Table Tennis',
          displayPath: 'Sports > Outdoor & Athletics > Table Tennis',
          hierarchy: ['Sports', 'Outdoor & Athletics', 'Table Tennis'],
          popularBrands: ['Butterfly', 'Stiga', 'Donic', 'DHS'],
          level4Items: ['Carbon Speed Blade Bat', 'ITTF Approved 3-Star Balls (Pack of 6)', 'Retractable Post Net'],
        },
        {
          id: 'outdoor-basketball',
          name: 'Basketball',
          label: 'Basketballs, Nets & Court Training',
          path: 'Sports/Outdoor & Athletics/Basketball',
          displayPath: 'Sports > Outdoor & Athletics > Basketball',
          hierarchy: ['Sports', 'Outdoor & Athletics', 'Basketball'],
          popularBrands: ['Spalding', 'Molten', 'Wilson', 'Nike'],
          level4Items: ['Official Size 7 Indoor/Outdoor Leather', 'Composite All-Surface Ball', 'Heavy Duty Metal Rim Net'],
        },
      ],
    },
  ],
};

// Backwards compatibility alias
export const CATEGORY_TREE = CATEGORY_TREE_DATA.categories;

/**
 * Flattened list of all 3-level leaf categories for instant searching
 */
export function getAllLevel3Categories(): CategoryLevel3Item[] {
  const leaves: CategoryLevel3Item[] = [];
  CATEGORY_TREE_DATA.categories.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      leaves.push(sub);
    });
  });
  return leaves;
}

/**
 * Searches the 3-level category tree and returns matching leaf paths
 */
export function searchCategoryTree(query: string) {
  if (!query.trim()) return CATEGORY_TREE_DATA.categories;
  const q = query.toLowerCase().trim();

  return CATEGORY_TREE_DATA.categories
    .map((group) => {
      const groupMatches =
        group.name.toLowerCase().includes(q) || group.label.toLowerCase().includes(q);

      const matchingSubs = group.subCategories.filter(
        (sub) =>
          sub.name.toLowerCase().includes(q) ||
          sub.label.toLowerCase().includes(q) ||
          sub.path.toLowerCase().includes(q) ||
          sub.displayPath.toLowerCase().includes(q) ||
          (sub.level4Items && sub.level4Items.some((item) => item.toLowerCase().includes(q))) ||
          sub.popularBrands.some((b) => b.toLowerCase().includes(q))
      );

      if (groupMatches) {
        return group;
      }

      if (matchingSubs.length > 0) {
        return {
          ...group,
          subCategories: matchingSubs,
        };
      }

      return null;
    })
    .filter(Boolean) as CategoryLevel2Group[];
}

/**
 * Returns grouped and filtered brands strictly based on the chosen category and sub-category
 */
export function getBrandsForCategory(categoryName: string, subCategoryName?: string): string[] {
  const group = CATEGORY_TREE_DATA.categories.find(
    (g) => g.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!group) {
    return [
      'Sheikh Nouman Pro',
      'CA Plus',
      'Nike',
      'Adidas',
      'Yonex',
      'Wilson',
      'Gray-Nicolls',
      'Puma',
      'Rogue Fitness',
    ];
  }

  if (subCategoryName) {
    const sub = group.subCategories.find(
      (s) =>
        s.name.toLowerCase() === subCategoryName.toLowerCase() ||
        s.label.toLowerCase().includes(subCategoryName.toLowerCase())
    );
    if (sub && sub.popularBrands.length > 0) {
      // Prioritize subcategory specific brands first, followed by major discipline brands
      return Array.from(new Set([...sub.popularBrands, ...group.defaultBrands]));
    }
  }

  return group.defaultBrands;
}

