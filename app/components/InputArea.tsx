'use client';
import React, { useState } from 'react';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Label } from '@/app/components/ui/label';

const formSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: '1文字以上入力してください。',
    })
    .max(1000, {
      message: '1,000文字以下で入力してください。',
    }),
});

const InputArea = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbwL8cmNKnvpW2fWwHyHSfIR6BmJfgw9gOjvl29QNEjr_aqL892nZKUHXwDvEcr7b-pe/exec?text=${values.text}`,
      );
      const data = await res.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('翻訳エラー:', error);
      setTranslatedText('翻訳に失敗しました。');
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel>翻訳したい文字</FormLabel>
              <FormControl>
                <Textarea placeholder='吾輩は猫である。名前はまだない。...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {translatedText && (
          <div className=''>
            <Label>翻訳後の文字</Label>
            <p className='px-3 py-2 text-sm bg-slate-100 rounded-md'>{translatedText}</p>
          </div>
        )}

        <Button
          variant='default'
          type='submit'
          disabled={isLoading}
          className='w-full items-center justify-center p-6 my-3 tracking-tight'
        >
          {isLoading ? '翻訳中...' : '文章を生成する'}
        </Button>
      </form>
    </Form>
  );
};

export default InputArea;
