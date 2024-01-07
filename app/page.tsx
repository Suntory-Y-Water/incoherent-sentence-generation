import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import InputArea from './components/InputArea';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between md:px-96  px-6 py-12'>
      <Card>
        <CardHeader>
          <CardTitle>支離滅裂な文章生成アプリ</CardTitle>
          <CardDescription>日本語で文字を入力すると、支離滅裂な文章を生成します。</CardDescription>
        </CardHeader>
        <CardContent>
          <InputArea />
        </CardContent>
      </Card>
    </main>
  );
}
