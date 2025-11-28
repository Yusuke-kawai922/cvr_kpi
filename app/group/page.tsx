// app/group/page.tsx
'use client'

import { useState } from 'react'
import { submitReport } from '../actions'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function GroupPage({
    searchParams,
}: {
    searchParams: { staff: string }
}) {
    const staffName = searchParams.staff || ''
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [participants, setParticipants] = useState<number>(0)
    const [enrollments, setEnrollments] = useState<number>(0)

    const cvr = participants > 0 ? ((enrollments / participants) * 100).toFixed(1) : '0.0'

    async function clientAction(formData: FormData) {
        setIsSubmitting(true)
        formData.append('type', 'group')
        await submitReport(formData)
        alert('保存しました！CVR向上ナイスです！')
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                    <Link href={`/menu?staff=${encodeURIComponent(staffName)}`} className="p-2 -ml-2 text-gray-400 hover:text-gray-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800 ml-2">集団説明会 レポート</h1>
                </div>

                <form action={clientAction} className="space-y-6">
                    <input type="hidden" name="staff" value={staffName} />

                    {/* 担当者表示 */}
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex justify-between items-center">
                        <span className="text-sm text-green-600 font-bold">メインスピーカー</span>
                        <span className="font-bold text-gray-800">{staffName}</span>
                    </div>

                    {/* 日時 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">日時</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>

                    {/* 数字入力エリア */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">来場数(世帯)</label>
                            <input
                                type="number"
                                name="participants"
                                min="0"
                                onChange={(e) => setParticipants(Number(e.target.value))}
                                className="w-full p-3 text-center text-lg font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">申込数</label>
                            <input
                                type="number"
                                name="enrollments"
                                min="0"
                                onChange={(e) => setEnrollments(Number(e.target.value))}
                                className="w-full p-3 text-center text-lg font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    {/* CVR表示 */}
                    <div className="bg-gray-900 text-white rounded-xl p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">現在のCVR</span>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-bold text-green-400">{cvr}</span>
                            <span className="text-sm">%</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                    >
                        {isSubmitting ? '保存中...' : '報告する'}
                    </button>
                </form>
            </div>
        </div>
    )
}