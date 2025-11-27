import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Myanmar from '@react-map/myanmar';

interface RegionData {
  name: string;
  data: { name: string; value: number; color: string }[];
}

// Placeholder electrification data for Myanmar states and regions
const regionData: Record<string, RegionData> = {
  "Kachin": {
    name: "Kachin State",
    data: [
      { name: "Electrified", value: 58, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 42, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Kayah": {
    name: "Kayah State",
    data: [
      { name: "Electrified", value: 65, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 35, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Kayin": {
    name: "Kayin State",
    data: [
      { name: "Electrified", value: 68, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 32, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Chin": {
    name: "Chin State",
    data: [
      { name: "Electrified", value: 45, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 55, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Sagaing": {
    name: "Sagaing Region",
    data: [
      { name: "Electrified", value: 64, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 36, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Tanintharyi": {
    name: "Tanintharyi Region",
    data: [
      { name: "Electrified", value: 66, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 34, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Bago": {
    name: "Bago Region",
    data: [
      { name: "Electrified", value: 75, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 25, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Magway": {
    name: "Magway Region",
    data: [
      { name: "Electrified", value: 60, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 40, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Mandalay": {
    name: "Mandalay Region",
    data: [
      { name: "Electrified", value: 78, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 22, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Mon": {
    name: "Mon State",
    data: [
      { name: "Electrified", value: 72, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 28, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Rakhine": {
    name: "Rakhine State",
    data: [
      { name: "Electrified", value: 52, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 48, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Yangon": {
    name: "Yangon Region",
    data: [
      { name: "Electrified", value: 89, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 11, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Shan": {
    name: "Shan State",
    data: [
      { name: "Electrified", value: 62, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 38, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Ayeyarwady": {
    name: "Ayeyarwady Region",
    data: [
      { name: "Electrified", value: 70, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 30, color: "hsl(0, 0%, 30%)" },
    ],
  },
  "Naypyidaw": {
    name: "Naypyidaw Union Territory",
    data: [
      { name: "Electrified", value: 92, color: "hsl(100, 65%, 60%)" },
      { name: "Not Electrified", value: 8, color: "hsl(0, 0%, 30%)" },
    ],
  },
};

const Map = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData>(regionData["Mon"]);

  const handleSelect = (state: string, selectedStates: string[]) => {
    console.log(`Selected state: ${state}`);
    console.log(`Currently selected states: ${selectedStates}`);
    
    if (regionData[state]) {
      setHoveredRegion(regionData[state]);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 px-12 pb-16 max-w-[1800px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 neon-green"
        >
          Household Electrification Map
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mb-12"
        >
          Click on regions to view household electrification rates
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Myanmar Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex items-center justify-center"
          >
            <Myanmar
              type="select-multiple"
              size={500}
              mapColor="hsl(0, 0%, 15%)"
              strokeColor="hsl(100, 65%, 60%)"
              hoverColor="hsl(100, 65%, 50%)"
              selectColor="hsl(100, 65%, 40%)"
              hints={true}
              onSelect={handleSelect}
            />
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 sticky top-32"
          >
            <h2 className="text-2xl font-bold mb-2 text-primary">{hoveredRegion.name}</h2>
            <p className="text-muted-foreground mb-6">Household Electrification Status</p>
            
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={hoveredRegion.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={500}
                >
                  {hoveredRegion.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: "hsl(var(--foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-2">
              {hoveredRegion.data.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Map;