export interface BrewConfig {
  /** Set false to remove the coffee mug from the desk */
  enabled: boolean;
  /** Name of the drink, e.g. "Cortado", "Flat White", "Pour Over" */
  drink: string;
  /** Espresso or brew ratio */
  ratio: string;
  /** Bean origin / processing */
  beans: string;
  /** Grind details */
  grind: string;
  /** Pull or brew time */
  time: string;
  /** Short tasting note / personal comment */
  notes: string;
  /** Current mood tag */
  mood: string;
  /** When you last updated this widget, shown as a sub-label */
  updatedAt: string;
}

const brew: BrewConfig = {
  enabled: true,
  drink: "Black Coffee",
  ratio: "1 tsp : 150ml water",
  beans: "Davidoff Rich Aroma · 100% Arabica (Instant)",
  grind: "Freeze-dried · Soluble",
  time: "Instant · 2 minutes cool down",
  notes: "Rich, intense, with a distinct acidic note and spicy undertones.",
  mood: "ready to conquer the morning",
  updatedAt: "updated daily · brewed at 7:00 AM",
};

export default brew;
