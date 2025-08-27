import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { useComprehensiveConfig } from '@/hooks/useComprehensiveConfig';
import { Shield, Database, Zap } from 'lucide-react';

export const StaticContentController = () => {
  const { 
    forceStaticMode, 
    enableForceStaticMode, 
    disableForceStaticMode,
    hasConfig 
  } = useComprehensiveConfig();

  return (
    <Alert className="border-blue-200 bg-blue-50 mb-4">
      <Shield className="h-4 w-4 text-blue-600" />
      <AlertDescription className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-900">Static Content Mode</p>
            <p className="text-sm text-blue-700">
              {forceStaticMode 
                ? "✅ Using static content only - no cached overrides" 
                : "⚠️ Using cached content if available - may show outdated scenarios"}
            </p>
          </div>
          <Switch
            checked={forceStaticMode}
            onCheckedChange={forceStaticMode ? disableForceStaticMode : enableForceStaticMode}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Database className="h-3 w-3" />
            <span>Cached Config: {hasConfig ? "Available" : "None"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            <span>Content Source: {forceStaticMode ? "Static Files" : "Cache → Static"}</span>
          </div>
        </div>

        {!forceStaticMode && (
          <Button
            onClick={enableForceStaticMode}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Shield className="h-4 w-4 mr-2" />
            Force Static Content Mode
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};