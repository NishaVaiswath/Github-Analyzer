import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function LanguageChart({ repos }) {
  const languageCount = {}

  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
    }
  })

  const data = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        data: Object.values(languageCount),
        backgroundColor: [
          "#185FA5",
          "#0F6E56", 
          "#854F0B",
          "#7C3AED",
          "#DC2626"
        ]
      }
    ]
  }

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h3>Language Breakdown</h3>
      <Pie data={data} />
    </div>
  )
}

export default LanguageChart