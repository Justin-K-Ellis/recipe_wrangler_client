interface RecipeFullInfo {
  id: number;
  name: string;
  ingredients: string[];
  steps: string[];
  readyInMinutes: number;
  servings: number;
}

interface RecipePreview {
  uuid: string;
  name: string;
  cuisine: string;
  notes: string;
}

interface SideBarItem {
  name: string;
  icon: string;
  link: string;
}

export type { RecipeFullInfo, RecipePreview, SideBarItem };
