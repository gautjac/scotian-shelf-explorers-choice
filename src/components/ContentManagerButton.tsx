import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from './ui/button';
import { ContentManager } from './ContentManager';

export const ContentManagerButton = () => {
  const [showContentManager, setShowContentManager] = useState(false);
  const [searchParams] = useSearchParams();
  const isAdminMode = searchParams.get('admin') === 'true';

  // Hide button if not in admin mode
  if (!isAdminMode) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowContentManager(true)}
        className="fixed top-4 right-4 z-40 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/90 shadow-lg"
        title="Content Manager (Ctrl+Shift+M)"
      >
        <FileText className="h-4 w-4" />
      </Button>

      {showContentManager && (
        <ContentManager onClose={() => setShowContentManager(false)} />
      )}
    </>
  );
};