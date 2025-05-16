interface RecipeFullInfo {
  externalId: number;
  name: string;
  ingredients: string[];
  steps: string[];
  readyInMinutes: number;
  servings: number;
}

interface RecipePreview {
  externalId: string;
  name: string;
  cuisine: string;
}

interface SideBarItem {
  name: string;
  icon: string;
  link: string;
}

export type { RecipeFullInfo, RecipePreview, SideBarItem };
