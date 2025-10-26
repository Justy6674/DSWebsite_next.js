'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  triggerText?: string;
  triggerClassName?: string;
  children?: React.ReactNode;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  triggerText = 'Email Us',
  triggerClassName = 'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      toast.success('Email sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
        style: {
          background: '#475569',
          color: '#f7f2d3',
        },
      });

      reset();
      setIsOpen(false);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send email. Please try again.', {
        duration: 5000,
        style: {
          background: '#dc2626',
          color: '#ffffff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className={triggerClassName}>
            <Mail className="h-4 w-4" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cream flex items-center gap-2">
            <Mail className="h-5 w-5 text-brown" />
            Contact Downscale Weight Loss Clinic
          </DialogTitle>
          <DialogDescription className="text-cream/80">
            Send us a message and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-cream font-medium">
                Name *
              </Label>
              <Input
                id="name"
                {...register('name')}
                className="bg-slate-900 border-slate-600 text-cream placeholder:text-cream/50 focus:border-brown focus:ring-brown"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-cream font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-slate-900 border-slate-600 text-cream placeholder:text-cream/50 focus:border-brown focus:ring-brown"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-cream font-medium">
              Subject *
            </Label>
            <Input
              id="subject"
              {...register('subject')}
              className="bg-slate-900 border-slate-600 text-cream placeholder:text-cream/50 focus:border-brown focus:ring-brown"
              placeholder="What can we help you with?"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-cream font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              rows={4}
              className="bg-slate-900 border-slate-600 text-cream placeholder:text-cream/50 focus:border-brown focus:ring-brown resize-none"
              placeholder="Please describe your enquiry or question..."
            />
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <p className="text-cream/60 text-sm">
              * Required fields
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-slate-600 text-cream hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brown hover:bg-brown/90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-brown mt-0.5" />
            <div>
              <h4 className="text-cream font-medium mb-1">Direct Email</h4>
              <p className="text-cream/80 text-sm">
                You can also email us directly at{' '}
                <span className="text-brown font-medium">office@downscale.com.au</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};