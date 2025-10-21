'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXTERNAL_LINKS } from "@/lib/constants";

interface BookingCardProps {
  title: string;
  description: string;
  duration?: string;
  price?: string;
  icon: LucideIcon;
  variant: "primary" | "secondary" | "specialty" | "urgent";
  className?: string;
}

const variantStyles = {
  primary: "border-primary/20 hover:border-primary/40",
  secondary: "border-secondary/20 hover:border-secondary/40", 
  specialty: "border-medical-specialty/20 hover:border-medical-specialty/40",
  urgent: "border-medical-urgent/20 hover:border-medical-urgent/40"
};

const buttonStyles = {
  primary: "bg-primary hover:bg-primary/90",
  secondary: "bg-secondary hover:bg-secondary/90",
  specialty: "bg-medical-specialty hover:bg-medical-specialty/90", 
  urgent: "bg-medical-urgent hover:bg-medical-urgent/90"
};

export function BookingCard({ 
  title, 
  description, 
  duration, 
  price, 
  icon: Icon, 
  variant,
  className 
}: BookingCardProps) {
  const handleBooking = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className={cn(
      "relative group transition-all duration-300 md:hover:scale-105 hover:shadow-xl bg-card/50 backdrop-blur-sm",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="text-center mobile-card-spacing pb-4">
        <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-accent/10 w-fit">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
        </div>
        <CardTitle className="mobile-heading font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center mobile-card-spacing pb-4">
        <CardDescription className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
          {description}
        </CardDescription>
        
        {(duration || price) && (
          <div className="space-y-2 text-sm">
            {duration && (
              <p className="text-accent font-medium">
                Duration: {duration}
              </p>
            )}
            {price && (
              <p className="text-accent font-medium">
                {price}
              </p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 mobile-card-spacing pb-4 sm:pb-6">
        <Button 
          onClick={handleBooking}
          className={cn(
            "w-full mobile-button font-medium text-white transition-all duration-200 md:hover:scale-105 shadow-lg",
            buttonStyles[variant]
          )}
        >
          Book Now
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}