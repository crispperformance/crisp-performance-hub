import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, User, Ruler, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Gender = "male" | "female";

interface ActivityLevel {
  name: string;
  multiplier: number;
  description: string;
}

const activityLevels: ActivityLevel[] = [
  { name: "Sedentary", multiplier: 1.2, description: "Little to no exercise" },
  { name: "Light", multiplier: 1.375, description: "Exercise/sports 1-3 days a week" },
  { name: "Moderate", multiplier: 1.55, description: "Exercise/sports 3-5 days a week" },
  { name: "Very Active", multiplier: 1.725, description: "Hard exercise/sports 6-7 days a week" },
  { name: "Extremely Active", multiplier: 1.9, description: "Hard exercise 6-7 days a week AND physical job" },
  { name: "Professional", multiplier: 2.3, description: "Professional athlete" },
];

const BMRCalculator = () => {
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState<number | string>(70);
  const [height, setHeight] = useState<number | string>(175);
  const [age, setAge] = useState<number | string>(25);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(2);
  const [calorieAdjustment, setCalorieAdjustment] = useState(0);

  // Harris-Benedict Equation
  const calculations = useMemo(() => {
    const w = typeof weight === 'string' ? 0 : weight;
    const h = typeof height === 'string' ? 0 : height;
    const a = typeof age === 'string' ? 0 : age;
    
    let bmr: number;
    
    if (gender === "male") {
      // Male: 66.5 + (13.75 x KG) + (5.003 x CM) - (6.75 x A)
      bmr = 66.5 + (13.75 * w) + (5.003 * h) - (6.75 * a);
    } else {
      // Female: 655.1 + (9.563 x KG) + (1.850 x CM) - (4.676 x A)
      bmr = 655.1 + (9.563 * w) + (1.850 * h) - (4.676 * a);
    }

    const selectedActivity = activityLevels[selectedActivityIndex];
    const maintenance = bmr * selectedActivity.multiplier;
    const adjustedCalories = maintenance + calorieAdjustment;

    return {
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      adjusted: Math.round(adjustedCalories),
      activityCalories: activityLevels.map((level) => ({
        ...level,
        calories: Math.round(bmr * level.multiplier),
      })),
    };
  }, [gender, weight, height, age, selectedActivityIndex, calorieAdjustment]);

  const handleBulk = () => {
    setCalorieAdjustment((prev) => prev + 100);
  };

  const handleCut = () => {
    setCalorieAdjustment((prev) => prev - 100);
  };

  const resetAdjustment = () => {
    setCalorieAdjustment(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
              BMR <span className="text-primary">Calculator</span>
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Calculate your Basal Metabolic Rate and daily calories needed to cut, maintain, or bulk.
            </p>
          </motion.div>

          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid lg:grid-cols-2 gap-8 mb-16"
          >
            {/* Input Card */}
            <Card className="bg-secondary/30 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Your Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gender Selection */}
                <div className="space-y-3">
                  <Label className="font-body text-sm uppercase tracking-wider">Gender</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={gender === "male" ? "default" : "outline"}
                      className={`h-14 font-display text-lg ${gender === "male" ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setGender("male")}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Male
                    </Button>
                    <Button
                      variant={gender === "female" ? "default" : "outline"}
                      className={`h-14 font-display text-lg ${gender === "female" ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setGender("female")}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Female
                    </Button>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-3">
                  <Label htmlFor="weight" className="font-body text-sm uppercase tracking-wider flex items-center gap-2">
                    <Flame className="w-4 h-4 text-primary" />
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                    className="bg-background border-border text-lg font-display"
                    min={0}
                    max={300}
                  />
                </div>

                {/* Height Input */}
                <div className="space-y-3">
                  <Label htmlFor="height" className="font-body text-sm uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                    className="bg-background border-border text-lg font-display"
                    min={0}
                    max={250}
                  />
                </div>

                {/* Age Input */}
                <div className="space-y-3">
                  <Label htmlFor="age" className="font-body text-sm uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="bg-background border-border text-lg font-display"
                    min={0}
                    max={120}
                  />
                </div>

                {/* Activity Level */}
                <div className="space-y-3">
                  <Label className="font-body text-sm uppercase tracking-wider">Activity Level</Label>
                  <div className="grid gap-2">
                    {activityLevels.map((level, index) => (
                      <button
                        key={level.name}
                        onClick={() => setSelectedActivityIndex(index)}
                        className={`p-3 rounded-lg text-left transition-all duration-300 ${
                          selectedActivityIndex === index
                            ? "bg-primary/20 border-primary border"
                            : "bg-background border-border/50 border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-display text-sm">{level.name}</span>
                            <span className="text-muted-foreground text-xs ml-2">({level.multiplier}x)</span>
                          </div>
                          <span className="font-display text-primary">{calculations.activityCalories[index].calories} kcal</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-1">{level.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="bg-secondary/30 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* BMR Result */}
                <div className="p-6 bg-background rounded-lg text-center">
                  <p className="text-muted-foreground text-sm uppercase tracking-wider font-body mb-2">
                    Basal Metabolic Rate
                  </p>
                  <p className="font-display text-5xl text-primary mb-2">{calculations.bmr}</p>
                  <p className="text-muted-foreground text-sm font-body">calories/day</p>
                </div>

                {/* Maintenance Calories */}
                <div className="p-6 bg-primary/10 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm uppercase tracking-wider font-body mb-2">
                    Maintenance Calories ({activityLevels[selectedActivityIndex].name})
                  </p>
                  <p className="font-display text-5xl text-primary mb-2">{calculations.maintenance}</p>
                  <p className="text-muted-foreground text-sm font-body">calories/day</p>
                </div>

                {/* Bulk/Cut Adjustment */}
                <div className="space-y-4">
                  <Label className="font-body text-sm uppercase tracking-wider block text-center">
                    Adjust for Goal
                  </Label>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={handleCut}
                      variant="outline"
                      className="h-14 px-6 border-blue-500 text-blue-500 hover:bg-blue-500/10"
                    >
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Cut -100
                    </Button>
                    <Button
                      onClick={handleBulk}
                      variant="outline"
                      className="h-14 px-6 border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Bulk +100
                    </Button>
                  </div>
                  {calorieAdjustment !== 0 && (
                    <button
                      onClick={resetAdjustment}
                      className="text-muted-foreground text-sm underline mx-auto block hover:text-primary transition-colors"
                    >
                      Reset adjustment
                    </button>
                  )}
                </div>

                {/* Adjusted Calories */}
                {calorieAdjustment !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-lg text-center ${
                      calorieAdjustment > 0 ? "bg-green-500/10" : "bg-blue-500/10"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm uppercase tracking-wider font-body mb-2">
                      Target Calories ({calorieAdjustment > 0 ? "Bulk" : "Cut"}: {calorieAdjustment > 0 ? "+" : ""}{calorieAdjustment})
                    </p>
                    <p className={`font-display text-5xl mb-2 ${calorieAdjustment > 0 ? "text-green-500" : "text-blue-500"}`}>
                      {calculations.adjusted}
                    </p>
                    <p className="text-muted-foreground text-sm font-body">calories/day</p>
                  </motion.div>
                )}

                {/* Formula Display */}
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-body mb-2 text-center">
                    Harris-Benedict Formula ({gender === "male" ? "Male" : "Female"})
                  </p>
                  <p className="text-xs text-muted-foreground font-mono text-center">
                    {gender === "male" 
                      ? "66.5 + (13.75 × kg) + (5.003 × cm) - (6.75 × age)"
                      : "655.1 + (9.563 × kg) + (1.850 × cm) - (4.676 × age)"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Explanation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-secondary/30 border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">What is BMR?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Your <span className="text-primary font-semibold">Basal Metabolic Rate (BMR)</span> is the number of calories your body needs to perform its most basic life-sustaining functions. This includes breathing, circulation, cell production, and nutrient processing. Think of it as the energy your body would burn if you stayed in bed all day doing absolutely nothing.
                  </p>
                  
                  <h3 className="font-display text-xl text-foreground mt-8 mb-4">Why We Use BMR for Maintenance Calories?</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    BMR builds the foundation of your daily calorie needs. Since we don't tend to spend all day in bed, we multiply your BMR by an activity factor to estimate your <span className="text-primary font-semibold">Total Daily Energy Expenditure (TDEE)</span>, also known as your maintenance calories. This is the number of calories you need to maintain your current weight.
                  </p>
                  
                  <h3 className="font-display text-xl text-foreground mt-8 mb-4">The Maths Behind It All</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    We use the Harris-Benedict equation because it's one of the most well-researched and widely accepted methods for estimating BMR. Originally developed in 1918 and revised for accuracy, it takes into account your weight, height, age, and gender to provide a personalised estimate. While no formula is 100% accurate, this equation provides an excellent starting point for most people.
                  </p>
                  
                  <h3 className="font-display text-xl text-foreground mt-8 mb-4">Adjusting for Your Goals</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Once you know your maintenance calories, you can adjust based on your goals. To lose fat ( or cut), you'll eat below maintenance- typically 300-500 calories less. To build muscle (or bulk), you'll eat above maintenance, you'll look to eat around 200-400 calories more. The bulk and cut buttons above let you make these adjustments in 100-calorie increments. It's important to remember that as your weight changes, so will your intake requirements. This is not a single, stuck factor. It must be adjusted reguarly as you go up or down in weight.
                  </p>
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

export default BMRCalculator;