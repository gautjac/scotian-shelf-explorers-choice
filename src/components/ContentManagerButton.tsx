import { useState } from 'react';
import { Settings, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { ContentManager } from './ContentManager';
import { StorageClearButton } from './StorageClearButton';

export const ContentManagerButton = () => {
  const [showContentManager, setShowContentManager] = useState(false);

  return (
    <>
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <StorageClearButton />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowContentManager(true)}
          className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/90 shadow-lg"
          title="Content Manager (Ctrl+Shift+M)"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>

      {showContentManager && (
        <ContentManager onClose={() => setShowContentManager(false)} />
      )}
    </>
  );
};