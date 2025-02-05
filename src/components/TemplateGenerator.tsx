// app/components/TemplateGenerator.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Cpu } from 'lucide-react';
import { Label } from './ui/label';

interface TemplateGeneratorProps {
  templates: Array<{ name: string; message: string }>;
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
  inputValues: Record<string, string>;
  setInputValues: (values: Record<string, string>) => void;
  generatedOutput: string;
  generateTemplate: () => void;
  copyToClipboard: () => void;
  isCopied: boolean;
  getInputFields: () => string[];
}

export function TemplateGenerator({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  inputValues,
  setInputValues,
  generatedOutput,
  generateTemplate,
  copyToClipboard,
  isCopied,
  getInputFields,
}: TemplateGeneratorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Choose a Template:</Label>
        <Select
          value={selectedTemplate}
          onValueChange={(value) => {
            setSelectedTemplate(value);
            setInputValues({});
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template, index) => (
              <SelectItem key={template.name} value={index.toString()}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTemplate !== '' && (
        <div className="space-y-4">
          {getInputFields().map((fieldName) => (
            <div key={fieldName}>
              <Label>{fieldName}</Label>
              <Input
                value={inputValues[fieldName] || ''}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    [fieldName]: e.target.value,
                  })
                }
                placeholder={`Enter value for ${fieldName}`}
              />
            </div>
          ))}

          <Button onClick={generateTemplate} className="w-full">
            <Cpu className="w-4 h-4 mr-1" />
            Generate Template
          </Button>

          {generatedOutput && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm whitespace-pre-wrap">
                {generatedOutput}
              </div>
              <Button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2"
                variant={isCopied ? "outline" : "default"}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}