import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const plates = [
  { weight: 25, color: "bg-red-600", border: "border-red-700", name: "Red" },
  { weight: 20, color: "bg-blue-600", border: "border-blue-700", name: "Blue" },
  { weight: 15, color: "bg-yellow-400", border: "border-yellow-500", name: "Yellow" },
  { weight: 10, color: "bg-green-600", border: "border-green-700", name: "Green" },
  { weight: 5, color: "bg-white", border: "border-gray-300", name: "White" },
  { weight: 2.5, color: "bg-gray-900", border: "border-gray-700", name: "Black" },
  { weight: 1.25, color: "bg-gray-400", border: "border-gray-500", name: "Silver" },
];

const PL8Calculator = () => {
  const [targetWeight, setTargetWeight] = useState<number | string>(100);
  const [useSquatBar, setUseSquatBar] = useState(false);

  const barbellWeight = useSquatBar ? 25 : 20;
  const target = typeof targetWeight === "string" ? 0 : targetWeight;
  const weightPerSide = Math.max(0, (target - barbellWeight) / 2);

  const calculatePlates = (weightNeeded: number) => {
    const result: { weight: number; color: string; border: string; name: string; count: number }[] = [];
    let remaining = weightNeeded;

    for (const plate of plates) {
      const count = Math.floor(remaining / plate.weight);
      if (count > 0) {
        result.push({ ...plate, count });
        remaining = Math.round((remaining - count * plate.weight) * 100) / 100;
      }
    }

    return { plates: result, remainder: remaining };
  };

  const { plates: neededPlates, remainder } = calculatePlates(weightPerSide);
  const achievableWeight = barbellWeight + (weightPerSide - remainder) * 2;
  const isExactMatch = remainder === 0 && target >= barbellWeight;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Resources
              </span>
              <h1 className="font-display text-4xl md:text-5xl mb-4">PL8 Calculator</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Calculate the plates you need for your target barbell weight
              </p>
            </div>

            {/* Calculator Section */}
            <div className="card-elevated rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Target Weight Input */}
                <div className="space-y-3">
                  <Label htmlFor="targetWeight" className="text-base font-medium">
                    Target Weight (kg)
                  </Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={targetWeight}
                    onChange={(e) =>
                      setTargetWeight(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="text-lg h-12"
                    min={0}
                    step={0.5}
                  />
                </div>

                {/* Barbell Toggle */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Barbell Type</Label>
                  <div className="flex items-center gap-4 h-12">
                    <span className={`text-sm ${!useSquatBar ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      Standard (20kg)
                    </span>
                    <Switch
                      checked={useSquatBar}
                      onCheckedChange={setUseSquatBar}
                    />
                    <span className={`text-sm ${useSquatBar ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      Squat Bar (25kg)
                    </span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Barbell</p>
                    <p className="text-2xl font-display text-primary">{barbellWeight}kg</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Each Side</p>
                    <p className="text-2xl font-display text-primary">{weightPerSide.toFixed(2)}kg</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Achievable</p>
                    <p className={`text-2xl font-display ${isExactMatch ? "text-green-500" : "text-yellow-500"}`}>
                      {target >= barbellWeight ? achievableWeight.toFixed(2) : 0}kg
                    </p>
                  </div>
                </div>

                {target < barbellWeight ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Target weight must be at least {barbellWeight}kg (barbell weight)</p>
                  </div>
                ) : neededPlates.length === 0 && weightPerSide === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Just the barbell - no plates needed!</p>
                  </div>
                ) : (
                  <>
                    {/* Plate Breakdown */}
                    <h3 className="font-display text-xl mb-4 text-center">Plates Per Side</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {neededPlates.map((plate, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div
                            className={`w-16 h-24 ${plate.color} ${plate.border} border-2 rounded-lg flex items-center justify-center shadow-lg`}
                          >
                            <span className={`font-bold text-lg ${plate.weight === 5 || plate.weight === 15 ? "text-gray-800" : "text-white"}`}>
                              {plate.weight}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">×{plate.count}</span>
                        </div>
                      ))}
                    </div>

                    {/* Visual Barbell Representation */}
                    <h3 className="font-display text-xl mb-4 text-center">Barbell View</h3>
                    <div className="flex items-center justify-center gap-1 overflow-x-auto py-4">
                      {/* Left plates (reversed order) */}
                      <div className="flex items-center gap-0.5">
                        {[...neededPlates].reverse().flatMap((plate, plateIndex) =>
                          Array.from({ length: plate.count }).map((_, i) => (
                            <div
                              key={`left-${plateIndex}-${i}`}
                              className={`${plate.color} ${plate.border} border rounded-sm shadow-md ${
                                plate.weight >= 20 ? "w-4 h-20" :
                                plate.weight >= 10 ? "w-3 h-16" :
                                plate.weight >= 5 ? "w-2.5 h-14" :
                                "w-2 h-12"
                              }`}
                            />
                          ))
                        )}
                      </div>

                      {/* Barbell */}
                      <div className="h-4 w-24 md:w-40 bg-gray-600 rounded-full shadow-inner" />

                      {/* Right plates */}
                      <div className="flex items-center gap-0.5">
                        {neededPlates.flatMap((plate, plateIndex) =>
                          Array.from({ length: plate.count }).map((_, i) => (
                            <div
                              key={`right-${plateIndex}-${i}`}
                              className={`${plate.color} ${plate.border} border rounded-sm shadow-md ${
                                plate.weight >= 20 ? "w-4 h-20" :
                                plate.weight >= 10 ? "w-3 h-16" :
                                plate.weight >= 5 ? "w-2.5 h-14" :
                                "w-2 h-12"
                              }`}
                            />
                          ))
                        )}
                      </div>
                    </div>

                    {remainder > 0 && (
                      <p className="text-center text-yellow-500 mt-4 text-sm">
                        Note: {(remainder * 2).toFixed(2)}kg cannot be achieved with standard plates
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Plate Color Reference */}
            <div className="card-elevated rounded-2xl p-8">
              <h2 className="font-display text-2xl mb-6 text-center">Plate Color Reference</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {plates.map((plate) => (
                  <div key={plate.weight} className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-xl">
                    <div
                      className={`w-12 h-16 ${plate.color} ${plate.border} border-2 rounded-lg shadow-md`}
                    />
                    <span className="font-medium">{plate.weight}kg</span>
                    <span className="text-xs text-muted-foreground">{plate.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PL8Calculator;
