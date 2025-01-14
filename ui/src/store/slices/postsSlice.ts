//postsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/postTypes';

interface PostsState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  data: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
