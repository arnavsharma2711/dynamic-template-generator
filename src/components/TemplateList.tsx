
// app/components/TemplateList.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save, X } from 'lucide-react';

interface Template {
  name: string;
  message: string;
}

interface TemplateListProps {
  templates: Template[];
  editingIndex: number | null;
  editName: string;
  editMessage: string;
  setEditName: (name: string) => void;
  setEditMessage: (message: string) => void;
  startEditing: (index: number) => void;
  saveEdit: (index: number) => void;
  cancelEditing: () => void;
  deleteTemplate: (index: number) => void;
}

export function TemplateList({
  templates,
  editingIndex,
  editName,
  editMessage,
  setEditName,
  setEditMessage,
  startEditing,
  saveEdit,
  cancelEditing,
  deleteTemplate,
}: TemplateListProps) {
  return (
    <div className="space-y-2">
      {templates.map((template, index) => (
        <div key={template.name} className="p-3 bg-gray-50 rounded-lg">
          {editingIndex === index ? (
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Template name"
              />
              <Textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                placeholder="Template message"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => saveEdit(index)}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEditing}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{template.name}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEditing(index)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTemplate(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}