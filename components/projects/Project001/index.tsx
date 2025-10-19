'use client';

import { useState } from 'react';
import { Plus, Trash2, Check, RotateCcw } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Project001() {
  // Başlangıç görevleri
  const initialTodos: Todo[] = [
    { id: 1, text: 'Next.js öğren', completed: true },
    { id: 2, text: 'TypeScript öğren', completed: false },
    { id: 3, text: '100 proje tamamla', completed: false },
  ];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  // Yeni görev ekle
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  // Görev durumunu değiştir (tamamlandı/tamamlanmadı)
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Görevi sil
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Uygulamayı sıfırla
  const resetApp = () => {
    setTodos(initialTodos);
    setNewTodo('');
  };

  // İstatistikler
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
            📝 To-Do List
          </h3>
          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            {completedCount} / {totalCount} görev tamamlandı
          </p>
        </div>
        <button
          onClick={resetApp}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
          title="Uygulamayı sıfırla"
        >
          <RotateCcw className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
        </button>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mb-6">
        <div className="w-full h-2 bg-gray-200 dark:bg-secondary-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            style={{
              width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Yeni Görev Ekleme */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder:text-secondary-400 dark:placeholder:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 transition-all"
          aria-label="Yeni görev"
        />
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
          aria-label="Görev ekle"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Ekle</span>
        </button>
      </div>

      {/* Görev Listesi */}
      <ul className="space-y-2" role="list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 hover:shadow-md dark:hover:bg-secondary-700/50 transition-all group"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
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
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            {/* Görev Metni */}
            <span
              className={`flex-1 transition-all ${
                todo.completed
                  ? 'line-through text-secondary-400 dark:text-secondary-500'
                  : 'text-secondary-900 dark:text-white'
              }`}
            >
              {todo.text}
            </span>

            {/* Sil Butonu */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Görevi sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      {/* Boş Durum */}
      {todos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-secondary-700 rounded-full flex items-center justify-center">
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-secondary-500 dark:text-secondary-400 mb-2">
            Henüz görev yok
          </p>
          <p className="text-sm text-secondary-400 dark:text-secondary-500">
            Yukarıdan yeni görev ekleyerek başlayın! 🎯
          </p>
        </div>
      )}
    </div>
  );
}
