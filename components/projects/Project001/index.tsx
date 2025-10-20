'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Project001() {
  const initialTodos: Todo[] = [
    { id: 1, text: 'Next.js öğren', completed: true },
    { id: 2, text: 'TypeScript öğren', completed: false },
    { id: 3, text: '100 proje tamamla', completed: false },
  ];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [expandedTodos, setExpandedTodos] = useState<Set<number>>(new Set());

  // Mobil için farklı limitler
  const MAX_DISPLAY_LENGTH = 18; // Gösterilecek maksimum karakter (mobilde daha kısa)
  const MAX_INPUT_LENGTH = 100; // Input maksimum karakter

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setExpandedTodos(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetApp = () => {
    setTodos(initialTodos);
    setNewTodo('');
    setExpandedTodos(new Set());
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white mb-1 flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">📝</span>
            <span>To-Do List</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
            {completedCount} / {totalCount} görev tamamlandı
          </p>
        </div>
        <button
          onClick={resetApp}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
          title="Uygulamayı sıfırla"
          aria-label="Uygulamayı sıfırla"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500 dark:text-secondary-400" />
        </button>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mb-4 sm:mb-6">
        <div className="w-full h-2 sm:h-2.5 bg-gray-200 dark:bg-secondary-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            style={{
              width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Yeni Görev Ekleme */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTodo()}
            placeholder="Yeni görev ekle..."
            maxLength={MAX_INPUT_LENGTH}
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder:text-secondary-400 dark:placeholder:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 transition-all"
            aria-label="Yeni görev"
          />
          {/* Karakter Sayacı */}
          {newTodo.length > 80 && (
            <p className="text-xs text-secondary-400 dark:text-secondary-500 mt-1">
              {newTodo.length} / {MAX_INPUT_LENGTH} karakter
            </p>
          )}
        </div>
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
          aria-label="Görev ekle"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Ekle</span>
        </button>
      </div>

      {/* Görev Listesi */}
      <ul className="space-y-2 sm:space-y-2.5" role="list">
        {todos.map(todo => {
          const isExpanded = expandedTodos.has(todo.id);
          const isLongText = todo.text.length > MAX_DISPLAY_LENGTH;
          const displayText =
            isLongText && !isExpanded
              ? todo.text.slice(0, MAX_DISPLAY_LENGTH) + '...'
              : todo.text;

          return (
            <li
              key={todo.id}
              className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 hover:shadow-md dark:hover:bg-secondary-700/50 transition-all group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all touch-manipulation ${
                    todo.completed
                      ? 'bg-green-500 border-green-500 scale-110'
                      : 'border-gray-300 dark:border-secondary-600 hover:border-primary-500'
                  }`}
                  aria-label={
                    todo.completed
                      ? 'Tamamlanmadı olarak işaretle'
                      : 'Tamamlandı olarak işaretle'
                  }
                >
                  {todo.completed && (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </button>

                {/* Görev Metni - Word Break Eklendi */}
                <span
                  className={`flex-1 min-w-0 transition-all text-sm sm:text-base break-words overflow-wrap-anywhere ${
                    todo.completed
                      ? 'line-through text-secondary-400 dark:text-secondary-500'
                      : 'text-secondary-900 dark:text-white'
                  }`}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    hyphens: 'auto',
                  }}
                >
                  {displayText}
                </span>

                {/* Sil Butonu */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 p-1.5 sm:p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
                  aria-label="Görevi sil"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Genişlet/Daralt Butonu */}
              {isLongText && (
                <button
                  onClick={() => toggleExpand(todo.id)}
                  className="flex items-center gap-1 text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors self-start ml-7 sm:ml-8"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      Daha az göster
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      Devamını oku
                    </>
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Boş Durum */}
      {todos.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 dark:bg-secondary-700 rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">✅</span>
          </div>
          <p className="text-sm sm:text-base text-secondary-500 dark:text-secondary-400 mb-1 sm:mb-2">
            Henüz görev yok
          </p>
          <p className="text-xs sm:text-sm text-secondary-400 dark:text-secondary-500">
            Yukarıdan yeni görev ekleyerek başlayın! 🎯
          </p>
        </div>
      )}
    </div>
  );
}
