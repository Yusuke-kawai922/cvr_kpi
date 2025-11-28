// app/page.tsx
import Link from 'next/link'
import { UserCircle2 } from 'lucide-react'

// ★ここに実際の先生の名前を入れてください
const STAFF_MEMBERS = ['山口']

export default function StaffSelectPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">お疲れ様です！</h1>
        <p className="text-gray-500 text-sm mt-2">報告者の名前を選んでください</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {STAFF_MEMBERS.map((name) => (
          <Link
            key={name}
            href={`/menu?staff=${encodeURIComponent(name)}`}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-95"
          >
            <UserCircle2 className="w-8 h-8 text-gray-400 mb-2" />
            <span className="font-bold text-gray-700">{name}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}