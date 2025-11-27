interface ChartData {
  land: number;
  co2: number;
  capacity: number;
  variability: number;
}

interface EnergyChartProps {
  nuclear: ChartData;
  hydro: ChartData;
  solar: ChartData;
  wind: ChartData;
}

const EnergyChart = ({ nuclear, hydro, solar, wind }: EnergyChartProps) => {
  const sources = [
    { name: 'Nuclear', color: '#7ed957', data: nuclear },
    { name: 'Hydro', color: '#00d4ff', data: hydro },
    { name: 'Solar', color: '#ffeb3b', data: solar },
    { name: 'Wind', color: '#e040fb', data: wind },
  ];

  const categories = [
    { key: 'land' as const, label: 'Land(km²)' },
    { key: 'co2' as const, label: 'CO₂(g/kWh)' },
    { key: 'capacity' as const, label: 'Capacity(%)' },
    { key: 'variability' as const, label: 'Variability' },
  ];

  // Calculate max value across all data points
  const allValues = sources.flatMap(s => [s.data.land, s.data.co2, s.data.capacity, s.data.variability]);
  const maxDataValue = Math.max(...allValues);
  
  // Determine the top y-axis value
  const topValue = maxDataValue > 100 ? Math.ceil(maxDataValue) + 10 : 100;
  
  // Y-axis values: 0, 20, 40, 60, 80, then dynamic top value
  const yAxisValues = [0, 20, 40, 60, 80, topValue];

  return (
    <div className="bg-black/40 rounded-lg p-8 border border-primary/10">
      {/* Legend */}
      <div className="flex justify-end gap-6 mb-6">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center gap-2">
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: source.color }}
            />
            <span className="text-sm text-foreground">{source.name}</span>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Chart Area */}
        <div className="relative h-[400px] flex">
          {/* Y-axis */}
          <div className="w-16 flex flex-col justify-between text-sm text-foreground font-medium pr-4">
            {[...yAxisValues].reverse().map((value) => (
              <div key={value} className="text-right">{value}</div>
            ))}
          </div>

          {/* Chart Grid and Bars */}
          <div className="flex-1 relative">
            {/* Horizontal dashed grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {yAxisValues.map((_, i) => (
                <div 
                  key={i} 
                  className="w-full border-t-2 border-dashed border-white/20"
                />
              ))}
            </div>

            {/* Bars Container */}
            <div className="absolute inset-0 flex items-end justify-around px-4 pb-2">
              {categories.map((category) => (
                <div key={category.key} className="flex flex-col items-center h-full justify-end" style={{ width: '20%' }}>
                  {/* Bars Group */}
                  <div className="w-full flex items-end justify-center gap-1" style={{ height: '100%' }}>
                    {sources.map((source) => {
                      const value = source.data[category.key];
                      const heightPercent = (value / topValue) * 100;
                      
                      return (
                        <div
                          key={source.name}
                          className="flex-1 relative group transition-all duration-500 ease-out rounded-t"
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: source.color,
                            minHeight: value > 0 ? '2px' : '0px',
                            maxWidth: '40px'
                          }}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            <div className="bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                              {value.toFixed(category.key === 'land' ? 2 : 0)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-axis labels below chart */}
        <div className="flex justify-around px-16 mt-4">
          {categories.map((category) => (
            <div key={category.key} className="text-sm font-medium text-foreground whitespace-nowrap" style={{ width: '20%', textAlign: 'center' }}>
              {category.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyChart;
