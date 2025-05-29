import { useEffect, useState } from 'react';
import { getLFGPosts } from '../../firebase/lfg';

export default function LFGBoard() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getLFGPosts().then(setPosts);
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={i} className="p-4 bg-zinc-800 border border-zinc-600 rounded">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-zinc-400">Relay: {post.relay} | Type: {post.blessingType}</p>
          <p className="text-xs">{post.time}</p>
        </div>
      ))}
    </div>
  );
}
