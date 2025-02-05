// app/page.tsx
'use client';

import { TemplateForm } from '@/components/TemplateForm';
import { TemplateGenerator } from '@/components/TemplateGenerator';
import { TemplateList } from '@/components/TemplateList';
import { useState, useEffect } from 'react';

export default function Home() {
  const [templates, setTemplates] = useState<Array<{ name: string; message: string }>>([]);
  const [templateName, setTemplateName] = useState('');
  const [templateMessage, setTemplateMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const storedTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
    setTemplates(storedTemplates);
  }, []);

  const saveTemplate = () => {
    if (!templateName || !templateMessage) {
      alert("Please fill in both fields.");
      return;
    }

    const newTemplates = [...templates, { name: templateName, message: templateMessage }];
    setTemplates(newTemplates);
    localStorage.setItem('templates', JSON.stringify(newTemplates));
    setTemplateName('');
    setTemplateMessage('');
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditName(templates[index].name);
    setEditMessage(templates[index].message);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditName('');
    setEditMessage('');
  };

  const saveEdit = (index: number) => {
    if (!editName || !editMessage) {
      alert("Please fill in both fields.");
      return;
    }

    const newTemplates = [...templates];
    newTemplates[index] = { name: editName, message: editMessage };
    setTemplates(newTemplates);
    localStorage.setItem('templates', JSON.stringify(newTemplates));

    if (selectedTemplate === index.toString()) {
      setInputValues({});
      setGeneratedOutput('');
    }

    setEditingIndex(null);
    setEditName('');
    setEditMessage('');
  };

  const deleteTemplate = (index: number) => {
    const newTemplates = templates.filter((_, i) => i !== index);
    setTemplates(newTemplates);
    localStorage.setItem('templates', JSON.stringify(newTemplates));
    if (selectedTemplate === index.toString()) {
      setSelectedTemplate('');
      setInputValues({});
      setGeneratedOutput('');
    }
    if (editingIndex === index) {
      cancelEditing();
    }
  };

  const getInputFields = () => {
    if (!selectedTemplate) return [];
    const template = templates[Number(selectedTemplate)];
    if (!template) return [];
    const fieldMatches = template.message.match(/\[.*?\]/g) || [];
    return [...new Set(fieldMatches.map(field => field.replace(/\[|\]/g, '')))];
  };

  const generateTemplate = () => {
    if (!selectedTemplate) return;
    const template = templates[Number(selectedTemplate)];
    if (!template) return;

    let output = template.message;
    for (const [key, value] of Object.entries(inputValues)) {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      output = output.replace(regex, value || '');
    }
    setGeneratedOutput(output);
  };

  const copyToClipboard = async () => {
    if (!generatedOutput) return;

    try {
      await navigator.clipboard.writeText(generatedOutput);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedOutput;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="h-full bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 border-r border-gray-200 mr-4">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Template Generator</h2>

          <TemplateForm
            templateName={templateName}
            templateMessage={templateMessage}
            setTemplateName={setTemplateName}
            setTemplateMessage={setTemplateMessage}
            saveTemplate={saveTemplate}
          />

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Saved Templates</h3>
          <TemplateList
            templates={templates}
            editingIndex={editingIndex}
            editName={editName}
            editMessage={editMessage}
            setEditName={setEditName}
            setEditMessage={setEditMessage}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEditing={cancelEditing}
            deleteTemplate={deleteTemplate}
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Generate Template</h3>
          <TemplateGenerator
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            inputValues={inputValues}
            setInputValues={setInputValues}
            generatedOutput={generatedOutput}
            generateTemplate={generateTemplate}
            copyToClipboard={copyToClipboard}
            isCopied={isCopied}
            getInputFields={getInputFields}
          />
        </div>
      </div>
    </div>
  );

}