'use server'

import { redirect } from 'next/navigation';

// ★★★ GASのURL（変更なし） ★★★
const GAS_URL = "https://script.google.com/macros/s/AKfycbyegrrKdLQPfFDPje4B6arcsG92OnLpC5WnwXumznRsYoH5P-QyXRdtNmzgJTQHl3G_Og/exec";

// 共通の送信ロジック
async function sendToGAS(payload: any) {
    console.log('--- GASへ送信開始 ---');
    console.log('送信先:', GAS_URL);
    console.log('データ:', payload);

    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            redirect: 'follow',
        });

        if (response.ok) {
            console.log('GASへの送信成功！');
        } else {
            console.error('GASへの送信失敗:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('通信エラー:', error);
    }
}

// ▼▼▼ 個別面談用（これが足りなかった！） ▼▼▼
export async function submitIndividualReport(formData: FormData) {
    const staff = formData.get('staff') as string;
    const date = formData.get('date') as string;
    const studentName = (formData.get('student_name') as string) || '';
    const result = (formData.get('result') as string) || '';

    const payload = {
        type: 'INDIVIDUAL',
        staff,
        date,
        studentName,
        result
    };

    await sendToGAS(payload);
    await new Promise((resolve) => setTimeout(resolve, 800));
    redirect('/');
}

// ▼▼▼ 集団説明会用 ▼▼▼
export async function submitGroupReport(formData: FormData) {
    const staff = formData.get('staff') as string;
    const date = formData.get('date') as string;
    const participants = (formData.get('participants') as string) || '0';
    const enrollments = (formData.get('enrollments') as string) || '0';

    const p = parseInt(participants);
    const e = parseInt(enrollments);
    const cvr = p > 0 ? ((e / p) * 100).toFixed(1) + '%' : '0.0%';

    const payload = {
        type: 'GROUP',
        staff,
        date,
        participants,
        enrollments,
        cvr
    };

    await sendToGAS(payload);
    await new Promise((resolve) => setTimeout(resolve, 800));
    redirect('/');
}