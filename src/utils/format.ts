export function getUrgencyColor(urgency: string) {
  switch (urgency) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-300";
    case "média":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    default:
      return "bg-green-100 text-green-800 border-green-300";
  }
}

export function getScoreColor(score: number) {
  if (score >= 70) return "text-red-600";
  if (score >= 40) return "text-yellow-600";
  return "text-green-600";
}
