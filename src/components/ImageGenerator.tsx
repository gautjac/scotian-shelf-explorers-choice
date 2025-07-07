import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const scenarioPrompts = [
  {
    id: 'plastic-pollution',
    title: 'Plastic Pollution',
    prompt: 'Ocean scene with plastic waste floating in blue waters, fishing boats in distance, educational illustration style, vibrant but concerning environmental message, Nova Scotia coastal setting'
  },
  {
    id: 'whales-entangled',
    title: 'Whale Entanglement',
    prompt: 'Majestic whale partially entangled in fishing nets underwater, dramatic ocean lighting, educational marine biology illustration, hope and concern balanced, deep blue ocean scene'
  },
  {
    id: 'overfishing',
    title: 'Overfishing',
    prompt: 'Commercial fishing boat with large nets, depleted ocean waters, educational illustration showing impact on marine ecosystem, realistic but hopeful tone, Atlantic ocean setting'
  },
  {
    id: 'marine-protection',
    title: 'Marine Protected Area',
    prompt: 'Thriving coral reef with diverse fish species, protected marine sanctuary, vibrant underwater ecosystem, educational nature illustration, healthy ocean environment'
  },
  {
    id: 'sustainable-fishing',
    title: 'Sustainable Fishing',
    prompt: 'Small fishing boat using sustainable methods, clear blue ocean, responsible fishing practices, educational illustration promoting conservation, Nova Scotia fishing community'
  },
  {
    id: 'ocean-acidification',
    title: 'Ocean Acidification',
    prompt: 'Underwater scene showing healthy vs affected coral, scientific educational illustration, marine chemistry impact, clear water with subtle environmental message'
  },
  {
    id: 'shipping-pollution',
    title: 'Shipping Impact',
    prompt: 'Large cargo ship in ocean with subtle pollution effects, shipping lanes impact on marine life, educational illustration, Atlantic shipping route, environmental awareness'
  },
  {
    id: 'coastal-development',
    title: 'Coastal Development',
    prompt: 'Coastal area showing development impact on marine environment, educational illustration about land-sea interaction, Nova Scotia coastline, balanced development message'
  }
];

export const ImageGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(scenarioPrompts[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error('Please enter your Runware API key');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = customPrompt || selectedPrompt.prompt;
      
      // Simple fetch to Runware API (placeholder for now)
      toast.info('Image generation feature will be available after Supabase setup');
      
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please complete Supabase setup first.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Scenario Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Runware API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Runware API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Get your API key from <a href="https://runware.ai" target="_blank" rel="noopener noreferrer" className="underline">runware.ai</a>
            </p>
          </div>

          <div>
            <Label htmlFor="scenario">Scenario Template</Label>
            <select
              id="scenario"
              className="w-full border rounded-md p-2"
              value={selectedPrompt.id}
              onChange={(e) => setSelectedPrompt(scenarioPrompts.find(s => s.id === e.target.value) || scenarioPrompts[0])}
            >
              {scenarioPrompts.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="prompt">Custom Prompt (optional)</Label>
            <Textarea
              id="prompt"
              placeholder={selectedPrompt.prompt}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !apiKey}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </Button>
        </CardContent>
      </Card>

      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedImages.map((url, index) => (
                <div key={index} className="space-y-2">
                  <img
                    src={url}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <p className="text-sm text-muted-foreground break-all">{url}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(url);
                      toast.success('Image URL copied to clipboard');
                    }}
                  >
                    Copy URL
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};