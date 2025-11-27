import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import EnergyChart from "@/components/EnergyChart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FACTORS = {
  nuclear: 0.0015,
  hydro: 0.20,
  solar: 0.02,
  wind: 0.30
};

const FIXED_DATA = {
  nuclear: { co2: 12, capacity: 92, variability: 1 },
  hydro: { co2: 24, capacity: 50, variability: 4 },
  solar: { co2: 45, capacity: 20, variability: 5 },
  wind: { co2: 11, capacity: 35, variability: 3 }
};

const formatNumber = (num: number) => {
  if (num >= 100) return num.toFixed(0);
  if (num >= 10) return num.toFixed(1);
  return num.toFixed(3);
};

const Calculate = () => {
  const [power, setPower] = useState<number>(0);
  const [landValues, setLandValues] = useState({
    nuclear: 0,
    hydro: 0,
    solar: 0,
    wind: 0
  });

  useEffect(() => {
    const newLandValues = {
      nuclear: power * FACTORS.nuclear,
      hydro: power * FACTORS.hydro,
      solar: power * FACTORS.solar,
      wind: power * FACTORS.wind
    };
    setLandValues(newLandValues);
  }, [power]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        {/* Input Section */}
        <Card className="mb-8 bg-card/50 backdrop-blur border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-center text-3xl neon-green">
              Total Power Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Enter Required Power (MW)
                </label>
                <Input
                  type="number"
                  value={power || ''}
                  onChange={(e) => setPower(Number(e.target.value))}
                  placeholder="0"
                  className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary text-lg"
                />
              </div>
              <Button
                variant="hero"
                className="w-full"
                onClick={() => {}}
              >
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="mb-8 bg-card/50 backdrop-blur border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/20 border-b border-primary/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold neon-green">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold neon-green">Land area (km²)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold neon-green">CO₂ (g/kWh)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold neon-green">Capacity factor (%)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold neon-green">Variability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">Nuclear</td>
                    <td className="px-6 py-4 text-primary font-semibold">{formatNumber(landValues.nuclear)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.nuclear.co2}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.nuclear.capacity}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.nuclear.variability}</td>
                  </tr>
                  <tr className="border-b border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">Hydro</td>
                    <td className="px-6 py-4 text-primary font-semibold">{formatNumber(landValues.hydro)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.hydro.co2}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.hydro.capacity}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.hydro.variability}</td>
                  </tr>
                  <tr className="border-b border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">Solar</td>
                    <td className="px-6 py-4 text-primary font-semibold">{formatNumber(landValues.solar)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.solar.co2}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.solar.capacity}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.solar.variability}</td>
                  </tr>
                  <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">Wind</td>
                    <td className="px-6 py-4 text-primary font-semibold">{formatNumber(landValues.wind)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.wind.co2}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.wind.capacity}</td>
                    <td className="px-6 py-4 text-muted-foreground">{FIXED_DATA.wind.variability}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-6">
            <EnergyChart
              nuclear={{ land: landValues.nuclear, ...FIXED_DATA.nuclear }}
              hydro={{ land: landValues.hydro, ...FIXED_DATA.hydro }}
              solar={{ land: landValues.solar, ...FIXED_DATA.solar }}
              wind={{ land: landValues.wind, ...FIXED_DATA.wind }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculate;
