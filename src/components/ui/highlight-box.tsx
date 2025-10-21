import React from 'react';
import { User, Calendar, Mail, DollarSign, Target, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HighlightBoxProps {
  className?: string;
}

export function HighlightBox({ className }: HighlightBoxProps) {
  const highlights = [
    {
      icon: User,
      text: "Always see me — no random clinicians"
    },
    {
      icon: Calendar,
      text: "No forced bookings — follow-ups on your terms"
    },
    {
      icon: Mail,
      text: "No spam — respectful communication only"
    },
    {
      icon: DollarSign,
      text: "Affordable & sustainable — multiple options available 😉"
    },
    {
      icon: Target,
      text: "Weight loss & maintenance — not just short-term results"
    },
    {
      icon: Star,
      text: "I'll \"click\" you into a healthy weight — practical, proven, evidence-based"
    }
  ];

  return (
    <Card className={cn("bg-accent/10 border-accent/20 shadow-lg", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Why Patients Choose Justin Black
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {highlights.map((item, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 mt-0.5">
              <item.icon className="h-4 w-4 text-primary md:group-hover:scale-110 transition-transform duration-200" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}