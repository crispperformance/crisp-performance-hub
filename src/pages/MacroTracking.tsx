import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Droplets, Beef } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MacroTracking = () => {
  const [totalCalories, setTotalCalories] = useState(2000);
  const [carbPercent, setCarbPercent] = useState(40);
  const [proteinPercent, setProteinPercent] = useState(30);
  const [fatPercent, setFatPercent] = useState(30);

  // Calculate grams from percentages
  const calculations = useMemo(() => {
    const carbCalories = (totalCalories * carbPercent) / 100;
    const proteinCalories = (totalCalories * proteinPercent) / 100;
    const fatCalories = (totalCalories * fatPercent) / 100;

    return {
      carbs: {
        calories: carbCalories,
        grams: Math.round(carbCalories / 4),
      },
      protein: {
        calories: proteinCalories,
        grams: Math.round(proteinCalories / 4),
      },
      fat: {
        calories: fatCalories,
        grams: Math.round(fatCalories / 9),
      },
    };
  }, [totalCalories, carbPercent, proteinPercent, fatPercent]);

  const pieData = [
    { name: "Carbohydrates", value: carbPercent, color: "hsl(var(--primary))" },
    { name: "Fat", value: fatPercent, color: "hsl(45, 80%, 50%)" },
    { name: "Protein", value: proteinPercent, color: "hsl(220, 70%, 50%)" },
  ];

  const macroCards = [
    {
      title: "Carbohydrates",
      icon: Flame,
      calories: 4,
      description: "Primary energy source for high-intensity exercise and brain function.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Fat",
      icon: Droplets,
      calories: 9,
      description: "Supports hormone production, nutrient absorption, and sustained energy.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Protein",
      icon: Beef,
      calories: 4,
      description: "Essential for muscle repair, growth, and maintaining lean body mass.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  // Handle percentage changes ensuring they sum to 100
  const handleCarbChange = (value: number[]) => {
    const newCarb = value[0];
    const remaining = 100 - newCarb;
    const proteinRatio = proteinPercent / (proteinPercent + fatPercent) || 0.5;
    setCarbPercent(newCarb);
    setProteinPercent(Math.round(remaining * proteinRatio));
    setFatPercent(Math.round(remaining * (1 - proteinRatio)));
  };

  const handleProteinChange = (value: number[]) => {
    const newProtein = value[0];
    const remaining = 100 - newProtein;
    const carbRatio = carbPercent / (carbPercent + fatPercent) || 0.5;
    setProteinPercent(newProtein);
    setCarbPercent(Math.round(remaining * carbRatio));
    setFatPercent(Math.round(remaining * (1 - carbRatio)));
  };

  const handleFatChange = (value: number[]) => {
    const newFat = value[0];
    const remaining = 100 - newFat;
    const carbRatio = carbPercent / (carbPercent + proteinPercent) || 0.5;
    setFatPercent(newFat);
    setCarbPercent(Math.round(remaining * carbRatio));
    setProteinPercent(Math.round(remaining * (1 - carbRatio)));
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />
      
      {/* Accent glow - sunburst effect */}
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      <main className="pt-32 pb-20 relative z-10">
        <div className="container-custom">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
              Macro <span className="text-primary">Calculator</span>
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Understanding your macronutrients is key to achieving your fitness goals. 
              Use this calculator to break down your daily calorie intake.
            </p>
          </motion.div>

          {/* Macro Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {macroCards.map((macro, index) => (
              <Card key={macro.title} className="bg-secondary/30 border-border/50">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-lg ${macro.bgColor} flex items-center justify-center mb-3`}>
                    <macro.icon className={`w-6 h-6 ${macro.color}`} />
                  </div>
                  <CardTitle className="font-display text-xl">{macro.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-3xl font-display ${macro.color} mb-2`}>
                    {macro.calories} <span className="text-lg text-muted-foreground">kcal/g</span>
                  </p>
                  <p className="text-muted-foreground text-sm font-body">{macro.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Calculator Inputs */}
            <Card className="bg-secondary/30 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Calculate Your Macros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Total Calories Input */}
                <div className="space-y-3">
                  <Label htmlFor="calories" className="font-body text-sm uppercase tracking-wider">
                    Total Daily Calories
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    value={totalCalories}
                    onChange={(e) => setTotalCalories(Number(e.target.value) || 0)}
                    className="bg-background border-border text-lg font-display"
                    min={0}
                    max={10000}
                  />
                </div>

                {/* Carbohydrates Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="font-body text-sm uppercase tracking-wider text-primary">
                      Carbohydrates
                    </Label>
                    <span className="font-display text-primary">{carbPercent}%</span>
                  </div>
                  <div className="relative flex w-full touch-none select-none items-center">
                    <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="absolute h-full bg-primary" 
                        style={{ width: `${carbPercent}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={carbPercent}
                      onChange={(e) => handleCarbChange([Number(e.target.value)])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors pointer-events-none"
                      style={{ left: `calc(${carbPercent}% - 10px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground font-body">
                    <span>{calculations.carbs.calories.toFixed(0)} kcal</span>
                    <span>{calculations.carbs.grams}g</span>
                  </div>
                </div>

                {/* Fat Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="font-body text-sm uppercase tracking-wider text-yellow-500">
                      Fat
                    </Label>
                    <span className="font-display text-yellow-500">{fatPercent}%</span>
                  </div>
                  <div className="relative flex w-full touch-none select-none items-center">
                    <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="absolute h-full bg-yellow-500" 
                        style={{ width: `${fatPercent}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={fatPercent}
                      onChange={(e) => handleFatChange([Number(e.target.value)])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute block h-5 w-5 rounded-full border-2 border-yellow-500 bg-background ring-offset-background transition-colors pointer-events-none"
                      style={{ left: `calc(${fatPercent}% - 10px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground font-body">
                    <span>{calculations.fat.calories.toFixed(0)} kcal</span>
                    <span>{calculations.fat.grams}g</span>
                  </div>
                </div>

                {/* Protein Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="font-body text-sm uppercase tracking-wider text-blue-500">
                      Protein
                    </Label>
                    <span className="font-display text-blue-500">{proteinPercent}%</span>
                  </div>
                  <div className="relative flex w-full touch-none select-none items-center">
                    <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="absolute h-full bg-blue-500" 
                        style={{ width: `${proteinPercent}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={proteinPercent}
                      onChange={(e) => handleProteinChange([Number(e.target.value)])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute block h-5 w-5 rounded-full border-2 border-blue-500 bg-background ring-offset-background transition-colors pointer-events-none"
                      style={{ left: `calc(${proteinPercent}% - 10px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground font-body">
                    <span>{calculations.protein.calories.toFixed(0)} kcal</span>
                    <span>{calculations.protein.grams}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-secondary/30 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${value}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number, name: string) => [`${value}%`, name]}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-foreground font-body text-sm">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-primary font-display text-2xl">{calculations.carbs.grams}g</p>
                    <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">Carbs</p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 rounded-lg">
                    <p className="text-yellow-500 font-display text-2xl">{calculations.fat.grams}g</p>
                    <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">Fat</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <p className="text-blue-500 font-display text-2xl">{calculations.protein.grams}g</p>
                    <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">Protein</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MacroTracking;
