export interface WardrobeItem {
  id: string
  name: string
  category: 'clothing' | 'footwear' | 'jewelry' | 'bag' | 'outerwear'
  subcategory: string
  color: string
  pattern: string
  neckline?: string
  sleeve?: string
  fabric: string
  season: string[]
  formality: 'casual' | 'smart-casual' | 'formal'
  imageUrl: string
  lastWorn?: string
  wearCount: number
  purchaseDate?: string
  tags: string[]
  embedding?: number[]
  addedAt: string
}

export interface OutfitLog {
  id: string
  date: string
  itemIds: string[]
  occasion?: string
  notes?: string
  vtoResultUrl?: string
}

export interface UserPreferences {
  selfieUrl?: string
  styleProfile: string[]
  occasionHistory: Record<string, string[]>
  timeOfDayPatterns: Record<string, string[]>
  avoidList: string[]
}

export interface SearchResult {
  item: WardrobeItem
  score: number
  matchType: 'semantic' | 'lexical' | 'temporal'
}
