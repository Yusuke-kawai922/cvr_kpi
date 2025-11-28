'use server'

import { redirect } from 'next/navigation';

// ★★★ 更新されたGASのURL（バージョン固定） ★★★
const GAS_URL = "https://script.google.com/macros/s/AKfycbyegrrKdLQPfFDPje4B6arcsG92OnLpC5WnwXumznRsYoH5P-QyXRdtNmzgJTQHl3G_Og/exec";

export async function submitReport(formData: FormData) {
    // 1. フォームデータの取得
    const type = formData.get('type') as string;
    const date = formData.get('date') as string;
    const staff = formData.get('staff') as string;

    // 個別の場合のデータ
    const studentName = (formData.get('student_name') as string) || '';
    const result = (formData.get('result') as string) || '';

    // 集団の場合のデータ
    const participants = (formData.get('participants') as string) || '0';
    const enrollments = (formData.get('enrollments') as string) || '0';

    // CVR計算 (集団の場合)
    let cvr = '';
    if (type === 'group') {
        const p = parseInt(participants);
        const e = parseInt(enrollments);
        cvr = p > 0 ? ((e / p) * 100).toFixed(1) + '%' : '0.0%';
    }

    // 2. GASに送るデータの作成
    const payload = {
        type: type === 'individual' ? 'INDIVIDUAL' : 'GROUP',
        staff: staff,
        date: date,
        // 個別用
        studentName: studentName,
        result: result,
        // 集団用
        participants: participants,
        enrollments: enrollments,
        cvr: cvr
    };

    console.log('--- GASへ送信開始 ---');
    console.log('送信先:', GAS_URL);
    console.log('データ:', payload);

    try {
        // 3. GASへデータをPOST送信
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

    // 4. 通信ラグの演出（ユーザー体験のため）
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 5. 保存成功としてトップページへリダイレクト
    redirect('/');
}