export const usePosts = () => {
  const { request } = useApi();
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPosts = async (publishedOnly = true) => {
    loading.value = true;
    error.value = null;
    try {
      const params = publishedOnly ? { published: true } : undefined;
      const data = await request({ url: "/api/posts", params });
      posts.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch posts";
      console.error("Error fetching posts:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchPostBySlug = async (slug) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: `/api/posts/${slug}` });
      return data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch post";
      console.error("Error fetching post:", e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostBySlug,
  };
};
