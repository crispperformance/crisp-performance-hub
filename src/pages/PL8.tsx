import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const plates = [
  { weight: 25, color: "bg-red-600", border: "border-red-700", name: "Red" },
  { weight: 20, color: "bg-blue-600", border: "border-blue-700", name: "Blue" },
  { weight: 15, color: "bg-yellow-400", border: "border-yellow-500", name: "Yellow" },
  { weight: 10, color: "bg-green-600", border: "border-green-700", name: "Green" },
  { weight: 5, color: "bg-white", border: "border-gray-300", name: "White" },
  { weight: 2.5, color: "bg-gray-900", border: "border-gray-700", name: "Black" },
  { weight: 1.25, color: "bg-gray-400", border: "border-gray-500", name: "Silver" },
];

const collarPlate = { weight: 2.5, color: "bg-orange-500", border: "border-orange-600", name: "Collar" };

const PL8 = () => {
  const [targetWeight, setTargetWeight] = useState<number | string>(100);
  const [useSquatBar, setUseSquatBar] = useState(false);
  const [useCompetitionCollars, setUseCompetitionCollars] = useState(false);

  const barbellWeight = useSquatBar ? 25 : 20;
  const collarWeight = useCompetitionCollars ? 5 : 0; // 2.5kg each side
  const totalBarWeight = barbellWeight + collarWeight;
  const target = typeof targetWeight === "string" ? 0 : targetWeight;
  // Collars count toward target: 100kg = bar + collars + plates
  const weightPerSide = Math.max(0, (target - totalBarWeight) / 2);
  const formatWeight = (value: number) => value.toFixed(2).replace(/\.?0+$/, "");

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
  const achievableWeight = totalBarWeight + (weightPerSide - remainder) * 2;
  const isExactMatch = remainder === 0 && target >= totalBarWeight;

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
              <h1 className="font-display text-4xl md:text-5xl mb-4">PL8</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Work out what plates you need for each barbell weight. Use a standard 20kg barbell or switch to a 25kg squat bar. Need competition collars? We have those too. Never struggle with plate maths again.
              </p>

            </div>

            {/* Calculator Section */}
            <div className="card-elevated rounded-2xl p-6 md:p-8 mb-8">
              {/* Input Row */}
              <div className="space-y-6 mb-8">
                {/* Target Weight Input */}
                <div className="space-y-3 text-center flex flex-col items-center">
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
                    className="text-lg h-12 max-w-xs w-full"
                    min={0}
                    step={0.5}
                  />
                </div>

                {/* Toggles Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {/* Barbell Options */}
                  <button
                    onClick={() => setUseSquatBar(false)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      !useSquatBar 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <span className="font-medium text-sm">Standard Bar</span>
                    <span className="block text-xs opacity-70">20kg</span>
                  </button>
                  <button
                    onClick={() => setUseSquatBar(true)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      useSquatBar 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <span className="font-medium text-sm">Squat Bar</span>
                    <span className="block text-xs opacity-70">25kg</span>
                  </button>

                  {/* Competition Collars Toggle */}
                  <button
                    onClick={() => setUseCompetitionCollars(!useCompetitionCollars)}
                    className={`p-3 rounded-lg border-2 transition-all text-center col-span-2 sm:col-span-1 ${
                      useCompetitionCollars 
                        ? "border-orange-500 bg-orange-500/10 text-orange-500" 
                        : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <span className="font-medium text-sm">Competition Collars</span>
                    <span className="block text-xs opacity-70">2.5kg each</span>
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Barbell</p>
                    <p className="text-2xl font-display text-white">{formatWeight(barbellWeight)}kg</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Collars</p>
                    <p className="text-2xl font-display text-white">{formatWeight(collarWeight)}kg</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Plates Per Side</p>
                    <p className="text-2xl font-display text-white">{formatWeight(weightPerSide)}kg</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Total Weight</p>
                    <p className={`text-2xl font-display ${isExactMatch ? "text-green-500" : "text-yellow-500"}`}>
                      {formatWeight(target >= totalBarWeight ? achievableWeight : 0)}kg
                    </p>
                  </div>
                </div>

                {target < totalBarWeight ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Target weight must be at least {totalBarWeight}kg (barbell{useCompetitionCollars ? " + collars" : ""})</p>
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
                    <div className="flex items-center justify-center gap-0 overflow-x-auto py-4">
                      {/* Left collar */}
                      {useCompetitionCollars && (
                        <div className="w-4 h-10 bg-orange-500 border border-orange-600 rounded-sm shadow-md flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white rotate-90">2.5</span>
                        </div>
                      )}
                      
                      {/* Left plates (reversed order) */}
                      <div className="flex items-center gap-0.5">
                        {[...neededPlates].reverse().flatMap((plate, plateIndex) =>
                          Array.from({ length: plate.count }).map((_, i) => (
                            <div
                              key={`left-${plateIndex}-${i}`}
                              className={`${plate.color} ${plate.border} border rounded-sm shadow-md flex items-center justify-center ${
                                plate.weight >= 20 ? "w-6 h-20" :
                                plate.weight >= 10 ? "w-5 h-16" :
                                plate.weight >= 5 ? "w-4 h-14" :
                                "w-3 h-12"
                              }`}
                            >
                              <span className={`text-[10px] font-bold rotate-90 ${plate.weight === 5 || plate.weight === 15 ? "text-gray-800" : "text-white"}`}>
                                {plate.weight}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Barbell */}
                      <div className="h-5 w-24 md:w-40 bg-[#dde9ee] rounded-full shadow-inner flex items-center justify-center relative">
                        <span className="text-[10px] font-bold text-gray-700">{barbellWeight}kg</span>
                      </div>

                      {/* Right plates */}
                      <div className="flex items-center gap-0.5">
                        {neededPlates.flatMap((plate, plateIndex) =>
                          Array.from({ length: plate.count }).map((_, i) => (
                            <div
                              key={`right-${plateIndex}-${i}`}
                              className={`${plate.color} ${plate.border} border rounded-sm shadow-md flex items-center justify-center ${
                                plate.weight >= 20 ? "w-6 h-20" :
                                plate.weight >= 10 ? "w-5 h-16" :
                                plate.weight >= 5 ? "w-4 h-14" :
                                "w-3 h-12"
                              }`}
                            >
                              <span className={`text-[10px] font-bold rotate-90 ${plate.weight === 5 || plate.weight === 15 ? "text-gray-800" : "text-white"}`}>
                                {plate.weight}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Right collar */}
                      {useCompetitionCollars && (
                        <div className="w-4 h-10 bg-orange-500 border border-orange-600 rounded-sm shadow-md flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white rotate-90">2.5</span>
                        </div>
                      )}
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

            {/* Plate Colour Reference */}
            <div className="card-elevated rounded-2xl p-8">
              <h2 className="font-display text-2xl mb-6 text-center">Plate Colours</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[...plates, collarPlate].map((plate, index) => (
                  <div key={`${plate.weight}-${index}`} className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-xl">
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

export default PL8;
