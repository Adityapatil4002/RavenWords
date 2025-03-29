
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { generateExcerpt } from '@/lib/api';

interface EditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => void;
  isSaving?: boolean;
}

const Editor: React.FC<EditorProps> = ({ initialTitle = '', initialContent = '', onSave, isSaving = false }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [currentTab, setCurrentTab] = useState('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update preview when content changes
  useEffect(() => {
    const previewContent = document.getElementById('preview-content');
    if (previewContent) {
      previewContent.innerHTML = content;
    }
  }, [content, currentTab]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please add a title');
      return;
    }
    
    onSave(title, content);
  };

  // Editor functions
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const newText = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);
    
    setContent(newText);
    
    // Focus back on textarea and restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatText = (format: string) => {
    switch (format) {
      case 'bold':
        insertTextAtCursor('**', '**');
        break;
      case 'italic':
        insertTextAtCursor('*', '*');
        break;
      case 'underline':
        insertTextAtCursor('<u>', '</u>');
        break;
      case 'h1':
        insertTextAtCursor('# ');
        break;
      case 'h2':
        insertTextAtCursor('## ');
        break;
      case 'h3':
        insertTextAtCursor('### ');
        break;
      case 'quote':
        insertTextAtCursor('> ');
        break;
      case 'code':
        insertTextAtCursor('`', '`');
        break;
      case 'codeblock':
        insertTextAtCursor('```\n', '\n```');
        break;
      case 'link':
        insertTextAtCursor('[Link text](', ')');
        break;
      case 'image':
        insertTextAtCursor('![Alt text](', ')');
        break;
      case 'ul':
        insertTextAtCursor('- ');
        break;
      case 'ol':
        insertTextAtCursor('1. ');
        break;
      default:
        break;
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="text-xl font-bold border-none focus-visible:ring-0 px-0 text-foreground transition-all"
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="flex items-center gap-1 mb-4 border-b border-border pb-2 overflow-x-auto"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {[
          { icon: Bold, format: 'bold' },
          { icon: Italic, format: 'italic' },
          { icon: Underline, format: 'underline' },
          { icon: Heading1, format: 'h1' },
          { icon: Heading2, format: 'h2' },
          { icon: Heading3, format: 'h3' },
          { icon: Quote, format: 'quote' },
          { icon: Code, format: 'code' },
          { icon: List, format: 'ul' },
          { icon: ListOrdered, format: 'ol' },
          { icon: LinkIcon, format: 'link' },
          { icon: Image, format: 'image' }
        ].map((item, index) => (
          <motion.div 
            key={item.format}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 * index }}
          >
            <Button variant="ghost" size="icon" onClick={() => formatText(item.format)}>
              <item.icon className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </motion.div>
      
      <Tabs defaultValue="write" className="flex-grow flex flex-col" onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="flex-grow flex">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your blog post..."
            className="min-h-[300px] flex-grow resize-none border-none focus-visible:ring-0 p-0 font-mono text-foreground transition-all"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-grow">
          <Card className="border border-border/40">
            <CardContent className="p-4">
              <div id="preview-content" className="prose prose-invert max-w-none editor-content"></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Post'
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Editor;
