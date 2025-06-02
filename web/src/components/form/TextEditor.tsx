"use client";
// src/components/RichTextEditor.tsx
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Code,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
  label: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue,
  onChange,
  label
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configuración del StarterKit
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none px-3 py-2 !text-sm min-h-[200px] bg-white-main ",
      },
    },
  });

  if (!editor) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-t-xl mb-4"></div>
        <div className="h-32 bg-gray-100 rounded-b-xl"></div>
      </div>
    );
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    disabled,
    children,
    tooltip,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    tooltip: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`
        relative group p-2.5 rounded-md text-sm font-medium transition-all duration-200 
        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${
          isActive
            ? "bg-gradient-to-r from-secondary-700 to-secondary-main text-white-main shadow-lg shadow-blue-500/25"
            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200/60"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white-main text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltip}
      </div>
    </button>
  );

  return (
    <div className="w-full mx-auto">
      {/* Contenedor principal con diseño moderno */}
      <label htmlFor="" className="flex gap-1 text-sm text-black-900 mb-1">{label}</label>
      <div className="bg-white-main rounded-main shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm">
        {/* Barra de herramientas moderna */}
        <div className="flex flex-wrap items-center gap-1 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
          {/* Grupo de formato de texto */}
          <div className="flex items-center gap-1 mr-4">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              disabled={!editor.can().toggleBold()}
              tooltip="Negrita (Ctrl+B)"
            >
              <Bold size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              disabled={!editor.can().toggleItalic()}
              tooltip="Cursiva (Ctrl+I)"
            >
              <Italic size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              disabled={!editor.can().toggleStrike()}
              tooltip="Tachado"
            >
              <Strikethrough size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              disabled={!editor.can().toggleCode()}
              tooltip="Código inline"
            >
              <Code size={16} />
            </ToolbarButton>
          </div>

          {/* Separador visual */}
          <div className="w-px h-6 bg-gray-300 mr-4"></div>

          {/* Grupo de listas */}
          <div className="flex items-center gap-1 mr-4">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              disabled={!editor.can().toggleBulletList()}
              tooltip="Lista con viñetas"
            >
              <List size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              disabled={!editor.can().toggleOrderedList()}
              tooltip="Lista numerada"
            >
              <ListOrdered size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              disabled={!editor.can().toggleBlockquote()}
              tooltip="Cita"
            >
              <Quote size={16} />
            </ToolbarButton>
          </div>

          {/* Separador visual */}
          <div className="w-px h-6 bg-gray-300 mr-4"></div>

          {/* Grupo de acciones */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              tooltip="Deshacer (Ctrl+Z)"
            >
              <Undo size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              tooltip="Rehacer (Ctrl+Y)"
            >
              <Redo size={16} />
            </ToolbarButton>
          </div>
        </div>

        {/* Área de edición con diseño mejorado */}
        <div className="relative">
          <EditorContent
            editor={editor}
            className="min-h-[250px] max-h-[400px] overflow-y-auto maxContentEditor focus-within:bg-gray-50/30 transition-colors duration-300"
          />

          {/* Indicador de estado del editor */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Listo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contador de palabras y caracteres */}
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          {/* <span>
            {editor.storage.characterCount?.characters() || 0} caracteres
          </span>
          <span>{editor.storage.characterCount?.words() || 0} palabras</span> */}
        </div>
        <div className="text-right">
          <span className="text-xs">
            Ctrl+B para negrita • Ctrl+I para cursiva
          </span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
