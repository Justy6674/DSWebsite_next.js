import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Shield, Heart, Users } from "lucide-react";

export function About() {
  const features = [
    {
      icon: GraduationCap,
      title: "Clinical Expertise",
      description: "Led by registered Australian Nurse Practitioners with specialised training in weight management and metabolic health."
    },
    {
      icon: Shield,
      title: "Australian Standards",
      description: "All consultations follow Australian clinical guidelines and TGA-compliant practices for safe, effective care."
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "Holistic approach addressing medical, nutritional, and lifestyle factors in your weight management journey."
    },
    {
      icon: Users,
      title: "Ongoing Support",
      description: "Continuous monitoring and follow-up care to ensure sustainable results and address any concerns."
    }
  ];

  return (
    <section className="mobile-safe-area bg-muted/20">
      <div className="mobile-container">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="mobile-heading font-bold text-foreground mb-4">
            Professional Clinical Care
          </h2>
          <p className="mobile-text text-muted-foreground max-w-3xl mx-auto">
            Downscale Weight Loss Clinic provides evidence-based weight management consultations 
            through qualified Australian healthcare professionals committed to your success.
          </p>
        </div>

        <div className="mobile-grid gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center bg-card/30 border-border/40 hover:bg-card/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/20 w-fit">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}