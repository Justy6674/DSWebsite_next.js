'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Zap, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SitemapPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const downloadSitemap = async (functionName: string, filename: string, title: string) => {
    setIsLoading(functionName);
    try {
      const { data, error } = await supabase.functions.invoke(functionName);
      
      if (error) {
        toast({
          title: "Download Failed",
          description: `Error downloading ${title}: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      // Create and download the sitemap
      const blob = new Blob([data], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Successful",
        description: `${title} downloaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: `Error downloading ${title}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(null);
    }
  };

  const pingSearchEngines = async () => {
    setIsLoading('ping');
    try {
      const { data, error } = await supabase.functions.invoke('ping-google-sitemap');
      
      if (error) {
        toast({
          title: "Ping Failed",
          description: `Error pinging search engines: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Ping Successful",
        description: data.message || "Search engines have been notified about sitemap updates",
      });
    } catch (error) {
      toast({
        title: "Ping Failed",
        description: `Error pinging search engines: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(null);
    }
  };

  const sitemaps = [
    {
      function: 'generate-sitemap-index',
      filename: 'sitemap-index.xml',
      title: 'Sitemap Index',
      description: 'Master index of all sitemaps'
    },
    {
      function: 'generate-main-sitemap',
      filename: 'sitemap.xml',
      title: 'Main Sitemap',
      description: 'Core website pages'
    },
    {
      function: 'generate-sitemap-locations',
      filename: 'sitemap-locations.xml',
      title: 'Locations Sitemap',
      description: 'Weight loss clinic locations'
    },
    {
      function: 'generate-blog-sitemap',
      filename: 'sitemap-blog.xml',
      title: 'Blog Sitemap',
      description: 'Blog posts and articles'
    },
    {
      function: 'generate-sitemap-images',
      filename: 'sitemap-images.xml',
      title: 'Images Sitemap',
      description: 'Image assets and galleries'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sitemap Management</h1>
          <p className="text-muted-foreground">Download sitemaps and notify search engines</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {sitemaps.map((sitemap) => (
            <Card key={sitemap.function} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  {sitemap.title}
                </CardTitle>
                <CardDescription>{sitemap.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => downloadSitemap(sitemap.function, sitemap.filename, sitemap.title)}
                  disabled={isLoading === sitemap.function}
                  className="w-full"
                  variant="outline"
                >
                  {isLoading === sitemap.function ? 'Downloading...' : 'Download'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Search Engine Notification
            </CardTitle>
            <CardDescription>
              Notify Google and Bing about sitemap updates to speed up indexing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={pingSearchEngines}
              disabled={isLoading === 'ping'}
              className="w-full"
            >
              {isLoading === 'ping' ? 'Notifying...' : 'Ping Search Engines'}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">What this does:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Download individual sitemaps for inspection or backup</li>
            <li>• Notify Google and Bing when sitemaps are updated</li>
            <li>• Help speed up search engine crawling and indexing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}