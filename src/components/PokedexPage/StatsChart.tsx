import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, ChartTypeRegistry } from "chart.js/auto";

interface PokemonStat {
    name: string;
    value: number;
}

interface PokemonChartProps {
    stats: PokemonStat[];
}
export default function PokemonStatsChart({ stats }: PokemonChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"polarArea", number[], string> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (ctx) {
                // Zniszcz poprzednią instancję wykresu, jeśli istnieje
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
                
                const data = stats.map(stat => stat.value);
                const labels = stats.map(stat => stat.name);
                // Konfiguracja wykresu
                const config: ChartConfiguration<"polarArea", number[], string> = {
                    type: "polarArea",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Statystyki",
                                data: data,
                                backgroundColor: [
                                    "rgba(255, 99, 132,0.5)",
                                    "rgba(54, 162, 235,0.5)",
                                    "rgba(255, 206, 86,0.5)",
                                    "rgba(75, 192, 192,0.5)",
                                    "rgba(153, 102, 255,0.5)",
                                    "rgba(255, 159, 64,0.5)",
                                ],
                                
                                borderWidth: 1,
                                borderColor: [
                                    "rgba(255, 255, 255)",
                                ]
                            },
                        ],
                    },
                    options: {
                        
                        
                    },
                };

                // Utwórz nową instancję wykresu
                chartInstance.current = new Chart(ctx, config);
            }
        }

        // Sprzątanie przy odmontowaniu komponentu
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <canvas id="myChart" ref={chartRef}></canvas>
        </div>
    );
};

