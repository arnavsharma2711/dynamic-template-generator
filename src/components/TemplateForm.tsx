// app/components/TemplateForm.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';
import { Save } from 'lucide-react';

interface TemplateFormProps {
  templateName: string;
  templateMessage: string;
  setTemplateName: (name: string) => void;
  setTemplateMessage: (message: string) => void;
  saveTemplate: () => void;
}

export function TemplateForm({
  templateName,
  templateMessage,
  setTemplateName,
  setTemplateMessage,
  saveTemplate,
}: TemplateFormProps) {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <Label>Template Name:</Label>
        <Input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Enter template name"
        />
      </div>

      <div>
        <Label>Template Message:</Label>
        <Textarea
          value={templateMessage}
          onChange={(e) => setTemplateMessage(e.target.value)}
          placeholder="Enter template message"
          rows={4}
        />
      </div>

      <Button onClick={saveTemplate} className="w-full">
        <Save className="w-4 h-4 mr-1" />
        Save Template
      </Button>
    </div>
  );
}