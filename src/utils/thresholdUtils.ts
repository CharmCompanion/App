interface ResourceNeeds {
  [resourceId: string]: number;
}

export function suggestThresholdsFromGoals(goals: any[]): ResourceNeeds {
  const totals: ResourceNeeds = {};

  for (const goal of goals) {
    if (!goal.resources) continue;

    for (const [resourceId, count] of Object.entries(goal.resources)) {
      totals[resourceId] = (totals[resourceId] || 0) + Number(count);
    }
  }

  return totals;
}
