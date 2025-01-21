import { getContent } from '@/lib/github';
import Home from './page';
import { DEFAULT_CONTENT } from '@/types/content';

export default async function ServerContentWrapper() {
  let content;
  try {
    content = await getContent();
  } catch (error) {
    console.error('Failed to fetch content:', error);
    content = DEFAULT_CONTENT;
  }

  return <Home content={content} />;
}