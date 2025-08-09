import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

export const EditorGuide = () => {
  return (
    <ScrollArea className="h-[60vh] w-full">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Content Structure Overview</h3>
          <p className="text-sm text-muted-foreground">
            This guide explains every field in the CSV files and where each piece of content appears in the app.
          </p>
        </div>

        <Separator />

        {/* Scenario Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Scenario Fields
              <Badge variant="secondary">SCENARIOS Section</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">id</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unique identifier for the scenario (e.g., "fishing-practices", "renewable-energy"). Use lowercase with hyphens.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">title</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Short, engaging scenario name displayed on the <strong>Scenario Preview</strong> screen and during gameplay.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">description</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Detailed explanation of the situation. Appears on the <strong>Scenario Preview</strong> screen and sets up the decision context.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">imageUrl</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Path to visual representation (e.g., "/src/assets/images/fishing-practices.jpg"). Shows on preview and game screens.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Choice Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Choice Fields
              <Badge variant="secondary">SCENARIOS Section</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">text</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  The choice option text users see on the <strong>Game Playing</strong> screen. Keep concise but descriptive.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">consequence</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Immediate outcome shown in the <strong>Consequence Modal</strong> after the user makes this choice.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">pros</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Positive outcomes explained simply. Displayed in the <strong>Consequence Modal</strong> to show benefits.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">cons</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Negative outcomes or trade-offs. Shown in the <strong>Consequence Modal</strong> for balanced decision-making.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">nextScenarioId</code>
                  <Badge variant="outline">Optional</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ID of the next scenario to load. If empty, the game continues to the next scenario in order.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Impact Values
              <Badge variant="secondary">SCENARIOS Section</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">ecosystem</code>
                  <Badge variant="outline">0-100 scale</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Affects marine life health shown in the <strong>Health Meters</strong>. Higher values improve species health.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">economic</code>
                  <Badge variant="outline">-100 to +100</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Affects jobs and economic health in the <strong>Health Meters</strong>. Negative values harm economy, positive help.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">community</code>
                  <Badge variant="outline">-100 to +100</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Affects people and culture shown in the <strong>Health Meters</strong>. Impacts community well-being and traditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UI Text Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              UI Text Fields
              <Badge variant="secondary">UI_ELEMENTS Section</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">Screen</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Which app screen this text appears on (e.g., "language-selection", "game-playing", "completion").
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">Element</code>
                  <Badge variant="outline">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Specific UI element (e.g., "play-button", "health-meter-label", "restart-button").
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">Language Columns</code>
                  <Badge variant="outline">English, French, Mi'kmaw</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Separate columns for each language translation. All languages should have content for consistency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Screen Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Screen-by-Screen Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Language Selection Screen</h4>
                <p className="text-sm text-muted-foreground">Button text for Mi'kmaw, English, and French options</p>
              </div>
              
              <div>
                <h4 className="font-medium">Scenario Preview Screen</h4>
                <p className="text-sm text-muted-foreground">Scenario titles, descriptions, "Begin" and "Next" buttons</p>
              </div>
              
              <div>
                <h4 className="font-medium">Game Playing Screen</h4>
                <p className="text-sm text-muted-foreground">Choice options, health meter labels, species names, navigation buttons</p>
              </div>
              
              <div>
                <h4 className="font-medium">Consequence Modal</h4>
                <p className="text-sm text-muted-foreground">Impact explanations, "Continue" button, pros/cons sections</p>
              </div>
              
              <div>
                <h4 className="font-medium">Completion Screen</h4>
                <p className="text-sm text-muted-foreground">Final messages, health summaries, "Play Again" button</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep choice text under 100 characters for mobile readability</li>
              <li>• Balance positive and negative impacts across choices</li>
              <li>• Test impact values to ensure meaningful health meter changes</li>
              <li>• Use consistent terminology across all languages</li>
              <li>• Ensure cultural sensitivity in Mi'kmaw translations</li>
              <li>• Preview changes on different screen sizes</li>
              <li>• Backup your CSV before making major changes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};